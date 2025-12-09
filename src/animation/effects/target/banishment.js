/* **
   Original Author: derkreigs
   Update Author: bakanabaka
** */

import { img } from "../../../lib/filemanager.js";

const DEFAULT_CONFIG = {
    id: 'banish',
    color: 'yellow',
};

async function createBanish(target, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id, color } = mergedConfig;
    const sequence = new Sequence();
    sequence.effect()
        .file(img(`jb2a.magic_signs.circle.02.conjuration.intro.${color}`))
        .atLocation(target)
        .scaleToObject(2)
        .belowTokens();
    sequence.effect()
        .file(img(`jb2a.magic_signs.circle.02.conjuration.loop.${color}`))
        .atLocation(target)
        .scaleToObject(2)
        .belowTokens()
        .delay(3000)
        .duration(13000)
        .fadeOut(1000);
    sequence.effect()
        .file(img(`jb2a.magic_signs.rune.conjuration.complete.${color}`))
        .atLocation(target, { offset: { x: 70, y: 22 } })
        .scaleToObject(0.5)
        .delay(3750)
        .playbackRate(0.65)
        .animateProperty("sprite", "position.x", { from: 0, to: -70, duration: 500, delay: 4000, ease: "easeInBack" })
        .animateProperty("sprite", "position.y", { from: 0, to: -97, duration: 500, delay: 4000, ease: "easeInBack" })
        .duration(4500);
    sequence.effect()
        .file(img(`jb2a.magic_signs.rune.conjuration.complete.${color}`))
        .atLocation(target, { offset: { x: 45, y: -61 } })
        .scaleToObject(0.5)
        .delay(4250)
        .playbackRate(0.65)
        .animateProperty("sprite", "position.x", { from: 0, to: -45, duration: 500, delay: 3500, ease: "easeInBack" })
        .animateProperty("sprite", "position.y", { from: 0, to: -14, duration: 500, delay: 3500, ease: "easeInBack" })
        .duration(4000);
    sequence.effect()
        .file(img(`jb2a.magic_signs.rune.conjuration.complete.${color}`))
        .atLocation(target, { offset: { x: -45, y: -61 } })
        .scaleToObject(0.5)
        .delay(4750)
        .playbackRate(0.65)
        .animateProperty("sprite", "position.x", { from: 0, to: 45, duration: 500, delay: 3000, ease: "easeInBack" })
        .animateProperty("sprite", "position.y", { from: 0, to: -14, duration: 500, delay: 3000, ease: "easeInBack" })
        .zIndex(0.9)
        .duration(3500);
    sequence.effect()
        .file(img(`jb2a.magic_signs.rune.conjuration.complete.${color}`))
        .atLocation(target, { offset: { x: -70, y: 22 } })
        .scaleToObject(0.5)
        .delay(5250)
        .playbackRate(0.65)
        .animateProperty("sprite", "position.x", { from: 0, to: 70, duration: 500, delay: 2500, ease: "easeInBack" })
        .animateProperty("sprite", "position.y", { from: 0, to: -97, duration: 500, delay: 2500, ease: "easeInBack" })
        .zIndex(0.9)
        .duration(3000);
    sequence.effect()
        .file(img(`jb2a.magic_signs.rune.conjuration.complete.${color}`))
        .atLocation(target, { offset: { x: 0, y: 75 } })
        .scaleToObject(0.5)
        .delay(5750)
        .playbackRate(0.65)
        .animateProperty("sprite", "position.x", { from: 0, to: 0, duration: 500, delay: 2000, ease: "easeInBack" })
        .animateProperty("sprite", "position.y", { from: 0, to: -150, duration: 500, delay: 2000, ease: "easeInBack" })
        .zIndex(0.9)
        .duration(2500);
    sequence.effect()
        .file(img(`jb2a.explosion.01.${color}`))
        .atLocation(target, { offset: { x: 5, y: -75 } })
        .scaleToObject(1.5)
        .delay(8250)
        .zIndex(1);
    sequence.effect()
        .file(img(`jb2a.portals.vertical.vortex.${color}`))
        .atLocation(target, { offset: { x: 0, y: -75 } })
        .scaleToObject(2)
        .duration(6000)
        .scaleIn({ x: 0, y: 0.8 }, 500)
        .scaleOut({ x: 0, y: 0.4 }, 500, { ease: "easeInBack" })
        .fadeOut(250)
        .delay(8250)
        .zIndex(0.7)
        .belowTokens()
        .waitUntilFinished(-5750);
    sequence.effect()
        .file(img(`jb2a.wind_stream.1200.white`))
        .atLocation(target)
        .scaleToObject(1.03)
        .rotate(90)
        .duration(6000)
        .fadeIn(250)
        .fadeOut(750);
    sequence.effect()
        .file(img(`jb2a.wind_stream.1200.white`))
        .atLocation(target, { offset: { x: 0, y: 100 } })
        .scaleToObject(1.03)
        .rotate(90)
        .duration(6000)
        .fadeIn(250)
        .fadeOut(750);
    sequence.effect()
        .file(img(`jb2a.energy_beam.normal.${color}`))
        .atLocation(target, { offset: { x: 0, y: 50 } })
        .rotate(90)
        .size({ width: 400, height: 350 })
        .opacity(0.2)
        .duration(6000)
        .playbackRate(1.6)
        .fadeIn(250)
        .fadeOut(750);
    sequence.animation()
        .on(target)
        .opacity(0)
        .show(false)
        .waitUntilFinished(-500);
    sequence.effect()
        .copySprite(target)
        .atLocation(target)
        .animateProperty("sprite", "position.y", { from: 0, to: -15, duration: 250, ease: "easeInOutBack" })
        .waitUntilFinished(-100);
    sequence.effect()
        .copySprite(target)
        .atLocation(target)
        .animateProperty("sprite", "position.y", { from: -15, to: 0, duration: 2000, ease: "easeInOutBack" })
        .animateProperty("sprite", "rotation", { from: 0, to: 8, duration: 500, ease: "easeOutCubic" })
        .animateProperty("sprite", "rotation", { from: 0, to: -16, duration: 500, delay: 500, ease: "easeOutCubic" })
        .animateProperty("sprite", "rotation", { from: 0, to: 16, duration: 500, delay: 1000, ease: "easeOutCubic" })
        .animateProperty("sprite", "rotation", { from: 0, to: -16, duration: 500, delay: 1500, ease: "easeInCubic" })
        .waitUntilFinished(-100);
    sequence.effect()
        .copySprite(target)
        .atLocation(target)
        .animateProperty("sprite", "position.y", { from: 0, to: -40, duration: 500, ease: "easeInOutBack" })
        .waitUntilFinished(-100);
    sequence.effect()
        .copySprite(target)
        .atLocation(target)
        .animateProperty("sprite", "position.y", { from: -40, to: -15, duration: 2000, ease: "easeInOutBack" })
        .animateProperty("sprite", "rotation", { from: 0, to: 8, duration: 500, ease: "easeOutCubic" })
        .animateProperty("sprite", "rotation", { from: 0, to: -16, duration: 500, delay: 500, ease: "easeOutCubic" })
        .animateProperty("sprite", "rotation", { from: 0, to: 16, duration: 500, delay: 1000, ease: "easeOutCubic" })
        .animateProperty("sprite", "rotation", { from: 0, to: -16, duration: 500, delay: 1500, ease: "easeInCubic" })
        .waitUntilFinished(-100);
    sequence.effect()
        .copySprite(target)
        .atLocation(target)
        .animateProperty("sprite", "position.y", { from: -15, to: -200, duration: 750, ease: "easeInOutBack" })
        .scaleOut(0, 750)
        .duration(375)
        .waitUntilFinished(-150);
    sequence.effect()
        .file(img(`jb2a.explosion.02.${color}`))
        .atLocation(target, { offset: { x: 0, y: -85 } })
        .scaleToObject(0.5)
        .filter("ColorMatrix", { hue: 15 })
        .zIndex(0.9);
    sequence.effect()
        .file(img(`jb2a.detect_magic.cone.${color}`))
        .rotateTowards(target)
        .atLocation(target, { offset: { x: 0, y: -110 } })
        .scaleToObject(1)
        .playbackRate(1.5)
        .zIndex(1);
    sequence.effect()
        .file(img(`jb2a.template_circle.out_pulse.02.loop.${color}`))
        .atLocation(target, { offset: { x: 0, y: -75 } })
        .scaleToObject(1.75)
        .delay(1000)
        .fadeOut(1000)
        .waitUntilFinished(-1500);
    sequence.effect()
        .file(img(`jb2a.fireflies.many.02.${color}`))
        .atLocation(target, { offset: { x: 0, y: -75 } })
        .scaleToObject(0.75)
        .duration(2000)
        .fadeIn(500)
        .fadeOut(750)
        .animateProperty("sprite", "position.y", { from: 0, to: 75, duration: 3000 });
    return sequence;
}

async function playBanish(target, config = {}) {
    const sequence = await createBanish(target, config);
    if (sequence) { return sequence.play(); }
}

async function createReturn(target, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id, color } = mergedConfig;
    const sequence = new Sequence();
    sequence.effect()
        .file(img(`jb2a.explosion.01.${color}`))
        .atLocation(target, { offset: { x: 5, y: -75 } })
        .scaleToObject(1.5)
        .zIndex(1);
    sequence.effect()
        .file(img(`jb2a.portals.vertical.vortex.${color}`))
        .atLocation(target, { offset: { x: 0, y: -75 } })
        .scaleToObject(2)
        .duration(6000)
        .scaleIn({ x: 0, y: 0.8 }, 500)
        .scaleOut({ x: 0, y: 0.4 }, 500, { ease: "easeInBack" })
        .fadeOut(250)
        .zIndex(0.7)
        .belowTokens()
        .waitUntilFinished(-4000);
    sequence.effect()
        .copySprite(target)
        .atLocation(target)
        .animateProperty("sprite", "position.y", { from: -75, to: 0, duration: 500, ease: "easeOutBounce" })
        .scaleIn(0.25, 500)
        .fadeIn(250)
        .waitUntilFinished(-150);
    sequence.animation()
        .on(target)
        .show(true)
        .opacity(1);
    return sequence;
}

async function playReturn(target, config = {}) {
    const sequence = await createReturn(target, config);
    if (sequence) { return sequence.play(); }
}

async function clean(target, config = {}) {
    new Sequence()
        .animation()
        .on(target)
        .opacity(1)
        .show(true)
        .play();
}

export const banishment = {
    banish: {
        create: createBanish,
        play: playBanish,
        stop: playReturn,
        clean: clean,
    },
    return: {
        create: createReturn,
        play: playReturn,
    },
    play: playBanish,
    stop: playReturn,
};
