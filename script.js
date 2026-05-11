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
    ingredients: "leafy greens and herbs",
    note: "Use tender leaves first. Keep a clear discard rule for wilted or unsafe produce."
  },
  fruit: {
    ingredients: "ripe fruit",
    note: "Sort ripe fruit today, wash only what will be used, and keep bruised fruit separate."
  },
  fish: {
    ingredients: "fresh fish or seafood",
    note: "This needs a strict cold-chain check, clear timing and food-safe handling."
  },
  pantry: {
    ingredients: "pantry staples",
    note: "Check best-before dates, packaging condition and allergen labels before sharing."
  }
};

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

if (plannerForm && plannerOutput) {
  const updatePlanner = () => {
    const formData = new FormData(plannerForm);
    const surplus = formData.get("surplus") || "leafy";
    const timing = formData.get("timing") || "flexible";
    const mood = formData.get("mood") || "warm";
    const data = plannerData[surplus];
    const timingText = {
      flexible: "flexible through the day",
      breakfast: "breakfast",
      brunch: "brunch",
      lunch: "lunch",
      afternoon: "afternoon or after-school",
      evening: "evening",
      late: "late or shift-worker friendly"
    }[timing] || "flexible through the day";
    const moodText = {
      warm: "warm, simple and family-friendly",
      quick: "quick, practical and low-mess",
      youth: "colourful, social and easy to film",
      elder: "slow, respectful and story-led"
    }[mood];
    const prompt = `I have ${data.ingredients}, plus this pantry/freezer/garden list: [add list]. We are planning a ${timingText} shared table for [number] people while fuel and freight pressure are making food more expensive. Make it ${moodText}. Suggest a simple meal plan using mostly what we have, a short essential shopping gap list, a prep/preserving roster, allergy questions, food safety checks, storage notes, and what to do with leftovers. Keep the tone practical, calm and non-judgemental.`;

    plannerOutput.innerHTML = `
      <h3>Starter prompt</h3>
      <p>${escapeHtml(data.note)}</p>
      <pre class="generated-prompt" data-copy-source>${escapeHtml(prompt)}</pre>
      <button class="copy-button" type="button" data-copy-output>Copy prompt</button>
    `;
  };

  plannerForm.addEventListener("change", updatePlanner);
  updatePlanner();
}

const gardenForm = document.querySelector("[data-garden-planner]");
const gardenOutput = document.querySelector("[data-garden-output]");

const gardenSpaces = {
  backyard: "a backyard or side yard",
  balcony: "a balcony, deck or rental-friendly pot setup",
  school: "a school, club or community garden plot",
  indoor: "an indoor shelf, bench or microgreens setup"
};

const gardenFocuses = {
  quick: "quick herbs and leafy greens for everyday meals",
  staple: "filling staple crops that suit the space and season",
  preserve: "crops that can be frozen, dried, pickled, cooked down or shared before spoilage",
  native: "native or local food plants only where permission, knowledge and safety are clear"
};

const gardenMaintenance = {
  low: "low-maintenance care that can survive busy weeks",
  shared: "a shared roster with small jobs for several people",
  learning: "a learning project for kids, elders and new growers",
  intensive: "a higher-yield setup without pretending everyone has unlimited time"
};

if (gardenForm && gardenOutput) {
  const updateGarden = () => {
    const formData = new FormData(gardenForm);
    const space = formData.get("space") || "backyard";
    const focus = formData.get("focus") || "quick";
    const maintenance = formData.get("maintenance") || "low";
    const prompt = `We have ${gardenSpaces[space]}, and we want to grow ${gardenFocuses[focus]}. Design a practical Garden Mate plan for Straddie / coastal south-east Queensland conditions. Assume ${gardenMaintenance[maintenance]}. Include what to grow first, setup steps, watering and shade notes, weekly jobs, likely harvest timing, pest and heat risks, what to do if the plan starts failing, and how to post surplus to a private Shared Table board without exposing private addresses or cultural knowledge. Keep it grounded and low-waste.`;

    gardenOutput.innerHTML = `
      <h3>Garden Mate starter prompt</h3>
      <p>Use this as a first pass, then adjust it with local observation and real grower knowledge.</p>
      <pre class="generated-prompt" data-copy-source>${escapeHtml(prompt)}</pre>
      <button class="copy-button" type="button" data-copy-output>Copy prompt</button>
    `;
  };

  gardenForm.addEventListener("change", updateGarden);
  updateGarden();
}

const boardBuilder = document.querySelector("[data-board-builder]");
const boardOutput = document.querySelector("[data-board-output]");

const boardTypes = {
  produce: "We have [produce / pantry / freezer item] available. Who can use it, add to it, preserve it, or help turn it into a simple shared meal?",
  meal: "We are planning a small shared meal from what the group already has. Reply with what you can bring, what timing suits, and any allergy or storage notes.",
  roster: "We need a few small jobs covered: pickup, prep, cooking, containers, delivery, cleanup and leftovers. Pick one job that fits your day.",
  preserve: "We have surplus [produce / cooked food / pantry item] that needs action. Who can help freeze, dry, preserve, cook, share, label containers, or compost what cannot be used?",
  care: "Quiet care check-in: is anyone short on meals this week, overloaded, or needing a no-fuss drop-off? Reply privately if that feels easier."
};

const timingLines = {
  flexible: "Timing is flexible through the day. Morning, brunch, afternoon, evening and late pickup are all valid.",
  morning: "Morning prep or breakfast timing preferred, but say if another time works better.",
  brunch: "Brunch timing is welcome. Think late morning, easy prep, and food that can stretch into lunch if needed.",
  midday: "Midday meal timing is the starting point, with room for earlier prep or later pickup.",
  afternoon: "After-school or afternoon timing is the starting point. Keep jobs small and realistic.",
  evening: "Evening cook-up timing is the starting point. Late pickup can be arranged inside the trusted group.",
  shift: "Shift-worker friendly timing is welcome. Early pickup, late pickup or split prep can all count."
};

const toneLines = {
  neighbour: "Keep it neighbourly, relaxed and clear.",
  club: "Keep it organised, practical and easy for a club kitchen to follow.",
  care: "Keep it gentle, private and low-pressure.",
  youth: "Keep it direct, friendly and easy for younger helpers to act on."
};

if (boardBuilder && boardOutput) {
  const updateBoard = () => {
    const formData = new FormData(boardBuilder);
    const type = formData.get("type") || "produce";
    const timing = formData.get("timing") || "flexible";
    const tone = formData.get("tone") || "neighbour";
    const message = `${boardTypes[type]}\n\n${timingLines[timing]}\n\n${toneLines[tone]}\n\nPlease include: what you are offering or need, when it expires, allergy or storage notes, who is responsible, and whether any part must stay private.`;

    boardOutput.innerHTML = `
      <h3>Private board draft</h3>
      <pre class="generated-prompt" data-copy-source>${escapeHtml(message)}</pre>
      <button class="copy-button" type="button" data-copy-output>Copy message</button>
    `;
  };

  boardBuilder.addEventListener("change", updateBoard);
  updateBoard();
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

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-prompt], [data-copy-output]");
  if (!button) return;

  const promptText = button.closest(".prompt-card")?.querySelector("p")?.textContent
    || button.closest(".output-card")?.querySelector("[data-copy-source]")?.textContent;

  if (!promptText) return;

  try {
    await navigator.clipboard.writeText(promptText.trim());
    const originalText = button.textContent;
    button.textContent = "Copied";
    button.classList.add("is-copied");
    window.setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("is-copied");
    }, 1400);
  } catch (error) {
    button.textContent = "Select text";
  }
});
