import { dependency } from './lib/dependency.js';
import { animation } from './animation/animation.js';
import { filemanager } from './lib/filemanager.js';
// Import module settings to also run its initialization code
import './settings.js';

/**
 * Removes a previously exported function or variable and exports the specifed function or variable if the macro is active.
 *
 * @param {array} exportedIdentifierName the array of exported functions to be merged
 */
function setupApiCalls(exportedFunctions) {
    globalThis.eskieMacros = foundry.utils.mergeObject(
        globalThis.eskieMacros ?? {},
        exportedFunctions
    );
}

/**
 * Initializes the environment with macroUtil for macros
 */
function setupModule() {
    // Setup dependency API
    setupApiCalls( animation );
    setupApiCalls( filemanager );
    setupApiCalls({ dependency });
}

Hooks.once('ready', async function() {
    setupModule();
});