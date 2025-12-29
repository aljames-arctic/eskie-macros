/* **
    Last Updated: 7/12/2022
    Author: EskieMoh#2969
    Updated: bakanabaka
** */

import { img } from '../../../lib/filemanager.js';
import { autoanimations } from '../../../integration/autoanimations.js'

const DEFAULT_CONFIG = {
    id: 'Petrifying Gaze',
    targets: [],
    duration: 5000,
};

async function create(token, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id, targets, duration } = mConfig;

    let sequence = new Sequence();
    sequence
        .effect()
        .file(img("animated-spell-effects-cartoon.misc.fiery eyes.04"))
        .atLocation(token)
        .size(0.9, { gridUnits: true })
        .anchor({ x: 0.5, y: 0.5 })
        .fadeIn(duration/10)
        .fadeOut(duration/10)
        .duration(duration)

        .effect()
        .file(img("animated-spell-effects-cartoon.misc.fiery eyes.04"))
        .atLocation(token)
        .size(0.9, { gridUnits: true })
        .anchor({ x: 0.5, y: 0.5 })
        .filter("Blur", { blurX: 5, blurY: 10 })
        .opacity(1)
        .filter("ColorMatrix", { saturate: -1, brightness: 2 })
        .fadeIn(duration/10)
        .fadeOut(duration/10)
        .duration(duration)

        .effect()
        .copySprite(token)
        .atLocation(token)
        .filter("Blur", { blurX: 5, blurY: 20 })
        .loopProperty("sprite", "position.y", { from: -10, to: 10, duration: duration/70, pingPong: true })
        .opacity(0.4)
        .fadeOut(duration/10)
        .duration(duration)

        .effect()
        .file(img("jb2a.extras.tmfx.outflow.circle.02"))
        .atLocation(token)
        .belowTokens()
        .opacity(0.25)
        .size(3, { gridUnits: true })
        .fadeIn(duration/10)
        .fadeOut(duration/10)
        .duration(duration);

    // Effects for each target
    for (const target of targets) {
        sequence
            .effect()
            .file(img("animated-spell-effects-cartoon.misc.fiery eyes.04"))
            .atLocation(token)
            .scale({ x: 0.1, y: 1.25 })
            .anchor({ x: 0.5, y: 0.35 })
            .opacity(0.5)
            .rotate(90)
            .rotateTowards(target)
            .belowTokens()
            .duration(duration)
            .fadeIn(duration/10)
            .fadeOut(duration/10)

            .effect()
            .file(img("animated-spell-effects-cartoon.misc.fiery eyes.04"))
            .atLocation(token)
            .scale({ x: 0.1, y: 1.25 })
            .anchor({ x: 0.5, y: 0.35 })
            .opacity(0.2)
            .filter("ColorMatrix", { saturate: -1, brightness: 2 })
            .rotate(90)
            .rotateTowards(target)
            .duration(duration)
            .fadeIn(duration/10)
            .fadeOut(duration/10)

            .effect()
            .file(img("jb2a.wind_stream.white"))
            .atLocation(token)
            .stretchTo(target, { onlyX: false })
            .filter("Blur", { blurX: 10, blurY: 20 })
            .loopProperty("sprite", "position.y", { from: -10, to: 10, duration: duration/50, pingPong: true })
            .opacity(0.3)

            .effect()
            .copySprite(target)
            .atLocation(target)
            .filter("Blur", { blurX: 5, blurY: 20 })
            .loopProperty("sprite", "position.y", { from: -10, to: 10, duration: duration/50, pingPong: true })
            .opacity(0.8)
            .fadeIn(duration/10)
            .fadeOut(duration/10)
            .duration(duration);
    }

    return sequence;
}

async function play(token, config = {}) {
    let seq = await create(token, config);
    if (seq) { await seq.play(); }
}

export const petrifyingGaze = {
    create,
    play,
};

autoanimations.register('Petrifying Gaze', 'ranged', 'eskie.effect.petrifyingGaze', DEFAULT_CONFIG);