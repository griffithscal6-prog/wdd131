const selectElem = document.getElementById("webdevlist");
const headings = document.querySelectorAll("#topics h2");
const subtitle = document.querySelector(".subtitle");
const image = document.getElementById("mainImage");
const container = document.getElementById("container");
const resetBtn = document.getElementById("resetBtn");

// store original values
const originalSubtitle = subtitle.textContent;
const originalImage = image.getAttribute("src");

// 🔄 RESET FUNCTION
function resetPage() {
    headings.forEach(h => {
        h.style.color = "black";
        h.style.fontSize = "1.6em";
    });

    subtitle.textContent = originalSubtitle;
    image.setAttribute("src", originalImage);
    container.style.backgroundColor = "#f9f9f9";

    resetBtn.style.display = "none";
    selectElem.value = "default";
}

// 🎯 DROPDOWN EVENT
selectElem.addEventListener("change", function () {

    let value = selectElem.value;

    // Reset first
    resetPage();

    // Apply changes
    if (value === "html") {
        headings[0].style.color = "red";
        headings[0].style.fontSize = "2.2em";
        subtitle.textContent = "HTML structures the content of the web.";
        image.setAttribute("src", "images/logo.png");
    }

    else if (value === "css") {
        headings[1].style.color = "blue";
        subtitle.textContent = "CSS controls the design and layout.";
        container.style.backgroundColor = "#e8f4ff";
        image.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg");
    }

    else if (value === "js") {
        headings[2].style.color = "gold";
        subtitle.textContent = "JavaScript makes pages interactive.";
        image.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png");

        // Show reset button
        resetBtn.style.display = "inline-block";
    }
});

// 🔘 BUTTON CLICK
resetBtn.addEventListener("click", resetPage);