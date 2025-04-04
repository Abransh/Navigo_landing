"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Shield, Languages, Star, Users } from 'lucide-react';

export default function EnhancedHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#1A5F7A]">
      {/* Background pattern - inspired by Indian rangoli patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/indian-pattern.svg')] bg-repeat bg-contain" />
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
              <div className="bg-[#FF9933] text-[#FFF8EA] text-sm font-semibold px-3 py-1 rounded-full">
                Join the Waitlist
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFF8EA] leading-tight mb-6">
              Explore India{" "}
              <span className="text-[#FF9933]">Like a Local</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#FFF8EA]/90 mb-8 max-w-xl">
              Connect with trusted local companions who help you navigate unfamiliar territories, 
              overcome language barriers, and discover authentic cultural experiences.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.div 
                className="flex items-center text-[#FFF8EA]/80"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Shield className="h-5 w-5 mr-2 text-[#FF9933]" />
                <span>Verified Locals</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-[#FFF8EA]/80"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Languages className="h-5 w-5 mr-2 text-[#FF9933]" />
                <span>Language Support</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-[#FFF8EA]/80"
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <MapPin className="h-5 w-5 mr-2 text-[#FF9933]" />
                <span>Cultural Immersion</span>
              </motion.div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/try-navigo">
                <motion.button 
                  className="bg-[#FF9933] hover:bg-[#e88929] text-[#FFF8EA] px-6 py-3.5 rounded-lg font-medium transition-colors shadow-lg flex items-center justify-center group w-full sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Out Navigo
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
              
              <Link href="#how-it-works">
                <motion.button 
                  className="bg-[#BE5504]/10 hover:bg-[#BE5504]/20 border border-[#BE5504]/30 text-[#FFF8EA] px-6 py-3.5 rounded-lg font-medium transition-colors flex items-center justify-center w-full sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Learn How It Works
                </motion.button>
              </Link>
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
              {/* Decorative element - inspired by traditional Indian border patterns */}
              <div className="absolute -top-6 -right-6 -left-6 h-12 opacity-20 z-10">
                <svg viewBox="0 0 800 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M0,12 C50,4 100,20 150,12 C200,4 250,20 300,12 C350,4 400,20 450,12 C500,4 550,20 600,12 C650,4 700,20 750,12 C800,4 850,20 900,12" stroke="#FFF8EA" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="100" cy="12" r="3" fill="#FF9933"/>
                  <circle cx="200" cy="12" r="3" fill="#FF9933"/>
                  <circle cx="300" cy="12" r="3" fill="#FF9933"/>
                  <circle cx="400" cy="12" r="3" fill="#FF9933"/>
                  <circle cx="500" cy="12" r="3" fill="#FF9933"/>
                  <circle cx="600" cy="12" r="3" fill="#FF9933"/>
                  <circle cx="700" cy="12" r="3" fill="#FF9933"/>
                </svg>
              </div>
              
              <div className="relative z-20 bg-[#BE5504] rounded-3xl p-3 shadow-xl">
                <div className="bg-[#FFF8EA] rounded-2xl p-6 overflow-hidden">
                  {/* Map background */}
                  <div className="absolute top-6 left-6 right-6 bottom-40 bg-[#FFF8EA] rounded-xl overflow-hidden z-0">
                    <div className="absolute inset-0 opacity-30">
                      <Image 
                        src="/images/india-map.jpg" 
                        alt="Map of India" 
                        fill 
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-[#FF9933] rounded-full animate-ping" />
                      <div className="w-4 h-4 bg-[#FF9933] rounded-full absolute top-0" />
                    </div>
                  </div>
                  
                  {/* Traveler card */}
                  <div className="relative z-10 bg-white shadow-lg rounded-xl p-4 mb-4 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-[#FF9933] flex items-center justify-center text-white font-bold text-lg shadow-md">
                          SK
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-[#0A2342]">Sarah Kim</h3>
                        <p className="text-sm text-gray-500">Traveler from Canada</p>
                        <p className="text-sm text-[#0A2342]/80 mt-1">First time in India, interested in authentic experiences</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecting element - inspired by rangoli/mehendi patterns */}
                  <div className="relative z-0 flex justify-center">
                    <div className="w-0.5 h-8 bg-[#BE5504]/30"></div>
                    <div className="absolute w-12 h-12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
                        <path d="M24,4 C35,4 44,13 44,24 C44,35 35,44 24,44 C13,44 4,35 4,24 C4,13 13,4 24,4 Z" stroke="#BE5504" strokeWidth="1" fill="none"/>
                        <path d="M24,8 C33,8 40,15 40,24 C40,33 33,40 24,40 C15,40 8,33 8,24 C8,15 15,8 24,8 Z" stroke="#BE5504" strokeWidth="1" fill="none"/>
                        <path d="M24,12 C31,12 36,17 36,24 C36,31 31,36 24,36 C17,36 12,31 12,24 C12,17 17,12 24,12 Z" stroke="#BE5504" strokeWidth="1" fill="none"/>
                        <path d="M24,16 C28.4,16 32,19.6 32,24 C32,28.4 28.4,32 24,32 C19.6,32 16,28.4 16,24 C16,19.6 19.6,16 24,16 Z" stroke="#BE5504" strokeWidth="1" fill="none"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Local companion card */}
                  <div className="relative z-10 bg-white shadow-lg rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-[#1A5F7A] flex items-center justify-center text-white font-bold text-lg shadow-md">
                          PR
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-[#0A2342]">Priya Raj</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} className="text-[#FF9933] fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Local in Delhi</p>
                        <p className="text-sm text-[#0A2342]/80 mt-1">History student, expert on cultural heritage sites</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat bubble decoration */}
              <div className="absolute -bottom-4 -right-4 z-30">
                <motion.div 
                  className="bg-[#FF9933] rounded-full p-3 shadow-lg"
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
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 16H12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <div className="w-8 h-8 rounded-full bg-[#1A5F7A] border-2 border-white flex items-center justify-center">
                    <Users size={14} className="text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#BE5504] border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-[#FF9933] border-2 border-white"></div>
                </div>
                <span className="text-sm font-medium text-[#0A2342]">500+ travelers matched</span>
              </motion.div>

              

              {/* Decorative element inspired by Indian motifs */}
              <div className="absolute -right-8 top-1/3 z-0 opacity-20">
                <svg width="64" height="120" viewBox="0 0 64 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32,0 C32,30 64,30 64,60 C64,90 32,90 32,120" stroke="#FFF8EA" strokeWidth="2"/>
                  <path d="M0,0 C0,30 32,30 32,60 C32,90 0,90 0,120" stroke="#FFF8EA" strokeWidth="2"/>
                  <circle cx="32" cy="20" r="4" fill="#FF9933"/>
                  <circle cx="32" cy="60" r="4" fill="#FF9933"/>
                  <circle cx="32" cy="100" r="4" fill="#FF9933"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
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
}