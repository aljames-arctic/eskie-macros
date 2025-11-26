import { airBlast } from "./air.js";
import { coldBlast } from "./cold.js";
import { earthBlast } from "./earth.js";
import { electricityBlast } from "./electricity.js";
import { fireBlast } from "./fire.js";
import { metalBlast } from "./metal.js";
import { vitalityBlast } from "./vitality.js";
import { waterBlast } from "./water.js";
import { woodBlast } from "./wood.js";

export const elementalBlast = {
    air: airBlast,
    cold: coldBlast,
    earth: earthBlast,
    electricity: electricityBlast,
    fire: fireBlast,
    metal: metalBlast,
    vitality: vitalityBlast,
    water: waterBlast,
    wood: woodBlast,
};
