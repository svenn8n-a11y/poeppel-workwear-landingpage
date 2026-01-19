'use client';

import { useRef, useState } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { HeroData, ElevatorPitchData } from '@/lib/types';
import { VideoModal } from '@/components/ui/VideoModal';
import Image from 'next/image';

interface HeroWorkwearProps {
  data: HeroData;
  elevatorPitch: ElevatorPitchData;
}

export function HeroWorkwear({ data, elevatorPitch }: HeroWorkwearProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

    // Parallax Background Effect
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 200,
      opacity: 0.5,
    });

    // Fade out content on scroll
    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      opacity: 0,
      y: -100,
    });

    // Entrance animations
    const tl = gsap.timeline();
    tl.from('.hero-badge', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from('.hero-headline', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.4')
      .from('.hero-quote', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')
      .from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4');
  }, { scope: sectionRef });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Background Image with Parallax */}
        <div ref={bgRef} className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src={`/images/${data.background_image}`}
              alt="Workwear Management Background"
              fill
              className="object-cover opacity-40 scale-105"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 text-center space-y-8 px-4 max-w-5xl"
        >
          {/* Badge with Pulsing Dot */}
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-widest text-orange-400 mb-4">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            Systempartner 4.0
          </div>

          {/* Headline */}
          <h1 className="hero-headline text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] text-white mix-blend-overlay opacity-90">
            {data.headline.split(' ').map((word, idx) => (
              <span key={idx}>
                {word}
                {idx === 1 && <br />}
                {idx < data.headline.split(' ').length - 1 && ' '}
              </span>
            ))}
          </h1>

          {/* Quote/Subline */}
          <p className="hero-quote text-xl md:text-3xl font-serif italic text-slate-300 max-w-2xl mx-auto">
            "{data.subline.split('.')[0]}."
          </p>

          {/* Video Trigger Button */}
          <div className="hero-cta pt-12 flex flex-col items-center gap-4">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group flex items-center gap-4 cursor-pointer"
              aria-label="Play elevator pitch video"
            >
              <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-all duration-500">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <span className="text-sm uppercase tracking-widest text-white group-hover:text-orange-500 transition-colors">
                {data.video_trigger}
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={elevatorPitch.video_url}
        posterImage={elevatorPitch.poster_image}
      />
    </>
  );
}
