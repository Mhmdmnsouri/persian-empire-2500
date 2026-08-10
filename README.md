# Persian Empire 2500

> **Status: actively in development.**

Persian Empire 2500 is a bilingual, scroll-driven 3D storytelling experience about selected artifacts and architectural elements of Persepolis. It is designed as a calm, guided journey: semantic HTML carries the historical narrative while a single persistent WebGL scene provides atmosphere and visual focus.

The project supports Persian (`/fa`, RTL) and English (`/en`, LTR) from the beginning.

## Experience Principles

- Scroll controls normalized journey progress.
- The journey controls sequence; stations control local meaning.
- The shared camera rig is the only owner of the Three.js camera.
- Camera position and look target are separate tracks.
- Essential narrative content remains semantic HTML, never Canvas-only.
- Each station has one dominant motion concept and must support reverse scrolling.
- Final assets remain replaceable; early work uses procedural or temporary placeholders.
- Accessibility, performance, mobile behavior, and reduced motion shape the implementation from the start.

## Technology

| Area             | Tools                             |
| ---------------- | --------------------------------- |
| Application      | Next.js, React, TypeScript        |
| 3D               | Three.js, React Three Fiber, Drei |
| Motion and state | GSAP / ScrollTrigger, Zustand     |
| Testing          | Vitest, Playwright                |
| Styling          | Tailwind CSS                      |
| Quality          | ESLint, Prettier, Husky           |

## Getting Started

### Prerequisites

- Node.js (current LTS recommended)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open one of the localized routes:

- `http://127.0.0.1:3000/en`
- `http://127.0.0.1:3000/fa`

### Available scripts

```bash
npm run dev           # Start the development server
npm run build         # Create a production build
npm run start         # Serve the production build
npm run lint          # Run ESLint
npm run format        # Format files with Prettier
npm run format:check  # Check formatting
npm run typecheck     # Run strict TypeScript checks
npm run test          # Run Vitest
npm run test:e2e      # Run Playwright tests
```

Install the Playwright browser before the first E2E run when needed:

```bash
npx playwright install chromium
```

## Repository Structure

```text
src/
  app/          App Router pages, global styles, and locale routes
  experience/   Persistent Canvas, scene root, and WebGL fallback boundary
  journey/      Scroll progress and journey orchestration
  stations/     Isolated story stations
  interface/    Semantic story and journey controls
  content/      Typed bilingual content
  assets/       Asset manifest and loading contracts
  store/        Lightweight shared Zustand state
  config/       Quality, performance, lighting, and accessibility contracts
  lib/          Shared pure utilities
  tests/        Unit, integration, and end-to-end tests

public/assets/  Runtime model, texture, audio, and fallback asset locations
docs/           Product, architecture, accessibility, motion, and test contracts
```

## Accessibility and Fallback

The experience is built around a non-negotiable rule: **HTML carries meaning; Canvas carries atmosphere.**

- Narrative remains available outside WebGL.
- Persian uses RTL direction and English uses LTR direction.
- WebGL failures fall back without blocking the story shell.
- Reduced-motion and keyboard behavior are first-class requirements for subsequent stations.
- No essential interaction may depend on hover or Canvas-only text.

## Development Workflow

Before submitting a completed change, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Keep changes focused. Do not add dependencies, stations, final assets, or major visual effects outside the current approved phase. Do not place historical claims in the application without following the content and source requirements.

## Documentation

The documentation in `docs/` is the implementation contract. Start with:

- `docs/SPEC.md` — product scope and requirements
- `docs/ARCHITECTURE.md` — module boundaries and runtime ownership
- `docs/MOTION_STORYBOARD.md` — station motion vocabulary
- `docs/CAMERA_SYSTEM.md` — shared camera rules
- `docs/ACCESSIBILITY.md` — inclusive interaction and fallback requirements
- `docs/PERFORMANCE_BUDGET.md` — performance constraints
- `docs/TEST_PLAN.md` — test strategy
- `docs/ROADMAP.md` — phased delivery plan
- `docs/DECISIONS.md` — accepted architectural decisions

Read `AGENTS.md` before making repository changes.

## Scope

This is not a full reconstruction, open-world tour, game, physics simulation, VR-first experience, or museum database. The MVP focuses on a guided sequence of an intro, Grand Stairway, Lamassu, Bull Capital, and outro before any expansion to the complete planned journey.

## License

License and historical asset attribution records will be added before production asset delivery.
