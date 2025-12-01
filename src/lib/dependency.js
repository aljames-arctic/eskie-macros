/**
 * Checks if the versions are in ascending order.
 * @param {string} a The first version.
 * @param {string} b The second version.
 * @param {string} c The third version.
 * @returns {boolean} Whether the versions are in ascending order.
 * @private
 */
function _isAscending(a, b, c) {
    // Not true that b > a or c > b
    return  ( !(foundry.utils.isNewerVersion(a, b) || foundry.utils.isNewerVersion(b, c)) );
}

function _getEntity(dependency) {
    let isModule = game.modules.get(dependency.id);
    let entity = isModule ? game.modules.get(dependency.id) : globalThis[dependency.id];
    if (dependency.id == 'foundry') entity = game;
    return entity;
}

/**
 * Checks if the dependency is installed.
 * @param {object} dependency
 * @param {string} dependency.id
 * @param {string} dependency.min Minimum allowable version
 * @param {string} dependency.max Maximum allowable version
 * @returns {[boolean, version || undefined]} [entity, isValidVersion]
 * @private
 */
function _isInstalled(dependency) {
    let entity = _getEntity(dependency);
    let [minimum, maximum] = [dependency.min, dependency.max];
    if (minimum == undefined) minimum = entity.version ?? '0.0.0';
    if (maximum == undefined) maximum = entity.version ?? '0.0.0';

    let properInstall = !!(entity) && _isAscending(minimum, entity?.version, maximum);
    return [properInstall, entity?.version];
}

/**
 * Checks if the dependency is installed.
 * @param {object} dependency
 * @param {string} dependency.id
 * @param {string} dependency.min Minimum allowable version
 * @param {string} dependency.max Maximum allowable version
 * @returns {[object, boolean]} [entity, isValidVersion]
 * @private
 */
function _isActivated(dependency) {
    let entity = _getEntity(dependency);
    let [minimum, maximum] = [dependency.min, dependency.max];
    if (minimum == undefined) minimum = entity.version ?? '0.0.0';
    if (maximum == undefined) maximum = entity.version ?? '0.0.0';
    let properActivated = !!(entity?.active) && _isAscending(minimum, entity?.version, maximum);
    return [properActivated, entity?.version];
}

/**
 * Appends version information to a message.
 * @param {object} dependency The dependency to get version information from.
 * @param {string} version The current version of the dependency.
 * @returns {string} The message with version information appended.
 * @private
 */
function _versionMessageAppend(dependency, version) {
    let msg = '';
    if (dependency.min) msg += `\n\tMinimum version: ${dependency.min}`;
    if (dependency.max) msg += `\n\tMaximum version: ${dependency.max}`;
    msg += (version) ? `\n\tCurrent version: ${version}` : ``;
    msg += `\n\tCurrent state: `;
    msg += (version) ? `NOT ACTIVATED` : `NOT INSTALLED`;
    return msg;
}

function isActivated(dependency, warnMessage) {
    if (!dependency.id) return [false, undefined];
    let [activated, versionValid] = _isActivated(dependency);
    let valid = activated && versionValid;
    if (!valid && warnMessage) {
        if (warnMessage.length) warnMessage += '\n';
        warnMessage += `Warning: ${dependency.id} is not activated and between expected versions:`;
        warnMessage += _versionMessageAppend(dependency, versionValid);
        console.warn(warnMessage);
    }
    return valid;
}

function isInstalled(dependency) {
    let [entity, versionValid] = _isInstalled(dependency);
    let valid = !!entity && versionValid;
    if (!valid && warnMessage) {
        if (warnMessage.length) warnMessage += '\n';
        warnMessage += `Warning: ${dependency.id} is not installed and between expected versions:`;
        warnMessage += _versionMessageAppend(dependency, versionValid);
        console.warn(warnMessage);
    }
    return valid;
}

/**
 * Checks if a recommended dependency is activated.
 * @param {object} dependency The dependency to check.
 * @returns {boolean} Whether the dependency is activated.
 */
function hasRecommended(dependency) {
    return isActivated(dependency, 'Recommend installing the following:');
}

/**
 * Checks if at least one of a list of recommended dependencies is activated.
 * @param {Array<object>} dependencyList The list of dependencies to check.
 * @returns {boolean} Whether at least one dependency is activated.
 */
function hasSomeRecommended(dependencyList) {
    for (let dependency of dependencyList)
        if (isActivated(dependency)) return true;

    let warnMsg = 'Recommend installing one of the following:';
    for (let dependency of dependencyList) {
        warnMsg += `\nModule Id: ${dependency.id}`;
    }
    console.warn(warnMsg);
    return false;
}

/**
 * Checks if a required dependency is activated and throws an error if it is not.
 * @param {object} dependency The dependency to check.
 * @returns {null | throw} 
 */
function required(dependency) {
    let [isActivated, currentVersion] = _isActivated(dependency);
    if (isActivated) return;

    let errorMsg = `Requires ${dependency.id} to be installed and activated.`;
    errorMsg += _versionMessageAppend(dependency, currentVersion);
    throw errorMsg;
}

/**
 * Checks if at least one of a list of required dependencies is activated and throws an error if not.
 * @param {Array<object>} dependencyList The list of dependencies to check.
 * @returns {null | throw} 
 */
function someRequired(dependencyList) {
    let errorMsg = `Requires at least one of the following to be installed and activated:\n`;

    for (let dependency of dependencyList) {
        let [isActivated, currentVersion] = _isActivated(dependency);
        if (isActivated) return;
        if (errorMsg.length) errorMsg += '\n';
        errorMsg += `Module Id: ${dependency.id}`;
        errorMsg += _versionMessageAppend(dependency, currentVersion);
    }
    throw errorMsg;
}

export const dependency = {
    isActivated,
    isInstalled,
    hasRecommended,
    hasSomeRecommended,
    required,
    someRequired,
};
