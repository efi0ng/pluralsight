const { app, BrowserWindow, globalShortcut } = require('electron');

const CAPTURE_KBD_SHORTCUT = 'CommandOrControl+Alt+9';

const messages = {
  CAPTURE : 'capture'
};

let capture_win = null;

function create_capturewindow(parent_win) {
  capture_win = new BrowserWindow({
    parent: parent_win,
    width: 500,
    height: 500,
    resizeable: false,
    frame: false,
    show: false
  });

  //capture_win.openDevTools();

  capture_win.loadURL(`file://${__dirname}/capture.html`);

  capture_win.on('closed', () => {
    console.log('capture window closed');
    capture_win = null;
  });

  return capture_win;
}

function do_capture() {
  console.log("capture request received from client.");
  if (capture_win) {
    capture_win.webContents.send(messages.CAPTURE, app.getPath('pictures'));
  }
}

function register_shortcuts() {
  globalShortcut.register(CAPTURE_KBD_SHORTCUT, () => {
    do_capture();
  });
}

function start(parent_win) {
  create_capturewindow(parent_win);
  register_shortcuts();
}

function stop() {
  globalShortcut.unregister(CAPTURE_KBD_SHORTCUT);
  if (capture_win !== null) {
    capture_win.close();
    capture_win = null;
  }
}

module.exports = {
  messages : messages,
  start: start,
  stop: stop
};
