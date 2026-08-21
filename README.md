# ESHWAR REDDY GALI — Cinematic Portfolio

A Hollywood-grade 3D animated portfolio built with **Three.js**, **React Three Fiber**, **GSAP**, and **Tailwind CSS**.

---

## 🎬 Features

- **Black Panther / Marvel Studios intro** with vibranium geometric patterns
- **3D Particle Galaxy** (3,000 particles in spiral arms)
- **Floating Energy Rings** with additive blending
- **Wireframe Geometry** (octahedrons, icosahedrons, dodecahedrons)
- **3D Character** with your profile photo + scanning rings + HUD data
- **Cinematic scroll animations** with GSAP ScrollTrigger
- **Smooth scroll** with Lenis
- **3D flip project cards**
- **Responsive design** for mobile

---

## 🚀 Setup Instructions

### Step 1: Install Node.js
Download from https://nodejs.org (LTS version)
Run the installer → keep clicking Next → Finish

### Step 2: Extract the zip file
Right-click `eshwar-portfolio-cinematic.zip` → Extract All → Extract

### Step 3: Open Command Prompt
Press `Win + R` → type `cmd` → press Enter

### Step 4: Navigate to the folder
```cmd
cd C:\Users\geshw\Downloads\eshwar-portfolio-updated
```

### Step 5: Install packages
```cmd
npm install --legacy-peer-deps
```
Wait 1-2 minutes for it to finish.

### Step 6: Start the website
```cmd
npm run dev
```
You'll see:
```
VITE v5.x.x ready in XXX ms
→ Local: http://localhost:5173/
```

### Step 7: Open in browser
Go to **http://localhost:5173** in Chrome

---

## 🌐 Deploy to Vercel

### Option A: Via Command Prompt
```cmd
npx vercel
```
Follow prompts → Y → Y → Y → Done! Live URL provided.

### Option B: Via GitHub
1. Go to https://github.com/new
2. Create repo: `eshwar-portfolio-cinematic`
3. Run these commands:
```cmd
git init
git add .
git commit -m "Cinematic portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/eshwar-portfolio-cinematic.git
git push -u origin main
```
4. Go to https://vercel.com → Add New Project → Select repo → Deploy

---

## 📁 Project Structure

```
eshwar-portfolio-updated/
├── public/
│   └── profile.jpg          ← Your profile photo
├── src/
│   ├── components/
│   │   ├── CinematicIntro.tsx    ← Marvel intro animation
│   │   ├── CinematicScene.tsx    ← Three.js 3D universe
│   │   ├── Hero3DCharacter.tsx   ← 3D character with photo
│   │   ├── Landing.tsx           ← Hero section
│   │   ├── About.tsx             ← About section
│   │   ├── WhatIDo.tsx           ← Services section
│   │   ├── Career.tsx            ← Experience timeline
│   │   ├── TechStackNew.tsx      ← Tools & software
│   │   ├── Projects.tsx          ← 3D flip project cards
│   │   ├── CallToAction.tsx      ← CTA section
│   │   ├── Contact.tsx           ← Contact info
│   │   ├── Navbar.tsx            ← Navigation bar
│   │   ├── SocialIcons.tsx       ← Social media links
│   │   └── styles/               ← All CSS files
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css             ← Tailwind + cinematic theme
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🎨 Tech Stack

- **3D Rendering**: Three.js + React Three Fiber + Drei
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP + ScrollTrigger + Lenis
- **Build**: Vite + TypeScript
- **Deployment**: Vercel

---

## ✏️ Customization

### Change your photo
Replace `public/profile.jpg` with your own photo (recommended: 400x400px or larger).

### Change colors
Edit `src/index.css` → modify the `--color-accent` value.

### Change content
Edit `src/config.ts` to update your name, experiences, skills, and contact info.

---

Made with ❤️ by Eshwar Reddy Gali