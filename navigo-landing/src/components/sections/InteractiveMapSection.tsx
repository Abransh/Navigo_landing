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
    position: { x: 180, y: 120 },
    description: "Explore the historical monuments and vibrant markets of India's capital city with our knowledgeable local companions.",
    highlights: ["Old Delhi", "Red Fort", "Qutub Minar", "Humayun's Tomb"],
    active: true
  },
  {
    id: "jaipur",
    name: "Jaipur",
    position: { x: 155, y: 170 },
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
    position: { x: 252, y: 190 },
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
                          {/* India map SVG */}
            <div className="relative w-full h-[500px] bg-sand">
              {/* Better outline of India */}
              <svg 
                viewBox="0 0 400 480" 
                className="w-full h-full" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Main India outline */}
                <path 
                  d="M174.8,31.5 c-2.4-3.7-1.9-8.6,0.8-11.9c4.2-5.2,12.2-4.9,16.9-0.3c4.4,4.4,5.7,11.6,3.2,17.4c-2.2,5.2-7.5,8.9-13.1,9.2
                  c-6.5,0.3-12.3-2.7-16.3-7.5c-4.3-5.2-6.2-11.7-6.3-18.6c-0.1-8.3,3.4-16.6,9.7-22c5.5-4.7,13.6-6.2,20.3-3.5
                  c7.2,2.9,12.5,10.3,13.8,18c1.3,7.9-1.6,16.1-7.1,21.6c-5.9,5.8-15.2,7.4-22.7,3.9c-3.8-1.8-6.9-4.5-9.2-8c-2.5-3.8-3.8-8.3-3.6-13
                  c0.3-7.3,4.7-14.1,11.2-17.6 c6.9-3.7,15.6-3.3,22.3,0.8 c6.6,4,10.8,11.3,10.9,19c0.1,8.3-4.3,16.4-11.3,20.7

                  M106.7,73.3 c4.7-3.1,7.2-9,6.1-14.6c-1.2-6.3-7.2-11.2-13.8-11.4c-6.7-0.2-13.1,4.2-15.1,10.6c-1.9,5.9,0.1,12.6,4.8,16.7
                  c4.9,4.2,12.1,5.2,17.9,2.3c7.7-3.8,12.3-12.8,11.1-21.2c-1.2-8.7-8.5-15.9-17.2-17.1c-9-1.3-18.4,4.1-22,12.5c-3.8,8.7-1.1,19.4,6.5,25
                  c8.3,6.2,20.3,5.5,27.8-1.6c7.9-7.5,9.1-20.3,2.9-29.3c-6.3-9.2-19.1-13-29.3-8.8c-10.3,4.3-17.1,15.8-15.8,26.8c1.3,11,10.5,20.3,21.5,21.7

                  M239.8,49.1c-0.7-6.5-1.3-12.9-2-19.4c5.2-0.4,10.4-0.9,15.6-1.3c2.6,6.9,5.2,13.8,7.8,20.7c6.4,0,12.8,0,19.2-0.1
                  c-1,6.5-1.9,12.9-2.9,19.4c6.3,1.5,12.6,3,18.9,4.5c0.7,6.8,1.4,13.6,2.1,20.4c6.5,0.3,13,0.6,19.5,0.9c1.3,6.7,2.6,13.4,3.8,20.1
                  c6.1,1.8,12.2,3.5,18.3,5.3c0.9,6.8,1.7,13.6,2.6,20.3c-2.1,5.8-11.2,24.7-13.2,30.6c-2,5.9-8.4,35.6-10.3,41.6c-1.9,6-3.8,12-5.7,18.1
                  c-4,3.7-8,7.3-12,11c-4.6,1.6-9.2,3.2-13.8,4.9c-4.7-2.6-9.4-5.1-14.1-7.7c-3.5-5.1-6.9-10.1-10.4-15.2c-1.5-6.7-3-13.3-4.6-20
                  c-6.7-0.9-13.4-1.8-20.1-2.7c-3-5.4-5.9-10.8-8.9-16.2c-5.8-3.3-11.6-6.5-17.4-9.8c-1.1-6.9-2.3-13.8-3.4-20.7
                  c-6.3-2.9-12.6-5.7-19-8.6c-0.2-7-0.4-14-0.6-21.1c-5-5-10-10-15-15c-1.1-6.8-2.1-13.7-3.2-20.5c-6.3-3.1-12.6-6.3-18.8-9.4
                  c-1.2-6.8-2.3-13.6-3.5-20.4c-5.8-4-11.5-8-17.3-12c-0.5-7-1-13.9-1.5-20.9c-4.9-5.4-9.8-10.7-14.8-16.1c0.6-6.9,1.3-13.9,1.9-20.8
                  c-4.2-5.7-8.4-11.5-12.6-17.2c2.1-6.5,4.3-13,6.4-19.5c-3.5-5.9-7-11.8-10.5-17.7c3.5-6.5,7-13.1,10.6-19.6c-2.8-7.1-5.6-14.2-8.4-21.3
                  c3.8-5.4,7.5-10.8,11.3-16.2c-1.2-6.7-2.5-13.5-3.7-20.2c5.1-4.3,10.3-8.5,15.4-12.8c0.3-6.9,0.6-13.9,0.8-20.8c5.6-3.9,11.3-7.8,16.9-11.7
                  c1.9-6.6,3.7-13.3,5.6-19.9c5.8-3.6,11.6-7.2,17.3-10.8c2.7-6.4,5.4-12.8,8.1-19.2c5.9-3.3,11.8-6.6,17.7-9.9c3.5-6.2,6.9-12.3,10.4-18.5
                  c6-3,12-6,18-9c4.1-5.9,8.3-11.8,12.4-17.7c6-2.7,12-5.4,18-8.1c4.7-5.6,9.4-11.1,14.1-16.7c6-2.4,12-4.7,18-7.1
                  c5.1-5.3,10.2-10.6,15.3-15.9c6-2,12-4.1,18-6.1c5.6-5,11.1-9.9,16.7-14.9c6-1.7,11.9-3.4,17.9-5.1c5.9-4.7,11.8-9.3,17.8-14
                  c5.9-1.4,11.9-2.8,17.8-4.2c6.3-4.3,12.5-8.6,18.8-12.9c5.9-1.1,11.8-2.2,17.7-3.3c6.5-4,13-8,19.5-12c5.9-0.8,11.7-1.5,17.6-2.3
                  c6.8-3.7,13.6-7.4,20.4-11.1c5.8-0.4,11.7-0.9,17.5-1.3c7.1-3.3,14.2-6.7,21.3-10c5.8-0.1,11.6-0.2,17.4-0.3c7.3-3,14.6-6,21.9-9
                  c5.7,0.2,11.5,0.4,17.2,0.6c7.4-2.7,14.9-5.3,22.3-8c5.7,0.5,11.5,1.1,17.2,1.6c7.6-2.4,15.2-4.7,22.7-7.1c5.7,0.9,11.3,1.7,17,2.6
                  c7.7-2,15.4-4.1,23.1-6.1c5.6,1.2,11.2,2.4,16.8,3.6c7.8-1.7,15.6-3.4,23.4-5.1c5.6,1.5,11.1,3,16.7,4.6c7.9-1.4,15.8-2.8,23.7-4.2
                  c5.5,1.9,11,3.7,16.5,5.6c8-1.1,16-2.2,24-3.3c5.5,2.2,10.9,4.4,16.4,6.6c8.1-0.8,16.1-1.5,24.2-2.3c5.4,2.5,10.8,5,16.1,7.5
                  c8.2-0.4,16.3-0.9,24.5-1.3c5.3,2.9,10.6,5.7,15.9,8.6c8.2-0.1,16.5-0.2,24.7-0.3c5.2,3.2,10.4,6.4,15.6,9.6c8.3,0.2,16.6,0.4,24.9,0.7
                  c5.1,3.5,10.2,7,15.4,10.5c8.4,0.5,16.7,1,25.1,1.6c5,3.9,10,7.7,15,11.6c8.4,0.9,16.8,1.7,25.2,2.6c4.9,4.2,9.8,8.4,14.7,12.5
                  c8.5,1.2,16.9,2.4,25.4,3.6c4.8,4.5,9.6,9,14.4,13.5c8.5,1.5,17,3,25.5,4.5c4.6,4.9,9.2,9.7,13.9,14.6c8.5,1.9,17.1,3.7,25.6,5.6
                  c4.5,5.2,9,10.4,13.4,15.6c8.6,2.2,17.1,4.4,25.7,6.6c4.4,5.5,8.7,11,13.1,16.5c8.6,2.5,17.2,5.1,25.8,7.6c4.2,5.9,8.4,11.7,12.6,17.6
                  c8.6,2.9,17.3,5.7,25.9,8.6 c4.1,6.2,8.2,12.3,12.2,18.5 c8.7,3.2,17.4,6.4,26,9.6 c3.9,6.5,7.9,13,11.8,19.5
                  c8.7,3.5,17.4,7.1,26.1,10.6 c3.8,6.9,7.5,13.7,11.3,20.6 c8.7,3.9,17.5,7.8,26.2,11.6 c3.6,7.2,7.2,14.4,10.8,21.6"
                  
                  stroke="#1A5F7A"
                  strokeWidth="2"
                  fill="rgba(26, 95, 122, 0.08)"
                />
                
                {/* State borders */}
                <path
                  d="M150,120 L200,100 L250,120 L300,100 L320,150 L350,200 L320,250 L250,300 L200,350 L150,320 L100,280 L120,200 L150,120"
                  stroke="#1A5F7A"
                  strokeWidth="0.5"
                  fill="none"
                  strokeDasharray="2,2"
                />
                
                {/* Major rivers */}
                <path
                  d="M250,100 C255,120 260,140 270,160 C280,180 290,200 285,220 C280,240 270,260 260,280 C250,300 240,320 230,340 C220,360 210,380 200,400"
                  stroke="#1A5F7A"
                  strokeWidth="1"
                  fill="none"
                  strokeOpacity="0.3"
                />
                
                <path
                  d="M150,150 C160,180 170,200 160,220 C150,240 140,260 130,280 C120,300 110,320 100,340"
                  stroke="#1A5F7A"
                  strokeWidth="1"
                  fill="none"
                  strokeOpacity="0.3"
                />
                
                {/* Northern mountains */}
                <path
                  d="M100,80 L110,70 L120,80 L130,70 L140,80 L150,70 L160,80 L170,70 L180,80 L190,70 L200,80 L210,70 L220,80 L230,70 L240,80 L250,70 L260,80 L270,70 L280,80 L290,70 L300,80"
                  stroke="#BE5504"
                  strokeWidth="1"
                  fill="none"
                  strokeOpacity="0.3"
                />
                
                {/* Add a subtle texture to represent terrain */}
                <pattern id="terrainPattern" patternUnits="userSpaceOnUse" width="10" height="10">
                  <circle cx="5" cy="5" r="0.5" fill="#1A5F7A" opacity="0.1" />
                </pattern>
                <rect width="400" height="480" fill="url(#terrainPattern)" />
              </svg>

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