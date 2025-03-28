"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Search, 
  MessageSquare, 
  Map, 
  Calendar, 
  Heart, 
  Shield 
} from 'lucide-react';

// Step component for each step in the process
const ProcessStep = ({ 
  number, 
  title, 
  description, 
  icon: Icon, 
  isLast = false 
}: { 
  number: number; 
  title: string; 
  description: string; 
  icon: any; 
  isLast?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6,
            delay: number * 0.2 // Stagger the animations
          }
        }
      }}
      className="flex items-start"
    >
      {/* Step indicator and connecting line */}
      <div className="flex flex-col items-center mr-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-white font-heading font-bold text-xl">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 h-24 bg-[#E2D8C3]" />
        )}
      </div>
      
      {/* Step content */}
      <div className="flex-1 pt-1.5">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center mr-4">
            <Icon size={22} className="text-primary" />
          </div>
          <h3 className="text-2xl font-heading font-semibold text-navy">{title}</h3>
        </div>
        <p className="text-lg font-body text-foreground-muted mt-3 ml-14">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Main How It Works component
export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const steps = [
    {
      number: 1,
      title: "Tell us about your travel plans",
      description: "Share your trip dates, interests, and what you're looking to experience in India.",
      icon: Calendar
    },
    {
      number: 2,
      title: "Get matched with local companions",
      description: "We'll connect you with verified local students who share your interests and speak your language.",
      icon: Search
    },
    {
      number: 3,
      title: "Chat and plan your experiences",
      description: "Communicate directly with your companion to discuss your interests and plan your activities.",
      icon: MessageSquare
    },
    {
      number: 4,
      title: "Explore India with confidence",
      description: "Meet your local companion and explore authentic experiences without language barriers or tourist scams.",
      icon: Map,
      isLast: true
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-4">How Navigo Works</h2>
          <p className="text-xl font-body text-foreground-muted max-w-3xl mx-auto">
            A seamless experience connecting you with local companions who make your journey authentic and hassle-free.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <ProcessStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  isLast={step.isLast}
                />
              ))}
            </div>
          </div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main image with border */}
              <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-sand shadow-elevated">
                <div className="aspect-w-4 aspect-h-5 bg-gray-100">
                  <Image 
                    src="/images/local-companion-experience.jpg" 
                    alt="Traveler exploring with local companion" 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                {/* Experience tag */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-card">
                  <div className="flex items-center space-x-1.5">
                    <Heart size={16} className="text-secondary fill-current" />
                    <span className="text-sm font-heading font-medium text-navy">Authentic Experience</span>
                  </div>
                </div>
                
                {/* Safety badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-card">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Shield size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-body text-foreground-muted">Navigo Verified</p>
                      <p className="text-sm font-heading font-semibold text-navy">Background Checked</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 -bottom-4 -left-4 border-2 border-dashed border-earth/20 rounded-2xl -z-10"></div>
              
              {/* Rating card */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-elevated z-20">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FF9933" stroke="#FF9933" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-heading font-semibold text-navy mt-1">97% Satisfaction Rate</p>
                <p className="text-xs font-body text-foreground-muted">From 500+ travelers</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-xl font-body text-foreground-muted mb-6">
            Ready to experience India like a local?
          </p>
          <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-lg font-heading font-semibold transition-colors shadow-lg">
            Join Our Waitlist
          </button>
        </motion.div>
      </div>
    </section>
  );
}