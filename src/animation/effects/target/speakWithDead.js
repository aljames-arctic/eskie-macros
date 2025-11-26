// Original Author: EskieMoh#2969
// Updater: @bakanabaka
import { img } from "../../../lib/filemanager.js";

/**
 * Creates the animation sequence for Speak With Dead.
 * @param {object} token - The casting token.
 * @param {object} target - The target token.
 * @param {object} config - Configuration options.
 * @param {boolean} config.toggleDeathOverlay - Whether to toggle the death overlay icon.
 * @param {string} config.id - A unique ID for the effect to manage persistence.
 * @returns {Sequence} The animation sequence.
 */
async function create(token, target, config = { toggleDeathOverlay: true, id: 'speakWithDead' }) {
    if (!target) return new Sequence();

    let sequence = new Sequence();

    // Magic Circle Effect
    sequence
        .effect()
        .name(config.id)
        .atLocation(target)
        .file(img(`jb2a.magic_signs.circle.02.necromancy.loop.blue`))
        .scaleToObject(1.25)
        .scaleIn(0, 600, {ease: "easeOutCubic"})
        .filter("ColorMatrix", {hue:-65})
        .loopProperty("sprite", "rotation", { from: 0, to: -360, duration: 60000})
        .belowTokens()
        .fadeOut(2000)
        .zIndex(0)
        .persist()

        .effect()
        .name(config.id)
        .atLocation(target)
        .file(img(`jb2a.magic_signs.circle.02.necromancy.loop.green`))
        .scaleToObject(1.25)
        .scaleIn(0, 600, {ease: "easeOutCubic"})
        .belowTokens(true)
        .filter("ColorMatrix", {saturate:-1, brightness:2})
        .filter("Blur", { blurX: 5, blurY: 5 })
        .loopProperty("sprite", "rotation", { from: 0, to: -360, duration: 60000})
        .zIndex(1)
        .duration(1200)
        .fadeIn(200, {ease: "easeOutCirc", delay: 500})
        .fadeOut(300, {ease: "linear"})

        .wait(500)

        // Bottom Right Flame
        .effect()
        .name(config.id)
        .atLocation(target, {offset: {x:0.5, y:0.5}, gridUnits:true})
        .file(img("jb2a.impact.008.blue"))
        .filter("ColorMatrix", {hue:-65})
        .scaleToObject(1)
        .zIndex(1)

        .effect()
        .name(config.id)
        .atLocation(target, {offset: {x:0.5, y:0.5}, gridUnits:true})
        .file(img("jb2a.flames.01.blue"))
        .belowTokens()
        .filter("ColorMatrix", {hue:-65})
        .scaleToObject(0.5)
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .randomizeMirrorX()
        .persist()

        .effect()
        .name(config.id)
        .delay(250)
        .atLocation(target, {offset: {x:0.5, y:0.5-0.35}, gridUnits:true})
        .file(img("animated-spell-effects-cartoon.smoke.97"))
        .scaleToObject(0.8)
        .opacity(0.4)
        .tint("#6ff087")
        .fadeIn(500)
        .zIndex(2)
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .randomizeMirrorX()
        .persist()

        // Bottom Left Flame
        .effect()
        .name(config.id)
        .atLocation(target, {offset: {x:-0.5, y:0.5}, gridUnits:true})
        .file(img("jb2a.impact.008.blue"))
        .filter("ColorMatrix", {hue:-65})
        .scaleToObject(1)
        .zIndex(1)

        .effect()
        .name(config.id)
        .atLocation(target, {offset: {x:-0.5, y:0.5}, gridUnits:true})
        .file(img("jb2a.flames.01.blue"))
        .belowTokens()
        .filter("ColorMatrix", {hue:-65})
        .scaleToObject(0.5)
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .randomizeMirrorX()
        .persist()

        .effect()
        .name(config.id)
        .delay(250)
        .atLocation(target, {offset: {x:-0.5, y:0.5-0.35}, gridUnits:true})
        .file(img("animated-spell-effects-cartoon.smoke.97"))
        .scaleToObject(0.8)
        .opacity(0.4)
        .tint("#6ff087")
        .fadeIn(500)
        .zIndex(2)
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .randomizeMirrorX()
        .persist()

        // Top Left Flame
        .effect()
        .name(config.id)
        .atLocation(target, {offset: {x:-0.5, y:-0.5}, gridUnits:true})
        .file(img("jb2a.impact.008.blue"))
        .filter("ColorMatrix", {hue:-65})
        .scaleToObject(1)
        .zIndex(1)

        .effect()
        .name(config.id)
        .atLocation(target, {offset: {x:-0.5, y:-0.5}, gridUnits:true})
        .file(img("jb2a.flames.01.blue"))
        .belowTokens()
        .filter("ColorMatrix", {hue:-65})
        .scaleToObject(0.5)
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .randomizeMirrorX()
        .persist()

        .effect()
        .name(config.id)
        .delay(250)
        .atLocation(target, {offset: {x:-0.5, y:-0.5-0.35}, gridUnits:true})
        .file(img("animated-spell-effects-cartoon.smoke.97"))
        .scaleToObject(0.8)
        .opacity(0.4)
        .tint("#6ff087")
        .fadeIn(500)
        .zIndex(1)
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .randomizeMirrorX()
        .persist()

        // Top Right Flame
        .effect()
        .name(config.id)
        .atLocation(target, {offset: {x:0.5, y:-0.5}, gridUnits:true})
        .file(img("jb2a.impact.008.blue"))
        .filter("ColorMatrix", {hue:-65})
        .scaleToObject(1)
        .zIndex(1)

        .effect()
        .name(config.id)
        .atLocation(target, {offset: {x:0.5, y:-0.5}, gridUnits:true})
        .file(img("jb2a.flames.01.blue"))
        .belowTokens()
        .filter("ColorMatrix", {hue:-65})
        .scaleToObject(0.5)
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .randomizeMirrorX()
        .persist()

        .effect()
        .name(config.id)
        .delay(250)
        .atLocation(target, {offset: {x:0.5, y:-0.5-0.35}, gridUnits:true})
        .file(img("animated-spell-effects-cartoon.smoke.97"))
        .scaleToObject(0.8)
        .opacity(0.4)
        .tint("#6ff087")
        .fadeIn(500)
        .zIndex(1)
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .randomizeMirrorX()
        .persist()

        // Token effect
        .effect()
        .name(config.id)
        .delay(1000)
        .file(img("animated-spell-effects-cartoon.magic.mind sliver"))
        .atLocation(target, {offset:{y:-0.75*target.document.width}, gridUnits:true})
        .scaleToObject(2)
        .rotate(-90)
        .filter("ColorMatrix", {hue:-65})
        .fadeIn(250)
        .filter("Blur", { blurX: 1, blurY: 50 })
        .zIndex(2)

        .effect()
        .name(config.id)
        .delay(100)
        .file(img("jb2a.particles.outward.blue.01.03"))
        .atLocation(target)
        .scaleToObject(1.1)
        .filter("ColorMatrix", {saturate:-1, brightness:2})
        .animateProperty("spriteContainer", "position.y", { from: 0, to: -0.75, duration: 500, ease: "easeOutCubic", gridUnits:true})
        .animateProperty("sprite", "width", { from: 1, to: 0.5, duration: 100,  ease: "easeOutCubic", gridUnits: true})
        .animateProperty("sprite", "height", { from: 1, to: 1.5, duration: 500,  ease: "easeOutCubic", gridUnits: true})
        .fadeOut(500)
        .duration(500)
        .zIndex(2)

        .effect()
        .name(config.id)
        .delay(100)
        .file(img("jb2a.detect_magic.circle.blue"))
        .atLocation(target)
        .scaleToObject(1.25)
        .filter("ColorMatrix", {hue:-65})
        .fadeOut(3500)
        .zIndex(1.5)

        .animation()
        .delay(200)
        .on(target)
        .opacity(0)

        .effect()
        .name(config.id)
        .file(img("jb2a.token_border.circle.static.blue.012"))
        .attachTo(target, {bindAlpha: false, bindRotation: false})
        .scaleToObject(1.85, {considerTokenScale: true})
        .fadeIn(4000)
        .opacity(0.5)
        .filter("ColorMatrix", {hue:-65})
        .zIndex(1.1)
        .animateProperty("spriteContainer", "position.y", { from: 0, to: -0.2, duration: 2000, delay:2000, gridUnits: true, ease: "easeInSine"})
        .loopProperty("spriteContainer", "position.y", { from: 0, to: 0.05, duration: 2500, delay:4000, gridUnits: true, ease: "easeInOutQuad", pingPong: true})
        .persist()

        .effect()
        .name(config.id)
        .delay(100)
        .copySprite(target)
        .attachTo(target, {bindAlpha: false, bindRotation: false})
        .scaleToObject(0.95,{considerTokenScale:true})
        .opacity(0.5)
        .belowTokens()
        .filter("ColorMatrix", { brightness: -1 })
        .filter("Blur", { blurX: 5, blurY: 10 })
        .zIndex(1.1)
        .persist()

        .effect()
        .name(config.id)
        .delay(2000)
        .file(img("jb2a.spirit_guardians.blue.spirits"))
        .attachTo(target, {offset: {y:0}, gridUnits:true, bindAlpha: false, bindRotation: false})
        .scaleToObject(1.35,{considerTokenScale:true})
        .persist()
        .filter("ColorMatrix", {hue:-65})
        .opacity(0.65)
        .fadeIn(1000)
        .zIndex(0.1)

        .effect()
        .name(config.id)
        .delay(3000)
        .file(img("jb2a.magic_signs.rune.necromancy.complete.blue"))
        .attachTo(target, {offset: {y:-0.77*target.document.width}, gridUnits:true, bindAlpha: false, bindRotation: false})
        .scaleToObject(0.4,{considerTokenScale:true})
        .persist()
        .filter("ColorMatrix", {hue:-65})
        .opacity(1)
        .loopProperty("spriteContainer", "position.y", { from: 0, to: 0.05, duration: 2500, delay:1000, gridUnits: true, ease: "easeInOutQuad", pingPong: true})
        .zIndex(2)

        .effect()
        .name(config.id)
        .delay(3000)
        .file(img("jb2a.magic_signs.rune.necromancy.complete.blue"))
        .attachTo(target, {offset: {y:-0.55*target.document.width}, gridUnits:true, bindAlpha: false, bindRotation: false})
        .scaleToObject(0.4,{considerTokenScale:true})
        .persist()
        .opacity(0.5)
        .belowTokens()
        .filter("ColorMatrix", { brightness: -1 })
        .filter("Blur", { blurX: 5, blurY: 10 })
        .zIndex(2)

        .effect()
        .name(config.id)
        .delay(100)
        .copySprite(target)
        .attachTo(target, {bindAlpha: false, bindRotation: false})
        .scaleToObject(1,{considerTokenScale:true})
        .animateProperty("spriteContainer", "position.y", { from: 0, to: -0.2, duration: 2000, delay:2000, gridUnits: true, ease: "easeInSine"})
        .animateProperty("sprite", "rotation", { from: 0, to: 15, duration: 1000, delay:2500, ease: "easeInOutBack"})
        .animateProperty("sprite", "rotation", { from: 0, to: -15, duration: 1000, delay:3000, ease: "easeInOutBack"})
        .loopProperty("spriteContainer", "position.y", { from: 0, to: 0.05, duration: 2500, delay:4000, gridUnits: true, ease: "easeInOutQuad", pingPong: true})
        .persist()
        .zIndex(0.2)
        .waitUntilFinished(-500); // Small wait to ensure persistence starts before play returns

    return sequence;
}

/**
 * Plays the Speak With Dead animation.
 * @param {object} token - The casting token.
 * @param {object} target - The target token.
 * @param {object} config - Configuration options.
 * @param {boolean} config.toggleDeathOverlay - Whether to toggle the death overlay icon.
 * @param {string} config.id - A unique ID for the effect to manage persistence.
 */
async function play(token, target, config = { toggleDeathOverlay: true, id: 'speakWithDead' }) {
    if (!target) return;

    if (Tagger.hasTags(target, "SpeakWithDead")) {
        await stop(target, { id: config.id, toggleDeathOverlay: config.toggleDeathOverlay });
    } else {
        await Tagger.addTags(target, "SpeakWithDead");
        const sequence = await create(token, target, config);
        sequence.play();
    }
}

/**
 * Stops the Speak With Dead animation and cleans up effects.
 * @param {object} target - The target token.
 * @param {object} config - Configuration options.
 * @param {boolean} config.toggleDeathOverlay - Whether to toggle the death overlay icon.
 * @param {string} config.id - A unique ID for the effect to manage persistence.
 */
async function stop(target, config = { id: 'speakWithDead', toggleDeathOverlay: true }) {
    new Sequence().animation().on(target).opacity(1).play(); // Restore opacity
    Sequencer.EffectManager.endEffects({ name: config.id, object: target });
    Tagger.removeTags(target, "SpeakWithDead");
    // Optionally restore opacity if not handled by play, but play seems to handle it on re-trigger
    // new Sequence().animation().on(target).opacity(1).play();
}

export const speakWithDead = {
    create,
    play,
    stop
};