# Mhelric Banaag — Developer & Artist Portfolio

Personal developer and commercial illustration portfolio built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Designed around a minimalist dark grid canvas (`#0a0a0b`) with Electric Blue (`#4f8cff`) accents to showcase both software engineering projects and 5+ years of digital illustration work.

## ✨ Key Features

- **Data-Driven Projects Carousel:** Smooth CSS-transform slider featuring a live scaled desktop `<iframe>` preview, color-coded tech stack badges, touch-swipe mobile support, and an interactive **Case Study Modal**.
- **Commercial Art Gallery & Lightbox:** Compact 4-card preview row backed by a full-resolution `.webp` lightbox viewer (keyboard `←` / `→` / `Esc` navigation + filmstrip thumbnails) and a **Commission Pricing & Workflow Modal**.
- **Built-In Email Composer Modal:** Direct-to-inbox contact form powered by Web3Forms API with category pills, async status feedback, and 1-click email clipboard copy.
- **Responsive Viewport Architecture:** Built with `100svh` viewport calculations and sticky glassmorphism navigation for seamless browsing across phones, laptops, and wide monitors.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), Custom CSS Grid & Scrollbar Tokens
- **Typography:** Inter (UI / Headings) & JetBrains Mono (Labels / Metadata)
- **Build & Deployment:** Vite, ESLint, Vercel CI/CD

## 📂 Project Structure

```text
├── public/
│   ├── art/                    # Optimized .webp commission & character illustrations
│   ├── favicon.svg             # Custom M. dark-grid SVG monogram
│   └── mhelric-profile.webp    # Transparent half-body hero portrait
└── src/
    ├── components/
    │   ├── Navbar.tsx          # Sticky glassmorphism header & mobile overlay menu
    │   ├── Hero.tsx            # Positioning headline, CTAs, & portrait cutout
    │   ├── Projects.tsx        # Smooth project carousel, live preview, & case study modal
    │   ├── ArtGallery.tsx      # 4-card preview strip, lightbox modal, & commission guide
    │   ├── Experience.tsx      # Career & academic timeline
    │   ├── Skills.tsx          # Categorized engineering & design stack
    │   └── Contact.tsx         # Built-in email composer modal & social links
    ├── data/
    │   ├── projects.ts         # Typed project entries & case studies
    │   └── artworks.ts         # Typed artwork metadata
    ├── App.tsx                 # Main single-page layout shell
    └── index.css               # Tailwind v4 theme variables & 48px CSS grid canvas
```

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev

# 3. Type-check and build for production
npm run build
```

## 🔗 Connect

- **GitHub:** [@Mhelric](https://github.com/Mhelric)
- **LinkedIn:** [Mhelric Banaag](https://www.linkedin.com/in/mhelric-banaag-7797622b0/)
- **ArtStation:** [meru_art](https://meru_art.artstation.com/projects)
- **Commissions:** [meru-art.carrd.co](https://meru-art.carrd.co/)