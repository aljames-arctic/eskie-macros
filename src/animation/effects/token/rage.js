// Original Author: EskieMoh#2969
// Modular Conversion: bakanabaka

import { img } from "../../../lib/filemanager.js";

async function create(token, config = {}) {
    const sequence = new Sequence();

    sequence.effect()
        .file(img("jb2a.extras.tmfx.outpulse.circle.02.normal"))
        .atLocation(token)
        .size(4, { gridUnits: true })
        .opacity(0.25);

    sequence.effect()
        .file(img("jb2a.impact.ground_crack.orange.02"))
        .atLocation(token)
        .belowTokens()
        .filter("ColorMatrix", { hue: -15, saturate: 1 })
        .size(3.5, { gridUnits: true })
        .zIndex(1);

    sequence.effect()
        .file(img("jb2a.impact.ground_crack.still_frame.02"))
        .atLocation(token)
        .belowTokens()
        .fadeIn(1000)
        .filter("ColorMatrix", { hue: -15, saturate: 1 })
        .size(3.5, { gridUnits: true })
        .persist()
        .name(`Rage-Effect-${token.id}`)
        .zIndex(0);

    sequence.effect()
        .file(img("jb2a.wind_stream.white"))
        .atLocation(token, { offset: { y: -0.05 }, gridUnits: true })
        .size(1.75, { gridUnits: true })
        .rotate(90)
        .opacity(0.9)
        .filter("ColorMatrix", { saturate: 1 })
        .tint("#FF0000")
        .loopProperty("sprite", "position.y", { from: -5, to: 5, duration: 50, pingPong: true })
        .duration(8000)
        .fadeOut(3000);

    sequence.effect()
        .file(img("jb2a.particles.outward.orange.01.03"))
        .atLocation(token)
        .scaleToObject(2.5)
        .opacity(1)
        .fadeIn(200)
        .fadeOut(3000)
        .loopProperty("sprite", "position.x", { from: -5, to: 5, duration: 50, pingPong: true })
        .animateProperty("sprite", "position.y", { from: 0, to: -100, duration: 6000, pingPong: true, delay: 2000 })
        .duration(8000);

    sequence.effect()
        .file(img("jb2a.wind_stream.white"))
        .atLocation(token)
        .name(`Rage-Effect-${token.id}`)
        .attachTo(token)
        .scaleToObject()
        .rotate(90)
        .opacity(1)
        .filter("ColorMatrix", { saturate: 1 })
        .tint("#FF0000")
        .persist()
        .private();

    sequence.effect()
        .file(img("jb2a.token_border.circle.static.orange.012"))
        .atLocation(token)
        .name(`Rage-Effect-${token.id}`)
        .attachTo(token)
        .opacity(0.6)
        .scaleToObject(1.9)
        .filter("ColorMatrix", { saturate: 1 })
        .tint("#FF0000")
        .persist();

    return sequence;
}

async function play(token, config) {
    const sequence = await create(token, config);
    if (sequence) { return sequence.play(); }
}

async function stop(token, config) {
    Sequencer.EffectManager.endEffects({ name: `Rage-Effect-${token.id}`, object: token });
    new Sequence()
        .animation()
        .on(token)
        .opacity(1)
        .play();
}

export const rage = {
    create,
    play,
    stop,
};