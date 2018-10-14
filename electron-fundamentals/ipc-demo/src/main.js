"use strict";

const electron = require('electron');
const countdown = require('./countdown/countdown.js');
const {
  app,
  Menu,
  Tray,
  globalShortcut
} = electron;
const clippy = require('./clippy.js');
const capture = require('./capture/capture.js');

let tray = null;

function build_menus() {
  let productName = electron.app.getName();
  let template = [
    {
      label: 'Help',
      role: 'help',
      submenu: [{
        label: `About ${productName}`,
        click: () => {
          //console.log('About activated');
        },
        role: 'about'
      }, {
        role: 'toggledevtools',
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        role: 'quit',
        accelerator: "Ctrl+Q"
      }]
    }
  ];
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function build_tray() {
  tray = new Tray('./src/trayicon.png');
  tray.setToolTip(electron.app.getName());
}


app.on('ready', () => {
  let main = countdown.create_countwindow();
  build_menus();
  build_tray();
  globalShortcut.unregisterAll();
  clippy.start(tray);
  capture.start(main);
});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  capture.stop();
  globalShortcut.unregisterAll();
  if (tray) tray.destroy();
});
