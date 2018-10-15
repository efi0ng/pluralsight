const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      width: 1200,
      height: 725,
      resizable: false
  });

  mainWindow.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/capture.html`);

  mainWindow.on('close', () => {
    mainWindow = null;
  })
});
