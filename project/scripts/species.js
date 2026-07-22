/**
 * -------------------------------------------------------
 * D&D 5.5e Character Builder
 * species.js
 * -------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {

    loadCharacter();

    const data = await loadData();

    if (!data) {
        return;
    }

    displaySpecies(data.species);

}

function displaySpecies(speciesList) {

    const container =
        document.getElementById("speciesContainer");

    container.innerHTML = "";

    speciesList.forEach(buildSpeciesCard);

}

function buildSpeciesCard(species) {

    const container =
        document.getElementById("speciesContainer");

    const article =
        document.createElement("article");

    article.classList.add("selection-card");

    const heading =
        document.createElement("h3");

    heading.textContent = species.name;

    article.appendChild(heading);

    // Display traits

    const traitHeading =
        document.createElement("h4");

    traitHeading.textContent = "Traits";

    article.appendChild(traitHeading);

    const traitList =
        document.createElement("ul");

    species.traits.forEach(trait => {

        const item =
            document.createElement("li");

        item.textContent = trait;

        traitList.appendChild(item);

    });

    article.appendChild(traitList);

    // Select button

    const button =
        document.createElement("button");

    button.textContent = "Select";

    button.addEventListener("click", () => {

        setSpecies(species.id);

        saveCharacter();

        // Placeholder for future option selections
        // (Elven Lineage, Fiendish Legacy, etc.)

        window.location.href =
            "backgrounds.html";

    });

    article.appendChild(button);

    container.appendChild(article);

}