# Hospital Appointment & Token Management System

MERN starter implementation based on the supplied SRS.

## Included in this build
- React + Vite + Tailwind-style responsive admin UI
- Express REST API + MongoDB/Mongoose
- Login, JWT authentication, server-side role checks
- Patient registration/list/search
- Department and doctor master data
- Appointment booking with basic slot-capacity validation
- Walk-in check-in and sequential daily token allocation
- Queue snapshot and Socket.IO queue events
- Dashboard summary
- Environment-based configuration and demo admin seeding

This is an MVP foundation, not a certified production hospital system. The SRS modules for complete clinical records, prescriptions, billing/refunds, notifications, exports, branch isolation, full audit coverage and integrations need additional implementation and hospital UAT. Authenticated screens of the reference site were not publicly inspectable, so this project does not claim one-to-one parity.

## Requirements
- Node.js 20+
- MongoDB 7+ (local or Atlas)

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run seed:admin
npm run dev
```
On Windows PowerShell, copy the env file with:
```powershell
Copy-Item .env.example .env
```

### 2. Frontend
Open another terminal:
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## Demo admin
The seed script creates an admin using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `server/.env`.
Set your own strong password before running the seed. Do not commit `.env`.

## API base
`http://localhost:5000/api`

## Important security notes
- Change all secrets and demo credentials.
- Use HTTPS, secure cookies/session strategy, rate limiting, SMTP reset flow, backups and monitoring before production.
- Clinical information is not included in public queue socket payloads.
- Do not use real patient data in development.
