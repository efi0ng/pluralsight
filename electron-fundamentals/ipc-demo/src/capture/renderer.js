const electron = require('electron');
const { ipcRenderer: ipc, remote, desktopCapturer } = electron;
const { messages } = require('./capture.js');
const {Menu, MenuItem} = remote;
const path = require('path');
const fs = require('fs');

function getMainSource(done) {
  const options = { types: ['screen'], thumbnailSize: electron.screen.getPrimaryDisplay().workAreaSize };
  desktopCapturer.getSources(options, (err, sources) => {
    if (err) return console.log('Cannot capture screen:', err);

    const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1';
    done(sources.filter(isMainSource)[0]);
  });
}

function onCapture(evt, targetPath) {
  console.log("Capture!");
  getMainSource(source => {
    const png = source.thumbnail.toPng();
    const filePath = path.join(targetPath, '122324.png');
    writeScreenshot(png, filePath);
  });
}

function writeScreenshot(png, filePath) {
  fs.writeFile(filePath, png, err => {
    if (err) {
      return console.log('Failed to write screen to: ' + filePath + '\n', err);
    }
  });
}

ipc.on(messages.CAPTURE, onCapture);

const menu = new Menu();

menu.append(new MenuItem({ role: 'toggledevtools' }));

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.popup({window: remote.getCurrentWindow()});
}, false);
