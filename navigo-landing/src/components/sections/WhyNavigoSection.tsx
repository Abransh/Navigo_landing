"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/ui/SectionTitle';
import { useMobile } from '@/hooks/use-mobile';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define our conversation steps with corresponding character states
const conversationSteps = [
  {
    id: 'step-1',
    character: 'sarah-talking',
    text: "I want to visit India, it's so cultural, peaceful, and rich in heritage!",
    bubblePosition: 'right',
    bubbleColor: 'bg-sand border-earth',
  },
  {
    id: 'step-2',
    character: 'sarah-anxious',
    text: "But I'm worried about navigating all the chaos, language barriers, and safety concerns...",
    bubblePosition: 'right',
    bubbleColor: 'bg-sand border-earth',
  },
  {
    id: 'step-3',
    character: 'sarah-anxious',
    text: "I wish I had a friend there who could guide me and be my travel companion.",
    bubblePosition: 'right', 
    bubbleColor: 'bg-sand border-earth',
  },
  {
    id: 'step-4',
    character: 'priya-placeholder',
    text: "Hey Sarah, don't worry! I'm here to help you explore India safely.",
    bubblePosition: 'left',
    bubbleColor: 'bg-white border-primary',
  },
  {
    id: 'step-5',
    character: 'priya-placeholder',
    text: "I'll guide you to amazing food places that are authentic but not too spicy for travelers.",
    bubblePosition: 'left',
    bubbleColor: 'bg-white border-primary',
  },
  {
    id: 'step-6',
    character: 'priya-placeholder',
    text: "We'll stay in safe areas, and Navigo's team is backing us throughout your journey.",
    bubblePosition: 'left',
    bubbleColor: 'bg-white border-primary',
  },
  {
    id: 'step-7',
    character: 'sarah-happy',
    text: "That sounds amazing! I can't wait to explore the real India with you!",
    bubblePosition: 'right',
    bubbleColor: 'bg-sand border-earth',
  },
];

// Speech bubble component
interface SpeechBubbleProps {
  text: string;
  isVisible: boolean;
  position: 'left' | 'right';
  bubbleColor: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  isVisible,
  position,
  bubbleColor,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isVisible && textRef.current) {
      const textElement = textRef.current;
      const textContent = text;
      
      // Clear current text
      textElement.textContent = '';
      
      // Create typewriter effect
      gsap.to(textElement, {
        duration: Math.min(0.02 * textContent.length, 2.5), // Cap duration for long text
        onUpdate: function() {
          const progress = Math.floor(this.progress() * textContent.length);
          textElement.textContent = textContent.slice(0, progress);
        },
        ease: 'none',
      });
    }
  }, [isVisible, text]);

  const positionClasses = position === 'left' 
    ? 'left-4 md:left-10 after:left-5 after:-ml-5 after:border-r-0 after:border-l-[15px]' 
    : 'right-4 md:right-10 after:right-5 after:-mr-5 after:border-l-0 after:border-r-[15px]';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`absolute top-4 max-w-[260px] md:max-w-xs ${positionClasses} ${bubbleColor} rounded-xl p-4 shadow-md border z-30`}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4 }}
        >
          <p ref={textRef} className="text-navy text-sm md:text-base"></p>
          
          {/* Speech bubble tail */}
          <div 
            className={`absolute -bottom-4 ${bubbleColor} w-8 h-8 border transform rotate-45 after:content-[''] after:absolute after:top-0 after:h-0 after:w-0 after:border-t-[15px] after:border-solid after:border-transparent after:border-t-inherit`}
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main component
export default function WhyNavigoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const isMobile = useMobile();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setActiveStep(index);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Element must be 60% visible to trigger
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    
    stepsRef.current.forEach(step => {
      if (step) observer.observe(step);
    });

    return () => {
      stepsRef.current.forEach(step => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  useEffect(() => {
    // Create scroll position tracking to determine direction
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get SVG for current step
  const getCurrentCharacterSvg = () => {
    const currentStep = conversationSteps[activeStep];
    
    if (currentStep.character === 'sarah-talking') {
      return '/Sarah talking.svg';
    } else if (currentStep.character === 'sarah-anxious') {
      return '/Sarah anxious.svg';
    } else if (currentStep.character === 'sarah-happy') {
      return '/Sarah happy again after priya.svg';
    } else if (currentStep.character.includes('priya')) {
      // Placeholder for Priya until we have her SVG
      return '/placeholder-priya.svg';
    }
    
    return '/Sarah talking.svg'; // Default fallback
  };

  // Simple step navigation for mobile
  const handleNextStep = () => {
    if (activeStep < conversationSteps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  return (
    <section id="why-navigo" className="relative bg-white py-20 overflow-hidden" ref={containerRef}>
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-primary/5 to-transparent"></div>
        {/* Optional: India-inspired pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'url("/india-pattern-bg.svg")', 
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <SectionTitle title="Why Navigo?" subtitle="Experience India with a friend by your side" />
      </div>
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isMobile ? (
          // Mobile version - swipeable/tap through cards
          <div className="relative min-h-[60vh] flex flex-col items-center">
            {/* Character Image Container */}
            <div className="relative w-full h-[300px] mb-6">
              <div className="absolute inset-0 flex justify-center items-end">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-[300px] h-[300px]"
                >
                  {/* Since we don't have an actual Priya SVG, we'll handle it specially */}
                  {conversationSteps[activeStep].character.includes('priya') ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        Priya
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={getCurrentCharacterSvg()}
                      alt={conversationSteps[activeStep].character}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  )}
                </motion.div>
              </div>
            </div>
            
            {/* Speech Bubble */}
            <div className="relative w-full min-h-[150px] mb-8">
              <SpeechBubble
                text={conversationSteps[activeStep].text}
                isVisible={true}
                position={conversationSteps[activeStep].bubblePosition as 'left' | 'right'}
                bubbleColor={conversationSteps[activeStep].bubbleColor}
              />
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-between w-full mt-4">
              <button
                onClick={handlePrevStep}
                disabled={activeStep === 0}
                className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                disabled={activeStep === conversationSteps.length - 1}
                className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            
            {/* Progress Indicator */}
            <div className="mt-6 flex space-x-2">
              {conversationSteps.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    index === activeStep ? 'bg-primary' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop version - scroll-triggered
          <div className="relative">
            {/* Sticky character side */}
            <div className="sticky top-32 h-[60vh] flex items-end">
              <div className="w-full h-full flex justify-between relative">
                {/* Left side - Sarah */}
                <div className="absolute left-0 bottom-0 w-1/2 h-full flex items-end justify-start">
                  <AnimatePresence>
                    {!conversationSteps[activeStep].character.includes('priya') && (
                      <motion.div 
                        key={`sarah-${activeStep}`}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-[300px] h-[300px]"
                      >
                        <Image
                          src={getCurrentCharacterSvg()}
                          alt={conversationSteps[activeStep].character}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Right side - Priya */}
                <div className="absolute right-0 bottom-0 w-1/2 h-full flex items-end justify-end">
                  <AnimatePresence>
                    {conversationSteps[activeStep].character.includes('priya') && (
                      <motion.div 
                        key={`priya-${activeStep}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-[300px] h-[300px]"
                      >
                        {/* Placeholder for Priya - replace with actual SVG when available */}
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            Priya
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Speech Bubbles */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {conversationSteps.map((step, index) => (
                    <SpeechBubble
                      key={step.id}
                      text={step.text}
                      isVisible={activeStep === index}
                      position={step.bubblePosition as 'left' | 'right'}
                      bubbleColor={step.bubbleColor}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Scroll triggers */}
            <div className="relative mt-[20vh]">
              {conversationSteps.map((step, index) => (
                <div 
                  key={step.id}
                  ref={el => {
                    if (el) stepsRef.current[index] = el;
                  }}
                  data-index={index}
                  className="min-h-screen flex items-center justify-center"
                >
                  <div className="opacity-0 pointer-events-none">
                    Step {index + 1}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll indicator - only show for first step */}
            {activeStep === 0 && (
              <motion.div 
                className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <p className="mb-2 text-sm font-medium">Scroll down</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}