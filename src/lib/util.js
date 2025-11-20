function mergeObject(defaultConfig, config) {
    let userConfig = foundry.utils.mergeObject(defaultConfig, config, {inplace: false});
    let effectData = defaultConfig.effect.map((def, i) => {
        return foundry.utils.mergeObject(def, (config?.effect && config.effect[i]) ? config.effect[i] : {}, {inplace: false});
    });
    return { id: userConfig.id, duration: userConfig.duration, effect: effectData };
}

export const utils = {
    mergeObject,
}