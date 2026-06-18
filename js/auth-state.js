import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  document.documentElement.classList.add("auth-ready");

  document.querySelectorAll("[data-auth-only]").forEach((element) => {
    element.hidden = !user;
  });

  document.querySelectorAll("[data-guest-only]").forEach((element) => {
    element.hidden = Boolean(user);
  });

  document.querySelectorAll("[data-user-name]").forEach((element) => {
    element.textContent =
      user?.displayName ||
      user?.email?.split("@")[0] ||
      "Account";
  });

  document.querySelectorAll("[data-user-email]").forEach((element) => {
    element.textContent = user?.email || "";
  });
});
