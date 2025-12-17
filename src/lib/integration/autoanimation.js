import { dependency } from "../dependency.js";
import { defaultMenuSettings } from "./autoanimation/defaultMenuSettings.js";
import { autorecUpdateFormApplication, generateAutorecUpdate } from "./updateMenu.js";

const EMP_AA_Menu = {
    melee: [],
    range: [],
    ontoken: [],
    templatefx: [],
    preset: [],
    aura: [],
    aefx: [],
    version: defaultMenuSettings.version,
};

// Standardize trigger names to match AA expected values
// Useful because I won't remember templatefx vs template, aefx vs effect, etc.
function standardizeTrigger(trigger) {
    trigger = trigger.toLowerCase();
    switch(trigger) {
        case "token": return "ontoken";
        case "template": return "templatefx";
        case "effect": return "aefx";
        case "melee-target": return "melee";
        case "ranged-target": return "range";
        default: return trigger;
    }
}

/**
 * Creates a template for an Automated Animations autorec entry formatted for Eskie Macro Pack use case.
 * @param {string} label - The name of the spell/item.
 * @param {string} macroName - The name of the globally exposed wrapper function.
 * @returns {object} The autorec entry.
 */
function createAutorecEntry(label, trigger, animation, config, version = "0.0.0") {
    const moduleId = "eskie-macros";
    trigger = standardizeTrigger(trigger);
    const defaultMenu = defaultMenuSettings[trigger];
    const defaultEntry = defaultMenu[0];
    const compendium = `Compendium.${moduleId}.eskie-aa-integration`;

    let name = "UNSPECIFIED MACRO";
    switch(trigger) {
        case "melee":
        case "range":
        case "ontoken":
            name = `${compendium}.AA | Target`;
            break;
        case "aura":
        case "aefx":
            name = `${compendium}.AA | Effect`;
            break;
        case "templatefx":
            name = `${compendium}.AA | Template`;
            break;
        case "preset":
            break;
        default:
            throw new Error(`EMP + AA | Unknown trigger type "${trigger}" for effect "${name}".`);
    }
    config.animation = animation;

    const entry = {
        id: foundry.utils.randomID(),
        label: label,
        macro: {
            enable: true,
            name: name,
            args: JSONformatObject(config),
            playWhen: "2"
        },
        metaData: {
            name: "Eskie Macro Pack",
            version: version
        }
    };

    return foundry.utils.mergeObject(defaultEntry, entry, { inplace: false });
}

// Convert object to stringified JSON and escape quotes
// For instance: { key: "value" } -> "{ "key": \"value\"}"
function JSONformatObject(obj, depth = 1) {
    var type = typeof obj;
    /* Special case for eskie.effect functions */
    if(type === 'string' && obj.startsWith("eskie.effect.")) return obj;
    /* Better looking JSON stringify */
    if(type === 'string') return '\'' + obj + '\'';
    if(type === 'boolean' || type === 'number') return obj;
    if(type === 'function') return obj.toString();
    if(obj instanceof Array) return JSON.stringify(obj);

    var ret = [];
    for(var prop in obj) {
      ret.push(`\n` + ' '.repeat(depth * 2) +`${prop}: ${JSONformatObject(obj[prop], depth + 1)}`);
    }
    return `{${ret.join(',')}\n}`;
}

// Register internally but do not submit to AA yet
async function register(name, trigger, animation, config, version) {
    trigger = standardizeTrigger(trigger);
    const entry = createAutorecEntry(name, trigger, animation, config, version);
    if (!entry) return;
    EMP_AA_Menu[trigger].push(entry);
}

// Submit all registered animations to AA
async function submit() {
    if (!dependency.isActivated({ id: "autoanimations", min: "6.5.1" }, "EMP | Automated Animations integration skipped.")) { return; }
    const { missingEntriesList, updatedEntriesList, customEntriesList } = await generateAutorecUpdate(EMP_AA_Menu, true);
    if (missingEntriesList.length || updatedEntriesList.length || customEntriesList.length) {
        new autorecUpdateFormApplication(EMP_AA_Menu).render(true);
    } else {
        console.info("EMP | All Eskie Macro animations are up to date!");
    }
}

export const autoanimation = {
    register,
    submit,
};

export function CONCENTRATING(name) {
    return `Concentrating: ${name}`;
}