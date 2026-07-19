/**
 * -------------------------------------------------------
 * D&D 5.5e Character Builder
 * character.js
 * -------------------------------------------------------
 * Stores the current character and provides helper
 * functions used throughout the application.
 * -------------------------------------------------------
 */

const character = {

    class: null,

    species: null,

    background: null,

    originFeat: null,

    selections: {},

    abilities: {

        strength: {
            score: null,
            modifier: null
        },

        dexterity: {
            score: null,
            modifier: null
        },

        constitution: {
            score: null,
            modifier: null
        },

        intelligence: {
            score: null,
            modifier: null
        },

        wisdom: {
            score: null,
            modifier: null
        },

        charisma: {
            score: null,
            modifier: null
        }

    }

};

/**
 * Calculates an ability modifier.
 *
 * Formula:
 * floor((score - 10) / 2)
 */
function calculateModifier(score) {

    return Math.floor((score - 10) / 2);

}

/**
 * Updates every ability modifier.
 */
function updateModifiers() {

    for (const ability in character.abilities) {

        const score = character.abilities[ability].score;

        if (score === null) {

            character.abilities[ability].modifier = null;

        }

        else {

            character.abilities[ability].modifier =
                calculateModifier(score);

        }

    }

}

/**
 * Assigns an ability score.
 */
function assignAbilityScore(ability, score) {

    if (!(ability in character.abilities)) {

        console.error(`${ability} is not a valid ability.`);

        return;

    }

    character.abilities[ability].score = score;

    updateModifiers();

}

/**
 * Sets the selected class.
 */
function setClass(classId) {

    character.class = classId;

}

/**
 * Sets the selected species.
 */
function setSpecies(speciesId) {

    character.species = speciesId;

}

/**
 * Sets the selected background.
 */
function setBackground(backgroundId) {

    character.background = backgroundId;

}

/**
 * Sets the selected origin feat.
 */
function setOriginFeat(featId) {

    character.originFeat = featId;

}

/**
 * Saves an option selected by the user.
 *
 * Example:
 * character.selections["elven-lineage"] = "wood-elf";
 */
function setSelection(category, option) {

    character.selections[category] = option;

}

/**
 * Resets the character.
 */
function resetCharacter() {

    character.class = null;

    character.species = null;

    character.background = null;

    character.originFeat = null;

    character.selections = {};

    for (const ability in character.abilities) {

        character.abilities[ability].score = null;

        character.abilities[ability].modifier = null;

    }

}

/**
 * Returns true if every ability score
 * has been assigned.
 */
function allAbilitiesAssigned() {

    for (const ability in character.abilities) {

        if (character.abilities[ability].score === null) {

            return false;

        }

    }

    return true;

}

/**
 * Returns the complete character.
 */
function getCharacter() {

    return character;

}