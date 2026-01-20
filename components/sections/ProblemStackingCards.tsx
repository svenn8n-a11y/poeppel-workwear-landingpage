'use client';

import { useRef } from 'react';
import { Users, DollarSign, ShieldAlert, TrendingDown, Clock, Package, Settings, Database, FileText, AlertTriangle, Layers, Zap } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ProblemStackingData } from '@/lib/types';

interface ProblemStackingCardsProps {
  data: ProblemStackingData;
}

const iconMap = {
  users: Users,
  trending: TrendingDown,
  clock: Clock,
  settings: Settings,
  dollar: DollarSign,
  package: Package,
  database: Database,
  layers: Layers,
  file: FileText,
  alert: AlertTriangle,
  shield: ShieldAlert,
  zap: Zap,
};

export function ProblemStackingCards({ data }: ProblemStackingCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.problem-card');

    // Create sequential stacking animation
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        y: window.innerHeight * 0.5, // Start from 50vh below
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        delay: index * 0.3, // Sequential delay for stacking effect
        ease: 'power3.out',
      });
    });
  }, { scope: sectionRef });

  const getIconComponent = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || AlertTriangle;
    return Icon;
  };

  return (
    <section
      ref={sectionRef}
      id={data.section_id}
      className="relative bg-slate-100 text-slate-900 py-24 px-6 md:px-12"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20 px-6 md:px-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Die Kaskade der{' '}
          <span className="text-orange-600 font-serif italic">Ineffizienz</span>
        </h2>
        <p className="text-lg md:text-xl max-w-2xl text-slate-600">
          {data.subheadline}
        </p>
      </div>

      {/* Stacking Cards with 4 Segments each */}
      <div className="space-y-8">
        {data.cards.map((card) => {
          const isDark = card.bg_color === 'dark';

          return (
            <div
              key={card.id}
              className="problem-card sticky max-w-6xl mx-auto rounded-2xl shadow-xl"
              style={{
                top: card.sticky_top,
                zIndex: card.z_index,
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                color: isDark ? '#ffffff' : '#0f172a',
                border: isDark ? 'none' : '1px solid #e2e8f0',
              }}
            >
              {/* Card Title */}
              <div className={`px-8 md:px-12 py-6 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                <h3 className="text-2xl md:text-3xl font-bold">{card.title}</h3>
              </div>

              {/* 4 Segments Grid */}
              <div className="grid md:grid-cols-2 gap-6 p-8 md:p-12">
                {card.segments.map((segment, index) => {
                  const Icon = getIconComponent(segment.icon);

                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDark
                          ? 'bg-slate-800/50 hover:bg-slate-800'
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            isDark
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-orange-100 text-orange-600'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h4
                            className={`text-base md:text-lg font-bold mb-2 ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {segment.title}
                          </h4>
                          <p
                            className={`text-sm leading-relaxed ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {segment.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
