import NextLink from 'next/link'
import { getSrcIcon, Link } from '../utils'
import { WaveTop } from './Wave'

const contactVia: Link[] = [
  {
    ref: 'https://github.com/kalanjiyaVishnu',
    type: 'github',
  },
  {
    ref: 'https://www.linkedin.com/in/kalanjiyaVishnu',
    type: 'linkedin',
  },
  {
    ref: 'mailto:kalanjiya.vishnu01@gmail.com',
    type: 'gmail',
  },
]

export const Contact = () => {
  const renderBlock = ({ ref, type }: Link) => (
    <NextLink
      href={ref}
      target={type === 'gmail' ? '_self' : '_blank'}
      rel="noreferrer"
      key={type}
      className="group flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white border border-neutral-700 border-opacity-10 px-6 py-4 rounded-lg transition-all duration-300 ease-out shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
        {getSrcIcon(type)}
      </div>
      <span className="text-sm font-medium tracking-wide uppercase font-sans">
        {type === 'gmail' ? 'Email' : type}
      </span>
    </NextLink>
  )

  return (
    <div id="contact" className="text-white">
      <WaveTop />
      <div className="bg-neutral-900 py-10 pb-24">
        <div className="px-6 md:px-16 py-3 border-b border-white border-opacity-10 mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">So, Reach Out!</h2>
        </div>
        <div className="font-sans text-gray-400 mb-6 px-6 md:px-16">
          Have an idea that needs a collaborator? Or just want to say hi? I&apos;m
          available across these platforms — pick your preference.
        </div>
        <div className="px-6 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3 w-full">
            {contactVia.map(renderBlock)}
          </div>
        </div>
      </div>
    </div>
  )
}
