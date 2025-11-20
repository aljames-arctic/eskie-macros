import { img } from "../../lib/filemanager.js";
import { utils } from "../../lib/utils.js"

/* **
   Originally Published: 4/14/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a drunk emote effect on a token.
 *
 * @param {Token} token The token to play the effect on.
 * 
 * @param {object} [config={}] Configuration for the effect.
 * @param {string} [config.id='drunk'] The id of the effect.
 * @param {number} [config.duration=7000] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {object[]} [config.effect] An array of effect objects to display. Partial objects will be merged with default values.
 * @param {string} [config.effect.img] The image file to use for the effect.
 * @param {number} [config.effect.x] The x offset of the effect in grid units.
 * @param {number} [config.effect.y] The y offset of the effect in grid units.
 * @param {number} [config.effect.scale] The scale of the effect.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, config = {}) {
    const defaultConfig = {
        id: 'drunk',
        duration: 7000,
        effect: [
            { // bubbles
                img: img('eskie.emote.drunk_bubbles.01'),
                x: -0.2,
                y: -0.3,
                scale: 0.7
            },
            { // blush
                img: img('eskie.emote', 'blush', '01'),
                x: -0.15,
                y: 0.15,
                scale: 0.5
            },
            {} // sway
        ]
    };
    let { id, duration, effect } = utils.mergeObject(defaultConfig, config);

    if (!effect[0].img || !effect[1].img) {
        ui.notifications.error("Eskie Macros: Required module 'Eskie Effects' or 'Eskie Effects Free' is not installed or activated. Please install/activate the module to use the default images for this effect.");
        return;
    }

    const tokenWidth = token.document.width;

    let drunkEffect = new Sequence()
        // Drunk bubbles effect
        .effect()
        .file(effect[0].img)
        .name(id)
        .delay(0, 500)
        .atLocation(token, { offset: { x: effect[0].x * tokenWidth, y: effect[0].y * tokenWidth }, gridUnits: true });
    drunkEffect = (duration > 0) ? drunkEffect.duration(duration) : drunkEffect.persist();
    drunkEffect = drunkEffect
        .scaleToObject(effect[0].scale)
        .zeroSpriteRotation()
        .loopProperty("sprite", "position.x", { from: 0, to: -0.02, duration: 2000, pingPong: true, gridUnits: true, ease: "linear" })
        .loopProperty("sprite", "position.y", { from: 0.15, to: -0.15, duration: 6000, pingPong: false, gridUnits: true, ease: "easeOutSine" })
        .loopProperty("sprite", "width", { from: 0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease: "easeOutCubic" })
        .loopProperty("sprite", "height", { from: 0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease: "easeOutCubic" })
        .loopProperty("alphaFilter", "alpha", { values: [-1, 1, 1, 1, 1, -1], duration: 1000, pingPong: true, ease: "easeOutCubic" })
        .attachTo(token, { bindAlpha: false, bindRotation: false })
        .private()

        .animation()
        .on(token)
        .opacity(0)

        // Blush effect attached to token with bobbing motion
        .effect()
        .file(effect[1].img)
        .zIndex(0)
        .name(id)
        .opacity(0.85)
        .scaleToObject(effect[1].scale)
        .loopProperty("spriteContainer", "position.x", { from: -20, to: 20, duration: 2500, pingPong: true, ease: "easeInOutSine" })
        .loopProperty("sprite", "position.y", { values: [0, 20, 0, 20], duration: 2500, pingPong: true })
        .loopProperty("sprite", "rotation", { from: -10, to: 10, duration: 2500, pingPong: true, ease: "easeInOutSine" });
    drunkEffect = (duration > 0) ? drunkEffect.duration(duration) : drunkEffect.persist();
    drunkEffect = drunkEffect
        .atLocation(token)
        .spriteOffset({ x: effect[1].x * tokenWidth, y: effect[1].y * tokenWidth }, { gridUnits: true, local: true })
        .attachTo(token, { bindAlpha: false, bindRotation: true })
        .private()

        // Sway effect attached to token
        .effect()
        .copySprite(token)
        .name(id)
        .atLocation(token)
        .loopProperty("spriteContainer", "position.x", { from: -20, to: 20, duration: 2500, pingPong: true, ease: "easeInOutSine" })
        .loopProperty("sprite", "position.y", { values: [0, 20, 0, 20], duration: 2500, pingPong: true })
        .loopProperty("sprite", "rotation", { from: -10, to: 10, duration: 2500, pingPong: true, ease: "easeInOutSine" });
    drunkEffect = (duration > 0) ? drunkEffect.duration(duration) : drunkEffect.persist();
    drunkEffect = drunkEffect
        .attachTo(token, { bindAlpha: false })
        .waitUntilFinished()

        .animation()
        .on(token)
        .opacity(1);

    return drunkEffect;
}

async function play(token, config = {}) {
    let seq = await create(token, config);
    await seq.play();
}

async function stop(token, {id = 'drunk'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const drunk = {
    create,
    play,
    stop,
};
