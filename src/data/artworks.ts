export interface Artwork {
  id: string
  title: string
  category: string
  clientType: string
  src: string
  thumbSrc: string
  description: string
}

export const ARTWORKS: Artwork[] = [
  {
    id: 'idoltav-poster-commission',
    title: 'IdolTav × TheTavern Poster',
    category: 'Poster & Character Commission',
    clientType: 'Commission · meru_art',
    src: '/art/meru-art-bam-commission-2.webp',
    thumbSrc: '/art/thumbs/meru-art-bam-commission-2.webp',
    description:
      'Editorial-style full-body character commission featuring custom display typography, seated pose composition, and luminous halo accents.',
  },
  {
    id: 'deku-inktober-25',
    title: 'Deku — Dark Hero Split Portrait',
    category: 'Stylized Illustration · Inktober',
    clientType: 'Illustration · meru_art',
    src: '/art/meru-art-deku-fanart-inktober-25.webp',
    thumbSrc: '/art/thumbs/meru-art-deku-fanart-inktober-25.webp',
    description:
      'High-contrast split portrait juxtaposing Izuku Midoriya’s classic expression with his Dark Hero mask silhouette and One For All lightning effects.',
  },
  {
    id: 'meru-character-sheet',
    title: 'Meru — Character Reference Sheet',
    category: 'Character Sheet & Expressions',
    clientType: 'Concept Sheet · meru_art',
    src: '/art/meru-art-meru.webp',
    thumbSrc: '/art/thumbs/meru-art-meru.webp',
    description:
      'Complete character design sheet demonstrating full-body proportions, multi-angle head turnarounds, expression studies, and chibi mascot variants.',
  },
  {
    id: 'velimer-dnd',
    title: 'Velimer — D&D Character Portrait',
    category: 'Fantasy Character Illustration',
    clientType: 'Commission · meru_art',
    src: '/art/meru-art-velimer-dnd.webp',
    thumbSrc: '/art/thumbs/meru-art-velimer-dnd.webp',
    description:
      'Half-body character commission featuring custom horn silhouettes, heterochromia detail, and dynamic cape linework tailored to the player’s campaign brief.',
  },
  {
    id: 'frieren-party-march',
    title: 'Frieren, Stark & Fern — Journey Scene',
    category: 'Multi-Character Scene Illustration',
    clientType: 'Illustration · meru_art',
    src: '/art/meru-art-frieren-bg-fanart.webp',
    thumbSrc: '/art/thumbs/meru-art-frieren-bg-fanart.webp',
    description:
      'Wide horizontal scene capturing character personality and stride rhythm across Frieren, Stark, and Fern.',
  },
  {
    id: 'loona-commission',
    title: 'Loona — Stylized Academia Portrait',
    category: 'Expressive Character Commission',
    clientType: 'Commission · meru_art',
    src: '/art/meru-art-loona-helluva-commission.webp',
    thumbSrc: '/art/thumbs/meru-art-loona-helluva-commission.webp',
    description:
      'Bust commission emphasizing expressive facial acting, custom outfit styling, and accessory detailing.',
  },
  {
    id: 'kitsunegem-fullbody',
    title: 'KitsuneGem — Full-Body Design',
    category: 'Original Character & Costume Design',
    clientType: 'Commission · meru_art',
    src: '/art/meru-art-kitsunegem-full-body.webp',
    thumbSrc: '/art/thumbs/meru-art-kitsunegem-full-body.webp',
    description:
      'Full-body character illustration combining playful pastel candy motifs, expressive pose silhouette, and multi-tail composition.',
  },
  {
    id: 'academy-uniform',
    title: 'Military Academy Uniform Concept',
    category: 'Full-Body Stylized Illustration',
    clientType: 'Commission · meru_art',
    src: '/art/meru-art-commission-art.webp',
    thumbSrc: '/art/thumbs/meru-art-commission-art.webp',
    description:
      'Stylized full-body character piece emphasizing intricate curl textures, gold-trimmed uniform tailoring, and confident character posing.',
  },
  {
    id: 'floral-mask',
    title: 'Floral Mask — Half-Body Portrait',
    category: 'Stylized Portrait Commission',
    clientType: 'Commission · meru_art',
    src: '/art/meru-art-commission-art-1-2.webp',
    thumbSrc: '/art/thumbs/meru-art-commission-art-1-2.webp',
    description:
      'High-contrast character portrait balancing warm coral suit tones against a minimalist botanical mask motif.',
  },
  {
    id: 'robin-egghead',
    title: 'Nico Robin — Egghead Arc',
    category: 'Full-Body Character Illustration',
    clientType: 'Illustration · meru_art',
    src: '/art/meru-art-robin-egghex-1.webp',
    thumbSrc: '/art/thumbs/meru-art-robin-egghex-1.webp',
    description:
      'Clean full-body character rendering highlighting glossy jacket materials, futuristic boots, and crisp lineweight.',
  },
  {
    id: 'momo-ayase-study',
    title: 'Momo Ayase — Dynamic Pose Study',
    category: 'Figure & Lighting Study',
    clientType: 'Illustration · meru_art',
    src: '/art/meru-art-momo-ayase.webp',
    thumbSrc: '/art/thumbs/meru-art-momo-ayase.webp',
    description:
      'Dynamic figure study focusing on upper-body foreshortening, soft cel-shaded skin tones, and anatomical flow.',
  },
]
