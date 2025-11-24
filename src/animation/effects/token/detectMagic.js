/*
    Originally Published: 8/21/2023
    Original Author: EskieMoh#2969 for Divine Sense
    Modified by Tyreal2012
    Update Author: bakanabaka
*/

import { img } from '../../../lib/filemanager.js';
import { dependency } from '../../../lib/dependency.js';

async function _createSchoolEffects(sequence, target) {
    dependency.required({id: "tagger"});
    const schools = [
        'abjuration',
        'conjuration',
        'divination',
        'enchantment',
        'illusion',
        'necromancy',
    ];

    const schoolColors = {
        abjuration: 'red',
        conjuration: 'pink',
        divination: 'blue',
        enchantment: 'purple',
        illusion: 'yellow',
        necromancy: 'green',
    };

    sequence
        .effect()
        .copySprite(target)
        .belowTokens()
        .attachTo(target, { local: true })
        .scaleToObject(target.document.width)
        .spriteRotation(target.rotation * -1)
        .filter('Glow', { color: 0xffffff, distance: 15 })
        .duration(3000)
        .fadeIn(500, { delay: 0 })
        .fadeOut(1000, { ease: 'easeInCubic' })
        .zIndex(0.2)
        .opacity(1)
        .playIf(() => {
            return Tagger.hasTags(target, schools);
        });

    for (const school of schools) {
        sequence
            .effect()
            .file(img(`jb2a.magic_signs.rune.${school}.complete.${schoolColors[school]}`))
            .attachTo(target)
            .scaleToObject(1, { considerTokenScale: true })
            .duration(30000)
            .fadeIn(2000, { delay: 1000 })
            .fadeOut(3500, { ease: 'easeInSine' })
            .opacity(0.8)
            .zIndex(0.1)
            .loopProperty('alphaFilter', 'alpha', {
                values: [0.5, 0],
                duration: 1000,
                pingPong: true,
                delay: 500,
            })
            .playIf(Tagger.hasTags(target, school));
    }

    return sequence;
}

/**
 * Creates a detect magic effect.
 *
 * @param {Token} token The token casting the spell.
 * @param {object} [config={}] Configuration for the effect.
 * @param {number} [config.distance=30] The area of effect distance in feet.
 * @returns {Promise<Sequence>} A promise that resolves with the sequence.
 */
async function create(token, config) {
    const defaultConfig = { distance: 30 };
    let { distance } = foundry.utils.mergeObject(defaultConfig, config);
    const targets = canvas.tokens.placeables.filter((t) => {
        if (t.id === token.id) return false;
        const targetDistance = canvas.grid.measurePath([token, t]).euclidean ?? 0;
        return targetDistance <= distance;
    });

    let sequence = new Sequence();
    sequence
        .effect()
        .file(img('jb2a.detect_magic.circle.purple'))
        .atLocation(token)
        .size(distance * 2, { gridUnits: true })
        .fadeOut(4000)
        .opacity(0.75)
        .belowTokens();

    for (const target of targets) {
        const targetDistance = canvas.grid.measurePath([token, target]).euclidean ?? 0;
        const delay = (targetDistance / canvas.grid.size) * 125;
        let targetSequence = new Sequence().wait(delay);
        sequence.addSequence(await _createSchoolEffects(targetSequence, target));
    }

    return sequence;
}

async function play(token, config) {
    const seq = await create(token, config);
    if (seq) { return seq.play(); }
}

export const detectMagic = {
    create,
    play,
    stop,
};
