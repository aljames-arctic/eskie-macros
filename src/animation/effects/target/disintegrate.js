import { img } from '../../../lib/filemanager.js';
import { beam } from './beam/beam.js';

function death(target, config) {
    let { id, targetDeath } = config;
    let centerX =  target.x+canvas.grid.size/2
    let centerY =  target.y+canvas.grid.size/2
    let deathEffect = new Sequence()
        .animation()
        .on(target)
        .opacity(0)

        .effect()
        .name(id)
        .file(img("animated-spell-effects-cartoon.smoke.97"))
        .atLocation(target, {offset:{y:-0.25}, gridUnits: true})
        .fadeIn(1000)
        .scaleIn(0, 1000, {ease: "easeOutCubic"})
        .delay(1000)
        .duration(10000)
        .fadeOut(500)
        .scaleToObject(0.5)
        .filter("ColorMatrix", { brightness: 0 })
        .zIndex(0.1)
        .belowTokens()

        .effect()
        .name(id)
        .file(img("jb2a.spirit_guardians.green.particles"))
        .atLocation(target)
        .duration(7500)
        .fadeOut(3000)
        .scaleToObject(0.35)
        .filter("ColorMatrix", { hue: -25 })
        .belowTokens()

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                fillColor: "#FF0000",
                radius: 0.15,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.1, y:-canvas.grid.size*0.4}, 
                
            })
        .duration(1500)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.2,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.1, y:-canvas.grid.size*0.4},            
            })
        .duration(1800)
        .fadeOut(1000)
                    
        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.25,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.1, y:-canvas.grid.size*0.4}, 
            })
        .duration(2000)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.3,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.1, y:-canvas.grid.size*0.4}, 
            })
        .duration(2200)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.35,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.1, y:-canvas.grid.size*0.4}, 
            })   
        .duration(2400)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.4,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.1, y:-canvas.grid.size*0.4}, 
            })
        .duration(2600)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.45,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.1, y:-canvas.grid.size*0.4}, 
            })    
        .duration(2800)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                fillColor: "#FF0000",
                radius: 0.15,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3}, 
                
            })
        .duration(500)
        .fadeOut(1000)    

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.2,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3},           
            })
        .duration(700)
        .fadeOut(1000)              

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.25,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3}, 
            })
        .duration(900)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.3,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3}, 
            })
        .duration(1100)
        .fadeOut(1000)  

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.35,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3}, 
            })   
        .duration(1300)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.4,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3}, 
            })
        .duration(1500)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.45,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3}, 
            })   
        .duration(1700)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.5,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3}, 
            }) 
        .duration(1900)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.55,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:-canvas.grid.size*0.4, y:canvas.grid.size*0.3}, 
            })
        .duration(2100)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                fillColor: "#FF0000",
                radius: 0.15,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.5, y:canvas.grid.size*0.4}, 
                
            })
        .duration(1500)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX) 
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.25,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.5, y:canvas.grid.size*0.4},  
            })
        .duration(1900)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.3,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.5, y:canvas.grid.size*0.4}, 
            })
        .duration(2100)
        .fadeOut(1000)

        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.35,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.5, y:canvas.grid.size*0.4}, 
            })   
        .duration(2300)
        .fadeOut(1000)
            
        // Always Play
        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.4,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.5, y:canvas.grid.size*0.4}, 
            })
        .duration(2500)
        .fadeOut(1000)    

        // Only Death
        .effect()
            .name(id)
            .atLocation({x:centerX, y:centerY})
            .copySprite(target)
            .scaleToObject(target.document.texture.scaleX)
            .shape("circle", {
                lineSize: 25,
                lineColor: "#FF0000",
                radius: 0.45,
                gridUnits: true,
                name: "test",
                isMask: true,
                offset: {x:canvas.grid.size*0.5, y:canvas.grid.size*0.4}, 
            })    
        .duration(2700)
        .fadeOut(1000)

        // Always
        .wait(1500)
    return deathEffect;
}

/**
 * Creates a disintegrate effect.
 *
 * @param {Token} token The token to play the effect on.
 * @param {Token} target The token to be disintegrated.
 * 
 * @param {object} [config={}] Configuration for the effect.
 * @param {string} [config.id='disintegrate'] The id of the effect.
 * @param {boolean} [config.targetDeath=true] Whether the target should be deleted.
 * 
 * @returns {Promise<void>} A promise that resolves when the effect is finished.
 */
async function create(token, target, config) {
    // Merge user config with default config
    const defaultConfig = {
        id: 'disintegrate',
        targetDeath: true,
        targetDelete: false,
    };
    const mergedConfig = foundry.utils.mergeObject(defaultConfig, config);

    const beamEffect = beam.create(token, target, mergedConfig);
    const deathEffect = death(target, mergedConfig);

    return new Sequence()
        .addSequence(beamEffect)
        .addSequence(deathEffect);
}

async function play(token, target, config = {}) {
    let seq = await create(token, target, config);
    await seq.play();
}

async function stop(token, {id = 'disintegrate'} = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

export const disintegrate = {
    create,
    play,
    stop,
    death,
};
