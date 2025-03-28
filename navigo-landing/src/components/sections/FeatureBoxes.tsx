"use client"

import React, { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import FeatureBoxesMobile from "@/components/MobileSections/FeatureBoxMobile";
import { useMobile } from "@/hooks/use-mobile";
import SectionTitle from "@/components/ui/SectionTitle";
import { Shield, Languages, MapPin, Users } from "lucide-react";

// Define the feature box data structure
interface FeatureBox {
  title: string;
  description: string;
  icon: React.ElementType;
  leftImage: string;
  rightImage: string;
}

const FeatureBoxes: React.FC = () => {
  const isMobile = useMobile();
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Trigger a bit earlier for smoother experience
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-20");
        } else {
          // Only add the fade out effect if the element has moved above the viewport
          if (entry.boundingClientRect.y < 0) {
            entry.target.classList.add("opacity-0");
            entry.target.classList.remove("opacity-100");
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // If mobile, render the mobile version
  if (isMobile) {
    return <FeatureBoxesMobile />;
  }

  // Desktop version
  const featureBoxes = useMemo(
    () => [
      {
        title: "Enhanced Safety for All Travelers",
        description:
          "Travel with confidence knowing you're accompanied by a verified local companion. We prioritize safety with thorough background checks, real-time location sharing, and specialized support for solo female travelers.",
        icon: Shield,
        leftImage: "/images/indian-pattern-vertical.svg",
        rightImage: "/images/featuresbox1.jpg",
      },
      {
        title: "Protection from Tourist Inflation",
        description:
          "Stop paying tourist prices! Our local companions help you access fair, local rates for everything from street food to souvenirs. They'll negotiate on your behalf and steer you away from overpriced tourist traps.",
        icon: Users,
        leftImage: "/images/indian-pattern-vertical.svg",
        rightImage: "/images/featuresbox2.jpg",
      },
      {
        title: "Seamless Communication",
        description:
          "Break through language barriers with our bilingual companions. They'll help translate conversations, read menus, negotiate with vendors, and ensure you're always understood wherever you go.",
        icon: Languages,
        leftImage: "/images/indian-pattern-vertical.svg",
        rightImage: "/images/Featuresbox3.jpg",
      },
      {
        title: "Authentic Cultural Experiences",
        description:
          "Discover hidden gems and experience destinations like a true local. Our companions share insider knowledge, family traditions, and off-the-beaten-path locations that you'd never find in guidebooks.",
        icon: MapPin,
        leftImage: "/images/indian-pattern-vertical.svg",
        rightImage: "/images/feature-image-4-right.jpg",
      },
    ],
    []
  );

  return (
    <section id="benefits" className="py-20 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Experience India Without Barriers"
          subtitle="Our unique approach solves the most common challenges faced by foreign travelers"
        />
      </div>
      
      <div className="relative mt-16 pb-24">
        {featureBoxes.map((feature, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el as HTMLDivElement;
            }}
            className="py-12 opacity-0 translate-y-20 transition-all duration-700 ease-in-out sticky"
            style={{ top: "14vh" }}
            aria-label={`Feature: ${feature.title}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
              {/* Text container */}
              <div className="w-[700px] h-[330px] rounded-2xl bg-white p-8 flex flex-col justify-center shadow-lg border border-border relative overflow-hidden">
                {/* Decorative element inspired by Indian rangoli pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#BE5504" strokeWidth="2" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#BE5504" strokeWidth="2" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#BE5504" strokeWidth="2" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="#BE5504" strokeWidth="2" />
                    <path d="M50,5 L50,95 M5,50 L95,50 M15,15 L85,85 M15,85 L85,15" stroke="#BE5504" strokeWidth="1" />
                  </svg>
                </div>
                
                <div className="mb-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-4">
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-navy">{feature.title}</h3>
                </div>
                
                <p className="text-xl leading-relaxed text-foreground-muted">
                  {feature.description}
                </p>
                
                {/* Subtle Indian-inspired decorative element at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-earth opacity-30"></div>
              </div>

              {/* Middle image container - stylized with Indian pattern */}
              <div className="w-[100px] h-[330px] rounded-2xl mx-3 overflow-hidden shadow-lg border border-border bg-primary/5">
                <div className="w-full h-full relative">
                  <Image
                    src={feature.leftImage || "/placeholder.svg"}
                    alt=""
                    fill
                    className="object-cover opacity-30"
                    aria-hidden="true"
                    sizes="100px"
                  />
                </div>
              </div>

              {/* Right image container */}
              <div className="w-[580px] h-[330px] rounded-2xl overflow-hidden shadow-lg relative">
                {/* Image */}
                <div className="w-full h-full relative">
                  <Image
                    src={feature.rightImage || "/placeholder.svg"}
                    alt={`Illustration of ${feature.title}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="580px"
                  />
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-60"></div>
                
                {/* Feature number badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                  <span className="font-heading font-bold text-white">{index + 1}</span>
                </div>
                
                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 border-t border-earth/20">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-secondary rounded-full mr-3"></div>
                    <p className="text-sm font-heading font-medium text-navy">Verified by local companions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      {/* Call to action */}
      <div className="text-center mt-10">
        <button className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg font-heading font-semibold transition-colors shadow-lg">
          Experience the Difference
        </button>
      </div>
    </section>
  );
};

export default FeatureBoxes;