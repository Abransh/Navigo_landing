// src/app/contact/page.tsx
"use client";

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TryNavigoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: ''
        });
      } else {
        console.error('Form submission error:', data.error);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setFormStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-white">
        <Navbar />
        
        {/* Simple Hero with Form */}
        <section className="py-12 bg-[#1A5F7A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                Try Navigo
              </h1>
              <p className="text-xl text-white/90">
                Enter your contact information to get started
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
              {formStatus === 'success' && (
                <div className="bg-green-50 text-green-800 p-3 rounded-md mb-4">
                  Thanks! We'll contact you shortly.
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                      placeholder="+91 123 456 7890"
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md text-white bg-[#BE5504] hover:bg-[#A64A03]"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* Simple Info Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Experience India Like Never Before
              </h2>
              <p className="text-lg text-gray-600 max-w-lg mx-auto">
                Join Navigo and travel with local companions who make your journey safe and authentic
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-xl font-bold text-[#BE5504] mb-2">Safety</div>
                <p className="text-gray-600">Travel with verified companions who ensure your safety</p>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-[#BE5504] mb-2">Authenticity</div>
                <p className="text-gray-600">Experience the real India beyond tourist attractions</p>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-[#BE5504] mb-2">Simplicity</div>
                <p className="text-gray-600">We handle the details so you can focus on enjoying your journey</p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </>
  );
}