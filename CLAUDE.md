# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Club Correcaminos — a React + TypeScript web app for an exclusive marathon running club community based in Monterrey, Mexico. Built with Lovable. All UI text is in Spanish.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint
npm run test         # Run tests once (vitest)
npm run test:watch   # Watch mode tests
```

Package manager: Both bun (`bun.lockb`) and npm (`package-lock.json`) are present.

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Supabase

**Routing:** React Router v6 with Framer Motion page transitions (`AnimatedRoutes` in `App.tsx`). All routes are in Spanish:
`/`, `/lo-que-somos`, `/directorio`, `/hall-of-fame`, `/numeros`, `/galeria`, `/diario`, `/formar-parte`, `/gear`, `/contacto`

**Path alias:** `@/*` maps to `./src/*`

**Key directories:**
- `src/pages/` — Route page components
- `src/components/ui/` — shadcn/ui primitives (48 components, Radix-based)
- `src/components/layout/` — Header, Footer, Layout wrapper
- `src/integrations/supabase/` — Supabase client (`client.ts`) and auto-generated DB types (`types.ts`)
- `src/data/mockMiembros.ts` — Mock member data (currently used instead of live Supabase queries)
- `src/types/miembro.ts` — `Miembro` TypeScript interface
- `supabase/migrations/` — SQL migrations for the `members` table

**Data layer:** Supabase (PostgreSQL) with TanStack React Query for caching. The client is initialized in `src/integrations/supabase/client.ts` using `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from `.env`.

**Forms:** React Hook Form + Zod validation (see `/formar-parte` page).

**Animations:** Framer Motion is used extensively — page transitions, staggered lists, scroll-triggered counters (`useCountUp` hook), modal animations, marquee carousel.

## Styling

Tailwind CSS with custom design tokens defined as CSS variables in `src/index.css`:
- Brand colors: `negro-asfalto`, `blanco-sal`, `naranja-amanecer`, `azul-madrugada`, `dorado-medalla`, `gris-humo`, `gris-calzada`, `crema-jersey`
- Fonts: Playfair Display (display), DM Sans (body), JetBrains Mono (mono)
- Dark mode support via `.dark` class

shadcn/ui config is in `components.json` (style: default, baseColor: slate, cssVariables: true).

## TypeScript

Strict mode is **off**. `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` are all disabled. Target is ES2020.

## Database

Single `members` table with fields for runner profiles (marathon stats, PRs, cities, photos, bio). RLS is enabled with public read access. See `supabase/migrations/` for the full schema.
