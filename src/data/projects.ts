export interface CaseStudy {
  problem: string
  role: string
  challenges: string
  outcome: string
  aiWorkflowNote: string
}

export interface Project {
  id: string
  title: string
  category: string
  summary: string
  techStack: string[]
  status: 'shipped' | 'in-progress'
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
  caseStudy?: CaseStudy
}

export const PROJECTS: Project[] = [
  {
    id: 'pass-vault',
    title: 'Pass-Vault | Zero-Knowledge Password & PIN Manager',
    category: 'Security • Full-Stack PWA & Native Android APK',
    summary:
      'A zero-knowledge personal vault for passwords, PINs, cards, and recovery notes featuring client-side Argon2id + AES-256-GCM encryption, offline-first IndexedDB delta sync via Supabase, and a signed Android APK with native Fingerprint & Face Unlock.',
    techStack: [
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Argon2id / AES-GCM',
      'Capacitor',
      'Android',
      'Supabase',
      'Vite',
      'Vercel',
    ],
    status: 'shipped',
    featured: true,
    liveUrl: 'https://pass-vault-mhel.vercel.app/',
    caseStudy: {
      problem:
        'Everyday accounts, banking PINs, SIM/PUK codes, and 2FA recovery notes often end up scattered across plain text files or cloud notes apps where servers can read plaintext data or fail completely offline.',
      role:
        'Architected the monorepo (@vault/crypto, @vault/core, @vault/ui, @vault/pwa, @vault/extension), designed the client-side key hierarchy, built the responsive web workspace and native Android Capacitor bridge, and automated signed APK releases via GitHub Actions.',
      challenges:
        'Keeping all cryptographic operations strictly in-memory on the client (Argon2id/PBKDF2 KDF, HKDF subkey splitting, VEK wrapping, and AES-256-GCM with AAD binding) while supporting 5-strike PIN wipe protection, offline-first Dexie delta sync, and native Android BiometricPrompt + AndroidKeyStore hardware encryption.',
      outcome:
        'Shipped a cross-platform password and PIN manager across desktop/mobile web (with collapsible/resizable 3-pane layout), a signed native Android APK with in-app update checks and biometric unlock, and a Manifest V3 browser extension.',
      aiWorkflowNote:
        'Used AI-assisted engineering for rapid monorepo scaffolding, native Java BiometricPrompt bridging, and iterative mobile UX refinement while owning the zero-knowledge threat model, crypto invariants, and release pipeline.',
    },
  },
  {
    id: 'meru-art-studio',
    title: 'Meru Art — Commission Studio & Client Workspace',
    category: 'Full-Stack • Client Workspace & Creative UI',
    summary:
      'A production full-stack illustration storefront, live USD/PHP commission pricing calculator, availability queue calendar, and scam-protected client workspace with OAuth & PostgreSQL Row-Level Security.',
    techStack: [
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Framer Motion',
      'Vite',
      'Vercel',
    ],
    status: 'shipped',
    featured: true,
    liveUrl: 'https://meru-art-studio.vercel.app/',
    repoUrl: 'https://github.com/Mhelric/meru-art-studio',
    caseStudy: {
      problem:
        'Freelance illustrators face heavy administrative friction: coordinating variable pricing across multiple currencies, managing scattered reference files via DMs, tracking queue availability, and mitigating chargeback scams. Static link-in-bio pages lack live slot tracking, automated currency math, and secure client WIP delivery.',
      role:
        'Architected and engineered the full-stack web application from database schema to responsive frontend. Authored the Supabase PostgreSQL database schema with Row-Level Security (RLS), built the automated WebP image optimization pipeline, and integrated Discord/Google OAuth authentication.',
      challenges:
        'Enforcing strict client vs. artist data isolation using PostgreSQL RLS policies while keeping the public queue view anonymized and accessible to unauthenticated visitors. Engineered a multi-step currency conversion and add-on pricing engine, plus an automated asset blur-up system for zero layout shift.',
      outcome:
        'Shipped a production full-stack platform featuring a 3-step slide-over order drawer with dynamic USD/PHP calculations, an availability calendar, client WIP tracking vaults, and an artist backoffice control panel.',
      aiWorkflowNote:
        'Leveraged AI-assisted workflows for rapid schema prototyping, complex pricing state validation, and UI polishing while maintaining full control over the architecture, security models, and design system.',
    },
  },
  {
    id: 'pokedex-lens',
    title: 'Pokédex Web App',
    category: 'API Integration • Visual Recognition UI',
    summary:
      'An interactive Pokédex web application combining PokéAPI data with SerpAPI Google Lens visual recognition to identify Pokémon directly from uploaded or captured images.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'PokéAPI', 'SerpAPI (Google Lens)', 'Vercel'],
    status: 'shipped',
    featured: true,
    liveUrl: 'https://pokedex-app-v01.vercel.app/',
    repoUrl: 'https://github.com/Mhelric/pokedex',
    caseStudy: {
      problem:
        'Traditional Pokédex apps require users to already know a Pokémon’s name or ID number. Casual fans or players spotting a Pokémon in media need a way to identify it visually and immediately inspect its stats, types, and evolutions.',
      role:
        'Designed the responsive Pokédex interface, structured the asynchronous API pipeline between visual search results and PokéAPI endpoints, and deployed the production build on Vercel.',
      challenges:
        'Bridging unstructured visual search matches from SerpAPI (Google Lens) with strict PokéAPI species names required normalizing strings, filtering noisy matches, and handling loading/error states gracefully so the UI stays responsive.',
      outcome:
        'Delivered a fast, mobile-friendly web app where users can both browse/search the classic Pokédex and identify Pokémon from images, complete with clean stat visualizations.',
      aiWorkflowNote:
        'Built using AI-assisted workflows for rapid prototyping of API response parsing while owning the UI architecture, state flow, edge-case debugging, and deployment.',
    },
  },
  {
    id: 'mirusync',
    title: 'MiruSync | Dual-Platform Anime & Manga Tracker',
    category: 'Full-Stack • Monorepo, Cross-Platform PWA & Native Android APK',
    summary:
      'A cross-platform media tracker connecting to MyAnimeList and AniList via OAuth2 + PKCE. Features offline-first IndexedDB delta sync (Dexie), live settings and notifications sync via Supabase Realtime, release calendar with .ics export, and an automated Android APK release pipeline.',
    techStack: [
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Capacitor',
      'Android',
      'Supabase',
      'Dexie (IndexedDB)',
      'TanStack Query',
      'AniList GraphQL',
      'MAL API v2',
      'Netlify / Vercel',
    ],
    status: 'shipped',
    featured: true,
    liveUrl: 'https://mirusync.vercel.app/',
    repoUrl: 'https://github.com/Mhelric/MiruSync',
    caseStudy: {
      problem:
        'Anime and manga fans are split between MyAnimeList and AniList, forced to deal with disparate interfaces, slow mobile browser apps, lack of offline support, and no unified cross-device settings sync.',
      role:
        'Architected and built the full monorepo (@mirusync/web, @mirusync/mobile, @mirusync/core), engineered unified adapter abstractions for MAL REST and AniList GraphQL, configured Supabase Realtime synchronization, and set up the Capacitor Android native release pipeline.',
      challenges:
        'Abstracting vastly different schema structures between AniList (GraphQL) and MyAnimeList (OAuth2 PKCE + REST) into a single unified MediaProvider interface, and designing an offline write queue that guarantees safe reconciliation once connection is restored.',
      outcome:
        'Deployed a blazing-fast responsive web app on Vercel and built a native Android APK with live episode push notifications, airing calendar, and real-time settings synchronization.',
      aiWorkflowNote:
        'Utilized AI-assisted engineering for rapid boilerplate generation across monorepo packages, GraphQL query schema definition, and complex regex/data-mapping rules while personally owning architecture, security, state management, and native bridge integration.',
    },
  },
  {
    id: 'school-mis-mockup',
    title: 'Sample School MIS — Academic & Student Portal',
    category: 'Full-Stack • Education MIS & Role-Based Dashboard',
    summary:
      'A clean Management Information System (MIS) mockup for a sample school featuring student enrollment, class schedules, attendance logs, grade encoding, and role-based Registrar, Faculty, and Student dashboards.',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vite'],
    status: 'in-progress',
  },
]
