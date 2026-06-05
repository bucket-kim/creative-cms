# Creative CMS

A headless CMS platform built specifically for creative developers — WebGL engineers, Three.js artists, GSAP animators, and interactive coders — who need a portfolio that goes beyond static images.

**Live Demo:** [kinect-cms.vercel.app](https://kinect-cms.vercel.app)
**GitHub:** [github.com/bucket-kim/creative-cms](https://github.com/bucket-kim/creative-cms)
**Built with:** Next.js 15, TypeScript, Supabase (Postgres), Clerk, Tailwind CSS, Zustand

---

## The Problem

Creative developers build experiences that can't be captured in screenshots.

Platforms like ArtStation and Behance are designed for visual artists — images, renders, concept art. They work well for what they're designed for. But a Three.js fluid simulation, a WebGL particle system, or a GSAP scroll experience loses everything when you reduce it to a static image. The interaction is the work.

Personal portfolio sites solve this, but take weeks to build from scratch and are hard to maintain. GitHub is too technical for non-developer visitors. There's no purpose-built platform for the creative developer's specific needs.

**Creative CMS** fills that gap. It lets creative developers define exactly what their work looks like — live demo links, tech stacks, case studies, GitHub repos — and generates a clean public portfolio page that lets the work speak for itself.

---

## How It Works

Each creator signs up and gets their own isolated space on the platform. They define a **content schema** — a flexible template describing what fields their projects have. Then they create **content entries** using that schema, one per project. Anyone on the internet can visit their public portfolio page at `/{username}`.

```
Creator defines schema:
  project_name → text
  description  → text
  demo_url     → url
  tech_stack   → tags
  thumbnail    → image
  published    → boolean

Creator adds entries (projects):
  Three.js Solar System → { demo_url: "...", tech_stack: "Three.js, WebGL", ... }
  WebGL Fluid Sim       → { demo_url: "...", tech_stack: "WebGL, GLSL", ... }

Public visits:
  kinect-cms.vercel.app/brian → sees all projects rendered beautifully
```

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Next.js 15 App Router          │
│                                                  │
│  Public Routes          Protected Routes         │
│  /[username]            /dashboard               │
│  /sign-in               /dashboard/schemas/*     │
│  /sign-up               /dashboard/entries/*     │
│  /onboarding            /dashboard/profile       │
└──────────────┬──────────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Supabase             │
│                              │
│  tenants                     │
│    └── content_schemas       │
│          └── content_entries │
│                              │
│  Storage (thumbnails,avatars)│
└──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│           Clerk              │
│  Authentication & Sessions   │
└──────────────────────────────┘
```

**Rendering strategy:**

- Public portfolio pages → server components (fast, SEO-friendly, pre-rendered)
- Admin dashboard and forms → client components (interactive, real-time state)
- Write operations → server actions (secure, server-side, no API routes needed)
- UI state (active iframe preview) → Zustand global store

---

## Key Technical Decisions

### Postgres over Firebase

The platform needs relational data integrity — a content entry must always belong to a valid schema, which must always belong to a valid tenant. Firebase's document model can't enforce this at the database level. Postgres foreign keys reject invalid inserts before they ever hit the application layer.

### JSONB for schema fields and entry data

Every creator defines different fields. You can't create fixed columns for `demo_url`, `tech_stack`, `case_study` etc. because the next creator might have completely different fields. Postgres `JSONB` gives the best of both worlds — relational structure for the metadata (who owns what), flexible JSON storage for the content itself.

### Denormalization for read performance

`content_entries` stores `tenant_id` directly even though it could be derived through `content_schema_id`. Public portfolio pages are the highest-frequency read operation — storing `tenant_id` on entries means one direct query instead of two chained queries.

### Row Level Security at the database level

RLS policies are enforced by Postgres itself, not application code. Even if a bug in the frontend forgets to filter by `tenant_id` — the database will never return another tenant's data. Security lives at the lowest possible level.

### Server components for public pages

Public portfolio pages use Next.js server components — data is fetched on the server before the page reaches the browser. Pages load fast, are fully SEO-indexable, and require no client-side JavaScript to display content.

### Schema-driven dynamic UI

Both the entry form (input) and the portfolio renderer (output) are driven by the schema's field type definitions. A switch statement on `type` renders the correct input for editing and the correct display component for viewing — url fields become clickable links, tags become pill chips, booleans become Published/Draft badges.

### Zustand for UI state

Active iframe preview state is managed with Zustand — when a visitor opens one project's iframe preview, any previously open preview closes automatically. This is pure client UI state (not server data) so Zustand is the right tool, keeping the state management clean and preventing unnecessary re-renders via `useShallow`.

### Exclusive iframe preview

Visitors can preview live demo URLs embedded inline on the portfolio page. Only one project can be previewed at a time — clicking a new project closes the previous one. A blurred thumbnail serves as the background while the iframe loads, with a 10-second fallback to "Open in new tab" for heavy or blocked sites.

---

## Multi-tenant Architecture

Every piece of data is scoped to a tenant. The isolation works at three levels:

**Application level** — every query filters by `tenant_id` or `clerk_id`

**Database level** — foreign key constraints prevent entries from referencing schemas that don't belong to the same tenant

**Security level** — RLS policies enforce access control at the Postgres layer, independent of application code

---

## Database Schema

```sql
tenants
  id uuid primary key
  username text unique not null      -- public URL identifier
  email text unique not null
  name text not null
  role text
  bio text
  avatar_url text
  location text
  social_links jsonb                 -- { github, twitter, linkedin }
  clerk_id text unique               -- links Clerk auth to tenant row
  created_at timestamp

content_schemas
  id uuid primary key
  tenant_id uuid references tenants(id)
  name text not null                 -- "Creative Projects", "Client Work"
  fields jsonb not null              -- [{name, type, required}]
  created_at timestamp

content_entries
  id uuid primary key
  tenant_id uuid references tenants(id)
  content_schema_id uuid references content_schemas(id)
  fields jsonb not null              -- {field_name: value}
  created_at timestamp
```

---

## Features

- **Multi-tenant** — each creator has a fully isolated space
- **Schema-driven content** — fixed field structure (project name, description, demo URL, GitHub, tech stack, thumbnail, published status)
- **Dynamic entry form** — form inputs rendered based on field type definitions
- **Tag input** — add/remove individual tech stack tags as pill chips
- **File uploads** — thumbnail and avatar uploads via Supabase Storage
- **Iframe preview** — embedded live demo preview with blurred thumbnail background
- **Exclusive preview** — only one project preview open at a time via Zustand global state
- **Public portfolio page** — SEO-friendly, server-rendered at `/{username}`
- **Owner-only edit** — edit profile button only visible to the authenticated owner
- **Profile editing** — update name, role, bio, avatar, location, social links
- **Full CRUD** — create, read, update, delete for schemas and entries
- **Auth flow** — sign up → onboarding → dashboard → public page

---

## Tech Stack

| Technology   | Purpose            | Why                                            |
| ------------ | ------------------ | ---------------------------------------------- |
| Next.js 15   | Framework          | App Router enables server/client split cleanly |
| TypeScript   | Language           | End-to-end type safety across DB → API → UI    |
| Supabase     | Database + Storage | Postgres with JSONB, RLS, and file storage     |
| Clerk        | Authentication     | Complete auth UI and session management        |
| Zustand      | UI State           | Lightweight global state for iframe preview    |
| Tailwind CSS | Styling            | Utility-first, fast to build with              |
| Vercel       | Deployment         | Zero-config Next.js deployment with CDN        |

---

## Local Development

```bash
# clone the repo
git clone https://github.com/bucket-kim/creative-cms
cd creative-cms

# install dependencies
yarn install

# add environment variables
cp .env.example .env.local
# fill in the following:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# CLERK_SECRET_KEY
# NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
# NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
# NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
# NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
# NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/

# run development server
yarn dev
```

---

## What I'd Build Next

- **Full-text search** across portfolio entries using Postgres `tsvector` — no external service needed
- **TanStack Query** for reactive client-side data fetching with caching and optimistic updates
- **Custom subdomain routing** — `brian.kinect-cms.vercel.app` instead of `kinect-cms.vercel.app/brian`
- **Analytics** — view counts per portfolio page using a lightweight events table
- **Webhook-based tenant creation** — Clerk webhook auto-creates tenant row on sign up
- **Image optimization** — resize and compress thumbnails on upload via Supabase Edge Functions
