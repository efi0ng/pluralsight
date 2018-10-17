const { app } = require('electron');
const { makeEffectsMenu } = require('./effects');
const images = require('./images');

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
        label: 'Quit',
        accelerator:'CommandOrControl+Q',
        role: 'quit'
      }
    ]
  }];

  template.push(makeEffectsMenu(mainWindow));

  template.push({
    label: 'View',
    submenu: [{
      label: 'Photos Directory',
      click: () => { images.openPhotosDir(); }
    }]
  });
  return template;
}

module.exports = makeMenuTemplate;
