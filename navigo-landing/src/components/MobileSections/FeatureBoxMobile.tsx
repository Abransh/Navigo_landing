// src/components/MobileSections/FeatureBoxMobile.tsx
"use client"

import React from 'react'
import Image from 'next/image'
import { Shield, Languages, MapPin, Users } from "lucide-react";

const FeatureBoxesMobile = () => {
  const features = [
    {
      title: "Enhanced Safety for All Travelers",
      description: "Travel with confidence knowing you're accompanied by a verified local companion who prioritizes your safety throughout your journey.",
      image: "/images/featuresbox1.jpg",
      icon: Shield,
    },
    {
      title: "Protection from Tourist Inflation",
      description: "Our local companions help you access fair, local rates for everything from street food to souvenirs, saving you from tourist price markups.",
      image: "/images/featuresbox2.jpg",
      icon: Users,
    },
    {
      title: "Seamless Communication",
      description: "Break through language barriers with our bilingual companions who ensure you're always understood wherever you go in India.",
      image: "/images/Featuresbox3.jpg",
      icon: Languages,
    },
    {
      title: "Authentic Cultural Experiences",
      description: "Discover hidden gems and experience India like a true local with companions who share insider knowledge and traditions.",
      image: "/images/feature-image-4-right.jpg",
      icon: MapPin,
    },
  ]

  return (
    <section id="benefits-mobile" className="px-4 py-16 bg-sand">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-heading font-bold text-navy mb-3">Experience India Without Barriers</h2>
        <p className="text-foreground-muted">Our unique approach solves the most common challenges faced by foreign travelers</p>
      </div>
      
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-border"
          >
            <div className="relative h-48">
              <Image
                src={feature.image || "/placeholder.svg"}
                alt={`Illustration of ${feature.title}`}
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-60"></div>
              
              {/* Feature number badge */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-md">
                <span className="font-heading font-bold text-white text-sm">{index + 1}</span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                  <feature.icon size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold text-navy">{feature.title}</h3>
              </div>
              
              <p className="text-foreground-muted">{feature.description}</p>
              
              {/* Subtle Indian-inspired design element */}
              <div className="mt-4 pt-3 border-t border-border flex items-center">
                <div className="w-1 h-4 bg-secondary rounded-full mr-2"></div>
                <p className="text-xs text-navy font-medium">Verified by local companions</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to action */}
      <div className="text-center mt-10">
        <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-heading font-semibold transition-colors shadow-lg w-full">
          Experience the Difference
        </button>
      </div>
    </section>
  )
}

export default FeatureBoxesMobile