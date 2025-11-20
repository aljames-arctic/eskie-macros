import { img } from "../lib/filemanager.js";

async function create(token, {angle = 53.13, coneSize = "thin", distance = 15} = {}) {
    let coneImage = img(`eskie.crosshair.cone.${coneSize}.fantasy_01.white.full`);

    let cone = new Sequence()
    .crosshair("position")
        .type("cone")
        .location(token, { lockToEdge: true, lockToEdgeDirection: true })
        .distance(distance)
        .angle(angle)
        .borderColor("#ffffff",{alpha:0}) 
        .fillColor("#000000",{alpha:0.1})
        .icon(coneImage)
        .callback(Sequencer.Crosshair.CALLBACKS.SHOW, function(crosshair) {
    
        new Sequence()
            .wait(50)
            .effect()
            .name(`Cone Crosshair`)
            .file(coneImage)
            .attachTo(crosshair)
            .stretchTo(crosshair,{attachTo:true})
            .opacity(0.8)
            .belowTokens()
            .locally()
            .persist()
        .play();
        
        })
    .callback(Sequencer.Crosshair.CALLBACKS.PLACED, function(crosshair) {
        Sequencer.EffectManager.endEffects({ name: `Cone Crosshair` })
    })
    .callback(Sequencer.Crosshair.CALLBACKS.CANCEL, function(crosshair) {
        Sequencer.EffectManager.endEffects({ name: `Cone Crosshair` })
    });

    return cone;
}

async function play(token, config = {}) {
    let seq = await create(token, config);
    await seq.play();
}

async function stop(token, {id = `Cone Crosshair`} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const cone = {
    create,
    play,
    stop,
};