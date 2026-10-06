# ContactHub

ContactHub is a browser-based contact manager for creating, organizing, and maintaining a personal contact list. It presents contacts as responsive cards and keeps the list in the browser's `localStorage`, so no backend or account is required.

## What it supports

- Add contacts with a required name and Egyptian phone number.
- Optionally record an email address, address, group, and notes.
- Mark contacts as **favorites** or **emergency** contacts and view both lists separately.
- Search saved contacts by name, phone number, or email address.
- Edit or delete contacts, with a confirmation dialog before deletion.
- Use `tel:` and `mailto:` actions from contact cards when the corresponding data is available.
- Show contact totals, favorite totals, and emergency totals at a glance.

The form includes a photo-picker control, but the current JavaScript does not read or persist the selected image; contact avatars are generated from initials and a randomly selected gradient.

## Tech stack

- Vanilla HTML, CSS, and JavaScript
- [Bootstrap](https://getbootstrap.com/) CSS and bundled JavaScript, vendored in `css/` and `js/`
- Font Awesome assets vendored in `css/` and `webfonts/`
- Inter variable font vendored in `fonts/`
- [SweetAlert2](https://sweetalert2.github.io/) `11.26.25` loaded from jsDelivr for validation, success, and confirmation dialogs

There is no package manifest, build step, server-side code, or environment-variable configuration in this repository. Application data is stored locally under the `contactcontainer` key in the active browser profile. Clearing site data clears the saved contacts.

## Run locally

The project is a static site and can be opened from a local web server.

```bash
git clone --depth 1 https://github.com/zeyadhatem00/contacthub-crud.git
cd ContactHub-CRUD
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser. A current browser with JavaScript enabled is required. The SweetAlert2 stylesheet and script are fetched from jsDelivr, so the dialogs need network access unless those assets are made local.

There is no dependency installation command or build command to run. No automated test suite is included in the repository.

## Using the app

1. Select **Add Contact**.
2. Enter a name and an Egyptian phone number. The form validates the name and phone as you type; email validation accepts Gmail, Yahoo, and Outlook addresses.
3. Add any optional details, choose a group, and mark the contact as a favorite or emergency contact if needed.
4. Select **Save Contact**. The contact appears in the list and is persisted to browser storage.
5. Use the card actions to call, email, toggle favorite/emergency status, edit, or delete a contact.
6. Use the search field to filter the main list by name, phone, or email.

## Project structure

```text
.
├── index.html                 # Static page and contact form markup
├── js/
│   ├── main.js                # State, validation, rendering, search, and CRUD actions
│   └── bootstrap.bundle.min.js
├── css/
│   ├── style.css              # ContactHub styles and responsive layout
│   ├── media.css              # Small-screen and tablet adjustments
│   ├── bootstrap.min.css
│   └── all.min.css            # Font Awesome styles
├── fonts/                     # Inter variable font
├── webfonts/                  # Font Awesome webfonts
├── images/                    # Favicon and static avatar image
└── .github/workflows/
    └── static.yml             # GitHub Pages deployment workflow
```

## Deployment configuration

`.github/workflows/static.yml` is configured to deploy the repository as a GitHub Pages static site on pushes to `main` and through manual workflow dispatch. It uploads the repository root as the Pages artifact. This README does not claim a live URL because none is recorded in the repository metadata.

## Data and scope

ContactHub is client-side only: contacts remain in the browser that created them and are not synchronized between browsers or devices. The repository contains no API integration, authentication, database, or required environment variables. The notification and settings buttons in the header are presentational controls in the current HTML and are not wired to application behavior.
