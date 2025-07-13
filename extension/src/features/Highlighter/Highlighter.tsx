import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import clsx from "clsx"
import capitalize from "lodash/capitalize"
import isEmpty from "lodash/isEmpty"
import React from "react"

import Button from "~components/Button"
import Collapsible from "~components/Collapsible"
import ElementListItem from "~components/ElementListItem"
import Loader from "~components/Loader"
import Title from "~components/Title"
import Drag from "~icons/Drag"

import { useHighlighter } from "./hooks"

const Highlighter: React.FC<any> = ({ position }) => {
  const {
    data,
    isLoading,
    isInitialized,
    error,
    toggleElementHighlight,
    stylesCache,
    analyzePage
  } = useHighlighter()

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-highlighter"
  })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    position: "absolute",
    top: position.y,
    left: position.x
  }

  const isNoData = isEmpty(data) && !isLoading && !error
  const tryAgainButton = <Button onClick={analyzePage}>Try again</Button>

  const initializedContent = (
    <div className="plasmo-flex plasmo-flex-col plasmo-gap-2 plasmo-items-center plasmo-justify-center plasmo-h-full">
      <Button onClick={analyzePage}>
        <span>
          <span className="plasmo-text-red-400">A</span>
          <span className="plasmo-text-orange-400">n</span>
          <span className="plasmo-text-amber-400">a</span>
          <span className="plasmo-text-yellow-400">l</span>
          <span className="plasmo-text-lime-400">y</span>
          <span className="plasmo-text-green-400">z</span>
          <span className="plasmo-text-emerald-400">e</span>
          <span>&nbsp;</span>
          <span className="plasmo-text-teal-400">P</span>
          <span className="plasmo-text-fuchsia-400">a</span>
          <span className="plasmo-text-pink-400">g</span>
          <span className="plasmo-text-rose-400">e</span>
        </span>
      </Button>
    </div>
  )

  const errorContent = (
    <div className="plasmo-flex plasmo-flex-col plasmo-gap-2 plasmo-items-center plasmo-justify-center plasmo-h-full">
      <span>Error: {error}</span>
      {tryAgainButton}
    </div>
  )

  const noDataContent = (
    <div className="plasmo-flex plasmo-flex-col plasmo-gap-2 plasmo-items-center plasmo-justify-center plasmo-h-full">
      <span>No data found</span>
      {tryAgainButton}
    </div>
  )

  const dataEntries = Object.entries(data || {})

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="plasmo-flex plasmo-flex-col plasmo-absolute plasmo-right-0 plasmo-bottom-0 plasmo-w-96 plasmo-min-h-96 plasmo-max-h-96 plasmo-bg-white plasmo-p-3 plasmo-shadow-md plasmo-overflow-hidden">
      <div
        {...listeners}
        {...attributes}
        className="plasmo-cursor-move plasmo-select-none plasmo-flex plasmo-items-center plasmo-gap-2 plasmo-mb-2">
        <Drag />
        <span>Drag here</span>
      </div>

      <Title />

      <div className="plasmo-border-b plasmo-border-gray-200 plasmo-my-2" />

      <div className="plasmo-mt-2 plasmo-h-full plasmo-overflow-y-auto">
        {isNoData && isInitialized && noDataContent}
        {!isInitialized && initializedContent}

        {isLoading && (
          <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-full">
            <Loader />
          </div>
        )}

        {error && errorContent}

        {dataEntries.map(([group, elements]) => {
          return (
            <Collapsible key={group} title={capitalize(group)}>
              <div className="plasmo-flex plasmo-flex-col plasmo-gap-2">
                {elements.map((element) => {
                  const isHighlighted = stylesCache[element.selector]

                  return (
                    <ElementListItem
                      key={element.accessibleName}
                      order={element.orderNumber}
                      title={capitalize(element.accessibleName)}
                      buttonProps={{
                        onClick: () => {
                          toggleElementHighlight(element)
                        },
                        children: clsx({
                          Highlight: !isHighlighted,
                          Unhighlight: isHighlighted
                        }),
                        className: clsx({
                          "plasmo-bg-emerald-500": isHighlighted
                        })
                      }}
                    />
                  )
                })}
              </div>
            </Collapsible>
          )
        })}
      </div>
    </div>
  )
}

export default Highlighter
