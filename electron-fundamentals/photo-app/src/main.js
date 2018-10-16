const { app, BrowserWindow, ipcMain: ipc, Menu } = require('electron');
const images = require('./images');
const menuTemplate = require('./menu');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      width: 900,
      height: 725,
      resizable: false
  });

  mainWindow.loadURL(`file://${__dirname}/capture.html`);

  images.init(app);

  mainWindow.on('close', () => {
    mainWindow = null;
  });

  const menu = Menu.buildFromTemplate(menuTemplate(mainWindow));
  Menu.setApplicationMenu(menu);
});

ipc.on('image-captured', (evt, bytes) => {
  images.save(bytes);
});

ipc.on('image-remove', (evt, index) => {
  images.remove(index, () => {
    evt.sender.send('image-removed', index);
  });
});
