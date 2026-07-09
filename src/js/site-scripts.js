// Careful in template sync, should be site specific

window.addEventListener("load", function(){

  console.log(`[${window.siteData.project}] site-scripts.js loaded`);
  console.log(`[${window.siteData.project}] Using Template v${window.siteData.templateVersion}`);

  // Add a class to the body element to indicate that the page has loaded
  document.body.classList.add("loaded");

  // custom script here

  // ── Mobile nav toggle ─────────────────────────────────────────────────────
  // Matches the pattern used across Terrabyte projects (see terrabyte-website):
  // toggling .show on the trigger drives the nav's visibility via a CSS
  // sibling selector, so this stays this minimal on purpose.
  (function initNavToggle() {
    const navTrigger = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (!navTrigger) return;

    navTrigger.addEventListener("click", function () {
      this.classList.toggle("show");
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
    });

    // Close the menu on any nav link click — same-page anchor links (e.g.
    // "/#beta") don't trigger a full page navigation, so nothing else would
    // ever tell the menu to close.
    if (nav) {
      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navTrigger.classList.remove("show");
          navTrigger.setAttribute("aria-expanded", "false");
        });
      });
    }
  })();

  // ── Animated hero text ────────────────────────────────────────────────────
  // Cycles the "For every [action], you [contribution]." hero line through
  // window.canapiUseCases (see _data/useCases.json). Index 0 is already
  // rendered server-side, so this starts by holding it, then advances.
  (function initHeroTextCycle() {
    const useCases = window.canapiUseCases;
    const actionEl = document.querySelector("[data-anim-hero-action-text]");
    const contributionEl = document.querySelector("[data-anim-hero-contribution-text]");
    if (!useCases || useCases.length < 2 || !actionEl || !contributionEl) return;

    // Respect reduced-motion preferences — leave the server-rendered first
    // use case in place, no cycling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const HOLD_MS = 4000;
    const SWAP_MS = 350; // matches --ux-speed
    const STAGGER_MS = 1500; // delay before the contribution follows the action
    let index = 0;

    function swapText(el, text) {
      el.classList.add("is-swapping");
      setTimeout(() => {
        el.textContent = text;
        el.classList.remove("is-swapping");
      }, SWAP_MS);
    }

    setInterval(() => {
      index = (index + 1) % useCases.length;
      const { action, contribution } = useCases[index];
      swapText(actionEl, action);
      setTimeout(() => swapText(contributionEl, contribution), STAGGER_MS);
    }, HOLD_MS);
  })();

  // ── Beta signup form ──────────────────────────────────────────────────────
  // Posts directly to the submitBetaInterest Cloud Function in canapi-web-app
  // (no auth — there's no account yet at this stage). Firestore rules deny all
  // client reads/writes on betaSignups, so this endpoint is the only way in.
  (function initBetaSignupForm() {
    const form = document.querySelector("[data-beta-signup-form]");
    if (!form) return;

    const submitBtn = form.querySelector("[data-beta-signup-submit]");
    const statusEl = form.querySelector("[data-beta-signup-status]");
    const FUNCTION_URL = "https://us-central1-terrabyte-canapi.cloudfunctions.net/submitBetaInterest";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.elements.name.value;
      const email = form.elements.email.value;
      const website = form.elements.website.value; // honeypot
      const newsletterOptIn = form.elements.newsletterOptIn.checked;

      submitBtn.disabled = true;
      statusEl.textContent = "Submitting...";
      statusEl.className = "helper-message";

      try {
        const res = await fetch(FUNCTION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, website, newsletterOptIn }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);

        form.reset();
        statusEl.textContent = "Thanks! We'll be in touch when the beta opens up.";
        statusEl.className = "helper-message";
      } catch (err) {
        console.error("Beta signup failed:", err);
        statusEl.textContent = err.message || "Something went wrong. Please try again.";
        statusEl.className = "helper-message error-text";
      } finally {
        submitBtn.disabled = false;
      }
    });
  })();

}, false);