# AI Text Transformer — React + Vite + Express + Gemini

A full-stack AI text transformer with:

- React + Vite
- Tailwind CSS v4 using `@tailwindcss/vite`
- Axios on the frontend
- Express 5 backend
- Google Gemini via the official `@google/genai` SDK
- Helmet security headers
- CORS
- Request validation
- Per-IP rate limiting
- Environment-based configuration

**Next.js is not used.**

## Project structure

```text
ai-text-transformer-vite/
├── src/                       # React frontend
│   ├── components/
│   ├── services/transformService.js
│   ├── App.jsx
│   └── main.jsx
├── server/                    # Express backend
│   ├── src/
│   │   ├── config/env.js
│   │   ├── controllers/transformController.js
│   │   ├── middleware/
│   │   ├── routes/transformRoutes.js
│   │   ├── services/geminiService.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── vite.config.js
└── package.json
```

## 1. Start the backend

Open a terminal:

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env` and add your Gemini API key:

```env
PORT=5000
GEMINI_API_KEY=your_real_key_here
GEMINI_MODEL=gemini-3.8-flash
CLIENT_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=30
MAX_TEXT_LENGTH=20000
```

Then run:

```bash
npm run dev
```

The API will run at `http://localhost:5000`.

Health check:

```text
GET http://localhost:5000/api/health
```

## 2. Start the frontend

In another terminal, from the project root:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

The Vite development proxy forwards `/api/*` to `http://localhost:5000`, so no frontend API URL is required during local development.

## API

### POST `/api/transform`

Request:

```json
{
  "mode": "summarize",
  "text": "Your text here"
}
```

Rewrite example:

```json
{
  "mode": "rewrite",
  "text": "Your text here",
  "tone": "Professional"
}
```

Translate example:

```json
{
  "mode": "translate",
  "text": "Hello, how are you?",
  "target": "Tamil"
}
```

Response:

```json
{
  "output": "AI generated result..."
}
```

## Important security note

Keep `GEMINI_API_KEY` **only in `server/.env`**. Never put the Gemini key in the React/Vite `.env` because Vite variables are exposed to browser code.

The backend also limits request size and transform frequency. The rate limit is configurable with `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX`.

## Production

Build the frontend:

```bash
npm run build
```

Then deploy the `dist` frontend and the `server` application separately, or serve the built frontend through your preferred production web server. Set `CLIENT_URL` to the real frontend origin.
