'use client';

import { useRef } from 'react';
import { TrendingUp, DollarSign, Eye, Workflow } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface PotentialCard {
  id: number;
  title: string;
  description: string;
  icon: string;
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

const iconMap = {
  trending: TrendingUp,
  dollar: DollarSign,
  eye: Eye,
  workflow: Workflow,
};

const colorMap = {
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    bgLight: 'bg-orange-50',
    border: 'border-orange-200',
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    bgLight: 'bg-green-50',
    border: 'border-green-200',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    bgLight: 'bg-purple-50',
    border: 'border-purple-200',
  },
};

export function Potentials({ data }: PotentialsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.potential-card');

    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power2.out',
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id={data.section_id}
      className="relative bg-white text-slate-900 py-32 px-6"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          {data.headline}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-slate-600">
          {data.subheadline}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.cards.map((card) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap] || TrendingUp;
          const colors = colorMap[card.color as keyof typeof colorMap] || colorMap.orange;

          return (
            <div
              key={card.id}
              className={`potential-card group p-8 rounded-2xl border-2 ${colors.border} ${colors.bgLight} transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-3 ${colors.text}`}>
                {card.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
