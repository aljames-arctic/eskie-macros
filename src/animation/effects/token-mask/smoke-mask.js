import { tokenMaskEffect } from "./token-mask.js";

const DEFAULT_CONFIG = {
    id: 'SmokeTokenMask',
    deleteToken: false,
    color: 'blue',
    padding: 1
};

async function create(token, config = {}) {
    const { id, deleteToken, color, padding } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const tokenOverlay = `eskie.smoke.token_mask.01.${color}`;
    const revealOverlay = `eskie.texture_mask.tile_base.smoke.01`;
    return tokenMaskEffect.create(token, {id, deleteToken, tokenOverlay, revealOverlay, padding});
}

async function play(token, config = {}) {
    const seq = await create(token, config);
    return seq?.play();
}

async function stop(token, config = {}) {
    const { id, deleteToken, color, padding } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const tokenOverlay = `eskie.smoke.token_mask.01.${color}`;
    const revealOverlay = `eskie.texture_mask.tile_base.smoke.01`;
    return tokenMaskEffect.stop(token, {id, deleteToken, tokenOverlay, revealOverlay, padding});
}

export const smokeMask = {
    create,
    play,
    stop,
};