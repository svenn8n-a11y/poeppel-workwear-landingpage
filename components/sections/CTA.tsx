'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import type { CtaFinalData } from '@/lib/types';

interface CTAProps {
  data: CtaFinalData;
}

export const CTA: React.FC<CTAProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-40 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          {data.headline}
        </h2>

        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          {data.text}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="primary" className="text-xl px-10 py-5">
            {data.button_primary}
          </Button>
          <Button variant="outline" className="flex items-center gap-3 text-xl px-10 py-5">
            <Download size={24} />
            {data.button_secondary}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-32 text-center text-white/50 text-sm">
        <p>© 2026 Pöppel Workwear Management. Alle Rechte vorbehalten.</p>
      </footer>
    </section>
  );
};
