//Last Updated: 12/15/2025
//Author: .eskie
//Update: bakanabaka

import { img } from '../../../lib/filemanager.js';
import { getNearestSquareCenter } from '../../../util/token-token.js';
import { autoanimations } from '../../../integration/autoanimations.js';

const DEFAULT_CONFIG = {
    id: "sneakAttack",
    color: {
        attack: "redblack",
        impact: "red",
        damage: "red",
    },
    type: "slashing",
    weight: "medium",
}

async function create(token, target, config) {
    const mergedConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id, color, type, weight } = mergedConfig;

    //Determine Attack Size
    const weightIndex = { light: 0, medium: 1, heavy: 2 }[weight];

    let effectSize = 2 + (0.25 * weightIndex);
    let effectOffset = -0.75 - (0.25 * weightIndex);

    //Determine nearest targetSquare
    let targetSquare = getNearestSquareCenter(token, target);

    let seq = new Sequence()

    .effect()
        .file(img(`eskie.attack.melee.generic.01.${type}.${weight}.${color.attack}.slow`))
        .atLocation(token)
        .rotateTowards(targetSquare)
        .scaleToObject(effectSize)
        .spriteOffset({ x: effectOffset * token.document.width }, { gridUnits: true })
        .randomizeMirrorY()
        .zIndex(1)

    .effect()
        .delay(150)
        .file(img(`jb2a.impact.007.${color.impact}`))
        .size(1.25 * token.document.width, { gridUnits: true })
        .atLocation(targetSquare)
        .randomRotation()
        .playbackRate(0.9)
        .zIndex(0.1)

    .effect()
        .delay(150)
        .file(img(`jb2a.liquid.splash_side02.${color.damage}`))
        .atLocation(targetSquare)
        .size(1.5 * token.document.width, { gridUnits: true })
        .rotateTowards(token)
        .spriteOffset({ x: -1.15 * token.document.width }, { gridUnits: true })
        .spriteRotation(180)
        .zIndex(0)

    .effect()
        .delay(150)
        .copySprite(target)
        .attachTo(target)
        .scaleToObject(1,{considerTokenScale:true})
        .loopProperty("sprite", "position.x", { from: -0.05, to: 0.05, duration: 50, pingPong: true, gridUnits: true})
        .opacity(0.25)
        .duration(1000)
        .fadeOut(750)
        .tint("#FF0000")

    return seq;
}

async function play(token, target, config) {
    const seq = await create(token, target, config);
    if (seq) { return seq.play(); }
}

export const sneakAttack = {
    create,
    play,
}

autoanimations.register("Sneak Attack", "melee-target", "eskie.effect.sneakAttack", DEFAULT_CONFIG);