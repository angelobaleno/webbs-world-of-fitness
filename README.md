# Webb's World of Fitness

Marketing site for Webb's World of Fitness (Pittsburgh). Built with Astro.

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # static output → dist/
npm run preview  # preview the built site
```

## Editing content
All real facts (hours, contact, address, owners, plans) live in `src/data/site.ts`.
Edit there — every section reads from it.

## Photos
Real gym photos live in `public/images/`. Swap a file (same name) to update an image.

## Pricing
Membership prices in `src/data/site.ts` are **placeholders** — confirm real rates with
the gym before publishing.

## Deploy
**Live:** https://angelobaleno.github.io/webbs-world-of-fitness/

Auto-deploys to GitHub Pages on every push to `main` via
`.github/workflows/deploy.yml` (builds with Astro, publishes `dist/`). No manual step.

The site is served under the `/webbs-world-of-fitness` base path (set in
`astro.config.mjs`). If Webb's ever adopts this on their own domain, set `site` to that
domain and remove `base`, then the image paths resolve at the root automatically.
