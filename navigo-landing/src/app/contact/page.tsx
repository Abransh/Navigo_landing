// src/app/contact/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileAnimation from '@/components/MobileSections/MobileAnimation';
import AnimationLoader from '@/components/AnimationLoader';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Phone, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styles from './contact.module.css';
import './animation.css';
import { useMobile } from '@/hooks/use-mobile';
import { load3DAnimationDependencies } from '@/lib/animation-utils';

// Dynamically import the animation script component
const AnimationScript = dynamic(() => import('@/components/AnimationScript'), {
  ssr: false,
  loading: () => <AnimationLoader />
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const isMobile = useMobile();
  const [animationLoaded, setAnimationLoaded] = useState(false);
  
  // Handle animation initialization after the component mounts
  useEffect(() => {
    setMounted(true);
    
    // Only load the 3D animation on desktop devices
    if (!isMobile) {
      const loadAnimation = async () => {
        try {
          await load3DAnimationDependencies();
          setAnimationLoaded(true);
        } catch (error) {
          console.error('Failed to load animation:', error);
        }
      };
      
      loadAnimation();
    }
    
    return () => {
      // Cleanup any global GSAP animations when component unmounts
      if (typeof window !== 'undefined' && window.gsap) {
        // Kill all GSAP animations and ScrollTriggers
        const timeline = window.gsap.timeline();
        timeline.clear();
        
        if (window.gsap.scrollTrigger) {
          const triggers = window.gsap.scrollTrigger.getAll();
          triggers.forEach(trigger => trigger.kill());
        }
      }
    };
  }, [isMobile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Submit form data to our API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success handling
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        // Error handling
        console.error('Form submission error:', data.error);
        setFormStatus('error');
      }
    } catch (error) {
      // Network or other error handling
      console.error('Form submission failed:', error);
      setFormStatus('error');
    } finally {
      setLoading(false);
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  return (
    <>
      <main className="min-h-screen">
        <Navbar />
        
        {/* Contact Form Section */}
        <section className={styles.contactFormSection}>
          {/* Background decorative elements - inspired by Indian patterns */}
          <div className={styles.bgPattern}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Content */}
              <motion.div 
                className="lg:w-1/2 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                  Let's Connect{" "}
                  <span className="text-secondary">With India</span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                  Tell us about your travel plans and get matched with trusted local companions who will enhance your journey through India.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-white/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white">Email Us</h3>
                      <p className="text-white/80">hello@navigotravel.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-white/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white">Call Us</h3>
                      <p className="text-white/80">+91 (123) 456-7890</p>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <Link href="/" className="inline-flex items-center text-white/90 hover:text-white">
                    <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                    Back to Homepage
                  </Link>
                </div>
              </motion.div>
              
              {/* Form */}
              <motion.div 
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.formContainer}>
                  {/* Decorative element - inspired by Indian rangoli pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#BE5504" strokeWidth="2" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#BE5504" strokeWidth="2" />
                      <circle cx="50" cy="50" r="25" fill="none" stroke="#BE5504" strokeWidth="2" />
                      <path d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15" stroke="#BE5504" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-heading font-bold text-navy mb-6">Join Our Travel Community</h2>
                  
                  {formStatus === 'success' && (
                    <div className={styles.successMessage}>
                      Thank you for reaching out! We've received your details and will contact you shortly.
                    </div>
                  )}
                  
                  {formStatus === 'error' && (
                    <div className={styles.errorMessage}>
                      Something went wrong. Please try again or contact us directly.
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className={styles.formField}>
                      <label htmlFor="name" className={styles.formLabel}>
                        Your Name
                      </label>
                      <div className={styles.iconInput}>
                        <div className={styles.inputIcon}>
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className={styles.formInput}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="email" className={styles.formLabel}>
                        Email Address
                      </label>
                      <div className={styles.iconInput}>
                        <div className={styles.inputIcon}>
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={styles.formInput}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="phone" className={styles.formLabel}>
                        Phone Number (optional)
                      </label>
                      <div className={styles.iconInput}>
                        <div className={styles.inputIcon}>
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={styles.formInput}
                          placeholder="+91 123 456 7890"
                        />
                      </div>
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="message" className={styles.formLabel}>
                        Your Travel Plans
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.formTextarea}
                        placeholder="Tell us about your travel dates, destinations in India you want to visit, and what experiences you're looking for..."
                      ></textarea>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className={styles.submitButton}
                      >
                        {loading ? (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <>
                            Connect with Navigo
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By submitting this form, you agree to our{" "}
                      <Link href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms-of-service" className="text-primary hover:underline">
                        Terms of Service
                      </Link>.
                    </p>
                  </form>
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
        
        {/* Animation Section - Conditionally render based on device */}
        {mounted && (
          isMobile ? (
          <MobileAnimation />
        ) : (
          <div className="animation-container">
            <div className="content">
              <div className="loading">
                <AnimationLoader />
              </div>
              <div className="trigger"></div>
              <div className="section">
                <h1>Your India Journey.</h1>
                <h3>The adventure begins here.</h3>
                <p>Discover the real India with a local companion.</p>
                <div className="scroll-cta">Scroll</div>
              </div>
              
              <div className="section right">
                <h2>It's not just a trip...</h2>
              </div>
              
              <div className="ground-container">
                <div className="parallax ground"></div>
                <div className="section right">
                  <h2>..it's a cultural immersion.</h2>
                  <p>Beyond tourist attractions.</p>
                </div>

                <div className="section">
                  <h2>Navigate with confidence.</h2>
                  <p>No language barriers. No tourist traps.</p>
                </div>
                
                <div className="section right">
                  <h2>Experience authentic India.</h2>
                  <p>Through local eyes!</p>
                </div>
                <div className="parallax clouds"></div>
              </div>
              
              <div className="blueprint">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <line id="line-length" x1="10" y1="80" x2="90" y2="80" strokeWidth="0.5"></line>
                  <path id="line-wingspan" d="M10 50, L40 35, M60 35 L90 50" strokeWidth="0.5"></path>
                  <circle id="circle-phalange" cx="60" cy="60" r="15" fill="transparent" strokeWidth="0.5"></circle>
                </svg>
                <div className="section dark ">
                  <h2>The Navigo Difference.</h2>
                  <p>What makes our service special...</p>
                </div>
                <div className="section dark length">
                  <h2>Safety.</h2>
                  <p>Verified companions ensure your security.</p>
                </div>
                <div className="section dark wingspan">
                  <h2>Local Knowledge.</h2>
                  <p>Insights you won't find in any guidebook.</p>
                </div>
                <div className="section dark phalange">
                  <h2>Cultural Connection</h2>
                  <p>Form meaningful relationships that last.</p>
                </div>
                <div className="section dark">
                  <h2>Authenticity</h2>
                  <p>Experience the real India that tourists rarely see.</p>
                </div>
              </div>
              <div className="sunset">
                <div className="section"></div>
                <div className="section end">
                  <h2>Ready to start your journey?</h2>
                  <a href="#contact-form" className="navigo-cta">Connect with Navigo</a>
                </div>
              </div>
            </div>
          </div>
          )
        )}
                
        <Footer />

        {/* Animation Scripts - Load scripts only on desktop */}
        {mounted && !isMobile && <AnimationScript />}
      </main>
    </>
  );
}