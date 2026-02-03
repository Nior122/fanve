# FanDirectory

A React-based directory application for browsing and searching content creators.

## Overview
- **Purpose**: Directory listing and search for content creators
- **Current State**: Working frontend application
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS (CDN)

## Project Architecture
- **Frontend**: Single-page React application with React Router
- **Build Tool**: Vite
- **Styling**: Tailwind CSS via CDN
- **Entry Point**: `index.tsx` → `components/App.tsx`

## Key Files
- `vite.config.ts` - Vite configuration (port 5000, all hosts allowed)
- `index.html` - HTML entry point with import maps
- `index.tsx` - React app bootstrap
- `components/` - React components
- `services/` - Data services and mock data
- `public/` - Static assets

## Running the Application
```bash
npm run dev
```
The application runs on port 5000.

## Environment Variables
- `GEMINI_API_KEY` - Optional API key for AI features

## Recent Changes
- 2026-02-03: Configured for Replit environment (port 5000, allowed all hosts)
