"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { useMobile } from '@/hooks/use-mobile';

interface JourneyScenario {
  title: string;
  without: {
    image: string;
    caption: string;
    icon: React.ReactNode;
  };
  with: {
    image: string;
    caption: string;
    icon: React.ReactNode;
  };
}

const JourneyTransformationSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const controls = useAnimation();
  const isMobile = useMobile();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const scenarios: JourneyScenario[] = [
    {
      title: "Communication",
      without: {
        image: "/images/without-communication.jpg",
        caption: "Struggle with language barriers and miscommunications",
        icon: <X className="w-4 h-4 text-white" />
      },
      with: {
        image: "/images/with-communication.jpg",
        caption: "Communicate effortlessly with locals through your bilingual companion",
        icon: <Check className="w-4 h-4 text-white" />
      }
    },
    {
      title: "Discovery",
      without: {
        image: "/images/without-discovery.jpg",
        caption: "Stick to crowded tourist spots, missing authentic experiences",
        icon: <X className="w-4 h-4 text-white" />
      },
      with: {
        image: "/images/with-discovery.jpg",
        caption: "Discover hidden gems and local favorites only residents know about",
        icon: <Check className="w-4 h-4 text-white" />
      }
    },
    {
      title: "Fair Pricing",
      without: {
        image: "/images/without-pricing.jpg",
        caption: "Pay inflated 'tourist prices' without realizing it",
        icon: <X className="w-4 h-4 text-white" />
      },
      with: {
        image: "/images/with-pricing.jpg",
        caption: "Get fair local prices with a companion who negotiates on your behalf",
        icon: <Check className="w-4 h-4 text-white" />
      }
    },
    {
      title: "Safety & Confidence",
      without: {
        image: "/images/without-safety.jpg",
        caption: "Feel uncertain and on-guard in unfamiliar surroundings",
        icon: <X className="w-4 h-4 text-white" />
      },
      with: {
        image: "/images/with-safety.jpg",
        caption: "Explore with confidence knowing a trusted local has your back",
        icon: <Check className="w-4 h-4 text-white" />
      }
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="journey-transformation" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Transform Your India Experience" 
          subtitle="See how Navigo companions change everything about your journey"
        />
        
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-16"
        >
          {isMobile ? (
            // Mobile version - stacked layout
            <div className="space-y-12">
              {scenarios.map((scenario, index) => (
                <motion.div key={index} variants={itemVariants} className="rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-primary px-5 py-3">
                    <h3 className="text-xl font-heading font-bold text-white text-center">{scenario.title}</h3>
                  </div>
                  
                  {/* Without Navigo */}
                  <div className="border-b border-border">
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={scenario.without.image}
                        alt={`Travel challenge: ${scenario.title}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/30 backdrop-blur-[1px]"></div>
                      <div className="absolute top-3 left-3 bg-primary/90 rounded-full p-1">
                        {scenario.without.icon}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full py-1 px-3">
                        <span className="text-sm font-medium text-navy">Without Navigo</span>
                      </div>
                    </div>
                    <div className="p-4 bg-sand/30">
                      <p className="text-foreground-muted">{scenario.without.caption}</p>
                    </div>
                  </div>
                  
                  {/* Decorative divider */}
                  <div className="relative h-6 bg-white flex items-center justify-center">
                    <div className="w-full h-px bg-border"></div>
                    <div className="absolute">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11" stroke="#FF9933" strokeWidth="2" fill="white"/>
                        <path d="M8,12 L16,12 M12,8 L12,16" stroke="#FF9933" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* With Navigo */}
                  <div>
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={scenario.with.image}
                        alt={`Travel with Navigo: ${scenario.title}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-secondary/90 rounded-full p-1">
                        {scenario.with.icon}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full py-1 px-3">
                        <span className="text-sm font-medium text-navy">With Navigo</span>
                      </div>
                    </div>
                    <div className="p-4 bg-secondary/10">
                      <p className="text-navy">{scenario.with.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Desktop version - side by side layout
            <div className="space-y-16">
              {scenarios.map((scenario, index) => (
                <motion.div key={index} variants={itemVariants} className="flex flex-col">
                  <h3 className="text-2xl font-heading font-bold text-navy text-center mb-6 flex items-center justify-center">
                    <span className="w-12 h-1 bg-primary rounded-full mr-3"></span>
                    {scenario.title}
                    <span className="w-12 h-1 bg-secondary rounded-full ml-3"></span>
                  </h3>
                  
                  <div className="flex rounded-xl overflow-hidden shadow-lg">
                    {/* Without Navigo side */}
                    <div className="w-1/2 bg-sand/30">
                      <div className="relative h-72 bg-gray-100">
                        <Image
                          src={scenario.without.image}
                          alt={`Travel challenge: ${scenario.title}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/30 backdrop-blur-[1px]"></div>
                        <div className="absolute top-4 left-4 bg-primary/90 rounded-full p-1.5">
                          {scenario.without.icon}
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full py-1 px-3">
                          <span className="font-medium text-navy">Without Navigo</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-lg text-foreground-muted">{scenario.without.caption}</p>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="relative w-1 bg-white">
                      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-b from-primary via-earth to-secondary opacity-20"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-secondary bg-white flex items-center justify-center z-10">
                        <ArrowRight className="w-4 h-4 text-secondary" />
                      </div>
                      
                      {/* Decorative elements inspired by Indian patterns */}
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4 h-4">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="3" stroke="#BE5504" strokeWidth="1" fill="none" opacity="0.5"/>
                        </svg>
                      </div>
                      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-4 h-4">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="8" cy="8" r="3" stroke="#BE5504" strokeWidth="1" fill="none" opacity="0.5"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* With Navigo side */}
                    <div className="w-1/2 bg-secondary/10">
                      <div className="relative h-72 bg-gray-100">
                        <Image
                          src={scenario.with.image}
                          alt={`Travel with Navigo: ${scenario.title}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-secondary/90 rounded-full p-1.5">
                          {scenario.with.icon}
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full py-1 px-3">
                          <span className="font-medium text-navy">With Navigo</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-lg text-navy">{scenario.with.caption}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <p className="text-xl text-foreground-muted mb-6 max-w-2xl mx-auto">
              Ready to experience the difference a local companion makes for your journey?
            </p>
            <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3.5 rounded-lg font-heading font-semibold transition-colors shadow-lg inline-flex items-center">
              Transform Your Travel Experience
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyTransformationSection;