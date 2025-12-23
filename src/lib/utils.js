function mergeObject(defaultConfig, config) {
    let userConfig = foundry.utils.mergeObject(defaultConfig, config, {inplace: false});
    let effectData = defaultConfig.effect?.map((def, i) => {
        return foundry.utils.mergeObject(def, (config?.effect && config.effect[i]) ? config.effect[i] : {}, {inplace: false});
    });
    return { id: userConfig.id, duration: userConfig.duration, effect: effectData };
}

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function owner(token) {
    if (!token) return [];
    const ownership = token.actor.ownership;
    
    // Filter users: Level 3 is "Owner"
    const owners = game.users.filter(user => { return ownership[user.id] === 3; });
    return owners;
};


function getCrosshairCfg(config) {
    const DEFAULT_CONFIG = {
        width: 1,
        icon: '',
        label: '',
    };
    const { width, icon, label } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});

    return {
        width: width,
        gridHighlight: true,
        icon: {
            texture: icon,
            borderVisible: true,
        },
        snap: {
            position: CONST.GRID_SNAPPING_MODES.VERTEX | CONST.GRID_SNAPPING_MODES.CENTER,
            resolution: 2
        },
        distanceMin: null,
        distanceMax: null,
        label: { text: label},
    };
}

async function getPosition(template, config) {
    let position;
    if (template) {
        // Not sure if this works for everything... but let's try...
        const farpoint = template._object.ray.B;        // Get the furthest point on the cone
        position = { x: farpoint.x, y: farpoint.y };    // Decouple from the template so when it is deleted we don't crash
    } else {
        const crosshair = getCrosshairCfg(config);
        position = await Sequencer.Crosshair.show(crosshair);
        if (position.cancelled) { return; }
    }
    return position;
}

export const utils = {
    mergeObject,
    owner,
    wait,
    getPosition,
}