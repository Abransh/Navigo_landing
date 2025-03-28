// src/components/MobileSections/FeatureBoxMobile.tsx
"use client"

import React from 'react'
import Image from 'next/image'

const FeatureBoxesMobile = () => {
  const features = [
    {
      title: "Enhanced Safety & Specialized safety for Women",
      description: "Traveling to a new city often means juggling multiple apps—for transport, food, events, and more. It's overwhelming, time-consuming, and many aren't even in English. We simplify it by bringing you local apps in English.",
      image: "/images/featuresbox1.jpg",
    },
    {
      title: "Protection from Tourist Inflation",
      description: "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
      image: "/images/featuresbox2.jpg",
    },
    {
      title: "Seamless Communication",
      description: "With our Companions you would be easily able to communicate with the other people. Our Companions speak English.",
      image: "/images/Featuresbox3.jpg",
    },
    {
      title: "TRAVEL APPS!!",
      description: "With our companion you would get the best possible prices at public places, our companion would be there to assure no marked up price is charged.",
      image: "/images/feature-image-4-right.jpg",
    },
  ]

  return (
    <div className="px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Features</h2>
      
      <div className="space-y-10">
        {features.map((feature, index) => (
          <div key={index} className="bg-sand rounded-xl overflow-hidden shadow-md">
            <div className="h-48 relative">
              <Image
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureBoxesMobile