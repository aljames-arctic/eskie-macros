// Original Author: Unknown (from discord)
// Modular Conversion: bakanabaka

import { img } from "../../../lib/filemanager.js";

const DEFAULT_CONFIG = {
    position: undefined,
};

async function create(targets, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const sequence = new Sequence();

    // AOE effects
    sequence.effect()
        .file(img("jb2a.sleep.cloud.01.dark_orangepurple"))
        .scaleIn(0, 500, { ease: "easeOutQuint" })
        .fadeOut(1000)
        .atLocation(config.position)
        .duration(1000)
        .size(5, { gridUnits: true })
        .zIndex(3);

    sequence.effect()
        .file(img("jb2a.extras.tmfx.border.circle.outpulse.02.normal"))
        .atLocation(config.position)
        .size(5, { gridUnits: true })
        .duration(1000)
        .fadeOut(1000)
        .opacity(0.5)
        .zIndex(1);

    sequence.effect()
        .file(img("jb2a.particles.outward.orange.02.03"))
        .scaleIn(0, 500, { ease: "easeOutQuint" })
        .fadeOut(2000)
        .atLocation(config.position)
        .duration(3000)
        .size(5.5, { gridUnits: true })
        .animateProperty("sprite", "position.y", { from: 0, to: 100, duration: 3000 })
        .zIndex(5);

    // Target effects
    if (targets) {
        targets.forEach(target => {
            new Sequence()
                .effect()
                .file(img("jb2a.sleep.symbol.dark_orangepurple"))
                .scaleIn(0, 500, { ease: "easeOutQuint" })
                .fadeOut(1000)
                .atLocation(target)
                .attachTo(target, { bindRotation: false, bindAlpha: false })
                .persist()
                .scaleToObject(2)
                .name(`Sleep-${target.id}`)
                .play();
        });
    }


    return sequence;
}

async function play(targets, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { position } = mergedConfig;
    const crosshairConfig = {
        size: 5,
        icon: 'icons/magic/control/hypnosis-mesmerism-pendulum.webp',
        label: 'Sleep',
        tag: 'sleep',
        t: 'circle',
        drawIcon: true,
        drawOutline: true,
        interval: -1,
    };

    if (!position) {
        mergedConfig.position = await Sequencer.Crosshair.show(crosshairConfig);
        if (!mergedConfig.position.x) return;
    }

    const sequence = await create(targets, mergedConfig);
    if (sequence) { return sequence.play(); }
}

function stop(targets, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    targets.forEach(t => {
        Sequencer.EffectManager.endEffects({ name: `Sleep-${t.id}` });
    });
}

export const sleep = {
    create,
    play,
    stop,
};
