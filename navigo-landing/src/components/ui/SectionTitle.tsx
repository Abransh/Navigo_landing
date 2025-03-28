// src/components/ui/SectionTitle.tsx
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  accentColor?: 'primary' | 'secondary' | 'earth';
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  centered = true
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <div className="inline-block relative mb-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy">
          {title}
        </h2>
        
        {/* Decorative underline element inspired by Indian designs */}
        {centered ? (
          <div className="flex items-center justify-center mt-4">
            <div className="w-10 h-1 rounded-full bg-secondary"></div>
            <div className="w-1 h-1 rounded-full bg-earth mx-1"></div>
            <div className="w-20 h-1 rounded-full bg-primary"></div>
            <div className="w-1 h-1 rounded-full bg-earth mx-1"></div>
            <div className="w-10 h-1 rounded-full bg-secondary"></div>
          </div>
        ) : (
          <div className="flex items-center mt-3">
            <div className="w-16 h-1 rounded-full bg-secondary"></div>
            <div className="w-1 h-1 rounded-full bg-earth mx-1"></div>
            <div className="w-8 h-1 rounded-full bg-primary"></div>
          </div>
        )}
      </div>
      
      {subtitle && (
        <p className="text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}