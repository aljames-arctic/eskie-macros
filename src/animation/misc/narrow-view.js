
async function create(config = {}) {
    const defaultConfig = {
        id: 'narrow-view',
        duration: 5000,
    };
    let { id, duration } = foundry.utils.mergeObject(defaultConfig, config, {inplace:false});

    const [cWidth, cHeight] = canvas.screenDimensions;
    const width = cWidth / 2;
    const height = cHeight / 4;
    
    let sequence = new Sequence();
    sequence.effect()
        .name(`${id}-top`)
        .screenSpace()
        .screenSpaceAnchor({ x: 0, y: 0 })
        .shape("rectangle", {
            lineSize: 1,
            lineColor: "#000000",
            fillColor: "#000000",
            width: canvas.screenDimensions[0],
            height: height,
            offset: {x:0, y:0},
            fillAlpha: 1,
            gridUnits: false,
            name: "topbar"
        })
        .delay(2000)
        .animateProperty("topbar", "position.y", { from: -height, to: 0, duration: duration, ease: "linear"})
        .persist()
    return sequence;
}

async function play(config = {}) {
    let seq = await create(config);
    await seq.play();
}

async function stop({id = 'narrow-view'} = {}) {
    Sequencer.EffectManager.endEffects({ name: `${id}-top` });
    Sequencer.EffectManager.endEffects({ name: `${id}-bottom` });
}

export const narrowView = {
    create,
    play,
    stop,
};
