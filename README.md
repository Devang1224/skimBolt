# SkimBolt — AI Blog Summarizer Chrome Extension

## Project Overview
SkimBolt is an AI-powered Chrome extension that instantly summarizes long-form blog posts and articles so users can understand key points without reading every word. It solves the problem of information overload by turning lengthy content into clear, bite-sized summaries right inside the browser.

## Key Features
- One-click summaries of blog posts and articles
- Fast, readable output optimized for skimming
- Side panel UI so users stay on the page they are reading
- Optional chat-style follow-up questions for deeper understanding
- Works across most public blog/article pages

## How It Works (High Level)
1. **Content extraction** from the current page
2. **AI summarization** via the backend service
3. **Output** rendered in the extension UI

## Demo Video
Add your demo link here: [Demo Video](https://your-demo-link.example)

## Screenshots (Optional)
Add screenshots here when available.

## Tech Stack
- **Frontend (Extension):** React, Vite, TypeScript, Tailwind CSS, CRXJS
- **Backend API:** Node.js, Express, TypeScript
- **AI Model:** Google Gemini (via `@google/genai` and LangChain)
- **Database:** PostgreSQL (Prisma ORM) and VectorDB
- **Cache/Queue:** Redis
- **Web App (Auth/Landing):** Next.js 

## Installation / Setup

### 1) Install dependencies
```
cd server
npm install

cd ../extension
npm install

cd ../web
npm install
```

### 2) Configure environment variables
See the **Configuration** section below.

### 3) Start the backend
```
cd server
npm run dev
```

### 4) (Optional) Start the web app
```
cd web
npm run dev
```

### 5) Build the extension
```
cd extension
npm run build
```

### 6) Load the extension in Chrome
1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `extension/dist` folder

## Configuration

### Backend (`server/.env`)
Create `server/.env` with the following variables:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public
PORT=3001
JWT_SECRET=your-secret
REDIS_URL=redis://localhost:6379
GOOGLE_API_KEY=your-google-genai-key
```

### Extension (`extension/.env`)
Create `extension/.env` with:

```
VITE_BACKEND_URL=http://localhost:3001
VITE_WEB_URL=http://localhost:3000
```

### Web App (Optional) (`web/.env.local`)
If you run the Next.js app for auth/sign-in:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
GOOGLE_CLIENT_ID = 'your_google_client_id'
GOOGLE_CLIENT_SECRET = 'your_google_client_secret'
NEXT_PUBLIC_API_URL = http://localhost:3001 (backend url)
NEXTAUTH_SECRET = 'your_nextauth_secret_key'
NEXT_PUBLIC_EXTENSION_ID = 'chrome_extension_id'
NODE_ENV = dev;
```

## Notes
- Run database migrations with Prisma if needed: `npx prisma migrate dev`
- Make sure Redis is running locally before starting the backend
