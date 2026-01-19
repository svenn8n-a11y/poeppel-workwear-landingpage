# Pöppel Workwear Management - High-End Landing Page

Dies ist das Repository für die neue Pöppel Workwear Management Landingpage. Das Ziel ist eine immersive "Scrollytelling"-Experience, inspiriert von High-End-Webseiten (Referenz: gebetshaus.org), die vertikales Scrollen in horizontale Bewegungen und Layering-Effekte übersetzt.

## 🛠 Tech Stack & Tools

* **Framework:** Next.js 14+ (App Router, TypeScript)
* **Styling:** Tailwind CSS (für Layout, Typography, Z-Index Management)
* **Animation:** GSAP (GreenSock Animation Platform) + **ScrollTrigger Plugin** (Essenziell für die Scrollytelling-Effekte)
* **Icons:** Lucide React
* **Content:** Daten werden aus `data/content.json` geladen (Single Source of Truth).

## 🎨 Design-Prinzipien (UI/UX)

1.  **Immersive Scrollytelling:** Der Nutzer scrollt vertikal, aber die Seite reagiert mit fixierten Elementen (Sticky), Überlagerungen (Layering) und horizontalen Fahrten.
2.  **Industrial Elegance:** Große Typografie, viel Whitespace, hochwertige Fotografie. Workwear wird als Premium-Service inszeniert.
3.  **Layering ("Vorhang-Effekt"):** Bilder bleiben stehen (`position: sticky`), während neue Inhalte sich darüber schieben.
4.  **Mobile First:** Alle komplexen Animationen müssen auf Touch-Geräten performant laufen oder vereinfacht dargestellt werden.

## 📂 Projektstruktur

```bash
/app
  /components
    /ui             # Wiederverwendbare Basis-Komponenten (Buttons, Modals)
    /sections       # Die großen Scrollytelling-Sektionen
      Hero.tsx
      ElevatorPitch.tsx
      ProblemLayer.tsx
      HorizontalProcess.tsx
      Testimonials.tsx
      CTA.tsx
  /lib              # GSAP Registry & Helper
/public
  /images           # WebP optimierte Assets
  /videos           # MP4 Loops (komprimiert)
  /downloads        # Whitepaper PDF
/data
  content.json      # Alle Texte und Pfade (Single Source of Truth)