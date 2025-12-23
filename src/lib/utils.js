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

export const utils = {
    mergeObject,
    owner,
    wait,
}