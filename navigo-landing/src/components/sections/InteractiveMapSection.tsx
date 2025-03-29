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
    companions: 75,
    description: "Explore the historical monuments and vibrant markets of India's capital city with our knowledgeable local companions.",
    highlights: ["Old Delhi", "Red Fort", "Qutub Minar", "Humayun's Tomb"],
    active: true
  },
  {
    id: "jaipur",
    name: "Jaipur",
    position: { x: 155, y: 170 },
    companions: 42,
    description: "Discover the 'Pink City' and its majestic forts and palaces with guides who know every hidden gem.",
    highlights: ["Amber Fort", "City Palace", "Hawa Mahal", "Local Markets"],
    active: true
  },
  {
    id: "agra",
    name: "Agra",
    position: { x: 195, y: 160 },
    companions: 38,
    description: "Visit the iconic Taj Mahal and explore the rich Mughal heritage beyond the typical tourist experience.",
    highlights: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Local Crafts"],
    active: true
  },
  {
    id: "mumbai",
    name: "Mumbai",
    position: { x: 130, y: 270 },
    companions: 65,
    description: "Navigate the bustling streets of India's financial capital with locals who understand its unique rhythm and soul.",
    highlights: ["Gateway of India", "Dharavi", "Local Food Tours", "Bollywood"],
    active: true
  },
  {
    id: "goa",
    name: "Goa",
    position: { x: 120, y: 310 },
    companions: 35,
    description: "Relax on pristine beaches and experience Portuguese influence with companions who know more than just tourist spots.",
    highlights: ["Hidden Beaches", "Old Goa Churches", "Spice Plantations", "Local Cuisine"],
    active: true
  },
  {
    id: "varanasi",
    name: "Varanasi",
    position: { x: 252, y: 190 },
    companions: 28,
    description: "Immerse in the spiritual capital of India with guides who understand its deep religious and cultural significance.",
    highlights: ["Ganges Ghats", "Morning Rituals", "Ancient Temples", "Cultural Performances"],
    active: true
  },
  {
    id: "bangalore",
    name: "Bangalore",
    position: { x: 170, y: 335 },
    companions: 55,
    description: "Experience the perfect blend of tradition and technology in India's Silicon Valley with our tech-savvy companions.",
    highlights: ["Cubbon Park", "MG Road", "Local Breweries", "Tech Parks"],
    active: true
  },
  {
    id: "chennai",
    name: "Chennai",
    position: { x: 220, y: 355 },
    companions: 40,
    description: "Discover South Indian culture, arts, and cuisine with companions who bring the city's heritage to life.",
    highlights: ["Marina Beach", "Kapaleeshwarar Temple", "Music Academies", "South Indian Cuisine"],
    active: true
  },
  {
    id: "kolkata",
    name: "Kolkata",
    position: { x: 310, y: 210 },
    companions: 32,
    description: "Explore the intellectual and cultural capital of India with companions who appreciate its colonial architecture and artistic heritage.",
    highlights: ["Victoria Memorial", "Howrah Bridge", "College Street", "Bengali Cuisine"],
    active: true
  },
  {
    id: "udaipur",
    name: "Udaipur",
    position: { x: 130, y: 210 },
    companions: 25,
    description: "Experience the romantic 'City of Lakes' with locals who know its royal history and scenic beauty intimately.",
    highlights: ["Lake Pichola", "City Palace", "Vintage Car Museum", "Local Arts"],
    active: true
  },
  // Upcoming locations (not yet active)
  {
    id: "kochi",
    name: "Kochi",
    position: { x: 160, y: 390 },
    companions: 0,
    description: "Coming soon! Explore Kerala's beautiful port city with its unique blend of cultures and beautiful backwaters.",
    highlights: ["Fort Kochi", "Chinese Fishing Nets", "Backwaters", "Spice Markets"],
    active: false
  },
  {
    id: "amritsar",
    name: "Amritsar",
    position: { x: 145, y: 100 },
    companions: 0,
    description: "Coming soon! Visit the spiritual center of Sikhism and experience the unique border culture of this vibrant city.",
    highlights: ["Golden Temple", "Wagah Border", "Punjabi Cuisine", "Local Traditions"],
    active: false
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    position: { x: 330, y: 160 },
    companions: 0,
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
              {/* Base outline of India */}
              <svg
                viewBox="0 0 450 500"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* India outline */}
                <path
                  d="M138,60 C142,55 145,45 152,47 C159,49 165,55 172,52 C179,49 186,46 193,44 C200,42 207,38 214,41 C221,44 228,43 235,44 C242,45 249,47 256,48 C263,49 270,51 277,53 C284,55 291,57 298,59 C305,61 312,63 319,65 C326,67 333,68 340,70 C347,72 354,74 361,76 C368,78 375,80 382,81 C389,82 396,84 402,86 C408,88 414,91 420,93 C426,95 432,97 438,99 C437,106 436,113 434,120 C432,127 430,134 428,141 C426,148 423,154 421,161 C419,168 416,175 414,182 C412,189 409,196 406,202 C403,208 400,214 397,220 C394,226 391,232 388,238 C385,244 382,250 379,256 C376,262 373,268 370,274 C367,280 363,286 359,292 C355,298 349,303 345,309 C341,315 337,321 334,328 C331,335 328,342 325,349 C322,356 318,363 316,370 C314,377 312,384 309,391 C306,398 304,406 301,413 C298,420 294,427 291,434 C288,441 286,448 284,456 C282,464 280,472 278,480 C272,478 267,476 262,472 C257,468 251,464 247,460 C243,456 238,451 235,446 C232,441 226,437 223,432 C220,427 216,422 213,417 C210,412 206,407 203,402 C200,397 195,392 192,387 C189,382 186,377 182,373 C178,369 174,365 171,360 C168,355 163,351 161,346 C159,341 155,336 152,332 C149,328 147,324 144,320 C141,316 138,312 135,308 C132,304 130,300 127,296 C124,292 121,289 119,285 C117,281 114,277 112,272 C110,267 107,262 105,258 C103,254 102,249 101,244 C100,239 98,234 97,229 C96,224 96,219 94,215 C92,211 91,206 90,202 C89,198 88,193 87,188 C86,183 87,178 87,173 C87,168 87,163 87,158 C87,153 86,148 87,143 C88,138 89,133 89,128 C89,123 89,118 91,113 C93,108 94,103 96,98 C98,93 100,89 102,84 C104,79 107,75 109,71 C111,67 113,63 116,59 C119,55 122,51 125,48 C128,45 131,42 135,40 C139,38 142,62 138,60"
                  stroke="#1A5F7A"
                  strokeWidth="2"
                  fill="rgba(26, 95, 122, 0.05)"
                />

                {/* State borders - simplified */}
                <path
                  d="M200,100 L220,150 L260,170 L300,160 L330,200 L350,250 L300,300 L250,350 L200,370 L150,350 L130,300 L150,250 L180,200 L150,150 L200,100"
                  stroke="#1A5F7A"
                  strokeWidth="0.5"
                  fill="none"
                  strokeDasharray="2,2"
                />
                
                {/* Rivers - simplified */}
                <path
                  d="M250,100 C255,120 260,140 270,160 C280,180 290,200 285,220 C280,240 270,260 260,280 C250,300 240,320 230,340 C220,360 210,380 200,400"
                  stroke="#1A5F7A"
                  strokeWidth="1"
                  fill="none"
                  strokeOpacity="0.3"
                />
                
                {/* Mountains - simplified */}
                <path
                  d="M140,80 L150,70 L160,80 L170,70 L180,80 L190,70 L200,80 L210,70 L220,80 L230,70 L240,80 L250,70 L260,80"
                  stroke="#BE5504"
                  strokeWidth="1"
                  fill="none"
                  strokeOpacity="0.3"
                />
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
                      {region.active && (
                        <span className="ml-1 text-xs text-secondary">({region.companions})</span>
                      )}
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
                      <span className="font-heading font-medium">{selectedRegionData.companions} Local Companions</span>
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