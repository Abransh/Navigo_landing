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
export async function load3DAnimationDependencies() {
  const scripts = [
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.min.js'
  ];

  const loadScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        console.warn(`Failed to load script: ${src}`);
        resolve(); // Resolve instead of reject to continue execution
      };
      document.head.appendChild(script);
    });
  };

  try {
    await Promise.all(scripts.map(loadScript));
  } catch (error) {
    console.error('Error loading animation dependencies:', error);
    throw error;
  }
}

/**
 * Helper to detect if we're in a mobile viewport
 */
export function isMobileViewport(): boolean {
  return window.innerWidth < 768;
}