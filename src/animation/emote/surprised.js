
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
 * @param {object} [options={}] Options for the effect.
 * @param {string} [options.id='surprised'] The id of the effect.
 * @param {number} [options.duration=0] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, {id = 'surprised', duration = 0} = {}) {
    let surprisedEffect = new Sequence()
        .effect()
        .name(id)
        .file("https://i.imgur.com/8Yr9fMC.png")
        .atLocation(token)
        .anchor({x: 0.5, y: 1.55})
        .scaleIn(0, 500, {ease: "easeOutElastic"})
        .scaleOut(0, 500, {ease: "easeOutExpo"})
        .loopProperty("sprite", "position.y", { from: 0, to: -15, duration: 750, pingPong: true})
        .scaleToObject(0.6)
        .private()

        .effect()
        .name(id)
        .file("https://i.imgur.com/myWyksT.png")
        .atLocation(token)
        .anchor({x: -0.3, y: 1.25})
        .scaleIn(0, 500, {ease: "easeOutElastic"})
        .scaleOut(0, 500, {ease: "easeOutExpo"})
        .loopProperty("sprite", "position.y", { from: 0, to: -15, duration: 750, pingPong: true})
        .scaleToObject(0.45)
        .waitUntilFinished();

    if (duration > 0) {
        surprisedEffect = surprisedEffect.duration(duration);
    } else {
        surprisedEffect = surprisedEffect.persist();
    }
    
    return surprisedEffect.attachTo(token, {bindAlpha: false});
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
