# ⚡ MediaVault — Autonomous Cloudinary AI Digital Asset Pipeline

Built for **[Hacktober HackDays 2026](https://unstop.com/hackathons)** on Unstop (₹1,00,000 INR Cash Prize Pool).  
**Track:** Open Source Building & Problem Solving with Cloudinary  
**Team Format:** 2–4 Members  
**Live Demo:** Deployed on Vercel  

---

## 🌟 Overview
MediaVault is an automated digital asset optimization and transformation platform built for indie e-commerce brands, publishers, and developers. By leveraging Cloudinary's Programmable Media and AI transformation engine, MediaVault delivers:

1. **Perceptual Compression & Format Negotiation (`f_auto,q_auto`):** Reduces payload sizes by up to 92% using modern AVIF/WebP encoding tailored to the user's browser.
2. **AI Content-Aware Smart Crop (`c_fill,g_auto`):** Automatically detects focal subjects (faces, products) and dynamically composes frames without manual cropping.
3. **Neural Background Extraction (`e_background_removal`):** Seamlessly extracts product subjects onto clean transparent alpha channels for instant e-commerce catalog inclusion.
4. **Studio Clarity & Retouch (`e_improve,e_sharpen`):** Autonomous multi-scale contrast and sharpness enhancement.

---

## 🚀 Quickstart

```bash
# 1. Clone repository
git clone https://github.com/ashokwebs/mediavault.git
cd mediavault

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# Open http://localhost:3000
```

---

## 🛠️ Tech Stack
* **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
* **Styling:** Tailwind CSS (Dark Mode, 8pt spatial grid, WCAG AA contrast)
* **Media Processing:** Cloudinary Programmable Media & Generative AI API
* **Icons:** Lucide React
* **Deployment:** Vercel Edge Network
