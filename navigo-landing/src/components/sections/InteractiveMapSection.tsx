"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, Users } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { useMobile } from '@/hooks/use-mobile';

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
    position: { x: 135, y: 190 },
    description: "Experience the 'Blue City' with its imposing fort and maze-like streets known only to locals.",
    highlights: ["Mehrangarh Fort", "Clock Tower Market", "Blue City Walk", "Desert Excursions"],
    active: true
  },
  {
    id: "mumbai",
    name: "Mumbai",
    position: { x: 130, y: 270 },
    description: "Navigate the bustling streets of India's financial capital with locals who understand its unique rhythm and soul.",
    highlights: ["Gateway of India", "Dharavi", "Local Food Tours", "Bollywood"],
    active: true
  },
  {
    id: "goa",
    name: "Goa",
    position: { x: 120, y: 310 },
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
    position: { x: 170, y: 335 },
    description: "Experience the perfect blend of tradition and technology in India's Silicon Valley with our tech-savvy companions.",
    highlights: ["Cubbon Park", "MG Road", "Local Breweries", "Tech Parks"],
    active: true
  },
  {
    id: "chennai",
    name: "Chennai",
    position: { x: 220, y: 355 },
    description: "Discover South Indian culture, arts, and cuisine with companions who bring the city's heritage to life.",
    highlights: ["Marina Beach", "Kapaleeshwarar Temple", "Music Academies", "South Indian Cuisine"],
    active: true
  },
  {
    id: "udaipur",
    name: "Udaipur",
    position: { x: 145, y: 210 },
    description: "Experience the romantic 'City of Lakes' with locals who know its royal history and scenic beauty intimately.",
    highlights: ["Lake Pichola", "City Palace", "Vintage Car Museum", "Local Arts"],
    active: true
  },
  // Upcoming locations (not yet active)
  {
    id: "kochi",
    name: "Kochi",
    position: { x: 160, y: 390 },
    description: "Coming soon! Explore Kerala's beautiful port city with its unique blend of cultures and beautiful backwaters.",
    highlights: ["Fort Kochi", "Chinese Fishing Nets", "Backwaters", "Spice Markets"],
    active: false
  },
  {
    id: "amritsar",
    name: "Amritsar",
    position: { x: 145, y: 100 },
    description: "Coming soon! Visit the spiritual center of Sikhism and experience the unique border culture of this vibrant city.",
    highlights: ["Golden Temple", "Wagah Border", "Punjabi Cuisine", "Local Traditions"],
    active: false
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    position: { x: 330, y: 160 },
    description: "Coming soon! Explore the breathtaking tea gardens and Himalayan views with companions who know every scenic spot.",
    highlights: ["Tea Gardens", "Himalayan Railway", "Tiger Hill", "Buddhist Monasteries"],
    active: false
  }
];

const InteractiveMapSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

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
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRegionClick(region.id)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div
                    className={`relative ${region.active ? 'group' : ''}`}
                  >
                    {/* Pin design */}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${region.active 
                        ? 'bg-secondary shadow-lg' 
                        : 'bg-gray-300 border border-dashed border-primary'}
                    `}>
                      <MapPin className={`w-5 h-5 ${region.active ? 'text-white' : 'text-gray-500'}`} />
                      
                      {/* Pulse animation for active cities */}
                      {region.active && (
                        <span className="absolute w-full h-full rounded-full bg-secondary/40 animate-ping opacity-75"></span>
                      )}
                    </div>
                    
                    {/* City name label */}
                    <div className={`
                      absolute top-full left-1/2 transform -translate-x-1/2 mt-1
                      bg-white px-2 py-1 rounded-md shadow-sm whitespace-nowrap
                      ${region.active ? 'text-navy font-medium' : 'text-gray-500'}
                      ${(selectedRegion === region.id || hoveredRegion === region.id) ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}
                    `}>
                      {region.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-border">
              <div className="flex items-center space-x-6 text-xs">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-secondary mr-2"></div>
                  <span>Active Locations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-300 border border-dashed border-primary mr-2"></div>
                  <span>Coming Soon</span>
                </div>
              </div>
            </div>
            
            {/* Info text */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-border max-w-xs text-xs flex items-start">
              <Info className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-foreground-muted">Click on any location to learn more about our services in that area. Numbers in parentheses show available companions.</p>
            </div>
          </div>

          {/* Location details panel */}
          <div className="w-full lg:w-1/3">
            {selectedRegionData ? (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-border h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold text-navy">{selectedRegionData.name}</h3>
                  {selectedRegionData.active ? (
                    <span className="bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs font-medium">Active</span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">Coming Soon</span>
                  )}
                </div>
                
                <p className="text-foreground-muted mb-6">{selectedRegionData.description}</p>
                
                {selectedRegionData.active && (
                  <div className="mb-6 bg-sand/50 rounded-lg p-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-primary mr-2" />
                      <span className="font-heading font-medium">Local Companions Available</span>
                    </div>
                    <p className="text-sm text-foreground-muted mt-2">Ready to show you around and provide authentic local experiences</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-heading font-medium text-navy mb-3">Popular Experiences:</h4>
                  <ul className="space-y-2">
                    {selectedRegionData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></div>
                        <span className="text-foreground-muted">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm italic text-secondary font-medium">
                    <span className="inline-block animate-pulse">✨</span> Psst... our companions know secret spots you won't find in any guidebook!
                  </p>
                </div>
                
                {selectedRegionData.active ? (
                  <button className="mt-8 w-full bg-secondary hover:bg-secondary-dark text-white py-3 rounded-lg transition-colors font-medium">
                    Find a Companion in {selectedRegionData.name}
                  </button>
                ) : (
                  <div className="mt-8 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-600 text-center mb-2">This location is coming soon to our network</p>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm transition-colors">
                      Get Notified When Available
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-border h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-medium text-navy mb-2">Select a Location</h3>
                <p className="text-foreground-muted max-w-xs mx-auto">
                  Click on any pin on the map to see details about our services in that location.
                </p>
                <div className="mt-8 bg-primary/10 rounded-lg p-4 max-w-xs">
                  <p className="text-sm text-navy">
                    <strong>Navigo currently operates in 10 major cities</strong> across India, with more locations being added soon!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-foreground-muted mb-6">
            Planning to visit a location not on our map? Let us know and we'll try to connect you with a companion!
          </p>
          <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors shadow-md font-medium">
            Request a New Location
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;