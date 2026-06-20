import React from 'react'
import { z } from 'zod'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

export const getTimeLines = () => [
  {
    title: 'Software Engineer',
    description:
      'Joined Casa Retail AI as a full-stack engineer. Building production backend services, event-driven pipelines, and React frontends for a multi-tenant retail CRM SaaS. New environment, real scale, maturing fast.',
    date: 'AUG 2022',
    tags: ['Casa Retail AI'],
  },
  {
    title: 'Code & the Web',
    description:
      'Switched to Linux, ditched Windows. Discovered I could build things — not just use them. Dove into OS internals, programming, and software development. College projects, side projects, and more Linux than was strictly necessary.',
    date: 'COVID 2020',
  },
  {
    title: 'Games & Computers',
    description:
      'Started as a hardcore PC gamer with a losing streak I refuse to acknowledge. Spent hours diagnosing broken game configs and weird driver errors — accidentally became decent at debugging. Most productive era in hindsight.',
    date: 'MID 2019',
  },
]

export const getTools = () => ({
  ['1Languages']: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Java', 'Scala', 'SQL'],
  ['2Backend']: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'REST APIs', 'WebSockets', 'Sequelize', 'Prisma', 'Zod'],
  ['3Frontend']: ['React', 'Next.js', 'Remix', 'Tailwind CSS', 'Material UI', 'Radix UI', 'TanStack Query', 'Storybook'],
  ['4Data & Streaming']: ['PostgreSQL', 'ClickHouse', 'Elasticsearch', 'Redis', 'MySQL', 'Apache Kafka', 'Apache Spark'],
  ['5Cloud & DevOps']: ['AWS (Lambda, S3, SQS, SES)', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD'],
  ['6Practices & Tools']: ['TDD', 'System Design', 'PWA / Service Workers', 'Canvas API', 'Jest', 'Mocha', 'Vite', 'Git'],
})

const srcType = z.enum(['github', 'live', 'linkedin', 'gmail'])
export const Link = z.object({
  type: srcType,
  ref: z.string(),
})
export type Link = z.infer<typeof Link>

const Project = z.object({
  title: z.string(),
  description: z.string(),
  category: z.array(z.string()),
  tags: z.array(z.string()),
  links: z.array(Link),
  useCase: z.string().optional().nullable(),
})
export type Project = z.infer<typeof Project>

export const getProjects: () => Project[] = () => [
  {
    title: 'side-effects',
    description:
      'A community platform for anime fans — combines blog, real-time chat, and search. Users can track episodes, discover new series, and interact with content.',
    useCase: 'Full-stack community app: combined blog, chat, and search for anime.',
    category: ['Featured', 'Full Stack'],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase'],
    links: [
      { type: 'github', ref: 'https://github.com/kalanjiyaVishnu/anime-finder' },
      {
        type: 'live',
        ref: 'https://firbasebasic-cd494.web.app/anime/sentochihironokamikakushi/176',
      },
    ],
  },
  {
    title: 'My Portfolio',
    description: 'The site you are looking at — built with Next.js, Tailwind CSS, and TypeScript.',
    useCase: 'Personal portfolio.',
    category: ['Flexing'],
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'React'],
    links: [
      {
        type: 'github',
        ref: 'https://github.com/kalanjiyaVishnu/personal-website',
      },
    ],
  },
]

export const getProjectImages = (project: string): string[] => {
  const projectImageMap: { [key: string]: string[] } = {
    'side-effects': new Array(5)
      .fill(0)
      .map((_, i) => `/images/anime-finder-${i + 1}.png`),
  }
  return projectImageMap[project]
}

export const getSrcIcon = (src: string): React.ReactNode => {
  const map: { [key: string]: React.ReactNode } = {
    github: <FaGithub style={{ width: '100%', height: '100%' }} />,
    linkedin: <FaLinkedin style={{ width: '100%', height: '100%' }} />,
    gmail: <FaEnvelope style={{ width: '100%', height: '100%' }} />,
    live: <FiExternalLink style={{ width: '100%', height: '100%' }} />,
  }
  return map[src]
}
