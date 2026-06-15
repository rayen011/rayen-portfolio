# Rayen — Portfolio Website

> Personal portfolio · Flutter Developer & Hardware Builder · Tunisia

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
rayen-portfolio/
├── public/
│   ├── favicon.svg
│   └── cv.pdf              ← Add your CV here
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── EVBuild.jsx
│   │   │   └── Contact.jsx
│   │   └── ui/
│   │       ├── CircuitBackground.jsx
│   │       └── SectionLabel.jsx
│   ├── hooks/
│   │   ├── useScrollReveal.js
│   │   └── useCounter.js
│   ├── lib/
│   │   └── data.js         ← All content lives here
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## ✏️ Customization

All content is in **`src/lib/data.js`** — edit that file to update:
- Your name and bio
- Projects (title, description, links, tags, color)
- Skills list
- Social links and email
- EV build timeline

### Add your photo
Replace the emoji placeholder in `About.jsx` with an `<img>` tag pointing to your photo.

### Add your CV
Drop `cv.pdf` into the `/public/` folder.

### Connect the contact form
In `Contact.jsx`, replace the `setTimeout` simulation with your email service:
- **Formspree**: https://formspree.io (free)
- **EmailJS**: https://emailjs.com

## 🚢 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at vercel.com — auto-deploys on every push.

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Base background | `#0D0D0D` |
| Surface | `#141414` |
| Card | `#1E1E1E` |
| Gold accent | `#F5A623` |
| Gold bright | `#FFD700` |
| Display font | Space Grotesk |
| Body font | Inter |
| Mono font | JetBrains Mono |
