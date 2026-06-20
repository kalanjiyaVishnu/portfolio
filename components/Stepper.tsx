import React from "react"

type TimeLineItem = {
  title: string
  description: string
  date: string
  tags?: string[]
  projects?: { summary: string; stack: string }[]
}

export const Stepper: React.FC<{ timeLines: TimeLineItem[] }> = ({ timeLines }) => (
  <div className="timeline-container">
    {timeLines.map(({ date, description, title, tags, projects }, idx) => (
      <div
        className={`timeline ${idx == 0 && "active bg-white bg-opacity-5"}`}
        key={idx}
      >
        <div className="relative">
          <div className="dot" />
          <div className="pl-10">
            <span className="timeline-date">{date}</span>
            <div className="make-flex gap-4 items-center">
              <h3 className="timeline-head">{title}</h3>
              <div className="make-flex-c hidden md:block">
                {tags?.map((tag) => (
                  <div className="tag" key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <p className="timeline-body">{description}</p>

            {projects && projects.length > 0 && (
              <div className="mt-6 flex flex-col gap-4">
                {projects.map(({ summary, stack }, pIdx) => (
                  <div
                    key={pIdx}
                    className="border-l-2 border-teal-400 border-opacity-40 pl-4 py-1"
                  >
                    <p className="text-sm text-gray-300 leading-relaxed">{summary}</p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-widest text-gray-500 font-medium">
                      {stack}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)
