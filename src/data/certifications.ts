export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  location?: string
  signatory?: string
  description: string
  imageUrl: string
  pdfUrl?: string
  tags: string[]
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'incub8-excellence-award',
    title: 'Excellence Award — Backend Developer Intern',
    issuer: 'Incub8 Space',
    date: 'September 4, 2025',
    location: 'Kawit, Cavite',
    signatory: 'John Daeniele DG. Satsatin (OJT Supervisor)',
    description:
      'Awarded in recognition of outstanding performance, dedication, leadership, and exceptional contributions as a Backend Developer Intern at Incub8 Space.',
    imageUrl: '/certificates/incub8-excellence-award.webp',
    pdfUrl: '/certificates/incub8-excellence-award.pdf',
    tags: ['Backend Development', 'Internship Excellence', 'Supabase & PostgreSQL'],
  },
]