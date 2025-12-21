// Original Author: EskieMoh#2969
// Modular Conversion: bakanabaka

import { img } from "../../../lib/filemanager.js";

const DEFAULT_CONFIG = {
    color: 'green',
    aoeDistance: 10,
};

function getTintAndHue(color) {
    switch (color) {
        case 'blue':
            return { tintColor: '0x91c5d2', hue: '160' };
        case 'green':
            return { tintColor: '0xd3eb6a', hue: '45' };
        case 'purple':
            return { tintColor: '0xdcace3', hue: '250' };
        default:
            return { tintColor: '0xd3eb6a', hue: '45' };
    }
}

async function create(targets, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { location, color, aoeDistance } = mergedConfig;
    const { tintColor, hue } = getTintAndHue(color);

    const sequence = new Sequence();

    sequence.effect()
        .file(img(`animated-spell-effects-cartoon.flash.25`))
        .atLocation(location)
        .scale(0.05)
        .playbackRate(1)
        .duration(1500)
        .opacity(0.75)
        .scaleIn(0, 1000, {ease: "easeOutCubic"})
        .filter("ColorMatrix", {brightness: 0, hue: hue})
        .filter("Blur", { blurX: 5, blurY: 10 })
        .animateProperty("sprite", "width", { from: 0, to: -0.25, duration: 2500, gridUnits:true, ease:"easeInOutBack"})
        .animateProperty("sprite", "height", { from: 0, to: -0.25, duration: 2500, gridUnits:true, ease:"easeInOutBack"})
        .belowTokens();

    sequence.effect()
        .file(img(`jb2a.particles.outward.white.01.03`))
        .atLocation(location)
        .scale(0.025)
        .playbackRate(1)
        .duration(1500)
        .fadeIn(1500)
        .scaleIn(0, 1500, {ease: "easeOutCubic"})
        .filter("ColorMatrix", { hue: hue})
        .animateProperty("sprite", "width", { from: 0, to: 0.5, duration: 2500, gridUnits:true, ease:"easeOutBack"})
        .animateProperty("sprite", "height", { from: 0, to: 1, duration: 2500, gridUnits:true, ease:"easeOutBack"})
        .animateProperty("spriteContainer", "position.y", { from: 0, to: -0.45, duration: 2500, gridUnits:true});

    sequence.effect()
        .file(img(`jb2a.sacred_flame.target.${color}`))
        .atLocation(location)
        .scale(0.05)
        .playbackRate(1)
        .duration(1500)
        .scaleIn(0, 1500, {ease: "easeOutCubic"})
        .animateProperty("sprite", "width", { from: 0, to: 0.5, duration: 2500, gridUnits:true, ease:"easeOutBack"})
        .animateProperty("sprite", "height", { from: 0, to: 0.5, duration: 2500, gridUnits:true, ease:"easeOutBack"})
        .animateProperty("spriteContainer", "position.y", { from: 0, to: -0.25, duration: 2500, gridUnits:true, ease: "easeOutBack"})
        .waitUntilFinished(-200);

    sequence.effect()
        .file(img(`jb2a.impact.010.${color}`))
        .atLocation(location, {offset: {y:-0.25}, gridUnits: true})
        .scale(0.45)
        .randomRotation()
        .zIndex(1);

    sequence.effect()
        .file(img("jb2a.particles.outward.white.01.03"))
        .scaleIn(0, 500, {ease: "easeOutQuint"})
        .fadeOut(1000)
        .atLocation(location, {offset: {y:-0.25}, gridUnits: true})
        .randomRotation()
        .duration(2500)
        .size(3, {gridUnits: true})
        .filter("Glow", { color: tintColor, distance: 10 })
        .zIndex(2);

    sequence.effect()
        .file(img(`jb2a.fireflies.{{Pfew}}.02.${color}`))
        .atLocation({x:location.x, y:location.y}, {randomOffset: 3.5})
        .scaleToObject(1.8)
        .randomRotation()
        .duration(750)
        .fadeOut(500)
        .setMustache({
            "Pfew": ()=> {
                const Pfews = [`few`,`many`];
                return Pfews[Math.floor(Math.random()*Pfews.length)];
            }
        })
        .repeats(10, 75, 75)
        .zIndex(1);

    sequence.effect()
        .file(img(`animated-spell-effects-cartoon.energy.pulse.yellow`))
        .atLocation(location, {offset: {y:-0.25}, gridUnits: true})
        .size(5, {gridUnits: true})
        .filter("ColorMatrix", { saturate: -1, brightness:2, hue: hue})
        .fadeOut(250)
        .filter("Blur", { blurX: 10, blurY: 10 })
        .zIndex(0.5);

    sequence.effect()
        .delay(50)
        .file(img(`animated-spell-effects-cartoon.energy.pulse.yellow`))
        .atLocation(location, {offset: {y:-0.25}, gridUnits: true})
        .size(5, {gridUnits: true})
        .filter("ColorMatrix", { hue: hue})
        .zIndex(0.5);

    targets.forEach(target => {
        sequence.wait(1000);

        sequence.effect()
            .file(img(`jb2a.fireflies.many.01.${color}`))
            .attachTo(target)
            .scaleToObject(1.4)
            .persist()
            .randomRotation()
            .fadeIn(500, {delay:500})
            .fadeOut(1500, {ease: "easeInSine"})
            .name(`Faerie Fire - ${target.name}`)
            .private();

        /*sequence.effect()
            .copySprite(target)
            .belowTokens()
            .attachTo(target, {locale: true})
            .scaleToObject(target.width)
            .spriteRotation(target.rotation*-1)
            .filter("Glow", { color: tintColor, distance: 20 })
            .persist()
            .fadeIn(1500, {delay:500})
            .fadeOut(1500, {ease: "easeInSine"})
            .zIndex(0.1)
            .name(`Faerie Fire - ${target.name}`);*/
    });

    return sequence;
}

async function play(targets, config = {}) {
    if (!config.location) {
        config.location = await Sequencer.Crosshair.show();
        if (config.location.cancelled) { return; }
    }
    const sequence = await create(targets, config);
    if (sequence) { return sequence.play(); }
}

async function stop(target) {
    Sequencer.EffectManager.endEffects({ name: `Faerie Fire - ${target.name}`, object: target });
}

async function clean() {
    Sequencer.EffectManager.endEffects({ name: `Faerie Fire` });
}

export const faerieFire = {
    create,
    play,
    stop,
    clean,
};
