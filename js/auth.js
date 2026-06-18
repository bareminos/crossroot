import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

function friendlyError(error) {
  const messages = {
    "auth/email-already-in-use": "That email already has an account. Try logging in.",
    "auth/invalid-email": "That email address does not look valid.",
    "auth/weak-password": "Use a stronger password with at least 8 characters.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/popup-closed-by-user": "The Google sign-in window was closed.",
    "auth/popup-blocked": "Your browser blocked the Google sign-in window. Allow popups and try again.",
    "auth/network-request-failed": "Network error. Check your internet connection and try again.",
    "auth/too-many-requests": "Too many attempts. Wait a little while and try again."
  };

  return messages[error.code] || error.message || "Something went wrong. Please try again.";
}

async function saveUserProfile(user, displayName = "") {
  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      displayName: displayName || user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      betaStatus: "pending",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    },
    { merge: true }
  );
}

document.querySelectorAll("[data-auth-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const mode = form.dataset.authForm;
    const status = form.querySelector(".form-status");
    const submitButton = form.querySelector('button[type="submit"]');
    const email = form.querySelector('input[type="email"]')?.value.trim() || "";
    const password = form.querySelector('input[type="password"]')?.value || "";
    const name = form.querySelector("#name")?.value.trim() || "";

    if (!email || password.length < 8) {
      status.textContent = "Enter a valid email and a password with at least 8 characters.";
      status.dataset.state = "error";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = mode === "signup" ? "Creating account…" : "Logging in…";
    status.textContent = "";
    status.dataset.state = "";

    try {
      if (mode === "signup") {
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        if (name) {
          await updateProfile(credential.user, { displayName: name });
        }

        await saveUserProfile(credential.user, name);
        await sendEmailVerification(credential.user);

        window.location.href = "dashboard.html?welcome=1";
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "dashboard.html";
      }
    } catch (error) {
      console.error(error);
      status.textContent = friendlyError(error);
      status.dataset.state = "error";
      submitButton.disabled = false;
      submitButton.textContent = mode === "signup" ? "Create account" : "Log in";
    }
  });
});

document.querySelectorAll("[data-google-auth]").forEach((button) => {
  button.addEventListener("click", async () => {
    const status = document.querySelector(".form-status");
    button.disabled = true;
    button.textContent = "Opening Google…";

    try {
      const credential = await signInWithPopup(auth, googleProvider);
      await saveUserProfile(credential.user);
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error(error);
      if (status) {
        status.textContent = friendlyError(error);
        status.dataset.state = "error";
      }
      button.disabled = false;
      button.textContent = "Continue with Google";
    }
  });
});

const resetForm = document.querySelector("[data-reset-form]");
resetForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = resetForm.querySelector('input[type="email"]').value.trim();
  const button = resetForm.querySelector('button[type="submit"]');
  const status = resetForm.querySelector(".form-status");

  button.disabled = true;
  button.textContent = "Sending…";
  status.textContent = "";

  try {
    await sendPasswordResetEmail(auth, email);
    status.textContent = "Password reset email sent. Check your inbox and spam folder.";
    status.dataset.state = "success";
    resetForm.reset();
  } catch (error) {
    console.error(error);
    status.textContent = friendlyError(error);
    status.dataset.state = "error";
  } finally {
    button.disabled = false;
    button.textContent = "Send reset email";
  }
});
