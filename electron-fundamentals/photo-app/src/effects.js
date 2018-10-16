const EffectNames = {
  vanilla: "vanilla",
  ascii: "ascii"
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

module.exports = {
  choose: choose,
  EffectNames: EffectNames,
  EffectMessages: {
    EFFECT_CHOOSE : 'effect-choose'
  }
};
