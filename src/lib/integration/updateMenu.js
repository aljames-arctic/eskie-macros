async function generateAutorecUpdate(autorec, quiet = true) {
    if (quiet) console.group("Eskie Macros | Autorecognition Menu Check");
    let settings = {};
    settings.melee = [...new Map(await game.settings.get("autoanimations", "aaAutorec-melee").map((v) => [v.id, v])) .values(), ];
    settings.range = [...new Map(await game.settings.get("autoanimations", "aaAutorec-range").map((v) => [v.id, v])) .values(), ];
    settings.ontoken = [...new Map(await game.settings.get("autoanimations", "aaAutorec-ontoken").map((v) => [v.id, v])) .values(), ];
    settings.templatefx = [...new Map(await game.settings.get("autoanimations", "aaAutorec-templatefx").map((v) => [v.id, v])) .values(), ];
    settings.preset = [...new Map(await game.settings.get("autoanimations", "aaAutorec-preset").map((v) => [v.id, v])) .values(), ];
    settings.aura = [...new Map(await game.settings.get("autoanimations", "aaAutorec-aura").map((v) => [v.id, v])) .values(), ];
    settings.aefx = [...new Map(await game.settings.get("autoanimations", "aaAutorec-aefx").map((v) => [v.id, v])) .values(), ];

    let updatedEntries = { melee: [], range: [], ontoken: [], templatefx: [], aura: [], preset: [], aefx: [], };
    let missingEntries = { melee: [], range: [], ontoken: [], templatefx: [], aura: [], preset: [], aefx: [], };
    let custom = { melee: [], range: [], ontoken: [], templatefx: [], aura: [], preset: [], aefx: [], };
    let same = { melee: [], range: [], ontoken: [], templatefx: [], aura: [], preset: [], aefx: [], };

    // Function to retrieve full version from label
    function getFullVersion(label, array) {
        return array.find((e) => e.label === label);
    }

    for (const key of Object.keys(settings)) {
        if (!autorec[key]) { continue; }
        autorec[key].map((x) => x.label).forEach(async (x) => {
            if (settings[key].map((x) => x.label).some((e) => e === x)) {
                const xEntry = getFullVersion(x, settings[key]);
                if (xEntry.metaData && xEntry.metaData.name === "Eskie Macros") {
                    updatedEntries[key].push(getFullVersion(x, autorec[key]));
                } else {
                    custom[key].push(xEntry);
                }
            } else {
                missingEntries[key].push(getFullVersion(x, autorec[key]));
            }
        });
    }

    if (quiet) console.info("The following effects did not exist before. They will be ADDED.", missingEntries);
    if (quiet) console.info("The following effects will be UPDATED.", updatedEntries);
    if (quiet) console.info("The following effects cannot be added or updated, due to them already existing from an unknown source. They will be IGNORED.", custom);
    if (quiet) console.groupEnd();

    // Create a list of all effects done.
    let missingEntriesList = [];
    let updatedEntriesList = [];
    let customEntriesList = [];
    for (const key of Object.keys(settings)) {
        missingEntriesList.push(missingEntries[key].map((x) => `${x.label} <i class="dnd5e-animations-muted">(${key})</i>`));
        updatedEntriesList.push(updatedEntries[key].map((x) => `${x.label} <i class="dnd5e-animations-muted">(${key})</i>`));
        customEntriesList.push(custom[key].map((x) => `${x.label} <i class="dnd5e-animations-muted">(${key})</i>`));
    }
    missingEntriesList = missingEntriesList.flat().sort();
    updatedEntriesList = updatedEntriesList.flat().sort();
    customEntriesList = customEntriesList.flat().sort();

    return {
        autorec,
        missingEntriesList,
        updatedEntriesList,
        customEntriesList,
    };
}

async function generateAutorecUpdateHTML(autorec) {
    const {
        missingEntriesList,
        updatedEntriesList,
        customEntriesList,
    } = await generateAutorecUpdate(autorec, false);
    let html = `<h1 style="text-align: center; font-weight: bold;">Eskie Macros AA Integration Update Menu</h1>`;

    if (missingEntriesList.length || updatedEntriesList.length || customEntriesList.length) {
        if (missingEntriesList.length) {
            html += `
			<div class="dnd5e-animations-autorec-update-child">
				<p class="dnd5e-animations-autorec-update-text">${game.i18n.localize("EMP.updateMenu.added")}</p>
				<ul class="dnd5e-animations-autorec-update-ul ${missingEntriesList.length % 3 === 0 ? "dnd5e-animations-columns-3" : ""}">
					${missingEntriesList.map((x) => `<li>${x}</li>`).join("")}
				</ul>
			</div>
			`;
        }
        if (customEntriesList.length) {
            html += `
			<div class="dnd5e-animations-autorec-update-child">
				<p class="dnd5e-animations-autorec-update-text">${game.i18n.localize("EMP.updateMenu.custom")}</p>
				<p class="dnd5e-animations-autorec-update-text">${game.i18n.localize("EMP.updateMenu.customHint")}</p>
				<ul class="dnd5e-animations-autorec-update-ul ${customEntriesList.length % 3 === 0 ? "dnd5e-animations-columns-3" : ""}">
					${customEntriesList.map((x) => `<li>${x}</li>`).join("")}
				</ul>
			</div>
			`;
        }
        if (updatedEntriesList.length) {
            html += `
			<div class="dnd5e-animations-autorec-update-child">
				<p class="dnd5e-animations-autorec-update-text">${game.i18n.localize("EMP.updateMenu.updated")}</p>
				<ul class="dnd5e-animations-autorec-update-ul ${updatedEntriesList.length % 3 === 0 ? "dnd5e-animations-columns-3" : ""}">
					${updatedEntriesList.map((x) => `<li>${x}</li>`).join("")}
				</ul>
			</div>
			`;
        }
        html += `<p style="text-align: center; font-size: 1.2em; font-weight: bold;">${game.i18n.localize("EMP.updateMenu.warning")}</p>`;
    } else {
        html = `<p class="dnd5e-animations-autorec-update-text">${game.i18n.localize("EMP.updateMenu.nothing")}</p>`;
    }
    return html;
}

export class autorecUpdateFormApplication extends FormApplication {
    constructor(autorec) {
        super();
        this.autorec = autorec;
    }

    async html() {
        return await generateAutorecUpdateHTML(this.autorec);
    }

    async settings() {
        return await generateAutorecUpdate(this.autorec);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["form"],
            popOut: true,
            template: `modules/eskie-macros/src/templates/autorecUpdateMenu.html`,
            id: "empAutorecUpdateMenu",
            title: "Eskie Macros AA Update",
        });
    }

    async getData() {
        // Send data to the template
        return { literallyEverything: await this.html() };
    }

    async activateListeners(html) {
        const {
            missingEntriesList,
            updatedEntriesList,
            customEntriesList,
        } = await this.settings();
        if (!(missingEntriesList.length || updatedEntriesList.length || customEntriesList.length))
            $('[name="update"]').remove();
        super.activateListeners(html);

        html.find('button[name="cancel"]').on('click', () => this.close());
    }

    async _updateObject(event) {
        $(".dnd5e-animations-autorec-update-buttons").attr("disabled", true);
        if (event.submitter.name === "update") {
            console.group("Eskie Macros | Autorecognition Menu Update");
            const { autorec } = await this.settings();
            if (Object.keys(autorec).length === 0)
                return console.log("Nothing to update!");

            await AutomatedAnimations.AutorecManager.mergeMenus(autorec, { submitAll: true });
            console.log("Eskie Macros | New animations have been added to Automated Animations.");
            console.groupEnd();
        }
    }
}
