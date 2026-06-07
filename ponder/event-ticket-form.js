const form = document.getElementById("ticketForm");
const typeSelect = document.getElementById("type");
const extraFieldContainer = document.getElementById("extraFieldContainer");
const extraLabel = document.getElementById("extraLabel");
const extraInput = document.getElementById("extraInput");

const errorsDiv = document.getElementById("errors");
const ticketInfo = document.getElementById("ticketInfo");

// Show correct hidden field
typeSelect.addEventListener("change", function () {

    const type = typeSelect.value;

    if (type === "student") {
        extraFieldContainer.classList.remove("hidden");
        extraLabel.textContent = "Student I#";
        extraInput.value = "";
    }
    else if (type === "guest") {
        extraFieldContainer.classList.remove("hidden");
        extraLabel.textContent = "Access Code";
        extraInput.value = "";
    }
    else {
        extraFieldContainer.classList.add("hidden");
    }
});

// Form Submission
form.addEventListener("submit", function (event) {

    event.preventDefault();

    errorsDiv.innerHTML = "";
    ticketInfo.innerHTML = "";

    let errors = [];

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const eventDate = document.getElementById("eventDate").value;
    const type = typeSelect.value;
    const extraValue = extraInput.value.trim();

    // Name validation
    if (firstName === "") {
        errors.push("First name is required.");
    }

    if (lastName === "") {
        errors.push("Last name is required.");
    }

    // Email validation
    if (email === "") {
        errors.push("Email is required.");
    }

    // Type validation
    if (type === "") {
        errors.push("Please select Student or Guest.");
    }

    // Date validation
    if (eventDate === "") {
        errors.push("Please select an event date.");
    }
    else {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(eventDate);

        if (selectedDate <= today) {
            errors.push("Event date must be later than today.");
        }
    }

    // Student validation
    if (type === "student") {

        const studentRegex = /^\d{9}$/;

        if (!studentRegex.test(extraValue)) {
            errors.push("Student I# must contain exactly 9 digits.");
        }
    }

    // Guest validation
    if (type === "guest") {

        if (extraValue !== "EVENT131") {
            errors.push("Access Code must be EVENT131.");
        }
    }

    // Display errors
    if (errors.length > 0) {

        let output = "<h3>Please correct the following:</h3>";

        errors.forEach(function (error) {
            output += `<p class="error">${error}</p>`;
        });

        errorsDiv.innerHTML = output;
        return;
    }

    // Success message
    ticketInfo.innerHTML = `
        <h2 class="success">Ticket Created Successfully!</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Type:</strong> ${type}</p>

        <p><strong>Event Date:</strong> ${eventDate}</p>

        <p><strong>Ticket Number:</strong>
        EVT-${Math.floor(Math.random() * 100000)}</p>
    `;

    form.reset();
    extraFieldContainer.classList.add("hidden");
});