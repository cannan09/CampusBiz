# CampusBiz

Modern, mobile-first CampusBiz website starter for GitHub Pages and VS Code.

## Files

- `index.html` — website structure
- `styles.css` — design and responsive styling
- `app.js` — services, cart, promo code, and project form
- `README.md` — setup instructions

## Run locally

Open the `CampusBiz-GitHub` folder in VS Code and open `index.html`.

You can also use VS Code Live Server.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md`.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the branch containing your files (usually `main`) and the `/root` folder.
6. Click **Save**.
7. GitHub will give you your live website URL.

## Important

This is a static website, so it works on GitHub Pages without Node.js or a server.

The cart and submitted project request are saved in the visitor's browser with `localStorage`. They are **not sent to you**.

When you are ready for real customer submissions and payments:
- Connect the project form to a backend/serverless function or form service.
- Keep API keys out of `app.js`.
- Connect Stripe through a secure backend/payment flow.
- Enforce promo-code/customer limits server-side.
