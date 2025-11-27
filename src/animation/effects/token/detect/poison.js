import { detectUtil } from './detectUtil.js'
import { dependency } from '../../../../lib/dependency.js';

const defaultDetectionConfig = {
    poisoned: 'jb2a.magic_signs.rune.abjuration.complete.red',
    diseased: 'jb2a.magic_signs.rune.conjuration.complete.pink',
};

const defaultValidator = async function (target, tags) {
    function taggerVerify(target, tags) {
        dependency.required({id: "tagger"});
        return Tagger?.hasTags(target, tags);
    }

    for (let tag of tags) {
        if (target.actor.statuses.has(tag)) { return true; }
    }
    return taggerVerify(target, tags);
}

const DEFAULT_CONFIG = {
    distance: 30,
    effect: {
        pulse: {
            img: 'jb2a.detect_magic.circle.green',
        },
    },
    detection: defaultDetectionConfig,
    validator: defaultValidator,
}

async function createPoisonDisease(token, config) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config);
    return detectUtil.create(token, mergedConfig);
}

async function playPoisonDisease(token, config) {
    const seq = await createPoisonDisease(token, config);
    if (seq) { return seq.play(); }
}

export const poison = {
    create : createPoisonDisease,
    play : playPoisonDisease,
};