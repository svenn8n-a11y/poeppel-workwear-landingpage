'use client';

import { useRef } from 'react';
import { Users, DollarSign, ShieldAlert, TrendingDown, Clock, Package, Settings, Database, FileText, AlertTriangle, Layers, Zap } from 'lucide-react';
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

  const getIconComponent = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || AlertTriangle;
    return Icon;
  };

  return (
    <section
      ref={sectionRef}
      id={data.section_id}
      className="relative bg-slate-100 text-slate-900 py-32 px-6"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Die Kaskade der <br />
          <span className="text-orange-600 font-serif italic">Ineffizienz</span>
        </h2>
        <p className="text-xl max-w-xl text-slate-600">
          {data.subheadline}
        </p>
      </div>

      {/* Sticky Stacking Cards - Entwurf 1 Style */}
      <div className="space-y-32">
        {data.cards.map((card, cardIndex) => {
          const isDark = card.bg_color === 'dark';

          // Sticky positioning like Entwurf 1: first card top-32, second top-40, etc.
          const stickyTop = cardIndex === 0 ? 'top-32' : 'top-40';
          const zIndex = cardIndex === 0 ? 'z-10' : 'z-20';

          return (
            <div
              key={card.id}
              className={`sticky ${stickyTop} ${zIndex} ${
                isDark ? 'bg-slate-900 text-white' : 'bg-white'
              } rounded-3xl p-12 shadow-2xl ${
                isDark ? '' : 'border border-slate-200'
              } grid md:grid-cols-2 gap-12 items-center transition-transform duration-500 hover:scale-[1.02]`}
            >
              {/* Left Column - Segments */}
              <div className="space-y-6">
                {card.segments.slice(0, 2).map((segment, index) => {
                  const Icon = getIconComponent(segment.icon);
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          isDark
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {segment.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {segment.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column - Segments */}
              <div className="space-y-6">
                {card.segments.slice(2, 4).map((segment, index) => {
                  const Icon = getIconComponent(segment.icon);
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          isDark
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {segment.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {segment.description}
                        </p>
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
