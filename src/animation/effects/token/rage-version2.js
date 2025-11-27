/**
 * Original Author: .eskie
 * Update Author: bakanabaka
 */

import { img } from '../../../lib/filemanager.js';

// Global map to store original token images for restoration
const originalTokenImages = new Map();

async function create(token, config) {
    const defaultConfig = {
        id: 'rageVersion2',
        duration: 0, // This is a persistent effect, duration will be set on individual effects.
        groundCrack: false,
        changeToken: false,
        rageImg: "", // Path to the image for the raged token
    };
    const mergedConfig = foundry.utils.mergeObject(defaultConfig, config);
    const { id, duration, groundCrack, changeToken, rageImg } = mergedConfig;

    let seq = new Sequence();

    // Initial token sprite animation
    seq
        .effect()
        .name(`${id}-sprite-scale`)
        .copySprite(token)
        .attachTo(token)
        .duration(750)
        .animateProperty("sprite", "width", { from: 0, to: 0.05, duration: 400, gridUnits: true, ease: "easeOutCubic" })
        .animateProperty("sprite", "height", { from: 0, to: 0.05, duration: 400, gridUnits: true, ease: "easeOutCubic" })
        .animateProperty("sprite", "width", { from: 0, to: -0.05, duration: 250, gridUnits: true, ease: "easeOutCubic", delay: 500 })
        .animateProperty("sprite", "height", { from: 0, to: -0.05, duration: 250, gridUnits: true, ease: "easeOutCubic", delay: 500 })
        .zIndex(1)
        .waitUntilFinished(-450);

    // Canvas pan and shake
    seq
        .canvasPan()
        .delay(250)
        .shake({ duration: 1100, strength: 1, rotation: false, fadeOut: 500 });

    // Copy sprite effect for blur
    seq
        .effect()
        .name(`${id}-sprite-blur`)
        .delay(250)
        .copySprite(token)
        .attachTo(token)
        .duration(3500)
        .fadeOut(1500)
        .loopProperty("sprite", "position.y", { from: -0.035, to: 0.035, duration: 25, gridUnits: true, pingPong: true })
        .filter("ColorMatrix", { brightness: 0 })
        .filter("Blur", { blurX: 0, blurY: 10 })
        .belowTokens()
        .zIndex(2);

    // Ground crack impact
    seq
        .effect()
        .name(`${id}-ground-crack-impact`)
        .delay(250)
        .file(img("jb2a.impact.ground_crack.orange.02"))
        .atLocation(token)
        .belowTokens()
        .filter("ColorMatrix", { hue: -15, saturate: 1 })
        .size(3.5, { gridUnits: true })
        .zIndex(1);

    // Ground crack still frame (persistent based on groundCrack config)
    seq
        .effect()
        .name(`${id}-ground-crack-still`)
        .delay(250)
        .file(img("jb2a.impact.ground_crack.still_frame.02"))
        .atLocation(token)
        .belowTokens()
        .fadeIn(1000)
        .filter("ColorMatrix", { hue: -15, saturate: 1 })
        .size(3.5, { gridUnits: true })
        .persist(groundCrack) // Use config option here
        .zIndex(0);

    // Roar sound effect
    seq
        .effect()
        .name(`${id}-roar-sound`)
        .delay(250)
        .file(img("eskie.sound.roar.02"))
        .atLocation(token)
        .size(8, { gridUnits: true })
        .opacity(0.5);

    // Buff loop simple red effect (initial burst)
    seq
        .effect()
        .name(`${id}-buff-loop-initial`)
        .delay(250)
        .file(img("eskie.buff.loop.simple.red"))
        .attachTo(token, { offset: { y: -0.05 }, gridUnits: true })
        .scaleToObject(1.5)
        .opacity(0.9)
        .filter("ColorMatrix", { saturate: 1 })
        .playbackRate(1.5)
        .duration(8000)
        .fadeOut(3000)
        .zIndex(1);

    // Buff loop simple red effect (persistent)
    seq
        .effect()
        .name(`${id}-buff-loop-persist`)
        .delay(250)
        .file(img("eskie.buff.loop.simple.red"))
        .attachTo(token, { offset: { y: -0.05 }, gridUnits: true })
        .scaleToObject(1)
        .opacity(0.5)
        .filter("ColorMatrix", { saturate: 1 })
        .playbackRate(1)
        .fadeOut(500)
        .persist()
        .zIndex(1);

    // Wind stream (persistent)
    seq
        .effect()
        .name(`${id}-wind-stream-persist`)
        .file(img("jb2a.wind_stream.white"))
        .atLocation(token)
        .attachTo(token)
        .scaleToObject()
        .rotate(90)
        .opacity(1)
        .filter("ColorMatrix", { saturate: 1 })
        .tint("#FF0000")
        .persist()
        .private()
        .zIndex(1);

    // Aura token generic red (persistent)
    seq
        .effect()
        .name(`${id}-aura-token`)
        .file(img("eskie.aura.token.generic.02.red"))
        .attachTo(token)
        .scaleToObject(2.1)
        .persist();

    return seq;
}

async function play(token, config = {}) {
    const id = config.id || 'rageVersion2';
    const tag = "Raging"; // Use a specific tag for this rage type

    if (Tagger.hasTags(token, tag)) {
        await stop(token, { id: id, tag: tag, ...config }); // Pass config to stop
        await new Sequence()
            .animation()
            .on(token)
            .opacity(1)
            .play();
    } else {
        Tagger.addTags(token, tag);

        if (config.changeToken && config.rageImg) {
            originalTokenImages.set(token.id, token.document.texture.src); // Store original
            await token.document.update({ texture: { src: config.rageImg } }, { animate: false });
        }

        let seq = await create(token, config);
        if (seq) { await seq.play({ preload: true }); }
    }
}

async function stop(token, { id = 'rageVersion2', tag = "Raging", groundCrack = false, changeToken = false } = {}) {
    Tagger.removeTags(token, tag);

    // End all effects associated with this rage
    Sequencer.EffectManager.endEffects({ name: `${id}-sprite-scale`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-sprite-blur`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-ground-crack-impact`, object: token });
    if (groundCrack) { // Only stop if it was made persistent
        Sequencer.EffectManager.endEffects({ name: `${id}-ground-crack-still`, object: token });
    }
    Sequencer.EffectManager.endEffects({ name: `${id}-roar-sound`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-buff-loop-initial`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-buff-loop-persist`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-wind-stream-persist`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-aura-token`, object: token });


    if (changeToken && originalTokenImages.has(token.id)) {
        await token.document.update({ texture: { src: originalTokenImages.get(token.id) } }, { animate: true });
        originalTokenImages.delete(token.id); // Clean up
    }
}

export const rageVersion2 = {
    create,
    play,
    stop,
};