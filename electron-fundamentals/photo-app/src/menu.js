const { app } = require('electron');
const { EffectNames, EffectMessages } = require('./effects');

function makeMenuTemplate(mainWindow) {
  const name = app.getName();

  function onEffectItemClick(menuItem) {
    mainWindow.webContents.send(EffectMessages.EFFECT_CHOOSE, menuItem.effect);
  }

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
  },{
    label: 'Effects',
    submenu: [
      {
        label: 'Vanilla',
        effect: EffectNames.vanilla,
        type: 'radio',
        click: onEffectItemClick
      },
      {
        label: 'Ascii baby',
        effect: EffectNames.ascii,
        type: 'radio',
        checked: true,
        click: onEffectItemClick
      }
    ]
  }
  ];

  return template;
}

module.exports = makeMenuTemplate;
