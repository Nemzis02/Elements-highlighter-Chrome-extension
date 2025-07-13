import { useState } from "react"

import type { ElementGroup, ElementGroups } from "~types"
import { promiseWithRetry } from "~utils"

import { HIGHLIGHT_BACKGROUND_COLOR, HIGHLIGHT_BORDER } from "./constants"
import type { StyleCache } from "./types"
import { parseWebPage } from "./utils"

export const useHighlighter = () => {
  const [data, setData] = useState<ElementGroups | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const [stylesCache, setStylesCache] = useState<
    Record<ElementGroup["selector"], StyleCache>
  >({})

  const toggleElementHighlight = ({ selector }: ElementGroup) => {
    const element = document.querySelector(selector) as HTMLElement

    if (!element) {
      return
    }

    const styleCache = stylesCache[selector]

    const isHighlighted =
      element.style.backgroundColor === HIGHLIGHT_BACKGROUND_COLOR &&
      element.style.border === HIGHLIGHT_BORDER

    if (isHighlighted) {
      element.style.border = styleCache.border
      element.style.backgroundColor = styleCache.backgroundColor

      setStylesCache((prev) => {
        const newStylesCache = { ...prev }
        delete newStylesCache[selector]
        return newStylesCache
      })
    } else {
      const currentElementBackgroundColor = element.style.backgroundColor
      const currentElementBorder = element.style.border

      setStylesCache((prev) => ({
        ...prev,
        [selector]: {
          backgroundColor: currentElementBackgroundColor,
          border: currentElementBorder
        }
      }))

      element.style.border = HIGHLIGHT_BORDER
      element.style.backgroundColor = HIGHLIGHT_BACKGROUND_COLOR
    }
  }

  const analyzePage = async () => {
    setIsInitialized(true)
    setIsLoading(true)

    try {
      const data = await promiseWithRetry(parseWebPage)
      setData(data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data,
    isLoading,
    isInitialized,
    error,
    toggleElementHighlight,
    stylesCache,
    analyzePage
  }
}
