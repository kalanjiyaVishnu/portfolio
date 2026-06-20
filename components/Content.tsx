export const Content = ({ head, body }: { head: string; body: string }) => {
  return (
    <div id="what-do-i-do" className="bg-gray-50 w-screen">
      <div className="sticky top-[60px] z-10 bg-gray-50 px-16 pt-16 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {head}
        </h2>
      </div>
      <div className="px-16 pb-16 pt-6 font-sans text-gray-600">{body}</div>
    </div>
  )
}
