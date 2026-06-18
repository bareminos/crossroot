# Crossroot Firebase Setup Guide

Follow these steps in order. You do not need to invent anything.

## Part 1 — Enable login methods

1. Open the Firebase Console.
2. Click your project: **project-crossroot**.
3. In the left menu, open **Build → Authentication**.
4. Click **Get started** if Firebase asks.
5. Open the **Sign-in method** tab.
6. Click **Email/Password**.
7. Turn on **Email/Password**.
8. Click **Save**.
9. Click **Google**.
10. Turn on Google.
11. Choose your support email.
12. Click **Save**.

Do not enable Email link unless you specifically want passwordless login.

## Part 2 — Create Firestore

1. In the Firebase Console, open **Build → Firestore Database**.
2. Click **Create database**.
3. Select **Start in production mode**.
4. Choose a database location near your users.
5. Click **Enable**.

You do not need to manually create collections. The website creates them when people sign up, send messages, or add devices.

## Part 3 — Install the security rules

1. Open **Build → Firestore Database**.
2. Open the **Rules** tab.
3. Delete the rules currently shown there.
4. Open the file named `firestore.rules` from this website folder.
5. Copy everything from that file.
6. Paste it into the Firebase Rules editor.
7. Click **Publish**.

Do not leave Firestore in test mode. Test mode can expose your database.

## Part 4 — Add authorized domains

Firebase Authentication only works on allowed website domains.

1. Open **Build → Authentication**.
2. Open **Settings**.
3. Find **Authorized domains**.
4. Make sure these are present:
   - `localhost`
   - `project-crossroot.firebaseapp.com`
   - `project-crossroot.web.app`
5. If you use GitHub Pages, add:
   - `YOUR-GITHUB-USERNAME.github.io`
6. If you buy a custom domain later, add that domain too.

Enter only the domain. Do not include `https://` or a page path.

## Part 5 — Test the site properly

Do not double-click `index.html` and run it as a `file:///` page. Firebase modules need a real web server.

Easy option in VS Code:

1. Install the **Live Server** extension.
2. Open this website folder in VS Code.
3. Right-click `index.html`.
4. Click **Open with Live Server**.
5. Your browser should open a local address similar to:
   `http://127.0.0.1:5500`

Then test:

1. Open `signup.html`.
2. Create an account.
3. You should be sent to `dashboard.html`.
4. In Firebase Console, open **Authentication → Users**.
5. Your account should appear.
6. Open **Firestore Database → Data**.
7. A `users` collection should appear.
8. In the dashboard, add a test device.
9. A `devices` subcollection should appear under your user.
10. Submit the contact form.
11. A `contactMessages` collection should appear.

## Part 6 — Upload to GitHub Pages

1. Put every file and folder in your GitHub repository.
2. Open the repository's **Settings**.
3. Open **Pages**.
4. Under source, choose **Deploy from a branch**.
5. Select your main branch and `/root`.
6. Save.
7. Wait for GitHub to show the public website address.
8. Add `YOUR-GITHUB-USERNAME.github.io` to Firebase Authorized domains.

## Part 7 — Firebase Hosting instead of GitHub Pages

Firebase Hosting is optional. GitHub can still store the source code.

Install Node.js first, then open a terminal in this project folder:

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

The included `.firebaserc` and `firebase.json` already point to `project-crossroot`.

## What is already connected

- Email/password signup
- Email/password login
- Google sign-in
- Password reset email
- Email verification
- Firestore user profiles
- Protected dashboard
- Logout
- Profile name editing
- Test device creation and deletion
- Contact-form submissions
- Navigation that changes when logged in

## Important security information

The Firebase web configuration and Firebase API key are allowed to be in browser code. They identify your Firebase project; they do not grant database access by themselves.

Your real protection comes from:

- Firebase Authentication
- Firestore Security Rules
- Authorized domains
- Firebase App Check, which should be enabled before a large public launch

Never upload a Firebase Admin SDK service-account JSON file to GitHub. Never put private server credentials into browser JavaScript.
