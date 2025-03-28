"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Heart, 
  Sparkles, 
  Smartphone 
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { useMobile } from '@/hooks/use-mobile';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  quote?: {
    text: string;
    author: string;
    location: string;
  };
  patternColor: string;
  delay: number;
}

// Individual value card component
const ValueCard: React.FC<ValueCardProps> = ({ 
  icon, 
  title, 
  description, 
  quote, 
  patternColor,
  delay
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-border relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Top decorative border inspired by Indian patterns */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-earth"></div>
      
      {/* Background pattern - subtle rangoli-inspired design */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="none" stroke={patternColor} strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={patternColor} strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke={patternColor} strokeWidth="1" />
          <path d="M30,50 L70,50 M50,30 L50,70 M35,35 L65,65 M35,65 L65,35" stroke={patternColor} strokeWidth="0.5" />
        </svg>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-primary text-white`}>
            {icon}
          </div>
          <h3 className="text-2xl font-heading font-bold text-navy">{title}</h3>
        </div>
        
        <p className="text-foreground-muted mb-6">{description}</p>
        
        {quote && (
          <div className="mt-6 pt-4 border-t border-border relative">
            {/* Decorative quotation mark inspired by Indian design */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2">
              <svg width="24" height="16" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,0 L6,16 L0,16 L4,0 L10,0 Z M22,0 L18,16 L12,16 L16,0 L22,0 Z" fill="#FF9933" opacity="0.6" />
              </svg>
            </div>
            
            <blockquote className="text-sm italic text-foreground-muted">
              &ldquo;{quote.text}&rdquo;
              <footer className="mt-2 text-xs text-navy font-medium">
                {quote.author}, <span className="text-secondary">{quote.location}</span>
              </footer>
            </blockquote>
          </div>
        )}
      </div>
      
      {/* Bottom decorative element inspired by Indian textile patterns */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-30 transition-opacity"></div>
    </motion.div>
  );
};

const CoreValuesSection: React.FC = () => {
  const ref = useRef(null);
  // @ts-expect-error - threshold is a valid option in framer-motion's useInView but TypeScript doesn't recognize it
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const isMobile = useMobile();

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Authenticity",
      description: "Experience the real India that most tourists never see, through genuine cultural immersion guided by locals who call it home.",
      quote: {
        text: "My companion took me to her family's home for a traditional meal. It was the highlight of my entire trip to India.",
        author: "Sarah K.",
        location: "Delhi"
      },
      patternColor: "#FF9933",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Trust",
      description: "Every companion undergoes rigorous background checks, identity verification, and continuous review monitoring to ensure your peace of mind.",
      quote: {
        text: "I felt comfortable from the moment I met my companion. The verification process gave me complete confidence.",
        author: "Michael T.",
        location: "Jaipur"
      },
      patternColor: "#1A5F7A",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety",
      description: "Travel confidently with real-time location sharing, emergency assistance, and companions who know how to navigate local areas safely.",
      quote: {
        text: "As a solo female traveler, safety was my priority. My companion made sure I was comfortable and secure everywhere we went.",
        author: "Emma P.",
        location: "Mumbai"
      },
      patternColor: "#BE5504",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Cultural Connection",
      description: "Form meaningful relationships that transform typical tourism into profound cultural exchange and understanding.",
      quote: {
        text: "We still keep in touch a year later. I gained not just a guide but a friend who taught me so much about Indian culture.",
        author: "David L.",
        location: "Varanasi"
      },
      patternColor: "#FF9933",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Innovation",
      description: "Our technology enhances human connections rather than replacing them, making cultural bridges easier to build and maintain.",
      quote: {
        text: "The app made everything so seamless, from finding the perfect companion to planning our daily activities together.",
        author: "Yuki N.",
        location: "Bangalore"
      },
      patternColor: "#1A5F7A",
    },
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="core-values" className="py-24 bg-sand relative overflow-hidden">
      {/* Background decorative elements - inspired by rangoli patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -left-24 -top-24 w-96 h-96 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,10 L120,90 L200,100 L120,110 L100,190 L80,110 L0,100 L80,90 L100,10 Z" fill="#1A5F7A"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="#1A5F7A" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#1A5F7A" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute -right-16 -bottom-16 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,0 L108,36 L144,36 L115,58 L123,94 L100,72 L77,94 L85,58 L56,36 L92,36 Z" fill="#FF9933"/>
            <circle cx="100" cy="100" r="40" fill="none" stroke="#FF9933" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#FF9933" strokeWidth="1" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle 
          title="Our Values Define Your Experience" 
          subtitle="Every aspect of Navigo is built around these core principles"
          accentColor="primary"
        />
        
        {/* Central decorative element - inspired by Indian mandala */}
        <div className="flex justify-center my-12">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-slow-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-secondary/30 animate-reverse-slow-spin"></div>
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-earth/30 animate-slow-spin"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,3 C16.971,3 21,7.029 21,12 C21,16.971 16.971,21 12,21 C7.029,21 3,16.971 3,12 C3,7.029 7.029,3 12,3 Z" fill="#FFF8EA" />
                  <path d="M12,6 C15.314,6 18,8.686 18,12 C18,15.314 15.314,18 12,18 C8.686,18 6,15.314 6,12 C6,8.686 8.686,6 12,6 Z" fill="none" stroke="#1A5F7A" strokeWidth="1" />
                  <path d="M12,9 C13.657,9 15,10.343 15,12 C15,13.657 13.657,15 12,15 C10.343,15 9,13.657 9,12 C9,10.343 10.343,9 12,9 Z" fill="#FF9933" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={ref}>
          {isMobile ? (
            // Mobile version - carousel-like stacked layout
            <div className="space-y-6">
              {values.map((value, index) => (
                <ValueCard 
                  key={index}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  quote={value.quote}
                  patternColor={value.patternColor}
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            // Desktop version - grid layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <ValueCard 
                  key={index}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  quote={value.quote}
                  patternColor={value.patternColor}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Bottom quote and CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <blockquote className="text-xl italic font-medium text-navy max-w-3xl mx-auto mb-8">
            &ldquo;At Navigo, we believe that the best travel experiences come from genuine human connections built on a foundation of trust, safety, and cultural respect.&rdquo;
          </blockquote>
          
          <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-lg font-heading font-semibold transition-colors shadow-lg">
            Join Our Community
          </button>
        </motion.div>
      </div>
      
      {/* Bottom decorative element - inspired by Indian border patterns */}
      <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-earth opacity-20"></div>
        <div className="absolute inset-x-0 top-0 flex justify-center space-x-40">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 bg-secondary rounded-full transform -translate-y-1/2"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Add this to your global.css for the animations
// .animate-slow-spin {
//   animation: spin.8s linear infinite;
// }
// .animate-reverse-slow-spin {
//   animation: spin 12s linear infinite reverse;
// }

export default CoreValuesSection;