'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Button } from '@/components/ui/Button';
import { VideoModal } from '@/components/ui/VideoModal';
import { Play } from 'lucide-react';
import type { HeroData, ElevatorPitchData } from '@/lib/types';

interface HeroProps {
  data: HeroData;
  elevatorPitch: ElevatorPitchData;
}

export const Hero: React.FC<HeroProps> = ({ data, elevatorPitch }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          sublineRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 1,
          },
          '-=0.6'
        )
        .from(
          ctaContainerRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        );

      // Parallax effect on scroll
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 200,
        opacity: 0.5,
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
      >
        {/* Background overlay for industrial look */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1
            ref={headlineRef}
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
          >
            {data.headline}
          </h1>

          <p
            ref={sublineRef}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {data.subline}
          </p>

          <div ref={ctaContainerRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="primary">{data.cta_primary}</Button>
            <Button
              variant="outline"
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-3"
            >
              <Play size={20} />
              {data.video_trigger}
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={elevatorPitch.video_url}
        posterImage={elevatorPitch.poster_image}
      />
    </>
  );
};
