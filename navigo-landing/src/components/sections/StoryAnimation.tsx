"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StoryAnimation.css';

interface ConversationStep {
  character: 'user' | 'navigo';
  text: string;
  position: 'left' | 'right';
}

const conversationSteps: ConversationStep[] = [
  {
    character: 'user',
    text: "I need help with my code...",
    position: 'left'
  },
  {
    character: 'navigo',
    text: "I can help you with that! What's the issue?",
    position: 'right'
  },
  {
    character: 'user',
    text: "I'm having trouble with this animation...",
    position: 'left'
  },
  {
    character: 'navigo',
    text: "Let me take a look and help you fix it!",
    position: 'right'
  }
];

const Character: React.FC<{ type: 'user' | 'navigo' }> = ({ type }) => {
  return (
    <motion.div
      className="character"
      initial={{ opacity: 0, x: type === 'user' ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: type === 'user' ? -50 : 50 }}
    >
      <img
        src={type === 'user' ? '/user-avatar.png' : '/navigo-avatar.png'}
        alt={type}
        className="w-16 h-16 rounded-full"
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
            {currentConversation.position === 'left' && (
              <div className="flex items-center gap-8">
                <Character type={currentConversation.character} />
                <SpeechBubble text={currentConversation.text} position="left" />
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {currentConversation.position === 'right' && (
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