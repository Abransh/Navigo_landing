// src/lib/animation-utils.ts
export const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  export const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };



/**
 * Checks if a script is already loaded by its source URL
 */
export function isScriptLoaded(src: string): boolean {
  return document.querySelector(`script[src="${src}"]`) !== null;
}

/**
 * Dynamically loads a script if it's not already loaded
 */
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isScriptLoaded(src)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Preloads image assets for better performance
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to preload image: ${url}`));
    });
  });
  
  return Promise.all(promises);
}

/**
 * Loads all required 3D dependencies for the animation
 */
export async function load3DAnimationDependencies(): Promise<void> {
  try {
    // Load Three.js and GSAP libraries in the correct order
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/DrawSVGPlugin.min.js');
    await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.min.js');
    
    // Preload images used in the animation
    await preloadImages([
      'https://assets.codepen.io/557388/background-reduced.jpg',
      'https://assets.codepen.io/557388/clouds.png',
      'https://assets.codepen.io/557388/sunset-reduced.jpg'
    ]);
    
    console.log('All 3D animation dependencies loaded');
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to load 3D animation dependencies:', error);
    return Promise.reject(error);
  }
}

/**
 * Helper to detect if we're in a mobile viewport
 */
export function isMobileViewport(): boolean {
  return window.innerWidth < 768;
}