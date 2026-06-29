# Webb's World of Fitness — Website Redesign Design

**Date:** 2026-06-29
**Status:** Approved (design), pending spec review
**Type:** Real-business redesign (recognizably Webb's, all real facts, big creative swings on design)

## Goal

Redesign the website for Webb's World of Fitness — a real general fitness club in
Pittsburgh that leans toward bodybuilding — so it looks dramatically more modern and
premium than its current soft, generic template, while keeping every real fact intact.

The new site is bodybuilder-aimed but welcoming to all levels. It is a "brochure" site:
inform visitors and drive a single conversion — **Join Today**. No logins, accounts, or
databases.

## Real facts (must stay accurate)

- **Name:** Webb's World of Fitness
- **Owners:** Linda & Monty Webb
- **Address:** 101 Cypress Hill Drive, Pittsburgh, PA 15235
- **Phone:** 412-798-2800
- **Email:** webbsfitness@gmail.com
- **Hours:** Mon–Thu 5AM–10PM · Fri 5AM–9PM · Sat 7AM–5PM · Sun 7AM–4PM
- **Services / strengths:** full weight training, natural bodybuilding, Olympic
  weightlifting, personalized programs (weight loss, rehab, flexibility, functional
  strength); cardio with "cardio theater" (treadmills, ellipticals, stair climbers,
  computerized bikes); group exercise classes; **Personal Training — annual members get
  4 complimentary PT sessions**; **Vital Spark Chiropractic** (on-site); **Professional
  Portraits** (newly added photography service).
- **Source site:** https://www.webbsworldoffitness.com/

## Visual identity (approved)

- **Palette:** charcoal `#0c0a07` · gold `#c6a45c` · cream `#f4efe6` (dark, premium).
- **Headlines:** Oswald, condensed uppercase — confident, athletic.
- **Body text:** Inter — clean, modern.
- **Tone:** premium and established (A-tone) but welcoming and approachable (C-layout).
  Bodybuilding grit lives in the photography and copy, not aggressive styling.
- **Primary CTA:** "Join Today" everywhere. Never "free pass" / "free trial" (Webb's
  does not offer them).
- **Kicker line:** "Natural Bodybuilding · All Levels Welcome".

## Tech & architecture

- **Astro** static site (chosen deliberately as a framework-learning exercise; ships
  pure static files, no client runtime needed for this content).
- **Single page**, `src/pages/index.astro`, composed of small, focused section
  components in `src/components/` — each section of the page is its own readable file.
- **Global stylesheet** (`src/styles/global.css`) with CSS custom properties for the
  palette and type scale; Google Fonts (Oswald + Inter) loaded in the document head.
- **Minimal vanilla JS** for the sticky-nav: smooth-scroll to anchors and active-section
  highlighting. No other client JS.
- **Output:** `astro build` → static `dist/`. Deploy target: Netlify or GitHub Pages
  (free static hosting). Documented in README; not configured in this phase.

### Project structure (target)

```
Webbs-Site/
  src/
    pages/index.astro          # assembles the section components in order
    components/
      Nav.astro
      Hero.astro
      WhyWebbs.astro
      Facilities.astro
      Training.astro
      Membership.astro
      Testimonials.astro
      Visit.astro
      Footer.astro
    styles/global.css          # palette vars, type, resets, shared utilities
    data/site.ts               # single source of truth for real facts (hours, contact, etc.)
  public/images/               # Webb's real photos, sourced from existing site
  astro.config.mjs
  package.json
  README.md                    # run + deploy instructions
```

`src/data/site.ts` centralizes all real facts (name, owners, address, phone, email,
hours, plan tiers) so components import from one place and updates happen in one spot.

## Page structure — single-scroll homepage (top → bottom)

Sticky nav stays visible; anchor links jump to each section; gold Join Today button
always reachable.

1. **Nav** — charcoal sticky bar. Gold wordmark "WEBB'S · World of Fitness". Anchor
   links (Train · Membership · About · Visit) + gold **Join Today** button.
2. **Hero** — full-bleed dark gym photo (real Webb's photo). Kicker "Natural
   Bodybuilding · All Levels Welcome", headline **"Build a Body That Lasts."**, one line
   of subcopy ("Serious iron, expert coaching, and a room that actually wants you there
   — whether it's day one or year ten."), Join Today CTA.
3. **Why Webb's** — 3–4 value cards: serious iron & equipment; expert coaching;
   welcoming room (all levels); established & local.
4. **Facilities & Equipment** — full weight training, Olympic lifting platforms, and the
   cardio theater (treadmills, ellipticals, stair climbers, computerized bikes). Real
   facility photos.
5. **Training & Services** — Personal Training (call out *4 free sessions with annual
   membership*), Group Classes, and the differentiators **Vital Spark Chiropractic** and
   **Professional Portraits**.
6. **Membership** — plan tiers as cards with the Join CTA. **Placeholder prices, clearly
   marked as placeholders** for Angelo to confirm with the gym later (e.g., Monthly /
   Annual / Student). Annual tier highlights the 4 free PT sessions.
7. **Testimonials** — real-style quotes emphasizing expert instruction + welcoming
   atmosphere (matching the existing site's testimonial themes).
8. **Visit** — address, full hours table, phone & email, embedded Google Map, and a
   short "stop in / call" prompt. (Contact is a prompt to call/email + map; no backend
   form in this phase.)
9. **Footer** — owners Linda & Monty Webb, condensed hours, social links, copyright.

## Content decisions

- **Pricing:** realistic **placeholder** prices, visibly marked as placeholders. Angelo
  confirms real numbers with the gym before any real launch.
- **Photos:** use Webb's **real photos**, sourced from the existing
  webbsworldoffitness.com site, downloaded into `public/images/`. Code structured so each
  image is a one-line swap.
- **No free-pass language** anywhere. Single CTA: Join Today.

## Out of scope (YAGNI for this phase)

- Backend, CMS, membership signup flow, payments, or a working contact form (Join Today
  links to phone/email/visit for now).
- Multi-page expansion (deeper Membership/About pages) — single-scroll first; can grow
  later.
- Actual deployment configuration and a live domain — documented in README only.
- Real pricing data and any new photography.

## Success criteria

- Looks dramatically more modern/premium than the current site; reads as bodybuilder-
  focused yet welcoming.
- All real facts (hours, contact, address, owners, services) accurate.
- Fully responsive; strong on mobile (majority of gym traffic).
- One clear conversion path (Join Today) reachable from every section.
- Clean, readable Astro component code suitable for learning and easy editing.
- `astro build` produces a deployable static `dist/`.
