import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const form = document.querySelector("[data-contact-form]");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const status = form.querySelector(".form-status");
  const button = form.querySelector('button[type="submit"]');

  const message = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    topic: form.topic.value,
    message: form.message.value.trim(),
    userId: auth.currentUser?.uid || null,
    createdAt: serverTimestamp()
  };

  if (message.name.length < 2 || message.message.length < 10) {
    status.textContent = "Please enter your name and a message of at least 10 characters.";
    status.dataset.state = "error";
    return;
  }

  button.disabled = true;
  button.textContent = "Sending…";
  status.textContent = "";

  try {
    await addDoc(collection(db, "contactMessages"), message);
    status.textContent = "Message sent. Thanks for contacting Crossroot.";
    status.dataset.state = "success";
    form.reset();
  } catch (error) {
    console.error(error);
    status.textContent = "The message could not be sent. Check Firestore and its security rules.";
    status.dataset.state = "error";
  } finally {
    button.disabled = false;
    button.textContent = "Send message";
  }
});
