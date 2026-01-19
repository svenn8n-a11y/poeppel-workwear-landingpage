'use client';

import { NavigationData } from '@/lib/types';

interface NavigationProps {
  data: NavigationData;
}

export function Navigation({ data }: NavigationProps) {
  const scrollToAnchor = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo Placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              {data.brand}
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-8">
            {data.links.map((link) => (
              <li key={link.anchor}>
                <button
                  onClick={() => scrollToAnchor(link.anchor)}
                  className="text-white font-medium text-sm hover:opacity-70 transition-opacity duration-200"
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
