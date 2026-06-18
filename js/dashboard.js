import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const loading = document.querySelector("[data-dashboard-loading]");
const content = document.querySelector("[data-dashboard-content]");
const status = document.querySelector("[data-dashboard-status]");

function showStatus(message, state = "success") {
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state;
}

async function ensureProfile(user) {
  const reference = doc(db, "users", user.uid);
  const snapshot = await getDoc(reference);

  if (!snapshot.exists()) {
    await setDoc(reference, {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      betaStatus: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }

  return (await getDoc(reference)).data();
}

async function loadDevices(user) {
  const list = document.querySelector("[data-device-list]");
  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "users", user.uid, "devices"));

  if (snapshot.empty) {
    list.innerHTML = '<div class="empty-state">No devices registered yet. The future desktop app will appear here.</div>';
    return;
  }

  snapshot.forEach((deviceDocument) => {
    const device = deviceDocument.data();
    const row = document.createElement("div");
    row.className = "device-row";
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(device.deviceName || "Unnamed device")}</strong>
        <span>${escapeHtml(device.platform || "Unknown platform")}</span>
      </div>
      <button class="btn btn-ghost btn-small" data-delete-device="${deviceDocument.id}">Remove</button>
    `;
    list.appendChild(row);
  });

  document.querySelectorAll("[data-delete-device]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteDoc(doc(db, "users", user.uid, "devices", button.dataset.deleteDevice));
      await loadDevices(user);
      showStatus("Device removed.");
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.replace("login.html?next=dashboard");
    return;
  }

  try {
    const profile = await ensureProfile(user);

    document.querySelectorAll("[data-dashboard-name]").forEach((element) => {
      element.textContent = profile.displayName || user.displayName || "Crossroot user";
    });
    document.querySelectorAll("[data-dashboard-email]").forEach((element) => {
      element.textContent = user.email || "";
    });

    const verification = document.querySelector("[data-verification]");
    verification.textContent = user.emailVerified ? "Verified" : "Not verified";
    verification.dataset.verified = String(user.emailVerified);

    const beta = document.querySelector("[data-beta-status]");
    beta.textContent = profile.betaStatus || "pending";

    document.querySelector("#display-name").value =
      profile.displayName || user.displayName || "";

    await loadDevices(user);

    loading.hidden = true;
    content.hidden = false;

    if (new URLSearchParams(window.location.search).has("welcome")) {
      showStatus("Your Crossroot account was created successfully.");
    }
  } catch (error) {
    console.error(error);
    showStatus("Dashboard data could not load. Check your Firestore setup and rules.", "error");
    loading.hidden = true;
    content.hidden = false;
  }
});

document.querySelector("[data-logout]")?.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

document.querySelector("[data-send-verification]")?.addEventListener("click", async () => {
  if (!auth.currentUser) return;

  try {
    await sendEmailVerification(auth.currentUser);
    showStatus("Verification email sent. Check your inbox and spam folder.");
  } catch (error) {
    console.error(error);
    showStatus("The verification email could not be sent yet. Try again later.", "error");
  }
});

document.querySelector("[data-profile-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const name = document.querySelector("#display-name").value.trim();
  const button = event.currentTarget.querySelector('button[type="submit"]');

  button.disabled = true;
  button.textContent = "Saving…";

  try {
    await updateProfile(user, { displayName: name });
    await setDoc(doc(db, "users", user.uid), {
      displayName: name,
      email: user.email || "",
      updatedAt: serverTimestamp()
    }, { merge: true });

    document.querySelectorAll("[data-dashboard-name]").forEach((element) => {
      element.textContent = name || "Crossroot user";
    });

    showStatus("Profile saved.");
  } catch (error) {
    console.error(error);
    showStatus("Profile could not be saved.", "error");
  } finally {
    button.disabled = false;
    button.textContent = "Save profile";
  }
});

document.querySelector("[data-device-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const deviceName = form.deviceName.value.trim();
  const platform = form.platform.value;

  if (deviceName.length < 2) {
    showStatus("Enter a device name.", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Adding…";

  try {
    await addDoc(collection(db, "users", user.uid, "devices"), {
      deviceName,
      platform,
      createdAt: serverTimestamp(),
      lastSeen: serverTimestamp()
    });
    form.reset();
    await loadDevices(user);
    showStatus("Test device added.");
  } catch (error) {
    console.error(error);
    showStatus("Device could not be added. Check your Firestore rules.", "error");
  } finally {
    button.disabled = false;
    button.textContent = "Add test device";
  }
});
