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

    article.classList.add("class-card");

    const heading =
        document.createElement("h3");

    heading.textContent =
        characterClass.name;

    const button =
        document.createElement("button");

    button.textContent =
        "Select";

    button.addEventListener("click", () => {

        setClass(classId);

        saveCharacter();

        window.location.href =
            "species.html";

    });

    article.appendChild(heading);

    article.appendChild(button);

    container.appendChild(article);

}