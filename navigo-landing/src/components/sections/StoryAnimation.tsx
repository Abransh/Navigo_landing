"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StoryAnimation.css';

interface ConversationStep {
  id: string;
  character: 'sarah-talking' | 'sarah-anxious' | 'sarah-happy' | 'priya-placeholder';
  text: string;
  bubblePosition: 'left' | 'right';
  bubbleColor: string;
}

const conversationSteps: ConversationStep[] = [
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

const Character: React.FC<{ type: ConversationStep['character'] }> = ({ type }) => {
  const getImagePath = () => {
    switch (type) {
      case 'sarah-talking':
        return '/Sarah-talking.svg';
      case 'sarah-anxious':
        return '/Sarah-anxious.svg';
      case 'sarah-happy':
        return '/Sarah-happy-again-after-priya.svg';
      case 'priya-placeholder':
        return '/placeholder-priya.svg';
      default:
        return '/Sarah-talking.svg';
    }
  };

  return (
    <motion.div
      className="character"
      initial={{ opacity: 0, x: type.includes('sarah') ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: type.includes('sarah') ? -50 : 50 }}
    >
      <img
        src={getImagePath()}
        alt={type}
      />
    </motion.div>
  );
};

const SpeechBubble: React.FC<{ text: string; position: 'left' | 'right' }> = ({ text, position }) => {
  return (
    <motion.div
      className={`speech-bubble ${position}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="typewriter">
        {text}
        <span className="cursor" />
      </div>
    </motion.div>
  );
};

const StoryAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = document.getElementById('story-section');
      
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const progress = scrollPosition / (sectionHeight - windowHeight);
        
        if (progress >= 0 && progress <= 1) {
          const step = Math.floor(progress * conversationSteps.length);
          setCurrentStep(Math.min(step, conversationSteps.length - 1));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentConversation = conversationSteps[currentStep];

  return (
    <section id="story-section">
      <div className="container">
        <div className="content-wrapper">
          <AnimatePresence mode="wait">
            {currentConversation.bubblePosition === 'left' && (
              <div className="flex items-center gap-8">
                <Character type={currentConversation.character} />
                <SpeechBubble text={currentConversation.text} position="left" />
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {currentConversation.bubblePosition === 'right' && (
              <div className="flex items-center gap-8 justify-end">
                <SpeechBubble text={currentConversation.text} position="right" />
                <Character type={currentConversation.character} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default StoryAnimation; 