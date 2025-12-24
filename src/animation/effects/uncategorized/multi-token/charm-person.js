/**
 * Original Author: EskieMoh#2969
 * Update Author: bakanabaka
 */

import { img } from '../../../lib/filemanager.js';

const DEFAULT_CONFIG = {
    id: 'charm-person',
};

function _createCharmEffects(target, id) {
    let seq = new Sequence();

    seq.effect()
        .name(id)
        .file(img("jb2a.template_circle.symbol.out_flow.heart.pink"))
        .scaleIn(0, 1000, { ease: "easeOutQuint" })
        .fadeOut(2000)
        .atLocation(target)
        .belowTokens()
        .duration(3000)
        .scaleToObject(3);

    seq.effect()
        .name(id)
        .file(img("jb2a.icon.heart.pink"))
        .atLocation(target)
        .scaleIn(0, 500, { ease: "easeOutQuint" })
        .fadeOut(1000)
        .scaleToObject(1)
        .duration(2000)
        .attachTo(target)
        .playbackRate(1);

    seq.effect()
        .name(id)
        .file(img("jb2a.icon.heart.pink"))
        .atLocation(target)
        .scaleToObject(3)
        .anchor({ y: 0.45 })
        .scaleIn(0, 500, { ease: "easeOutQuint" })
        .fadeOut(1000)
        .duration(1000)
        .attachTo(target)
        .playbackRate(1)
        .opacity(0.5);

    seq.effect()
        .name(id)
        .file(img("jb2a.extras.tmfx.border.circle.outpulse.01.fast"))
        .atLocation(target)
        .scaleToObject(2);

    seq.effect()
        .name(id)
        .file(img("jb2a.markers.heart.pink.03"))
        .atLocation(target)
        .scaleToObject(2)
        .delay(500)
        .center()
        .fadeIn(1000)
        .playbackRate(1)
        .attachTo(target)
        .persist();

    return seq;
}

async function create(token, targets, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id } = mConfig;

    let masterSeq = new Sequence();

    for (const target of targets) {
        let charmSeq = _createCharmEffects(target, `${id}-${target.id}`);
        masterSeq.addSequence(charmSeq);
    }

    return masterSeq;
}

async function play(token, targets, config = {}) {
    if (!targets || targets.length === 0) {
        ui.notifications.warn("Charm Person: No targets selected!");
        return;
    }
    let seq = await create(token, targets, config);
    if (seq) { await seq.play(); }
}

async function stop(targets, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const { id } = mConfig;

    for (const target of targets) {
        Sequencer.EffectManager.endEffects({ name: `${id}-${target.id}`, object: target });
    }
}

export const charmPerson = {
    create,
    play,
    stop,
};
