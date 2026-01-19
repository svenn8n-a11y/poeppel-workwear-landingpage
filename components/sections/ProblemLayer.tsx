'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import type { ProblemSectionData } from '@/lib/types';

interface ProblemLayerProps {
  data: ProblemSectionData;
}

export const ProblemLayer: React.FC<ProblemLayerProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const painPointsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Ken Burns effect on background image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.2,
        ease: 'none',
      });

      // Fade in pain points as they scroll into view
      painPointsRef.current.forEach((el, index) => {
        if (!el) return;

        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          x: -100,
          opacity: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative min-h-screen"
    >
      {/* Sticky Background Image Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden -z-10">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-gradient-to-br from-zinc-700 via-zinc-600 to-zinc-500"
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content that scrolls over the image */}
      <div className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-24 text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {data.title}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Pain Points */}
          <div className="space-y-16 mb-32">
            {data.pain_points.map((point, index) => (
              <div
                key={index}
                ref={(el) => {
                  painPointsRef.current[index] = el;
                }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {point.title}
                </h3>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          {/* Whitepaper CTA */}
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {data.whitepaper_download.headline}
            </h3>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {data.whitepaper_download.text}
            </p>
            <Button
              variant="primary"
              className="flex items-center gap-3 mx-auto"
            >
              <Download size={20} />
              {data.whitepaper_download.button_label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
