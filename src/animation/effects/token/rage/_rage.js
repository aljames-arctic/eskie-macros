import { autoanimations } from "../../../../integration/autoanimations.js";

import { rageV1 as v1, DEFAULT_CONFIG as config_v1} from "./rage_v1.js";
import { electric as v2, DEFAULT_CONFIG as config_v2} from "./rage-electric.js";
import { superSaiyan as v3, DEFAULT_CONFIG as config_v3} from "./rage-super-saiyan.js";
import { rageV2 as v4, DEFAULT_CONFIG as config_v4} from "./rage_v2.js";

const DEFAULT_CONFIG = {
    version: 4,
    config_v1,
    config_v2,
    config_v3,
    config_v4,
};

function getVersion(config = {}) {
    const { version } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const versionMap = [ v1, v2, v3, v4 ];
    if ( version > versionMap.length || version <= 0 ) return;
    return versionMap[version - 1];
}

function create(token, config = {}) {
    const version = getVersion(config);
    if (!version) return;
    return version.create(token, config);
}

async function play(token, config = {}) {
    const version = getVersion(config);
    if (!version) return;
    return version.play(token, config);
}

async function stop(token, config = {}) {
    const version = getVersion(config);
    if (!version) return;
    return version.stop(token, config);
}

async function clean(token, config = {}) {
    const version = getVersion(config);
    if (!version) return;
    return version.clean(token, config);
}

export const rage = {
    create,
    play,
    stop,
    clean,
    v1,
    v2,
    v3,
    v4,
};

autoanimations.register("Rage", "effect", "eskie.effect.rage", DEFAULT_CONFIG);