"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMobile } from '@/hooks/use-mobile';
import SectionTitle from '@/components/ui/SectionTitle';

// Dynamically import the WhyNavigo component to avoid SSR issues with GSAP
const WhyNavigoSection = dynamic(
  () => import('@/components/sections/WhyNavigoSection'),
  { 
    ssr: false,
    loading: () => <WhyNavigoSectionFallback /> 
  }
);

// Fallback loading component
const WhyNavigoSectionFallback = () => {
  return (
    <div className="min-h-screen bg-background py-20 flex items-center justify-center">
      <div className="text-center">
        <SectionTitle title="Why Navigo?" subtitle="Loading interactive experience..." />
        <div className="mt-8 flex justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-primary/30 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1 max-w-md">
              <div className="h-4 bg-primary/20 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-primary/10 rounded"></div>
                <div className="h-4 bg-primary/10 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component that replaces the "How Navigo Works" section
export default function WhyNavigoIntegration() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  
  useEffect(() => {
    // Function to preload SVG assets
    const preloadSvgs = async () => {
      try {
        // Create an array of promises that resolve when each image is loaded
        const svgUrls = [
          '/Sarah talking.svg',
          '/Sarah anxious.svg',
          '/Sarah happy again after priya.svg',
          // We'll have a fallback for Priya since we don't have her SVG yet
        ];
        
        const preloadPromises = svgUrls.map(url => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => {
              console.warn(`Failed to preload: ${url}`);
              resolve(url); // Resolve anyway to not block the UI
            };
            img.src = url;
          });
        });
        
        // Wait for all images to load
        await Promise.all(preloadPromises);
        setAssetsLoaded(true);
      } catch (error) {
        console.error('Error preloading SVGs:', error);
        // Set assets as loaded anyway to avoid blocking the UI
        setAssetsLoaded(true);
      }
    };
    
    // Create a placeholder for Priya SVG until we have it
    const createPriyaPlaceholder = () => {
      // Create a simple SVG as a placeholder
      const svgStr = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 320" width="200" height="320">
          <circle cx="100" cy="160" r="80" fill="#1A5F7A" opacity="0.2" />
          <text x="100" y="160" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="24" fill="#1A5F7A">Priya</text>
        </svg>
      `;
      
      // Create a blob URL
      const blob = new Blob([svgStr], {type: 'image/svg+xml'});
      const url = URL.createObjectURL(blob);
      
      // Add to document to enable loading
      const img = new Image();
      img.onload = () => {
        // Create a temporary link to save to the virtual filesystem
        const a = document.createElement('a');
        a.href = url;
        a.download = 'placeholder-priya.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
      img.src = url;
    };
    
    // Load assets and create placeholder
    preloadSvgs();
    createPriyaPlaceholder();
    
    // Clean up function
    return () => {
      // Any cleanup code here
    };
  }, []);
  
  return (
    <>
      {assetsLoaded ? (
        <WhyNavigoSection />
      ) : (
        <WhyNavigoSectionFallback />
      )}
    </>
  );
}