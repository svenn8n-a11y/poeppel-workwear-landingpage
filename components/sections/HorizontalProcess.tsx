'use client';

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import type { HorizontalProcessData } from '@/lib/types';

interface HorizontalProcessProps {
  data: HorizontalProcessData;
}

export const HorizontalProcess: React.FC<HorizontalProcessProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !slidesRef.current) return;

      const slides = slidesRef.current;
      const slideWidth = slides.scrollWidth - window.innerWidth;

      // Horizontal scroll animation
      const horizontalScroll = gsap.to(slides, {
        x: -slideWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${slideWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate each step card
      const stepCards = slides.querySelectorAll('.process-step');
      stepCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalScroll,
            start: 'left 80%',
            end: 'left 50%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      return () => {
        horizontalScroll.kill();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Video playback based on visibility
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
    >
      <div ref={containerRef} className="h-screen flex flex-col justify-center">
        {/* Fixed Title */}
        <div className="absolute top-20 left-0 right-0 z-20 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {data.title}
          </h2>
        </div>

        {/* Horizontal Scrolling Container */}
        <div ref={slidesRef} className="flex gap-16 px-[10vw] items-center will-change-transform">
          {data.steps.map((step, index) => (
            <div
              key={step.id}
              className="process-step flex-shrink-0 w-[600px] relative"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 group">
                {/* Video Container */}
                <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={step.video_loop}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Step number overlay */}
                  <div className="absolute top-6 left-6">
                    <span className="text-8xl font-bold text-white/20 leading-none">
                      {step.id}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-10">
                  <div className="inline-block bg-white/10 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                    {step.label}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
                    {step.headline}
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Arrow */}
              {index < data.steps.length - 1 && (
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-6xl text-white/20">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
