// src/components/AnimationLoader.tsx
import React from 'react';

interface AnimationLoaderProps {
  className?: string;
}

const AnimationLoader: React.FC<AnimationLoaderProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          {/* Animated airplane */}
          <div className="absolute inset-0 animate-bounce">
            <svg width="64" height="64" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M101.925 50.8369C103.455 50.2994 104.212 48.642 103.675 47.1123C103.137 45.5826 101.48 44.8249 99.9497 45.3624L83.3247 51.03L44.025 33.8997L36.75 38.4747L59.625 59.9997L43 65.6673L29.175 58.9797L24.6 62.0247L39.075 74.9997L86.7 56.5047L101.925 50.8369Z" fill="white"/>
            </svg>
          </div>
          
          {/* Animated circles */}
          <div className="absolute inset-0 animate-ping opacity-50">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
            </svg>
          </div>
          <div className="absolute inset-0 animate-pulse opacity-75">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="20" stroke="white" strokeWidth="1" strokeOpacity="0.7" />
            </svg>
          </div>
        </div>
        <p className="mt-4 text-white text-lg font-heading font-medium">Loading Experience</p>
        <p className="text-white/70 text-sm mt-1">Preparing your journey through India</p>
      </div>
    </div>
  );
};

export default AnimationLoader;