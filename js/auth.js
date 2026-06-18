
document.querySelectorAll("[data-auth-form]").forEach(form => {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const email = form.querySelector('input[type="email"]')?.value.trim();
    const password = form.querySelector('input[type="password"]')?.value || "";

    if (!email || password.length < 8) {
      status.textContent = "Use a valid email and a password with at least 8 characters.";
      return;
    }

    // Replace this section with Supabase Auth or your own secure backend.
    status.textContent = form.dataset.authForm === "login"
      ? "Demo login complete. Real authentication will be connected next."
      : "Account demo complete. Real authentication will be connected next.";

    form.reset();
  });
});
