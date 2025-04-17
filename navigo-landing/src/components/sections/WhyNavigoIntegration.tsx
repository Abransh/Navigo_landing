"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SectionTitle from '@/components/ui/SectionTitle';

// Dynamically import the WhyNavigo component to avoid SSR issues
const WhyNavigoSection = dynamic(
  () => import('@/components/sections/WhyNavigoSection'),
  { 
    ssr: false,
    loading: () => <WhyNavigoSectionFallback /> 
  }
);

// Fallback loading component shown while the main component loads
const WhyNavigoSectionFallback = () => {
  return (
    <div className="min-h-[60vh] bg-white py-20">
      <div className="sticky top-0 py-10 bg-white/95 backdrop-blur-sm z-20">
        <div className="text-center">
          <SectionTitle title="Why Navigo?" subtitle="Experience India with a friend by your side" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-20">
        <div className="animate-pulse space-y-8 w-full max-w-2xl">
          {/* Loading placeholder for characters */}
          <div className="flex justify-between">
            <div className="w-40 h-40 rounded-full bg-primary/20"></div>
            <div className="w-40 h-40 rounded-full bg-secondary/20"></div>
          </div>
          
          {/* Loading placeholder for speech bubbles */}
          <div className="flex flex-col space-y-4">
            <div className="h-20 bg-sand/50 rounded-xl w-4/5 self-end"></div>
            <div className="h-20 bg-white/70 rounded-xl w-4/5 self-start"></div>
          </div>
          
          <div className="text-center text-primary/70 font-medium">
            Loading interactive experience...
          </div>
        </div>
      </div>
    </div>
  );
};

// Create a simple placeholder SVG in the public directory if it doesn't exist
const createPlaceholderSvg = () => {
  if (typeof window === 'undefined') return;
  
  // Simple check if we're in a browser environment where we might need this
  try {
    // Create a simple SVG string
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="80" fill="#1A5F7A" fill-opacity="0.2"/>
        <text x="150" y="150" font-family="Arial" font-size="24" fill="#1A5F7A" text-anchor="middle" dominant-baseline="middle">Priya</text>
        <text x="150" y="180" font-family="Arial" font-size="16" fill="#1A5F7A" text-anchor="middle" dominant-baseline="middle">Local Companion</text>
      </svg>
    `;
    
    // We're not actually storing this file, just checking if the feature might be needed
    console.info("Placeholder SVG for Priya would be created in a real environment");
  } catch (error) {
    console.warn("Browser doesn't support SVG creation", error);
  }
};

// Main integration component
export default function WhyNavigoIntegration() {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  useEffect(() => {
    // Create array of image paths to preload
    const imagesToPreload = [
      '/Sarah-talking.svg',
      '/Sarah-anxious.svg',
      '/Sarah-happy-again-after-priya.svg',
      '/placeholder-priya.svg',
      // Include a fallback path to the india pattern
      '/india-pattern-bg.svg'
    ];
    
    // Function to preload a single image
    const preloadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
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
        // Try to create placeholder SVG in case it's needed
        createPlaceholderSvg();
        
        // Preload all images in parallel
        await Promise.all(imagesToPreload.map(preloadImage));
        setImagesPreloaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Set as loaded anyway to not block the UI
        setImagesPreloaded(true);
      }
    };
    
    preloadAll();
    
    // Clean up function if needed
    return () => {
      // Any cleanup here
    };
  }, []);
  
  // Render the component or fallback based on loading status
  return imagesPreloaded ? <WhyNavigoSection /> : <WhyNavigoSectionFallback />;
}