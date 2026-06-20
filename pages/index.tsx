import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
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
      <FloatingResume />
      <Hero />
      <Me />
      <Skills />
      <Projects />
      <Content {...content['SectionWhatDoIDO']} />
      <Contact />
    </div>
  )
}

/** Fixed resume button — floats into view only when the Reach Out section is visible */
const FloatingResume = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={RESUME_PATH}
      target="_blank"
      rel="noreferrer"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-neutral-800 text-white text-xs uppercase tracking-widest px-5 py-3 rounded-full shadow-xl transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <FaDownload className="w-3 h-3" />
      Resume
    </a>
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
        <div className="mt-2">
          <a
            href="#about"
            className="btn-flip"
            data-back="ME"
            data-front="About"
          />
        </div>
      </div>
    </main>
  </div>
)

const Me = () => (
  <div id="about" className="bg-neutral-900 border-t-2 border-white text-white">
    <div className="sticky top-[60px] z-10 bg-neutral-900 px-16 pt-16 pb-4">
      <Title title="Vishnu J" float="right">
        <p className="text-xs md:text-sm font-normal flex-nowrap text-gray-400">
          Full-stack engineer. Ships production backend and frontend systems.
          Based in Chennai.
        </p>
      </Title>
    </div>
    <div className="px-16 pb-16">
      <TimeLine />
    </div>
  </div>
)

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
  <div id="projects" className="bg-neutral-900 border-t text-white">
    <div className="sticky top-[60px] z-10 bg-neutral-900 px-16 pt-16 pb-4">
      <Title title="Things I've built" float="left" />
    </div>
    <div className="px-16 pb-16">
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

  const getWidth = () =>
    sliderRef.current ? sliderRef.current.clientWidth : 100

  const moveToNextSlide = useCallback(() => {
    if (id === images.length - 2) {
      setIsIncrement(false)
    } else if (id === 0) {
      setIsIncrement(true)
    }
    setId(isIncrement ? id + 1 : id - 1)
  }, [id, images.length, isIncrement])

  useEffect(() => {
    const interval = setInterval(moveToNextSlide, 2000)
    return () => clearInterval(interval)
  }, [moveToNextSlide])

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
