// src/app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Clock, Calendar, ArrowRight, Tag } from 'lucide-react';

// Define metadata for SEO
export const metadata: Metadata = {
  title: 'Navigo Blog - Travel Tips & India Cultural Insights',
  description: 'Discover travel tips, cultural insights, and local experiences in India. Read our blog for authentic travel advice from local companions.',
  openGraph: {
    title: 'Navigo Blog - Travel Tips & India Cultural Insights',
    description: 'Discover travel tips, cultural insights, and local experiences in India. Read our blog for authentic travel advice from local companions.',
    url: 'https://navigotravel.com/blog',
    siteName: 'Navigo Travel',
    images: [
      {
        url: 'https://navigotravel.com/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Navigo Blog',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
};

// This would normally come from a CMS or API
const blogPosts = [
  {
    id: 'essential-travel-tips-india',
    slug: 'essential-travel-tips-india',
    title: '10 Essential Travel Tips for First-Time Visitors to India',
    excerpt: 'Planning your first trip to India? Here are the essential tips every traveler should know before embarking on their journey to this vibrant and diverse country.',
    coverImage: '/images/blog/india-travel-tips.jpg',
    date: 'April 5, 2025',
    readTime: '8 min read',
    author: {
      name: 'Priya Sharma',
      avatar: '/images/blog/authors/priya.jpg',
      role: 'Local Companion & Travel Expert'
    },
    categories: ['Travel Tips', 'Cultural Insights']
  },
  {
    id: 'hidden-gems-delhi',
    slug: 'hidden-gems-delhi',
    title: 'Hidden Gems in Delhi: Beyond the Tourist Trail',
    excerpt: 'Discover the lesser-known attractions and authentic experiences in Delhi that most tourists never find. Our local companions share their favorite hidden spots.',
    coverImage: '/images/blog/delhi-hidden-gems.jpg',
    date: 'March 22, 2025',
    readTime: '6 min read',
    author: {
      name: 'Amit Verma',
      avatar: '/images/blog/authors/amit.jpg',
      role: 'Delhi Local Companion'
    },
    categories: ['Destinations', 'Local Experiences']
  },
  {
    id: 'indian-street-food-guide',
    slug: 'indian-street-food-guide',
    title: 'The Ultimate Guide to Indian Street Food: What to Try & Where',
    excerpt: 'Navigate the delicious world of Indian street food with our comprehensive guide. Learn what to eat, where to find it, and how to enjoy it safely.',
    coverImage: '/images/blog/street-food-guide.jpg',
    date: 'March 15, 2025',
    readTime: '10 min read',
    author: {
      name: 'Rahul Patel',
      avatar: '/images/blog/authors/rahul.jpg',
      role: 'Culinary Guide & Foodie'
    },
    categories: ['Food & Cuisine', 'Travel Tips']
  },
  {
    id: 'traveling-as-woman-india',
    slug: 'traveling-as-woman-india',
    title: 'Traveling as a Woman in India: Safety Tips & Cultural Insights',
    excerpt: 'Female travelers share their experiences and practical advice for navigating India safely and respectfully, with insights from local women companions.',
    coverImage: '/images/blog/women-travel-india.jpg',
    date: 'March 8, 2025',
    readTime: '9 min read',
    author: {
      name: 'Sarah Johnson',
      avatar: '/images/blog/authors/sarah.jpg',
      role: 'Travel Writer & Experienced Backpacker'
    },
    categories: ['Safety', 'Cultural Insights', 'Solo Travel']
  },
  {
    id: 'seasonal-festivals-india',
    slug: 'seasonal-festivals-india',
    title: 'Seasonal Festivals of India: When to Visit for Cultural Immersion',
    excerpt: "Plan your trip around India's vibrant festivals. This guide breaks down the best times to visit based on regional celebrations and cultural events.",
    coverImage: '/images/blog/festivals-india.jpg',
    date: 'February 28, 2025',
    readTime: '7 min read',
    author: {
      name: 'Deepak Kumar',
      avatar: '/images/blog/authors/deepak.jpg',
      role: 'Cultural Expert & Local Companion'
    },
    categories: ['Festivals', 'Cultural Insights', 'Planning']
  },
  {
    id: 'budget-travel-india',
    slug: 'budget-travel-india',
    title: 'Budget Travel in India: How to Experience Luxury for Less',
    excerpt: 'Discover how to experience the best of India without breaking the bank. Our local companions share insider tips on getting luxury experiences at budget prices.',
    coverImage: '/images/blog/budget-travel-india.jpg',
    date: 'February 14, 2025',
    readTime: '8 min read',
    author: {
      name: 'Michael Chang',
      avatar: '/images/blog/authors/michael.jpg',
      role: 'Budget Travel Expert'
    },
    categories: ['Budget Travel', 'Travel Tips', 'Accommodations']
  }
];

// Blog categories for filtering
const categories = [
  'All Posts',
  'Travel Tips',
  'Cultural Insights',
  'Food & Cuisine',
  'Destinations',
  'Safety',
  'Solo Travel',
  'Local Experiences',
  'Festivals',
  'Budget Travel',
  'Accommodations',
  'Planning'
];

export default function BlogPage() {
  // Note: In a real implementation, this would use client-side state and API calls
  // For now, we're hardcoding the content since this is a static page in Next.js
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Navigo Travel Blog</h1>
              <p className="text-xl text-white/90 mb-8">
                Insider tips, cultural insights, and authentic travel experiences from our local companions across India
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Travel Tips', 'Cultural Insights', 'Local Experiences', 'Food & Cuisine'].map((tag) => (
                  <span key={tag} className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured post */}
        <section className="py-12 bg-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <div className="relative h-[500px]">
                <Image 
                  src="/images/blog/featured-post.jpg" 
                  alt="Featured post" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Featured
                </span>
                <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">
                  Authentic India: How Local Companions Transform Your Travel Experience
                </h2>
                <div className="flex flex-wrap items-center text-white/80 gap-x-6 gap-y-2 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">April 10, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">12 min read</span>
                  </div>
                </div>
                <p className="text-white/90 max-w-3xl mb-6 hidden md:block">
                  Discover how traveling with local companions can transform your Indian journey from a typical tourist experience to an authentic cultural immersion. Hear stories from travelers and learn why personal connections make all the difference.
                </p>
                <Link href="/blog/authentic-india-local-companions">
                  <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md flex items-center">
                    Read Article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Category filter */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-navy">Explore Topics</h2>
              <div className="relative">
                <select className="bg-white border border-border rounded-lg px-4 py-2 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-nowrap overflow-x-auto hide-scrollbar py-2 space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${category === 'All Posts' 
                      ? 'bg-primary text-white' 
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-border'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog post grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} passHref>
                  <article className="bg-white border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-48 md:h-56">
                      <Image 
                        src={post.coverImage} 
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      {/* Categories */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((category) => (
                          <span key={category} className="bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-navy mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-foreground-muted mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center mt-auto pt-4 border-t border-border">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                          <Image 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-navy">{post.author.name}</div>
                          <div className="text-xs text-gray-500">{post.author.role}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-1">
                <button className="px-4 py-2 border border-border rounded-md text-gray-500 bg-white hover:bg-gray-50">Previous</button>
                <button className="px-4 py-2 border border-border rounded-md bg-primary text-white">1</button>
                <button className="px-4 py-2 border border-border rounded-md text-gray-700 bg-white hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-border rounded-md text-gray-700 bg-white hover:bg-gray-50">3</button>
                <span className="px-4 py-2">...</span>
                <button className="px-4 py-2 border border-border rounded-md text-gray-700 bg-white hover:bg-gray-50">8</button>
                <button className="px-4 py-2 border border-border rounded-md text-gray-700 bg-white hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter signup */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">Stay Updated</h2>
              <p className="text-white/80 mb-8">
                Subscribe to our newsletter for the latest travel tips, cultural insights, and exclusive Navigo offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-secondary"
                  required
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-white/60 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}