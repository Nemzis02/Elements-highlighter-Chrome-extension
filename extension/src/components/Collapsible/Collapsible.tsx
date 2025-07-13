import clsx from "clsx"
import React, { useState } from "react"

import Arrow from "~icons/Arrow"

interface Props {
  title: string
  children: React.ReactNode
}

const Collapsible: React.FC<Props> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen((open) => !open)
  }

  return (
    <div className="plasmo-w-full plasmo-bg-white plasmo-rounded-md plasmo-mb-4 plasmo-border plasmo-border-gray-200">
      <button
        className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-w-full plasmo-px-4 plasmo-py-3 plasmo-text-left plasmo-font-medium plasmo-text-gray-900 plasmo-bg-white plasmo-rounded-t-md"
        onClick={handleClick}
        aria-expanded={isOpen}>
        <span>{title}</span>
        <Arrow
          className={clsx(
            "plasmo-w-5 plasmo-h-5 plasmo-transition-transform plasmo-duration-200",
            isOpen && "plasmo-rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="plasmo-px-4 plasmo-py-3 plasmo-bg-gray-50 plasmo-rounded-b-md plasmo-text-gray-700">
          {children}
        </div>
      )}
    </div>
  )
}

export default React.memo(Collapsible)
