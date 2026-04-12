# College Buzz 🎓🐝

College Buzz is a campus hub that helps students discover events, join clubs, read notices, access academic resources, and chat with the Rizvi AI assistant.

## Features

- Discover feed with news, events, and trending topics
- Clubs directory with highlights and upcoming activities
- Notice board for campus announcements
- Academic resources section with downloadable files
- Rizvi AI chatbot powered by Google Gemini
- Firebase authentication (email/password + Google)
- Responsive, modern UI

## Tech Stack

**Frontend**
- React 19
- Vite 6
- Tailwind CSS 4
- Lucide Icons
- Motion

**Dev Server / API**
- Node.js + Express (see `server.ts`, in-memory data)

**Integrations**
- Firebase Auth
- Google Gemini API

**Optional Backend**
- Spring Boot 3 (`backend-java/`)
- Spring Data JPA + H2

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Optional backend: Java 17+ and Maven

### Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Configure environment
   ```bash
   cp .env.example .env
   ```
   Set `GEMINI_API_KEY` (and optionally `APP_URL`).

3. Configure Firebase
   Update `firebase-applet-config.json` with your Firebase credentials (for example, `apiKey`).

4. Start the dev server
   ```bash
   npm run dev
   ```
   The app runs at `http://localhost:3000` and exposes API routes under `/api`.

### Optional: Run the Spring Boot backend

```bash
cd backend-java
mvn spring-boot:run
```

The API runs on `http://localhost:8081` with an H2 console at `/h2-console`. To use it with the frontend, point the API base URL in `src/api/client.ts` to `http://localhost:8081/api` (or proxy requests to that port).

## Scripts

- `npm run dev` — start the Express + Vite dev server
- `npm run build` — build the frontend
- `npm run preview` — preview the production build
- `npm run lint` — typecheck with TypeScript

## Project Structure

```text
.
├── src/
│   ├── frontend/              # React UI
│   ├── api/                   # API client for /api routes
│   └── firebase.ts            # Firebase initialization
├── backend-java/              # Spring Boot API (optional)
├── server.ts                  # Express + Vite dev server
├── firebase-applet-config.json
├── .env.example
├── vite.config.ts
└── package.json
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request
