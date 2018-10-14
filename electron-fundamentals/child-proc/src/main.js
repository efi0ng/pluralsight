"use strict";

const { app, BrowserWindow } = require('electron');

let main_window;

app.on('ready', () => {
  main_window = new BrowserWindow({
    width: 600,
    height: 300
  });

  main_window.openDevTools();

  main_window.loadURL(`file://${__dirname}/status.html`);

  main_window.on('close', () => {
    main_window = null;
  });
});
