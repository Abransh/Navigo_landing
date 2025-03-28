"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Shield, Languages, Star } from 'lucide-react';

export default function EnhancedHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] bg-repeat bg-contain" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Content */}
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0 md:pr-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-secondary text-white text-sm font-semibold px-3 py-1 rounded-full">
                Pre-Launch: Join the Waitlist
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Travel Like a Local,{" "}
              <span className="text-secondary">Feel at Home</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
              Connect with trusted local companions who help you navigate unfamiliar territories, 
              overcome language barriers, and discover authentic cultural experiences.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.div 
                className="flex items-center text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Shield className="h-5 w-5 mr-2 text-secondary" />
                <span>Verified Locals</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Languages className="h-5 w-5 mr-2 text-secondary" />
                <span>Language Support</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-white/80"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <MapPin className="h-5 w-5 mr-2 text-secondary" />
                <span>Cultural Immersion</span>
              </motion.div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3.5 rounded-lg font-medium transition-colors shadow-lg flex items-center justify-center group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Early Access
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              
              <motion.button 
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn How It Works
              </motion.button>
            </div>
          </motion.div>
          
          {/* Visual element */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative z-20 bg-accent rounded-3xl p-3 shadow-xl">
                <div className="bg-white rounded-2xl p-6 overflow-hidden">
                  {/* Map background */}
                  <div className="absolute top-6 left-6 right-6 bottom-40 bg-sand/50 rounded-xl overflow-hidden z-0">
                    <div className="absolute inset-0 opacity-20">
                      <Image 
                        src="/images/map-delhi.jpg" 
                        alt="Map of Delhi" 
                        fill 
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
                      <div className="w-4 h-4 bg-primary rounded-full absolute top-0" />
                    </div>
                  </div>
                  
                  {/* Traveler card */}
                  <div className="relative z-10 bg-white shadow-lg rounded-xl p-4 mb-4 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg shadow-md">
                          SK
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">Sarah Kim</h3>
                        <p className="text-sm text-gray-500">Traveler from Canada</p>
                        <p className="text-sm text-gray-600 mt-1">First time in Delhi, interested in local cuisine</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting line */}
                  <div className="relative z-0 w-0.5 h-8 bg-gray-200 ml-7 mb-4"></div>
                  
                  {/* Local companion card */}
                  <div className="relative z-10 bg-white shadow-lg rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                          AR
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">Amit Rana</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} className="text-secondary fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Local in Delhi</p>
                        <p className="text-sm text-gray-600 mt-1">Delhi University student, knows the best street food spots</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat bubble decoration */}
              <div className="absolute -bottom-4 -right-4 z-30">
                <motion.div 
                  className="bg-secondary rounded-full p-3 shadow-lg"
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20, 
                    delay: 0.8 
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z" stroke="white" strokeWidth="2" />
                    <path d="M22 22L20 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 11.5H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11.5 8V15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Social proof indicator */}
              <motion.div 
                className="absolute -bottom-6 left-4 md:left-12 z-30 bg-white py-2 px-4 rounded-full shadow-lg flex items-center space-x-2"
                initial={{ y: 20, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-accent border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">500+ travelers matched</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}