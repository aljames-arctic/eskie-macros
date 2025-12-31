export function settingsOverride(config = {}) {
    if (!game.settings.get('eskie-macros', 'enableSounds')) {
        config = foundry.utils.mergeObject(config, { sound: { enabled: false } });
    }
    return config;
}