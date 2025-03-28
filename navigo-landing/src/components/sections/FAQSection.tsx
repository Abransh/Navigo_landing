"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ 
  question, 
  answer, 
  isOpen, 
  toggleOpen,
  index
}) => {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-5 px-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-25 rounded-lg"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 transition-colors ${
              isOpen ? 'bg-secondary text-white' : 'bg-sand text-navy'
            }`}
          >
            {index + 1}
          </span>
          <h3 className="text-lg font-heading font-semibold text-navy pr-8">{question}</h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-foreground-muted relative">
              {/* Decorative element - inspired by Indian paisley pattern */}
              <div className="absolute -left-2 top-0 w-6 h-12 opacity-10">
                <svg viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12,0 C20,12 12,24 20,36 C12,48 4,36 12,24 C4,12 12,0 12,0 Z" fill="#BE5504"/>
                </svg>
              </div>
              
              <div className="pl-10">
                <p className="text-base leading-relaxed">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does Navigo ensure the safety of travelers?",
      answer: "Safety is our top priority. We thoroughly vet all local companions through background checks, verify their identities, and collect reviews from past travelers. Our platform also features real-time location sharing, emergency assistance, and a 24/7 support team dedicated to resolving any issues immediately."
    },
    {
      question: "Who are the local companions and how are they selected?",
      answer: "Our local companions are primarily students and young professionals who are passionate about sharing their culture. They undergo a rigorous selection process including background checks, language proficiency tests, cultural knowledge assessments, and in-person interviews. Only about 20% of applicants are accepted to ensure the highest quality experience."
    },
    {
      question: "What languages do the companions speak?",
      answer: "All Navigo companions are fluent in English and their local language(s). Many also speak additional languages such as French, German, Spanish, Japanese, or Mandarin. When matching companions, we prioritize language compatibility with your needs."
    },
    {
      question: "How much does the service cost?",
      answer: "Our pricing is transparent and competitive. We offer flexible packages based on your needs - from hourly assistance to full-day companionship. The typical rate ranges from ₹800-1500 per hour ($10-18 USD), with discounts available for longer durations. Our pricing includes all service fees and taxes, with no hidden charges."
    },
    {
      question: "Can I book a companion for multiple days?",
      answer: "Absolutely! Many travelers book companions for their entire trip. We offer special packages for multi-day bookings with significant discounts compared to daily rates. You can either book the same companion throughout your journey or different companions in each location you visit."
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer: "We understand travel plans can change. Cancellations made 48 hours or more before the scheduled meeting time receive a full refund. Cancellations within 24-48 hours receive a 50% refund. Cancellations less than 24 hours in advance are non-refundable, but we do offer one free rescheduling within the next 30 days."
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about traveling with Navigo companions"
          accentColor="secondary"
        />
        
        {/* Decorative element - inspired by Indian rangoli */}
        <div className="flex justify-center my-10">
          <div className="w-32 h-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="3" fill="#BE5504" opacity="0.4" />
                <circle cx="8" cy="8" r="1.5" fill="#FF9933" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-2xl border border-border overflow-hidden">
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
            <div className="flex items-center">
              <HelpCircle className="w-6 h-6 text-white mr-3" />
              <h2 className="text-xl font-heading font-semibold text-white">Common Questions</h2>
            </div>
          </div>
          
          <div>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom CTA and decorative element */}
        <div className="mt-12 text-center">
          <p className="text-foreground-muted mb-6">Still have questions? We're here to help!</p>
          <div className="inline-flex items-center">
            <div className="h-px w-8 bg-earth opacity-30"></div>
            <button className="mx-4 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-heading font-medium transition-colors shadow-md">
              Contact Us
            </button>
            <div className="h-px w-8 bg-earth opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;