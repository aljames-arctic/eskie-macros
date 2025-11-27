/**
 * Original Author: EskieMoh#2969
 * Update Author: bakanabaka
 */

import { img } from '../../../../lib/filemanager.js';

async function create(token, config) {
    const defaultConfig = {
        id: 'ragePurpleLightning',
        duration: 0, // This is a persistent effect, duration will be set on individual effects.
    };
    const mergedConfig = foundry.utils.mergeObject(defaultConfig, config);
    const { id, duration } = mergedConfig;

    let seq = new Sequence();

    seq
        .effect()
        .name(`${id}-outpulse`)
        .file(img("jb2a.extras.tmfx.outpulse.circle.02.normal"))
        .atLocation(token)
        .size(4, { gridUnits: true })
        .opacity(0.25);

    seq
        .effect()
        .name(`${id}-ground-crack-impact`)
        .file(img("jb2a.impact.ground_crack.purple.02"))
        .atLocation(token)
        .belowTokens()
        .filter("ColorMatrix", { hue: -15, saturate: 1 })
        .size(3.5, { gridUnits: true })
        .zIndex(1);

    seq
        .effect()
        .name(`${id}-ground-crack-still`)
        .file(img("jb2a.impact.ground_crack.still_frame.02"))
        .atLocation(token)
        .belowTokens()
        .fadeIn(1000)
        .filter("ColorMatrix", { hue: -15, saturate: 1 })
        .size(3.5, { gridUnits: true })
        .persist()
        .zIndex(0);

    seq
        .effect()
        .name(`${id}-electricity-static`)
        .file(img("jb2a.static_electricity.03.purple"))
        .atLocation(token)
        .size(3, { gridUnits: true })
        .rotate(90)
        .randomRotation()
        .opacity(0.75)
        .belowTokens()
        .duration(8000)
        .fadeOut(3000);

    seq
        .effect()
        .name(`${id}-particles-outward`)
        .file(img("jb2a.particles.outward.purple.01.03"))
        .atLocation(token)
        .scaleToObject(2.5)
        .opacity(1)
        .fadeIn(200)
        .fadeOut(3000)
        .loopProperty("sprite", "position.x", { from: -5, to: 5, duration: 50, pingPong: true })
        .animateProperty("sprite", "position.y", { from: 0, to: -100, duration: 6000, pingPong: true, delay: 2000 })
        .duration(8000);

    seq
        .effect()
        .name(`${id}-static-electricity-persist`)
        .file(img("jb2a.static_electricity.03.purple"))
        .atLocation(token)
        .attachTo(token)
        .scaleToObject()
        .rotate(90)
        .opacity(1)
        .persist()
        .private();

    seq
        .effect()
        .name(`${id}-token-border`)
        .file(img("jb2a.token_border.circle.static.purple.009"))
        .atLocation(token)
        .attachTo(token)
        .belowTokens()
        .opacity(1)
        .scaleToObject(2.025)
        .persist()
        .zIndex(5);

    return seq;
}

async function play(token, config = {}) {
    const id = config.id || 'ragePurpleLightning';
    const tag = "LightningRaging"; // Use a specific tag for this rage type

    if (Tagger.hasTags(token, tag)) {
        await stop(token, { id: id, tag: tag });
        await new Sequence()
            .animation()
            .on(token)
            .opacity(1)
            .play();
    } else {
        Tagger.addTags(token, tag);
        let seq = await create(token, config);
        if (seq) { await seq.play(); }
    }
}

async function stop(token, { id = 'ragePurpleLightning', tag = "LightningRaging" } = {}) {
    Tagger.removeTags(token, tag);
    // End all effects associated with this rage
    Sequencer.EffectManager.endEffects({ name: `${id}-outpulse`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-ground-crack-impact`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-ground-crack-still`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-electricity-static`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-particles-outward`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-static-electricity-persist`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-token-border`, object: token });
}

export const electric = {
    create,
    play,
    stop,
};