
const page = document.body.dataset.page || "home";

function headerTemplate() {
  const links = [
    ["index.html", "Home", "home"],
    ["how-it-works.html", "How it works", "how"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"],
    ["download.html", "Download", "download"]
  ];

  const navLinks = links.map(([href, label, key]) =>
    `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`
  ).join("");

  return `
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="Crossroot home">
          <img src="assets/icons/logo.svg" alt="" />
          <span>Crossroot</span>
        </a>

        <nav class="nav-links" aria-label="Primary navigation">${navLinks}</nav>

        <div class="nav-actions">
          <a class="btn btn-ghost" href="login.html">Log in</a>
          <a class="btn btn-primary" href="signup.html">Join the beta</a>
        </div>

        <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false">
          <span></span><span></span>
        </button>

        <div class="mobile-panel">
          ${navLinks}
          <a class="btn btn-secondary" href="login.html">Log in</a>
          <a class="btn btn-primary" href="signup.html">Join the beta</a>
        </div>
      </div>
    </header>`;
}

function footerTemplate() {
  return `
    <footer class="site-footer">
      <div class="container footer-top">
        <div>
          <a class="brand" href="index.html">
            <img src="assets/icons/logo.svg" alt="" />
            <span>Crossroot</span>
          </a>
          <p>Search every file, wherever it lives.</p>
        </div>
        <div class="footer-links">
          <a href="how-it-works.html">How it works</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
          <a href="download.html">Download</a>
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© <span data-year></span> Crossroot</span>
        <span>Built for a less scattered internet.</span>
      </div>
    </footer>`;
}

document.querySelector("[data-header]")?.insertAdjacentHTML("afterbegin", headerTemplate());
document.querySelector("[data-footer]")?.insertAdjacentHTML("afterbegin", footerTemplate());

const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 10);
});

toggle?.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".mobile-panel a").forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(item => item.classList.remove("active"));
    chip.classList.add("active");
    const source = chip.dataset.source;
    document.querySelectorAll(".result").forEach(row => {
      row.classList.toggle("hidden", source !== "all" && row.dataset.source !== source);
    });
  });
});

const typed = document.querySelector("[data-typed-search]");
if (typed) {
  const examples = [
    "that photo of the cat in 2019",
    "carnival submissions",
    "science fair notes",
    "project atlas"
  ];
  let example = 0, char = 0, deleting = false;

  function tick() {
    const text = examples[example];
    char += deleting ? -1 : 1;
    typed.textContent = text.slice(0, char);

    if (!deleting && char === text.length) {
      deleting = true;
      setTimeout(tick, 1650);
      return;
    }
    if (deleting && char === 0) {
      deleting = false;
      example = (example + 1) % examples.length;
    }
    setTimeout(tick, deleting ? 28 : 50);
  }
  tick();
}

document.querySelectorAll("[data-demo-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "Thanks — this demo form is ready to connect to the backend.";
    form.reset();
  });
});
