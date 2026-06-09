# Personal Portfolio — iOS Developer

A bold, dark-themed, fully responsive portfolio website built with **React + Vite + Tailwind CSS** and animated with **Framer Motion**. It's a static site — no backend, no APIs, no external data.

## ✨ Features

- **Hero / Landing** — name, title, tagline, CTAs ("View My Work", "Download iOS App") + Apple App Store badge
- **About** — bio, education, and a photo placeholder
- **Experience** — previous roles as cards
- **Projects** — iOS app showcase cards (name, description, tech stack, GitHub + App Store links)
- **Skills** — animated, grouped skill bars (Swift, SwiftUI, React, …)
- **Contact** — email + GitHub
- Sticky navbar with smooth-scroll links, scrollspy active state, and a mobile hamburger menu
- Smooth scroll-in animations throughout
- Amber/orange accent on a near-black dark theme — defined once and easy to re-theme

## 🧰 Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS v3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [react-icons](https://react-icons.github.io/react-icons/)

## 🚀 Run locally

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev
# → open the printed URL (usually http://localhost:5173)

# 3. Production build
npm run build

# 4. Preview the production build locally
npm run preview
```

## ✍️ Adding your content

**All personal content lives in one file:** [`src/data/content.js`](src/data/content.js).

Open it and replace every value marked with a `// TODO` comment:

- `profile` — your name, title, tagline, email, GitHub, **App Store URL**, resume link
- `about` — bio paragraphs, education, and your **photo**
- `experience[]` — your job history
- `projects[]` — your apps (each has a **`githubUrl`** and **`appStoreUrl`** placeholder set to `"#"`)
- `skills[]` — your skills and proficiency levels

Other `// TODO` markers to check:

- **Photo:** drop an image in `/public` (e.g. `public/me.jpg`) and set `about.photo = '/me.jpg'`. Until then a placeholder with your initials shows.
- **Browser tab title & favicon:** [`index.html`](index.html).
- **Links default to `#`** so unfinished placeholders are obvious — search the project for `TODO` to find them all.

## 🎨 Changing the color palette

The accent and surface colors are defined as CSS variables in [`src/index.css`](src/index.css) under `:root`, and mirrored in [`tailwind.config.js`](tailwind.config.js) so utility classes like `text-accent` / `bg-surface` stay in sync.

To switch the accent, change `--accent` and `--accent-2` in `index.css`. (The gradient buttons/headings use Tailwind's `amber`/`orange` scale directly — update those classes too if you change hue significantly.)

## ▲ Deploy to Vercel

This is a standard Vite app — Vercel auto-detects it.

**Option A — Dashboard (recommended):**

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo.
3. Vercel auto-detects the framework as **Vite**:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. No environment variables are needed (fully static).

**Option B — Vercel CLI:**

```bash
npm i -g vercel
vercel          # first run: follow the prompts to link/create the project
vercel --prod   # deploy to production
```

## 📁 Project structure

```
src/
├── main.jsx              # React entry
├── App.jsx               # Composes navbar + sections + footer
├── index.css            # Tailwind + CSS-variable palette + base styles
├── data/
│   └── content.js       # ← ALL your content lives here (TODOs)
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── SectionWrapper.jsx   # reusable scroll-animation wrapper
│   ├── AppStoreBadge.jsx    # reusable App Store button
│   └── ui/GradientText.jsx
└── sections/
    ├── Hero.jsx
    ├── About.jsx
    ├── Experience.jsx
    ├── Projects.jsx
    ├── Skills.jsx
    └── Contact.jsx
```

---

Built with React · Tailwind · Framer Motion.
