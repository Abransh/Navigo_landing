
import React from 'react';
import { WhyNavigoImplementation } from './WhyNavigoImplementation';

export function WhyNavigoSection() {
  return (
    <section className="bg-sand py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            Why <span className="text-primary">Navigo</span>?
          </h2>
          <p className="text-foreground-muted max-w-3xl mx-auto text-lg">
            Experience the difference of traveling with a trusted local companion who understands your needs.
          </p>
        </div>
        
        {/* Animation container */}
        <WhyNavigoImplementation />
      </div>
    </section>
  );
}