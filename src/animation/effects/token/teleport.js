// Original Author: Unknown (from discord)
// Modular Conversion: bakanabaka

import { teleportIn } from "./teleport/teleportIn.js";
import { teleportOut } from "./teleport/teleportOut.js";

const DEFAULT_CONFIG = {
    size: 3,
    icon: 'icons/magic/symbols/ring-circle-smoke-blue.webp',
    label: 'Teleport',
    tag: 'Teleport',
    drawIcon: true,
    drawOutline: true,
    interval: -1
};

async function create(token, targets, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});

    const position = await Sequencer.Crosshair.show(mConfig);
    if (!position.x || !position.y) {
        console.error('Invalid position given... aborting')
        return;
    }

    let [tOut, tIn] = await Promise.all([
        teleportOut.create(token, targets, config),
        teleportIn.create(token, targets, config),
    ]);

    return new Sequence()
        .addSequence(tOut.waitUntilFinished())
        .addSequence(tIn);
}

async function play(token, targets, config = {}) {
    let seq = await create(token, targets, config);
    if (seq) return seq.play();
}

export const teleport = {
    play,
    create,
    in: teleportIn,
    out: teleportOut,
};