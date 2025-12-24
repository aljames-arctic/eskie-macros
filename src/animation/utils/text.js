async function create(token, text, config = {}) {
    const defaultConfig = {
        id: 'text',
        duration: 2600,
        delay: 200,
        style: {
            "fill": "#ffffff",
            "fontFamily": "Helvetica",
            "fontSize": 106,
            "strokeThickness": 0,
            fontWeight: "bold",
        },
        kerning: 0.5,
        verticalOffset: 0.25,
    };
    let { id, duration, delay, style, kerning, verticalOffset } = foundry.utils.mergeObject(defaultConfig, config, {inplace:false});
    duration = Math.max(duration, delay * text.length);

    // Start of text offset (bottom left corner)
    const x = -((text.length - 1) * kerning) / 2;
    const y = -(token.document.width + verticalOffset);

    let sequence = new Sequence();
    for (let i = 0; i < text.length; i++) {
        sequence = sequence.effect()
            .name(id)
            .atLocation(token, {offset: {x: x + (i * kerning), y: y}, gridUnits: true})
            .text(text[i], style)
            .duration(duration - i*delay)
            .fadeOut(250)
            .aboveLighting()
            .zIndex(1)
            .wait(delay)
    }

    return sequence;
}

async function play(token, text, config = {}) {
    let seq = await create(token, text, config);
    await seq.play();
}

async function stop(token, {id = 'text'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const text = {
    create,
    play,
    stop,
};
