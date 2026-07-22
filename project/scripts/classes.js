/**
 * -------------------------------------------------------
 * classes.js
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

    displayClasses(data.classes);

}

function displayClasses(classes) {

    const container =
        document.getElementById("classContainer");

    container.innerHTML = "";

    classes.forEach(buildClassCard);

}

function buildClassCard(characterClass) {

    const container =
        document.getElementById("classContainer");

    const article =
        document.createElement("article");

    article.classList.add("selection-card");

    const heading =
        document.createElement("h3");

    heading.textContent =
        characterClass.name;

    const button =
        document.createElement("button");

    button.textContent =
        "Select";

    button.addEventListener("click", () => {

        setClass(characterClass.id);

        saveCharacter();

        window.location.href =
            "species.html";

    });

    article.appendChild(heading);

    article.appendChild(button);

    container.appendChild(article);

}