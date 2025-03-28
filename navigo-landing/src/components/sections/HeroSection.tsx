import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Travel Like a Local, Feel at Home
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Connect with trusted local companions who help you navigate language barriers,
            avoid scams, and discover authentic cultural experiences in India.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-dark transition-colors">
              Get Early Access
            </button>
            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="bg-accent rounded-3xl p-2 shadow-xl">
            <div className="bg-white rounded-2xl p-6 relative">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl mb-4">
                {/* Replace with actual image when available */}
                <div className="w-full h-full bg-earth opacity-20 rounded-xl"></div>
              </div>
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">TK</div>
                <div>
                  <h3 className="font-medium">Traveler: Kim</h3>
                  <p className="text-sm text-gray-500">First time in Delhi</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">LA</div>
                <div>
                  <h3 className="font-medium">Local: Amit</h3>
                  <p className="text-sm text-gray-500">Delhi university student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}