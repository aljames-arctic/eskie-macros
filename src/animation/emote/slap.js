
/* **
   Originally Published: 5/1/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a slap emote effect at a specified location.
 *
 * @param {object} location The location to play the effect at.
 * @param {object} [config={}] Options for the effect.
 * @param {string} [config.id='slap'] The id of the effect.
 * @param {number} [config.duration=0] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {object[]} [config.effect] An array of effect objects to display. Partial objects will be merged with default values.
 * @param {string} [config.effect.img] The image file to use for the effect.
 * @param {number} [config.effect.x] The x offset of the effect in grid units.
 * @param {number} [config.effect.y] The y offset of the effect in grid units.
 * @param {number} [config.effect.size] The size of the effect in grid units.
 * @param {number} [config.effect.rotation] The rotation of the effect.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(location, config = {}) {
    const defaultConfig = {
        id: 'slap',
        duration: 0,
        effect: [
            { // impact
                img: "animated-spell-effects-cartoon.magic.impact.02",
                x: 0.1,
                y: -0.1,
                size: 1.4
            },
            { // slap image
                img: "https://i.imgur.com/9tLjNHH.png",
                size: 0.55,
                rotation: -45
            },
            { // slap image shadow
                img: "https://i.imgur.com/9tLjNHH.png",
                size: 0.55,
                rotation: -45
            }
        ]
    };
    let { id, duration, effect } = eskieMacros.mergeObject(defaultConfig, config);

    let slapEffect = new Sequence()
        .effect()
        .atLocation(location, { offset: { x: effect[0].x, y: effect[0].y }, gridUnits: true })
        .file(effect[0].img)
        .size(effect[0].size, { gridUnits: true })

        .effect()
        .atLocation(location)
        .file(effect[1].img)
        .size(effect[1].size, { gridUnits: true })
        .rotate(effect[1].rotation)
        .fadeOut(250)
        .duration(1000)
        .delay(50)
        .zIndex(1)

        .effect()
        .atLocation(location)
        .file(effect[2].img)
        .filter("ColorMatrix", { brightness: -1 })
        .opacity(0.5)
        .duration(6000)
        .fadeOut(1000)
        .rotate(effect[2].rotation)
        .size(effect[2].size, { gridUnits: true })
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
