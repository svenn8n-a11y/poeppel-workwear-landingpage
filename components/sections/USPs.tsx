'use client';

import { useRef } from 'react';
import {
  Award,
  Target,
  ShieldCheck,
  Smartphone,
  UserCheck,
  Link2,
  Leaf,
  FileCheck,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface USPTile {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface USPsData {
  section_id: string;
  headline: string;
  subheadline: string;
  tiles: USPTile[];
}

interface USPsProps {
  data: USPsData;
}

const iconMap = {
  award: Award,
  target: Target,
  'shield-check': ShieldCheck,
  smartphone: Smartphone,
  'user-check': UserCheck,
  link: Link2,
  leaf: Leaf,
  'file-check': FileCheck,
};

const colorMap = {
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    bgLight: 'bg-orange-50',
    border: 'border-orange-200',
    glow: 'group-hover:shadow-orange-200',
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
    glow: 'group-hover:shadow-blue-200',
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    bgLight: 'bg-green-50',
    border: 'border-green-200',
    glow: 'group-hover:shadow-green-200',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    bgLight: 'bg-purple-50',
    border: 'border-purple-200',
    glow: 'group-hover:shadow-purple-200',
  },
};

export function USPs({ data }: USPsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tiles = sectionRef.current.querySelectorAll('.usp-tile');

    // Stagger animation for tiles
    tiles.forEach((tile, index) => {
      gsap.from(tile, {
        scrollTrigger: {
          trigger: tile,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: (index % 4) * 0.1, // Stagger per row
        ease: 'power2.out',
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id={data.section_id}
      className="relative bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 py-32 px-6"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(249,115,22,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          {data.headline}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-slate-600">
          {data.subheadline}
        </p>
      </div>

      {/* 8-Tile Grid: 2 rows x 4 columns on desktop */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.tiles.map((tile) => {
          const Icon = iconMap[tile.icon as keyof typeof iconMap] || Award;
          const colors = colorMap[tile.color as keyof typeof colorMap] || colorMap.orange;

          return (
            <div
              key={tile.id}
              className={`usp-tile group p-8 rounded-2xl border-2 ${colors.border} ${colors.bgLight}
                transition-all duration-500 hover:scale-105 hover:shadow-2xl ${colors.glow}
                hover:-translate-y-2 cursor-pointer`}
            >
              {/* Icon with animated background */}
              <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-6
                group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className={`text-lg font-bold mb-3 ${colors.text} leading-tight`}>
                {tile.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {tile.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
