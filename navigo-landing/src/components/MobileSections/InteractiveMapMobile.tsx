"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, Users } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

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

const InteractiveMapMobile: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId === selectedRegion ? null : regionId);
  };

  const selectedRegionData = selectedRegion 
    ? serviceRegions.find(region => region.id === selectedRegion) 
    : null;

  return (
    <section id="service-coverage-mobile" className="py-12 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="Where Navigo Operates"
          subtitle="Explore our service coverage across India's most popular destinations"
          accentColor="primary"
        />

        {/* Mobile-optimized map container */}
        <div className="mt-8">
          <motion.div 
            className="bg-sand rounded-2xl p-4 shadow-lg relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Map image with responsive height */}
            <div className="relative w-full aspect-[4/3] bg-sand rounded-xl overflow-hidden">
              <img 
                src="/images/india-map.svg" 
                alt="Map of India" 
                className="w-full h-full object-contain"
              />
              
              {/* City markers */}
              {serviceRegions.map((region) => (
                <motion.div
                  key={region.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                  style={{ left: `${region.position.x}px`, top: `${region.position.y}px` }}
                  initial={{ scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRegionClick(region.id)}
                >
                  <div className="relative">
                    {/* Pin design - larger for mobile */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${region.active 
                        ? 'bg-black shadow-lg transition-all duration-300' 
                        : 'bg-gray-300 border border-dashed border-black'}
                      ${selectedRegion === region.id 
                        ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                        : ''}
                    `}>
                      <MapPin className={`w-5 h-5 ${region.active ? 'text-white' : 'text-gray-500'}`} />
                      
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
                    
                    {/* City name label - always visible on mobile */}
                    <div className={`
                      absolute top-full left-1/2 transform -translate-x-1/2 mt-1
                      bg-white px-2 py-1 rounded-md shadow-sm whitespace-nowrap
                      ${region.active ? 'text-navy font-medium' : 'text-gray-500'}
                      text-xs
                    `}>
                      {region.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile-optimized legend */}
            <motion.div 
              className="mt-4 flex justify-center space-x-4 text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                <span>Active Locations</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 border border-dashed border-black mr-2"></div>
                <span>Coming Soon</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Location details panel - full width on mobile */}
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedRegionData ? (
              <motion.div 
                className="bg-white rounded-2xl p-4 shadow-lg border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-heading font-bold text-navy">{selectedRegionData.name}</h3>
                  {selectedRegionData.active ? (
                    <span className="bg-black/20 text-black px-2 py-1 rounded-full text-xs font-medium">Active</span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">Coming Soon</span>
                  )}
                </div>
                
                <p className="text-foreground-muted text-sm mb-4">{selectedRegionData.description}</p>
                
                {selectedRegionData.active && (
                  <motion.div 
                    className="mb-4 bg-sand/50 rounded-lg p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-primary mr-2" />
                      <span className="font-heading font-medium text-sm">Local Companions Available</span>
                    </div>
                    <p className="text-xs text-foreground-muted mt-1">Ready to show you around and provide authentic local experiences</p>
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-heading font-medium text-navy text-sm mb-2">Popular Experiences:</h4>
                  <ul className="space-y-1">
                    {selectedRegionData.highlights.map((highlight, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-black mr-2"></div>
                        <span className="text-foreground-muted text-sm">{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                {selectedRegionData.active ? (
                  <motion.button 
                    className="mt-4 w-full bg-black hover:bg-black/90 text-white py-2 rounded-lg transition-colors font-medium text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Find a Companion in {selectedRegionData.name}
                  </motion.button>
                ) : (
                  <motion.div 
                    className="mt-4 flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-600 text-center text-sm mb-2">This location is coming soon to our network</p>
                    <motion.button 
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded-lg text-xs transition-colors"
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
                className="bg-white rounded-2xl p-4 shadow-lg border border-border text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mx-auto mb-3"
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
                  <MapPin className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-lg font-heading font-medium text-navy mb-2">Select a Location</h3>
                <p className="text-foreground-muted text-sm">
                  Tap on any pin on the map to see details about our services in that location.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom CTA - mobile optimized */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-foreground-muted text-sm mb-4">
            Planning to visit a location not on our map? Let us know and we'll try to connect you with a companion!
          </p>
          <motion.button 
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors shadow-md font-medium text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Request a New Location
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMapMobile; 