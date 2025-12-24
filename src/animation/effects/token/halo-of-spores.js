// Original Author: EskieMoh#2969
// Modular Conversion: bakanabaka

import { img } from '../../../lib/filemanager.js';

/**
 * Creates the Halo of Spores animation sequence.
 * @param {Token} token - The casting token.
 * @param {Token} target - The target token.
 * @param {object} config - Configuration options for the animation.
 * @returns {Sequence} The created Sequence object.
 */
async function create(token, target, config = {}) {
    const sequence = new Sequence();
    sequence
        .effect()
        .file(img("jb2a.spirit_guardians.green.particles"))
        .atLocation(token, { randomOffset: 0 })
        .filter("ColorMatrix", { hue: 60 })
        .size(3.5 + token.document.width, { gridUnits: true })
        .duration(3000)
        .belowTokens()
        .fadeIn(500)
        .fadeOut(500)
        .opacity(0.45)

        .effect()
        .file(img("jb2a.fireflies.many.02.green"))
        .attachTo(token, { randomOffset: 0 })
        .scaleToObject(1.5)
        .fadeIn(500)
        .fadeOut(500)
        .randomRotation()
        .duration(3000)
        .opacity(0.8)
        .filter("ColorMatrix", { hue: 60 })

        .effect()
        .file(img("jb2a.sleep.cloud.01.green"))
        .attachTo(token)
        .scaleToObject(1.75)
        .belowTokens()
        .scaleIn(0, 500, { ease: "easeOutCubic" })
        .filter("ColorMatrix", { hue: 60 })
        .duration(3000)
        .fadeIn(500)
        .fadeOut(500)

        .effect()
        .file(img("jb2a.fireflies.many.02.green"))
        .atLocation(target, { randomOffset: 0 })
        .scaleToObject(1.5)
        .fadeIn(500)
        .randomRotation()
        .scaleOut(0, 1000, { ease: "easeInBack" })
        .duration(1500)
        .opacity(0.8)
        .repeats(2, 100, 100)
        .filter("ColorMatrix", { hue: 60 })

        .effect()
        .delay(250)
        .file(img("jb2a.cast_generic.ice.01.blue"))
        .atLocation(target)
        .scaleToObject(1)
        .playbackRate(2)
        .filter("ColorMatrix", { hue: -60 })
        .waitUntilFinished(0)

        .effect()
        .file(img("animated-spell-effects-cartoon.energy.pulse.green"))
        .atLocation(target)
        .scaleToObject(1.25)
        .playbackRate(1)
        .filter("ColorMatrix", { hue: 60 })

        .effect()
        .file(img("jb2a.impact.004.green"))
        .atLocation(target)
        .scaleToObject(2)
        .playbackRate(1)
        .belowTokens()
        .filter("ColorMatrix", { hue: 60 })

        .effect()
        .copySprite(target)
        .attachTo(target)
        .fadeIn(200)
        .fadeOut(500)
        .loopProperty("sprite", "position.x", { from: -0.05, to: 0.05, duration: 50, pingPong: true, gridUnits: true })
        .scaleToObject(1, { considerTokenScale: true })
        .duration(1500)
        .opacity(0.25)

        .effect()
        .file(img("jb2a.particles.outward.greenyellow.01.03"))
        .scaleToObject(2)
        .scaleIn(0.15, 750, { ease: "easeOutQuint" })
        .fadeOut(1500)
        .atLocation(target)
        .duration(1500)
        .randomRotation()
        .filter("ColorMatrix", { saturate: 1, hue: 60 })
        .zIndex(5);

    return sequence;
}

/**
 * Plays the Halo of Spores animation.
 * @param {Token} token - The casting token.
 * @param {Token} target - The target token.
 * @param {object} options - Options for playing the animation, including config.
 */
async function play(token, target, config = {}) {
    const sequence = await create(token, target, config);
    if (sequence) return sequence.play();
}

export const haloOfSpores = {
    create,
    play,
    // No stop function needed as this is not a persistent effect
};