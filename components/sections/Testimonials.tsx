'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import type { TestimonialsData } from '@/lib/types';

interface TestimonialsProps {
  data: TestimonialsData;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
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
      id={data.section_id}
      ref={sectionRef}
      className="py-32 bg-gradient-to-br from-zinc-50 via-white to-zinc-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-bold text-center text-zinc-900 mb-20">
          {data.headline}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {data.items.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="mb-8">
                <Quote className="text-zinc-300" size={48} />
              </div>

              <blockquote className="text-xl md:text-2xl text-zinc-700 leading-relaxed mb-8 font-light italic">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-zinc-200">
                  {testimonial.image && (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="font-bold text-lg text-zinc-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-zinc-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
