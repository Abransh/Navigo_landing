import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TryNavigoContactForm from '@/components/sections/TryNavigoContactForm';
import Image from 'next/image';
import { ArrowRight, MapPin, Shield, Languages, Star } from 'lucide-react';

export default function TryNavigo() {
  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      
      {/* Header Section */}
      <section className="relative bg-[#FFF8EA] py-16 overflow-hidden">
        {/* Background decoration inspired by Indian patterns */}
        {/* <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/indian-pattern.svg')] bg-repeat bg-contain" />
        </div> */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-black mb-4">
              Try <span className="text-[#FF9933]">Navigo</span> Today
            </h1>
            <p className="text-xl text-[#BE5504] max-w-3xl mx-auto">
              Take the first step toward experiencing India like a local. Fill out the form below and we'll connect you with a perfect companion for your journey.
            </p>
          </div>
        </div>
        
        {/* Wave decoration with Indian-inspired pattern */}
        {/* <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" fill="#FFF8EA"/>
          </svg>
        </div> */}
      </section>
      
      <div className="py-10 bg-[#FFF8EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form - Moved to top */}
          <TryNavigoContactForm />
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16 mt-16">
            {/* Left side - Benefits */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-navy mb-6">
                Why Connect With a Navigo Companion?
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Shield className="w-5 h-5 text-secondary" />,
                    title: "Safe & Verified",
                    description: "All companions undergo thorough background checks and verification processes."
                  },
                  {
                    icon: <Languages className="w-5 h-5 text-secondary" />,
                    title: "Language Support",
                    description: "Break through communication barriers with bilingual companions."
                  },
                  {
                    icon: <MapPin className="w-5 h-5 text-secondary" />,
                    title: "Authentic Experiences",
                    description: "Discover hidden gems and local favorites not found in guidebooks."
                  },
                  {
                    icon: <Star className="w-5 h-5 text-secondary" />,
                    title: "Highly Rated",
                    description: "Our companions maintain a 97% satisfaction rate from travelers."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy text-lg mb-1">{benefit.title}</h3>
                      <p className="text-foreground-muted">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-navy italic">
                  "My Navigo companion transformed my trip to India. Instead of feeling like a tourist, I experienced the culture like a local would."
                  <span className="block mt-2 text-sm font-medium">— Emma P., Solo traveler from Australia</span>
                </p>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="relative">
              {/* <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  <Image 
                    src="/images/local-companion-experience.jpg" 
                    alt="Traveler with local companion" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div> */}
              
              {/* Decorative element */}
              {/* <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-10">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-secondary fill-current" />
                  ))}
                </div>
                <p className="text-sm font-heading font-semibold text-navy">500+ Successful Matches</p>
              </div> */}
              
              {/* Decorative background */}
              {/* <div className="absolute -z-10 -top-6 -left-6 -bottom-6 -right-6 border-2 border-dashed border-primary/20 rounded-xl"></div> */}
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-heading font-semibold text-navy mb-3">
              Not Ready to Book Yet?
            </h3>
            <p className="text-foreground-muted mb-6 max-w-2xl mx-auto">
              Join our waitlist to stay updated on new locations, features, and receive exclusive travel tips for your upcoming India adventure.
            </p>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md inline-flex items-center">
              Join Our Waitlist
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}