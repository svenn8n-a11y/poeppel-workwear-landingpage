'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import type { VideoShowcaseData } from '@/lib/types';

interface VideoShowcaseProps {
  data: VideoShowcaseData;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Video card animation
      gsap.from(videoCardRef.current, {
        scrollTrigger: {
          trigger: videoCardRef.current,
          start: 'top 75%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Hover effect for video card
      if (videoCardRef.current) {
        const videoCard = videoCardRef.current;

        videoCard.addEventListener('mouseenter', () => {
          gsap.to(videoCard, {
            y: -8,
            scale: 1.01,
            boxShadow: '0 30px 100px rgba(0,0,0,0.35)',
            duration: 0.5,
            ease: 'power2.out',
          });
        });

        videoCard.addEventListener('mouseleave', () => {
          gsap.to(videoCard, {
            y: 0,
            scale: 1,
            boxShadow: '0 20px 80px rgba(0,0,0,0.25)',
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id={data.section_id}
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 leading-tight">
            {data.headline}
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Video Container */}
        <div className="relative flex justify-center items-center px-4 md:px-8">
          <div
            ref={videoCardRef}
            className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.25)] transition-all duration-500"
          >
            {/* Video Embed */}
            <div className="relative w-full pb-[56.25%] h-0 bg-black">
              {data.video_type === 'youtube' ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-none"
                  src={data.video_url}
                  title={data.headline}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : data.video_type === 'vimeo' ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-none"
                  src={data.video_url}
                  title={data.headline}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <video
                  className="absolute top-0 left-0 w-full h-full"
                  controls
                  poster={data.poster_image}
                  preload="metadata"
                >
                  <source src={data.video_url} type="video/mp4" />
                  Ihr Browser unterstützt das Video-Tag nicht.
                </video>
              )}
            </div>
          </div>
        </div>

        {/* Optional caption or CTA below video */}
        {data.caption && (
          <div className="text-center mt-12">
            <p className="text-base md:text-lg text-zinc-500 italic max-w-2xl mx-auto">
              {data.caption}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
