// Original Author: EskieMoh#2969
// Modular Conversion: bakanabaka

import { img } from "../../../lib/filemanager.js";

const DEFAULT_CONFIG = {
    id: 'FireShield',
};

async function create(token, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const sequence = new Sequence();

    sequence.effect()
        .file(img("jb2a.impact.ground_crack.orange.01"))
        .atLocation(token)
        .belowTokens()
        .scaleToObject(3);

    sequence.effect()
        .file(img("jb2a.particles.outward.orange.01.03"))
        .atLocation(token)
        .delay(200)
        .scaleIn(0.5, 250)
        .fadeOut(3000)
        .duration(15000)
        .scaleToObject(2.75)
        .playbackRate(1)
        .zIndex(2)
        .name(`FireShield-Particles-${token.id}`);

    sequence.effect()
        .file(img("jb2a.energy_strands.in.yellow.01.2"))
        .atLocation(token)
        .delay(200)
        .scaleIn(0.5, 250)
        .duration(2000)
        .belowTokens()
        .scaleToObject(2.75)
        .playbackRate(1)
        .zIndex(1)
        .name(`FireShield-Strands-${token.id}`);

    sequence.effect()
        .file(img("jb2a.token_border.circle.spinning.orange.004"))
        .atLocation(token)
        .scaleToObject(2.2)
        .playbackRate(1)
        .attachTo(token)
        .persist()
        .name(`FireShield-Border-${token.id}`);

    sequence.effect()
        .file(img("jb2a.shield_themed.below.fire.03.orange"))
        .atLocation(token)
        .delay(1000)
        .persist()
        .fadeIn(500)
        .attachTo(token)
        .fadeOut(200)
        .belowTokens()
        .scaleToObject(1.7)
        .playbackRate(1)
        .name(`FireShield-Below-${token.id}`);

    sequence.effect()
        .file(img("jb2a.shield_themed.above.fire.03.orange"))
        .atLocation(token)
        .persist()
        .fadeIn(3500)
        .attachTo(token)
        .fadeOut(200)
        .scaleToObject(1.7)
        .zIndex(0)
        .playbackRate(1)
        .name(`FireShield-Above-${token.id}`);

    return sequence;
}

async function play(token, config = {}) {
    const sequence = await create(token, config);
    if (sequence) {
        sequence.play();
    }
}

function stop(token, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id } = mergedConfig;
    Sequencer.EffectManager.endEffects({ name: `${id}-Particles-${token.id}`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-Strands-${token.id}`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-Border-${token.id}`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-Below-${token.id}`, object: token });
    Sequencer.EffectManager.endEffects({ name: `${id}-Above-${token.id}`, object: token });
}

export const fireShield = {
    create,
    play,
    stop,
};