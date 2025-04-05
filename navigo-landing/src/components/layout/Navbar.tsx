"use client"; 
import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [activeSection, setActiveSection] = useState('hero');
const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center ml-7">
              <Image 
                src="/images/logofullwithicon.svg" 
                alt="Navigo" 
                width={280} 
                height={200} 
                className="h-80 w-80" 
                priority
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-gray-700 hover:text-primary font-medium">
              How It Works
            </Link>
            <Link href="#benefits" className="text-gray-700 hover:text-primary font-medium">
              Benefits
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-primary font-medium">
              About Us
            </Link>
            <Link href="#faq" className="text-gray-700 hover:text-primary font-medium">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium">
              Contact Us
            </Link>
            <Link href="/try-navigo" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#A64A03] transition-all duration-300 hover:scale-110 transform shadow-md hover:shadow-lg">
              Try Navigo
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-4 space-y-1">
              <Link 
                href="#how-it-works" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#benefits" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefits
              </Link>
              <Link 
                href="#about" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="#faq" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link 
                href="/try-navigo" 
                className="block mt-2 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-[#A64A03] transition-all duration-300 hover:scale-110 transform shadow-md hover:shadow-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Try Navigo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}