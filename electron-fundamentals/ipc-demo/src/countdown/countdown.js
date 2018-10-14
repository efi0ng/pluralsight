const { BrowserWindow, ipcMain } = require('electron');

let windows = null;

const messages = {
  COUNTDOWN_START: "countdown-start",
  COUNTDOWN_TICK: "countdown-tick"
};

function init() {
  ipcMain.on(messages.COUNTDOWN_START, () => {
    do_countdown(count => {
      windows.forEach(win => {
        win.webContents.send(messages.COUNTDOWN_TICK, count);
      });
    });
  });
}

function do_countdown(on_tick, on_end) {
  let count = 5;
  if (on_tick) on_tick(count);

  let timer = setInterval(() => {
    count--;
    if (on_tick) on_tick(count);

    console.log("counting... ", count);
    if (count === 0) {
      clearInterval(timer);
      console.log("It's over!");
      if (on_end) on_end();
    }
  }, 1000);
}

function create_countwindow() {
  if (!windows) {
    init();
    windows = [];
  }

  let win = new BrowserWindow({
    height: 400,
    width: 600
  });

  win.loadURL(`file://${__dirname}/countdown.html`);

  win.on('closed', () => {
    console.log('countdown window closed');
    windows.splice(windows.indexOf(win),1);
    win = null;
  });

  windows.push(win);
  return win;
}


module.exports = {
  do_countdown: do_countdown,
  create_countwindow: create_countwindow,
  messages: messages,
  windows: windows
};
