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
    if (character.class != null)
        console.log(`Character Class: ${character.class}`);
    if (character.species != null)
        console.log(`Character Species: ${character.species}`);
    if (character.selectionKey != false && character.selectionKey != undefined)
        console.log(`Selection for "${character.selectionKey}" Currently set to "${character.selectedOption}".`);
    if (character.background != null)
        console.log(`Character Background: ${character.background}`);
    

    displaySpecies(data.species);

   document
        .getElementById("cancelModalButton")
        .addEventListener("click", closeModal);

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

    chooseSpecies(species);

    });

    article.appendChild(button);

    container.appendChild(article);

}

function chooseSpecies(species) {

    setSpecies(species.id);

    if (!species.optionSet) {
        character.selectionKey = false;

        saveCharacter();

        window.location.href =
            "backgrounds.html";

        return;

    }

    const optionSet =
        dndData.optionSets.find(option =>

            option.id === species.optionSet

        );

    if (!optionSet) {

        console.error(

            `Option Set "${species.optionSet}" not found.`

        );

        return;

    }

    showOptionModal(optionSet);

}

function showOptionModal(optionSet) {

    const modal =
        document.getElementById("optionModal");

    document.getElementById("modalTitle")
        .textContent = optionSet.name;

    document.getElementById("modalDescription")
        .textContent =
            "Choose one option.";

    const container =
        document.getElementById("modalOptions");

    container.innerHTML = "";

    optionSet.options.forEach(option => {

        const button =
            document.createElement("button");

        button.classList.add("option-button");

        button.textContent = option;

        button.addEventListener("click", () => {

            character.selectionKey = null;

            switch (optionSet.id) {

                case "elven-lineage":
                    character.selectionKey = "Lineage";
                    break;

                case "gnomish-lineage":
                    character.selectionKey = "Lineage";
                    break;

                case "giant-ancestry":
                    character.selectionKey = "Ancestry";
                    break;

                case "fiendish-legacy":
                    character.selectionKey = "Legacy";
                    break;

                case "celestial-revelation":
                    character.selectionKey = "Revelation";
                    break;

                default:
                    character.selectionKey = optionSet.id;

            }

            setSelection(
                character.selectionKey,
                option
            );

            setSelectionKey(character.selectionKey);
            setSelectedOption(character.selectedOption);
            saveCharacter();
            

            closeModal();

            window.location.href =
                "backgrounds.html";

        });

        container.appendChild(button);

    });

    modal.classList.add("show");

}

function closeModal() {

    document
        .getElementById("optionModal")
        .classList.remove("show");

}