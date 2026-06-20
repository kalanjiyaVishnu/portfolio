import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Skills } from '../components/Skills'
import { Stepper } from '../components/Stepper'
import { Title } from '../components/Title'
import {
  getProjectImages,
  getProjects,
  getSrcIcon,
  getTimeLines,
  type Project,
} from '../utils'
import { Content } from '../components/Content'
import { content } from '../constants'
import { Contact } from '../components/Contact'
import { FaDownload } from 'react-icons/fa'

const RESUME_PATH = '/resume/Kalanjiya Vishnu J — Resume.pdf'

export default function Home() {
  return (
    <div>
      <Hero />
      <Me />
      <Skills />
      <Projects />
      <Content {...content['SectionWhatDoIDO']} />
      <Contact />
    </div>
  )
}

const Hero = () => (
  <div className="relative h-screen overflow-hidden">
    <Rocket />
    <main
      id="hero"
      className="w-4/5 m-auto h-full flex items-center justify-center z-10 relative"
    >
      <div className="flex flex-col p-2 justify-center w-fit -mt-20 gap-4">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
          Full-stack Engineer
        </p>
        <p className="text-2xl md:text-6xl font-medium leading-tight">
          Developer,{' '}
          <span className="relative group inline-block">
            <span className="line-through opacity-30 decoration-gray-500">
              YouTuber
            </span>
            <span className="absolute -top-5 left-0 text-[10px] uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-normal pointer-events-none">
              formerly
            </span>
          </span>
        </p>
        <p className="text-sm font-normal text-gray-400">
          — Chennai, India &middot; 3+ years in production
        </p>
        <div className="flex items-center gap-3 mt-2">
          <a
            href="#about"
            className="btn-flip"
            data-back="ME"
            data-front="About"
          />
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-colors duration-150 border border-gray-300 rounded px-4 py-2"
          >
            <FaDownload className="w-3 h-3" />
            Resume
          </a>
        </div>
      </div>
    </main>
  </div>
)

const Me = () => {
  return (
    <div
      id="about"
      className="bg-neutral-900 border-t-2 border-white text-white h-auto p-16 relative"
    >
      <Title title="Vishnu J" float="right">
        <p className="text-xs md:text-sm font-normal flex-nowrap text-gray-400">
          Full-stack engineer. Ships production backend and frontend systems.
          Based in Chennai.
        </p>
      </Title>
      <TimeLine />
    </div>
  )
}

const TimeLine = () => (
  <>
    <div className="text-sm rounded-sm md:ml-2 mt-3 py-2 px-10 text-center sm:text-left border-l-2 border-r-2 sm:border-r-0 border-gray-200">
      A few things that happened along the way...
    </div>
    <Stepper timeLines={getTimeLines()} />
  </>
)

const Rocket = () => (
  <div className="absolute top-40 -left-64 xl:block xl:top-40 xl:-left-40 opacity-85 pointer-events-none select-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#222"
      height="24rem"
      viewBox="0 0 24 24"
    >
      <path d="M23 0l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-8.698 6.825l-1.439-.507 5.701-5.215 1.436.396-5.698 5.326zm3.262 4.287l-1.323-.565 4.439-4.503 1.32.455-4.436 4.613zm-4.083.387l-1.481-.507 8-7.89 1.437.397-7.956 8z" />
    </svg>
  </div>
)

const Projects = () => (
  <div id="projects" className="bg-neutral-900 border-t h-max text-white">
    <div className="p-16">
      <Title title="Things I've built" float="left" />
      <ProjectsContainer />
    </div>
  </div>
)

const ProjectsContainer = () => {
  const renderProject = (p: Project) => {
    const projectImages = getProjectImages(p.title)
    return (
      <div
        className="grid p-4 md:grid-flow-col md:grid-cols-2 gap-4 h-auto overflow-hidden rounded-md bg-white bg-opacity-5"
        key={p.title}
      >
        <div className="p-2 flex flex-col justify-between">
          <div>
            <p className="text-xs">{p.category.join(' · ')}</p>
            <h1 className="text-4xl font-medium relative">{p.title}</h1>
            <p className="text-sm mt-4 px-4 border-teal-300 border-l-4">
              {p.description}
            </p>
            <div className="flex justify-end px-8 mt-3">
              {p.links.map((link, idx) => (
                <a
                  href={link.ref}
                  rel="noreferrer"
                  target="_blank"
                  key={`${p.title}-${idx}`}
                >
                  <div className="w-8 p-2 text-slate-300 hover:text-white hover:opacity-90 opacity-60 transition-all transform duration-150">
                    {getSrcIcon(link.type)}
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="sm:mt-6 text-xs opacity-30">{p.tags.join(', ')}</div>
        </div>
        {p.category.includes('Featured') && (
          <Slider id={1} images={projectImages || []} />
        )}
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-4 mt-10">
      {getProjects().map(renderProject)}
    </div>
  )
}

const Slider = ({ images }: { id: number; images: string[] }) => {
  const [id, setId] = useState(0)
  const [isIncrement, setIsIncrement] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(moveToNextSlide, 2000)
    return () => clearInterval(interval)
  }, [id])

  const getWidth = () =>
    sliderRef.current ? sliderRef.current.clientWidth : 100

  const moveToNextSlide = () => {
    if (id === images.length - 2) {
      setIsIncrement(false)
    } else if (id === 0) {
      setIsIncrement(true)
    }
    setId(isIncrement ? id + 1 : id - 1)
  }

  return (
    <div
      className="rounded-md shadow-md overflow-hidden border-white border-2 border-opacity-10 opacity-70 hover:opacity-90 transition-opacity transform duration-300 ease-in-out"
      ref={sliderRef}
    >
      <div
        style={{ transform: `translateX(-${id * getWidth()}px)` }}
        className="flex transform-gpu transition-all duration-1000"
      >
        {images.map((src, idx) => (
          <Image
            className="rounded-md object-cover border border-black"
            src={src}
            alt={src}
            width={1920}
            height={1080}
            key={idx}
          />
        ))}
      </div>
    </div>
  )
}
