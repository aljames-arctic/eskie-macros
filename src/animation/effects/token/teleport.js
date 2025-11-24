// Original Author: Unknown (from discord)
// Modular Conversion: bakanabaka

import { teleportIn } from "./teleport/teleportIn.js";
import { teleportOut } from "./teleport/teleportOut.js";

async function create(token, targets) {
    const crosshairConfig = {
        size: 3,
        icon: 'icons/magic/symbols/ring-circle-smoke-blue.webp',
        label: 'Teleport',
        tag: 'Teleport',
        drawIcon: true,
        drawOutline: true,
        interval: -1
    };

    const position = await Sequencer.Crosshair.show(crosshairConfig);
    if (!position.x || !position.y) {
        console.error('Invalid position given... aborting')
        return;
    }
    const config = { position };

    let [tOut, tIn] = await Promise.all([
        teleportOut.create(token, targets, config),
        teleportIn.create(token, targets, config),
    ]);

    return new Sequence()
        .addSequence(tOut.waitUntilFinished())
        .addSequence(tIn);
}

async function play(token, targets, config) {
    let seq = await create(token, targets);
    if (seq) return seq.play();
}

export const teleport = {
    play,
    create,
    in: teleportIn,
    out: teleportOut,
};