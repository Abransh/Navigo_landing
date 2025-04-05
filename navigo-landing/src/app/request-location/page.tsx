"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Send, CheckCircle } from 'lucide-react';

export default function RequestLocationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    travelDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        travelDate: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="bg-[#BE5504] py-16 text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-center">Request a New Location</h1>
            <p className="text-lg mb-10 text-center max-w-2xl mx-auto">
              Planning to visit a location not currently available? Let us know and we'll try to connect you with a local companion!
            </p>

            {submitSuccess ? (
              <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-xl mx-auto">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-[#BE5504] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">Request Submitted!</h2>
                  <p className="mb-6">Thank you for your interest in Navigo. We've received your location request and will get back to you shortly.</p>
                  <a href="/" className="inline-block bg-[#BE5504] hover:bg-[#A64A03] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-110 transform shadow-md hover:shadow-lg font-medium">
                    Back to Home
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE5504] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE5504] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE5504] focus:border-transparent"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">Requested Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE5504] focus:border-transparent"
                      placeholder="e.g., Kochi, Kerala"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="travelDate" className="block mb-2 text-sm font-medium text-gray-700">Expected Travel Date</label>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE5504] focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE5504] focus:border-transparent resize-none"
                    placeholder="Tell us more about your travel plans..."
                  ></textarea>
                </div>

                {submitError && (
                  <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#BE5504] hover:bg-[#A64A03] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-110 transform shadow-md hover:shadow-lg font-medium flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      Submit Request <Send className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 