import { detectUtil } from './detectUtil.js'
import { dependency } from '../../../../lib/dependency.js';

const defaultDetectionConfig = {
    aberration: 'jb2a.condition.curse.01.006.blue',
    celestial: 'jb2a.condition.curse.01.002.blue',
    elemental: 'jb2a.condition.curse.01.001.red',
    fey: 'jb2a.condition.curse.01.020.purple',
    fiend: 'jb2a.condition.curse.01.024.red',
    undead : 'jb2a.condition.curse.01.021.purple',
    consecrated : 'jb2a.magic_signs.rune.02.complete.04.yellow',
    descecrated : 'jb2a.magic_signs.rune.02.complete.04.grey',
};

const defaultValidator = async function (target, tags) {
    function taggerVerify(target, tags) {
        dependency.required({id: "tagger"});
        return Tagger?.hasTags(target, tags);
    }

    const targetRace = target?.actor.system.details.type.value;
    return (targetRace && tags.includes(targetRace)) || taggerVerify(target, tags);
}

async function createGoodEvil(token, config) {
    const defaultConfig = { distance: 30, effect: {pulse: {img:'jb2a.detect_magic.circle.grey'}, ionConfig: defaultDetectionConfig, validator: defaultValidator} };
    const mergedConfig = foundry.utils.mergeObject(defaultConfig, config);
    return detectUtil.create(token, mergedConfig);
}

async function playGoodEvil(token, config) {
    const seq = await createGoodEvil(token, config);
    if (seq) { return seq.play(); }
}

export const goodevil = {
    create : createGoodEvil,
    play : playGoodEvil,
};