/**
 * -------------------------------------------------------
 * D&D 5.5e Character Builder
 * abilities.js
 * -------------------------------------------------------
 */

const abilityList = [

    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma"

];

let currentDice = [];

let currentScore = null;

document.addEventListener("DOMContentLoaded", initializePage);



function initializePage() {

    loadCharacter();

    createAbilityButtons();

    updateAssignedScores();

    document
        .getElementById("rollButton")
        .addEventListener("click", rollAbilityScore);

    document
        .getElementById("continueButton")
        .addEventListener("click", continueToSummary);

}



function createAbilityButtons() {

    const container =
        document.getElementById("abilityButtons");

    container.innerHTML = "";

    abilityList.forEach(buildAbilityButton);

}



function buildAbilityButton(ability) {

    const button =
        document.createElement("button");

    button.textContent =
        capitalize(ability);

    button.id =
        ability + "Button";

    button.disabled = true;

    button.addEventListener("click", () => {

        assignAbility(ability);

    });

    document
        .getElementById("abilityButtons")
        .appendChild(button);

}



function rollAbilityScore() {

    currentDice = roll4d6();

    currentScore = calculateScore(currentDice);

    updateRollDisplay();

    enableAvailableButtons();

}



function rollDie() {

    return Math.floor(Math.random() * 6) + 1;

}



function roll4d6() {

    return [

        rollDie(),
        rollDie(),
        rollDie(),
        rollDie()

    ];

}



function calculateScore(dice) {

    const sorted =
        [...dice].sort((a, b) => a - b);

    sorted.shift();

    return sorted.reduce((sum, value) => sum + value, 0);

}



function updateRollDisplay() {

    document.getElementById("diceDisplay").textContent =
        currentDice.join(", ");

    document.getElementById("scoreDisplay").textContent =
        currentScore;

}



function enableAvailableButtons() {

    abilityList.forEach(ability => {

        const button =
            document.getElementById(ability + "Button");

        button.disabled =
            character.abilities[ability].score !== null;

    });

}



function disableButtons() {

    abilityList.forEach(ability => {

        document
            .getElementById(ability + "Button")
            .disabled = true;

    });

}



function assignAbility(ability) {

    character.abilities[ability].score =
        currentScore;

    character.abilities[ability].modifier =
        calculateModifier(currentScore);

    saveCharacter();

    currentDice = [];

    currentScore = null;

    document.getElementById("diceDisplay").textContent =
        "-";

    document.getElementById("scoreDisplay").textContent =
        "-";

    disableButtons();

    updateAssignedScores();

    checkCompletion();

}



function calculateModifier(score) {

    return Math.floor((score - 10) / 2);

}



function updateAssignedScores() {

    const container =
        document.getElementById("assignedScores");

    container.innerHTML = "";

    abilityList.forEach(ability => {

        const p =
            document.createElement("p");

        const score =
            character.abilities[ability].score;

        const modifier =
            character.abilities[ability].modifier;

        if (score === null) {

            p.textContent =
                `${capitalize(ability)}: —`;

        }

        else {

            const sign =
                modifier >= 0 ? "+" : "";

            p.textContent =
                `${capitalize(ability)}: ${score} (${sign}${modifier})`;

        }

        container.appendChild(p);

    });

}



function checkCompletion() {

    const finished =
        abilityList.every(ability => {

            return character.abilities[ability].score !== null;

        });

    if (finished) {

        document
            .getElementById("continueButton")
            .disabled = false;

        document
            .getElementById("rollButton")
            .disabled = true;

    }

}



function continueToSummary() {

    saveCharacter();

    window.location.href =
        "summary.html";

}



function capitalize(text) {

    return text.charAt(0).toUpperCase() +
        text.slice(1);

}