/**
 * Original Author: EskieMoh#2969
 * Update Author: bakanabaka
 */

import { img } from '../../../lib/filemanager.js';

const DEFAULT_CONFIG = {
    id: 'firecracker',
};

async function create(position, config = {}) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id } = mergedConfig;

    // Sequencer Crosshairs options
    if (!position) {
        const crosshairOptions = {
            size: 1, // Original script uses 1
            icon: 'icons/magic/fire/projectile-meteor-salvo-light-purple.webp',
            label: 'Firecrackers',
            drawIcon: true,
            drawOutline: true,
            interval: 0,
            rememberControlled: true,
        };
        position = await Sequencer.Crosshair.show(crosshairOptions);
        if (position.cancelled) return;
    }

    let seq = new Sequence();

    seq = seq
        .effect()
        .name(id)
        .repeats(10, 50, 50)
        .file(img("jb2a.impact.yellow.0"))
        .atLocation(position, { randomOffset: 1 })
        .size(0.8, { gridUnits: true })
        .randomRotation()
        .delay(500);

    seq = seq
        .effect()
        .name(id)
        .repeats(5, 50, 50)
        .file(img("jb2a.impact.yellow.0"))
        .atLocation(position, { randomOffset: 1 })
        //.offset({ x: 100 })
        .size(0.8, { gridUnits: true })
        .randomRotation()
        .delay(1000);

    seq = seq
        .effect()
        .name(id)
        .repeats(5, 50, 50)
        .file(img("jb2a.impact.yellow.0"))
        .atLocation(position, { randomOffset: 1 })
        //.offset({ x: -100 })
        .size(0.8, { gridUnits: true })
        .randomRotation()
        .delay(500);

    seq = seq
        .effect()
        .name(id)
        .file(img("jb2a.particles.outward.orange.02.03"))
        .atLocation(position)
        .duration(5000)
        .fadeOut(1500)
        .scale(0.5)
        .randomRotation()
        .delay(500);

    return seq;
}

async function play(position, config = {}) {
    let seq = await create(position, config);
    if (seq) { await seq.play(); }
}

export const firecracker = {
    create,
    play,
};