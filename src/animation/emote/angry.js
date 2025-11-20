import { img } from "../../lib/filemanager.js";
import { utils } from "../../lib/utils.js"

/* **
   Originally Published: 4/14/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a angry emote effect on a token.
 *
 * @param {Token} token The token to play the effect on.
 * 
 * @param {object} [config={}] Configuration for the effect.
 * @param {string} [config.id='angry'] The id of the effect.
 * @param {number} [config.duration=5000] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {string} [config.file] The file to use for the effect. If not provided, it will be determined based on installed modules.
 * @param {object[]} [config.effect] An array of effect objects to display. Partial objects will be merged with default values.
 * @param {number} [config.effect.x] The x offset of the effect in grid units.
 * @param {number} [config.effect.y] The y offset of the effect in grid units.
 * @param {number} [config.effect.scale] The scale of the effect.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, config) {
    // Merge user config with default config
    const defaultConfig = {
        id: 'angry',
        duration: 5000,
        effect: [
            { x: 0.3, y: -0.4, scale: 0.65, img: 'eskie.emote.angry.02' },
            { x: 0.3, y: -0.4, scale: 0.85, img: 'eskie.emote.angry.02' }
        ],
    };
    let { id, duration, effect } = utils.mergeObject(defaultConfig, config);

    // Validate that we have the required configurations
    if (effect[0].img === undefined || effect[1].img === undefined) {
        ui.notifications.error("Eskie Macros: Required module 'Eskie Effects' or 'Eskie Effects Free' is not installed or activated. Please install/activate the module to use the default images for this effect.");
        return;
    }
    
    // Extract out necessary config values
    const tokenWidth = token.document.width;

    let angryEffect = new Sequence()
        .effect()
        .name(id)
        .file(img(effect[0].img))
        .atLocation(token)
        .scaleIn(0, 1000, {ease: "easeOutElastic"})
        .scaleOut(0, 1000, {ease: "easeOutExpo"})
        .spriteOffset({ x: effect[0].x * tokenWidth, y: effect[0].y * tokenWidth }, { gridUnits: true, local: true })
        .scaleToObject(effect[0].scale)
    angryEffect = (duration > 0) ? angryEffect.duration(duration) : angryEffect.persist();    
    angryEffect = angryEffect.duration(duration)
        .attachTo(token, { bindAlpha: false })
        .loopProperty("alphaFilter", "alpha", { values: [...new Array(8).fill(1), ...new Array(8).fill(-1)], duration: 25, pingPong: false })
        .private()

        .effect()
        .name(id)
        .file(img(effect[1].img))
        .atLocation(token)
        .scaleIn(0, 1000, {ease: "easeOutElastic"})
        .scaleOut(0, 1000, {ease: "easeOutExpo"})
        .spriteOffset({ x: effect[1].x * tokenWidth, y: effect[1].y * tokenWidth }, { gridUnits: true, local: true })
        .scaleToObject(effect[1].scale);
    angryEffect = (duration > 0) ? angryEffect.duration(duration) : angryEffect.persist();
    angryEffect = angryEffect
        .attachTo(token, {bindAlpha: false})
        .loopProperty("alphaFilter", "alpha", { values: [...new Array(8).fill(-1), ...new Array(8).fill(1)], duration: 25, pingPong: false })
        .waitUntilFinished();

    return angryEffect;
}

async function play(token, config = {}) {
    let seq = await create(token, config);
    await seq.play();
}

async function stop(token, {id = 'angry'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const angry = {
    create,
    play,
    stop,
};
