# Entwicklerdokumentation

## 🚀 Quick Start

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Build für Production
npm run build

# Production Preview
npm run start
```

Der Dev-Server läuft unter: **http://localhost:3000**

## 📁 Projektstruktur

```
poeppel-workwear-landingpage/
├── app/
│   ├── layout.tsx              # Root Layout mit Metadata
│   ├── page.tsx                # Hauptseite mit allen Sections
│   └── globals.css             # Globale Styles
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Wiederverwendbare Button-Komponente
│   │   └── VideoModal.tsx      # Video Modal mit GSAP Animationen
│   └── sections/
│       ├── Hero.tsx            # Hero Section mit Parallax
│       ├── ProblemLayer.tsx    # Sticky-Image mit Ken-Burns-Effekt
│       ├── HorizontalProcess.tsx # Horizontaler Scroll mit Videos
│       ├── Testimonials.tsx    # Social Proof Section
│       └── CTA.tsx             # Final Call-to-Action
├── lib/
│   ├── gsap.ts                 # GSAP Setup & Helper Functions
│   └── types.ts                # TypeScript Type Definitions
├── data/
│   └── content.json            # Single Source of Truth für Content
└── public/
    ├── images/                 # WebP optimierte Bilder
    ├── videos/                 # MP4 Video-Loops
    └── downloads/              # Whitepaper PDFs
```

## 🎨 Komponenten-Architektur

### 1. Hero.tsx
- **Funktion**: Fullscreen Einstieg mit Parallax-Effekt
- **Features**:
  - Video Modal Trigger für Elevator Pitch
  - GSAP Timeline für Entrance Animations
  - Parallax beim Scrollen
- **Props**: `data: HeroData`, `elevatorPitch: ElevatorPitchData`

### 2. ProblemLayer.tsx
- **Funktion**: Sticky-Image Container mit scrollendem Content
- **Features**:
  - Ken-Burns-Effekt auf Hintergrundbild (Scale + Scrub)
  - Pain Points fade-in beim Scrollen
  - Whitepaper Download CTA
- **Props**: `data: ProblemSectionData`

### 3. HorizontalProcess.tsx ⭐ (Herzstück)
- **Funktion**: Vertikaler Scroll → Horizontale Bewegung
- **Features**:
  - ScrollTrigger Pin auf ~400vh Container
  - Video-Loops spielen automatisch bei Sichtbarkeit (IntersectionObserver)
  - Card Animations (Opacity + Scale)
- **Props**: `data: HorizontalProcessData`
- **Technische Details**:
  ```typescript
  const slideWidth = slides.scrollWidth - window.innerWidth;
  gsap.to(slides, {
    x: -slideWidth,
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1,
      end: () => `+=${slideWidth}`,
    }
  });
  ```

### 4. Testimonials.tsx
- **Funktion**: Social Proof mit Customer Quotes
- **Features**: Staggered Animations beim Scroll
- **Props**: `data: TestimonialsData`

### 5. CTA.tsx
- **Funktion**: Finale Conversion Section
- **Features**: Dual-Action-Buttons (Primary + Secondary)
- **Props**: `data: CtaFinalData`

## 🎬 GSAP Best Practices

### ✅ DO's
```typescript
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

// ✅ Nutze useGSAP statt useEffect
useGSAP(() => {
  gsap.from(element, { ... });
}, { scope: sectionRef });
```

### ❌ DON'Ts
```typescript
// ❌ NICHT useEffect für Animationen nutzen
useEffect(() => {
  gsap.from(element, { ... }); // Kann zu Memory Leaks führen
}, []);
```

### ScrollTrigger Registration
ScrollTrigger wird automatisch in `lib/gsap.ts` registriert:
```typescript
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
```

## 📝 Content Management

Alle Inhalte werden aus `data/content.json` geladen. Struktur:

```json
{
  "metadata": { ... },
  "navigation": { ... },
  "hero": { ... },
  "elevator_pitch": { ... },
  "problem_section": { ... },
  "horizontal_process": {
    "steps": [
      {
        "id": "01",
        "label": "Analyse",
        "headline": "...",
        "description": "...",
        "video_loop": "/videos/loop-analyse.mp4"
      }
    ]
  },
  "testimonials": { ... },
  "cta_final": { ... }
}
```

## 🎥 Video Assets

Videos müssen im `public/videos/` Ordner platziert werden:
- Format: MP4 (H.264 kodiert)
- Empfohlene Auflösung: 1920x1080
- Kompression: Hoch (für Web optimiert)
- Loop-Videos: 5-10 Sekunden, nahtlos loopend

## 📱 Responsive Design

- **Desktop**: Volle GSAP Animationen
- **Tablet**: Vereinfachte Animationen
- **Mobile**: Horizontaler Scroll wird zu vertikalem Stack

```css
/* HorizontalProcess.tsx Mobile Fallback */
@media (max-width: 1024px) {
  .process-steps {
    flex-direction: column;
    transform: none !important;
  }
}
```

## 🛠 Development Workflow mit Claude Code

1. **Content zuerst**: Immer `data/content.json` als Single Source of Truth nutzen
2. **Types**: TypeScript-Typen in `lib/types.ts` definieren
3. **Komponenten**: Neue Sections in `components/sections/` erstellen
4. **GSAP**: `useGSAP` Hook verwenden, nie `useEffect`
5. **Images**: Next.js `Image` Component für optimierte Bilder

## 🚀 Deployment

Empfohlene Plattformen:
- **Vercel** (empfohlen für Next.js)
- **Netlify**
- **Cloudflare Pages**

```bash
# Build
npm run build

# Output in .next/ Ordner
```

## 🐛 Debugging

```bash
# GSAP ScrollTrigger Markers einblenden
ScrollTrigger.create({ markers: true });

# Alle ScrollTriggers ausgeben
ScrollTrigger.getAll().forEach(st => console.log(st));
```

## 📚 Weitere Ressourcen

- [Next.js Docs](https://nextjs.org/docs)
- [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
