function create(users, config = {}){
    if (!canvas?.scene?.background?.src) return;

    const x = canvas.scene.dimensions.width / 2;
    const y = canvas.scene.dimensions.height / 2;

    const seq = new Sequence()
        .effect()
        .name("Drunk")
        .file(canvas.scene.background.src)
        .atLocation({ x, y })
        .size({
            width: canvas.scene.dimensions.sceneWidth,
            height: canvas.scene.dimensions.sceneHeight
        })
        .belowTokens()
        .belowTiles()
        .filter("Blur", { blurX: 3, blurY: 3 })
        .persist()
        .loopProperty("spriteContainer", "position.y", {
            from: -25, to: 25, duration: 7000, pingPong: true
        })
        .loopProperty("spriteContainer", "position.x", {
            from: -25, to: 25, duration: 11000, pingPong: true
        })
        .forUsers(users)
    return seq;
}

async function play(users, config = {}) {
    const seq = await create(users, config);
    if (seq) { return seq.play(); }
}

export const drunkBlur = { 
    create,
    play,
};