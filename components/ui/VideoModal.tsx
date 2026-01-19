'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  posterImage?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  posterImage,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!modalRef.current || !contentRef.current) return;

    if (isOpen) {
      gsap.to(modalRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
      });
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
      });
      gsap.to(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 opacity-0 pointer-events-none"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={32} />
        </button>
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterImage}
            controls
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
