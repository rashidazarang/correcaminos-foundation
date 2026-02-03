# Club Correcaminos

Web app for Club Correcaminos, an exclusive marathon running club community based in Monterrey, Mexico.

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui (Radix-based primitives)
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Data Fetching:** TanStack React Query
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Routing:** React Router v6

## Features

- **Directorio** — Member directory with runner profiles, marathon stats, and personal records
- **Hall of Fame** — Showcase of legendary club members
- **Numeros** — Club statistics with animated counters
- **Galeria** — Photo gallery organized by category (entrenamientos, carreras, viajes, convivios)
- **Diario de Ruta** — Blog/journal with Markdown-rendered posts, category filtering, and read time estimates
- **Formar Parte** — Membership application form with Zod validation
- **Gear** — Club merchandise
- **Admin Dashboard** — Member CRUD, image management (home + gallery), and blog post editor with draft/publish workflow

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 8080)
npm run dev

# Production build
npm run build

# Lint
npm run lint

# Tests
npm run test
```

## Environment Variables

The Supabase client is configured in `src/integrations/supabase/client.ts`. For local development, set:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
```

## Project Structure

```
src/
  pages/          — Route page components
  components/
    ui/           — shadcn/ui primitives
    layout/       — Header, Footer, Layout wrapper
    admin/        — Admin dashboard components (members, images, blog)
  hooks/          — React Query hooks (members, images, blog posts)
  integrations/
    supabase/     — Supabase client and generated DB types
  data/           — Mock data
  types/          — TypeScript interfaces
  assets/         — Static images
supabase/
  migrations/     — SQL migrations
```

## Routes

All routes are in Spanish:

| Path | Page |
|------|------|
| `/` | Home |
| `/lo-que-somos` | About |
| `/directorio` | Member Directory |
| `/hall-of-fame` | Hall of Fame |
| `/numeros` | Statistics |
| `/galeria` | Photo Gallery |
| `/diario` | Blog Listing |
| `/diario/:slug` | Blog Post Detail |
| `/formar-parte` | Join Application |
| `/gear` | Merchandise |
| `/contacto` | Contact |
| `/admin` | Admin Dashboard |
