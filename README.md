# Mhelric Banaag — Web Developer & Digital Artist Portfolio

**Live Site:** [mhelric.vercel.app](https://mhelric.vercel.app/)

Personal web developer and commercial illustration portfolio built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Designed around a minimalist dark grid canvas (`#0a0a0b`) with animated `48px` grid light beams, scroll-reveal transitions, and Electric Blue (`#4f8cff`) accents.

## Key Features

- **Animated HTML5 Canvas Grid Background:** Lightweight 60fps `<canvas>` overlay that animates traveling light streaks along the `48px` grid lines and softly pulsing grid cells.
- **Interactive Projects Carousel:** Smooth slider featuring a live scaled desktop `<iframe>` preview (`pokedex-app-v01.vercel.app`), color-coded tech stack badges, touch-swipe mobile support, and a **Case Study Modal**.
- **Commercial Art Gallery & Lightbox:** Compact 4-card preview row backed by a full-resolution `.webp` lightbox viewer (keyboard `←` / `→` / `Esc` navigation + filmstrip thumbnails) and a **Commission Pricing & Workflow Modal**.
- **Career Timeline, Certifications & Live GitHub Heatmap:** Interactive timeline with a full-screen **Certificate Lightbox** (`Incub8 Space Excellence Award` WebP + original PDF) and a live **GitHub Contributions Heatmap** fetching real-time activity for `@Mhelric`.
- **Direct-to-Inbox Contact Card & Resume PDF:** Elevated inline contact form powered by Web3Forms API alongside 1-click email clipboard copy, social links, and a downloadable industry-standard **`resume.pdf`**.

## Tech Stack

- **Frontend:** React 19, TypeScript, HTML5 Canvas, IntersectionObserver API
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), Custom CSS Grid & Scrollbar Tokens
- **Typography:** Plus Jakarta Sans (Display), Inter (UI), & JetBrains Mono (Metadata)
- **Build & Deployment:** Vite, ESLint, Vercel CI/CD

## Project Structure

```text
├── public/
│   ├── art/                       # 11 optimized .webp commission & character illustrations
│   ├── certificates/              # Internship Excellence Award (.webp preview & .pdf)
│   ├── favicon.svg                # Custom M. dark-grid SVG monogram
│   ├── mhelric-profile.webp       # Transparent half-body hero portrait
│   └── resume.pdf                 # Single-page ATS-friendly developer resume
└── src/
    ├── components/
    │   ├── GridBackground.tsx     # 60fps HTML5 canvas moving grid beams & pulsing cells
    │   ├── Reveal.tsx             # IntersectionObserver scroll-reveal wrapper
    │   ├── Navbar.tsx             # Sticky glassmorphism header & mobile overlay menu
    │   ├── Hero.tsx               # Positioning headline, CTAs, resume link, & portrait cutout
    │   ├── Projects.tsx           # Smooth project carousel, live preview, & case study modal
    │   ├── ArtGallery.tsx         # 4-card preview strip, lightbox modal, & commission guide
    │   ├── Experience.tsx         # Career timeline, certifications showcase, & lightbox
    │   ├── GitHubActivity.tsx     # Live GitHub contributions heatmap card
    │   ├── Skills.tsx             # 2x2 bento grid of technical & creative capabilities
    │   └── Contact.tsx            # Inline direct-to-inbox contact form & social links
    ├── data/
    │   ├── projects.ts            # Typed project entries & case studies
    │   ├── artworks.ts            # Typed artwork metadata
    │   └── certifications.ts      # Typed certifications & awards metadata
    ├── App.tsx                    # Main single-page layout shell
    └── index.css                  # Tailwind v4 theme variables & 48px CSS grid canvas
```

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev

# 3. Type-check and build for production
npm run build
```

## Connect

- **Portfolio:** [mhelric.vercel.app](https://mhelric.vercel.app/)
- **GitHub:** [@Mhelric](https://github.com/Mhelric)
- **LinkedIn:** [Mhelric Banaag](https://www.linkedin.com/in/mhelric-banaag-7797622b0/)
- **ArtStation:** [meru_art](https://meru_art.artstation.com/projects)
- **Commissions:** [meru-art.carrd.co](https://meru-art.carrd.co/)