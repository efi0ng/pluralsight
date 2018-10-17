const EffectNames = {
  vanilla: "vanilla",
  ascii: "ascii"
};

const  EffectMessages = {
  EFFECT_CHOOSE : 'effect-choose',
};

const effects = {
  vanilla: (seriously, src, target ) => {
    target.source = src;
    seriously.go();
  },
  ascii: (seriously, src, target ) => {
    const ascii = seriously.effect('ascii');
    ascii.source = src;
    target.source = ascii;
    seriously.go();
  }
};

function choose(seriously, src, target, effectName = EffectNames.vanilla) {
  effects[effectName](seriously, src, target);
}

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

function makeEffectsMenu(mainWindow) {

  function onEffectItemClick(menuItem) {
    mainWindow.webContents.send(EffectMessages.EFFECT_CHOOSE, menuItem.effect);
  }

  function onCycleEffectsClick(menuItem) {
    let effect = cycleToNextEffect(menuItem.menu);
    mainWindow.webContents.send(EffectMessages.EFFECT_CHOOSE, effect);
  }

  return {
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
  };
}

module.exports = {
  choose: choose,
  EffectNames: EffectNames,
  EffectMessages: EffectMessages,
  makeEffectsMenu: makeEffectsMenu
};
