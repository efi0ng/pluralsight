const { app } = require('electron');
const { makeEffectsMenu } = require('./effects');

function makeMenuTemplate(mainWindow) {
  const name = app.getName();

  const template =
  [{
    label: name,
    submenu:[
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
       role: 'toggledevtools',
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'CommandOrControl+H',
        role: 'hide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator:'CommandOrControl+Q',
        role: 'quit'
      }
    ]
  }];

  template.push(makeEffectsMenu(mainWindow));

  return template;
}

module.exports = makeMenuTemplate;
