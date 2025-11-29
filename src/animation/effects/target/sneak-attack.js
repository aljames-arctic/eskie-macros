import { img } from "../../../lib/filemanager.js";

async function create(token, target, config = {}) {
    const weaponType = config.weaponType ?? 'slashing';

    const hitSeq = new Sequence()
        .effect()
        .copySprite(target)
        .atLocation(target)
        .fadeIn(100)
        .fadeOut(100)
        .loopProperty("sprite", "position.x", { from: -0.05, to: 0.05, duration: 75, pingPong: true, gridUnits: true })
        .scaleToObject(target.document.texture.scaleX)
        .duration(500)
        .opacity(0.15)
        .tint("#fd0706")

        .effect()
        .file(img("jb2a.particles.outward.red.01.04"))
        .atLocation(target)
        .fadeIn(100)
        .fadeOut(400)
        .scaleIn(0, 500, { ease: "easeOutCubic" })
        .scaleToObject(1.65 * target.document.texture.scaleX)
        .duration(800)
        .opacity(1)
        .randomRotation(true)
        .filter("ColorMatrix", { saturate: 1 })
        .belowTokens(true);

    const slashSeq = new Sequence()
        .effect()
        .file(img("animated-spell-effects-cartoon.water.105"))
        .atLocation(token)
        .scale(0.2 * token.document.width)
        .rotateTowards(target)
        .spriteRotation(80)
        .spriteOffset({ x: -0.15 * token.document.width, y: -0.1 * token.document.width }, { gridUnits: true })
        .filter("ColorMatrix", { saturate: 0.75 })
        .rotateIn(-45, 250, { ease: "easeOutExpo" })
        .zIndex(1)

        .effect()
        .file(img("jb2a.melee_generic.slashing.one_handed"))
        .atLocation(token)
        .scale(0.5 * token.document.width)
        .rotateTowards(target)
        .mirrorY()
        .spriteOffset({ x: -1.7 * token.document.width }, { gridUnits: true })
        .filter("ColorMatrix", { saturate: -1, brightness: -1 })
        .rotateIn(-90, 250, { ease: "easeOutBack" })
        .zIndex(0)
        .thenDo(() => hitSeq.play());

    const pierceSeq = new Sequence()
        .effect()
        .file(img("animated-spell-effects-cartoon.water.107"))
        .atLocation(token)
        .scale(0.25 * token.document.width)
        .rotateTowards(target)
        .spriteRotation(18)
        .spriteOffset({ x: -0.6 * token.document.width, y: -0.25 * token.document.width }, { gridUnits: true })
        .filter("ColorMatrix", { saturate: 0.75 })
        .rotateIn(-25, 250, { ease: "easeOutExpo" })
        .zIndex(1)

        .effect()
        .file(img("jb2a.melee_generic.piercing.one_handed"))
        .atLocation(token)
        .scale(0.5 * token.document.width)
        .rotateTowards(target)
        .spriteRotation(15)
        .mirrorY()
        .spriteOffset({ x: -1.9 * token.document.width, y: -0.3 * token.document.width }, { gridUnits: true })
        .filter("ColorMatrix", { saturate: -1, brightness: -1 })
        .rotateIn(-25, 250, { ease: "easeOutExpo" })
        .zIndex(0)
        .thenDo(() => hitSeq.play());

    const bluntSeq = new Sequence()
        .effect()
        .file(img("animated-spell-effects-cartoon.water.115"))
        .atLocation(target)
        .scale(0.17 * token.document.width)
        .rotateTowards(token)
        .spriteRotation(0)
        .spriteOffset({ x: -0.45 * token.document.width, y: 0 }, { gridUnits: true })
        .filter("ColorMatrix", { saturate: 0.75 })
        .scaleIn(0, 250, { ease: "easeOutExpo" })
        .zIndex(1)

        .effect()
        .file(img("jb2a.melee_generic.bludgeoning.two_handed"))
        .atLocation(target)
        .scale(0.4 * token.document.width)
        .rotateTowards(token)
        .spriteRotation(180)
        .spriteOffset({ x: -1 * token.document.width, y: 0 }, { gridUnits: true })
        .filter("ColorMatrix", { saturate: -1, brightness: -1 })
        .scaleIn(0, 250, { ease: "easeOutExpo" })
        .zIndex(0)
        .thenDo(() => hitSeq.play());

    const rangedSeq = new Sequence()
        .effect()
        .file(img("animated-spell-effects-cartoon.water.109"))
        .atLocation(target)
        .scale(0.2 * token.document.width)
        .rotateTowards(token)
        .spriteRotation(0)
        .spriteOffset({ x: -0.3 * token.document.width, y: 0 }, { gridUnits: true })
        .filter("ColorMatrix", { saturate: 0.75 })
        .scaleIn(0, 250, { ease: "easeOutExpo" })
        .zIndex(1)

        .effect()
        .file(img("animated-spell-effects-cartoon.water.115"))
        .atLocation(target)
        .scale({ x: 0.1 * token.document.width, y: 0.2 * token.document.width })
        .rotateTowards(token)
        .spriteRotation(0)
        .spriteOffset({ x: -0.4 * token.document.width, y: 0 }, { gridUnits: true })
        .filter("ColorMatrix", { saturate: -1, brightness: -1 })
        .scaleIn(0, 250, { ease: "easeOutExpo" })
        .zIndex(0)
        .thenDo(() => hitSeq.play());

    switch (weaponType) {
        case 'slashing':
            return slashSeq;
        case 'piercing':
            return pierceSeq;
        case 'bludgeoning':
            return bluntSeq;
        case 'ranged':
            return rangedSeq;
        default:
            return slashSeq;
    }
}

async function play(token, target, config) {
    const sequence = await create(token, target, config);
    if (sequence) { return sequence.play(); }
}

export const sneakAttack = {
    create,
    play,
};
