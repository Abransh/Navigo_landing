// src/utils/animation.ts
export const loadGSAPPlugins = () => {
    if (typeof window !== 'undefined') {
      // Only import GSAP on the client side
      const gsap = require('gsap');
      const { ScrollTrigger } = require('gsap/ScrollTrigger');
      const { TextPlugin } = require('gsap/TextPlugin');
      
      // Register the plugins
      gsap.registerPlugin(ScrollTrigger, TextPlugin);
      
      // If using premium plugins, you would need to add proper licensing
      // This would typically be done using a .env variable
      // gsap.registerPlugin(SplitText); // Premium plugin, requires registration
      
      console.log('GSAP plugins registered');
      
      return gsap;
    }
    return null;
  };
  