const EffectNames = {
  vanilla: "vanilla",
  ascii: "ascii",
  daltonize: "daltonize",
  hex: "hex",
  filmgrain: "filmgrain"
};

const  EffectMessages = {
  EFFECT_CHOOSE : 'effect-choose',
};

const effectFn = function (effectName, customFn) {
  return (seriously, src, target) => {
    // construct
    const effect = seriously.effect(effectName);
    // customise
    if (customFn) customFn(effect);
    // connect
    effect.source = src;
    target.source = effect;
    seriously.go();
  };
};

const Effects = {
  vanilla: (seriously, src, target ) => {
    target.source = src;
    seriously.go();
  },
  ascii: effectFn(EffectNames.ascii, null),
  daltonize: effectFn(EffectNames.daltonize, effect => { effect.type = 0.8; }),
  hex: effectFn(EffectNames.hex, effect => { effect.size = 0.01; }),
  filmgrain: effectFn(EffectNames.filmgrain, effect => { effect.amount = 0.3; })
};

function choose(seriously, src, target, effectName = EffectNames.vanilla) {
  Effects[effectName](seriously, src, target);
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

  function effectMenuItem(label, effect, checked =false) {
    return {
      label: label,
      effect: effect,
      type: 'radio',
      checked: checked,
      click: onEffectItemClick
    };
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
      effectMenuItem('Vanilla', EffectNames.vanilla, true),
      effectMenuItem('Ascii baby',EffectNames.ascii),
      effectMenuItem('Daltonize', EffectNames.daltonize),
      effectMenuItem('Hex', EffectNames.hex),
      effectMenuItem('Film grain', EffectNames.filmgrain)
    ]
  };
}

module.exports = {
  choose: choose,
  EffectNames: EffectNames,
  EffectMessages: EffectMessages,
  makeEffectsMenu: makeEffectsMenu
};
