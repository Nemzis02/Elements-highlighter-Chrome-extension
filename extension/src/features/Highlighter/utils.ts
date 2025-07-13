import { PARSE_HTML_MESSAGE_TYPE } from "~constants"
import type { ElementGroups } from "~types"

export const parseWebPage = async (): Promise<ElementGroups> => {
  return new Promise((resolve, reject) => {
    const bodyHtml = document.body.innerHTML

    chrome.runtime.sendMessage(
      { type: PARSE_HTML_MESSAGE_TYPE, html: bodyHtml },
      (response) => {
        if (response.error) {
          return reject(response.error)
        }

        if (response.data) {
          return resolve(response.data)
        } else {
          return reject(response.error)
        }
      }
    )
  })
}
