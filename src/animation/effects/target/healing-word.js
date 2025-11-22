/**
 * Original Author: EskieMoh#2969
 * Update Author: bakanabaka
 */
import { img } from '../../../lib/filemanager.js';

function getColor(color) {
    if (!color) return { hue: -35, hex: '#00FF00' }; // default to green
    switch (color.toLowerCase()) {
        case 'red': return { hue: 0, hex: '#FF0000' };
        case 'yellow': return { hue: 0, hex: '#FFFF00' };
        case 'green': return { hue: -35, hex: '#00FF00' };
        case 'blue': return { hue: 0, hex: '#0000FF' };
        case 'purple':  return { hue: 0, hex: '#FF00FF' }; // Magenta
        default: return { hue: null, hex: color };
    }
}

async function create(token, target, config) {
    const defaultConfig = {
        id: 'healing-word',
        color: 'green',
        word: 'Heal!',
    };
    const mergedConfig = foundry.utils.mergeObject(defaultConfig, config);
    const { id, color, word } = mergedConfig;

    const colorVal = getColor(color);

    const style = {
        "fill": "#ffffff",
        "fontFamily": "Helvetica",
        "fontSize": 24 * target.document.width,
        "strokeThickness": 0,
        fontWeight: "bold",
    };

    let seq = new Sequence()
        .effect()
        .name(id)
        .atLocation(target, { offset: { x: 0, y: -0.55 * target.document.width }, gridUnits: true })
        .file(img(`animated-spell-effects-cartoon.level 01.healing word.${color}`))
        .fadeOut(250)
        .zIndex(1)
        .scale(0.25 * target.document.width)
        .scaleIn(0, 500, { ease: "easeOutBack" })
        .zIndex(0)

        .effect()
        .name(id)
        .atLocation(target, { offset: { x: 0, y: -0.55 * target.document.width }, gridUnits: true })
        .file(img("jb2a.particles.outward.orange.02.04"))
        .fadeOut(250)
        .zIndex(1)
        .scale(0.25 * target.document.width)
        .duration(600)
        .scaleIn(0, 500, { ease: "easeOutBack" })
        .zIndex(0)

        .effect()
        .name(id)
        .atLocation(target, { offset: { x: 0, y: -0.6 * target.document.width }, gridUnits: true })
        .file(img("jb2a.particles.outward.orange.02.03"))
        .fadeOut(250)
        .zIndex(1)
        .scale(0.25 * target.document.width)
        .scaleIn(0, 500, { ease: "easeOutBack" })
        .animateProperty("sprite", "position.y", { from: 0, to: 0.6 * target.document.width, duration: 1000, gridUnits: true, delay: 500 })
        .animateProperty("sprite", "scale.x", { from: 0, to: 0.15, duration: 1000, delay: 500 })
        .animateProperty("sprite", "scale.y", { from: 0, to: 0.15, duration: 1000, delay: 500 })
        .zIndex(1.1)

        .effect()
        .name(id)
        .atLocation(target, { offset: { x: 0, y: -0.6 * target.document.width }, gridUnits: true })
        .text(word, style)
        .duration(2000)
        .fadeOut(1000)
        .zIndex(1)
        .animateProperty("sprite", "position.y", { from: 0, to: 0.6 * target.document.width, duration: 2000, gridUnits: true })
        .rotateIn(-10, 1000, { ease: "easeOutElastic" })
        .scaleIn(0, 500, { ease: "easeOutElastic" })
        .filter("Glow", { color: colorVal.hex })
        .zIndex(1)

        .effect()
        .name(id)
        .atLocation(token, { offset: { x: 0, y: 0 }, gridUnits: true })
        .text(word, style)
        .duration(2000)
        .fadeOut(250)
        .zIndex(1)
        .animateProperty("sprite", "scale.x", { from: 0, to: 0.5, duration: 1000, delay: 500 })
        .animateProperty("sprite", "scale.y", { from: 0, to: 0.5, duration: 1000, delay: 500 })
        .filter("ColorMatrix", { brightness: 0 })
        .filter("Blur", { blurX: 5, blurY: 10 })
        .opacity(0.75)
        .scaleIn(0, 500, { ease: "easeOutBack" })
        .waitUntilFinished(-750)
        .effect()
        .name(id)
        .atLocation(target)
        .file(img(`jb2a.healing_generic.200px.${color}`))
        .scaleToObject(1.25)
        .filter("ColorMatrix", { hue: colorVal.hue })
        .zIndex(2)

        .effect()
        .name(id)
        .copySprite(target)
        .opacity(0.5)
        .attachTo(target)
        .scaleToObject(target.document.texture.scaleX)
        .filter("Glow", { color: colorVal.hex, distance: 20 })
        .duration(1000)
        .fadeIn(500)
        .fadeOut(500, { ease: "easeInSine" })
        .filter("ColorMatrix", { brightness: 1.5 })
        .tint(colorVal.hex);

    return seq;
}

async function play(token, target, config) {
    let seq = await create(token, target, config);
    if (seq) { await seq.play(); }
}

async function stop(token, { id = 'healing-word' } = {}) {
    Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const healingWord = {
    create,
    play,
    stop,
};
