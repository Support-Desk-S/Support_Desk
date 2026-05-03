# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

# Frontend - Support Desk

Welcome to the Frontend for the Support Desk application. This repository contains the Vite + React single-page application that powers the web UI, admin dashboard, and embeddable chat widget used by the Support Desk system.

## Overview

This frontend provides:
- A responsive admin dashboard for managing tenants, tickets, agents, and integrations.
- Public-facing pages and authentication flows (login / register).
- An embeddable chat widget served from `public/widget.js` for customer support interactions.
- Client-side state management using Redux Toolkit and async services.

The app is built with Vite, React, Tailwind CSS, and Axios for API requests.

## Key Features

- Tenant-aware UI and routes
- Ticket listing and detail views
- Agent management and onboarding flows
- Settings and integration sections (profile, workspace, security)
- Small, embeddable chat widget for customer websites

## Tech Stack

- Framework: React (JSX)
- Bundler: Vite
- State Management: Redux Toolkit
- Styling: Tailwind CSS
- HTTP: Axios
- Linting: ESLint

## Project Structure (important folders)

- `src/` — Application source code
	- `app/` — Root app components, routing, and store setup
	- `features/` — Domain features (auth, dashboard, tickets, widgets, agents, etc.)
	- `lib/axios.js` — Axios instance and helpers
	- `shared/` — Reusable UI components and layout
- `public/` — Static assets (including `widget.js`) that are served as-is

## Prerequisites

- Node.js v18+ (recommended) and npm
- Internet access to install dependencies

## Environment

Create a `.env` at the project root (if needed). Typical variables used by the frontend may include:

```
VITE_API_BASE_URL=https://api.example.com
VITE_WIDGET_MODE=production
```

Adjust these variables to point to your backend or staging environment.

## Installation

Run the following inside the `Frontend` directory:

```bash
npm install
```

## Development

Start the Vite development server with:

```bash
npm run dev
```

This enables fast HMR and local development at `http://localhost:5173` (default). The app will make API calls to the URL configured by `VITE_API_BASE_URL`.

## Linting

Run ESLint with:

```bash
npm run lint
```

Fixable issues can be addressed by your editor or by running ESLint with an auto-fix option where appropriate.

## Build & Preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Embeddable Widget

The `public/widget.js` file contains the embeddable chat widget that can be included on external websites. The widget is a lightweight script that talks to the backend and renders the UI in-site.

If you change widget code, rebuild the frontend and deploy the `dist` artifacts or copy the updated `widget.js` to your CDN or hosting location.

## Contributing

- Follow the existing code style and patterns in `src/`.
- Open issues for bugs and feature requests.
- Submit pull requests against the `main` branch with a clear description and testing notes.

## Troubleshooting

- If API calls fail, verify `VITE_API_BASE_URL` and backend availability.
- For styling/layout issues, rebuild after clearing caches: delete `node_modules/.vite` and restart the dev server.

## Useful Commands

- `npm install` — Install dependencies
- `npm run dev` — Start development server (Vite)
- `npm run build` — Build for production
- `npm run preview` — Preview a production build
- `npm run lint` — Run ESLint

## Where to go next

- Backend integration lives in the sibling `Backend` folder — ensure the backend is running when developing features that call APIs.
- See `src/features/*` for feature-specific implementation and `shared/components` for reusable UI.
