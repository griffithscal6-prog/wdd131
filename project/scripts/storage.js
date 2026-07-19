/**
 * -------------------------------------------------------
 * D&D 5.5e Character Builder
 * storage.js
 * -------------------------------------------------------
 * Handles saving and loading the character
 * from Local Storage.
 * -------------------------------------------------------
 */

const STORAGE_KEY = "dndCharacter";

/**
 * Saves the current character.
 */
function saveCharacter() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(character)
    );

}

/**
 * Loads the saved character.
 */
function loadCharacter() {

    const savedCharacter =
        localStorage.getItem(STORAGE_KEY);

    if (!savedCharacter) {

        return;

    }

    const parsedCharacter =
        JSON.parse(savedCharacter);

    Object.assign(character, parsedCharacter);

}

/**
 * Deletes the saved character.
 */
function deleteCharacter() {

    localStorage.removeItem(STORAGE_KEY);

    resetCharacter();

}

/**
 * Starts a brand-new character.
 */
function newCharacter() {

    deleteCharacter();

    saveCharacter();

}