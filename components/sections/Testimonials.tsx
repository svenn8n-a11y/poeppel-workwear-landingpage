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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scrollContainerRef.current) return;

      const testimonials = scrollContainerRef.current.children;
      const totalWidth = Array.from(testimonials).reduce((acc, el) => acc + (el as HTMLElement).offsetWidth, 0);

      // Create infinite scroll animation from right to left
      gsap.to(scrollContainerRef.current, {
        x: -totalWidth / 2,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: sectionRef, dependencies: [data.items] }
  );

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...data.items, ...data.items];

  return (
    <section
      id={data.section_id}
      ref={sectionRef}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="mb-16 px-6 md:px-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-4">
          {data.headline}
        </h2>
      </div>

      {/* Scrolling Banner Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-8"
          style={{ width: 'max-content' }}
        >
          {duplicatedItems.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg overflow-hidden border border-slate-200"
              style={{ width: '700px', height: '320px' }}
            >
              <div className="flex h-full">
                {/* Text Content - Left Side (60%) */}
                <div className="w-[60%] p-8 flex flex-col justify-between">
                  <div>
                    <Quote className="text-orange-500 mb-4" size={32} />
                    <blockquote className="text-base text-slate-700 leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  <div>
                    <div className="font-bold text-lg text-slate-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Image - Right Side (40%) */}
                <div className="w-[40%] relative bg-gradient-to-br from-slate-200 to-slate-300">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-orange-500/20"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays for smooth edge fade */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};
