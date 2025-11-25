import { detectUtil } from './detectUtil.js'
import { dependency } from '../../../../lib/dependency.js';

const defaultDetectionConfig = {
    abjuration: 'jb2a.magic_signs.rune.abjuration.complete.red',
    conjuration: 'jb2a.magic_signs.rune.conjuration.complete.pink',
    divination: 'jb2a.magic_signs.rune.divination.complete.blue',
    enchantment: 'jb2a.magic_signs.rune.enchantment.complete.purple',
    illusion: 'jb2a.magic_signs.rune.illusion.complete.yellow',
    necromancy: 'jb2a.magic_signs.rune.necromancy.complete.green',
};

const defaultValidator = async function (target, tags) {
    dependency.required({id: "tagger"});
    return Tagger.hasTags(target, tags);
}

async function createMagic(token, config) {
    const defaultConfig = { distance: 30, effect: {pulse: {img:'jb2a.detect_magic.circle.purple'}, ionConfig: defaultDetectionConfig, validator: defaultValidator} };
    const mergedConfig = foundry.utils.mergeObject(defaultConfig, config);
    return detectUtil.create(token, mergedConfig);
}

async function playMagic(token, config) {
    const seq = await createMagic(token, config);
    if (seq) { return seq.play(); }
}

export const magic = {
    create : createMagic,
    play : playMagic,
};