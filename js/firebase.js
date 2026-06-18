import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXHrcxMdSjUkJK46bF2pmbTeB6_gf1GMc",
  authDomain: "project-crossroot.firebaseapp.com",
  projectId: "project-crossroot",
  storageBucket: "project-crossroot.firebasestorage.app",
  messagingSenderId: "282322984542",
  appId: "1:282322984542:web:bebaaec5a263a31f881ecf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Keep users signed in between page loads and browser restarts.
await setPersistence(auth, browserLocalPersistence);

export { app, auth, db };
