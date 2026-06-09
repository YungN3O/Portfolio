# Vasileios Gkoumas — iOS Developer Portfolio

A dark-themed, fully responsive personal portfolio built with **React + Vite + Tailwind CSS** and animated with **Framer Motion**. Fully static — no backend, no APIs, no environment variables required.

## Features

- **Hero** — name, title, tagline, and CTAs (View Work / App Store badge)
- **About** — bio, education, and profile photo
- **Experience** — role history as cards
- **Projects** — iOS app showcase with tech stack, GitHub and App Store links
- **Skills** — animated progress bars, grouped by category
- **Contact** — email and social links
- Sticky navbar with smooth-scroll, scrollspy active state, and mobile hamburger menu
- **3 color themes** switchable at runtime — Amber, Indigo, App Store Blue — via CSS custom properties
- **4 animated canvas backgrounds** switchable from the navbar:
  - **Mesh** — 6 drifting color anchor points blending like an iOS wallpaper
  - **Aurora** — 5 sine-wave ribbons flowing like the northern lights
  - **Bokeh** — 80 depth-of-field orbs drifting upward, large+blurry near, tiny+sharp far
  - **Code Rain** — falling Swift keywords with glowing heads and themed color trails

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [react-icons](https://react-icons.github.io/react-icons/)

## Run locally

**Prerequisites:** Node.js 18+ (tested on 22.x) and npm.

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Personalise the content

**Everything lives in one file:** [`src/data/content.js`](src/data/content.js)

| Export | What to edit |
|--------|-------------|
| `profile` | Name, title, tagline, email, GitHub, LinkedIn, App Store URL, resume link |
| `about` | Bio paragraphs, education history, photo path |
| `experience[]` | Role, company, period, bullet points |
| `projects[]` | Name, description, tech stack, GitHub + App Store URLs |
| `skills[]` | Categories, skill names, proficiency levels (0–100) |

Other spots to update:

- **Profile photo** — drop an image in `/public` (e.g. `public/me.jpg`) and set `about.photo = '/me.jpg'`
- **Favicon** — replace `/public/vite.svg` with your own icon and update the `<link>` in `index.html`
- **Browser tab title / OG meta** — edit `index.html` directly

## Deploy to Vercel

This is a standard Vite SPA — Vercel auto-detects it and the included `vercel.json` handles SPA routing.

**Dashboard (recommended):**

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Vercel detects Vite: build command `npm run build`, output `dist`.
4. Click **Deploy**. No environment variables needed.

**Vercel CLI:**

```bash
npm i -g vercel
vercel          # first run: follow prompts
vercel --prod   # deploy to production
```

## Project structure

```
src/
├── main.jsx
├── App.jsx                          # Providers + layout shell
├── index.css                        # Tailwind + CSS-variable palette
├── data/
│   └── content.js                   # ← all personal content here
├── context/
│   ├── ThemeContext.jsx              # 3 color themes via CSS vars
│   └── BackgroundContext.jsx        # active background state
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── AnimatedBackground.jsx       # switches between 4 canvases
│   ├── BackgroundSwitcher.jsx       # 4 icon buttons in the navbar
│   ├── ThemeSwitcher.jsx            # 3 color-dot buttons in the navbar
│   ├── AppStoreBadge.jsx
│   ├── SectionWrapper.jsx
│   ├── backgrounds/
│   │   ├── MeshBackground.jsx
│   │   ├── AuroraBackground.jsx
│   │   ├── BokehBackground.jsx
│   │   └── CodeRainBackground.jsx
│   └── ui/
│       └── GradientText.jsx
└── sections/
    ├── Hero.jsx
    ├── About.jsx
    ├── Experience.jsx
    ├── Projects.jsx
    ├── Skills.jsx
    └── Contact.jsx
```
