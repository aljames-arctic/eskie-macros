/* **
    Last Updated: 7/12/2022
    Author: EskieMoh#2969
    Updated: bakanabaka
** */

import { img } from '../../../lib/filemanager.js';

const DEFAULT_CONFIG = {
    id: 'Petrify',
    remove: false,
};

/**
 * Creates a Petrified effect sequence for a target token.
 * Depending on the 'remove' flag in the config, it either applies or removes the petrification.
 *
 * @param {Token} token The token to apply the effect to.
 * @param {object} [config={}] Configuration for the effect.
 * @param {string} [config.id='Petrify'] The id of the effect.
 * @param {boolean} [config.remove=false] If true, remove the petrified effect; otherwise, apply it.
 * @returns {Promise<Sequence>} A promise that resolves with the complete effect sequence.
 */
async function create(token, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id, remove } = mConfig;

    let sequence = new Sequence()
            .effect()
            .copySprite(token)
            .name(id)
            .atLocation(token)
            .mask(token)
            .opacity(0.4)
            .filter("ColorMatrix", { contrast: 1, saturate: -1 })
            .filter("Glow", { color: 0x000000, distance: 3, outerStrength: 4 })
            .attachTo(token)
            .fadeIn(3000)
            .duration(5000)
            .zIndex(1)
            .persist()

            .effect()
            .file(img("https://i.imgur.com/4P2tITB.png"))
            .name(id)
            .atLocation(token)
            .mask(token)
            .opacity(1)
            .filter("Glow", { color: 0x000000, distance: 3, outerStrength: 4 })
            .zIndex(0)
            .fadeIn(3000)
            .duration(5000)
            .attachTo(token)
            .persist();

    return sequence;
}

/**
 * Creates and plays the Petrified effect.
 * @param {Token} token The token to apply the effect to.
 * @param {object} [config={}] Configuration for the effect.
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function play(token, config = {}) {
    let seq = await create(token, config);
    if (seq) { await seq.play(); }
}

/**
 * Stops the Petrified effect on a given token.
 * @param {Token} token The token on which to stop the effect.
 * @param {object} [config={}] Configuration for stopping the effect.
 * @param {string} [config.id='Petrify'] The id of the effect to stop.
 * @returns {Promise<void>}
 */
async function stop(token, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id } = mConfig;
    let sequence =  new Sequence()
                .effect()
                .file(img("animated-spell-effects-cartoon.earth.explosion.02"))
                .atLocation(token)
                .filter("ColorMatrix", { saturate: -1 })
                .scaleToObject(2)
                .randomRotation()
                .animation()
                .on(token)
                .opacity(1)
                .thenDo(() => { Sequencer.EffectManager.endEffects({ name: id, object: token }); });
    await sequence.play();
}

export const petrified = {
    create,
    play,
    stop,
};
