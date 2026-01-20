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
      className="relative bg-slate-950 overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Section Header */}
      <div className="absolute top-16 left-0 right-0 z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4">
            Der Pöppel Kreislauf
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {data.headline}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl text-slate-400">
            {data.subheadline}
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="absolute h-full flex items-center gap-20 px-20"
        style={{ paddingTop: '12rem', width: 'max-content', left: '0' }}
      >
        {data.cards.map((card) => {
          const colors = colorMap[card.color as keyof typeof colorMap] || colorMap.orange;

          return (
            <div
              key={card.id}
              className="potential-card group bg-slate-900 rounded-[3rem] border border-white/10 overflow-hidden flex flex-col md:flex-row relative transition-all duration-700"
              style={{
                width: '80vw',
                maxWidth: '700px',
                height: '500px',
              }}
            >
              {/* Content Section - Left Side */}
              <div className="flex-1 p-10 flex flex-col justify-between z-10">
                {/* Card Number - Large Background */}
                <span className="text-6xl font-black text-white/5">
                  {card.number}
                </span>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white group-hover:text-orange-500 transition-colors">
                    {card.title}
                  </h3>
                  <h4 className="text-lg font-serif italic text-slate-400">
                    {card.description}
                  </h4>
                </div>
              </div>

              {/* Image Section - Right Side */}
              <div className="w-full md:w-1/2 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                  {/* Placeholder for image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className={`w-32 h-32 ${colors.accent} rounded-full opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700`}></div>
                  </div>
                </div>
                {/* Uncomment when images are available */}
                {/* <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                /> */}
              </div>
            </div>
          );
        })}

        {/* Spacer to ensure last card is visible */}
        <div className="w-12 flex-shrink-0"></div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 left-6 right-6 h-[1px] bg-white/10 z-20">
        <div
          className="h-full bg-orange-500 transition-all duration-100 ease-linear"
          style={{
            width: `${Math.min(100, Math.max(0, (containerRef.current?.getBoundingClientRect().left || 0) * -1 / (containerRef.current?.scrollWidth || 1) * 100))}%`
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-slate-500 text-sm">
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
