// src/components/sections/FeatureBoxes.tsx
"use client"

import React, { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import FeatureBoxesMobile from "@/components/MobileSections/FeatureBoxMobile";
import { useMobile } from "@/hooks/use-mobile";
import SectionTitle from "@/components/ui/SectionTitle";

// Define the feature box data structure
interface FeatureBox {
  title: string;
  description: string;
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
        title: "Enhanced Safety & Specialized Safety for Women",
        description:
          "Travel with confidence knowing you're accompanied by a verified local companion. We prioritize safety with thorough background checks, real-time location sharing, and specialized support for solo female travelers.",
        leftImage: "/images/QrBarBoxes.png",
        rightImage: "/images/featuresbox1.jpg",
      },
      {
        title: "Protection from Tourist Inflation",
        description:
          "Stop paying tourist prices! Our local companions help you access fair, local rates for everything from street food to souvenirs. They'll negotiate on your behalf and steer you away from overpriced tourist traps.",
        leftImage: "/images/QrBarBoxes.png",
        rightImage: "/images/featuresbox2.jpg",
      },
      {
        title: "Seamless Communication",
        description:
          "Break through language barriers with our bilingual companions. They'll help translate conversations, read menus, negotiate with vendors, and ensure you're always understood wherever you go.",
        leftImage: "/images/QrBarBoxes.png",
        rightImage: "/images/Featuresbox3.jpg",
      },
      {
        title: "Authentic Cultural Experiences",
        description:
          "Discover hidden gems and experience destinations like a true local. Our companions share insider knowledge, family traditions, and off-the-beaten-path locations that you'd never find in guidebooks.",
        leftImage: "/images/QrBarBoxes.png",
        rightImage: "/images/feature-image-4-right.jpg",
      },
    ],
    []
  );

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Experience Travel Without Barriers"
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
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
              {/* Text container */}
              <div className="w-[700px] h-[330px] rounded-2xl bg-sand p-8 flex flex-col justify-center shadow-md">
                <h3 className="text-3xl font-bold mb-6 text-primary">{feature.title}</h3>
                <p className="text-xl leading-relaxed text-gray-700">
                  {feature.description}
                </p>
              </div>

              {/* Middle image container */}
              <div className="w-[100px] h-[330px] rounded-2xl mx-2 overflow-hidden shadow-md">
                <div className="w-full h-full relative">
                  <Image
                    src={feature.leftImage || "/placeholder.svg"}
                    alt={`Feature ${index + 1} detail`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100px"
                  />
                </div>
              </div>

              {/* Right image container */}
              <div className="w-[580px] h-[330px] rounded-2xl overflow-hidden shadow-md">
                <div className="w-full h-full relative">
                  <Image
                    src={feature.rightImage || "/placeholder.svg"}
                    alt={`Feature ${index + 1} showcase`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="580px"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FeatureBoxes;