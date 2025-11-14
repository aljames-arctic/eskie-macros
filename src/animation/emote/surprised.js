
/* **
   Originally Published: 4/14/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a surprised emote effect on a token.
 *
 * @param {Token} token The token to play the effect on.
 * 
 * @param {object} [config={}] Options for the effect.
 * @param {string} [config.id='surprised'] The id of the effect.
 * @param {number} [config.duration=0] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {object[]} [config.effect] An array of effect objects to display. Partial objects will be merged with default values.
 * @param {string} [config.effect.img] The image file to use for the effect.
 * @param {number} [config.effect.scale] The scale of the effect.
 * @param {object} [config.effect.anchor] The anchor point of the effect.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, config = {}) {
    const defaultConfig = {
        id: 'surprised',
        duration: 0,
        effect: [
            {
                img: "https://i.imgur.com/8Yr9fMC.png",
                scale: 0.6,
                anchor: { x: 0.5, y: 1.55 }
            },
            {
                img: "https://i.imgur.com/myWyksT.png",
                scale: 0.45,
                anchor: { x: -0.3, y: 1.25 }
            }
        ]
    };
    let { id, duration, effect } = eskieMacros.mergeObject(defaultConfig, config);

    let surprisedEffect = new Sequence()
        .effect()
        .name(id)
        .file(effect[0].img)
        .atLocation(token)
        .anchor(effect[0].anchor)
        .scaleIn(0, 500, { ease: "easeOutElastic" })
        .scaleOut(0, 500, { ease: "easeOutExpo" })
        .loopProperty("sprite", "position.y", { from: 0, to: -15, duration: 750, pingPong: true })
        .scaleToObject(effect[0].scale)
        .private()

        .effect()
        .name(id)
        .file(effect[1].img)
        .atLocation(token)
        .anchor(effect[1].anchor)
        .scaleIn(0, 500, { ease: "easeOutElastic" })
        .scaleOut(0, 500, { ease: "easeOutExpo" })
        .loopProperty("sprite", "position.y", { from: 0, to: -15, duration: 750, pingPong: true })
        .scaleToObject(effect[1].scale)
        .waitUntilFinished();

    if (duration > 0) {
        surprisedEffect = surprisedEffect.duration(duration);
    } else {
        surprisedEffect = surprisedEffect.persist();
    }

    return surprisedEffect.attachTo(token, { bindAlpha: false });
}

async function play(token, config = {}) {
    let seq = await create(token, config);
    await seq.play();
}

async function stop(token, {id = 'surprised'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const surprised = {
    create,
    play,
    stop,
};
