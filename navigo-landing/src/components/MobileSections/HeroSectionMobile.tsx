"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Languages, MapPin, Users, Star } from 'lucide-react';

const HeroSectionMobile: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative overflow-hidden bg-primary pt-8 pb-16">
      {/* Background pattern - subtle for mobile */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/indian-map.svg')] bg-repeat bg-contain" />
      </div>
      
      <div className="px-5 relative z-10">
        {/* Content - stacked for mobile */}
        <motion.div 
          className="text-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
        >
          {/* Headline */}
          <motion.h1 
            className="text-3xl font-bold text-sand leading-tight mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.6, delay: 0.1 } 
              }
            }}
          >
            Explore India{" "}
            <span className="text-secondary">Like a Local</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            className="text-lg text-sand/90 mb-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { duration: 0.6, delay: 0.2 } 
              }
            }}
          >
            Connect with trusted local companions who help you navigate India authentically
          </motion.p>
          
          {/* Key benefits */}
          <motion.div 
            className="flex justify-center flex-wrap gap-3 mb-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1, 
                transition: { duration: 0.6, delay: 0.3 } 
              }
            }}
          >
            {[
              { icon: <Shield size={16} />, text: "Verified Locals" },
              { icon: <Languages size={16} />, text: "Language Support" },
              { icon: <MapPin size={16} />, text: "Cultural Immersion" }
            ].map((item, index) => (
              <div key={index} className="flex items-center bg-primary-dark/40 text-sand/90 px-3 py-1.5 rounded-full text-sm">
                {item.icon}
                <span className="ml-1.5">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual representation - optimized for mobile */}
        <motion.div 
          className="mt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative mx-auto max-w-[320px]">
            {/* Card stack UI */}
            <div className="relative bg-earth/10 rounded-xl p-3 shadow-lg">
              <div className="bg-sand rounded-lg p-4 overflow-hidden">
                {/* Traveler card */}
                <div className="relative z-10 bg-white shadow-md rounded-lg p-3 mb-3 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      SK
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-navy">Sarah Kim</h3>
                      <p className="text-xs text-gray-500">Traveler from Canada</p>
                    </div>
                  </div>
                </div>
                
                {/* Connecting element */}
                <div className="relative flex justify-center py-1">
                  <div className="w-0.5 h-6 bg-earth/30"></div>
                  <div className="absolute w-8 h-8 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
                      <circle cx="16" cy="16" r="15" stroke="#BE5504" strokeWidth="1" fill="none"/>
                      <circle cx="16" cy="16" r="10" stroke="#BE5504" strokeWidth="1" fill="none"/>
                      <circle cx="16" cy="16" r="5" stroke="#BE5504" strokeWidth="1" fill="none"/>
                    </svg>
                  </div>
                </div>
                
                {/* Local companion card */}
                <div className="relative z-10 bg-white shadow-md rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        PR
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-navy">Priya Raj</h3>
                        <p className="text-xs text-gray-500">Local in Delhi</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-secondary fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Active indicator */}
                <motion.div
                  className="absolute bottom-3 right-3 bg-secondary/90 rounded-full p-1.5 shadow-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <MessageSquareIcon size={14} className="text-white" />
                </motion.div>
              </div>
            </div>
            
            {/* Active status indicator */}
            <motion.div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white py-1.5 px-3 rounded-full shadow-md flex items-center space-x-1.5 text-xs"
              initial={{ y: 20, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-primary border-2 border-white"></div>
                <div className="w-5 h-5 rounded-full bg-earth border-2 border-white"></div>
                <div className="w-5 h-5 rounded-full bg-secondary border-2 border-white"></div>
              </div>
              <span className="font-medium text-navy">14 travelers matched today</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* CTA Buttons - Full width for mobile */}
        <motion.div 
          className="flex flex-col gap-3 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/try-navigo" className="block">
            <motion.button 
              className="bg-secondary hover:bg-secondary-dark text-white w-full py-3.5 rounded-lg font-medium transition-colors shadow-lg flex items-center justify-center"
              whileTap={{ scale: 0.98 }}
            >
              Try Out Navigo
              <ChevronRight className="ml-1 h-5 w-5" />
            </motion.button>
          </Link>
          
          <Link href="#how-it-works" className="block">
            <motion.button 
              className="bg-earth/10 hover:bg-earth/20 border border-earth/30 text-white w-full py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center"
              whileTap={{ scale: 0.98 }}
            >
              Learn How It Works
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Wave decoration with Indian-inspired pattern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" fill="#FFF8EA"/>
          <path d="M120 32C150 25 180 35 210 32C240 28 270 18 300 20C330 22 360 35 390 35C420 35 450 20 480 18C510 16 540 25 570 30C600 35 630 37 660 35C690 33 720 27 750 27C780 27 810 32 840 30C870 28 900 20 915 16L930 12" stroke="#FF9933" strokeWidth="1" strokeDasharray="2 3" opacity="0.3"/>
        </svg>
      </div>
    </section>
  );
};

// Add missing MessageSquareIcon component
const MessageSquareIcon = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
};

export default HeroSectionMobile;