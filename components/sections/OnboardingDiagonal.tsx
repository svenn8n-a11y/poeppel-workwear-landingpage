'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { OnboardingDiagonalData } from '@/lib/types';
import Image from 'next/image';

interface OnboardingDiagonalProps {
  data: OnboardingDiagonalData;
}

export function OnboardingDiagonal({ data }: OnboardingDiagonalProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !viewportRef.current || !wrapperRef.current || !bgRef.current) return;

    // Main Timeline for Diagonal Staircase Movement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: viewportRef.current,
        scrub: 1,
        start: 'top top',
        end: '+=500%',
      },
    });

    // Diagonal staircase animation: x → y → x → y (CUMULATIVE!)
    tl.to(wrapperRef.current, { x: '-100vw', duration: 1, ease: 'power2.inOut' })   // Step 1→2
      .to(wrapperRef.current, { y: '-100vh', duration: 1, ease: 'power2.inOut' }, '>') // Step 2→3
      .to(wrapperRef.current, { x: '-200vw', duration: 1, ease: 'power2.inOut' }, '>') // Step 3→4
      .to(wrapperRef.current, { y: '-200vh', duration: 1, ease: 'power2.inOut' }, '>'); // Step 4→5

    // Background Grid Animation (moves opposite to create camera effect)
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=500%',
        scrub: 1,
      },
      x: -400,
      y: -400,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id={data.section_id}
      className="relative h-[500vh]"
    >
      {/* Sticky Viewport */}
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-screen overflow-hidden bg-slate-950"
      >
        {/* Animated Background Grid */}
        <div
          ref={bgRef}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Section Headline - Fixed */}
        <div className="absolute top-10 left-10 z-50 max-w-md">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {data.headline}
          </h2>
          <div className="text-orange-500 text-sm uppercase tracking-widest">
            Scroll für Prozess →
          </div>
        </div>

        {/* Diagonal Wrapper (Camera Movement) */}
        <div
          ref={wrapperRef}
          className="absolute top-0 left-0 w-[300vw] h-[300vh] grid grid-cols-3 grid-rows-3"
        >
          {/* Steps Layout in Staircase Pattern */}
          {data.steps.map((step, index) => {
            // Staircase positions: (0,0), (1,0), (1,1), (2,1), (2,2)
            const positions = [
              { col: 1, row: 1 }, // Step 1: Start
              { col: 2, row: 1 }, // Step 2: Right
              { col: 2, row: 2 }, // Step 3: Down
              { col: 3, row: 2 }, // Step 4: Right
              { col: 3, row: 3 }, // Step 5: Down (if exists)
            ];

            const pos = positions[index] || { col: 1, row: 1 };

            return (
              <div
                key={step.id}
                className="flex items-center justify-center p-20"
                style={{
                  gridColumn: pos.col,
                  gridRow: pos.row,
                }}
              >
                <div className="max-w-2xl grid md:grid-cols-2 gap-12 items-center">
                  {/* Image Placeholder */}
                  <div className="relative h-80 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl font-bold text-white/20 mb-4">
                          {step.id}
                        </div>
                        <div className="text-white/60 text-sm uppercase tracking-widest">
                          {step.image_placeholder}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">
                      <span className="text-orange-400 font-bold text-2xl">
                        {step.id}
                      </span>
                    </div>
                    <h3 className="text-4xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-lg text-slate-300">
                      {step.description}
                    </p>
                    {step.details.length > 0 && (
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-slate-400"
                          >
                            <span className="text-orange-500 mt-1">•</span>
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
