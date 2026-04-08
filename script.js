const zipForm = document.getElementById("zip-form");
const zipInput = document.getElementById("zip-input");
const leadForm = document.getElementById("lead-capture-form");
const leadStatus = document.getElementById("lead-form-status");
const stickyBar = document.getElementById("mobile-sticky-bar");

if (zipForm && zipInput) {
  zipForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const zip = zipInput.value.trim();

    if (!/^\d{5}$/.test(zip)) {
      window.alert("Please enter a valid 5-digit zip code.");
      zipInput.focus();
      return;
    }

    window.open(`https://rent.bigbox.com/?zip=${zip}`, "_blank", "noopener");
    zipInput.value = "";
  });
}

if (leadForm && leadStatus) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const honey = document.getElementById("lead-honey");
    const name = document.getElementById("lead-name");
    const email = document.getElementById("lead-email");

    if (honey && honey.value.trim()) {
      leadStatus.textContent = "";
      return;
    }

    if (!name || !name.value.trim()) {
      leadStatus.textContent = "Please enter your name.";
      name?.focus();
      return;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      leadStatus.textContent = "Please enter a valid email address.";
      email?.focus();
      return;
    }

    leadStatus.textContent = "Thanks! This demo form is ready for CRM or API wiring.";
    leadForm.reset();
  });
}

if (stickyBar) {
  const toggleStickyBar = () => {
    if (window.innerWidth > 780) {
      stickyBar.classList.remove("is-visible");
      stickyBar.setAttribute("aria-hidden", "true");
      return;
    }

    const shouldShow = window.scrollY > window.innerHeight * 0.5;
    stickyBar.classList.toggle("is-visible", shouldShow);
    stickyBar.setAttribute("aria-hidden", shouldShow ? "false" : "true");
  };

  window.addEventListener("scroll", toggleStickyBar, { passive: true });
  window.addEventListener("resize", toggleStickyBar);
  toggleStickyBar();
}
