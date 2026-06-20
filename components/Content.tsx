export const Content = ({ head, body }: { head: string; body: string }) => {
  return (
    <div id="what-do-i-do" className="p-16 bg-gray-50 w-screen">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {head}
      </h2>
      <div className="mt-6 font-sans text-gray-600">{body}</div>
    </div>
  )
}
