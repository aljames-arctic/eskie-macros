function img(...categories) {
    // If we don't have the required module, return undefined
    try{ eskieMacros.dependency.someRequired([{ id: 'eskie-effects' }, { id: 'eskie-effects-free' }]); } 
    catch (e) {  return undefined; }

    const isPatreonUser = eskieMacros.dependency.isActivated({ id: 'eskie-effects' });
    const modulePrefix = (isPatreonUser) ? `eskie` : `eskie-free`;
    
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

export const filemanager = {
    img,
}