export const Content = ({ head, body }: { head: string; body: string }) => {
  return (
    <div id="what-do-i-do" className="bg-gray-50 w-screen pt-14">
      <div className="sticky top-0 z-10 bg-gray-50 px-16 py-3 border-b border-gray-200">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          {head}
        </h2>
      </div>
      <div className="px-16 py-10 font-sans text-gray-600">{body}</div>
    </div>
  )
}
