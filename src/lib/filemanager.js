function file(...categories) {
    eskieMacros.dependency.someRequired([{ id: 'eskie-effects' }, { id: 'eskie-effects-free' }]);
    const isPatreonUser = eskieMacros.dependency.isActivated({ id: 'eskie-effects' });
    const modulePrefix = (isPatreonUser) ? `eskie` : `eskie-free`;
    
    let currentPath = modulePrefix;
    let remainingOptions = Sequencer.Database.getPathsUnder(currentPath);

    // Traverse the categories that the user has provided
    while (remainingOptions && remainingOptions.length > 0) {
        if (!remainingOptions.includes(categories[0])) {
            remainingOptions = null;
            break;
        }
        currentPath += `.${categories.shift()}`;
        remainingOptions = Sequencer.Database.getPathsUnder(currentPath);
    }

    // If you do not have the full path, complete it with the first available options until you get to an animation
    if (!remainingOptions) {
        let options = Sequencer.Database.getPathsUnder(currentPath);
        while (options.length > 0) {
            currentPath += `.${options[0]}`;
            options = Sequencer.Database.getPathsUnder(currentPath);
        }
    }

    return currentPath;
}

export const filemanager = {
    file,
}