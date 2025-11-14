
/* **
   Originally Published: 4/14/2023
   Author: EskieMoh#2969 
   Update Author: bakanabaka
** */

/**
 * Creates a drunk emote effect on a token.
 *
 * @param {Token} token The token to play the effect on.
 * 
 * @param {object} [options={}] Options for the effect.
 * @param {string} [options.id='drunk'] The id of the effect.
 * @param {number} [options.duration=7000] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * 
 * @param {object} [offsets={}] Options for the effect offsets.
 * @param {number} [offsets.offsetx=-0.2] The x offset of the effect in grid units.
 * @param {number} [offsets.offsety=-0.6] The y offset of the effect in grid units.
 * @param {number} [offsets.scale=0.05] The scale of the effect.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, {id = 'drunk', duration = 0} = {}, {offsetx = -0.2, offsety = -0.3, scale = 0.5} = {}) {
    const tokenWidth = token.document.width;
    const blush = eskieMacros.file('emote', 'blush', '01');
    const drunkBubbles = eskieMacros.file('emote', 'drunk_bubbles', '01');

    let drunkEffect = new Sequence()
    // Drunk bubbles effect
        .effect()
        .file(drunkBubbles)
        .name(id)
        .delay(0,500)
        .atLocation(token, {offset:{x:offsetx*tokenWidth, y:offsety*tokenWidth}, gridUnits:true});
    drunkEffect = (duration > 0) ? drunkEffect.duration(duration) : drunkEffect.persist();
    drunkEffect = drunkEffect
        .scaleToObject(scale)
        .zeroSpriteRotation()
        .loopProperty("sprite", "position.x", {  from:0, to: -0.02, duration: 2000, pingPong: true, gridUnits: true, ease:"linear" })
        .loopProperty("sprite", "position.y", { from:0.15, to: -0.15, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutSine" })
        .loopProperty("sprite", "width", {  from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("sprite", "height", { from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("alphaFilter", "alpha", { values: [-1, 1, 1, 1, 1, -1], duration: 1000, pingPong: true, ease:"easeOutCubic" })
        .attachTo(token, {bindAlpha: false, bindRotation:false})
        .private()

        .animation()
        .on(token)
        .opacity(0)

    // Blush effect attached to token with bobbing motion
        .effect()
        .file(blush)
        .zIndex(0)
        .name(id)
        .opacity(0.85)
        .scaleToObject(scale)
        .loopProperty("spriteContainer", "position.x", {  from:-20, to: 20, duration: 2500, pingPong: true, ease:"easeInOutSine" })
        .loopProperty("sprite", "position.y", { values: [0, 20, 0, 20], duration: 2500, pingPong: true })
        .loopProperty("sprite", "rotation", { from: -10, to: 10, duration: 2500, pingPong: true,ease:"easeInOutSine" });
    drunkEffect = (duration > 0) ? drunkEffect.duration(duration) : drunkEffect.persist();
    drunkEffect = drunkEffect
        .atLocation(token)
        .spriteOffset({ x: 0.15*tokenWidth, y: -0.15*tokenWidth }, { gridUnits: true, local: true })
        .attachTo(token, {bindAlpha: false, bindRotation:true})
        .private()

    // Sway effect attached to token
        .effect()
        .copySprite(token)
        .name(id)
        .atLocation(token)
        .loopProperty("spriteContainer", "position.x", {  from:-20, to: 20, duration: 2500, pingPong: true, ease:"easeInOutSine" })
        .loopProperty("sprite", "position.y", { values: [0, 20, 0, 20], duration: 2500, pingPong: true })
        .loopProperty("sprite", "rotation", { from: -10, to: 10, duration: 2500, pingPong: true,ease:"easeInOutSine" });
    drunkEffect = (duration > 0) ? drunkEffect.duration(duration) : drunkEffect.persist();
    drunkEffect = drunkEffect
        .attachTo(token, {bindAlpha: false})
        .waitUntilFinished()

        .animation()
        .on(token)
        .opacity(1);

    return drunkEffect;
}

async function play(token, config = {}, options = {}) {
    let seq = await create(token, config, options);
    await seq.play();
}

async function stop(token, {id = 'drunk'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const drunk = {
    create,
    play,
    stop,
};
