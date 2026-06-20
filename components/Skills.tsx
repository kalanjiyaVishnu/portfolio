import _ from "lodash"
import { getTools } from "../utils"

export const Skills = () => {
  const renderBlock = ([key, value]: [string, Array<string>]) => (
    <div key={key} className="border-t border-gray-200 pt-4">
      <span className="font-medium text-gray-900">{key.slice(1)}</span>
      <div className="mt-2 text-sm text-gray-500">{value.join(", ")}</div>
    </div>
  )
  return (
    <div id="skills">
      <div className="sticky top-[60px] z-10 bg-gray-100 px-16 pt-16 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Things I&apos;ve known
        </h2>
      </div>
      <div className="px-16 pb-16 pt-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8 w-full">
          {_.toPairs(getTools()).map(renderBlock)}
        </div>
      </div>
    </div>
  )
}
