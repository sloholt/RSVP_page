const form = document.getElementById("rsvpForm");
const formCard = document.getElementById("formCard");

const formMessage = document.getElementById("formMessage");
const successMessage = document.getElementById("successMessage");

const attendingSelect = document.getElementById("attendingSelect");
const guestSection = document.getElementById("guestSection");
const guestSelect = document.getElementById("guestSelect");
const guestNameField = document.getElementById("guestNameField");
const questionsSection = document.getElementById("questionsSection");
const declineMessage = document.getElementById("declineMessage");

const guestNameInput = guestNameField.querySelector("input");
const questionsInput = questionsSection.querySelector("textarea");

const WEB_APP_URL = "YOUR_URL_HERE";

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

  // 🔥 SHOW SUBMITTING
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

    // 🔥 REMOVE "Submitting..."
    formMessage.textContent = "";

    // 🔥 FADE OUT CARD
    formCard.style.transition = "opacity 0.4s ease";
    formCard.style.opacity = "0";

    setTimeout(() => {
      formCard.style.display = "none";

      // 🔥 SHOW FINAL MESSAGE
      successMessage.textContent = "Yeehaw 🤠 Your RSVP has been submitted!";
      successMessage.classList.add("center-message");
    }, 400);

    form.reset();

  } catch (error) {
    formMessage.textContent = "Something went wrong. Try again.";
  }
});