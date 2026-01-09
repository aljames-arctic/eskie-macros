import { tile, tileSockets } from './socketlib/tile.js';
import { door, doorSockets } from './socketlib/door.js';

async function register() {
    const socket = socketlib.registerModule('eskie-macros');
    const socketAPI = {
        tileSockets,
        doorSockets,
    };

    Object.entries(socketAPI).forEach(([_, api]) => {
        Object.entries(api).forEach(([key, value]) => {
            socket.register(key, value);
        });
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