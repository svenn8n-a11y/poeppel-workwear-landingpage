'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface PotentialCard {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface PotentialsData {
  section_id: string;
  headline: string;
  subheadline: string;
  cards: PotentialCard[];
}

interface PotentialsProps {
  data: PotentialsData;
}

const colorMap = {
  blue: {
    accent: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-500',
  },
  orange: {
    accent: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-500',
  },
  green: {
    accent: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
  },
  purple: {
    accent: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-500',
  },
};

export function Potentials({ data }: PotentialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const cards = container.querySelectorAll('.potential-card');

    // Calculate the total scroll distance
    const scrollWidth = container.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation
    gsap.to(container, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth + window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top+=${index * 200} top`,
          end: `top+=${index * 200 + 400} top`,
          scrub: 1,
        },
        opacity: 0.3,
        scale: 0.9,
      });
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      id={data.section_id}
      className="relative bg-slate-50 overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Section Header */}
      <div className="absolute top-16 left-0 right-0 z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900">
            {data.headline}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl text-slate-600">
            {data.subheadline}
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 px-6 md:px-12"
        style={{ paddingTop: '12rem', width: 'max-content' }}
      >
        {data.cards.map((card) => {
          const colors = colorMap[card.color as keyof typeof colorMap] || colorMap.blue;

          return (
            <div
              key={card.id}
              className="potential-card bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row relative"
              style={{
                width: '85vw',
                maxWidth: '1100px',
                height: '500px',
              }}
            >
              {/* Card Number - Top Left */}
              <div className="absolute top-8 left-8 z-20">
                <span className={`text-8xl font-bold ${colors.text} opacity-20`}>
                  {card.number}
                </span>
              </div>

              {/* Image Section - Left Side */}
              <div className="relative w-full md:w-1/2 h-64 md:h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200">
                  {/* Placeholder for image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className={`w-32 h-32 ${colors.accent} rounded-full opacity-20`}></div>
                  </div>
                </div>
                {/* Uncomment when images are available */}
                {/* <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                /> */}
              </div>

              {/* Content Section - Right Side */}
              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative">
                {/* Colored Accent Bar */}
                <div className={`absolute left-0 top-12 bottom-12 w-1 ${colors.accent}`}></div>

                <div className="pl-8">
                  <h3 className="text-4xl font-bold mb-6 text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-8 right-8 w-24 h-1 ${colors.accent}`}></div>
              </div>
            </div>
          );
        })}

        {/* Spacer to ensure last card is visible */}
        <div className="w-12 flex-shrink-0"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-slate-400 text-sm">
        <span>Scrollen Sie weiter</span>
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
