// src/components/sections/HeroIntegration.tsx
"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Dynamically import the enhanced hero component to prevent SSR issues with GSAP
const NavigoHeroSection = dynamic(
  () => import('@/components/sections/HeroSectionDesktop'),
  { 
    ssr: false,
    loading: () => <HeroLoadingFallback />
  }
);

// Loading fallback that displays while the main component is loading
const HeroLoadingFallback = () => {
  return (
    <section className="relative min-h-[90vh] bg-primary overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/indian-map.svg')] bg-repeat bg-contain" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0.5, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-sand"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-xl font-heading font-medium">Loading Experience...</p>
            <p className="text-sand/70">Preparing your journey through India</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// This component handles loading necessary assets before showing the hero section
export default function HeroIntegration() {
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);
  
  // Preload required assets
  useEffect(() => {
    // Create array of image paths to preload
    const imagesToPreload = [
      '/images/india-pattern-bg.svg',
      '/images/india-map-outline.svg',
      '/images/placeholder-priya.svg',
      '/images/clouds-simple.svg',
      '/images/airplane-silhouette.svg'
    ];
    
    // Function to preload a single image
    const preloadImage = (src: string): Promise<string> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve(src);
        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`);
          resolve(src); // Resolve anyway to continue
        };
        img.src = src;
      });
    };
    
    // Preload all images
    const preloadAll = async () => {
      try {
        await Promise.all(imagesToPreload.map(preloadImage));
        setAssetsPreloaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Set as loaded anyway to not block the UI
        setAssetsPreloaded(true);
      }
    };
    
    preloadAll();
  }, []);
  
  // Load GSAP plugins if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic import to avoid SSR issues
      import('@/utils/animation').then(({ loadGSAPPlugins }) => {
        loadGSAPPlugins();
      }).catch(error => {
        console.warn('GSAP plugins could not be loaded:', error);
      });
    }
  }, []);
  
  return assetsPreloaded ? <NavigoHeroSection /> : <HeroLoadingFallback />;
}

