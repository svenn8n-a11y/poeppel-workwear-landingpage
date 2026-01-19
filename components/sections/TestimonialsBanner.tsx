'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Quote } from 'lucide-react';

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

interface TestimonialsBannerData {
  section_id: string;
  headline: string;
  items: TestimonialItem[];
}

interface TestimonialsBannerProps {
  data: TestimonialsBannerData;
}

export function TestimonialsBanner({ data }: TestimonialsBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const cards = track.querySelectorAll('.testimonial-card');

    if (cards.length === 0) return;

    // Calculate total width
    const cardWidth = (cards[0] as HTMLElement).offsetWidth;
    const gap = 32; // gap-8 = 2rem = 32px
    const totalWidth = (cardWidth + gap) * cards.length;

    // Infinite scroll animation
    gsap.to(track, {
      x: -totalWidth / 2,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });
  }, { scope: sectionRef });

  // Duplicate items for seamless loop
  const duplicatedItems = [...data.items, ...data.items];

  return (
    <section
      ref={sectionRef}
      id={data.section_id}
      className="relative bg-slate-900 text-white py-24 overflow-hidden"
    >
      {/* Section Headline */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">{data.headline}</h2>
      </div>

      {/* Scrolling Track */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-8"
          style={{ width: 'fit-content' }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="testimonial-card flex-shrink-0 w-[400px] bg-slate-800 rounded-2xl p-8 border border-slate-700"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-orange-500 mb-4 opacity-50" />

              {/* Quote Text */}
              <p className="text-slate-200 text-lg leading-relaxed mb-6 italic">
                "{item.quote}"
              </p>

              {/* Author Info */}
              <div className="border-t border-slate-700 pt-4">
                <div className="font-bold text-white">{item.author}</div>
                <div className="text-sm text-slate-400">{item.role}</div>
                {item.company && (
                  <div className="text-xs text-orange-500 mt-1">{item.company}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fade Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
