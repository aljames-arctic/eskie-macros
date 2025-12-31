/* Initialize Module Settings */
Hooks.once('init', function() {
    console.log('EMP | Initializing Eskie Macro Pack settings');

    game.settings.register('eskie-macros', 'enableSounds', {
        name: 'EMP.settings.enableSounds.name',
        hint: 'EMP.settings.enableSounds.hint',
        scope: 'client',
        config: true,
        type: Boolean,
        default: false,
    });
});