const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const topButton = document.querySelector("[data-to-top]");

if (topButton) {
  window.addEventListener("scroll", () => {
    topButton.classList.toggle("is-visible", window.scrollY > 520);
  });

  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const plannerForm = document.querySelector("[data-kitchen-planner]");
const plannerOutput = document.querySelector("[data-kitchen-output]");

const plannerData = {
  leafy: {
    meal: "Shared greens bowl with herbs, citrus dressing and toasted seed crunch.",
    urgency: "Use tender leaves first. Keep a clear discard rule for wilted or unsafe produce.",
    action: "Ask the noticeboard for grains, eggs or legumes to turn greens into a filling meal."
  },
  fruit: {
    meal: "Island fruit platter, chilled compote or low-waste preserve session.",
    urgency: "Sort ripe fruit today, wash only what will be used, and keep bruised fruit separate.",
    action: "Invite a small jam, chutney or dessert crew before the surplus drops in quality."
  },
  fish: {
    meal: "Simple BBQ fish with garden herbs, salad and labelled allergen notes.",
    urgency: "This needs a strict cold-chain check, clear timing and food-safe handling.",
    action: "Only publish a fish call-out when storage, prep space and responsible cooks are confirmed."
  },
  pantry: {
    meal: "Soup, dhal, fried rice or tray bake built from pantry staples and fresh add-ins.",
    urgency: "Check best-before dates, packaging condition and allergen labels before sharing.",
    action: "Pair shelf-stable food with fresh surplus so the table feels generous, not leftover-driven."
  }
};

if (plannerForm && plannerOutput) {
  const updatePlanner = () => {
    const formData = new FormData(plannerForm);
    const surplus = formData.get("surplus") || "leafy";
    const mood = formData.get("mood") || "warm";
    const contribution = formData.get("contribution") || "prep";
    const data = plannerData[surplus];
    const moodText = {
      warm: "warm, simple and family-friendly",
      quick: "quick, practical and low-mess",
      youth: "colourful, social and easy to film",
      elder: "slow, respectful and story-led"
    }[mood];
    const contributionText = {
      prep: "prep and cleanup",
      grow: "growing or harvesting",
      teach: "teaching, story or skill sharing",
      transport: "pickup, delivery or setup"
    }[contribution];

    plannerOutput.innerHTML = `
      <h3>${data.meal}</h3>
      <p>This version should feel ${moodText}.</p>
      <ul>
        <li><strong>Safety gate:</strong> ${data.urgency}</li>
        <li><strong>Noticeboard call-out:</strong> ${data.action}</li>
        <li><strong>Contribution record:</strong> Log ${contributionText} as a plain community contribution, not a financial promise.</li>
      </ul>
    `;
  };

  plannerForm.addEventListener("change", updatePlanner);
  updatePlanner();
}

const noticeButtons = document.querySelectorAll("[data-notice-choice]");
const noticePreview = document.querySelector("[data-notice-preview]");

const noticeTemplates = {
  surplus: `---
title: Surplus produce call-out
status: draft
visibility: public
expires: add date before publishing
privacy_check: no private addresses or phone numbers
---

The Shared Table is checking what surplus produce is available this week.
Share only food that is safe, labelled and ready for review by the table crew.`,
  volunteer: `---
title: Shared Table volunteer shift
status: draft
visibility: public
expires: add date before publishing
privacy_check: roster privately, publish only the public call-out
---

We need a small crew for setup, washing, serving and pack-down.
New helpers are welcome. A local guide can help with the first shift.`,
  safety: `---
title: Food safety gate update
status: draft
visibility: public
expires: add date before publishing
privacy_check: do not name donors without consent
---

This week's table only uses ingredients that pass the basic safety gate.
Foraged or unusual foods stay out until the correct checks and permissions are complete.`
};

if (noticeButtons.length && noticePreview) {
  const setNotice = (type) => {
    noticePreview.textContent = noticeTemplates[type];
    noticeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.noticeChoice === type));
    });
  };

  noticeButtons.forEach((button) => {
    button.addEventListener("click", () => setNotice(button.dataset.noticeChoice));
  });

  setNotice("surplus");
}
