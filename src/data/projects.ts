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
    id: 'upcoming-fullstack-app',
    title: 'Cloud Productivity & Developer Platform (Upcoming)',
    category: 'Full-Stack • Realtime & Cloud Architecture',
    summary:
      'Next full-stack project exploring realtime collaboration, performant state sync, and edge deployment.',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Vite'],
    status: 'in-progress',
  },
]
