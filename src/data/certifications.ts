export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  location?: string
  signatory?: string
  description: string
  imageUrl: string
  thumbUrl: string
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
    thumbUrl: '/certificates/incub8-excellence-award-thumb.webp',
    pdfUrl: '/certificates/incub8-excellence-award.pdf',
    tags: ['Backend Development', 'Internship Excellence', 'Supabase & PostgreSQL'],
  },
  {
    id: 'mcdo-perfect-attendance',
    title: 'Certificate of Perfect Attendance',
    issuer: "McDonald's Cavite City",
    date: 'December 23, 2025',
    location: 'Caridad, Cavite City',
    signatory: 'Dovie Nina Hernandez (People Dept. Manager) & Erick Gonzales (Restaurant GM)',
    description:
      'Recognized for maintaining perfect attendance from Dec 1–15, demonstrating reliability and responsibility at McDonald’s Cavite City — J. Felipe Blvd.',
    imageUrl: '/certificates/mcdo-perfect-attendance.webp',
    thumbUrl: '/certificates/mcdo-perfect-attendance-thumb.webp',
    pdfUrl: '/certificates/mcdo-perfect-attendance.pdf',
    tags: ['Workplace Reliability', 'Punctuality', 'Service Operations'],
  },
  {
    id: 'bec-academic-excellence',
    title: 'Academic Excellence Award — With Honors',
    issuer: 'Batangas Eastern Colleges',
    date: 'June 17, 2022',
    location: 'San Juan, Batangas',
    signatory: 'Edna C. Espiritu, LPT, MSM (High School Principal) & SHS Faculty',
    description:
      'Awarded With Honors for academic excellence in Grade Twelve Science, Technology, Engineering, and Mathematics (STEM) for Academic Year 2021–2022.',
    imageUrl: '/certificates/bec-academic-excellence.webp',
    thumbUrl: '/certificates/bec-academic-excellence-thumb.webp',
    pdfUrl: '/certificates/bec-academic-excellence.pdf',
    tags: ['With Honors', 'STEM Strand', 'Academic Excellence'],
  },
  {
    id: 'cvsu-college-diploma',
    title: 'Bachelor of Science in Computer Science',
    issuer: 'Cavite State University — Cavite City Campus',
    date: 'July 28, 2026',
    location: 'Cavite City, Cavite',
    signatory: 'Maria Cristina J. Baesa · Cristina M. Signo · Ma. Agnes P. Nuestro',
    description:
      'Conferred the degree of Bachelor of Science in Computer Science by the Board of Regents upon recommendation of the Academic Council.',
    imageUrl: '/certificates/cvsu-college-diploma.webp',
    thumbUrl: '/certificates/cvsu-college-diploma-thumb.webp',
    pdfUrl: '/certificates/cvsu-college-diploma.pdf',
    tags: ['College Degree', 'Computer Science', 'Cavite State University', 'BSCS'],
  },
]
