
/* **
   Originally Published: 4/14/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a shout emote effect on a token.
 *
 * @param {Token} token The token to play the effect on.
 * 
 * @param {object} [options={}] Options for the effect.
 * @param {string} [options.id='shout'] The id of the effect.
 * @param {number} [options.duration=0] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {string} [options.facing='left'] The direction the token is facing. Can be 'left' or 'right'.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, {id = 'shout', duration = 0, facing = 'left'} = {}) {
    const tokenWidth = token.document.width;
    const mirrorFace = facing === 'right';
    const facingFactor = mirrorFace ? -1 : 1;

    let shoutEffect = new Sequence()
        .effect()
        .name(id)
        .file("https://i.imgur.com/kMbIhW3.png")
        .atLocation(token, {offset:{x:(-0.45*tokenWidth)*facingFactor, y:(-0.4*tokenWidth)}, gridUnits: true, local: true})
        .spriteRotation(35*facingFactor)
        .loopProperty("sprite", "rotation", { from: 0, to: 15*facingFactor, duration: 250,ease: "easeOutCubic" })
        .loopProperty("sprite", "position.y", { from: 0, to: -0.025, duration: 250, gridUnits: true, pingPong: false })
        .loopProperty("sprite", "position.x", { from: 0, to: -0.025*facingFactor, duration: 250, gridUnits: true, pingPong: false })
        .scaleToObject(0.3)
        .private()
        .mirrorX(mirrorFace)
        .mirrorY()

        .effect()
        .name(id)
        .file("https://i.imgur.com/v2dx2oE.png")
        .atLocation(token, {offset:{x:(-0.6*tokenWidth)*facingFactor, y:(-0.25*tokenWidth)}, gridUnits: true, local: true})
        .spriteRotation(-15*facingFactor)
        .loopProperty("sprite", "rotation", { from: 0, to: -10*facingFactor, duration: 250, ease: "easeOutCubic" })
        .loopProperty("sprite", "position.y", { from: 0, to: -0.025, duration: 250, gridUnits: true, pingPong: false })
        .loopProperty("sprite", "position.x", { from: 0, to: -0.025*facingFactor, duration: 250, gridUnits: true, pingPong: false })
        .scaleToObject(0.37)
        .private()
        .mirrorX(mirrorFace)

        .effect()
        .name(id)
        .file("https://i.imgur.com/kMbIhW3.png")
        .atLocation(token, {offset:{x:(-0.6*tokenWidth)*facingFactor, y:(-0.05*tokenWidth)}, gridUnits: true, local: true})
        .loopProperty("sprite", "rotation", { from: 0, to: 15*facingFactor, duration: 250,ease: "easeOutCubic" })
        .loopProperty("sprite", "position.y", { from: 0, to: -0.025, duration: 250, gridUnits: true, pingPong: false })
        .loopProperty("sprite", "position.x", { from: 0, to: -0.025*facingFactor, duration: 250, gridUnits: true, pingPong: false })
        .scaleToObject(0.3)
        .mirrorX(mirrorFace)
        .waitUntilFinished(-200);

    if (duration > 0) {
        shoutEffect = shoutEffect.duration(duration);
    } else {
        shoutEffect = shoutEffect.persist();
    }
    
    return shoutEffect.attachTo(token, {bindAlpha: false});
}

async function play(token, config = {}) {
    let seq = await create(token, config);
    await seq.play();
}

async function stop(token, {id = 'shout'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const shout = {
    create,
    play,
    stop,
};
