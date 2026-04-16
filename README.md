# 🚀 Otterock Kiosk — Digital Craftsmanship

> **"Where code meets couture."** 

An interactive, premium garment personalization ecosystem designed for high-traffic physical kiosks and mobile-first social commerce. Built with the cutting-edge stability of **Astro v6**, the industrial flexibility of **Tailwind CSS v4**, and the cloud-distributed power of **Supabase**.

---

## 💎 The Vision
Otterock is not just a demo; it's a statement on modern retail. We've combined low-latency server actions with a high-contrast, "Dark Premium" aesthetic (bg-zinc-950) to create a touch-optimized flow that feels alive.

### ⚡ Core Stack
- **Framework**: [Astro v6](https://astro.build/) (Standalone Server Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Vite Plugin Architecture)
- **Engine**: [Vite 7](https://vitejs.dev/) (Stabilized Overrides)
- **Backend**: [Supabase](https://supabase.com/) (S3-compatible Storage + PostgreSQL Engine)
- **Logic**: Type-safe Astro Actions with Multipart Form-Data handling

---

## 🛠 Features

### 1. Interactive Personalization Flow
- **Garment Logic**: Intelligent switching between T-Shirts, Hoodies, and Tote Bags with real-time UI adaptability.
- **Color Engine**: Curated HSL-tuned color swatches for maximum visual accuracy.
- **High-Res Mockups**: Support for up to **10MB** high-definition design uploads.

### 2. Kiosk-Optimized UX
- **Totem Mode**: Fixed 1080x1920 layout with glassmorphism overlays and ambient gradient orbs.
- **Mobile Adaptive**: Fully responsive vertical layout for remote ordering via smartphones.
- **Micro-Animations**: Pulse-glow effects, shimmer transitions, and high-end processing overlays during submission.

### 3. "The Bridge" — WhatsApp Integration
Every order is processed and converted into a premium WhatsApp deep-link, bridging the gap between digital customization and human customer service.
- **Instant Cloud Sync**: Images are uploaded to Supabase Storage and stored with UUID-verified paths.
- **WhatsApp Markdown**: Generates a professional, formatted order message ready for a one-tap send.

---

## 🚀 Technical Setup

### Environment Variables
Create a `.env` file in the root:
```env
SUPABASE_URL=YOUR_PROJECT_URL
SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### Installation
```bash
# Force Vite 7 and install dependencies
npm install

# Start the Kiosk Engine
npm run dev

# Build for Production Kiosk
npm run build
```

---

## 📐 Project Structure
- `/src/actions/`: Handles the heavy lifting of uploads and DB records.
- `/src/components/`: Modular, high-end UI elements with built-in Tailwind v4 logic.
- `/src/lib/`: Unified Supabase client configuration.
- `/src/layouts/`: The responsive "Totem" shell.

---

## 🏺 Branding: Digital Craftsmanship
Otterock stands for precision. From the noise-texture overlays to the 80px touch-targets, every pixel is engineered for tactile satisfaction and brand authority.

---
*© 2026 Otterock Group — Advanced Personalization Systems.*
