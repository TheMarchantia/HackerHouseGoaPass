# HH Goa 2026 — Builder Identity Pass Generator 🌴⚡

> **Production-Quality, Mobile-First Web Tool & Collectible Digital Pass Generator for Hacker House Goa 2026**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🎨 Creative Art Direction & Visual Identity

Directly inspired by the official **Hacker House Goa 2026** posters and visual references:
- **Color Palette**: Deep Hacker House Green (`#073B22`), Poster Cream (`#F6F3E7`), Bright Yellow (`#FFDD00`), Hot Pink (`#FF007A`), Sunset Warm Orange (`#FF5722`).
- **Typography Scale**: Oversized display headline typography (`Syne` / `Bebas Neue`), overlaid Devanagari calligraphic script (**"गोवा"** in hot pink with yellow outline), and monospaced technical details (`Space Mono`).
- **Goa Vector Atmosphere**: Atmospheric SVG vector beach scene featuring palm trees, radial sun rays, ocean waves, coastal houses with colorful shutters, beach shacks (*"GOA BEACH"*), and AI × Crypto + Multichain node motifs.

---

## ✨ Features & User Experience Flow

1. **Immersive Landing Page**: Hero section with oversized editorial poster typography, calligraphic Devanagari overlay, and subtle scroll parallax animations.
2. **Photo Upload & iPhone HEIC Support**: Accepts JPG, PNG, drag-and-drop, camera capture, and converts iPhone **HEIC/HEIF** photos client-side via `heic2any`.
3. **Dedicated Photo Crop & Position Editor**: Pan, zoom, and frame your face inside a circular badge framing mask before continuing.
4. **Builder Identity Form & Instant Title Engine**: Input Name, Role/Stack (with quick preset pills e.g. `AI × CYBERSECURITY`), optional Team, and X handle. Instant title randomizer (`THE PROTOCOL BREAKER`, `THE MODEL WHISPERER`, `THE CHAIN ARCHITECT`).
5. **1080×1080 1:1 Square Digital Pass (Front & Back)**:
   - **FRONT CARD**: Art-directed social pass with giant editorial name, framed portrait, title banner, location/date stamp (`GOA, INDIA · 28–31 OCT 2026`), and `#FrameInGoa` hashtag.
   - **BACK CARD**: Collectible digital pass with monospaced Builder ID (`HH26-X7K9P2`), sharp QR code pointing to live URL, and event details.
6. **3D Interactive Card Flip**: Toggle between FRONT and BACK with smooth 3D CSS rotation.
7. **PNG & ZIP Exports**:
   - **DOWNLOAD FRONT PNG**: High-resolution 1080×1080 social pass.
   - **DOWNLOAD BACK PNG**: High-resolution 1080×1080 digital pass.
   - **ZIP BOTH PNGs**: Export both sides in a single `.zip` package via `jszip`.
8. **Share to X & Copy Link**:
   - **SHARE TO X**: Opens Twitter post composer with pre-filled caption, `#FrameInGoa` hashtag, and card URL.
   - **COPY CARD LINK**: Copies unique card URL to clipboard with confirmation toast.
9. **Zero-Backend URL State Reconstruction**: Shareable URL payload allows any user or device scanning the QR code to open and view the exact reconstructed card online without requiring a paid database!

---

## 🛠️ Architecture & Technical Explanations

### 1. Shareable Card URL System (`src/lib/urlState.ts`)
The application uses lightweight LZ-string URL compression. When a card is generated, its state (Name, Role, Title, Team, X Handle, Cropped Portrait Data) is compressed into an encoded URI component parameter (`?card=<payload>&id=<id>`). Upon opening the URL on any device, the app decompresses the state and renders the exact card without server calls or database dependencies.

### 2. PNG Generation (`src/lib/cardExporter.ts`)
Card rendering uses `html-to-image` configured with a `pixelRatio` of 2 and explicit 1080×1080 dimensions. This ensures that text, badges, QR codes, and cropped images remain crisp and publication-ready at 2x Retina DPI.

### 3. QR Code Engine (`src/components/QRCodeDisplay.tsx`)
Generates vector SVG QR codes pointing directly to the deployed production URL using the `qrcode` library. The QR code modules are custom-colored to match the Deep Green and Cream palette.

### 4. Photo Crop & Image Processing (`src/lib/heicConverter.ts` & `src/components/PhotoCropperModal.tsx`)
- **HEIC Conversion**: Standard iPhone HEIC files are converted to JPEG blobs using `heic2any`.
- **Canvas Cropper**: Uses HTML5 Canvas context math to apply scaling (`zoom`) and translation (`offset.x`, `offset.y`) with touch gesture and mouse drag event handlers.

### 5. Free Vercel Deployment Configuration (`vercel.json`)
The application is engineered for Vercel's free tier. The `vercel.json` file contains SPA route rewrite rules:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
This ensures direct URL visits (such as `/?card=...`) resolve cleanly to `index.html` without 404 errors.

---

## 🚀 Local Development & Build Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Production Build
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deploying to Vercel (Free Tier)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `hh-goa-2026-builder-identity` repository.
4. Keep default settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.

*No environment variables required!*

---

## 📅 Submission Details

- **Event**: Hacker House Goa 2026
- **Dates**: 28–31 October 2026
- **Location**: Goa, India
- **Hashtag**: `#FrameInGoa` `#HHGoa2026`
- **Official Site**: [hhgoa.com](https://hhgoa.com)
