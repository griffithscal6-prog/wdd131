/**
 * -------------------------------------------------------
 * D&D 5.5e Character Builder
 * dataLoader.js
 * -------------------------------------------------------
 * Loads the application's JSON database.
 * -------------------------------------------------------
 */

let dndData = null;

/**
 * Loads the JSON database.
 *
 * @returns {Promise<Object>}
 */
async function loadData() {

    if (dndData !== null) {

        return dndData;

    }

    try {

        const response = await fetch("data/dndData.json");

        if (!response.ok) {

            throw new Error("Unable to load dndData.json");

        }

        dndData = await response.json();

        return dndData;

    }

    catch (error) {

        console.error(error);

        return null;

    }

}

/**
 * Returns the loaded data.
 */
function getData() {

    return dndData;

}