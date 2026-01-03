import { tile, tileSockets } from './socketlib/tile.js';

async function register() {
    const socket = socketlib.registerModule('eskie-macros');
    console.error('Registering socketlib', socket);
    Object.entries(tileSockets).forEach(([key, value]) => {
        socket.register(key, value);
    });
    game.modules.get('eskie-macros').socketlib = socket;
}

export const socket = {
    register,
};

export const socketlib = {
    tile
}