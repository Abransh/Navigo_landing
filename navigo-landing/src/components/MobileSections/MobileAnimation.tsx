// src/components/MobileAnimation.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MobileAnimationProps {
  className?: string;
}

const MobileAnimation: React.FC<MobileAnimationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Airplane movement animation values
  const airplaneX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-100, 100, -100, 100, 0]);
  const airplaneY = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [50, 150, 100, 200, 150, 300]);
  const airplaneRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-10, 20, -20, 10, 0]);
  const airplaneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  
  // Background and sections animation values
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacitySection1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const opacitySection2 = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const opacitySection3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const opacitySection4 = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  
  return (
    <div ref={containerRef} className={`h-[400vh] relative overflow-hidden ${className}`}>
      {/* Background gradients */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-primary to-primary-dark">
        {/* Moving clouds */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 bg-[url('/images/clouds-simple.svg')] bg-repeat opacity-20 pointer-events-none"
        />
        
        {/* Airplane */}
        <motion.div
          style={{
            x: airplaneX,
            y: airplaneY,
            rotate: airplaneRotate,
            scale: airplaneScale
          }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <img 
            src="/images/airplane-silhouette.svg" 
            alt="Airplane" 
            className="w-32 h-auto text-white"
          />
        </motion.div>
        
        {/* Content sections */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-xl mx-auto px-6 text-center">
            {/* Section 1 */}
            <motion.div 
              style={{ opacity: opacitySection1 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2 className="text-4xl font-heading font-bold text-white mb-4">
                Your India Journey
              </h2>
              <p className="text-xl text-white/80">
                Experience India with a trusted local companion.
              </p>
            </motion.div>
            
            {/* Section 2 */}
            <motion.div 
              style={{ opacity: opacitySection2 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2 className="text-4xl font-heading font-bold text-white mb-4">
                Authentic Experiences
              </h2>
              <p className="text-xl text-white/80">
                Discover hidden gems beyond the tourist attractions.
              </p>
            </motion.div>
            
            {/* Section 3 */}
            <motion.div 
              style={{ opacity: opacitySection3 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2 className="text-4xl font-heading font-bold text-white mb-4">
                Safe & Reliable
              </h2>
              <p className="text-xl text-white/80">
                Travel with confidence alongside verified local companions.
              </p>
            </motion.div>
            
            {/* Section 4 */}
            <motion.div 
              style={{ opacity: opacitySection4 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2 className="text-4xl font-heading font-bold text-white mb-4">
                Join Navigo Today
              </h2>
              <p className="text-xl text-white/80 mb-6">
                Start your cultural journey through India.
              </p>
              <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-heading font-medium transition-colors">
                Reserve Your Companion
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAnimation;