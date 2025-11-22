import { narrowView } from '../../misc/narrow-view.js';
import { text } from '../../misc/text.js';
import { img } from '../../../lib/filemanager.js';

function dimCanvas() {
    let sequence = new Sequence();
    if (canvas.scene.background.src) {
        sequence.effect()
            .file(canvas.scene.background.src)
            .filter("ColorMatrix", { brightness: 0.3})
            .atLocation({x:(canvas.dimensions.width)/2,y:(canvas.dimensions.height)/2})
            .size({width:canvas.scene.width/canvas.grid.size, height:canvas.scene.height/canvas.grid.size}, {gridUnits: true})
            .duration(3000)
            .fadeIn(500)
            .fadeOut(500)
            .belowTokens()
    }
    return sequence;
}

function dashEffect(source, target) {
    const deltaX = target.x - source.x;
    const deltaY = source.y - target.y;
    const angleRad = Math.atan2(deltaY, deltaX);
    const angleDeg = angleRad * 180 / Math.PI;

    let sequence = new Sequence();
    sequence.effect()
        .file(img("animated-spell-effects-cartoon.magic.mind sliver"))
        .atLocation(target)
        .rotate(angleDeg)
        .filter("ColorMatrix", { saturate: -1,brightness:1 })
        .size({width:8, height:1}, {gridUnits:true})
        .scaleOut(0, 600, {ease: "easeOutCubic"})
        .aboveLighting()
    return sequence;
}

function deathAnimation(target) {
    let sequence = new Sequence();
    sequence.animation()
        .on(target)
        .opacity(0)

    sequence.effect()
        .copySprite(target)
        .name(`${target.name}Top`)
        .scaleToObject(target.document.texture.scaleX)
        .atLocation(target)
        .shape("polygon", {
                    lineSize: 1,
                    lineColor: "#FF0000",
                    fillColor: "#FF0000",
        points: [{ x: -1, y: -1},{ x: 1, y: 1},{ x: 1, y: -1} ],
                    fillAlpha: 1,
                    gridUnits: true,
                    isMask:true,
                    name: "test"
                })
        .moveTowards({ x: target.x+canvas.grid.size*target.document.width+0.1, y: target.y+canvas.grid.size*target.document.width+0.1 },{ rotate: false})
        .moveSpeed(100)
        .persist()
        .extraEndDuration(1000)
        .fadeOut(1000)

    sequence.effect()
        .copySprite(target)
        .name(`${target.name}Bottom`)
        .scaleToObject(target.document.texture.scaleX)
        .atLocation(target)
        .shape("polygon", {
                    lineSize: 1,
                    lineColor: "#FF0000",
                    fillColor: "#FF0000",
        points: [{ x: -1, y: -1},{ x: 1, y: 1},{ x: -1, y: 1} ],
                    fillAlpha: 1,
                    gridUnits: true,
                    isMask:true,
                    name: "test"
                })
        .zIndex(0.1)
        .persist()
        .fadeOut(500)

    sequence.effect()
        .file(img("jb2a.water_splash.cone.01.red"))
        .atLocation(target, {offset: {x:0.1,y:-0.1}, gridUnits: true})
        .delay(250)
        .fadeIn(200)
        .scaleToObject()
        .zIndex(0)
        .fadeOut(500)
        .rotate(45)

    sequence.wait(1500)
    sequence.thenDo(() => Sequencer.EffectManager.endEffects({ name: `${target.name}Top` }))

    sequence.wait(4000)
    sequence.thenDo(() => Sequencer.EffectManager.endEffects({ name: `${target.name}Bottom` }))
    return sequence;
}

async function create(source, target, config = {}) {
    const defaultConfig = {
        targetDeath: true,
        teleport: true,
        cameraFocus: true,
    };
    let {targetDeath, teleport, cameraFocus} = foundry.utils.mergeObject(defaultConfig, config, {inplace:false});

    let position;

    if( teleport === true ){
        let crosshairsConfig = {
            size:1,
            icon: 'icons/skills/melee/blade-tip-orange.webp',
            label: 'Iaijutsu Strike',
            tag: 'katana lol',
            t: 'ray',
            drawIcon: true,
            drawOutline: true,
            interval:-1,
            rememberControlled: true,
        }
        position = await Sequencer.Crosshair.show(crosshairsConfig);
    }

    let sequence = new Sequence();

    if( cameraFocus == true ){    
        sequence.canvasPan({duration: 250, x: target.center.x, y: target.center.y, scale: 0.6})
        sequence.add(narrowView.create({duration: 0}));
    }    

    sequence.effect()
        .file(img("animated-spell-effects-cartoon.level 01.bless.blue"))
        .scaleToObject(0.75)
        .atLocation(source, {offset: {x:0.25, y:0.25}, gridUnits: true})
        .scaleIn(0, 500, {ease: "easeOutCubic"})
        .rotateIn(-180, 500, {ease: "easeOutCubic"})
        .filter("ColorMatrix", { saturate: -1, brightness: 1.2 })
        .aboveLighting()
        .waitUntilFinished()

    sequence.wait(500)

    sequence.add(dimCanvas());
    sequence.add(dashEffect(source, target));

    if( teleport == true){
        sequence.animation()
            .on(source)
            .teleportTo(position)
            .snapToGrid()
            .offset({ x: -1, y: -1 })
    }

    sequence.wait(500)

    sequence.add(text.create(target, "居合術"));

    if( targetDeath === true){
        sequence.add(deathAnimation(target));
    }

    sequence.wait(500)

    if( cameraFocus == true){
        sequence.thenDo(() => {
            narrowView.stop();
        })
    }

    return sequence;
}

async function play(source, target, config = {}) {
    const seq = await create(source, target, config);
    if (seq) { await seq.play(); }
}

export const iaijutsuStrike = {
    create,
    play,
};
