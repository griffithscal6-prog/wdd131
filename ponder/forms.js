const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

function updateNotesField() {
  const value = travelRange.value;

  // Show the travel notes on the form if they are choosing many campuses
  if (value === "many") {
    notesContainer.hidden = false;
    notes.required = true;
  } else {
    notesContainer.hidden = true;
    notes.required = false;
    notes.value = "";
  }
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();

// Ensure they choose a date later than the current date
function isPastDate(value) {
  const today = new Date();
  const chosen = new Date(value);

  today.setHours(0, 0, 0, 0);
  chosen.setHours(0, 0, 0, 0);

  return chosen < today;
}

function getSelectedCampuses() {
  //.from converts a NodeList into a real array, so then you can use .filter and .map
  return Array.from(campusBoxes)
    .filter(box => box.checked)
    .map(box => box.value);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();

  // Let the user know to select at least one campus
  if (selectedCampuses.length === 0) {
    output.textContent = "Please select at least one campus.";
    return;
  }

  // Let the user know if they choose many campuses but didn't put a note
  if (type === "many" && note === "") {
    output.textContent = "Please enter travel notes.";
    return;
  }

  // Let the user know if they choose many campuses but only selected one campus
  if (type === "many" && selectedCampuses.length < 2) {
    output.textContent = "Please select at least two campuses.";
    return;
  }

  if (isPastDate(availableDate)) {
    output.textContent = "Please choose a later date.";
    return;
  }

  output.innerHTML = `
    <h2>Preference Submitted</h2>
    <p>${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Availability: ${availableDate}</p>
    <p>Campuses: ${selectedCampuses.join(", ")}</p>
    <p>Preference Level: ${type}</p>
    ${note ? `<p>Travel Notes: ${note}</p>` : ""}
  `;

  form.reset();
  updateNotesField();
});