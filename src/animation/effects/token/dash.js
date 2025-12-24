// Original Author: .eskie
// Modular Conversion: bakanabaka

import { img } from '../../../lib/filemanager.js';

/**
 * Creates the Dash sequence effect.
 * @param {Token} token - The token performing the dash.
 * @param {object} position - The {x, y} coordinates of the destination.
 * @param {object} config - Configuration options for the animation.
 * @returns {Sequence} The created Sequence object.
 */
async function create(token, position, config = {}) {
    config = {
        size: token.document.width / canvas.grid.size,
        icon: 'icons/magic/air/wind-stream-blue-gray.webp',
        label: 'Dash',
        tag: 'dashing',
        drawIcon: true,
        drawOutline: true,
        interval: token.document.width % 2 === 0 ? 1 : -1,
        ...config,
    };

    const dropScale = token.document.width / canvas.grid.size * .35; // This seems unused in the original sequence, but keeping for now if needed.

    const sequence = new Sequence();

    sequence
        .animation()
        .on(token)
        .moveTowards(position)
        .moveSpeed(500)
        .snapToGrid()

        .effect()
        .file(img("jb2a.gust_of_wind.veryfast"))
        .atLocation(token)
        .duration(1000)
        .opacity(0.5)
        .scale(token.document.width / canvas.grid.size)
        .stretchTo(position, { onlyX: false })
        .belowTokens()
        .zIndex(1)
        .mirrorX();

    return sequence;
}

/**
 * Plays the Dash animation, including crosshair placement.
 * @param {Token} token - The casting token.
 * @param {object} options - Options for playing the animation, including config.
 */
async function play(token, position, { config } = {}) {
    if (!position) {
        const crosshairConfig = {
            size: token.document.width / canvas.grid.size,
            icon: 'icons/magic/air/wind-stream-blue-gray.webp',
            label: 'Dash',
            tag: 'dashing',
            drawIcon: true,
            drawOutline: true,
            interval: token.document.width % 2 === 0 ? 1 : -1,
        };
        position = await Sequencer.Crosshair.show(crosshairConfig);
        if (position.cancelled) { return; }
    }

    const sequence = await create(token, position, config);
    if (sequence) return sequence.play();
}

export const dash = {
    create,
    play,
    // No stop function needed as this is not a persistent effect
};