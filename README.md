# Arwin Madeja — Portfolio

A single-page React portfolio built with Vite.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional, to preview the production build locally
```

## Deploy to Vercel

**Option A — Vercel dashboard (no CLI needed)**
1. Push this folder to a GitHub repo (or upload directly via the Vercel dashboard's "Import" flow if it supports folder upload).
2. Go to https://vercel.com/new and import the repo.
3. Vercel auto-detects Vite. Keep the defaults:
   - Build Command: `npm run build` (or `vite build`)
   - Output Directory: `dist`
4. Click **Deploy**.

**Option B — Vercel CLI**
```bash
npm install -g vercel
vercel        # follow the prompts (first deploy / preview)
vercel --prod # promote to production
```

No environment variables or extra config are required — it's a static Vite build.

## Project structure

```
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx        # React entry point
    └── Portfolio.jsx   # The portfolio page (all content, styles, and data live here)
```

All resume content, images (profile photo + certificates), and styling are self-contained in `src/Portfolio.jsx` — edit that file to update text, links, or swap images.
