# NordDog Canine Academy

A Next.js (App Router) application for Scandinavian-inspired, force-free dog training.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`
3. Open http://localhost:3000

## Scripts

- `npm run dev` — start the Next.js dev server on port 3000
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — type-check with `tsc`

## Structure

- `src/app/layout.tsx` — root layout + metadata
- `src/app/page.tsx` — client entry that mounts the app and bootstraps i18n
- `src/app/globals.css` — Tailwind v4 styles and theme
- `src/App.tsx` — top-level app shell with state-based page navigation
- `src/components/` — navigation and page components
