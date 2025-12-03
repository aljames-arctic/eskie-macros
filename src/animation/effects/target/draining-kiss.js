/**
 * Original Author: EskieMoh#2969
 * Update Author: bakanabaka
 */

import { img } from '../../../lib/filemanager.js';

const DEFAULT_CONFIG = {
    id: 'draining-kiss',
};

function create(token, target, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id } = mergedConfig;

    const label = `${id} - ${token.id} - ${target.id}`;

    let seq = new Sequence()
        .effect()
        .file(img("jb2a.icon.heart.pink"))
        .atLocation(token)
        .moveTowards(target, { ease: "easeOutCubic", rotate: false })
        .moveSpeed(1000)
        .zeroSpriteRotation()
        .scaleToObject(0.8)
        .filter("ColorMatrix", { hue: -30 })
        .scaleIn(0, 200, { ease: "linear" })
        .duration(5000)
        .animateProperty("sprite", "scale.x", { from: Math.abs((token.x - target.x) / canvas.grid.size), to: 0, duration: 300, ease: "easeInOutBack" })
        .animateProperty("sprite", "scale.y", { from: Math.abs((token.y - target.y) / canvas.grid.size), to: 0, duration: 300, ease: "easeInOutBack" })
        .zIndex(3)

        .effect()
        .file(img("jb2a.particles.outward.purple.01.03"))
        .atLocation(target)
        .delay(200)
        .scaleToObject(2)
        .zIndex(4)
        .scaleIn(0, 250, { ease: "easeOutCubic" })
        .duration(8000)
        .fadeOut(2000)

        .effect()
        .name(label)
        .file(img("jb2a.icon.heart.pink"))
        .atLocation(target)
        .attachTo(target)
        .scaleToObject(0.5)
        .filter("ColorMatrix", { hue: -30 })
        .zIndex(3)
        .delay(1000)
        .persist()
        .private()

        .effect()
        .file(img("jb2a.impact.004.dark_purple"))
        .atLocation(target)
        .delay(200)
        .scaleToObject(1.25)
        .opacity(1)
        .randomRotation()
        .zIndex(2)
        .waitUntilFinished(-2000)

        .effect()
        .copySprite(target)
        .atLocation(target)
        .attachTo(target)
        .delay(200)
        .fadeOut(250)
        .duration(500)
        .tint("#ed44fc")
        .opacity(0.5)
        .filter("Blur", { blurX: 10, blurY: 20 })
        .filter("ColorMatrix", { brightness: 2 })
        .zIndex(1)
        .waitUntilFinished(-500)

        .effect()
        .name(label)
        .file(img("jb2a.energy_strands.range.multiple.purple.01"))
        .atLocation(target)
        .stretchTo(token, { attachTo: true })
        .playbackRate(1)
        .zIndex(2)
        .persist()
        .private()

        .effect()
        .name(label)
        .file(img("jb2a.token_border.circle.static.purple.012"))
        .atLocation(token)
        .attachTo(token)
        .opacity(0.6)
        .delay(500)
        .fadeIn(3000, { ease: "easeInOutQuad" })
        .scaleIn(0, 2000, { ease: "easeOutCubic" })
        .scaleToObject(1.9, { considerTokenScale: true })
        .filter("ColorMatrix", { saturate: 0 })
        .belowTokens()
        .persist()
        .private()

        .effect()
        .name(label)
        .file(img("jb2a.ground_cracks.purple.02"))
        .atLocation(target)
        .scaleToObject(0.9)
        .delay(500)
        .opacity(0.75)
        .attachTo(target)
        .filter("ColorMatrix", { brightness: 0 })
        .fadeIn(1000, { ease: "easeInOutQuad" })
        .scaleIn(0, 3000, { ease: "easeOutCubic" })
        .zIndex(1)
        .persist()
        .private()
        .mask(target)

        .effect()
        .name(label)
        .copySprite(target)
        .delay(1500)
        .fadeIn(10000)
        .attachTo(target)
        .filter("Blur", { blurX: 20, blurY: 20 })
        .opacity(0.5)
        .filter("ColorMatrix", { saturate: -1, brightness: 0.5 })
        .zIndex(0)
        .persist();

    return seq;
}

async function play(token, target, config = {}) {
    let seq = create(token, target, config);
    if (seq) { await seq.play(); }
}

async function stop(token, target, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id } = mergedConfig;
    Sequencer.EffectManager.endEffects({ name: id });
}

export const drainingKiss = {
    create,
    play,
    stop,
};
