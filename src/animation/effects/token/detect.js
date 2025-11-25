/*
    Originally Published: 8/21/2023
    Original Author: EskieMoh#2969 for Divine Sense
    Modified by Tyreal2012
    Update Author: bakanabaka
*/

import { detectUtil } from './detect/detectUtil.js'
import { magic } from './detect/magic.js'
import { goodevil } from './detect/goodevil.js'
import { poison } from './detect/poison.js'

async function create(token, config) {
    const seq = await detectUtil.create(token, config);
    if (seq) { return seq.play(); }
}

async function play(token, config) {
    const seq = await create(token, config);
    if (seq) { return seq.play(); }
}

export const detect = {
    create,
    play,
    magic,
    goodevil,
    poison
};