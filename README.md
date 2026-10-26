# Ephron TWAGIRIMANA — Interactive Software Developer & IoT Portfolio

A modern, responsive, dark/light portfolio built with **React + Vite + Tailwind CSS**,
with Framer Motion animations and Lucide icons. All personal content (profile, skills,
projects, experience, education) lives in plain data files — update the site without
touching components.

---

## Quick Start

```bash
npm install     # install dependencies (first time only)
npm run dev     # start local dev server → http://localhost:5173
npm run build   # production build → dist/
npm run preview # serve the production build locally
```

Requires Node.js 18+.

## Folder Structure

```
├── index.html                 # SEO metadata, OG tags, favicon, pre-paint theme script
├── .env.example               # external service configuration template
├── public/
│   ├── favicon.svg
│   ├── cv/                    # ← put your CV PDF here
│   └── images/                # ← profile.jpg and projects/*.jpg go here
└── src/
    ├── main.jsx               # app entry (MotionConfig reduced-motion)
    ├── App.jsx                # page composition + skip link
    ├── index.css              # design system: navy/cyan palette, buttons, cards, inputs
    ├── data/                  # ★ ALL EDITABLE CONTENT LIVES HERE
    │   ├── profile.js         #   name, titles, contact, links, CV path, photo
    │   ├── skills.js          #   skill categories & technologies
    │   ├── projects.js        #   projects: cards, categories, full case studies
    │   ├── experience.js      #   job timeline (dates editable, roles addable)
    │   └── education.js       #   degrees & certifications
    ├── hooks/
    │   ├── useTheme.jsx       # dark/light with remembered preference
    │   ├── useTypingWords.js  # animated rotating role titles
    │   ├── useScrollSpy.js    # active nav link highlighting
    │   └── usePrefersReducedMotion.js
    ├── utils/useCvStatus.js   # verifies the CV file actually exists
    └── components/
        ├── layout/            # Navbar (mobile menu), Footer
        ├── ui/                # Section, ThemeToggle, BackToTop, ScrollProgress
        └── sections/          # Hero, About, Skills, Projects, Experience, Education, Contact
            └── projects/      # ProjectCard support: ProjectThumb, ProjectModal
```

## Customization Guide

### 1. Profile photo
Add your photo as **`public/images/profile.jpg`** (any portrait works; suggested ~800×1000px).
Until then the hero shows an "ET" placeholder. To use another filename/path, edit
`profile.photo` in `src/data/profile.js`.

### 2. CV file
Save your PDF as **`public/cv/Ephron_Twagirimana_CV.pdf`**. The "Download CV" button
detects the file automatically — if it's missing, the button honestly shows a setup
notice instead of a broken download. Rename path/label in `profile.cv` if you prefer.

### 3. Contact details & social links
Edit `src/data/profile.js`:

```js
email: 'ephron.twagirimana@…',      // replace the example.com placeholder
phone: '+250 7…',                    // currently empty — never guessed
github: 'https://github.com/…',
linkedin: 'https://www.linkedin.com/in/…',
```

Placeholder links render dimmed/disabled and tooltips explain what to fill in —
**no fake or dead links are shown as if they worked.**

### 4. Skills
`src/data/skills.js` — add/remove/reorder categories and technologies. `level` (0–100)
only drives the proficiency bar; remove it if you'd rather not show levels.

### 5. Projects
`src/data/projects.js` — each project is one object. The gallery, category filters,
search and detail modal all derive from this file.

- Add an image at `public/images/projects/<name>.jpg` and set `image` — missing
  images fall back to a generated SVG illustration automatically.
- Set `details.links.source` / `details.links.demo` to real URLs when available, or
  leave `null` — the buttons then show as disabled with an explanatory tooltip.
- **Keep the honesty split:** `implemented` = built & verified, `planned` = research
  objectives / future work. The MSc TinyML project intentionally claims no accuracy,
  deployment or performance results.

### 6. Experience & Education
`src/data/experience.js` (editable `period` strings, add roles freely) and
`src/data/education.js`. Empty date fields display an "add dates" hint rather than
inventing one.

## Contact Form

The form always validates client-side. Delivery requires **one** external value in a
`.env` file (copy from `.env.example`):

**Option A — Formspree (recommended, no backend):**
1. Create a free form at [formspree.io](https://formspree.io) with your email.
2. Set `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID`.

**Option B — Your own endpoint:** any POST endpoint accepting
`{ name, email, subject, message }` JSON → set `VITE_CONTACT_ENDPOINT`.

**Without configuration:** the form shows a visible notice, never fakes success, and
offers an email handoff (`mailto:` with the composed message) once a real address is
set in `profile.js`. Remember: values in `.env` are embedded in the client bundle —
never put secret keys there.

## Deployment (Vercel / Netlify)

```bash
npm run build          # outputs static site in dist/
```

- **Vercel:** import the repo → framework preset "Vite" → build command `npm run build`,
  output `dist` → add the `VITE_*` env variables in Project Settings if used → deploy.
  (Or run `npx vercel` locally.)
- **Netlify:** build command `npm run build`, publish directory `dist`, env vars under
  Site settings → Environment variables.
- After deploying, update `profile.site.url` and the `og:url` / canonical tags in
  `index.html` to your live domain.

## Testing Checklist (run before considering the site done)

**Responsiveness** — verify at 360px (phone), 768px (tablet), 1024px (laptop), 1440px (desktop):
- [ ] Hero text + photo stack cleanly on phone, sit side-by-side on desktop
- [ ] Mobile hamburger menu opens/closes, closes on link tap and Escape
- [ ] Project grid reflows 1 → 2 → 3 columns; modal is a bottom sheet on phones
- [ ] No horizontal scroll anywhere; footer links wrap sensibly

**Accessibility**
- [ ] Full navigation by keyboard alone; focus rings always visible
- [ ] Skip link appears on first Tab press and jumps to content
- [ ] Modal: focus moves in on open, Tab stays inside, Escape + close button restore focus
- [ ] Screen reader announces section headings, skill meters, form errors, live status
- [ ] OS "reduce motion" ON → typing effect, canvas animation and transitions stop/simplify

**Functionality**
- [ ] Theme toggle switches + persists across reload; no flash on load
- [ ] Typing effect rotates all three role titles
- [ ] Project filters (5 categories) + search by name/technology + clear-filters state
- [ ] Every project card opens a complete detail modal
- [ ] Download CV: works when the PDF exists, shows setup notice when it doesn't
- [ ] Contact form: per-field validation errors, then success/error/fallback states match reality
- [ ] Scroll progress bar, back-to-top button, active nav highlighting all track scroll
- [ ] Placeholder links (GitHub/LinkedIn/email) appear disabled, never as live links

**Build & SEO**
- [ ] `npm run build` completes with no errors
- [ ] Page title, description, OG/Twitter tags and favicon render (test with opengraph.xyz)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95 (fix anything under)

## Notes on Integrity

The portfolio deliberately contains **no invented facts**: no graduation dates, contact
details, performance numbers, GitHub repos or demo URLs that weren't provided. Each
missing item is surfaced in the UI as a to-do so employers never encounter broken or
misleading content.
