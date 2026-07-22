/**
 * -------------------------------------------------------
 * D&D 5.5e Character Builder
 * summary.js
 * -------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {

    loadCharacter();

    const data = await loadData();

    if (!data) {

        return;

    }
    if (character.class != null)
        console.log(`Character Class: ${character.class}`);
    if (character.species != null)
        console.log(`Character Species: ${character.species}`);
    if (character.selectionKey != false && character.selectionKey != undefined)
        console.log(`Selection for "${character.selectionKey}" Currently set to "${character.selectedOption}".`);
    if (character.background != null)
        console.log(`Character Background: ${character.background}`);


    displayCharacterInfo(data);

    displayAbilityScores();

    displaySpeciesTraits(data);

    displayClassFeatures(data);

    displayBackgroundBenefits(data);

    displayProficiencies(data);

    document
        .getElementById("startOverButton")
        .addEventListener("click", startOver);

}



/* -------------------------------------------------- */
/* Character Information                              */
/* -------------------------------------------------- */

function displayCharacterInfo(data) {

    const container =
        document.getElementById("characterInfo");

    container.innerHTML = "";

    const characterClass =
        data.classes.find(c => c.id === character.class);

    const species =
        data.species.find(s => s.id === character.species);

    const background =
        data.backgrounds.find(b => b.id === character.background);

    addParagraph(container, "Class", characterClass.name);

    addParagraph(container, "Species", species.name);

    if (character.selectionKey != false)
        addParagraph(container, character.selectionKey, character.selectedOption ?? "N/A");

    addParagraph(container, "Background", background.name);

    addParagraph(container, "Origin Feat", background.originFeat);

}



/* -------------------------------------------------- */
/* Ability Scores                                     */
/* -------------------------------------------------- */

function displayAbilityScores() {

    const container =
        document.getElementById("abilityScores");

    container.innerHTML = "";

    Object.keys(character.abilities).forEach(ability => {

        const score =
            character.abilities[ability].score;

        const modifier =
            character.abilities[ability].modifier;

        const sign =
            modifier >= 0 ? "+" : "";

        const p =
            document.createElement("p");

        p.textContent =
            `${capitalize(ability)}: ${score} (${sign}${modifier})`;

        container.appendChild(p);

    });

}



/* -------------------------------------------------- */
/* Species Traits                                     */
/* -------------------------------------------------- */

function displaySpeciesTraits(data) {

    const container =
        document.getElementById("speciesTraits");

    container.innerHTML = "";

    const species =
        data.species.find(s => s.id === character.species);

    species.traits.forEach(trait => {

        const li =
            document.createElement("li");

        li.textContent =
            trait;

        container.appendChild(li);

    });

}



/* -------------------------------------------------- */
/* Class Features                                     */
/* -------------------------------------------------- */

function displayClassFeatures(data) {

    const container =
        document.getElementById("classFeatures");

    container.innerHTML = "";

    const characterClass =
        data.classes.find(c => c.id === character.class);

    characterClass.classFeatures.forEach(feature => {

        const li =
            document.createElement("li");

        li.textContent =
            feature;

        container.appendChild(li);

    });

}



/* -------------------------------------------------- */
/* Background Benefits                                */
/* -------------------------------------------------- */

function displayBackgroundBenefits(data) {

    const container =
        document.getElementById("backgroundBenefits");

    container.innerHTML = "";

    const background =
        data.backgrounds.find(b => b.id === character.background);

    addParagraph(container,
        "Origin Feat",
        background.originFeat);

    addParagraph(container,
        "Skills",
        background.skills.join(", "));

    addParagraph(container,
        "Tool",
        background.tool);

}



/* -------------------------------------------------- */
/* Proficiencies                                      */
/* -------------------------------------------------- */

function displayProficiencies(data) {

    const container =
        document.getElementById("proficiencies");

    container.innerHTML = "";

    const characterClass =
        data.classes.find(c => c.id === character.class);

    addParagraph(
        container,
        "Weapons",
        characterClass.weaponProficiencies.join(", ")
    );

    addParagraph(
        container,
        "Armor",
        characterClass.armorTraining.join(", ")
    );

}



/* -------------------------------------------------- */
/* Utility Functions                                  */
/* -------------------------------------------------- */

function addParagraph(container, label, value) {

    const p =
        document.createElement("p");

    p.innerHTML =
        `<strong>${label}:</strong> ${value}`;

    container.appendChild(p);

}



function capitalize(text) {

    return text.charAt(0).toUpperCase() +
        text.slice(1);

}



/* -------------------------------------------------- */
/* Start Over                                         */
/* -------------------------------------------------- */

function startOver() {

    localStorage.removeItem("dndCharacter");

    window.location.href =
        "index.html";

}