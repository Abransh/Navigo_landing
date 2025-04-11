
// src/app/blog/not-found.tsx
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center bg-sand">
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-heading font-bold text-navy mb-4">Blog Post Not Found</h1>
          <p className="text-lg text-foreground-muted mb-8">
            Sorry, the blog post you're looking for doesn't exist or has been moved.
          </p>
          <div className="mb-8">
            <form className="flex max-w-md mx-auto">
              <div className="relative flex-grow">
                <input
                  type="search"
                  placeholder="Search blog posts..."
                  className="w-full px-4 py-3 pl-12 rounded-l-lg bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <button 
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-r-lg transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" passHref>
              <button className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back to Blog
              </button>
            </Link>
            <Link href="/" passHref>
              <button className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-navy px-6 py-3 rounded-lg font-medium transition-colors border border-border">
                Go to Homepage
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}