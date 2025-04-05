"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, Users } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';

// Data for service regions
const serviceRegions = [
  {
    id: "delhi",
    name: "Delhi",
    position: { x: 290, y: 150},
    description: "Explore the historical monuments and vibrant markets of India's capital city with our knowledgeable local companions.",
    highlights: ["Old Delhi", "Red Fort", "Qutub Minar", "Humayun's Tomb"],
    active: true
  },
  {
    id: "jaipur",
    name: "Jaipur",
    position: { x: 260, y: 160 },
    description: "Discover the 'Pink City' and its majestic forts and palaces with guides who know every hidden gem.",
    highlights: ["Amber Fort", "City Palace", "Hawa Mahal", "Local Markets"],
    active: true
  },
  {
    id: "jodhpur",
    name: "Jodhpur",
    position: { x: 230, y: 190 },
    description: "Experience the 'Blue City' with its imposing fort and maze-like streets known only to locals.",
    highlights: ["Mehrangarh Fort", "Clock Tower Market", "Blue City Walk", "Desert Excursions"],
    active: true
  },
  {
    id: "mumbai",
    name: "Mumbai",
    position: { x: 230, y: 300 },
    description: "Navigate the bustling streets of India's financial capital with locals who understand its unique rhythm and soul.",
    highlights: ["Gateway of India", "Dharavi", "Local Food Tours", "Bollywood"],
    active: true
  },
  {
    id: "goa",
    name: "Goa",
    position: { x: 240, y: 350 },
    description: "Relax on pristine beaches and experience Portuguese influence with companions who know more than just tourist spots.",
    highlights: ["Hidden Beaches", "Old Goa Churches", "Spice Plantations", "Local Cuisine"],
    active: true
  },
  {
    id: "varanasi",
    name: "Varanasi",
    position: { x: 400, y: 190 },
    description: "Immerse in the spiritual capital of India with guides who understand its deep religious and cultural significance.",
    highlights: ["Ganges Ghats", "Morning Rituals", "Ancient Temples", "Cultural Performances"],
    active: true
  },
  {
    id: "bangalore",
    name: "Bangalore",
    position: { x: 330, y: 335 },
    description: "Experience the perfect blend of tradition and technology in India's Silicon Valley with our tech-savvy companions.",
    highlights: ["Cubbon Park", "MG Road", "Local Breweries", "Tech Parks"],
    active: true
  },
  {
    id: "chennai",
    name: "Chennai",
    position: { x: 300, y: 460 },
    description: "Discover South Indian culture, arts, and cuisine with companions who bring the city's heritage to life.",
    highlights: ["Marina Beach", "Kapaleeshwarar Temple", "Music Academies", "South Indian Cuisine"],
    active: true
  },
  {
    id: "udaipur",
    name: "Udaipur",
    position: { x: 230, y: 210 },
    description: "Experience the romantic 'City of Lakes' with locals who know its royal history and scenic beauty intimately.",
    highlights: ["Lake Pichola", "City Palace", "Vintage Car Museum", "Local Arts"],
    active: true
  },
];

const InteractiveMapDesktop: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId === selectedRegion ? null : regionId);
  };

  const selectedRegionData = selectedRegion 
    ? serviceRegions.find(region => region.id === selectedRegion) 
    : null;

  return (
    <section id="service-coverage" className="py-24 bg-white overflow-hidden relative">
      {/* Background decoration - subtle Indian patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,10 L120,90 L200,100 L120,110 L100,190 L80,110 L0,100 L80,90 L100,10 Z" stroke="#BE5504" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" stroke="#1A5F7A" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="70" stroke="#1A5F7A" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="50" stroke="#1A5F7A" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Where Navigo Operates"
          subtitle="Explore our service coverage across India's most popular destinations"
          accentColor="primary"
        />

        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          {/* Map container */}
          <div className="w-full lg:w-2/3 bg-sand rounded-2xl p-6 shadow-lg relative" ref={mapRef}>
            {/* India map using external SVG file */}
            <div className="relative w-full h-[500px] bg-sand">
              {/* Base map image */}
              <div className="absolute inset-0">
                <img 
                  src="/images/india-map.svg" 
                  alt="Map of India" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* City markers */}
              {serviceRegions.map((region) => (
                <motion.div
                  key={region.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                  style={{ left: region.position.x, top: region.position.y }}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, zIndex: 20 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRegionClick(region.id)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div
                    className={`relative ${region.active ? 'group' : ''}`}
                  >
                    {/* Pin design */}
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${region.active 
                        ? 'bg-black shadow-lg transition-all duration-300' 
                        : 'bg-gray-300 border border-dashed border-black'}
                      ${(selectedRegion === region.id || hoveredRegion === region.id) 
                        ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                        : ''}
                    `}>
                      <MapPin className={`w-4 h-4 ${region.active ? 'text-white' : 'text-gray-500'}`} />
                      
                      {/* Subtle pulse animation for active cities */}
                      {region.active && (
                        <motion.span 
                          className="absolute w-full h-full rounded-full bg-black/20"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </div>
                    
                    {/* City name label - only show on hover or when selected */}
                    <motion.div 
                      className={`
                        absolute top-full left-1/2 transform -translate-x-1/2 mt-1
                        bg-white px-2 py-1 rounded-md shadow-sm whitespace-nowrap
                        ${region.active ? 'text-navy font-medium' : 'text-gray-500'}
                        transition-all duration-200
                      `}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ 
                        opacity: (selectedRegion === region.id || hoveredRegion === region.id) ? 1 : 0,
                        y: (selectedRegion === region.id || hoveredRegion === region.id) ? 0 : -5
                      }}
                    >
                      {region.name}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-border">
              <div className="flex items-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-black mr-2"></div>
                  <span>Active Locations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-300 border border-dashed border-black mr-2"></div>
                  <span>Coming Soon</span>
                </div>
              </div>
            </div>
            
            {/* Info text */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-border max-w-xs text-xs flex items-start">
              <Info className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-foreground-muted">Hover over a location to see details about our services in that area.</p>
            </div>
          </div>

          {/* Location details panel */}
          <div className="w-full lg:w-1/3">
            {selectedRegionData ? (
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border border-border h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold text-navy">{selectedRegionData.name}</h3>
                  {selectedRegionData.active ? (
                    <span className="bg-black/20 text-black px-2 py-1 rounded-full text-xs font-medium">Active</span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">Coming Soon</span>
                  )}
                </div>
                
                <p className="text-foreground-muted mb-6">{selectedRegionData.description}</p>
                
                {selectedRegionData.active && (
                  <motion.div 
                    className="mb-6 bg-sand/50 rounded-lg p-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-primary mr-2" />
                      <span className="font-heading font-medium">Local Companions Available</span>
                    </div>
                    <p className="text-sm text-foreground-muted mt-2">Ready to show you around and provide authentic local experiences</p>
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-heading font-medium text-navy mb-3">Popular Experiences:</h4>
                  <ul className="space-y-2">
                    {selectedRegionData.highlights.map((highlight, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-black mr-2"></div>
                        <span className="text-foreground-muted">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.p 
                    className="mt-4 text-sm italic text-yellow-800 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="inline-block animate-pulse">✨</span> Psst... our companions know secret spots you won't find in any guidebook!
                  </motion.p>
                </motion.div>
                
                {selectedRegionData.active ? (
                  <motion.button 
                    className="mt-8 w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300 font-medium hover:scale-105 transform shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Find a Companion in {selectedRegionData.name}
                  </motion.button>
                ) : (
                  <motion.div 
                    className="mt-8 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-600 text-center mb-2">This location is coming soon to our network</p>
                    <motion.button 
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Notified When Available
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border border-border h-full flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mb-4"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MapPin className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-heading font-medium text-navy mb-2">Select a Location</h3>
                <p className="text-foreground-muted max-w-xs mx-auto">
                  Click on any pin on the map to see details about our services in that location.
                </p>
                <motion.div 
                  className="mt-8 bg-primary/10 rounded-lg p-4 max-w-xs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm text-navy">
                    <strong>Navigo currently operates in 10 major cities</strong> across India, with more locations being added soon!
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-foreground-muted mb-6">
            Planning to visit a location not on our map? Let us know and we'll try to connect you with a companion!
          </p>
          <Link href="/request-location">
            <motion.button 
              className="bg-primary hover:bg-[#A64A03] text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium hover:scale-110 transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Request a New Location
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMapDesktop; 