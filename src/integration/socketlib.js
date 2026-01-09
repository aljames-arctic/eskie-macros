import { tile, tileSockets } from './socketlib/tile.js';
import { door, doorSockets } from './socketlib/door.js';

async function register() {
    const socket = socketlib.registerModule('eskie-macros');
    console.error('Registering socketlib', socket);
    Object.entries(tileSockets).forEach(([key, value]) => {
        socket.register(key, value);
    });
    Object.entries(doorSockets).forEach(([key, value]) => {
        socket.register(key, value);
    });
    game.modules.get('eskie-macros').socketlib = socket;
}

export const socketlibapi = {
    register,
};

export const socket = {
    door,
    tile
}