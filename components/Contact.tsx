import NextLink from 'next/link'
import { getSrcIcon, Link } from '../utils'

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
    <div
      key={type}
      className="bg-neutral-800 text-white rounded-md border border-neutral-700 border-opacity-10 p-1 flex text-center items-center overflow-hidden hover:-translate-y-1 transition-all transform duration-150 ease-in-out drop-shadow-sm"
    >
      <div className="w-10 text-white hover:text-slate-200 hover:opacity-90 opacity-70 transition-all transform duration-150 -translate-x-2 translate-y-2">
        {getSrcIcon(type)}
      </div>
      <NextLink
        href={ref}
        target={type === 'gmail' ? '_self' : '_blank'}
        rel="noreferrer"
        className="font-medium font-sans underline hover:no-underline flex-1 text-1xl"
      >
        <span className="font-medium capitalize">
          {type === 'gmail' ? 'Email' : type}
        </span>
      </NextLink>
    </div>
  )

  return (
    <div id="contact">
      <div className="sticky top-[60px] z-10 bg-gray-100 px-16 pt-16 pb-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl sm:items-end sm:text-end">
          So, Reach Out!
        </h2>
        <hr className="mt-4" />
      </div>
      <div className="px-16 pb-24 pt-6">
        <div className="font-sans text-gray-600 mb-6">
          Have an idea that needs a collaborator? Or just want to say hi? I&apos;m
          available across these platforms — pick your preference.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-3 w-full">
          {contactVia.map(renderBlock)}
        </div>
      </div>
    </div>
  )
}
