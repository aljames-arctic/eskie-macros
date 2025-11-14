
/* **
   Originally Published: 4/14/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a soulsucked emote effect on a token.
 *
 * @param {Token} token The token to play the effect on.
 * 
 * @param {object} [options={}] Options for the effect.
 * @param {string} [options.id='soulsucked'] The id of the effect.
 * @param {number} [options.duration=0] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {string} [options.facing='left'] The direction the token is facing. Can be 'left' or 'right'.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, {id = 'soulsucked', duration = 0, facing = 'left'} = {}) {
    const tokenWidth = token.document.width;
    const mirrorFace = facing === 'right';
    const facingFactor = mirrorFace ? -1 : 1;

    let soulSuckedEffect = new Sequence()
        .effect()
        .name(id)
        .file("https://i.imgur.com/dBaFOB8.png")
        .atLocation(token)
        .scaleIn(0, 1000, {ease: "easeOutElastic"})
        .scaleOut(0, 1000, {ease: "easeOutExpo"})
        .spriteOffset({x:(-0.45*tokenWidth)*facingFactor, y:-0.25}, { gridUnits: true, local: true})
        .scaleToObject(0.45)
        .mirrorX(mirrorFace)
        .loopProperty("sprite", "position.y", { from: -0.05, to: 0.05, duration: 3000, gridUnits:true, pingPong: true})
        .waitUntilFinished();

    if (duration > 0) {
        soulSuckedEffect = soulSuckedEffect.duration(duration);
    } else {
        soulSuckedEffect = soulSuckedEffect.persist();
    }
    
    return soulSuckedEffect.attachTo(token, {bindAlpha: false});
}

async function play(token, config = {}) {
    let seq = await create(token, config);
    await seq.play();
}

async function stop(token, {id = 'soulsucked'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const soulsucked = {
    create,
    play,
    stop,
};
