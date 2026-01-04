import { autoanimations } from '../../../integration/autoanimations.js';
import { socket } from '../../../integration/socketlib.js';
import { dependency } from '../../../lib/dependency.js';
import { img, snd } from '../../../lib/filemanager.js'

export const DEFAULT_CONFIG = {
    id: 'Cunning Action'
};

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function create(token, config = {}) {
    const { id } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const label = `${id} - ${token.id}`;

    const sequenceOn = new Sequence()
        .effect()
            .name(label)
            .file(img("eskie.smoke.03.black"))
            .attachTo(token)
            .scaleToObject(2)
            .belowTokens()
            .opacity(0.5)
            .tint("#696969")
        .effect()
            .name(label)
            .file(img("eskie.buff.one_shot.simple.blue"))
            .attachTo(token)
            .scaleToObject(1)
            .filter("ColorMatrix", { saturate: -1, brightness: 2 })
            .opacity(1)
        .wait(200)
        .effect()
            .name(label)
            .file(img("jb2a.wind_stream.200.white"))
            .attachTo(token)
            .scaleToObject(1.15, { considerTokenScale: true })
            .fadeIn(500)
            .fadeOut(500)
            .mask()
            .playbackRate(1.5)
            .rotate(90)
            .persist()
            .opacity(0.5)
            .waitUntilFinished();
    
    return sequenceOn;
}

async function play(token, config = {}) {
    dependency.required({id: 'tagger', ref: "Tagger"});
    dependency.required({id: 'token-attacher', ref: "Token Attacher"});
    dependency.required({id: 'monks-active-tiles', ref: "Monk's Active Tile Triggers"});

    const { id } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const label = `${id} - ${token.id}`;

    const initialData = {
        "texture.src": "icons/svg/d6-grey.svg",
        "alpha": 0.1,
        "hidden": true,
        "x": token.x,
        "y": token.y,
        "width": canvas.grid.size * token.document.width,
        "height": canvas.grid.size * token.document.width,
    };
    
    const [tile] = await socket.tile.create(initialData);
    await wait(100);

    const MATTtriggers = ["exit", "manual"];
    const MATTactions = [{
        action: 'runcode',
        data: {
            code: 'eskie.effect.dash.macro.movement(token.object)'
        },
    }];
    const updateData = {
        "flags.monks-active-tiles.active": true,
        "flags.monks-active-tiles.trigger": MATTtriggers,
        "flags.monks-active-tiles.actions": MATTactions,
        "flags.monks-active-tiles.controlled": "gm",
    };
    await socket.tile.edit(tile.id, updateData);
    await Tagger.addTags(tile, label);

    await tokenAttacher.attachElementToToken(tile, token, true);
    const sequence = create(token, config);
    return sequence?.play();
}

async function stop(token, config = {}) {
    const { id } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, {inplace:false});
    const label = `${id} - ${token.id}`;
    const tiles = Tagger.getByTag(label);

    tiles.forEach(async (tile) => { await socket.tile.destroy(tile.id); });
    Sequencer.EffectManager.endEffects({ name: label, object: token });
}

async function movement(token, config = {}) {
    const { id } = foundry.utils.mergeObject(DEFAULT_CONFIG, config, { inplace: false });
    const label = `${id} - ${token.id}`;
    const tile = Tagger.getByTag(label)[0];

    if (!game.user.isGM || !tile) return;

    let tokenPosition = {x: token.center.x, y: token.center.y};
    let tilePosition = {x: tile.x + tile.width/2, y: tile.y + tile.height/2};
    let deltaX = tokenPosition.x - tilePosition.x;
    let deltaY = tokenPosition.y - tilePosition.y;
    let angleRadians = Math.atan2(deltaY, deltaX);
    let distance = Math.hypot(tokenPosition.x - tilePosition.x, tokenPosition.y - tilePosition.y);
    let speed = (6 * canvas.grid.size)/1000;
    
    let rotation = angleRadians * (180 / Math.PI);
    const travelTime = (distance / speed);
  
    const trailLabel = `${label} - Trail`;
    let activeTrailEffect = Sequencer.EffectManager.getEffects({ name: trailLabel, object: token }).length > 0;
   
    const sequenceMATT = new Sequence()
        .effect()
            .file(img("eskie.smoke.01.black"))
            .atLocation(token)
            .spriteRotation(rotation)
            .scaleToObject(1.75, {considerTokenScale: true})
            .belowTokens()
            .opacity(0.5)
            .tint("#696969")
            .playIf(!activeTrailEffect)
        .effect()
            .file(img("eskie.particle.04.white"))
            .atLocation(token)
            .spriteRotation(rotation)
            .scaleToObject(1.35, {considerTokenScale: true})
            .playbackRate(1.5)
            .zIndex(1)
        .effect()
            .name(trailLabel)
            .file(img("eskie.trail.token.generic.02.black"))
            .attachTo(token)
            .rotateTowards(tile,{attachTo: false})
            .scaleToObject(1.5, {considerTokenScale: true})
            .spriteOffset({x:-0.75-0.75},{gridUnits:true})
            .opacity(1)
            .persist()
            .timeRange(250, 750)
            .fadeOut(500, {ease:"easeOutQuint"})
            .filter("ColorMatrix", { saturate:3})
            .playIf(travelTime >= 500  && !activeTrailEffect)
        .effect()
            .file(img("eskie.trail.token.generic.02.black"))
            .attachTo(token)
            .rotateTowards(tilePosition)
            .scaleToObject(1.5, {considerTokenScale: true})
            .spriteOffset({x:-0.75-0.75},{gridUnits:true})
            .opacity(1)
            .startTime(750)
            .playIf(travelTime < 500)   
        .wait(Math.max(travelTime-250,250))
        .thenDo(async () => {
            Sequencer.EffectManager.endEffects({ name: trailLabel });
        });
  
   await sequenceMATT.play();
}


export const dash = {
    create,
    play,
    stop,
    macro: {
        movement
    },
};

autoanimations.register("Dash", "effect", "eskie.effect.dash", DEFAULT_CONFIG);