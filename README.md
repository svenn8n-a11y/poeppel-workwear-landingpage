# Pöppel Workwear Management - High-End Landing Page

Eine immersive Scrollytelling-Experience für digitales Workwear Management. Inspiriert von gebetshaus.org mit fortgeschrittenen GSAP-Animationen und CSS Scroll-Techniken.

## 🎯 Projekt-Übersicht

Dieses Projekt implementiert eine High-End Landing Page mit 3 Kern-Features:

1. **Hero mit Parallax** - Cinematic Fullscreen Intro (aus Entwurf1)
2. **Sticky Stacking Cards** - Problem-Cards die sich übereinander stapeln (aus Entwurf1)
3. **Diagonal Onboarding Scroll** - Treppen-Effekt: rechts → unten → rechts → unten (gebetshaus.org)

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS 4.0
- **Animation:** GSAP 3.14 + ScrollTrigger Plugin
- **Icons:** Lucide React
- **Content:** JSON-basiert (`data/content.json` = Single Source of Truth)

## 🚀 Quick Start

```bash
# Installation
npm install

# Development Server
npm run dev
# → http://localhost:3000

# Production Build
npm run build
npm run start
```

## 📐 Architektur & Scroll-Effekte

### 1. Navigation mit mix-blend-difference
- Fixed Navigation die über allen Elementen liegt
- `mix-blend-mode: difference` für automatische Farbinvertierung
- Logo Platzhalter: "P" in Box

### 2. Hero Section (Entwurf1 basiert)
- **Parallax Background**: Hintergrundbild bewegt sich langsamer als Content
- **Fade-out on Scroll**: Content verblasst beim Scrollen
- **Video Modal Trigger**: Play-Button öffnet Elevator Pitch
- **Typografie**: Riesige Headlines (text-9xl), Systempartner Badge mit Pulsing Dot

### 3. Problem Stacking Cards (Entwurf1 basiert)
Die Kern-Innovation:

```
┌────────────────────────┐
│ Card 1 (sticky top-32) │ ← Bleibt kleben, z-index: 10
│  Excel-Chaos           │
└────────────────────────┘
  ┌────────────────────────┐
  │ Card 2 (sticky top-40) │ ← Schiebt sich drüber, z-index: 20
  │  Retouren-Falle        │
  └────────────────────────┘
    ┌────────────────────────┐
    │ Card 3 (sticky top-48) │ ← Oberste Ebene, z-index: 30
    │  Compliance-Risiken    │
    └────────────────────────┘
```

**Technik:**
- CSS `position: sticky` mit unterschiedlichen `top` Werten
- Großer vertikaler Abstand zwischen Cards (`space-y-32`)
- Z-Index Management für Stacking-Order
- GSAP für Entrance Animations (slide-in from left)

### 4. Diagonal Onboarding Scroll (gebetshaus.org inspiriert)

Der **Treppen-Effekt** - Kamera-Bewegung durch Wrapper-Animation:

**WICHTIG: Wrapper animieren, NICHT einzelne Steps!**
- Container: `h-[500vh]` (5 Seiten für 4 Bewegungen: 4 × 125vh = 500vh)
- Sticky Viewport: Bleibt fixiert während User scrollt
- **Wrapper bewegt sich** diagonal (echter Kamera-Effekt):

**GSAP Timeline (empfohlene Implementierung):**
```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.onboarding-section',
    pin: '.onboarding-viewport',
    scrub: 1,              // 1s Smooth-Lag (sweet spot)
    start: 'top top',
    end: '+=500%',         // 500vh Scroll-Bereich
  }
});

// Treppen-Animation: x → y → x → y (KUMULATIV!)
tl.to('.wrapper', { x: '-100vw', duration: 1, ease: 'power2.inOut' })   // 1→2
  .to('.wrapper', { y: '-100vh', duration: 1, ease: 'power2.inOut' }, '>') // 2→3
  .to('.wrapper', { x: '-200vw', duration: 1, ease: 'power2.inOut' }, '>') // 3→4
  .to('.wrapper', { y: '-200vh', duration: 1, ease: 'power2.inOut' }, '>'); // 4→5
```

**Step Index Berechnung (mit Clamp!):**
```javascript
const stepIndex = Math.min(
  Math.floor(scrollProgress * steps.length),
  steps.length - 1  // Verhindert Index-Out-of-Bounds bei progress=1
);
```

**Background Animation:**
- Grid Pattern bewegt sich entgegengesetzt zur Wrapper-Bewegung (Camera-Effekt)
- `transform: translate(${-progress * 200}px, ${-progress * 200}px)` (korrekte Syntax ohne Leerzeichen!)

## 📂 Projektstruktur

```
poeppel-workwear-landingpage/
├── app/
│   ├── layout.tsx                    # Root Layout
│   ├── page.tsx                      # Hauptseite
│   └── globals.css                   # Globale Styles
├── components/
│   ├── layout/
│   │   └── Navigation.tsx            # Mix-blend Navigation
│   ├── sections/
│   │   ├── HeroWorkwear.tsx          # Hero mit Parallax (Entwurf1)
│   │   ├── ProblemStackingCards.tsx  # Sticky Cards (Entwurf1)
│   │   ├── OnboardingDiagonal.tsx    # Diagonal Scroll (gebetshaus)
│   │   ├── HorizontalProcess.tsx     # Optional: Horizontal Scroll
│   │   ├── Testimonials.tsx          # Social Proof
│   │   └── CTA.tsx                   # Final Call-to-Action
│   └── ui/
│       ├── Button.tsx                # Reusable Button
│       └── VideoModal.tsx            # Video Overlay Modal
├── lib/
│   ├── gsap.ts                       # GSAP Setup & ScrollTrigger
│   └── types.ts                      # TypeScript Interfaces
├── data/
│   └── content.json                  # Alle Inhalte
└── public/
    ├── images/                       # WebP optimierte Bilder
    ├── videos/                       # MP4 Loops
    └── downloads/                    # Whitepaper PDFs
```

## 🎨 Content-Strategie (aus Excel-Analyse)

### Psychologische Trigger pro Sektion:

| Sektion | Trigger | Wirkung |
|---------|---------|---------|
| **Hero** | Status-Hebung, Klarheit | "Ich werde als System-Kenner wahrgenommen" |
| **Problem** | Verlustaversion (Kahneman) | "Ich verliere täglich Geld – MUSS handeln" |
| **Onboarding** | Führungskompetenz | "Klarer Prozess – keine Überraschungen" |
| **USPs** | Logic Justification | "Rationale Begründung für emotionalen Kauf" |
| **Social Proof** | Herdentrieb | "Andere vertrauen → Risiko-Reduktion" |

### Content Struktur (content.json):

```json
{
  "hero_workwear": {
    "badge": "Systempartner 4.0",
    "headline": "Workwear Management neu gedacht.",
    "quote": "Wir beenden den Verwaltungs-Irrsinn."
  },
  "problem_stacking": {
    "cards": [
      { "title": "Excel-Chaos", "sticky_top": "8rem", "z_index": 10 },
      { "title": "Retouren-Falle", "sticky_top": "10rem", "z_index": 20 }
    ]
  },
  "onboarding_diagonal": {
    "steps": [
      { "id": "01", "title": "Kickoff & Analyse" },
      { "id": "02", "title": "Konzept & Budget" },
      { "id": "03", "title": "Anprobe Event" },
      { "id": "04", "title": "Go-Live System" }
    ]
  }
}
```

## 🎬 GSAP Implementation Details

### Parallax Hero:
```typescript
gsap.to(bgRef.current, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
  y: 200,
  opacity: 0.5,
});
```

### Sticky Cards Animation:
```typescript
gsap.from(card, {
  scrollTrigger: {
    trigger: card,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  x: -100,
  opacity: 0,
  duration: 1,
});
```

### Diagonal Step Transitions:
```typescript
// Scroll Progress → Step Index
const stepIndex = Math.floor(scrollProgress * steps.length);

// CSS Classes für Transition
.step-active { transform: translate(0, 0); opacity: 1; }
.step-past { transform: translate(-100vw, 100vh); opacity: 0; }
.step-future { transform: translate(100vw, -100vh); opacity: 0; }
```

## 📱 Responsive Design

### Breakpoints:
- **Mobile (<768px)**: Vereinfachte Layouts, kein Diagonal Scroll
- **Tablet (768-1024px)**: Reduzierte Animations-Distanzen
- **Desktop (>1024px)**: Volle Scroll-Effekte

### Mobile Optimierungen:
- Sticky Cards werden zu normalem Stack
- Diagonal Steps werden vertikale Slides
- Touch-optimierte Button-Größen (min 44x44px)
- Reduced Motion Support (`prefers-reduced-motion`)

## 🧪 Testing Checklist

- [ ] **Smooth Scroll**: Navigation Anchors funktionieren
- [ ] **Sticky Z-Index**: Cards überlagern sich korrekt
- [ ] **Diagonal Timing**: Steps wechseln bei richtigem Scroll-Threshold
- [ ] **Mobile Safari**: Sticky positioning funktioniert
- [ ] **Performance**: 60fps bei Animationen
- [ ] **Accessibility**: Keyboard Navigation + ARIA Labels

## 🐛 Bekannte Issues & Lösungen

### Issue: Sticky Cards funktionieren nicht
**Ursache:** Parent hat `overflow: hidden`
**Lösung:** Parent muss `overflow: visible` haben

### Issue: Diagonal Steps springen
**Ursache:** Scroll-Threshold zu groß
**Lösung:** Kleinere `scrollDistance / steps.length` Segmente

### Issue: GSAP Performance
**Lösung:**
```javascript
gsap.config({ force3D: true });
ScrollTrigger.config({ limitCallbacks: true });
```

## 📦 Assets & Platzhalter

### Platzhalter-Strategie:
- **Hero Background**: Unsplash Industrial Warehouse
- **Onboarding Images**: Farbige Gradients oder Stock Photos
- **Logo**: "P" in Box (temporär)
- **Videos**: Icon + Text Platzhalter

### Finale Assets (TODO):
- [ ] Hero Background (WebP, optimiert)
- [ ] Elevator Pitch Video (90s, MP4)
- [ ] Onboarding Step Images (4x)
- [ ] Testimonial Photos
- [ ] Company Logo

## 🚢 Deployment

Optimiert für **Vercel** (empfohlen):

```bash
npm run build
vercel --prod
```

**Alternative Plattformen:**
- Netlify
- Cloudflare Pages
- AWS Amplify

## 📚 Dokumentation & Referenzen

- **Entwurf1.js**: Hero + Sticky Cards Implementation
- **gebetshaus.org**: Diagonal Scroll Inspiration
- **Excel-Strategie**: Psychologische Trigger & Content
- **GSAP Docs**: [gsap.com/docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## 👥 Entwicklung

**Erstellt mit:**
- Claude Code (Anthropic)
- GSAP GreenSock
- Next.js 14
- Tailwind CSS 4

**Repository:** [github.com/svenn8n-a11y/poeppel-workwear-landingpage](https://github.com/svenn8n-a11y/poeppel-workwear-landingpage)

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
