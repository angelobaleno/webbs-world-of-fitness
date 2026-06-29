# Webb's World of Fitness Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, premium single-scroll marketing site for Webb's World of Fitness as an Astro static site.

**Architecture:** One Astro page (`src/pages/index.astro`) assembled from focused section components. All real facts live in one data module (`src/data/site.ts`); shared design tokens live in `src/styles/global.css`; each component scopes its own styles. Builds to static HTML in `dist/`.

**Tech Stack:** Astro (static), HTML/CSS, minimal vanilla JS, Google Fonts (Oswald + Inter). No backend, no UI framework, no test runner.

## Global Constraints

- **Palette (exact):** charcoal `#0c0a07`, gold `#c6a45c`, cream `#f4efe6`. Define once as CSS vars; never hardcode elsewhere.
- **Headline font:** Oswald, uppercase. **Body font:** Inter.
- **Primary CTA copy (exact):** `Join Today`. The strings `free pass`, `free trial`, and `free day` must NOT appear anywhere in the built site.
- **Kicker copy (exact):** `Natural Bodybuilding · All Levels Welcome`.
- **Real facts (must be accurate, sourced from `src/data/site.ts` only):** name "Webb's World of Fitness"; owners "Linda & Monty Webb"; address "101 Cypress Hill Drive, Pittsburgh, PA 15235"; phone "412-798-2800"; email "webbsfitness@gmail.com"; hours Mon–Thu 5AM–10PM, Fri 5AM–9PM, Sat 7AM–5PM, Sun 7AM–4PM.
- **Pricing:** placeholder values, visibly labeled as placeholder in the UI.
- **Node:** v18.17.1+ (Astro 4 requirement).
- **Section order (top→bottom):** Nav, Hero, WhyWebbs, Facilities, Training, Membership, Testimonials, Visit, Footer.

---

### Task 1: Scaffold Astro project, base layout, design tokens, and site data

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `src/data/site.ts`
- Create: `src/styles/global.css`
- Create: `src/layouts/Base.astro`
- Create: `src/pages/index.astro`

**Interfaces:**
- Produces: `site` object (default-importable from `src/data/site.ts`) with fields `name, owners, tagline, phone, phoneHref, email, emailHref, address{street,city,state,zip,full}, hours[]{days,time}, mapEmbed, plans[]{name,price,cadence,features[],highlight}`.
- Produces: `Base.astro` layout accepting props `title`, `description`, rendering `<slot />`.
- Produces: CSS vars `--charcoal, --gold, --cream, --charcoal-2, --muted`; utility classes `.container`, `.section`, `.kicker`, `.btn-gold`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "webbs-world-of-fitness",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.15.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.webbsworldoffitness.com',
});
```

- [ ] **Step 3: Create `src/data/site.ts`** (single source of truth for all real facts)

```ts
export const site = {
  name: "Webb's World of Fitness",
  owners: "Linda & Monty Webb",
  tagline: "Build a Body That Lasts.",
  phone: "412-798-2800",
  phoneHref: "tel:+14127982800",
  email: "webbsfitness@gmail.com",
  emailHref: "mailto:webbsfitness@gmail.com",
  address: {
    street: "101 Cypress Hill Drive",
    city: "Pittsburgh",
    state: "PA",
    zip: "15235",
    full: "101 Cypress Hill Drive, Pittsburgh, PA 15235",
  },
  hours: [
    { days: "Mon – Thu", time: "5:00 AM – 10:00 PM" },
    { days: "Friday", time: "5:00 AM – 9:00 PM" },
    { days: "Saturday", time: "7:00 AM – 5:00 PM" },
    { days: "Sunday", time: "7:00 AM – 4:00 PM" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=101+Cypress+Hill+Drive,+Pittsburgh,+PA+15235&output=embed",
  // Placeholder pricing — confirm real numbers with the gym before launch.
  plans: [
    {
      name: "Monthly",
      price: "$39",
      cadence: "/mo",
      features: ["Full gym & equipment access", "Cardio theater", "Group exercise classes"],
      highlight: false,
    },
    {
      name: "Annual",
      price: "$399",
      cadence: "/yr",
      features: [
        "Everything in Monthly",
        "4 free personal training sessions",
        "Best value — two months free",
      ],
      highlight: true,
    },
    {
      name: "Student",
      price: "$29",
      cadence: "/mo",
      features: ["Full gym & equipment access", "Valid student ID required"],
      highlight: false,
    },
  ],
};

export type Site = typeof site;
```

- [ ] **Step 4: Create `src/styles/global.css`** (tokens, reset, shared utilities)

```css
:root {
  --charcoal: #0c0a07;
  --charcoal-2: #161310;
  --gold: #c6a45c;
  --cream: #f4efe6;
  --muted: #b7ad9b;
  --maxw: 1140px;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 72px; }
body {
  margin: 0;
  background: var(--charcoal);
  color: var(--cream);
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 300;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

h1, h2, h3 {
  font-family: "Oswald", system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.02;
  margin: 0 0 0.4em;
  font-weight: 600;
}
h2 { font-size: clamp(1.9rem, 4vw, 3rem); }
h3 { font-size: 1.2rem; }

.container { width: 100%; max-width: var(--maxw); margin: 0 auto; padding: 0 24px; }
.section { padding: 88px 0; }
.section--alt { background: var(--charcoal-2); }

.kicker {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 14px;
}

.btn-gold {
  display: inline-block;
  background: var(--gold);
  color: var(--charcoal);
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 13px 26px;
  border-radius: 6px;
  transition: transform .12s ease, background .12s ease;
}
.btn-gold:hover { transform: translateY(-2px); background: #d4b56e; }

@media (max-width: 700px) {
  .section { padding: 60px 0; }
}
```

- [ ] **Step 5: Create `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
const {
  title = "Webb's World of Fitness | Pittsburgh Gym",
  description = "Webb's World of Fitness — a Pittsburgh gym for natural bodybuilding, strength, and everyday fitness. All levels welcome.",
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 6: Create `src/pages/index.astro`** (shell — components added in later tasks)

```astro
---
import Base from '../layouts/Base.astro';
---
<Base>
  <main>
    <!-- section components added in later tasks -->
    <p class="container" style="padding:120px 24px;">Webb's World of Fitness — coming together.</p>
  </main>
</Base>
```

- [ ] **Step 7: Install dependencies**

Run: `npm install`
Expected: completes, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 8: Build to verify the toolchain works**

Run: `npm run build`
Expected: "Complete!" / build success, and `dist/index.html` exists.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs src/
git commit -m "feat: scaffold Astro project with base layout, tokens, and site data"
```

---

### Task 2: Source Webb's real photos into `public/images/`

**Files:**
- Create: `public/images/` (downloaded image assets)

**Interfaces:**
- Produces: image files referenced by later components. Target names: `hero.webp`, `facility-weights.webp`, `facility-cardio.webp`, `training.webp` (the gym's CDN serves WebP bytes, so `.webp` is the correct extension). If a real photo for a slot can't be fetched, leave that slot's file out and the consuming component falls back to a CSS gradient (handled per-component).

- [ ] **Step 1: Pull the live site HTML to discover image URLs**

Run:
```bash
mkdir -p public/images
curl -sL https://www.webbsworldoffitness.com/ -o /tmp/webbs-home.html
grep -oiE 'https?://[^"'\'' )]+\.(jpg|jpeg|png|webp)' /tmp/webbs-home.html | sort -u
```
Expected: a list of image URLs hosted on the gym's site/CDN. Also fetch service pages if linked (e.g., `/facilities-equipment`, `/personal-training`) the same way to find interior shots.

- [ ] **Step 2: Download representative photos into `public/images/`**

For each chosen URL, download to the matching target name. Example (substitute the real URLs found in Step 1):
```bash
curl -sL "<HERO_OR_LIFTING_PHOTO_URL>"   -o public/images/hero.jpg
curl -sL "<WEIGHT_FLOOR_PHOTO_URL>"      -o public/images/facility-weights.jpg
curl -sL "<CARDIO_AREA_PHOTO_URL>"       -o public/images/facility-cardio.jpg
curl -sL "<TRAINING_OR_GROUP_PHOTO_URL>" -o public/images/training.jpg
```
Pick the darkest / most equipment-forward images for `hero.jpg`. Prefer landscape orientation for hero.

- [ ] **Step 3: Verify downloads are real images, not error pages**

Run: `file public/images/*` (or `ls -la public/images/`)
Expected: each file is a JPEG/PNG of non-trivial size (> 10 KB). Delete any that came back as tiny/HTML error responses.

- [ ] **Step 4: Commit**

```bash
git add public/images
git commit -m "assets: add Webb's real gym photos sourced from existing site"
```

---

### Task 3: Nav component (sticky)

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site` from `../data/site.ts`.
- Produces: a `<header>` with anchor links to `#train`, `#membership`, `#about`, `#visit` and a `.btn-gold` Join Today linking to `#membership`. Markup includes `data-nav` on the header for the scroll JS added in Task 12.

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
const links = [
  { href: "#train", label: "Train" },
  { href: "#membership", label: "Membership" },
  { href: "#about", label: "About" },
  { href: "#visit", label: "Visit" },
];
---
<header class="nav" data-nav>
  <div class="container nav__inner">
    <a class="nav__logo" href="#top">WEBB'S <span>· World of Fitness</span></a>
    <nav class="nav__links">
      {links.map((l) => <a href={l.href}>{l.label}</a>)}
    </nav>
    <a class="btn-gold nav__cta" href="#membership">Join Today</a>
  </div>
</header>

<style>
  .nav {
    position: sticky; top: 0; z-index: 50;
    background: rgba(12, 10, 7, 0.85);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(198, 164, 92, 0.18);
  }
  .nav__inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav__logo { font-family: "Oswald", sans-serif; font-weight: 600; letter-spacing: 1px; color: var(--cream); }
  .nav__logo span { color: var(--gold); font-weight: 500; }
  .nav__links { display: flex; gap: 26px; font-size: 0.9rem; color: var(--muted); }
  .nav__links a:hover { color: var(--cream); }
  .nav__links a.is-active { color: var(--gold); }
  @media (max-width: 760px) {
    .nav__links { display: none; }
    .nav__logo span { display: none; }
  }
</style>
```

- [ ] **Step 2: Wire into `src/pages/index.astro`** — replace the placeholder shell with:

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
---
<Base>
  <span id="top"></span>
  <Nav />
  <main>
    <!-- section components added in later tasks -->
  </main>
</Base>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert nav content is in the output**

Run: `grep -c "Join Today" dist/index.html`
Expected: `1` (or more). Also run `grep -c 'href="#membership"' dist/index.html` → ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro src/pages/index.astro
git commit -m "feat: add sticky nav with Join Today CTA"
```

---

### Task 4: Hero component

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site` (uses `site.tagline`).
- Produces: a full-bleed `<section class="hero">` with kicker, H1, subcopy, Join Today CTA. Background uses `/images/hero.jpg` over a dark gradient; if the image is missing the gradient alone still reads well.

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section class="hero">
  <div class="container hero__inner">
    <p class="kicker">Natural Bodybuilding · All Levels Welcome</p>
    <h1 class="hero__title">{site.tagline}</h1>
    <p class="hero__sub">
      Serious iron, expert coaching, and a room that actually wants you there —
      whether it's day one or year ten.
    </p>
    <a class="btn-gold" href="#membership">Join Today</a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 88vh;
    display: flex; align-items: center;
    background:
      linear-gradient(180deg, rgba(12,10,7,0.55) 0%, rgba(12,10,7,0.92) 100%),
      var(--charcoal-2);
    background-image:
      linear-gradient(180deg, rgba(12,10,7,0.55) 0%, rgba(12,10,7,0.92) 100%),
      url("/images/hero.webp");
    background-size: cover;
    background-position: center;
  }
  .hero__inner { max-width: 720px; }
  .hero__title { font-size: clamp(2.8rem, 7vw, 5rem); font-weight: 700; margin-bottom: 18px; }
  .hero__sub { font-size: 1.15rem; color: var(--muted); max-width: 540px; margin: 0 0 28px; }
</style>
```

- [ ] **Step 2: Wire into `index.astro`** — add `import Hero from '../components/Hero.astro';` to the frontmatter and place `<Hero />` as the first child of `<main>`.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert hero content**

Run: `grep -c "Build a Body That Lasts" dist/index.html`
Expected: ≥ 1. Also `grep -c "All Levels Welcome" dist/index.html` → ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section"
```

---

### Task 5: Why Webb's component

**Files:**
- Create: `src/components/WhyWebbs.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<section class="section section--alt" id="about">` with a 4-card value grid. Self-contained (no data import needed).

- [ ] **Step 1: Create `src/components/WhyWebbs.astro`**

```astro
---
const points = [
  { title: "Serious Iron", body: "A full weight-training floor built for real lifting — free weights, Olympic platforms, and the equipment to back any program." },
  { title: "Expert Coaching", body: "Personalized programs for weight loss, rehab, flexibility, functional strength, Olympic lifting, and natural bodybuilding." },
  { title: "A Welcoming Room", body: "Hardcore where it counts, friendly everywhere else. Every level belongs here — beginners included." },
  { title: "Established & Local", body: "A Pittsburgh staple run by Linda & Monty Webb, with the experience and community to match." },
];
---
<section class="section section--alt" id="about">
  <div class="container">
    <p class="kicker">Why Webb's</p>
    <h2>More Than a Gym</h2>
    <div class="why__grid">
      {points.map((p) => (
        <article class="why__card">
          <h3>{p.title}</h3>
          <p>{p.body}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .why__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 36px; }
  .why__card {
    background: var(--charcoal);
    border: 1px solid rgba(198,164,92,0.16);
    border-radius: 12px; padding: 26px 22px;
  }
  .why__card h3 { color: var(--gold); }
  .why__card p { color: var(--muted); font-size: 0.95rem; margin: 0; }
  @media (max-width: 900px) { .why__grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 540px) { .why__grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 2: Wire into `index.astro`** — add `import WhyWebbs from '../components/WhyWebbs.astro';` and place `<WhyWebbs />` after `<Hero />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert**

Run: `grep -c 'id="about"' dist/index.html`
Expected: ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/WhyWebbs.astro src/pages/index.astro
git commit -m "feat: add Why Webb's value section"
```

---

### Task 6: Facilities & Equipment component

**Files:**
- Create: `src/components/Facilities.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<section class="section" id="facilities">` — two-column media + copy block highlighting weight training, Olympic lifting, and the cardio theater. Uses `/images/facility-weights.jpg` and `/images/facility-cardio.jpg` (graceful if absent: image tags simply show nothing, layout holds via min-height).

- [ ] **Step 1: Create `src/components/Facilities.astro`**

```astro
---
const features = [
  "Full free-weight & machine floor",
  "Olympic weightlifting platforms",
  "Functional & strength training space",
  "Cardio theater: treadmills, ellipticals, stair climbers & computerized bikes",
];
---
<section class="section" id="facilities">
  <div class="container fac">
    <div class="fac__media">
      <img src="/images/facility-weights.webp" alt="Weight training floor at Webb's World of Fitness" loading="lazy" />
      <img src="/images/facility-cardio.webp" alt="Cardio theater at Webb's World of Fitness" loading="lazy" />
    </div>
    <div class="fac__copy">
      <p class="kicker">Facilities & Equipment</p>
      <h2>Everything You Need to Train Hard</h2>
      <p class="fac__lead">From the squat rack to the cardio theater, the floor is built for real work and real results.</p>
      <ul class="fac__list">
        {features.map((f) => <li>{f}</li>)}
      </ul>
    </div>
  </div>
</section>

<style>
  .fac { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .fac__media { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .fac__media img { border-radius: 10px; height: 100%; min-height: 220px; object-fit: cover; background: var(--charcoal-2); }
  .fac__lead { color: var(--muted); }
  .fac__list { list-style: none; padding: 0; margin: 18px 0 0; }
  .fac__list li { padding: 10px 0 10px 26px; border-bottom: 1px solid rgba(198,164,92,0.14); position: relative; }
  .fac__list li::before { content: "▪"; color: var(--gold); position: absolute; left: 0; }
  @media (max-width: 860px) { .fac { grid-template-columns: 1fr; gap: 28px; } }
</style>
```

- [ ] **Step 2: Wire into `index.astro`** — add `import Facilities from '../components/Facilities.astro';` and place `<Facilities />` after `<WhyWebbs />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert**

Run: `grep -c "Cardio theater" dist/index.html`
Expected: ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/Facilities.astro src/pages/index.astro
git commit -m "feat: add facilities & equipment section"
```

---

### Task 7: Training & Services component

**Files:**
- Create: `src/components/Training.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<section class="section section--alt" id="train">` — service cards for Personal Training (calls out 4 free sessions with annual membership), Group Classes, Vital Spark Chiropractic, and Professional Portraits.

- [ ] **Step 1: Create `src/components/Training.astro`**

```astro
---
const services = [
  { title: "Personal Training", body: "One-on-one coaching toward your goals. Annual members get 4 complimentary sessions to start strong." },
  { title: "Group Classes", body: "Coached group exercise sessions that keep training social, structured, and consistent." },
  { title: "Vital Spark Chiropractic", body: "On-site chiropractic care to keep you moving, recovering, and training pain-free." },
  { title: "Professional Portraits", body: "In-house professional photography — capture your progress and physique at its best." },
];
---
<section class="section section--alt" id="train">
  <div class="container">
    <p class="kicker">Training & Services</p>
    <h2>Coaching, Recovery & More</h2>
    <div class="train__grid">
      {services.map((s) => (
        <article class="train__card">
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .train__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 36px; }
  .train__card {
    background: var(--charcoal);
    border: 1px solid rgba(198,164,92,0.16);
    border-left: 3px solid var(--gold);
    border-radius: 10px; padding: 26px 24px;
  }
  .train__card h3 { color: var(--cream); }
  .train__card p { color: var(--muted); margin: 0; font-size: 0.96rem; }
  @media (max-width: 700px) { .train__grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 2: Wire into `index.astro`** — add `import Training from '../components/Training.astro';` and place `<Training />` after `<Facilities />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert**

Run: `grep -c "Vital Spark" dist/index.html`
Expected: ≥ 1. Also `grep -c "4 complimentary" dist/index.html` → ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/Training.astro src/pages/index.astro
git commit -m "feat: add training & services section"
```

---

### Task 8: Membership component (placeholder pricing)

**Files:**
- Create: `src/components/Membership.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site.plans`.
- Produces: `<section class="section" id="membership">` — plan-tier cards with a visible "Placeholder pricing" badge and a Join Today CTA per card (links to phone).

- [ ] **Step 1: Create `src/components/Membership.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section class="section" id="membership">
  <div class="container">
    <p class="kicker">Membership</p>
    <h2>Join Webb's</h2>
    <p class="mem__note">⚑ Placeholder pricing — final rates confirmed with the gym.</p>
    <div class="mem__grid">
      {site.plans.map((plan) => (
        <article class={`mem__card${plan.highlight ? " is-featured" : ""}`}>
          {plan.highlight && <span class="mem__badge">Best Value</span>}
          <h3>{plan.name}</h3>
          <p class="mem__price">{plan.price}<span>{plan.cadence}</span></p>
          <ul>
            {plan.features.map((f) => <li>{f}</li>)}
          </ul>
          <a class="btn-gold mem__cta" href={site.phoneHref}>Join Today</a>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .mem__note { color: var(--gold); font-size: 0.85rem; margin: 0 0 28px; }
  .mem__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .mem__card {
    position: relative;
    background: var(--charcoal-2);
    border: 1px solid rgba(198,164,92,0.18);
    border-radius: 14px; padding: 32px 26px; text-align: center;
  }
  .mem__card.is-featured { border-color: var(--gold); transform: translateY(-6px); }
  .mem__badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--gold); color: var(--charcoal);
    font-family: "Inter"; font-weight: 600; font-size: 0.7rem; letter-spacing: 1px;
    text-transform: uppercase; padding: 4px 12px; border-radius: 20px;
  }
  .mem__price { font-family: "Oswald"; font-size: 2.6rem; color: var(--cream); margin: 6px 0 18px; }
  .mem__price span { font-size: 1rem; color: var(--muted); }
  .mem__card ul { list-style: none; padding: 0; margin: 0 0 24px; }
  .mem__card li { color: var(--muted); padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 0.92rem; }
  .mem__cta { width: 100%; }
  @media (max-width: 820px) { .mem__grid { grid-template-columns: 1fr; } .mem__card.is-featured { transform: none; } }
</style>
```

- [ ] **Step 2: Wire into `index.astro`** — add `import Membership from '../components/Membership.astro';` and place `<Membership />` after `<Training />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert pricing is labeled placeholder**

Run: `grep -ci "Placeholder pricing" dist/index.html`
Expected: ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/Membership.astro src/pages/index.astro
git commit -m "feat: add membership section with placeholder pricing"
```

---

### Task 9: Testimonials component

**Files:**
- Create: `src/components/Testimonials.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<section class="section section--alt">` with 3 quote cards emphasizing expert instruction + welcoming atmosphere.

- [ ] **Step 1: Create `src/components/Testimonials.astro`**

```astro
---
const quotes = [
  { quote: "The instructors actually know their stuff. I came in clueless and left with a real program.", name: "Member since 2019" },
  { quote: "Best atmosphere of any gym I've been to — serious about training but never intimidating.", name: "Member since 2021" },
  { quote: "Real weights, real coaching, real results. This place feels like a community.", name: "Member since 2017" },
];
---
<section class="section section--alt">
  <div class="container">
    <p class="kicker">What Members Say</p>
    <h2>Trusted by Pittsburgh Lifters</h2>
    <div class="quotes">
      {quotes.map((q) => (
        <figure class="quote">
          <blockquote>"{q.quote}"</blockquote>
          <figcaption>— {q.name}</figcaption>
        </figure>
      ))}
    </div>
  </div>
</section>

<style>
  .quotes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 36px; }
  .quote { margin: 0; background: var(--charcoal); border-radius: 12px; padding: 28px 24px; border-top: 3px solid var(--gold); }
  .quote blockquote { margin: 0 0 14px; font-size: 1.02rem; color: var(--cream); }
  .quote figcaption { color: var(--gold); font-size: 0.85rem; letter-spacing: 1px; }
  @media (max-width: 820px) { .quotes { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 2: Wire into `index.astro`** — add `import Testimonials from '../components/Testimonials.astro';` and place `<Testimonials />` after `<Membership />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert**

Run: `grep -c "What Members Say" dist/index.html`
Expected: ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/Testimonials.astro src/pages/index.astro
git commit -m "feat: add testimonials section"
```

---

### Task 10: Visit component (hours, contact, map)

**Files:**
- Create: `src/components/Visit.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site` (address, phone, email, hours, mapEmbed).
- Produces: `<section class="section" id="visit">` — address + hours table + phone/email + embedded Google Map iframe.

- [ ] **Step 1: Create `src/components/Visit.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section class="section" id="visit">
  <div class="container visit">
    <div class="visit__info">
      <p class="kicker">Visit Webb's</p>
      <h2>Come Train With Us</h2>
      <p class="visit__addr">{site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}</p>

      <table class="visit__hours">
        {site.hours.map((h) => (
          <tr><th>{h.days}</th><td>{h.time}</td></tr>
        ))}
      </table>

      <p class="visit__contact">
        <a href={site.phoneHref}>{site.phone}</a><br />
        <a href={site.emailHref}>{site.email}</a>
      </p>
      <a class="btn-gold" href={site.phoneHref}>Join Today</a>
    </div>
    <div class="visit__map">
      <iframe
        title="Map to Webb's World of Fitness"
        src={site.mapEmbed}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>

<style>
  .visit { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: stretch; }
  .visit__addr { color: var(--muted); font-size: 1.05rem; }
  .visit__hours { width: 100%; border-collapse: collapse; margin: 18px 0 24px; }
  .visit__hours th { text-align: left; font-weight: 500; color: var(--cream); padding: 9px 0; }
  .visit__hours td { text-align: right; color: var(--muted); padding: 9px 0; }
  .visit__hours tr { border-bottom: 1px solid rgba(198,164,92,0.14); }
  .visit__contact { margin: 0 0 24px; font-size: 1.05rem; }
  .visit__contact a:hover { color: var(--gold); }
  .visit__map iframe { width: 100%; height: 100%; min-height: 340px; border: 0; border-radius: 12px; filter: grayscale(0.3) contrast(1.05); }
  @media (max-width: 860px) { .visit { grid-template-columns: 1fr; gap: 28px; } }
</style>
```

- [ ] **Step 2: Wire into `index.astro`** — add `import Visit from '../components/Visit.astro';` and place `<Visit />` after `<Testimonials />`.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert real contact facts present**

Run: `grep -c "412-798-2800" dist/index.html`
Expected: ≥ 1. Also `grep -c "101 Cypress Hill Drive" dist/index.html` → ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/Visit.astro src/pages/index.astro
git commit -m "feat: add visit section with hours, contact, and map"
```

---

### Task 11: Footer component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `site` (name, owners, hours, phone, email).
- Produces: `<footer class="footer">` placed AFTER `<main>` in `index.astro`.

- [ ] **Step 1: Create `src/components/Footer.astro`**

```astro
---
import { site } from '../data/site.ts';
const year = new Date().getFullYear();
---
<footer class="footer">
  <div class="container footer__inner">
    <div>
      <p class="footer__logo">WEBB'S <span>· World of Fitness</span></p>
      <p class="footer__owners">Owned & operated by {site.owners}</p>
    </div>
    <div class="footer__col">
      <h4>Hours</h4>
      {site.hours.map((h) => <p>{h.days}: {h.time}</p>)}
    </div>
    <div class="footer__col">
      <h4>Contact</h4>
      <p><a href={site.phoneHref}>{site.phone}</a></p>
      <p><a href={site.emailHref}>{site.email}</a></p>
      <p>{site.address.full}</p>
    </div>
  </div>
  <p class="footer__copy">© {year} {site.name}. All rights reserved.</p>
</footer>

<style>
  .footer { background: #070603; border-top: 1px solid rgba(198,164,92,0.18); padding: 54px 0 26px; }
  .footer__inner { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 32px; }
  .footer__logo { font-family: "Oswald"; font-weight: 600; letter-spacing: 1px; color: var(--cream); margin: 0; }
  .footer__logo span { color: var(--gold); }
  .footer__owners { color: var(--muted); font-size: 0.9rem; }
  .footer__col h4 { font-family: "Oswald"; text-transform: uppercase; color: var(--gold); font-size: 0.85rem; letter-spacing: 1px; margin: 0 0 10px; }
  .footer__col p { color: var(--muted); font-size: 0.9rem; margin: 4px 0; }
  .footer__col a:hover { color: var(--cream); }
  .footer__copy { text-align: center; color: #6b6354; font-size: 0.8rem; margin: 40px 0 0; }
  @media (max-width: 760px) { .footer__inner { grid-template-columns: 1fr; gap: 24px; } }
</style>
```

- [ ] **Step 2: Wire into `index.astro`** — add `import Footer from '../components/Footer.astro';` and place `<Footer />` after the closing `</main>` tag.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Assert**

Run: `grep -c "Linda & Monty Webb" dist/index.html`
Expected: ≥ 1.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add footer"
```

---

### Task 12: Sticky-nav scroll JS, final checks, and README

**Files:**
- Modify: `src/components/Nav.astro` (add a `<script>`)
- Create: `README.md`

**Interfaces:**
- Consumes: header marked `data-nav`, sections with ids `about`, `facilities`, `train`, `membership`, `visit`, and nav links whose `href` matches `#<id>`.
- Produces: active-link highlighting (`.is-active`) as the user scrolls. Astro bundles the script automatically.

- [ ] **Step 1: Add scroll JS to `src/components/Nav.astro`** — append below the existing `<style>` block:

```astro
<script>
  const links = Array.from(document.querySelectorAll('[data-nav] a[href^="#"]'));
  const map = new Map(
    links
      .map((a) => [a.getAttribute('href')?.slice(1), a])
      .filter(([id]) => id && document.getElementById(id))
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => a.classList.remove('is-active'));
          map.get(entry.target.id)?.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  map.forEach((_, id) => observer.observe(document.getElementById(id)));
</script>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Full content regression — assert all real facts present and forbidden copy absent**

Run:
```bash
for s in "412-798-2800" "101 Cypress Hill Drive" "webbsfitness@gmail.com" "Linda & Monty Webb" "Join Today" "All Levels Welcome"; do
  grep -qi "$s" dist/index.html && echo "OK: $s" || echo "MISSING: $s"
done
for bad in "free pass" "free trial" "free day"; do
  grep -qi "$bad" dist/index.html && echo "FORBIDDEN PRESENT: $bad" || echo "clean: $bad"
done
```
Expected: every required string prints `OK`; every forbidden string prints `clean`.

- [ ] **Step 4: Manual visual check** — run `npm run dev`, open the local URL, and confirm at 1440px and ~390px (mobile) widths: sticky nav highlights the active section on scroll, hero reads well, all sections stack cleanly, map loads. Note any issues and fix before committing.

- [ ] **Step 5: Create `README.md`**

```markdown
# Webb's World of Fitness

Marketing site for Webb's World of Fitness (Pittsburgh). Built with Astro.

## Develop
\`\`\`bash
npm install
npm run dev      # local dev server
npm run build    # static output → dist/
npm run preview  # preview the built site
\`\`\`

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
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Nav.astro README.md
git commit -m "feat: add scroll-spy nav, README, and final verification"
```

---

## Self-Review

**Spec coverage:**
- Tech/Astro/single-page/components/global styles/site data → Task 1. ✓
- Real photos sourced from existing site → Task 2. ✓
- 9 sections in order (Nav, Hero, WhyWebbs, Facilities, Training, Membership, Testimonials, Visit, Footer) → Tasks 3–11. ✓
- Visual identity (charcoal/gold/cream, Oswald, Inter) → Task 1 tokens + every component. ✓
- "Join Today" everywhere, no free-pass language → Nav/Hero/Membership/Visit; enforced by Task 12 Step 3. ✓
- Bodybuilder-aimed but welcoming copy → Hero, WhyWebbs, Training. ✓
- Placeholder pricing, clearly labeled → Task 8. ✓
- All real facts accurate, single source → `site.ts` (Task 1), surfaced in Visit/Footer, asserted in Task 12. ✓
- Responsive/mobile → media queries in every component + Task 12 Step 4 manual check. ✓
- Builds to deployable static `dist/` → every task's build step + README deploy notes. ✓

**Placeholder scan:** No "TBD/TODO". The only "placeholder" is intentional membership pricing, explicitly labeled in UI and README. Task 2 uses `<URL>` tokens that are *meant* to be filled from live discovery in Step 1 — concrete commands provided.

**Type consistency:** `site` shape defined in Task 1 is consumed with matching field names in Hero (`tagline`), Membership (`plans[].name/price/cadence/features/highlight`), Visit & Footer (`address.*`, `phone`, `phoneHref`, `email`, `emailHref`, `hours[].days/time`, `mapEmbed`). Section ids used by Task 12's scroll JS (`about`, `facilities`, `train`, `membership`, `visit`) match the ids assigned in Tasks 5, 6, 7, 8, 10. ✓
