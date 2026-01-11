import { tokenMaskEffect } from "./token-mask.js";

const DEFAULT_CONFIG = {
    id: 'BurningTokenMask',
    deleteToken: false,
    speed: 'fast',
    color: 'orange',
    padding: 1
};

async function create(token, config = {}) {
    const { id, deleteToken, speed, color, padding } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const tokenOverlay = `eskie.burn.token_mask.${color}.no_base.${speed}.01`;
    const revealOverlay = `eskie.texture_mask.tile_base.burn.01.${speed}`;
    return tokenMaskEffect.create(token, {id, deleteToken, tokenOverlay, revealOverlay, padding});
}

async function play(token, config = {}) {
    const seq = await create(token, config);
    return seq?.play();
}

async function stop(token, config = {}) {
    const { id, deleteToken, speed, color, padding } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const tokenOverlay = `eskie.burn.token_mask.${color}.no_base.${speed}.01`;
    const revealOverlay = `eskie.texture_mask.tile_base.burn.01.${speed}`;
    return tokenMaskEffect.stop(token, {id, deleteToken, tokenOverlay, revealOverlay, padding});
}

export const burnMask = {
    create,
    play,
    stop,
};

