"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
        subject: '',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-center">Contact Us</h1>
            <p className="text-lg mb-10 text-center max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Get in touch with our team.
            </p>
                    </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                {submitSuccess ? (
                  <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm max-w-xl mx-auto">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-[#BE5504] mx-auto mb-4" />
                      <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                      <p className="mb-6">Thank you for contacting Navigo. We've received your message and will get back to you as soon as possible.</p>
                      <a href="/" className="inline-block bg-[#BE5504] hover:bg-[#A64A03] text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-110 transform shadow-md hover:shadow-lg font-medium">
                        Back to Home
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                    <form onSubmit={handleSubmit}>
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
                    
                      <div className="mb-6">
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE5504] focus:border-transparent"
                          placeholder="How can we help you?"
                        />
                    </div>
                    
                      <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                          rows={6}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE5504] focus:border-transparent resize-none"
                          placeholder="Your message here..."
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
                            Sending...
                          </span>
                        ) : (
                          <span className="inline-flex items-center">
                            Send Message <MessageSquare className="ml-2 h-5 w-5" />
                          </span>
                        )}
                      </button>
                  </form>
                </div>
                )}
              </div>
              
              <div>
                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-[#BE5504] mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="mt-1 text-gray-600">info@navigoindia.com</p>
                        <p className="mt-1 text-gray-600">support@navigoindia.com</p>
                </div>
                </div>
                
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-[#BE5504] mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">Phone</h3>
                        <p className="mt-1 text-gray-600">+91 98765 43210</p>
                        <p className="mt-1 text-gray-600">Mon-Fri 9am to 6pm IST</p>
                </div>
              </div>
              
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-[#BE5504] mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">Office</h3>
                        <p className="mt-1 text-gray-600">
                          Navigo Headquarters<br />
                          123 Travel Street<br />
                          New Delhi, 110001<br />
                          India
                        </p>
                </div>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}