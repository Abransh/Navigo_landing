import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Shield, Languages, MapPin, Users, Star, ArrowDown } from 'lucide-react';
import anime from 'animejs';

// A custom hook for mouse position tracking
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return mousePosition;
};

// Interactive particle system component
const ParticleSystem = ({ color = '#FFFFFF', count = 50, size = 2, speed = 1 }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Generate random particles
    particlesRef.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      size: Math.random() * size + 0.5,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed
    }));
    
    // Create SVG elements for each particle
    particlesRef.current.forEach(particle => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', particle.x);
      circle.setAttribute('cy', particle.y);
      circle.setAttribute('r', particle.size);
      circle.setAttribute('fill', color);
      circle.style.opacity = Math.random() * 0.5 + 0.2;
      container.appendChild(circle);
      
      // Add the DOM element to the particle object
      particle.element = circle;
    });
    
    // Animation loop
    const animate = () => {
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check with wrap-around
        if (particle.x < 0) particle.x = containerWidth;
        if (particle.x > containerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = containerHeight;
        if (particle.y > containerHeight) particle.y = 0;
        
        // Update DOM element
        particle.element.setAttribute('cx', particle.x);
        particle.element.setAttribute('cy', particle.y);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Remove all particles
      particlesRef.current.forEach(particle => {
        if (particle.element && particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, [color, count, size, speed]);
  
  return (
    <svg 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      preserveAspectRatio="none"
    />
  );
};

// Main hero component
const PremiumHeroSection = () => {
  // Refs for elements
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const mapContainerRef = useRef(null);
  
  // State management
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  
  // Mouse tracking for interactive effects
  const mousePosition = useMousePosition();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoother mouse movement
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  // Scroll animations
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerY = useTransform(scrollY, [0, 300], [0, -100]);
  
  // Parallax effects
  const parallax1 = useTransform(scrollY, [0, 1000], [0, -300]);
  const parallax2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const parallax3 = useTransform(scrollY, [0, 1000], [0, -50]);
  
  // Intersection observer for element reveals
  const [headingInViewRef, headingInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [contentInViewRef, contentInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // India locations data
  const locations = [
    {
      id: 'delhi',
      name: 'Delhi',
      x: 200,
      y: 120,
      description: 'Experience the vibrant capital city'
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      x: 150,
      y: 250,
      description: 'Explore the bustling city of dreams'
    },
    {
      id: 'jaipur',
      name: 'Jaipur',
      x: 170,
      y: 150,
      description: 'Discover the Pink City\'s rich heritage'
    },
    {
      id: 'goa',
      name: 'Goa',
      x: 160,
      y: 280,
      description: 'Relax on pristine beaches'
    },
    {
      id: 'varanasi',
      name: 'Varanasi',
      x: 250,
      y: 200,
      description: 'Immerse in spiritual traditions'
    }
  ];
  
  // Update mouse position for interactive elements
  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);
  
  // Initialize anime.js animations
  useEffect(() => {
    // Ensure the component is mounted and anime.js is available
    if (!heroRef.current || !headingRef.current || typeof anime !== 'function') return;
    
    // Set loaded state to trigger entrance animations
    setIsLoaded(true);
    
    // Animate the India map
    if (mapContainerRef.current) {
      // Path animations for India outline
      const paths = mapContainerRef.current.querySelectorAll('.india-path');
      
      anime({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutCubic',
        duration: 3000,
        delay: function(el, i) { return i * 250 },
        begin: function(anim) {
          paths.forEach(path => {
            path.style.visibility = 'visible';
          });
        }
      });
      
      // Locations pulse animation
      const locationMarkers = mapContainerRef.current.querySelectorAll('.location-marker');
      
      anime({
        targets: locationMarkers,
        scale: [0, 1],
        opacity: [0, 1],
        easing: 'easeOutElastic(1, .5)',
        duration: 1500,
        delay: function(el, i) { return 2000 + i * 150 }
      });
      
      // Setup continuous subtle animations
      anime({
        targets: '.pulse-circle',
        scale: [1, 1.5],
        opacity: [0.6, 0],
        easing: 'easeOutSine',
        duration: 1500,
        loop: true
      });
    }
    
    // Text animation for the main heading (without SplitText plugin)
    const letters = [...headingRef.current.querySelectorAll('.letter')];
    
    anime({
      targets: letters,
      opacity: [0, 1],
      translateY: [50, 0],
      translateZ: 0,
      easing: 'easeOutExpo',
      duration: 1500,
      delay: function(el, i) {
        return 300 + 30 * i;
      }
    });
    
    // Cleanup
    return () => {
      anime.remove(paths);
      anime.remove(locationMarkers);
      anime.remove('.pulse-circle');
      anime.remove(letters);
    };
  }, []);
  
  // Load the next location in sequence
  const nextLocation = () => {
    setActiveLocation((prev) => (prev + 1) % locations.length);
  };
  
  // Handle location selection
  const selectLocation = (index) => {
    setActiveLocation(index);
    
    // Animate the selected location marker
    if (mapContainerRef.current) {
      const marker = mapContainerRef.current.querySelector(`#marker-${locations[index].id}`);
      
      if (marker) {
        anime({
          targets: marker,
          scale: [1, 1.5, 1],
          easing: 'easeInOutQuad',
          duration: 800
        });
      }
    }
  };
  
  // Prepare text for animation
  const renderAnimatedText = (text) => {
    return (
      <span className="inline-block">
        {text.split('').map((char, index) => (
          <span key={index} className="letter inline-block">
            {char}
          </span>
        ))}
      </span>
    );
  };
  
  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen bg-gradient-to-b from-[#050A30] to-[#233577] overflow-hidden"
    >
      {/* Background particle effect */}
      <ParticleSystem 
        color="#FFFFFF" 
        count={100} 
        size={2} 
        speed={0.2} 
      />
      
      {/* Decorative background patterns */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-20 z-0 pointer-events-none"
        style={{ y: parallax1 }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-[#FF9933] blur-[100px] opacity-20" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-[#138808] blur-[150px] opacity-10" />
      </motion.div>
      
      {/* Top navigation bar - keeping it in viewport initially */}
      <motion.header
        className="fixed top-0 left-0 w-full z-40 px-6 py-4"
        style={{ 
          opacity: headerOpacity,
          y: headerY
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl">Navigo</div>
          <div className="flex space-x-6">
            <button className="text-white hover:text-[#FF9933] transition-colors">About</button>
            <button className="text-white hover:text-[#FF9933] transition-colors">Features</button>
            <button className="text-white hover:text-[#FF9933] transition-colors">Destinations</button>
            <button className="text-white hover:text-[#FF9933] transition-colors">Contact</button>
          </div>
        </div>
      </motion.header>
      
      {/* Main hero content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-16 flex flex-col lg:flex-row items-center">
        {/* Left content column */}
        <div className="w-full lg:w-1/2 mb-16 lg:mb-0">
          {/* Hero badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
          >
            <span className="text-[#FF9933] font-medium">Discover India Like Never Before</span>
          </motion.div>
          
          {/* Main heading */}
          <h1 
            ref={el => {
              headingRef.current = el;
              headingInViewRef(el);
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            {renderAnimatedText("Experience India")}
            <br />
            <span className="text-[#FF9933]">{renderAnimatedText("With a Local")}</span>
          </h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl text-white/80 mb-8 max-w-lg"
          >
            Connect with trusted local companions who navigate language barriers,
            ensure your safety, and unlock authentic cultural experiences.
          </motion.p>
          
          {/* Feature icons */}
          <div 
            ref={contentInViewRef} 
            className="flex flex-wrap gap-6 mb-10"
          >
            {[
              { icon: <Shield />, text: "Verified Safety", delay: 0 },
              { icon: <Languages />, text: "Language Support", delay: 0.1 },
              { icon: <MapPin />, text: "Local Insights", delay: 0.2 },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: contentInView ? 1 : 0, 
                  x: contentInView ? 0 : -20 
                }}
                transition={{ duration: 0.6, delay: 1 + feature.delay }}
                className="flex items-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center mr-3">
                  <span className="text-[#050A30]">{feature.icon}</span>
                </div>
                <span className="text-white font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Link href="/try-navigo">
                <button className="w-full sm:w-auto bg-[#FF9933] hover:bg-[#FF9933]/90 text-[#050A30] font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-[#FF9933]/30 hover:shadow-xl transition-all transform hover:-translate-y-1">
                  Start Your Journey
                </button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <Link href="#how-it-works">
                <button className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium px-8 py-4 rounded-lg transition-all">
                  Learn More
                </button>
              </Link>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="hidden md:flex items-center text-white/50 mt-20"
          >
            <div className="mr-3 w-px h-10 bg-white/20"></div>
            <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
            <ArrowDown className="ml-2 w-4 h-4" />
          </motion.div>
        </div>
        
        {/* Interactive India Map */}
        <motion.div 
          className="w-full lg:w-1/2 lg:pl-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y: parallax2 }}
        >
          <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl overflow-hidden">
            {/* Map glow effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF9933]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#138808]/20 rounded-full blur-3xl"></div>
            
            {/* Map container */}
            <div 
              ref={mapContainerRef}
              className="relative aspect-[4/3] w-full"
            >
              {/* India Map SVG */}
              <svg 
                viewBox="0 0 400 350" 
                className="w-full h-full"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simplified India outline - multiple paths for staggered animation */}
                <path 
                  className="india-path" 
                  d="M200,80 C230,90 260,85 280,100" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M280,100 C300,115 310,130 320,160" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M320,160 C330,190 325,220 320,250" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M320,250 C315,280 300,310 280,330" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M280,330 C260,350 230,355 200,360" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M200,360 C170,355 140,350 120,330" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M120,330 C100,310 85,280 80,250" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M80,250 C75,220 70,190 80,160" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M80,160 C90,130 100,115 120,100" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                <path 
                  className="india-path" 
                  d="M120,100 C140,85 170,90 200,80" 
                  stroke="rgba(255,255,255,0.4)" 
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  visibility="hidden"
                />
                
                {/* City markers */}
                {locations.map((location, index) => (
                  <g 
                    key={location.id} 
                    className="location-marker cursor-pointer"
                    id={`marker-${location.id}`}
                    onClick={() => selectLocation(index)}
                    style={{ 
                      transform: `translate(${location.x}px, ${location.y}px)`,
                      transformOrigin: 'center'
                    }}
                  >
                    {/* Pulse effect for active location */}
                    {activeLocation === index && (
                      <circle 
                        className="pulse-circle" 
                        r="15" 
                        fill="#FF9933"
                        opacity="0.6"
                      />
                    )}
                    
                    {/* Location dot */}
                    <circle 
                      r="5" 
                      fill={activeLocation === index ? "#FF9933" : "white"} 
                      opacity={activeLocation === index ? 1 : 0.7}
                    />
                    
                    {/* Location name */}
                    <text 
                      x="0" 
                      y="20" 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="10"
                      className="pointer-events-none"
                    >
                      {location.name}
                    </text>
                  </g>
                ))}
                
                {/* Travel route animation */}
                {activeLocation > 0 && (
                  <path 
                    d={`M${locations[activeLocation-1].x},${locations[activeLocation-1].y} Q${(locations[activeLocation-1].x + locations[activeLocation].x)/2 + 20},${(locations[activeLocation-1].y + locations[activeLocation].y)/2 - 20} ${locations[activeLocation].x},${locations[activeLocation].y}`}
                    stroke="#FF9933"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </svg>
              
              {/* Interactive UI elements */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  x: useTransform(smoothMouseX, 
                    [0, window.innerWidth], 
                    [10, -10]
                  ),
                  y: useTransform(smoothMouseY, 
                    [0, window.innerHeight], 
                    [5, -5]
                  ) 
                }}
              >
                {/* Location info card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  key={activeLocation}
                  className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg max-w-[200px]"
                >
                  <h3 className="text-[#FF9933] font-bold text-lg">
                    {locations[activeLocation].name}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {locations[activeLocation].description}
                  </p>
                  
                  {/* Next location button */}
                  <button 
                    onClick={nextLocation}
                    className="mt-3 bg-[#FF9933]/20 hover:bg-[#FF9933]/30 text-[#FF9933] text-sm px-3 py-1.5 rounded-lg flex items-center"
                  >
                    Next location
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
                
                {/* Companion indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 py-2 px-3 rounded-lg flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-[#FF9933] flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#050A30]" />
                  </div>
                  <div>
                    <div className="text-white text-xs">Local Companions</div>
                    <div className="text-[#FF9933] font-bold text-sm">
                      {5 + activeLocation} Available
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Traveler card */}
            <motion.div
              className="absolute -bottom-5 right-8 bg-white/10 backdrop-blur-lg border border-white/20 p-3 rounded-xl shadow-xl flex items-center space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center text-[#050A30] font-bold">
                SR
              </div>
              <div>
                <p className="text-white font-medium text-sm">Sarah R.</p>
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#FF9933] fill-[#FF9933]" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Stats counter strip */}
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-4 z-20"
        initial={{ y: 100 }}
        animate={{ y: isLoaded ? 0 : 100 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Local Companions" },
            { value: "15+", label: "Cities Covered" },
            { value: "4.9/5", label: "Traveler Rating" },
            { value: "10k+", label: "Happy Travelers" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.8 + (index * 0.1) }}
              className="text-center"
            >
              <div className="text-[#FF9933] font-bold text-2xl md:text-3xl">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Decorative corner shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="64" fill="#FF9933" fillOpacity="0.05" />
          <circle cx="32" cy="32" r="48" fill="#FF9933" fillOpacity="0.05" />
          <circle cx="32" cy="32" r="32" fill="#FF9933" fillOpacity="0.05" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 w-96 h-96 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
        <svg width="100%" height="100%" viewBox="0 0 96 96" fill="none">
          <circle cx="0" cy="96" r="96" fill="#138808" fillOpacity="0.05" />
          <circle cx="0" cy="96" r="72" fill="#138808" fillOpacity="0.05" />
          <circle cx="0" cy="96" r="48" fill="#138808" fillOpacity="0.05" />
        </svg>
      </div>
    </section>
  );
};

export default PremiumHeroSection;