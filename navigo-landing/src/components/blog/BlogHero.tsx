// src/components/blog/BlogHero.tsx
import React from 'react';

interface BlogHeroProps {
  title: string;
  subtitle?: string;
}

export function BlogHero({ title, subtitle }: BlogHeroProps) {
  return (
    <section className="bg-primary py-16 relative overflow-hidden">
      {/* Background pattern - inspired by Indian designs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/indian-pattern.svg')] bg-repeat bg-contain" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Wave decoration with Indian-inspired pattern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" fill="#FFF8EA"/>
          <path d="M120 32C150 25 180 35 210 32C240 28 270 18 300 20C330 22 360 35 390 35C420 35 450 20 480 18C510 16 540 25 570 30C600 35 630 37 660 35C690 33 720 27 750 27C780 27 810 32 840 30C870 28 900 20 915 16L930 12" stroke="#FF9933" strokeWidth="1" strokeDasharray="2 3" opacity="0.3"/>
        </svg>
      </div>
    </section>
  );
}
