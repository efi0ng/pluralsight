const { app, BrowserWindow, ipcMain: ipc } = require('electron');
const images = require('./images.js');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      width: 1200,
      height: 725,
      resizable: false
  });

  mainWindow.loadURL(`file://${__dirname}/capture.html`);
  mainWindow.openDevTools();

  images.init(app);

  mainWindow.on('close', () => {
    mainWindow = null;
  });
});

ipc.on('image-captured', (evt, bytes) => {
  images.save(bytes);
});
