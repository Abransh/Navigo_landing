"use client"

import React, { useState } from "react";
import { Send, Users, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TryNavigoContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    
    // Show success message
    setShowSuccessMessage(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <section className="mx-auto" id="contact-form">
      <div className="overflow-hidden rounded-3xl shadow-xl border border-border">
        <div className="grid md:grid-cols-[1fr_100px]">
          {/* Form section */}
          <div>
            <div className="bg-primary p-6 md:p-8">
              <div className="flex items-center bg space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Connect With a Local Companion
                </h2>
              </div>
            </div>

            {showSuccessMessage ? (
              <div className="bg-sand p-10 flex flex-col items-center justify-center min-h-[300px] text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-navy mb-3">Thank You!</h3>
                <p className="text-foreground-muted max-w-md">
                  We've received your request and will match you with the perfect local companion within 24 hours. Check your email for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-sand p-6 md:p-8">
                {/* Full Name */}
                <div className="mb-6">
                  <label htmlFor="fullName" className="block text-sm font-medium text-navy mb-1">
                    Full Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white border-b-2 border-border px-3 py-2 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-1">
                    Email <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border-b-2 border-border px-3 py-2 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1">
                    Phone Number <span className="text-secondary">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border-b-2 border-border px-3 py-2 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-foreground-muted">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-primary mr-1" />
                      <span>Your information is secure and private</span>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-black hover:bg-secondary-dark text-white px-6 py-2.5 rounded-lg font-heading font-medium transition-colors shadow-md flex items-center"
                  >
                    Connect with a Companion
                    <Send className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Decorative Side Panel */}
          <div className="w-[100px] bg-gradient-to-b from-primary via-earth to-secondary hidden md:block overflow-hidden">
            <div className="h-full w-full relative opacity-30">
              {/* Simple decorative elements instead of SVG pattern */}
              <div className="absolute inset-0 flex flex-col justify-around items-center p-4">
                <div className="w-12 h-12 rounded-full border-2 border-white opacity-60"></div>
                <div className="w-8 h-8 rounded-full border-2 border-white opacity-60"></div>
                <div className="w-10 h-10 rounded-full border-2 border-white opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}