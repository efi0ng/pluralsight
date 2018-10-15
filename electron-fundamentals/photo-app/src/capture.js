//navigator.getUserMedia =  navigator.webkitGetUserMedia;

window.addEventListener('DOMContentLoaded', () => {
  const videoEl = document.getElementById('video');
  const canvasEl = document.getElementById('canvas');
  const recordEl = document.getElementById('record');
  const photosEl = document.querySelector('.photosContainer');
  const counterEl = document.getElementById('counter');

  let constraints = {
    audio: false,
    video: {
      mandatory:{
        minWidth: 853,
        minHeight: 480,
        maxWidth: 853,
        maxHeight: 480
      }
    }
  };

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    videoEl.src = window.URL.createObjectURL(stream);
  })
  .catch(function(error) {
    console.log('Camera error: ', error);
  });
});
