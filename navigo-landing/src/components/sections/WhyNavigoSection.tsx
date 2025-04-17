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
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  isVisible,
  position,
  bubbleColor,
  delay = 0
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVisible && textRef.current) {
      setIsTyping(true);
      const textElement = textRef.current;
      const textContent = text;
      
      // Clear current text
      textElement.textContent = '';
      
      // Create simple typewriter effect
      let i = 0;
      const speed = Math.min(40, 1000 / textContent.length); // Adjust speed based on text length
      
      const typeWriter = () => {
        if (i < textContent.length) {
          textElement.textContent += textContent.charAt(i);
          i++;
          typingRef.current = setTimeout(typeWriter, speed);
        } else {
          setIsTyping(false);
        }
      };
      
      // Start typing effect with a small delay
      const startDelay = setTimeout(() => {
        typeWriter();
      }, 300 + delay);
      
      return () => {
        clearTimeout(startDelay);
        if (typingRef.current) {
          clearTimeout(typingRef.current);
        }
      };
    }
    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [isVisible, text, delay]);

  const positionClasses = position === 'left' 
    ? 'left-4 md:left-16' 
    : 'right-4 md:right-16';

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={`absolute top-8 max-w-[260px] md:max-w-xs ${positionClasses} ${bubbleColor} rounded-xl p-4 shadow-md border z-30`}
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, delay: delay * 0.1 }}
        >
          <p ref={textRef} className="text-navy text-sm md:text-base min-h-[2.5rem]"></p>
          
          {/* Cursor while typing */}
          {isTyping && (
            <span className="inline-block w-[2px] h-[14px] bg-primary ml-[1px] animate-pulse"></span>
          )}
          
          {/* Speech bubble tail */}
          <div 
            className={`absolute -bottom-4 ${bubbleColor} w-8 h-8 border transform rotate-45 ${
              position === 'left' ? 'left-5' : 'right-5'
            }`}
          ></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main component
export default function WhyNavigoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMobile();
  const [isScrolling, setIsScrolling] = useState(false);

  // Function to handle scroll for desktop
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate visible portion of the section
      const visibleHeight = Math.min(
        windowHeight - Math.max(0, sectionTop),
        sectionHeight
      );
      
      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(
        Math.max(0, -sectionTop / (sectionHeight - windowHeight)),
        1
      );
      
      // Calculate step based on scroll progress
      const stepIndex = Math.floor(scrollProgress * (conversationSteps.length - 1));
      
      if (stepIndex >= 0 && stepIndex < conversationSteps.length && stepIndex !== activeStep) {
        setActiveStep(stepIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isMobile, activeStep]);

  // Simple step navigation for mobile with bounds checking
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

  // Get current character image with safety check
  const getCurrentCharacterSvg = (character: string) => {
    if (!character) return '/Sarah-talking.svg'; // Default fallback
    
    if (character === 'sarah-talking') {
      return '/Sarah-talking.svg';
    } else if (character === 'sarah-anxious') {
      return '/Sarah-anxious.svg';
    } else if (character === 'sarah-happy') {
      return '/Sarah-happy-again-after-priya.svg';
    } else if (character.includes('priya')) {
      return '/placeholder-priya.svg';
    }
    
    return '/Sarah-talking.svg'; // Default fallback
  };

  // Safety check for current step
  const currentStep = conversationSteps[activeStep] || conversationSteps[0];

  return (
    <section 
      id="why-navigo" 
      className="sticky top-0 min-h-[800vh] bg-white overflow-hidden" 
      ref={sectionRef}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-primary/5 to-transparent"></div>
        {/* India-inspired pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'url("/india-pattern-bg.svg")', 
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Section Title - sticky for better UX */}
      <div className="sticky top-0 py-10 bg-white/95 backdrop-blur-sm z-10">
        <div className="text-center">
          <SectionTitle title="Why Navigo?" subtitle="Experience India with a friend by your side" />
        </div>
      </div>

      {/* Main content container - sticky */}
      <div className="sticky top-[200px] h-[70vh] flex items-center justify-center z-20">
        {/* Character container - Sarah */}
        <div className="absolute left-1/4 transform -translate-x-1/2">
          <AnimatePresence mode="wait">
            {!currentStep.character.includes('priya') && (
              <motion.div
                key={currentStep.character}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative z-20"
              >
                <Image
                  src={getCurrentCharacterSvg(currentStep.character)}
                  alt={currentStep.character}
                  width={200}
                  height={200}
                  className="w-40 h-40 md:w-48 md:h-48"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Speech bubble container */}
        <div className="absolute right-1/4 transform translate-x-1/2">
          <SpeechBubble
            text={currentStep.text}
            isVisible={true}
            position={currentStep.bubblePosition}
            bubbleColor={currentStep.bubbleColor}
            delay={0.2}
          />
        </div>

        {/* Priya character (when active) */}
        {currentStep.character.includes('priya') && (
          <div className="absolute right-1/4 transform translate-x-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="relative z-20"
              >
                <Image
                  src="/placeholder-priya.svg"
                  alt="Priya"
                  width={200}
                  height={200}
                  className="w-40 h-40 md:w-48 md:h-48"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {activeStep === 0 && (
        <motion.div 
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary z-30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <p className="mb-2 text-sm font-medium">Scroll down to continue the story</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}

      {/* Mobile navigation */}
      {isMobile && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4 z-30">
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

      {/* Empty space for scroll detection */}
      <div className="h-[700vh]"></div>
    </section>
  );
}