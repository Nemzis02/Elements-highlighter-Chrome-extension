import clsx from "clsx"
import React from "react"

import type { ButtonProps } from "./types"

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={clsx(
        "plasmo-bg-blue-400 plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded plasmo-font-medium",
        className
      )}
      {...props}>
      {props.children}
    </button>
  )
}

export default Button
