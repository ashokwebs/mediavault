# ⚡ MediaVault — Autonomous Cloudinary AI Digital Asset Pipeline

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-5%2F5%20Passing-brightgreen?style=flat)]()
[![Deploy](https://img.shields.io/badge/Deploy-Vercel%20Edge-black?style=flat&logo=vercel)](https://mediavault-roan.vercel.app)

Built for **[Hacktober HackDays 2026](https://unstop.com/hackathons)** on Unstop (₹1,00,000 INR Cash Prize Pool).  
* **Track:** Open Source Building & Problem Solving with Cloudinary  
* **Live Web App:** [https://mediavault-roan.vercel.app](https://mediavault-roan.vercel.app)  
* **Build Journey Document:** [`NOTION_BUILD_JOURNEY_LOG.md`](./NOTION_BUILD_JOURNEY_LOG.md)  

---

## 🌟 Overview

E-commerce merchants, local retailers, and indie creators lose customers every day due to slow-loading product photos and amateur, unretouched backgrounds. MediaVault provides an autonomous, one-click digital asset pipeline powered by Cloudinary's Programmable Media and AI transformation engine.

```
┌─────────────────┐     ┌───────────────────────────────────┐     ┌───────────────────────┐
│ Raw Camera Shot │ ──> │    Cloudinary AI Transformation   │ ──> │ Global Edge CDN Asset │
│ (2.5 MB JPEG)   │     │ (bg_removal + smart_crop + f_auto)│     │ (185 KB AVIF / -92.5%)│
└─────────────────┘     └───────────────────────────────────┘     └───────────────────────┘
```

---

## ✨ Key Features

1. **Interactive Split-Screen Wipe Visualizer:** Tactile, hardware-accelerated before/after slider allowing merchants to scrub across raw photos to inspect neural cutouts and edge fidelity.
2. **Autonomous Multi-Stage AI Transformations (6 Cloudinary Pipelines):**
   * **High-Performance Delivery:** `f_auto,q_auto:best` (sub-second loading worldwide).
   * **Neural Background Extraction:** `e_background_removal` (clean transparent alpha cutout).
   * **Studio Elevation & Shadow:** `e_dropshadow:azimuth_215;elevation_45;spread_5`.
   * **Omnichannel 9:16 Social Story:** `c_pad,g_auto,ar_9:16,b_auto:predominant_gradient`.
   * **E-Commerce 1:1 Square Smart Crop:** `c_fill,g_auto,w_600,h_600`.
   * **Color Harmonization & Clarity Boost:** `e_improve,e_sharpen:100`.
3. **Multi-Tier Merchant Session Auth:** Instant role switching (`Guest Evaluator`, `Elena Vance - Pro Merchant`, `Cloudinary Agency Partner`) with live API key generation (`mv_live_...`) and dynamic monthly credit quota tracking.
4. **Studio Canvas Background Modes:** Switch preview canvas between Dark Charcoal Studio, Clean Storefront White, and Transparent Alpha Checkerboard.
5. **Drag-and-Drop Local File Upload:** Upload local camera photos via HTML5 FileReader for instant client-side testing.
6. **One-Click Transformed Asset Downloader:** Direct browser download of transformed assets with instant toast notifications.
7. **Live Bandwidth & Carbon Analytics:** Real-time metrics demonstrating -92.5% byte reduction, 13.6× mobile speedup, and -178 kg CO₂ savings per 100k views.

---

## 🚀 Quickstart

```bash
# 1. Clone repository
git clone https://github.com/ashokwebs/mediavault.git
cd mediavault

# 2. Install dependencies
npm install

# 3. Run automated test suite
npm test

# 4. Start local development server
npm run dev
# Open http://localhost:3000
```

---

## 🧪 Automated Testing

MediaVault includes hermetic unit tests verifying transformation pipelines and merchant session rules:

```bash
$ npm test

> mediavault@0.1.0 test
> node --test tests/**/*.test.mjs

✔ Cloudinary URL Builder formats fetch URLs with modern encodings
✔ Cloudinary URL Builder handles direct asset public IDs
✔ All 6 Cloudinary transformation pipelines produce valid endpoints
✔ Merchant Profile Roles & Quota Enforcement
✔ Bandwidth & Carbon Emission Savings Formula
ℹ tests 5
ℹ suites 0
ℹ pass 5
```

---

## 🛠️ Architecture & Tech Stack

* **Frontend & App:** Next.js 15 (App Router), React 19, TypeScript
* **Styling & UI:** Tailwind CSS, Lucide React (8pt spatial grid, WCAG AA accessible contrast)
* **Media Engine:** Cloudinary Programmable Media & Generative AI API
* **Deployment:** Vercel Global Edge Network
