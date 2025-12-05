import { dependency } from './dependency.js'

function closestPath(modulePrefix, ...categories) {
    let diverged = false;
    let currentPath = modulePrefix;
    let originalPath = `${modulePrefix}.${categories.join('.')}`;
    let remainingOptions = Sequencer.Database.getPathsUnder(currentPath);

    function isMustache(component) {
        return component.startsWith('{{') && component.endsWith('}}');
    }

    // Traverse the categories that the user has provided
    while (remainingOptions && remainingOptions.length > 0 && categories.length > 0) {
        if (isMustache(categories[0])) {
            return `${currentPath}.${categories.join('.')}`;
        }

        if (!remainingOptions.includes(categories[0])) {
            diverged = true;
            currentPath += `.${remainingOptions[0]}`;
            remainingOptions = Sequencer.Database.getPathsUnder(currentPath);
            categories.shift(); // Remove the used category and continue (try to match as best we can)
            continue;
        }

        currentPath += `.${categories.shift()}`;
        remainingOptions = Sequencer.Database.getPathsUnder(currentPath);
    }

    if (diverged) { 
        console.warn(`Path not found: ${originalPath}`);
        console.warn(`Defaulting to first closest match: ${currentPath}`);
    }
    return currentPath;
}

export function sound(path) {
    // Support http:// and https:// addresses
    if (path.includes('/')) return path;

    // Support Sequencer Database paths (. seperated)
    let categories = path.split('.');
    if (categories.length === 0) return;
    let isPatreonUser = false;
    let isFreeUser = false;
    let modulePrefix = categories.shift();
    switch (modulePrefix) {
        case 'psfx':
            dependency.someRequired([{ id: 'psfx-patreon' }, { id: 'psfx' }]);
            isPatreonUser = dependency.isActivated({ id: 'psfx-patreon' });
            isFreeUser = dependency.isActivated({ id: 'psfx' });
            if (isPatreonUser && isFreeUser) 
                ui.notifications.warn('Both PSFX Patreon and Free are activated, both modules use the path `psfx.` to prefix files! This will cause conflicts! Recommend disabling / uninstalling the free version.');
            modulePrefix = 'psfx';
            break;
        case 'psfx-ambience':
            // Only Patreon Version
            break;
    }

    return closestPath(modulePrefix, ...categories);
}

export function img(path) {
    // Support http:// and https:// addresses
    // Support direct filepaths
    if (path.includes('/')) return path;

    // Support Sequencer Database paths (. seperated)
    let categories = path.split('.');
    if (categories.length === 0) return;
    let isPatreonUser = false;
    let isFreeUser = false;
    let modulePrefix = categories.shift();

    switch (modulePrefix) {
        case 'eskie':
        case 'eskie-free':
            dependency.someRequired([{ id: 'eskie-effects' }, { id: 'eskie-effects-free' }]);
            isPatreonUser = dependency.isActivated({ id: 'eskie-effects' });
            modulePrefix = (isPatreonUser) ? `eskie` : `eskie-free`;
            break;
        case 'jb2a':
            dependency.someRequired([{ id: 'jb2a_patreon' }, { id: 'JB2A_DnD5e' }]);
            isFreeUser = dependency.isActivated({ id: 'JB2A_DnD5e' });
            isPatreonUser = dependency.isActivated({ id: 'jb2a_patreon' });
            if (isPatreonUser && isFreeUser) 
                ui.notifications.warn('Both JB2A Patreon and Free are activated, both modules use the path `jb2a.` to prefix files. This will cause conflicts! Recommend disabling / uninstalling the free version.');
            modulePrefix = `jb2a`;
            break;
        case 'animated-spell-effects':
        case 'animated-spell-effects-cartoon':
            dependency.required({ id: modulePrefix });
            break;
    }

    return closestPath(modulePrefix, ...categories);
}

export const filemanager = {
    img,
    sound,
}