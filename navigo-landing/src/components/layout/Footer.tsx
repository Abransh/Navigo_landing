"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Facebook, Instagram, Twitter, Mail, MapPin, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    alert("Thank you for joining our waitlist! We'll notify you when we launch.");
  };

  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Decorative top border - inspired by Indian patterns */}
      <div className="h-2 w-full bg-gradient-to-r from-earth via-secondary to-earth"></div>
      
      {/* Background decorative elements - inspired by rangoli patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,10 L120,90 L200,100 L120,110 L100,190 L80,110 L0,100 L80,90 L100,10 Z" fill="#FFF8EA"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="#FFF8EA" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#FFF8EA" strokeWidth="1" />
            <circle cx="100" cy="100" r="90" fill="none" stroke="#FFF8EA" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute -left-16 top-32 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,0 L108,36 L144,36 L115,58 L123,94 L100,72 L77,94 L85,58 L56,36 L92,36 Z" fill="#FFF8EA"/>
            <path d="M100,100 L108,136 L144,136 L115,158 L123,194 L100,172 L77,194 L85,158 L56,136 L92,136 Z" fill="#FFF8EA"/>
            <path d="M20,50 L28,86 L64,86 L35,108 L43,144 L20,122 L0,144 L5,108 L0,86 L36,86 Z" fill="#FFF8EA"/>
            <path d="M180,50 L188,86 L224,86 L195,108 L203,144 L180,122 L157,144 L165,108 L136,86 L172,86 Z" fill="#FFF8EA"/>
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            {/* Logo */}
            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-heading font-bold">navigo</span>
              <span className="text-3xl text-secondary">.</span>
            </div>
            
            <p className="text-white/80 mb-6">
              Connecting foreign travelers with local companions for authentic, safe experiences across India.
            </p>
            
            {/* Social links with Indian-inspired styling */}
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary transition-colors flex items-center justify-center relative group"
                  aria-label={`${Icon.name} link`}
                >
                  <Icon className="w-5 h-5 text-white" />
                  
                  {/* Decorative pulsing dot - inspired by bindi */}
                  <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full transform scale-0 group-hover:scale-100 transition-transform"></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center">
              <span className="w-1.5 h-4 bg-secondary rounded-full mr-2"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['How It Works', 'About Us', 'Benefits', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-white/80 hover:text-white hover:underline transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-secondary rounded-full mr-2 opacity-0 transition-opacity duration-300"></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center">
              <span className="w-1.5 h-4 bg-secondary rounded-full mr-2"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-secondary mt-0.5 mr-3" />
                <span className="text-white/80">hello@navigotravel.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 mr-3" />
                <span className="text-white/80">
                  123 Startup Street, Bangalore<br />
                  Karnataka, India
                </span>
              </li>
            </ul>
            
            {/* Decorative Indian-inspired element */}
            <div className="mt-6 flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-40"></div>
            </div>
          </div>
          
          {/* Newsletter / Waitlist */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center">
              <span className="w-1.5 h-4 bg-secondary rounded-full mr-2"></span>
              Join Our Waitlist
            </h3>
            <p className="text-white/80 mb-4">
              Be the first to know when we launch and receive exclusive early access offers.
            </p>
            
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-secondary"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-secondary hover:bg-secondary-dark transition-colors rounded-md px-3 flex items-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            {/* India-inspired decorative element */}
            <div className="mt-6 flex justify-center">
              <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,12 C10,6 20,18 30,12 C40,6 50,18 60,12 C70,6 80,18 90,12 C100,6 110,18 120,12" 
                  stroke="#FF9933" strokeWidth="1" opacity="0.4" />
                <circle cx="30" cy="12" r="2" fill="#FF9933" opacity="0.4" />
                <circle cx="60" cy="12" r="2" fill="#FF9933" opacity="0.4" />
                <circle cx="90" cy="12" r="2" fill="#FF9933" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Bottom divider - inspired by Indian textile patterns */}
        <div className="mt-16 flex justify-center">
          <div className="w-full h-px bg-white/20 relative">
            <div className="absolute inset-x-0 flex justify-center space-x-20">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="w-1 h-1 bg-secondary rounded-full transform -translate-y-1/2"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Navigo Travel Technologies. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-2">
            {/* Small India-inspired decorative element */}
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <p className="text-white/60 text-sm">Made with ♥ in India</p>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;