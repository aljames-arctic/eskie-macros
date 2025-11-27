import { dependency } from './dependency.js'

function closestImage(modulePrefix, ...categories) {
    let currentPath = modulePrefix;
    let remainingOptions = Sequencer.Database.getPathsUnder(currentPath);

    // Traverse the categories that the user has provided
    while (remainingOptions && remainingOptions.length > 0 && categories.length > 0) {
        if (!remainingOptions.includes(categories[0])) {
            currentPath += `.${remainingOptions[0]}`;
            remainingOptions = Sequencer.Database.getPathsUnder(currentPath);
            categories.shift(); // Remove the used category and continue (try to match as best we can)
            continue;
        }

        currentPath += `.${categories.shift()}`;
        remainingOptions = Sequencer.Database.getPathsUnder(currentPath);
    }

    return currentPath;
}

export function img(path) {
    // Support http:// and https:// addresses
    if (path.startsWith('http://') || path.startsWith('https://')) return path;

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
                ui.notifications.warn('Both JB2A Patreon and Free are installed!! Both modules use the path `jb2a.` to prefix files. This can cause conflicts! Recommend disabling the free version.');
            modulePrefix = `jb2a`;
            break;
        case 'animated-spell-effects':
        case 'animated-spell-effects-cartoon':
            dependency.required({ id: modulePrefix });
            break;
    }

    return closestImage(modulePrefix, ...categories);
}

export const filemanager = {
    img,
}