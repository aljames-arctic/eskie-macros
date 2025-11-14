
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
 * @param {object} [config={}] Configuration for the effect.
 * @param {string} [config.id='shout'] The id of the effect.
 * @param {number} [config.duration=0] The duration of the effect in milliseconds. A duration of 0 will make the effect persist.
 * @param {string} [config.facing='left'] The direction the token is facing. Can be 'left' or 'right'.
 * @param {object[]} [config.effect] An array of effect objects to display. Partial objects will be merged with default values.
 * @param {string} [config.effect.img] The image file to use for the effect.
 * @param {number} [config.effect.x] The x offset of the effect in grid units.
 * @param {number} [config.effect.y] The y offset of the effect in grid units.
 * @param {number} [config.effect.scale] The scale of the effect.
 * @param {number} [config.effect.rotation] The rotation of the effect.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, config = {}) {
    const defaultConfig = {
        id: 'shout',
        duration: 0,
        facing: 'left',
        effect: [
            {
                img: "https://i.imgur.com/kMbIhW3.png",
                x: -0.45,
                y: -0.4,
                scale: 0.3,
                rotation: 35
            },
            {
                img: "https://i.imgur.com/v2dx2oE.png",
                x: -0.6,
                y: -0.25,
                scale: 0.37,
                rotation: -15
            },
            {
                img: "https://i.imgur.com/kMbIhW3.png",
                x: -0.6,
                y: -0.05,
                scale: 0.3,
                rotation: 0
            }
        ]
    };
    let { id, duration, effect } = eskieMacros.mergeObject(defaultConfig, config);
    const facing = config.facing ?? defaultConfig.facing;

    const tokenWidth = token.document.width;
    const mirrorFace = facing === 'right';
    const facingFactor = mirrorFace ? -1 : 1;

    let shoutEffect = new Sequence()
        .effect()
        .name(id)
        .file(effect[0].img)
        .atLocation(token, { offset: { x: (effect[0].x * tokenWidth) * facingFactor, y: (effect[0].y * tokenWidth) }, gridUnits: true, local: true })
        .spriteRotation(effect[0].rotation * facingFactor)
        .loopProperty("sprite", "rotation", { from: 0, to: 15 * facingFactor, duration: 250, ease: "easeOutCubic" })
        .loopProperty("sprite", "position.y", { from: 0, to: -0.025, duration: 250, gridUnits: true, pingPong: false })
        .loopProperty("sprite", "position.x", { from: 0, to: -0.025 * facingFactor, duration: 250, gridUnits: true, pingPong: false })
        .scaleToObject(effect[0].scale)
        .private()
        .mirrorX(mirrorFace)
        .mirrorY()

        .effect()
        .name(id)
        .file(effect[1].img)
        .atLocation(token, { offset: { x: (effect[1].x * tokenWidth) * facingFactor, y: (effect[1].y * tokenWidth) }, gridUnits: true, local: true })
        .spriteRotation(effect[1].rotation * facingFactor)
        .loopProperty("sprite", "rotation", { from: 0, to: -10 * facingFactor, duration: 250, ease: "easeOutCubic" })
        .loopProperty("sprite", "position.y", { from: 0, to: -0.025, duration: 250, gridUnits: true, pingPong: false })
        .loopProperty("sprite", "position.x", { from: 0, to: -0.025 * facingFactor, duration: 250, gridUnits: true, pingPong: false })
        .scaleToObject(effect[1].scale)
        .private()
        .mirrorX(mirrorFace)

        .effect()
        .name(id)
        .file(effect[2].img)
        .atLocation(token, { offset: { x: (effect[2].x * tokenWidth) * facingFactor, y: (effect[2].y * tokenWidth) }, gridUnits: true, local: true })
        .spriteRotation(effect[2].rotation * facingFactor)
        .loopProperty("sprite", "rotation", { from: 0, to: 15 * facingFactor, duration: 250, ease: "easeOutCubic" })
        .loopProperty("sprite", "position.y", { from: 0, to: -0.025, duration: 250, gridUnits: true, pingPong: false })
        .loopProperty("sprite", "position.x", { from: 0, to: -0.025 * facingFactor, duration: 250, gridUnits: true, pingPong: false })
        .scaleToObject(effect[2].scale)
        .mirrorX(mirrorFace)
        .waitUntilFinished(-200);

    if (duration > 0) {
        shoutEffect = shoutEffect.duration(duration);
    } else {
        shoutEffect = shoutEffect.persist();
    }

    return shoutEffect.attachTo(token, { bindAlpha: false });
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
