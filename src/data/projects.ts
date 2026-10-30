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
    id: 'pokedex-lens',
    title: 'Pokédex Web App with Visual Search',
    category: 'API Integration • Visual Recognition UI',
    summary:
      'An interactive Pokédex web application combining PokéAPI data with SerpAPI Google Lens visual recognition to identify Pokémon directly from uploaded or captured images.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'PokéAPI', 'SerpAPI (Google Lens)', 'Vercel'],
    status: 'shipped',
    featured: true,
    liveUrl: 'https://pokedex-delta-pearl.vercel.app/',
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
    id: 'upcoming-supabase-app',
    title: 'Full-Stack Workspace App (Upcoming)',
    category: 'Full-Stack • Auth & Realtime Database',
    summary:
      'Planned full-stack application demonstrating user authentication, row-level security (RLS), and persistent cloud data storage.',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Supabase', 'Vite'],
    status: 'in-progress',
  },
  {
    id: 'upcoming-creative-ui',
    title: 'Interactive Art & Commission Showcase Tool (Upcoming)',
    category: 'Design Engineering • Creative UI',
    summary:
      'Planned interactive web tool blending custom digital illustration with smooth frontend state management for commission pricing and briefing.',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Custom Illustration'],
    status: 'in-progress',
  },
]