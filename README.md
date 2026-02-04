# SkimBolt — AI Blog Summarizer Chrome Extension
(DEMO)[<a href="https://github.com/user-attachments/assets/d0df218e-ef04-4fd9-974b-9ff50b0dc34e">Demo</a>](https://github.com/user-attachments/assets/d0df218e-ef04-4fd9-974b-9ff50b0dc34e)
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
[<a href="https://github.com/user-attachments/assets/d0df218e-ef04-4fd9-974b-9ff50b0dc34e">Demo</a>](https://github.com/user-attachments/assets/d0df218e-ef04-4fd9-974b-9ff50b0dc34e)



## Screenshots 
<img width="449" height="796" alt="Screenshot 2026-02-02 at 3 13 28 PM" src="https://github.com/user-attachments/assets/edaa5212-c7c1-464d-ac75-771753e04a49" />
<img width="1435" height="796" alt="Screenshot 2026-02-02 at 3 14 39 PM" src="https://github.com/user-attachments/assets/77a837e5-92e5-40ea-850c-534df8982428" />
<img width="1421" height="808" alt="Screenshot 2026-02-02 at 3 15 00 PM" src="https://github.com/user-attachments/assets/83e31953-6436-44c1-8aff-f89e6f71c9b7" />



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
