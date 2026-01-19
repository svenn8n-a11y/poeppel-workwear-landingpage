'use client';

import { useRef, useState } from 'react';
import { TrendingDown, CheckCircle, Eye, Clock } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface BenefitItem {
  id: number;
  metric: string;
  title: string;
  description: string;
  icon: string;
}

interface BenefitsData {
  section_id: string;
  headline: string;
  subheadline: string;
  items: BenefitItem[];
}

interface BenefitsProps {
  data: BenefitsData;
}

const iconMap = {
  'trending-down': TrendingDown,
  'check-circle': CheckCircle,
  eye: Eye,
  clock: Clock,
};

export function Benefits({ data }: BenefitsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersAnimated, setCountersAnimated] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const metrics = sectionRef.current.querySelectorAll('.benefit-metric');
    const cards = sectionRef.current.querySelectorAll('.benefit-card');

    // Animate cards
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
        delay: index * 0.2,
        ease: 'power2.out',
      });
    });

    // Counter animation
    metrics.forEach((metric, index) => {
      const metricValue = data.items[index].metric;

      // Extract number from metric (e.g., "70%" -> 70, "24/7" -> skip animation)
      const hasPercentage = metricValue.includes('%');
      const numericValue = parseInt(metricValue);

      if (hasPercentage && !isNaN(numericValue)) {
        gsap.from(metric, {
          scrollTrigger: {
            trigger: metric,
            start: 'top 80%',
            onEnter: () => {
              if (!countersAnimated) {
                animateCounter(metric as HTMLElement, numericValue, '%');
              }
            },
            once: true,
          },
        });
      }
    });

    setCountersAnimated(true);
  }, { scope: sectionRef, dependencies: [data] });

  const animateCounter = (element: HTMLElement, target: number, suffix: string) => {
    const duration = 2000;
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(easeOutExpo * target);

      element.textContent = `${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <section
      ref={sectionRef}
      id={data.section_id}
      className="relative bg-white text-slate-900 py-32 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          {data.headline}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-slate-600">
          {data.subheadline}
        </p>
      </div>

      {/* Benefits Grid - 4 columns on desktop */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || CheckCircle;

          return (
            <div
              key={item.id}
              className="benefit-card group relative p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50
                border-2 border-slate-200 hover:border-blue-300 transition-all duration-500
                hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Metric - Large Display */}
              <div className="mb-6">
                <div className="benefit-metric text-6xl md:text-7xl font-black text-transparent
                  bg-clip-text bg-gradient-to-br from-blue-600 to-orange-500
                  group-hover:scale-110 transition-transform duration-500">
                  {item.metric}
                </div>
              </div>

              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600
                  rounded-xl flex items-center justify-center
                  group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-slate-900 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Hover Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-orange-500
                opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
