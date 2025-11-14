
/* **
   Originally Published: 5/1/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a slap emote effect at a specified location.
 *
 * @param {object} location The location to play the effect at.
 * @param {object} [options={}] Options for the effect.
 * @param {string} [options.id='slap'] The id of the effect.
 * @param {number} [options.duration=0] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(location, {id = 'slap', duration = 0} = {}) {
    let slapEffect = new Sequence()
        .effect()
        .atLocation(location,{offset:{x:0.1, y:-0.1},gridUnits:true})
        .file("animated-spell-effects-cartoon.magic.impact.02")
        .size(1.4, {gridUnits:true})

        .effect()
        .atLocation(location)
        .file("https://i.imgur.com/9tLjNHH.png")
        .size(0.55, {gridUnits:true})
        .rotate(-45)
        .fadeOut(250)
        .duration(1000)
        .delay(50)
        .zIndex(1)

        .effect()
        .atLocation(location)
        .file("https://i.imgur.com/9tLjNHH.png")
        .filter("ColorMatrix", { brightness: -1 })
        .opacity(0.5)
        .duration(6000)
        .fadeOut(1000)
        .rotate(-45)
        .delay(50)
        .zIndex(0);

    if (duration > 0) {
        slapEffect = slapEffect.duration(duration);
    } else {
        slapEffect = slapEffect.persist();
    }
    
    return slapEffect;
}

async function play(token, config = {}) {
    let crosshairConfig = {
        size:0.5,
        icon: 'icons/magic/symbols/star-rising-purple.webp',
        label: 'slap',
        tag: 'Spray',
        t: 'cone',
        drawIcon: false,
        drawOutline: true,
        interval:0,
        fillAlpha: 0.25,
        fillColor: '#FF0000',
        rememberControlled: true,
        cancelled: false
    };
    let location = await warpgate.crosshairs.show(crosshairConfig);
    if (location.cancelled) return;

    let seq = await create(location, config);
    await seq.play();
}

async function stop(token, {id = 'slap'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id });
}

export const slap = {
    create,
    play,
    stop,
};
