const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const authModal = document.querySelector("#auth-modal");
const modalClose = document.querySelector("#modal-close");
const authForm = document.querySelector("#auth-form");
const authTitle = document.querySelector("#auth-title");
const authSubtitle = document.querySelector("#auth-subtitle");
const authSwitchText = document.querySelector("#auth-switch-text");
const authSwitchButton = document.querySelector("#auth-switch-button");
const formMessage = document.querySelector("#form-message");
const typedSearch = document.querySelector("#typed-search");

let authMode = "signup";

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
});

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function setAuthMode(mode) {
  authMode = mode;
  formMessage.textContent = "";

  const isLogin = mode === "login";
  authTitle.textContent = isLogin ? "Welcome back" : "Join Crossroot";
  authSubtitle.textContent = isLogin
    ? "Log in to manage your Crossroot account."
    : "Create an account to join the private beta.";

  authSwitchText.textContent = isLogin
    ? "New to Crossroot?"
    : "Already have an account?";

  authSwitchButton.textContent = isLogin ? "Create an account" : "Log in";
}

function openAuthModal(mode = "signup") {
  setAuthMode(mode);
  authModal.classList.add("open");
  authModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  window.setTimeout(() => {
    document.querySelector("#email").focus();
  }, 150);
}

function closeAuthModal() {
  authModal.classList.remove("open");
  authModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-open-auth]").forEach((button) => {
  button.addEventListener("click", () => {
    openAuthModal(button.dataset.openAuth);
  });
});

modalClose.addEventListener("click", closeAuthModal);

authModal.addEventListener("click", (event) => {
  if (event.target === authModal) {
    closeAuthModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && authModal.classList.contains("open")) {
    closeAuthModal();
  }
});

authSwitchButton.addEventListener("click", () => {
  setAuthMode(authMode === "login" ? "signup" : "login");
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  if (!email || password.length < 8) {
    formMessage.textContent = "Enter a valid email and an 8-character password.";
    return;
  }

  // Replace this demo behavior with a real request to your auth backend.
  // Example:
  // await fetch("/api/auth/signup", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password })
  // });

  formMessage.textContent =
    authMode === "login"
      ? "Demo login complete. Connect this form to your backend next."
      : "You are on the demo beta list. Backend connection comes next.";

  authForm.reset();
});

document.querySelectorAll(".source-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".source-chip").forEach((item) => {
      item.classList.remove("active");
    });

    chip.classList.add("active");
    const source = chip.dataset.source;

    document.querySelectorAll(".result-row").forEach((row) => {
      const matches =
        source === "all" || row.dataset.resultSource === source;

      row.classList.toggle("hidden", !matches);
    });
  });
});

const searchExamples = [
  "that photo of the cat in 2019",
  "carnival submissions",
  "science fair notes",
  "project atlas"
];

let exampleIndex = 0;
let characterIndex = 0;
let deleting = false;

function animateSearchText() {
  const current = searchExamples[exampleIndex];

  if (!deleting) {
    characterIndex += 1;
    typedSearch.textContent = current.slice(0, characterIndex);

    if (characterIndex === current.length) {
      deleting = true;
      window.setTimeout(animateSearchText, 1800);
      return;
    }
  } else {
    characterIndex -= 1;
    typedSearch.textContent = current.slice(0, characterIndex);

    if (characterIndex === 0) {
      deleting = false;
      exampleIndex = (exampleIndex + 1) % searchExamples.length;
    }
  }

  window.setTimeout(animateSearchText, deleting ? 28 : 52);
}

animateSearchText();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelector("#year").textContent = new Date().getFullYear();
