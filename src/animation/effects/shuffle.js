/* **
   Original Author: Gornetron (nefin)
   Update Author: bakanabaka
** */

function create(targets, {sendToCenter = false, destinationPoints = targets.map(t => ({ x: t.x, y: t.y }))} = {}) {
    if (targets.length !== destinationPoints.length)
        throw `User provided ${targets.length} targets but ${destinationPoints.length} destination points. Can not shuffle.`;

    const shuffle = destinationPoints.sort(() => Math.random() - 0.5);
    const shuffleSeq = new Sequence();

    if (sendToCenter) {
        let centerPoint = destinationPoints.reduce((acc, { x, y }) => ({ x: acc.x + x, y: acc.y + y }), { x: 0, y: 0 });
        centerPoint.x /= destinationPoints.length;
        centerPoint.y /= destinationPoints.length;
        for (let t of targets) {
            shuffleSeq.animation()
                .on(t)
                .moveTowards(centerPoint)
                .duration(1000);
        }
    }

    for (let i = 0; i < targets.length; i++) {
        shuffleSeq.animation()
            .on(targets[i])
            .moveTowards(shuffle[i])
            .delay(200)
            .duration(1000);
    }
    return shuffleSeq;
}

async function play(targets, {repeat = targets.length, delay = 1000, sendToCenter = false} = {}) {
    const destinationPoints = targets.map(target => ({ x: target.x, y: target.y }));
    for (let i = 0; i <= repeat; i++) {
        let shuffleSeq = create(targets, {sendToCenter, destinationPoints});
        if (delay > 0) shuffleSeq = shuffleSeq.wait(delay);
        await shuffleSeq.play();
    }
}

export const shuffle = {
    create,
    play,
};