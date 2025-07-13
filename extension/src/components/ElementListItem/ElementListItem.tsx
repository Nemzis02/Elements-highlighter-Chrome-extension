import React from "react"

import Button from "../Button"
import type { ButtonProps } from "../Button/types"

interface ElementListItemProps {
  order: number
  title: string
  buttonProps: ButtonProps
}

const ElementListItem: React.FC<ElementListItemProps> = ({
  order,
  title,
  buttonProps
}) => {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-gap-4 plasmo-py-2 plasmo-px-4 plasmo-bg-white plasmo-rounded plasmo-border plasmo-border-gray-200">
      <span className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-w-8 plasmo-h-8 plasmo-rounded-full plasmo-bg-blue-400 plasmo-text-white">
        {order}
      </span>
      <span
        title={title}
        className="plasmo-flex-1 plasmo-text-center plasmo-text-base plasmo-font-medium plasmo-whitespace-nowrap plasmo-overflow-hidden plasmo-text-ellipsis">
        {title}
      </span>
      <Button {...buttonProps} />
    </div>
  )
}

export default React.memo(ElementListItem)
