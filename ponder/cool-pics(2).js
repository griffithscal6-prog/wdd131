const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("nav");

// Mobile Menu
menuButton.addEventListener("click", () => {
    nav.classList.toggle("hide");
});

// Create Modal
function viewerTemplate(src, alt) {
    return `
    <button class="close-viewer">X</button>
    <img src="${src}" alt="${alt}">
    `;
}

function viewHandler(event) {

    const dialog = document.createElement("dialog");

    dialog.innerHTML = viewerTemplate(
        event.target.src,
        event.target.alt
    );

    document.body.appendChild(dialog);

    dialog.showModal();

    dialog.querySelector(".close-viewer")
        .addEventListener("click", () => {
            dialog.close();
            dialog.remove();
        });

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
            dialog.close();
            dialog.remove();
        }
    });

    dialog.addEventListener("close", () => dialog.remove());
}

document.querySelector(".gallery")
    .addEventListener("click", viewHandler);

// ESC key closes modal automatically