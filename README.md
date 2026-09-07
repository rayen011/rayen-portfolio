# Rayen Barkaoui — Portfolio

> Flutter developer & product designer · Tunisia · [github.com/rayen011](https://github.com/rayen011)

React + Vite + Tailwind + Framer Motion, with Lenis smooth scrolling. Deployed on Vercel.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## What's in the box

| Section | Highlights |
|---|---|
| Preloader | Name rises letter by letter with a 0–100 counter, curtain lifts (once per browser session) |
| Hero | Word-by-word headline reveal, typewriter role, cursor spotlight, 3D-tilting phone cycling **real app screenshots**, tech ticker |
| Work | **Sticky stacking project cards** — each card scales down as the next one slides over it; parallax images; "View" cursor label |
| Services | Cards with a border spotlight that follows the cursor |
| About | Parallax photo with an orbiting "open to work" badge, **scroll-driven word highlighting**, animated counters |
| Process | Timeline line that draws itself as you scroll |
| Toolbox | Three counter-scrolling skill marquees + "Right now" cards |
| Contact | Copy-to-clipboard email with toast, live local time in Tunis, form with animated success state |
| Global | Custom cursor with labels, magnetic buttons, film grain, hide-on-scroll pill nav with sliding indicator, full-screen mobile menu |

Everything respects `prefers-reduced-motion` (Lenis, grain and marquees switch off).

## Editing content

All copy, links and projects live in **`src/lib/data.js`**:

- `PROFILE` — name, role, email, availability, timezone, CV path
- `SOCIAL_LINKS` — GitHub / LinkedIn / Upwork
- `PROJECTS` — the stacked case-study cards (image, tagline, highlights, tags, links)
- `MORE_PROJECTS` — the compact "Also on the shelf" grid
- `HERO_SCREENS` — screenshots cycling inside the hero phone
- `SERVICES`, `PROCESS`, `SKILL_ROWS`, `NOW`, `STATS`, `MARKETS`

### Images

| Folder | Used for | Recommended size |
|---|---|---|
| `public/projects/*.jpg` | Project card images | ~1600 px wide, 4:3 or 16:10 |
| `public/screens/*.jpg` | Hero phone screenshots | ~480 px wide, portrait |
| `public/me.jpg` | About photo | portrait |

### Contact form

Set `FORM_ENDPOINT` in `src/lib/data.js` to a [Formspree](https://formspree.io) or
[FormSubmit](https://formsubmit.co) URL to receive messages directly. Left empty, the form
opens the visitor's email app with everything pre-filled.

### CV

Drop `cv.pdf` into `public/` and set `PROFILE.cv = '/cv.pdf'`.

## Structure

```
src/
├── components/
│   ├── layout/      Navbar, Footer
│   ├── sections/    Hero, Projects, Services, About, Process, Skills, Contact
│   └── ui/          Preloader, CustomCursor, SmoothScroll, Magnetic, RevealText,
│                    SpotlightCard, Marquee, SectionHeading, PhoneMockup
├── hooks/           useCounter
├── lib/data.js      ← all content
├── App.jsx
├── main.jsx
└── index.css        design tokens, cursor, grain, spotlight, marquee
```

## Design tokens

| Token | Value |
|---|---|
| Background | `#0A0A0A` |
| Surface / card | `#111111` / `#161616` |
| Gold accent | `#F5A623` → `#FFD166` |
| Display font | Syne |
| Body font | Inter |
| Mono font | JetBrains Mono |
