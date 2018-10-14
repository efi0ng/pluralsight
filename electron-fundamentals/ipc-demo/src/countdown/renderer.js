const electron = require('electron');
const { messages } = require('./countdown.js');

const ipc = electron.ipcRenderer;

document.getElementById("start").addEventListener('click', () => {
  ipc.send(messages.COUNTDOWN_START);
});

ipc.on(messages.COUNTDOWN_TICK, (ev, count) => {
  document.getElementById("count").innerHTML = "Ticked :" + count;
});

const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const menu = new Menu();
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked'); }}));
menu.append(new MenuItem({type: 'separator'}));
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}));

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.popup({window: remote.getCurrentWindow()});
}, false);
