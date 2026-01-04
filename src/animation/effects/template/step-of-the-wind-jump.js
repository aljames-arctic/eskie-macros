// Author: .eskie
// Modular Conversion: Gemini

import { autoanimations } from "../../../integration/autoanimations.js";
import { img } from "../../../lib/filemanager.js";

const DEFAULT_CONFIG = {
    id: 'step-of-the-wind-jump',
    position: undefined,
};

async function create(token, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, { inplace: false });
    let { id, position } = mConfig;

    //Determine Jump Timings
    let jumpTime = 750;
    let upTime = jumpTime*0.5;
    let downTime = jumpTime*0.4;

    if (!position) {
        position = await Sequencer.Crosshair.show(
            {
                t: "circle",
                distance: (token.document.width*token.document.texture.scaleX)*2.5,
                snap: {position:(token.document.width % 2 === 0 ? 240 : 1)},
                gridHighlight: false,
                borderAlpha: 0,  
            },
            {
                [Sequencer.Crosshair.CALLBACKS.SHOW]: (crosshair) => {
                
                new Sequence()
            
                    .wait(50)
                    
                    .effect()
                    .name(`${token.document.name} Step of the Wind Crosshair`)
                    .copySprite(token)
                    .attachTo(crosshair)
                    .scaleToObject(1)
                    .opacity(0.5)
                    .filter("ColorMatrix", { saturate:-1})
                    .locally()
                    .persist()
            
                    .wait(50)
        
                    .effect()
                    .delay(50)
                    .name(`${token.document.name} Step of the Wind Crosshair`)
                    .file(img(`eskie.crosshair.line.generic_01.white`))
                    .attachTo(token)
                    .stretchTo(crosshair, {attachTo:true})
                    .opacity(0.8)
                    .locally()
                    .persist()
                    .waitUntilFinished()
                    
                    .thenDo(function(){
            
                        Sequencer.EffectManager.endEffects({
                            name: `${token.document.name} Step of the Wind Crosshair`,
                        });
                    })
                    
                    .play();
                },
            },
            {
                [Sequencer.Crosshair.CALLBACKS.PLACED]: (crosshair) => {
            
                    Sequencer.EffectManager.endEffects({
                        name: `${token.document.name} Step of the Wind Crosshair`,
                    });
                },
            },
            {
                [Sequencer.Crosshair.CALLBACKS.CANCEL]: (crosshair) => {
            
                    Sequencer.EffectManager.endEffects({
                        name: `${token.document.name} Step of the Wind Crosshair`,
                    });
                    return;
                },
            },
        )
    }

    if (position.cancelled) { return; }

    const middlePoint = {
        x: (token.center.x + position.x) / 2,
        y: ((token.center.y + position.y) / 2)- canvas.grid.size*1.5,
    };

    const distance1 = Math.sqrt((middlePoint.x - token.center.x ) ** 2 + (middlePoint.y - token.center.y ) ** 2); 
    const distance2 = Math.sqrt((position.x - middlePoint.x ) ** 2 + (position.y - middlePoint.y ) ** 2);  

    // Determine Trail Direction
    let dx = position.x - token.center.x;
    let dy = position.y - token.center.y;

    let trailOffset  = { x: -0.75, y: 0 };
    let trailRotFrom = -45;
    let trailRotTo   = 45;
    let mirrorTrail  = false;

    if (dx > 0) {
    //Trail Right (Default)  
    trailOffset = { x: -0.75, y: 0 };
    trailRotFrom = -45;
    trailRotTo   = 45;
    mirrorTrail = false;
    } else if (dx < 0) {
    //Trail Left
    trailOffset = { x: 0.75, y: 0 };
    trailRotFrom = 45;
    trailRotTo   = -45;
    mirrorTrail = true;
    } else {
    if (dy > 0) {
    //Trail Down
        trailRotFrom = 90;
        trailRotTo   = 90;
    } else if (dy < 0) {
    //Trail Up
        trailRotFrom = -90;
        trailRotTo   = -90;
    }
    }

    let seq = new Sequence();
    
    seq.wait(100)

        .animation()
            .delay(200)
            .on(token)
            .opacity(0)

        .effect()
            .file(img("eskie.smoke.03.white"))
            .atLocation(token)
            .scaleToObject(1.75)
            .belowTokens()
            .randomRotation()
            .scaleIn(0, 300, {ease: "easeOutExpo"})
            .opacity(0.85)
            .zIndex(1)

        .effect()
            .file(img("eskie.nature.flower.particle.01.blue"))
            .atLocation(token)
            .scaleToObject(1.5)
            .playbackRate(2)
            .scaleIn(0, 1000, {ease: "easeOutCubic"})
            .duration(2500)
            .fadeIn(250)
            .fadeOut(1000)
            .spriteRotation(45)
            .zIndex(6)
            .animateProperty("sprite", "height", {from:1, to: 1.5,  duration: 1000, gridUnits: true, ease:"easeOutCubic"})

        .effect()
            .copySprite(token)
            .atLocation(token)   
            .opacity(0.5)
            .scale(0.9)
            .belowTokens()
            .anchor({ x: 0.5, y: 0.5 })
            .filter("ColorMatrix", { brightness: -1 })
            .filter("Blur", { blurX: 5, blurY: 10 })
            .animateProperty("sprite", "width", {from: 0, to: -0.15,  duration: upTime, gridUnits: true,delay: 200})
            .animateProperty("sprite", "width", {from: 0, to: 0.15,  duration: downTime, gridUnits: true, delay: upTime+200})
            .animateProperty("sprite", "height", {from: 0, to: -0.15,  duration: upTime, gridUnits: true,delay: 200})
            .animateProperty("sprite", "height", {from: 0, to: 0.15,  duration: downTime, gridUnits: true, delay: upTime+200})
            .moveTowards(position, {ease:"linear", rotate:false,delay: 200})
            .duration(jumpTime+200)
            .zIndex(2)

        .effect()
            .name(`${token.document.name} Step of the Wind (Jump)`)
            .copySprite(token)
            .atLocation(token)   
            .opacity(1)
            .animateProperty("sprite", "position.y", {from: 0, to: -1.5,  duration: upTime, gridUnits: true, ease: "easeOutCubic",delay: 200})
            .animateProperty("sprite", "position.y", {from: 0, to: 1.5,  duration: downTime, gridUnits: true, fromEnd: false, ease: "easeInSine", delay: upTime+200})
            .moveTowards(position, {ease:"linear", rotate:false,delay: 200})
            .persist()
            .extraEndDuration(800)
            .duration(jumpTime+200)
            .animateProperty("sprite", "rotation", { from: 0, to: 360, duration: upTime+downTime,ease:"easeInSine", delay:200})
            .zIndex(5)

        .effect()
            .name(`${token.document.name} Step of the Wind (Jump)`)
            .file(img("eskie.trail.token.generic.01.white"))
            .scaleToObject(1.5, {considerTokenScale: true})
            .atLocation(token)   
            .opacity(1)
            .animateProperty("spriteContainer", "position.y", {from: 0, to: -1.5,  duration: upTime, gridUnits: true, ease: "easeOutCubic",delay: 200})
            .animateProperty("spriteContainer", "position.y", {from: 0, to: 1.5,  duration: downTime, gridUnits: true, fromEnd: false, ease: "easeInSine", delay: upTime+200})
            .moveTowards(position, {ease:"linear", rotate:false,delay: 200})
            .persist()
            .fadeIn(250, {delay:200})
            .fadeOut(50, {ease:"easeOutQuint"})
            .duration(jumpTime+200)
            .animateProperty("spriteContainer", "rotation", { from: trailRotFrom, to: trailRotTo, duration: upTime+downTime,ease:"easeInSine", delay:200})
            .mirrorX(mirrorTrail)
            .spriteOffset(trailOffset,{gridUnits:true})
            .filter("ColorMatrix", { saturate:3})
            .zIndex(5)

        .wait(jumpTime)

        .animation()
            .on(token)
            .teleportTo(position)
            .snapToGrid()
            .waitUntilFinished()

        .thenDo(function(){
            Sequencer.EffectManager.endEffects({ name: `${token.document.name} Step of the Wind (Jump)`})
        })

        .animation()
            .delay(200)
            .on(token)
            .opacity(1)
            .snapToGrid()

        .effect()
            .file(img("eskie.smoke.03.white"))
            .atLocation(token)
            .scaleToObject(1.75)
            .belowTokens()
            .randomRotation()
            .scaleIn(0, 300, {ease: "easeOutExpo"})
            .opacity(0.85)

        .effect()
            .file(img("eskie.nature.flower.particle.01.blue"))
            .atLocation(token)
            .scaleToObject(1.5)
            .playbackRate(2)
            .scaleIn(0, 1000, {ease: "easeOutCubic"})
            .duration(2500)
            .fadeIn(250)
            .fadeOut(1000)
            .spriteRotation(45)
            .zIndex(6)
            .animateProperty("sprite", "height", {from:1, to: 1.5,  duration: 1000, gridUnits: true, ease:"easeOutCubic"});
        
    return seq;
}

async function play(token, config = {}) {
    const mConfig = foundry.utils.mergeObject(DEFAULT_CONFIG, config, { inplace: false });
    const sequence = await create(token, mConfig);
    if (sequence) { return sequence.play(); }
}


export const stepOfTheWindJump = {
    create,
    play,
};

autoanimations.register("Step of the Wind Jump", "template", "eskie.effect.stepOfTheWind.jump", DEFAULT_CONFIG);