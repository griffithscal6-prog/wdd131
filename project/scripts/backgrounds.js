/**
 * -------------------------------------------------------
 * D&D 5.5e Character Builder
 * backgrounds.js
 * -------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {

    loadCharacter();

    const data = await loadData();

    if (!data) {
        return;
    }

    displayBackgrounds(data.backgrounds);

}

function displayBackgrounds(backgroundList) {

    const container =
        document.getElementById("backgroundContainer");

    container.innerHTML = "";

    backgroundList.forEach(buildBackgroundCard);

}

function buildBackgroundCard(background) {

    const container =
        document.getElementById("backgroundContainer");

    const article =
        document.createElement("article");

    article.classList.add("background-card");



    // -----------------------------
    // Background Name
    // -----------------------------

    const heading =
        document.createElement("h3");

    heading.textContent =
        background.name;

    article.appendChild(heading);



    // -----------------------------
    // Origin Feat
    // -----------------------------

    const featHeading =
        document.createElement("h4");

    featHeading.textContent =
        "Origin Feat";

    article.appendChild(featHeading);

    const feat =
        document.createElement("p");

    feat.textContent =
        background.originFeat;

    article.appendChild(feat);



    // -----------------------------
    // Skills
    // -----------------------------

    const skillHeading =
        document.createElement("h4");

    skillHeading.textContent =
        "Skill Proficiencies";

    article.appendChild(skillHeading);

    const skillList =
        document.createElement("ul");

    background.skills.forEach(skill => {

        const item =
            document.createElement("li");

        item.textContent =
            skill;

        skillList.appendChild(item);

    });

    article.appendChild(skillList);



    // -----------------------------
    // Tool
    // -----------------------------

    const toolHeading =
        document.createElement("h4");

    toolHeading.textContent =
        "Tool Proficiency";

    article.appendChild(toolHeading);

    const tool =
        document.createElement("p");

    tool.textContent =
        background.tool;

    article.appendChild(tool);



    // -----------------------------
    // Select Button
    // -----------------------------

    const button =
        document.createElement("button");

    button.textContent =
        "Select";

    button.addEventListener("click", () => {

        setBackground(backgroundId);

        saveCharacter();

        window.location.href =
            "abilities.html";

    });

    article.appendChild(button);

    container.appendChild(article);

}