"use client"; 

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary">
              navigo
              <span className="text-secondary">.</span>
            </div>
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
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
              Join Waitlist
            </button>
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
              <button className="mt-2 w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}