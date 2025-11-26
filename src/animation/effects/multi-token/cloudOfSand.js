// Original Author: EskieMoh#2969
// Updater: @bakanabaka
import { img } from "../../../lib/filemanager.js";
/**
 *
 * @param {object} token
 * @param {object[]} targets
 * @param {object} config
 * @returns {Sequence}
 */
async function create(token, targets, config = { persist: false }) {
    let configWarpgate = {
        size: 9,
        icon: 'icons/magic/air/air-wave-gust-smoke-yellow.webp',
        label: 'Cloud of Sand',
        tag: 'entangle',
        t: 'circle',
        drawIcon: true,
        drawOutline: true,
        interval: 2,
        rememberControlled: true,
    }
    //This will make the "Crosshair" appear.
    let position = await Sequencer.Crosshair.show(configWarpgate);

    let sequence = new Sequence()

    .effect()
    .name("Cloud of Sand")
    .file(img("jb2a.extras.tmfx.outflow.circle.04"))
    .attachTo(token)
    .scaleToObject(1.75)
    .fadeIn(1000, {ease: "easeInCubic"})
    .fadeOut(1500)
    .filter("ColorMatrix", { saturate:-0.25, brightness: 1.15, hue: -30 })
    .tint("#faff1e")
    .belowTokens()
    .opacity(0.45)
    .duration(7500)

    .effect()
    .name("Cloud of Sand")
    .file(img("jb2a.sleep.cloud.01.yellow"))
    .attachTo(token)
    .scaleToObject(1.75)
    .fadeIn(1000, {ease: "easeInCubic"})
    .filter("ColorMatrix", { hue: -25 })
    .belowTokens()
    .loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 1500})
    .fadeOut(1500)
    .duration(7500)

    .wait(500)

    .effect()
    .delay(750)
    .file(img("animated-spell-effects-cartoon.air.portal"))
    .atLocation(position,{offset: {y:-0.25}, gridUnits:true})
    .size(10, {gridUnits:true})
    .scaleIn(0, 250, {ease: "easeInCirc"})
    //.rotateIn(-360, 1000, {ease: "easeOutCubic"})
    .fadeOut(500)
    .filter("ColorMatrix", { saturate:-0.5, brightness: 1.35, hue: -40 })
    .opacity(0.45)
    .duration(1000)
    .mirrorX()
    .tint("#faff1e")
    .belowTokens()

    .effect()
    .name("Cloud of Sand")
    .file(img("jb2a.extras.tmfx.outflow.circle.04"))
    .atLocation(position)
    .size(12, {gridUnits:true})
    .fadeIn(1000, {ease: "easeInCubic"})
    .fadeIn(500)
    .filter("ColorMatrix", { saturate:-0.25, brightness: 1.15, hue: -30 })
    .tint("#faff1e")
    .belowTokens()
    .opacity(0.45)
    .persist(config.persist)

    .effect()
    .name("Cloud of Sand")
    .file(img("jb2a.sleep.cloud.01.yellow"))
    .atLocation(position)
    .size(12, {gridUnits:true})
    .scaleIn(0, 1000, {ease: "easeInCubic"})
    .rotateIn(-900, 1000, {ease: "easeOutCubic"})
    .fadeIn(500)
    .filter("ColorMatrix", { hue: -25 })
    .belowTokens()
    .loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 1500})
    .persist(config.persist)
    .rotateOut(360, 500, {ease: "easeOutCubic", delay: 250})
    .scaleOut(1, 500, {ease: "easeOutCubic", delay: 250})
    .fadeOut(750)

    .effect()
    .name("Cloud of Sand")
    .file(img("jb2a.sleep.cloud.01.yellow"))
    .atLocation(position)
    .size(10, {gridUnits:true})
    .scaleIn(0, 1000, {ease: "easeInCubic"})
    .rotateIn(-900, 1000, {ease: "easeOutCubic"})
    .fadeIn(500)
    .filter("ColorMatrix", { hue: -25 })
    .loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 1400})
    .persist(config.persist)
    .opacity(0.65)
    .rotate(90)
    .duration(7000)
    .zIndex(2)
    .rotateOut(-360, 500, {ease: "easeOutCubic", delay: 250})
    .scaleOut(1, 500, {ease: "easeOutCubic", delay: 250})
    .fadeOut(750)

    .effect()
    .name("Cloud of Sand")
    .file(img("jb2a.sleep.cloud.01.yellow"))
    .atLocation(position)
    .size(6, {gridUnits:true})
    .scaleIn(0, 1000, {ease: "easeInCubic"})
    .rotateIn(-900, 1000, {ease: "easeOutCubic"})
    .fadeIn(500)
    .filter("ColorMatrix", { hue: -25 })
    .loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 1300})
    .persist(config.persist)
    .opacity(0.4)
    .rotate(180)
    .zIndex(3)
    .rotateOut(360, 500, {ease: "easeOutCubic", delay: 250})
    .scaleOut(1, 500, {ease: "easeOutCubic", delay: 250})
    .fadeOut(750)

    .effect()
    .name("Cloud of Sand")
    .file(img("jb2a.sleep.cloud.02.yellow"))
    .atLocation(position)
    .size(2, {gridUnits:true})
    .scaleIn(0, 1000, {ease: "easeInCubic"})
    .rotateIn(-900, 1000, {ease: "easeOutCubic"})
    .fadeIn(500)
    .filter("ColorMatrix", { hue: -25 })
    .loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 1200})
    .persist(config.persist)
    .opacity(0.25)
    .rotate(180)
    .zIndex(4)
    .rotateOut(-360, 500, {ease: "easeOutCubic", delay: 250})
    .scaleOut(1, 500, {ease: "easeOutCubic", delay: 250})
    .fadeOut(750)

    .effect()
    .name("Cloud of Sand")
    .file(img("jb2a.sleep.cloud.02.yellow"))
    .atLocation(position)
    .size(1, {gridUnits:true})
    .scaleIn(0, 1000, {ease: "easeInCubic"})
    .rotateIn(-900, 1000, {ease: "easeOutCubic"})
    .fadeIn(500)
    .filter("ColorMatrix", { hue: -25 })
    .loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 1100})
    .persist(config.persist)
    .opacity(0.15)
    .rotate(180)
    .zIndex(5)
    .rotateOut(360, 500, {ease: "easeOutCubic", delay: 250})
    .scaleOut(1, 500, {ease: "easeOutCubic", delay: 250})
    .fadeOut(750)

    .wait(7500)

    .thenDo(function(){
        if (config.persist == false){
            Sequencer.EffectManager.endEffects({ name: `Cloud of Sand` });
        }
    })

    return sequence;
}

function _targetEffects(targets) {
    let sequence = new Sequence();
    targets.forEach(target => {
        sequence.effect()
            .delay(1000)
            .copySprite(target)
            .attachTo(target)
            .fadeIn(100)
            .fadeOut(100)
            .loopProperty("sprite", "position.x", { from: -0.05, to: 0.05, duration: 100, pingPong: true, gridUnits: true})
            .scaleToObject(1, {considerTokenScale: true})
            .duration(6500)
            .opacity(0.15)
    });
    return sequence;
}

/**
 *
 * @param {object} token
 * @param {object[]} targets
 * @param {object} config
 */
async function play(token, targets, config = { persist: false }) {
    const sequence = await create(token, targets, config);
    sequence.play();
    const targetSequence = _targetEffects(targets);
    targetSequence.play();
}

function stop(token, { id = 'Cloud of Sand' } = {}) {
    Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const cloudOfSand = {
    create,
    play,
    stop
}
