"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import { useMobile } from '@/hooks/use-mobile';

// Define our conversation steps with corresponding character states
const conversationSteps = [
  {
    id: 'step-1',
    character: 'sarah-talking',
    text: "I want to visit India! It's so cultural, peaceful, and rich in heritage.",
    bubblePosition: 'right' as const,
    bubbleColor: 'bg-sand border-earth',
  },
  {
    id: 'step-2',
    character: 'sarah-anxious',
    text: "But I'm worried about navigating the chaos, language barriers, and safety concerns...",
    bubblePosition: 'right' as const,
    bubbleColor: 'bg-sand border-earth',
  },
  {
    id: 'step-3',
    character: 'sarah-anxious',
    text: "I wish I had a friend there who could guide me and be my travel companion.",
    bubblePosition: 'right' as const, 
    bubbleColor: 'bg-sand border-earth',
  },
  {
    id: 'step-4',
    character: 'priya-placeholder',
    text: "Hey Sarah, don't worry! I'm here to help you explore India safely.",
    bubblePosition: 'left' as const,
    bubbleColor: 'bg-white border-primary',
  },
  {
    id: 'step-5',
    character: 'priya-placeholder',
    text: "I'll guide you to amazing food places that are authentic but not too spicy for travelers.",
    bubblePosition: 'left' as const,
    bubbleColor: 'bg-white border-primary',
  },
  {
    id: 'step-6',
    character: 'priya-placeholder',
    text: "We'll stay in safe areas, and Navigo's team is backing us throughout your journey.",
    bubblePosition: 'left' as const,
    bubbleColor: 'bg-white border-primary',
  },
  {
    id: 'step-7',
    character: 'priya-placeholder',
    text: "I'll show you India's hidden gems beyond the usual tourist spots - beautiful places with less crowd!",
    bubblePosition: 'left' as const,
    bubbleColor: 'bg-white border-primary',
  },
  {
    id: 'step-8',
    character: 'sarah-happy',
    text: "That sounds amazing! I can't wait to explore the real India with you!",
    bubblePosition: 'right' as const,
    bubbleColor: 'bg-sand border-earth',
  },
];

// Speech bubble component
interface SpeechBubbleProps {
  text: string;
  isVisible: boolean;
  position: 'left' | 'right';
  bubbleColor: string;
  delay?: number;
  className?: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  isVisible,
  position,
  bubbleColor,
  delay = 0,
  className
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Simple typewriter effect with React state
  useEffect(() => {
    if (isVisible && text) {
      setTypedText(""); // Reset text
      setIsTyping(true);
      
      let i = 0;
      const typeSpeed = 30; // ms per character
      
      const typeWriter = () => {
        if (i < text.length) {
          setTypedText(prev => prev + text.charAt(i));
          i++;
          setTimeout(typeWriter, typeSpeed);
        } else {
          setIsTyping(false);
        }
      };
      
      // Start typing after a short delay
      const timer = setTimeout(typeWriter, 300);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, text]);

  const bubbleClass = position === 'left' ? 'speech-bubble-left' : 'speech-bubble-right';

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={`absolute ${position === 'left' ? 'left-8 md:left-24' : 'right-8 md:right-28'} top-4 
            w-64 md:w-80 ${bubbleColor} rounded-xl p-4 shadow-md border z-30 ${bubbleClass} ${className}`}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, delay: delay * 0.1 }}
        >
          <p ref={textRef} className="text-navy text-sm md:text-base min-h-[3.5rem]">
            {typedText}
            {isTyping && <span className="inline-block w-[2px] h-[14px] bg-primary ml-[1px] animate-pulse"></span>}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main component
export default function WhyNavigoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMobile();
  const [scrollHeight, setScrollHeight] = useState(0);

  // Calculate and set section height for proper stickiness
  useEffect(() => {
    if (sectionRef.current) {
      // Set section height based on number of steps (one viewport height per step)
      const totalHeight = window.innerHeight * conversationSteps.length;
      setScrollHeight(totalHeight);
      sectionRef.current.style.height = `${totalHeight}px`;
    }
  }, []);

  // Handle scroll-based step transitions
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (scrollHeight - window.innerHeight);
      
      // Calculate which step we're on based on scroll position
      const newStep = Math.min(
        Math.floor(scrollProgress * conversationSteps.length),
        conversationSteps.length - 1
      );
      
      // Only update if necessary to avoid re-renders
      if (newStep >= 0 && newStep !== activeStep) {
        setActiveStep(newStep);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, activeStep, scrollHeight]);

  // Simple step navigation for mobile
  const handleNextStep = () => {
    if (activeStep < conversationSteps.length - 1) {
      setActiveStep(prev => Math.min(prev + 1, conversationSteps.length - 1));
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(prev => Math.max(prev - 1, 0));
    }
  };

  // Get current character SVG
  const getCurrentCharacterSvg = (character: string) => {
    if (character === 'sarah-talking') {
      return '/Sarah-talking.svg';
    } else if (character === 'sarah-anxious') {
      return '/Sarah-anxious.svg';
    } else if (character === 'sarah-happy') {
      return '/Sarah-happy-again-after-priya.svg';
    } else if (character.includes('priya')) {
      return '/priya-placeholder.svg';
    }
    
    return '/Sarah-talking.svg'; // Default fallback
  };

  // Generate Priya placeholder SVG if needed
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if the Priya SVG exists
    const priyaImage = document.createElement('img') as HTMLImageElement;
    priyaImage.src = '/priya-placeholder.svg';
    priyaImage.onerror = () => {
      console.info("Priya placeholder SVG is missing");
    };
  }, []);

  // Current step and character checks
  const currentStep = conversationSteps[activeStep] || conversationSteps[0];
  const isCurrentStepSarah = !currentStep.character.includes('priya');
  const isCurrentStepPriya = currentStep.character.includes('priya');

  return (
    <section 
      id="why-navigo" 
      className="relative bg-white"
      ref={sectionRef}
      style={{ height: `${scrollHeight}px` }} // Ensure enough scroll height
    >
      {/* Sticky container - this is what stays fixed while scrolling */}
      <div 
        ref={containerRef}
        className="sticky top-0 left-0 right-0 h-screen overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-primary/5 to-transparent"></div>
          {/* India-inspired pattern overlay */}
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'url("/images/indian-pattern.svg")', 
            backgroundSize: '400px',
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Section Title */}
        <div className="py-6 bg-white/95 backdrop-blur-sm z-10">
          <div className="text-center">
            <SectionTitle title="Why Navigo?" subtitle="Experience India with a friend by your side" />
          </div>
        </div>

        {/* Conversation container */}
        <div className="flex-1 flex items-center justify-center relative h-[calc(100vh-8rem)]">
          {/* Sarah container - left side */}
          <div className="absolute left-0 w-1/2 h-full flex items-center justify-end">
            <AnimatePresence mode="wait">
              {isCurrentStepSarah && (
                <motion.div
                  key={`sarah-${currentStep.id}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-20 mr-12 md:mr-24 mt-40"
                >
                  <div className="relative">
                    <Image
                      src={getCurrentCharacterSvg(currentStep.character)}
                      alt="Sarah"
                      width={300}
                      height={300}
                      className="w-44 h-44 md:w-64 md:h-64 object-contain"
                    />
                    
                    {/* Sarah's speech bubble */}
                    {isCurrentStepSarah && (
                      <SpeechBubble
                        text={currentStep.text}
                        isVisible={true}
                        position="right"
                        bubbleColor={currentStep.bubbleColor}
                        delay={0.2}
                        className="right-16 md:right-24 top-[-2rem]"
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Priya container - right side */}
          <div className="absolute right-0 w-1/2 h-full flex items-center justify-start">
            <AnimatePresence mode="wait">
              {isCurrentStepPriya && (
                <motion.div
                  key={`priya-${currentStep.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-20 ml-8 md:ml-16"
                >
                  <div className="relative">
                    <Image
                      src={getCurrentCharacterSvg(currentStep.character)}
                      alt="Priya"
                      width={300}
                      height={300}
                      className="w-44 h-44 md:w-64 md:h-64 object-contain"
                    />
                    
                    {/* Priya's speech bubble */}
                    {isCurrentStepPriya && (
                      <SpeechBubble
                        text={currentStep.text}
                        isVisible={true}
                        position="left"
                        bubbleColor={currentStep.bubbleColor}
                        delay={0.2}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Center element - decorative connection */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-20">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="30" fill="none" stroke="#BE5504" strokeWidth="1" />
              <circle cx="32" cy="32" r="20" fill="none" stroke="#BE5504" strokeWidth="1" />
              <circle cx="32" cy="32" r="10" fill="none" stroke="#BE5504" strokeWidth="1" />
              <path d="M32,2 L32,62 M2,32 L62,32" stroke="#BE5504" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Scroll indicator on first step */}
        {activeStep === 0 && !isMobile && (
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary z-30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <p className="mb-2 text-sm font-medium">Scroll down to continue the story</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        )}

        {/* Progress indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {conversationSteps.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${index === activeStep ? 'bg-primary' : 'bg-primary/30'}`}
            />
          ))}
        </div>

        {/* Mobile navigation */}
        {isMobile && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-30">
            <button
              onClick={handlePrevStep}
              disabled={activeStep === 0}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextStep}
              disabled={activeStep === conversationSteps.length - 1}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}