# CampusBiz

Modern, mobile-first CampusBiz website starter for VS Code.

## Open it

1. Open the `CampusBiz` folder in VS Code.
2. Open `index.html`.
3. Run it with VS Code Live Server, or open the HTML file directly in a browser.

## Included

- Modern mobile-first landing page
- Responsive desktop layout
- Service packages
- Add-ons
- Working cart with localStorage
- Promo-code input
- Project-details form
- Temporary local project-request saving
- No Stripe checkout yet
- No student/non-student pricing split
- No Resend connection yet

## Important

The current pricing values are all centralized at the top of `app.js`.

When you are ready to connect the real business flow:
- Resend should be connected through a backend/serverless function so the API key is never exposed in browser code.
- Student verification and the first-10-customer limit should be enforced server-side.
- Stripe checkout can be added after the site and pricing are finalized.
