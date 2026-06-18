# Crossroot Multi-Page Website

A static, GitHub Pages-ready website for Crossroot.

## Included pages

- `index.html`
- `how-it-works.html`
- `about.html`
- `contact.html`
- `download.html`
- `login.html`
- `signup.html`
- `privacy.html`
- `terms.html`

## Structure

```text
crossroot-multipage/
├── index.html
├── about.html
├── how-it-works.html
├── contact.html
├── download.html
├── login.html
├── signup.html
├── privacy.html
├── terms.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── auth.js
└── assets/
    ├── icons/
    │   └── logo.svg
    └── images/
```

## Run it

Open `index.html` directly, or use VS Code Live Server.

## Publish on GitHub Pages

1. Create a GitHub repository.
2. Upload every file and folder from this project.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Choose your main branch and `/root`.
6. Save.

## Important backend note

The contact, login, signup, and Google buttons are visual demos. They do not store or send information. Connect them to a real backend later.

Never place private service-role keys, database passwords, OAuth client secrets, or `.env` files in a public GitHub repository.
