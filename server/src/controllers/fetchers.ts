import grokClient from '../clients/grokClient';

export const fetchHTMLElements = async (html: string) => {
  const prompt = `
    I’m providing the HTML content of a webpage’s <body> tag. Your task is to analyze the HTML,
    identify elements with specific accessibility patterns (e.g., navigation, disclosure, button, textbox, spinbutton, or others),
    and extract their unique CSS selectors, unique accessible names within a group (from aria-label, aria-labelledby, text content, or other relevant attributes),
    and order element number within a page from top to bottom. Return the result as a JSON object where each key is a pattern (string)
    and each value is an array of objects with "selector" (unique CSS selector), "accessibleName" (string), "orderNumber" (number).
    If no accessible name is available, use the element’s text content or an empty string.

    Here’s the expected JSON format:

    {
      "navigation": [
        {"selector": ".nav-link", "accessibleName": "Home", "orderNumber": 1},
        {"selector": ".nav-link", "accessibleName": "About", "orderNumber": 2}
      ],
      "disclosure": [
        {"selector": ".dropdown", "accessibleName": "Select", "orderNumber": 3}
      ],
      "button": [
        {"selector": "button", "accessibleName": "Toggle calendar", "orderNumber": 4}
      ]
    }

    Here’s the HTML content to analyze:
    ${html}

    Return only the JSON object with the parsed results, following the format above.
  `;

  const completion = await grokClient.chat.completions.create({
    model: 'grok-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert in web accessibility and HTML parsing.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
};
