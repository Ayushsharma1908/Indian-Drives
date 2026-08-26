# Indian Drives

Indian Drives is a hackathon prototype for learner licence, driving licence, appointment booking, licence services, mock payments, notifications, and Ask Indian Drives AI.

The frontend uses the supplied Stitch export as the visual reference: Civic Trust colors, flat bordered cards, a journey cockpit, bento dashboard, structured consoles, and Framer Motion transitions.

## Run Locally

```bash
npm run install:all
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

Demo login accepts any email/mobile and password. The seeded user is `Ayush Kumar`.

## Environment

Copy `.env.example` to `backend/.env` for backend settings. `MONGODB_URI` and `GEMINI_API_KEY` are optional for the local demo; without them the backend uses an in-memory data store and deterministic AI responses.

## Core Flow

1. Login
2. Open Dashboard
3. Choose "I Have Learner Licence"
4. Verify `JH26/LL/123456` with DOB `2004-05-12`
5. Complete DL application, documents, payment, and appointment booking
6. Trigger PASS on the appointment screen
7. View issued digital DL

## Working Mock Services

- Renewal
- Duplicate Licence
- Address Update
- Personal Details Update

Each service creates a mock request, reference ID, and notification.

## Languages

The language selector updates the primary shell, journey, service, form, action, status, and page copy. Hindi has full coverage; Bengali, Tamil, Telugu, and Marathi localize the core navigation and service surfaces with English fallback for secondary copy.

## Deployment

Deploy `frontend` to Vercel and `backend` to Render. Set `VITE_API_BASE_URL` in Vercel to the Render API URL and configure `CLIENT_ORIGIN` in Render to the Vercel domain.
