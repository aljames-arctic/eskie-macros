function img(modulePrefix, ...categories) {
    let currentPath = modulePrefix;
    let remainingOptions = Sequencer.Database.getPathsUnder(currentPath);

    // Traverse the categories that the user has provided
    while (remainingOptions && remainingOptions.length > 0) {
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

function closestImg(path) {
    let categories = path.split('.');
    let isPatreonUser = false;
    let modulePrefix = '';

    switch (categories[0]) {
        case 'eskie':
        case 'eskie-free':
            try{ eskieMacros.dependency.someRequired([{ id: 'eskie-effects' }, { id: 'eskie-effects-free' }]); } 
            catch (e) {  return undefined; }
            isPatreonUser = eskieMacros.dependency.isActivated({ id: 'eskie-effects' });
            modulePrefix = (isPatreonUser) ? `eskie` : `eskie-free`;
            break;
        case 'JB2A_DnD5e':
        case 'jb2a_patreon':
            try{ eskieMacros.dependency.required({ id: 'eskie-effects' }, { id: 'eskie-effects-free' }); } 
            catch (e) {  return undefined; }
            isPatreonUser = eskieMacros.dependency.isActivated({ id: 'eskie-effects' });
            modulePrefix = (isPatreonUser) ? `eskie` : `eskie-free`;
            break;
        case 'animated-spell-effects':
        case 'animated-spell-effects-cartoon':
            try{ eskieMacros.dependency.required({ id: `${categories[0]}` }); } 
            catch (e) {  return undefined; }
            modulePrefix = categories[0];
            break;
    }

    return img(modulePrefix, ...categories);
}

export const filemanager = {
    img,
    closestImg,
}