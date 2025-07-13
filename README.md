## Getting Started

1. Clone the repository;
2. Update the configuration files at `extension/.env` and `server/.env` if it is needed. **Note:** The `GROK_API_KEY` in `server/.env` must be provided manually for the server to access Grok services:

### `extension/.env`

```env
# API endpoint for the backend server
PLASMO_PUBLIC_API_URL=http://localhost:3000
```

---

### `server/.env`

```env
# Port for the server
PORT=3000

# Node environment
NODE_ENV=development

# Grok API Key (required)
GROK_API_KEY=your-grok-api-key-here

# Grok URL
GROK_BASE_URL=https://api.x.ai/v1
```

3. In the root folder run the next commands:

```bash
npm install --global yarn
yarn global add concurrently
yarn dev
```

Open your Chrome browser and load the development build by navigating to `chrome://extensions/`, enabling "Developer mode," and selecting "Load unpacked." Then choose the `build/chrome-mv3-dev` directory.

---

## What to Expect

If everything is set up correctly, you will see the injected panel appear on web pages in your browser. This panel allows you to interact with the extension's features directly on the page.

```markdown
![Injected Panel Example](/assets/screenshot.png)
```
