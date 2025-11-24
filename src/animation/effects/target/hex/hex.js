/**
 * Original Author: EskieMoh#2969
 * Update Author: bakanabaka
 */

import { img } from '../../../../lib/filemanager.js';

async function create(token, target, config) {
    const defaultConfig = {
        id: 'hex',
        duration: 10000
    };
    const mergedConfig = foundry.utils.mergeObject(defaultConfig, config);
    const { id, duration } = mergedConfig;

    let seq = new Sequence()
        .effect()
        .name(id)
        .file(img(`jb2a.particles.outward.purple.01.03`))
        .attachTo(target)
        .scale(0.15)
        .playbackRate(1)
        .duration(1000)
        .fadeOut(500)
        .scaleIn(0, 1000, { ease: "easeOutCubic" })
        .filter("ColorMatrix", { hue: 0 })
        .animateProperty("sprite", "width", { from: 0, to: 0.5, duration: 500, gridUnits: true, ease: "easeOutBack" })
        .animateProperty("sprite", "height", { from: 0, to: 1.5, duration: 1000, gridUnits: true, ease: "easeOutBack" })
        .animateProperty("sprite", "position.y", { from: 0, to: -1, duration: 1000, gridUnits: true })
        .zIndex(0.2)

        .effect()
        .name(id)
        .file(img("animated-spell-effects-cartoon.misc.all seeing eye"))
        .attachTo(target)
        .filter("ColorMatrix", { hue: 182 })
        .scaleToObject(0.75)
        .scaleIn(0, 250, { ease: "easeOutCubic" })
        .zIndex(0.1)

        .effect()
        .name(id)
        .file(img("animated-spell-effects-cartoon.simple.27"))
        .attachTo(target)
        .scaleToObject(4)
        .spriteOffset({ x: 0.1, y: -0.45 }, { gridUnits: true })
        .filter("ColorMatrix", { brightness: -1 })

        .effect()
        .name(id)
        .file(img("jb2a.ward.rune.dark_purple.01"))
        .attachTo(target)
        .scaleToObject(1.85)
        .fadeOut(3000);
    seq = (duration > 0) ? seq.duration(duration) : seq.persist();
    seq = seq
        .opacity(1)
        .belowTokens()
        .scaleIn(0, 250, { ease: "easeOutCubic" })

        .effect()
        .name(id)
        .file(img("jb2a.extras.tmfx.outflow.circle.04"))
        .attachTo(target)
        .belowTokens()
        .filter("ColorMatrix", { brightness: -1 })
        .opacity(2)
        .scaleToObject(1.35)
        .scaleIn(0, 500, { ease: "easeOutCubic" })
        .fadeOut(500);

    return seq;
}

async function play(token, target, config = {}) {
    let seq = await create(token, target, config);
    if (seq) { await seq.play(); }
}

async function stop(token, { id = 'hex' } = {}) {
    Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const hexCast = {
    create,
    play,
    stop,
};
