// src/components/blog/NewsletterSignup.tsx
import React from 'react';

export function NewsletterSignup() {
  return (
    <div className="bg-primary/10 rounded-xl p-8 md:p-12 relative overflow-hidden">
      {/* Background decoration - inspired by Indian patterns */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,10 L120,90 L200,100 L120,110 L100,190 L80,110 L0,100 L80,90 L100,10 Z" fill="#1A5F7A"/>
          <circle cx="100" cy="100" r="50" fill="none" stroke="#1A5F7A" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#1A5F7A" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="relative z-10 md:max-w-xl">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
          Never Miss a Story
        </h2>
        <p className="text-foreground-muted mb-6">
          Subscribe to our newsletter for the latest travel tips, local insights, and exclusive content delivered straight to your inbox.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        
        <p className="mt-3 text-xs text-foreground-muted">
          By subscribing, you agree to our privacy policy. We'll never spam you.
        </p>
      </div>
    </div>
  );
}