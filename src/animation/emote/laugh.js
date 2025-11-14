
/* **
   Originally Published: 6/5/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a laugh emote effect on a token.
 *
 * @param {Token} token The token to play the effect on.
 * 
 * @param {object} [options={}] Options for the effect.
 * @param {string} [options.id='laugh'] The id of the effect.
 * @param {number} [options.duration=0] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {string} [options.facing='left'] The direction the token is facing. Can be 'left' or 'right'.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, {id = 'laugh', duration = 0, facing = 'left'} = {}) {
    const tokenWidth = token.document.width;
    const mirrorFace = facing === 'right';
    const facingFactor = mirrorFace ? -1 : 1;
    const file = eskieMacros.file('emote', 'laugh', '01', 'yellow');

    let laughEffect = new Sequence()
        .animation()
        .on(token)
        .opacity(0)

        .effect()
        .name(id)
        .file(file)
        .atLocation(token, {offset:{x:(-0.4*tokenWidth*facingFactor), y:-0.45*tokenWidth}, gridUnits: true, local: true})
        .attachTo(token, {bindAlpha: false})
        .loopProperty("sprite", "rotation", { from: 0, to: -15*facingFactor, duration: 250, ease: "easeOutCubic" })
        .loopProperty("sprite", "position.y", { from: 0, to: -0.025, duration: 250, gridUnits: true, pingPong: false })
        .scaleToObject(0.34)
        .mirrorX(mirrorFace)
        .private();
    laughEffect = (duration > 0) ? laughEffect.duration(duration) : laughEffect.persist();

    laughEffect = laughEffect
        .effect()
        .name(id)
        .copySprite(token)
        .scaleToObject(token.document.texture.scaleX)
        .atLocation(token)
        .attachTo(token, {bindAlpha: false})
        .loopProperty("sprite", "position.y", { from: 0, to: -0.01, duration: 150, gridUnits: true, pingPong: true, ease:"easeOutQuad" })
        .loopProperty("sprite", "width", { from: 0, to: 0.015, duration: 150, gridUnits: true, pingPong: true, ease:"easeOutQuad" })
        .loopProperty("sprite", "height", { from: 0, to: 0.015, duration: 150, gridUnits: true, pingPong: true, ease:"easeOutQuad"  })
        .mirrorY(token.document.mirrorX)
        .waitUntilFinished(-200)
    laughEffect = (duration > 0) ? laughEffect.duration(duration) : laughEffect.persist();
    
    laughEffect = laughEffect
        .animation()
        .on(token)
        .opacity(1);
    
    return laughEffect;
}

async function play(token, config = {}) {
    let seq = await create(token, config);
    await seq.play();
}

async function stop(token, {id = 'laugh'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const laugh = {
    create,
    play,
    stop,
};
