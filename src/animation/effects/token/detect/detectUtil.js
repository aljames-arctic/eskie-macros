import { img } from '../../../../lib/filemanager.js';

// Mapping of tag -> Sequencer file
const defaultDetectionConfig = {};
// Return true if any tag in tags is applied
const defaultValidator = async function (target, tags) {
    return false;
}

async function _createDetectionEffects(target, config) {
    const tags = Object.keys(config.effect.detectionConfig);
    let sequence = new Sequence();

    let filteredTags = [];
    for (const tag of tags) {
        let validated = await config.effect.validator(target, [tag]);
        if (validated) { filteredTags.push(tag); }
    }
    if (filteredTags.length === 0) { return sequence; }

    sequence = sequence
        .effect()
        .copySprite(target)
        .belowTokens()
        .attachTo(target)
        .scaleToObject(target.document.width)
        .spriteRotation(180)  // Sprite should copy token rotation -- I don't know why this is necessary...
        .filter('Glow', { color: 0xffffff, distance: 15 })
        .duration(30000)
        .fadeIn(500, { delay: 0 })
        .fadeOut(1000, { ease: 'easeInCubic' })
        .zIndex(0.2)
        .opacity(1);

    // Complex bit...
    // Seconds                   5s                    10s                   15s                    20s                   25s                   30s
    // One Tag:     [Tag 1 4s] [Blank 1s] [Tag 1 4s] [Blank 1s] [Tag 1 4s] [Blank 1s] [Tag 1 4s] [Blank 1s] [Tag 1 4s] [Blank 1s] [Tag 1 4s] [Blank 1s]
    // Two Tags:    [Tag 1 4s] [Blank 1s] [Tag 2 4s] [Blank 1s] [Tag 1 4s] [Blank 1s] [Tag 2 4s] [Blank 1s] [Tag 1 4s] [Blank 1s] [Tag 2 4s] [Blank 1s]
    // Three Tags:  [Tag 1 4s] [Blank 1s] [Tag 2 4s] [Blank 1s] [Tag 3 4s] [Blank 1s] [Tag 1 4s] [Blank 1s] [Tag 2 4s] [Blank 1s] [Tag 3 4s] [Blank 1s]
    // Four Tags:   [Tag 1 4s] [Blank 1s] [Tag 2 4s] [Blank 1s] [Tag 3 4s] [Blank 1s] [Tag 4 4s] [Blank 1s] [Tag 1 4s] [Blank 1s] [Tag 2 4s] [Blank 1s]
    const numTags = filteredTags.length;
    const animationDuration = 4000;
    const blankDuration = 1000;
    const singleTagCycle = animationDuration + blankDuration;
    const allTagsCycle = singleTagCycle * numTags;
    const totalDuration = 30000;

    for (let i = 0; (i * allTagsCycle) < totalDuration; i++) {
        for (let j = 0; j < numTags; j++) {
            const tag = filteredTags[j];
            const delay = (i * allTagsCycle) + (j * singleTagCycle);
            if (delay >= totalDuration) { continue; }

            sequence.effect()
                .file(img(config.effect.detectionConfig[tag]))
                .attachTo(target, {bindRotation:false})
                .scaleToObject(1, { considerTokenScale: true })
                .delay(delay)
                .duration(animationDuration)
                .fadeIn(2000)
                .fadeOut(2000, { ease: 'easeInSine' })
                .opacity(0.8)
                .zIndex(0.1);
        }
    }

    return sequence;
}

/**
 * Creates a detection effect.
 *
 * @param {Token} token The token casting the spell.
 * @param {object} [config={}] Configuration for the effect.
 * @param {number} [config.distance=30] The area of effect distance in feet.
 * @param {object} [config.detectionConfig=defaultDetectionConfig] The detection configuration.
 * @returns {Promise<Sequence>} A promise that resolves with the sequence.
 */
async function create(token, config) {
    if (config?.effect?.ionConfig) {
        config.effect.detectionConfig = foundry.utils.mergeObject(config.effect.detectionConfig || {}, config.effect.ionConfig);
        delete config.effect.ionConfig;
    }
    const defaultConfig = { distance: 30, effect: {pulse: {img:'jb2a.detect_magic.circle.purple'}, detectionConfig: defaultDetectionConfig, validator: defaultValidator} };
    const mergedConfig = foundry.utils.mergeObject(defaultConfig, config);
    const targets = canvas.tokens.placeables.filter((t) => {
        if (t.id === token.id) return false;
        const targetDistance = canvas.grid.measurePath([token, t]).euclidean ?? 0;
        return targetDistance <= mergedConfig.distance;
    });

    let sequence = new Sequence();
    sequence
        .effect()
        .file(img(mergedConfig.effect.pulse.img))
        .atLocation(token)
        .size(mergedConfig.distance * 2, { gridUnits: true })
        .fadeOut(4000)
        .opacity(0.75)
        .belowTokens();

    for (const target of targets) {
        const targetDistance = canvas.grid.measurePath([token, target]).euclidean ?? 0;
        const delay = (targetDistance / canvas.grid.size) * 125;
        let targetSequence = new Sequence().wait(delay);
        targetSequence.addSequence(await _createDetectionEffects(target, mergedConfig));
        sequence.addSequence(targetSequence);
    }

    return sequence;
}

async function play(token, config) {
    const seq = await create(token, config);
    if (seq) { return seq.play(); }
}

export const detectUtil = {
    create,
    play,
}