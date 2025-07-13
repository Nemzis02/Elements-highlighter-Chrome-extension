import React from "react"

const Loader: React.FC = () => {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center">
      <div className="plasmo-animate-spin plasmo-rounded-full plasmo-h-12 plasmo-w-12 plasmo-border-4 plasmo-border-solid plasmo-border-blue-500 plasmo-border-t-transparent" />
    </div>
  )
}

export default Loader
