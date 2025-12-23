// Original author: Gornetron
// Updates by: Bakana

const DEFAULT_CONFIG = {
    id: 'drunk-blur',
    opacity: 1,
    blur: 3,
    sway: 1,
    durationX: 7000,
    durationY: 11000,
}

function create(user, config = {}){
    const { id, opacity, blur, sway, durationX, durationY } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    if (!canvas?.scene?.background?.src) return;

    const x = canvas.scene.dimensions.width / 2;
    const y = canvas.scene.dimensions.height / 2;

    const seq = new Sequence()
        .effect()
            .name(`${id} - ${user.id}`)
            .file(canvas.scene.background.src)
            .atLocation({ x, y })
            .size({
                width: canvas.scene.dimensions.sceneWidth,
                height: canvas.scene.dimensions.sceneHeight
            })
            .belowTokens()
            .belowTiles()
            .filter("Blur", { blurX: blur, blurY: blur })
            .opacity(opacity)
            .persist()
            .loopProperty("spriteContainer", "position.y", {
                from: -25 * sway, to: 25 * sway, duration: durationY, pingPong: true
            })
            .loopProperty("spriteContainer", "position.x", {
                from: -25 * sway, to: 25 * sway, duration: durationX, pingPong: true
            })
            .forUsers(user)
    return seq;
}

async function play(users, config = {}) {
    for (const user of users) {
        const seq = create(user, config);
        if (seq) { seq.play(); }
    }
}

async function severe(users) {
    await play(users);
    await play(users, {opacity: 0.67, sway: -1, durationX: 11000, durationY: 7000});
    await play(users, {opacity: 0.47, sway: 0.8, durationX: 13000, durationY: 17000});
}

async function stop(users, config = {}) {
    const { id } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    return Promise.all(users.map(user => Sequencer.EffectManager.endEffects({ name: `${id} - ${user.id}` })));
}

export const drunkBlur = { 
    create,
    play,
    stop,
    severe,
};