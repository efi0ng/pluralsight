const {
  Menu,
  Tray,
  clipboard,
  globalShortcut
} = require('electron');

const CLIPBOARD_STACK_SIZE = 5;
let clipboardStack = [];
let tray = null;  // passed in from outside

function format_clip_for_menu(item) {
  if (item.length > 15) {
    return `${item.slice(0,14)} ...`;
  } else {
    return item;
  }
}

function build_tray_menu() {
  let template;
  if (clipboardStack.length === 0) {
    template = [{
      label: "<Empty>",
      enabled: false
    }];
  } else {
    template = clipboardStack.map((item, i) => {
      return {
        label: `Copy: ${format_clip_for_menu(item)}`,
        clip: item,
        click: (menuItem) => {
          console.log(item.slice(0, 10));
          clipboard.writeText(menuItem.clip);
        },
        accelerator: `CommandOrControl+Alt+${Number(i+1)}`
      };
    });
  }
  let menu = Menu.buildFromTemplate(template);
  tray.setContextMenu(menu);
}

function start_clipboard_polling(onChange) {
  let cached = clipboard.readText();

  setInterval(() => {
    let latest = clipboard.readText();
    if (latest !== cached) {
      cached = latest;
      onChange(cached);
    }
  });
}

function add_text_to_stack(newValue) {
  // remove from stack if already there
  if (clipboardStack.indexOf(newValue) > -1) {
    return; // leave where it is so that shortcut doesn't change
  }

  // add to the top
  if ( clipboardStack.unshift(newValue) > CLIPBOARD_STACK_SIZE) {
    clipboardStack.pop();
  }
  build_tray_menu();
}

function clipboard_onChange(newValue) {
  add_text_to_stack(newValue);
}

function register_shortcuts() {
  for (let i = 0; i < CLIPBOARD_STACK_SIZE; i++) {
    globalShortcut.register(`CommandOrControl+Alt+${Number(i+1)}`, () => {
      if (clipboardStack.length > i) {
        clipboard.writeText(clipboardStack[i]);
      }
    });
  }
}

function start(trayMenu) {
  tray = trayMenu;
  register_shortcuts();

  // for testing
  for (let i = 0; i < CLIPBOARD_STACK_SIZE; i++) {
    add_text_to_stack(`Test text ${Number(CLIPBOARD_STACK_SIZE-i)}`);
  }
  build_tray_menu();
  start_clipboard_polling(clipboard_onChange);
}

module.exports = {
  start: start,
};
