const character = {
    name: "Snortleblat",
    class: "Diplomat",
    level: 1,
    health: 100,
    image: "images/character-card.webp",

    attacked() {
        this.health -= 20;

        if (this.health <= 0) {
            this.health = 0;
            alert(`${this.name} has died!`);
        }

        updateCard();
    },

    levelUp() {
        this.level += 1;
        updateCard();
    }
};

function updateCard() {
    document.getElementById("character-name").textContent = character.name;
    document.getElementById("character-class").textContent = character.class;
    document.getElementById("character-level").textContent = character.level;
    document.getElementById("character-health").textContent = character.health;
    document.getElementById("character-image").src = character.image;
}

document.getElementById("attack-btn").addEventListener("click", () => {
    character.attacked();
});

document.getElementById("levelup-btn").addEventListener("click", () => {
    character.levelUp();
});

updateCard();