function file(...categories) {
    eskieMacros.dependency.someRequired([{ id: 'eskie-effects' }, { id: 'eskie-effects-free' }]);
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
    file,
}