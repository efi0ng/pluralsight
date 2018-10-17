const { app } = require('electron');
const { EffectNames, EffectMessages } = require('./effects');

function cycleToNextEffect(menu) {
  const allEffects = menu.items.filter(item => item.effect);
  const selectedIndex = allEffects.findIndex(item => item.checked);
  allEffects[selectedIndex].checked = false;
  let nextIndex = selectedIndex + 1;
  if (nextIndex >= allEffects.length) {
    nextIndex = 0;
  }
  let selectedItem = allEffects[nextIndex];
  selectedItem.checked = true;
  return selectedItem.effect;
}

function makeMenuTemplate(mainWindow) {
  const name = app.getName();

  function onEffectItemClick(menuItem) {
    mainWindow.webContents.send(EffectMessages.EFFECT_CHOOSE, menuItem.effect);
  }

  function onCycleEffectsClick(menuItem) {
    let effect = cycleToNextEffect(menuItem.menu);
    mainWindow.webContents.send(EffectMessages.EFFECT_CHOOSE, effect);
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
        label: 'Cycle',
        accelerator: 'Shift+CmdOrCtrl+E',
        click: onCycleEffectsClick
      },
      {
        type: 'separator'
      },
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
