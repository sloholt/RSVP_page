const form = document.getElementById("rsvpForm");
const formCard = document.getElementById("formCard");

const formMessage = document.getElementById("formMessage");
const successScreen = document.getElementById("successScreen");
const successMessage = document.getElementById("successMessage");
const detailsToggle = document.getElementById("detailsToggle");
const eventDetails = document.getElementById("eventDetails");

const attendingSelect = document.getElementById("attendingSelect");
const guestSection = document.getElementById("guestSection");
const guestSelect = document.getElementById("guestSelect");
const guestNameField = document.getElementById("guestNameField");
const questionsSection = document.getElementById("questionsSection");
const declineMessage = document.getElementById("declineMessage");

const guestNameInput = guestNameField.querySelector("input");
const questionsInput = questionsSection.querySelector("textarea");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw6UQgx6U_3A4Fd1NWFVkMYNbN0_mJPDl5JtJb4TL4pUbkzI2jXd-5U6L6ppaH8fEq_/exec";

/* ATTENDING LOGIC */
attendingSelect.addEventListener("change", () => {
  const isAttending = attendingSelect.value === "Yes";
  const isNotAttending = attendingSelect.value === "No";

  guestSection.classList.toggle("hidden", !isAttending);
  questionsSection.classList.toggle("hidden", !isAttending);
  declineMessage.classList.toggle("hidden", isAttending);

  guestSelect.required = isAttending;

  if (!isAttending) {
    guestSelect.value = "";
    guestNameInput.value = "";
    guestNameInput.required = false;
    questionsInput.value = "";
    guestNameField.classList.add("hidden");
  }
});

/* GUEST LOGIC */
guestSelect.addEventListener("change", () => {
  const bringingGuest = guestSelect.value === "Yes";

  guestNameField.classList.toggle("hidden", !bringingGuest);
  guestNameInput.required = bringingGuest;

  if (!bringingGuest) {
    guestNameInput.value = "";
  }
});

/* SUBMIT */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  formMessage.textContent = "Submitting...";

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    attending: formData.get("attending"),
    guest: formData.get("guest") || "",
    guestName: formData.get("guestName") || "",
    questions: formData.get("questions") || ""
  };

  try {
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    formMessage.textContent = "";

    formCard.style.transition = "opacity 0.4s ease";
    formCard.style.opacity = "0";

    setTimeout(() => {
      formCard.style.display = "none";

      successScreen.style.display = "flex";
      successScreen.classList.remove("hidden");
    }, 400);

    form.reset();

  } catch (error) {
    formMessage.textContent = "Something went wrong. Try again.";
  }
});
/* DETAILS TOGGLE */
detailsToggle.addEventListener("click", () => {
  const isHidden = eventDetails.classList.contains("hidden");
  eventDetails.classList.toggle("hidden", !isHidden);
  detailsToggle.textContent = isHidden ? "Hide Event Details" : "🤠 View Event Details";
});