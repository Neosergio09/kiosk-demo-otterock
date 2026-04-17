# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Astro dev server
npm run build      # Production build
npm run preview    # Preview production build locally
```

No lint or test commands are configured. Node >= 22.12.0 required.

## Environment

Create `.env` with:
```
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```

For local development, Supabase runs on port 54331. The app uses public insert/read RLS policies.

## Architecture

**Interactive garment personalization kiosk** — Astro v6 SSR app (Node adapter) with Tailwind CSS v4, targeting a 1080×1920 physical kiosk display and mobile viewports.

### Request Flow

1. User lands on `/` (`src/pages/index.astro`) — the main 3-stage kiosk flow
2. Stage 1: garment/color/size selection via `GarmentSelector`, `ColorSelector`, `SizeSelector`
3. Stage 2: drag-and-drop patch placement + text input on a live 3D model (`ShirtViewer3D.astro`, `PatchEditor.astro`)
4. Stage 3: success confirmation + WhatsApp deep-link handoff for order completion
5. Orders submit through **Astro Actions** (`src/actions/index.ts`) → Zod validation → Supabase insert
6. `/produccion` (`src/pages/produccion.astro`) is the production hub — real-time order dashboard reading from Supabase

### Key Subsystems

**3D Viewer** — `model-viewer` (Google web component v4.0.0) renders interactive `.glb` models. `ShirtViewer3D.astro` handles front/back side switching. `PatchEditor.astro` overlays an HTML drag-and-drop canvas on top, tracking patch positions as 0–100% coordinates mapped to the model viewport.

**Patch System** — patches use native HTML5 Drag & Drop API. Final positions are serialized as `{x, y, side}` objects within `customization_data` (JSONB) when the order is saved.

**Astro Actions** (`src/actions/index.ts`) — type-safe server actions using Zod schemas. They handle form submissions, validate garment/customization data, and insert rows into the Supabase `orders` table with up to 10MB mockup payloads.

**Supabase** — PostgreSQL `orders` table with a JSONB `customization_data` column. Migrations live in `supabase/`. The client is initialized in `src/lib/supabase.ts`.

**Styling** — OKLCH color space throughout. Glassmorphism aesthetic (backdrop blur, semi-transparent surfaces). Custom animations (`fadeInUp`, `pulse-glow`, `shimmer`, `spin-slow`) defined in `src/styles/`. Touch targets are minimum 80px, consistent with kiosk UX requirements.

### Layout Shell

`src/layouts/` contains the "Totem" base layout wrapping all pages. The dark premium aesthetic (`bg-zinc-950`) and noise-texture overlays are applied here.
