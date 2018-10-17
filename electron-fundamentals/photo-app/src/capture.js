const video = require('./video');
const countdown = require('./countdown');
const flash = require('./flash');
const effects = require('./effects');

const { ipcRenderer: ipc, shell, remote } = require('electron');

const images = remote.require('./images');

// image effects vars
let canvasTarget;
let seriously;
let videoSrc;
// ----------

function formatImgTag(doc, bytes) {
  const div = doc.createElement('div');
  div.classList.add('photo');
  const close = doc.createElement('div');
  close.classList.add('photoClose');
  const img = new Image();
  img.classList.add('photoImg');
  img.src = bytes;
  div.appendChild(img);
  div.appendChild(close);
  return div;
}

window.addEventListener('DOMContentLoaded', () => {
  const videoEl = document.getElementById('video');
  const canvasEl = document.getElementById('canvas');
  const recordEl = document.getElementById('record');
  const photosEl = document.querySelector('.photosContainer');
  const counterEl = document.getElementById('counter');
  const flashEl = document.getElementById('flash');

  /*global Seriously */
  seriously = new Seriously();
  videoSrc = seriously.source('#video');
  canvasTarget = seriously.target('#canvas');
  effects.choose(seriously, videoSrc, canvasTarget);

  video.init(navigator, videoEl);

  recordEl.addEventListener('click', () => {
    countdown.start(counterEl, 3, () => {
      flash(flashEl);
      const bytes = video.captureBytesFromLiveCanvas(canvasEl);
      ipc.send(images.Messages.IMAGE_CAPTURED, bytes);
      photosEl.appendChild(formatImgTag(document, bytes));
    });
  });

  photosEl.addEventListener('click', evt => {
    const isPhotoClose = evt.target.classList.contains('photoClose');
    const selector = isPhotoClose ? '.photoClose' : '.photoImg';
    const photos = Array.from(document.querySelectorAll(selector));
    const index = photos.findIndex(el => el === evt.target);

    if (index == -1) return;

    if (isPhotoClose) {
      ipc.send('image-remove', index);
    } else {
      shell.showItemInFolder(images.getFromCache(index));
    }
  });
});

ipc.on(images.Messages.IMAGE_REMOVE, (evt, index) => {
  let photos = Array.from(document.querySelectorAll('.photo'));
  document.getElementById('photos').removeChild(photos[index]);
});

ipc.on(effects.EffectMessages.EFFECT_CHOOSE, (evt, effectName) => {
  effects.choose(seriously, videoSrc, canvasTarget, effectName);
});
