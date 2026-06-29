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
`npm run build` produces static files in `dist/`. Drag that folder to Netlify, or push
the repo and connect it to Netlify / GitHub Pages / Vercel (build command `npm run build`,
output dir `dist`).
