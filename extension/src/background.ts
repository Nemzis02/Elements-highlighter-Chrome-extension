import { PARSE_HTML_MESSAGE_TYPE } from "~constants"

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === PARSE_HTML_MESSAGE_TYPE) {
    fetch(`${process.env.PLASMO_PUBLIC_API_URL}/api/parser/parse-web-page`, {
      method: "POST",
      body: JSON.stringify({ html: request.html }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          return sendResponse({ error: data.error.message })
        }

        return sendResponse({ data })
      })
      .catch((error) => {
        return sendResponse({ error: error.message })
      })

    return true
  }
})
