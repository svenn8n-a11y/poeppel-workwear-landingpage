# Potentials Komponente - Horizontales Scroll Design

## Überblick

Die Potentials Komponente implementiert ein modernes horizontales Scroll-Design basierend auf Entwurf 1. Beim Runterscrollen der Seite scrollen die Karten horizontal von links nach rechts.

## Features

### 1. Horizontales Scrollen mit GSAP ScrollTrigger
- Die Section ist beim Scrollen fixiert (pinned)
- Karten scrollen horizontal während der User vertikal scrollt
- Smooth Scrub-Animation für flüssige Bewegung

### 2. Card Design
Jede Karte enthält:
- **Große Nummer** (01, 02, 03, 04) oben links mit 20% Opacity
- **Bild-Bereich** auf der linken Hälfte (50% Breite)
- **Content-Bereich** auf der rechten Hälfte (50% Breite)
  - Vertikale farbige Akzentlinie links
  - Titel (4xl, bold)
  - Beschreibung (xl, text-slate-600)
  - Horizontale Akzentlinie rechts unten

### 3. Farbige Akzente
- **Blau** (#3B82F6) - Karte 01: "Prozess optimieren"
- **Orange** (#F97316) - Karte 02: "Kosten reduzieren"
- **Grün** (#10B981) - Karte 03: "Transparenz schaffen"
- **Lila** (#A855F7) - Karte 04: "Flexibilität & Skalierung"

## Technische Details

### GSAP Animationen

1. **Horizontales Scrollen**
   ```typescript
   gsap.to(container, {
     x: -scrollWidth,
     scrollTrigger: {
       trigger: sectionRef.current,
       start: 'top top',
       end: () => `+=${scrollWidth + window.innerHeight}`,
       scrub: 1,
       pin: true,
     }
   });
   ```

2. **Card Fade-In Animation**
   - Jede Karte startet mit opacity: 0.3 und scale: 0.9
   - Animiert zu opacity: 1 und scale: 1 beim Scrollen

### Responsive Design

- **Desktop (md+)**: Karten sind 85vw breit, max 1100px
  - Bild und Content nebeneinander (je 50%)
- **Mobile**: Karten stacken vertikal
  - Bild oben (h-64)
  - Content unten

### Layout

- Section Höhe: 100vh
- Section Background: slate-50
- Card Höhe: 500px
- Card Border-Radius: 3xl (24px)
- Card Shadow: xl
- Gap zwischen Karten: 2rem (32px)

## Datenstruktur (content.json)

```json
{
  "potentials": {
    "section_id": "potentials",
    "headline": "Ihre Potentiale. Unsere Lösungen.",
    "subheadline": "Wir verwandeln versteckte Kostentreiber...",
    "cards": [
      {
        "id": 1,
        "number": "01",
        "title": "Prozess optimieren",
        "description": "Steigern Sie die Effizienz...",
        "image": "/images/potential-1.jpg",
        "color": "blue"
      }
    ]
  }
}
```

## Bilder

Die Komponente unterstützt Next.js Image-Optimierung:
- Platzhalter sind aktuell als Gradient implementiert
- Zum Aktivieren der echten Bilder: Kommentar bei Image-Component entfernen
- Bilder sollten im Format 16:9 oder quadratisch sein
- Empfohlene Größe: mindestens 800x600px

## Scroll-Indikator

Am unteren Rand der Section wird ein Scroll-Indikator angezeigt:
- "Scrollen Sie weiter" Text
- Animierter Pfeil nach unten (bounce)
- Verschwindet beim Scrollen

## Performance-Optimierungen

1. **invalidateOnRefresh**: Recalculiert Scroll-Distanz bei Window-Resize
2. **anticipatePin**: Verbessert Pinning-Performance
3. **scrub: 1**: Smooth Animation tied to scroll position
4. **dependencies: []**: GSAP Hook läuft nur beim Mount

## Anpassungen

### Farben ändern
Passen Sie das `colorMap` Objekt an:
```typescript
const colorMap = {
  blue: {
    accent: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-500',
  },
  // ...
};
```

### Animation-Timing
```typescript
// Scroll-Geschwindigkeit
scrub: 1, // Höhere Werte = langsamere Animation

// Card Fade-In Offset
start: `top+=${index * 200} top`, // 200 = Abstand zwischen Cards
```

### Card-Größe
```typescript
style={{
  width: '85vw',      // Viewport-basierte Breite
  maxWidth: '1100px', // Maximale Breite
  height: '500px',    // Feste Höhe
}}
```

## Browser-Kompatibilität

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅ (mit GSAP 3.12+)
- Mobile: ✅ (responsive Layout)
