// Original Author: EskieMoh#2969
// Modular Conversion: bakanabaka

import { dependency } from '../../../lib/dependency.js';
import { img } from '../../../lib/filemanager.js';

/**
 * Creates the Lightning Bolt animation sequence.
 * @param {Token} token - The casting token.
 * @param {object} position - The {x, y} coordinates of the end point of the bolt.
 * @param {object} config - Configuration options for the animation.
 * @returns {Sequence} The created Sequence object.
 */
async function create({ token, position, config } = {}) {
    const sequence = new Sequence();
    sequence
        .effect()
        .file(img("jb2a.static_electricity.03.blue"))
        .atLocation(token)
        .scaleToObject(1.5)
        .repeats(2, 4000, 4000)

        .effect()
        .file(img("jb2a.magic_signs.circle.02.evocation.loop.blue"))
        .atLocation(token)
        .fadeIn(500)
        .fadeOut(500)
        .anchor({ x: 0.15 })
        .scaleToObject(1.1)
        .duration(5000)
        .rotateTowards(position, { cacheLocation: true })
        .loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 1000 })
        .scaleOut(0.1, 1000, { ease: "easeOutQuint", delay: -4000 })
        .zIndex(2)

        .effect()
        .file(img("jb2a.static_electricity.01.blue"))
        .atLocation(token)
        .fadeIn(500)
        .fadeOut(500)
        .anchor({ x: 0.21 })
        .scaleToObject(1.35)
        .duration(5000)
        .rotateTowards(position, { cacheLocation: true })
        .scaleOut(0.1, 1000, { ease: "easeOutQuint", delay: -4000 })
        .zIndex(2)
        .waitUntilFinished(-3000)

        .effect()
        .file(img("jb2a.impact.011.blue"))
        .atLocation(token)
        .anchor({ x: 0.15 })
        .scaleToObject(1.1)
        .rotateTowards(position, { cacheLocation: true })
        .zIndex(3)

        .effect()
        .file(img("animated-spell-effects-cartoon.electricity.blast.03"))
        .atLocation(token)
        .spriteOffset({ x: 125 })
        .filter("ColorMatrix", { hue: -20 })
        .filter("ColorMatrix", { saturate: 1.25 })
        .scale(1)
        .stretchTo(position, { tiling: true, cacheLocation: true })
        .zIndex(3)

        .effect()
        .file(img("animated-spell-effects-cartoon.electricity.curves"))
        .atLocation(token, { cacheLocation: true })
        .scale(0.3)
        .stretchTo(position, { onlyX: true, tiling: true, cacheLocation: true })
        .belowTokens()
        .repeats(5, 500, 1500);

    return sequence;
}

/**
 * Plays the Lightning Bolt animation, including crosshair placement and FXMaster filters.
 * @param {Token} token - The casting token.
 * @param {object} options - Options for playing the animation, including config.
 */
async function play(token, position, { config } = {}) {
    if (!position) {
        const crosshairConfig = {
            size: 1,
            icon: 'icons/magic/lightning/bolt-strike-blue-white.webp',
            label: 'Lightning Bolt',
            tag: 'Electricity',
            t: 'circle',
            drawIcon: true,
            drawOutline: true,
            interval: -1,
        };
        position = await Sequencer.Crosshair.show(crosshairConfig);
        if (position.cancelled) { return; }
    }

    const sequence = await create({ token, position: { x: position.x, y: position.y }, config });
    if (sequence) return sequence.play();
}

export const lightningBolt = {
    create,
    play,
    // No stop function needed as this is not a persistent effect
};