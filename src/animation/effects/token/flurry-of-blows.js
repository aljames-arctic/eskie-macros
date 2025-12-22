// Original Author: EskieMoh#2969
// Modular Conversion: bakanabaka

import { img } from "../../../lib/filemanager.js";

const DEFAULT_CONFIG = {
    id: 'FlurryOfBlows',
};

async function create(token, target, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id } = mConfig;
    let seq = new Sequence();
    seq = seq.effect()
        .copySprite(token)
        .attachTo(token)
        .size(token.document.width * token.document.texture.scaleX, { gridUnits: true })
        .fadeOut(150)
        .duration(1800)
        .zIndex(2);

    seq = seq.effect()
        .delay(150)
        .file(img("jb2a.flurry_of_blows.no_hit.yellow"))
        .atLocation(token)
        .rotateTowards(target.center, { randomOffset: 0.2 })
        .scale(0.6 * token.document.width)
        .playbackRate(1)
        .startTime(300)
        .endTime(600)
        .opacity(1)
        .rotate(0)
        .mirrorX(false)
        .repeats(3, 300, 300)
        .randomizeMirrorY()
        .spriteOffset({ x: -token.document.width * 1.75 }, { gridUnits: true })
        .zIndex(1.1);

    seq = seq.effect()
        .delay(0)
        .file(img("jb2a.flurry_of_blows.no_hit.yellow"))
        .atLocation(token)
        .rotateTowards(target.center, { randomOffset: 0.2 })
        .scale(0.56 * token.document.width)
        .playbackRate(1)
        .startTime(300)
        .endTime(600)
        .opacity(1)
        .rotate(0)
        .mirrorX(false)
        .repeats(3, 300, 300)
        .randomizeMirrorY()
        .spriteOffset({ x: -token.document.width * 1.75, y: token.document.width * 0.25 }, { gridUnits: true })
        .spriteRotation(25)
        .zIndex(1);

    seq = seq.effect()
        .delay(300)
        .file(img("jb2a.flurry_of_blows.no_hit.yellow"))
        .atLocation(token)
        .rotateTowards(target.center, { randomOffset: 0.2 })
        .scale(0.56 * token.document.width)
        .playbackRate(1)
        .startTime(300)
        .endTime(600)
        .opacity(1)
        .rotate(0)
        .mirrorX(false)
        .repeats(3, 300, 300)
        .randomizeMirrorY()
        .spriteOffset({ x: -token.document.width * 1.75, y: -token.document.width * 0.25 }, { gridUnits: true })
        .spriteRotation(-25)
        .zIndex(1);

    seq = seq.wait(300);

    seq = seq.effect()
        .file(img("jb2a.impact.009.orange"))
        .atLocation(target, { randomOffset: 1 })
        .size(token.document.width * 1.25, { gridUnits: true })
        .repeats(20, 50, 50)
        .randomRotation();

    seq = seq.effect()
        .copySprite(target)
        .atLocation(target)
        .fadeIn(200)
        .fadeOut(200)
        .loopProperty("sprite", "position.x", { from: -0.05, to: 0.05, duration: 50, pingPong: true, gridUnits: true })
        .scaleToObject(target.document.texture.scaleX)
        .duration(1400)
        .opacity(0.25);

    return seq;
}

async function play(token, target, config = {}) {
    const seq = await create(token, target, config);
    if (seq) { return seq.play(); }
}

export const flurryOfBlows = {
    create,
    play,
};
