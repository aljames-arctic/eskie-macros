/* **
   Originally Published: 4/14/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a angry emote effect on a token.
 *
 * @param {Token} token The token to play the effect on.
 * 
 * @param {object} [options={}] Options for the effect.
 * @param {string} [options.id='angry'] The id of the effect.
 * @param {number} [options.duration=5000] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {string} [options.file] The file to use for the effect. If not provided, it will be determined based on installed modules.
 * 
 * @param {object} [offsets={}] Options for the effect offsets.
 * @param {number} [offsets.offsetx=0.3] The x offset of the effect in grid units.
 * @param {number} [offsets.offsety=-0.3] The y offset of the effect in grid units.
 * @param {number} [offsets.scale=0.65] The scale of the effect.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, {id = 'angry', duration = 5000, file = undefined} = {}, {offsetx = 0.3, offsety = -0.3, scale = 0.65} = {}) {
    const tokenWidth = token.document.width;
    if (!file) file = eskieMacros.file('emote', 'angry', '02');

    let angryEffect = new Sequence()
        .effect()
        .name(id)
        .file(file)
        .atLocation(token)
        .scaleIn(0, 1000, {ease: "easeOutElastic"})
        .scaleOut(0, 1000, {ease: "easeOutExpo"})
        .spriteOffset({ x: offsetx*tokenWidth, y: offsety*tokenWidth }, { gridUnits: true, local: true })
        .scaleToObject(scale)
    angryEffect = (duration > 0) ? angryEffect.duration(duration) : angryEffect.persist();    
    angryEffect = angryEffect.duration(duration)
        .attachTo(token, { bindAlpha: false })
        .loopProperty("alphaFilter", "alpha", { values: [...new Array(8).fill(1), ...new Array(8).fill(-1)], duration: 25, pingPong: false })
        .private()

        .effect()
        .name(id)
        .file(file)
        .atLocation(token)
        .scaleIn(0, 1000, {ease: "easeOutElastic"})
        .scaleOut(0, 1000, {ease: "easeOutExpo"})
        .spriteOffset({ x: offsetx*tokenWidth, y: offsety*tokenWidth }, { gridUnits: true, local: true })
        .scaleToObject(scale);
    angryEffect = (duration > 0) ? angryEffect.duration(duration) : angryEffect.persist();
    angryEffect = angryEffect
        .attachTo(token, {bindAlpha: false})
        .loopProperty("alphaFilter", "alpha", { values: [...new Array(8).fill(-1), ...new Array(8).fill(1)], duration: 25, pingPong: false })
        .waitUntilFinished();

    return angryEffect;
}

async function play(token, config = {}, options = {}) {
    let seq = await create(token, config, options);
    await seq.play();
}

async function stop(token, {id = 'angry'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const angry = {
    create,
    play,
    stop,
};
