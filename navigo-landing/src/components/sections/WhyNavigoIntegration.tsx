"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SectionTitle from '@/components/ui/SectionTitle';
import { ArrowDownCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-white py-20">
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
          
          <div className="text-center text-primary/70 font-medium pt-6">
            <p className="mb-2">Loading interactive experience...</p>
            <ArrowDownCircle className="mx-auto animate-bounce h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Create a Priya placeholder SVG in the public directory
const createPriyaPlaceholderSvg = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Create SVG content
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <circle cx="150" cy="150" r="120" fill="#1A5F7A" fill-opacity="0.2"/>
      <circle cx="150" cy="150" r="80" fill="#1A5F7A" fill-opacity="0.3"/>
      <circle cx="150" cy="110" r="40" fill="#1A5F7A" fill-opacity="0.5"/>
      <text x="150" y="190" font-family="Arial" font-size="24" fill="#1A5F7A" text-anchor="middle" dominant-baseline="middle">Priya</text>
      <text x="150" y="220" font-family="Arial" font-size="16" fill="#1A5F7A" text-anchor="middle" dominant-baseline="middle">Local Companion</text>
    </svg>`;
    
    // Check if placeholder exists and create it if needed
    // In a browser environment we can't actually write files, but we can create a Blob URL
    const priyaImage = new Image();
    priyaImage.src = '/priya-placeholder.svg';
    priyaImage.onerror = () => {
      // Create a blob URL
      const blob = new Blob([svgContent], {type: 'image/svg+xml'});
      const url = URL.createObjectURL(blob);
      
      // Log the URL for debugging
      console.info("Created Priya placeholder SVG blob URL:", url);
      
      // Optionally can be used for download in dev environments
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = 'priya-placeholder.svg';
      // link.click();
      // URL.revokeObjectURL(url);
    };
  } catch (error) {
    console.warn("Browser doesn't support SVG creation", error);
  }
};

// Main integration component
export default function WhyNavigoIntegration() {
  const [assetsReady, setAssetsReady] = useState(false);
  
  useEffect(() => {
    // Create array of image paths to preload
    const imagesToPreload = [
      '/Sarah-talking.svg',
      '/Sarah-anxious.svg',
      '/Sarah-happy-again-after-priya.svg',
      '/priya-placeholder.svg',
      '/images/indian-pattern.svg'
    ];
    
    // Try to create Priya placeholder
    createPriyaPlaceholderSvg();
    
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
        await Promise.all(imagesToPreload.map(preloadImage));
        setAssetsReady(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Set as loaded anyway to not block the UI
        setAssetsReady(true);
      }
    };
    
    // Load GSAP if needed
    const loadGSAP = () => {
      try {
        // Check if we need to dynamically import GSAP
        if (typeof window !== 'undefined' && typeof (window as any).gsap === 'undefined') {
          // In a real project, we'd load GSAP from CDN if needed
          console.info("GSAP would be loaded if not already available");
        }
      } catch (error) {
        console.warn("Error checking for GSAP:", error);
      }
    };
    
    // Initialize everything
    loadGSAP();
    preloadAll();
    
    // Set a timeout to ensure we don't block indefinitely
    const timeout = setTimeout(() => {
      setAssetsReady(true);
    }, 3000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  
  // Render the component or fallback based on loading status
  return assetsReady ? <WhyNavigoSection /> : <WhyNavigoSectionFallback />;
}