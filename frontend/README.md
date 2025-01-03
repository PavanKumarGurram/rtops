# RTOPS Frontend

Angular-based frontend application with real-time updates and Material UI.

## Features

- Real-time order tracking
- Inventory management dashboard
- Sales analytics visualization
- Responsive material design
- WebSocket integration for live updates

## Prerequisites

- Node.js 18+
- npm 9+
- Angular CLI 16+

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
# Edit environment.ts with your settings
```

3. Start development server:
```bash
npm start
# Access at http://localhost:4200
```

## Project Structure

```
src/
├── app/
│   ├── components/    # Reusable UI components
│   ├── core/         # Core services and guards
│   ├── features/     # Feature modules
│   ├── models/       # TypeScript interfaces
│   └── shared/       # Shared utilities
├── assets/           # Static assets
└── environments/     # Environment configurations
```

## Building

```bash
# Production build
npm run build

# Development build
npm run build:dev
```

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# Lint
npm run lint
```

## Docker Build

```bash
docker build -f Dockerfile.frontend -t rtops/frontend .
```

## Code Style

- Follow Angular style guide
- Use TypeScript strict mode
- Maintain 80% test coverage