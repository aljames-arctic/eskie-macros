/* To be registered in socketlib */
async function editTile(id, updates = {}) {
    const tile = canvas.tiles.get(id);
    if (!tile) return;
    return tile.document.update(updates);
}

async function createTile(updates = {}) {
    return canvas.scene.createEmbeddedDocuments("Tile", [updates]);
}

async function destroyTile(id) {
    return canvas.scene.deleteEmbeddedDocuments("Tile", [id]);
}

export const tileSockets = {
    editTile,
    createTile,
    destroyTile,
};

function initialized(socket) {
    if (!socket) { ui.notifications.error("Eskie Macros | socketlib is not initialized"); }
    return !!socket;
}

export async function edit(id, updates = {}) {
    if (game.user.isGM) return editTile(data);
    const socket = game.modules.get('eskie-macros').socketlib;
    if (!initialized(socket)) return;
    return socket.executeAsGM("editTile", id, updates);
}

export async function create(updates = {}) {
    if (game.user.isGM) return createTile(data);

    const DEFAULT_TILE_UPDATES = {
        width: 1,
        height: 1
    };
    updates = foundry.utils.mergeObject(DEFAULT_TILE_UPDATES, updates, { inplace: false });

    const socket = game.modules.get('eskie-macros').socketlib;
    if (!initialized(socket)) return;
    return socket.executeAsGM("createTile", updates);
}

export async function destroy(id) {
    if (game.user.isGM) return destroyTile(data);
    const socket = game.modules.get('eskie-macros').socketlib;
    if (!initialized(socket)) return;
    return socket.executeAsGM("destroyTile", id);
}

export const tile = {
    edit,
    create,
    destroy,
}
