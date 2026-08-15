# TSE Website 2026

Official website for Triton Software Engineering.

## Tech Stack

- Next.js
- React
- TypeScript
- Express.js
- ESLint
- Prettier
- Husky

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:3000.

### Backend

```bash
cd backend
npm install
npm run dev
```
Runs on http://localhost:3001.

### Linting

Run from either frontend or backend:

```bash
npm run lint
npm run format-check
```

### Automatically format files:

```bash
npm run format
```

## Build

### Frontend:

```bash
cd frontend
npm run build
```

### Backend:

```bash
cd backend
npm run build
npm start
```

## Git Hooks

Husky runs secret scanning, linting, and formatting checks before commits, and builds the frontend and backend before pushes.
