// src/app/blog/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, ChevronLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

// Type for the params we receive
type BlogPostParams = {
  params: {
    slug: string;
  };
};

// This would normally come from a CMS, database, or API
// Here we're just using a mock array of posts
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
      role: 'Local Companion & Travel Expert',
      bio: 'Priya is a certified tour guide from Delhi with over 8 years of experience showing travelers the authentic side of India. She specializes in cultural and historical tours.'
    },
    categories: ['Travel Tips', 'Cultural Insights'],
    content: `
      <p>India is a land of incredible diversity, vibrant colors, rich history, and warm hospitality. For first-time visitors, it can also be overwhelming with its bustling cities, unique customs, and sensory overload. As local companions who have helped hundreds of travelers navigate this beautiful chaos, we've compiled our top 10 essential tips to ensure your first trip to India is memorable for all the right reasons.</p>
      
      <h2>1. Start Slow and Plan a Realistic Itinerary</h2>
      <p>Many travelers try to see too much of India in a short time. India is vast and diverse, and travel between cities can take longer than expected. For a two-week trip, limit yourself to 3-4 destinations at most. This gives you time to actually experience each place rather than just checking it off your list.</p>
      <p>Recommended first-timer route: Delhi → Agra → Jaipur (the Golden Triangle) with perhaps one additional destination like Varanasi or Udaipur.</p>
      
      <h2>2. Prepare for the Climate and Pack Accordingly</h2>
      <p>India's climate varies dramatically by region and season. Research the weather for your specific destinations and travel dates. In general:</p>
      <ul>
        <li>October to March is the most pleasant time in most regions</li>
        <li>April to June can be extremely hot (40°C+/104°F+)</li>
        <li>June to September brings monsoon rains to most of the country</li>
      </ul>
      <p>Pack light, breathable clothing that covers shoulders and knees (especially important for visiting religious sites). Comfortable walking shoes, a hat, sunscreen, and a water bottle are essentials.</p>
      
      <h2>3. Be Mindful of Food and Water Safety</h2>
      <p>Indian cuisine is one of the highlights of any trip, but taking a few precautions will help you avoid the dreaded "Delhi belly":</p>
      <ul>
        <li>Stick to bottled or filtered water, and check that seals are intact</li>
        <li>Avoid ice unless you're sure it's made from purified water</li>
        <li>Eat at busy restaurants where food turnover is high</li>
        <li>Street food can be amazing, but choose vendors cooking fresh in front of you</li>
        <li>Peel fruits and vegetables, or wash them with purified water</li>
        <li>Carry hand sanitizer and use it frequently</li>
      </ul>
      <p>Pro tip: Bring basic medications including anti-diarrheal medication, just in case.</p>
      
      <h2>4. Master the Art of Bargaining</h2>
      <p>Bargaining is expected in markets, with street vendors, and for services like tuk-tuks. However, there's an art to doing it respectfully:</p>
      <ul>
        <li>Start by offering 40-50% of the asking price, then negotiate upward</li>
        <li>Keep it friendly and smile – it's part of the cultural exchange</li>
        <li>Be prepared to walk away if you can't reach a fair price</li>
        <li>Once you've agreed on a price, honor it</li>
      </ul>
      <p>Remember that saving a few rupees might mean little to you but could be significant to the seller.</p>
      
      <h2>5. Dress Respectfully</h2>
      <p>India tends to be more conservative regarding clothing, especially outside major cities. Respecting local customs will earn you more positive interactions:</p>
      <ul>
        <li>Women: Loose-fitting pants or long skirts, tops that cover shoulders and aren't low-cut</li>
        <li>Men: Long pants in religious sites (shorts are generally fine elsewhere)</li>
        <li>Consider carrying a scarf/shawl to cover your head in temples and mosques</li>
      </ul>
      
      <div class="blog-pullquote">
        "When traveling in India, dressing respectfully isn't just about following rules – it's a gateway to more authentic connections with locals."
      </div>
      
      <h2>6. Learn Basic Hindi Phrases</h2>
      <p>While English is widely spoken in tourist areas, knowing a few Hindi phrases goes a long way in building rapport:</p>
      <ul>
        <li>Namaste (Greeting)</li>
        <li>Dhanyavaad (Thank you)</li>
        <li>Kitne paise? (How much?)</li>
        <li>Thik hai (Okay)</li>
        <li>Maaf kijiye (Excuse me/Sorry)</li>
      </ul>
      
      <h2>7. Understand and Respect Religious Customs</h2>
      <p>India is home to many religions, each with its customs. Some general tips:</p>
      <ul>
        <li>Remove shoes before entering temples and mosques</li>
        <li>Ask permission before taking photos of people, especially in religious settings</li>
        <li>In Hindu temples, walk clockwise around sacred objects</li>
        <li>Avoid touching people with your left hand (traditionally considered unclean)</li>
      </ul>
      
      <h2>8. Prepare for Personal Space Differences</h2>
      <p>India is densely populated, and the concept of personal space differs from Western countries. Prepare yourself for:</p>
      <ul>
        <li>Crowded public transportation</li>
        <li>People standing closer during conversations</li>
        <li>Potential staring or photo requests (especially if you look visibly foreign)</li>
      </ul>
      <p>Respond with patience and a smile, but don't hesitate to politely decline interactions that make you uncomfortable.</p>
      
      <h2>9. Stay Connected Safely</h2>
      <p>Getting an Indian SIM card is highly recommended for maps, translation apps, and staying in touch:</p>
      <ul>
        <li>Purchase from official carrier stores (Airtel, Jio, Vodafone) at the airport</li>
        <li>Bring your passport and a passport photo for SIM registration</li>
        <li>Download offline maps and translation apps as backups</li>
        <li>Consider a VPN for extra security on public WiFi</li>
      </ul>
      
      <h2>10. Consider a Local Companion</h2>
      <p>This might sound self-serving (as we are Navigo local companions!), but having a local guide for at least part of your trip can transform your experience:</p>
      <ul>
        <li>Navigate complex situations with ease</li>
        <li>Avoid tourist scams and inflated prices</li>
        <li>Discover authentic experiences off the tourist trail</li>
        <li>Learn about culture, history, and traditions from an insider's perspective</li>
        <li>Bridge language gaps and cultural misunderstandings</li>
      </ul>
      
      <div class="blog-conclusion">
        <p>India rewards those who come with an open mind, a patient heart, and a spirit of adventure. The country may challenge you at times, but it will also delight and inspire you in ways few other destinations can. By preparing thoughtfully and embracing the unexpected, your first trip to India has the potential to be the journey of a lifetime.</p>
        <p>Have you visited India before? What tips would you add to this list? Share your experiences in the comments below!</p>
      </div>
      
      <div class="blog-related-links">
        <h3>Related Articles:</h3>
        <ul>
          <li><a href="#">Understanding Indian Cultural Etiquette: Do's and Don'ts</a></li>
          <li><a href="#">The Best Time to Visit Different Regions in India</a></li>
          <li><a href="#">Traveling as a Woman in India: Safety Tips & Insights</a></li>
        </ul>
      </div>
    `
  }
  // In a real implementation, we would have more blog posts here
];

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  // Find the post based on the slug
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  // If post doesn't exist, return default metadata
  if (!post) {
    return {
      title: 'Post Not Found - Navigo Blog',
      description: 'The blog post you are looking for does not exist.'
    };
  }
  
  return {
    title: `${post.title} - Navigo Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://navigotravel.com/blog/${post.slug}`,
      siteName: 'Navigo Travel',
      images: [
        {
          url: post.coverImage, // This would need to be a full URL in production
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date, // This should ideally be an ISO date string
      authors: [post.author.name],
      tags: post.categories,
    },
    // Add structured data for better SEO
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'image': post.coverImage, // Should be full URL
        'author': {
          '@type': 'Person',
          'name': post.author.name,
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Navigo Travel',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://navigotravel.com/logo.png' // Should be full URL
          }
        },
        'datePublished': post.date, // Should be ISO date
        'description': post.excerpt,
        'keywords': post.categories.join(',')
      })
    }
  };
}

// This function generates the static paths for all blog posts
export async function generateStaticParams() {
  // In a real implementation, this would fetch posts from a CMS or API
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostParams) {
  // Find the post based on the slug
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }
  
  // Related posts (would normally be filtered based on categories or tags)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .filter(p => p.categories.some(category => post.categories.includes(category)))
    .slice(0, 3);
  
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative h-[60vh] sm:h-[70vh]">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute z-20 bottom-0 left-0 right-0 p-6 md:p-16 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
            <div className="max-w-4xl mx-auto">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Link href={`/blog?category=${category}`} key={category} passHref>
                    <span className="bg-secondary text-white text-sm px-3 py-1 rounded-full font-medium">
                      {category}
                    </span>
                  </Link>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center text-white/80 gap-4 md:gap-6 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              {/* Author info */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white">
                  <Image 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-medium">{post.author.name}</div>
                  <div className="text-white/70 text-sm">{post.author.role}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Main content */}
              <article className="md:w-2/3">
                <div className="max-w-3xl">
                  {/* Back to blog link */}
                  <Link href="/blog" passHref className="inline-flex items-center text-primary font-medium mb-8 hover:underline">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to all articles
                  </Link>
                  
                  {/* Blog content */}
                  <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy prose-p:text-foreground-muted prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-blockquote:border-secondary prose-blockquote:bg-secondary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-10 pt-6 border-t border-border">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-navy font-medium">Tags:</span>
                      {post.categories.map((category) => (
                        <Link href={`/blog?category=${category}`} key={category} passHref>
                          <span className="bg-sand hover:bg-sand/70 transition-colors px-3 py-1 rounded-full text-sm">
                            {category}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Share buttons */}
                  <div className="mt-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-navy font-medium">Share:</span>
                      <button className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90">
                        <Facebook size={18} />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90">
                        <Twitter size={18} />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90">
                        <Linkedin size={18} />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-[#EA4335] text-white flex items-center justify-center hover:opacity-90">
                        <Mail size={18} />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 ml-auto">
                        <Bookmark size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Author bio */}
                  <div className="mt-10 bg-sand/30 rounded-xl p-6 border border-border">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-bold text-navy">{post.author.name}</h3>
                        <p className="text-sm text-foreground-muted mb-3">{post.author.role}</p>
                        <p className="text-foreground-muted">{post.author.bio}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comments section placeholder - would be implemented with a comments system */}
                  <div className="mt-10 pt-6 border-t border-border">
                    <h3 className="text-2xl font-heading font-bold text-navy mb-6">Comments</h3>
                    <div className="bg-sand/20 rounded-lg p-8 text-center">
                      <p className="text-foreground-muted mb-4">Join the conversation! Comments coming soon.</p>
                      <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Be notified when comments are available
                      </button>
                    </div>
                  </div>
                </div>
              </article>
              
              {/* Sidebar */}
              <aside className="md:w-1/3">
                <div className="sticky top-24">
                  {/* Author info - mobile view only */}
                  <div className="bg-white shadow-md rounded-xl p-6 border border-border mb-6 md:hidden">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-navy">{post.author.name}</h3>
                        <p className="text-sm text-foreground-muted">{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Related posts */}
                  <div className="bg-white shadow-md rounded-xl p-6 border border-border mb-6">
                    <h3 className="text-xl font-heading font-bold text-navy mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id} passHref>
                          <div className="flex items-start gap-3 group">
                            <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                              <Image 
                                src={relatedPost.coverImage} 
                                alt={relatedPost.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-navy group-hover:text-primary transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{relatedPost.date}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div className="bg-white shadow-md rounded-xl p-6 border border-border mb-6">
                    <h3 className="text-xl font-heading font-bold text-navy mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Travel Tips', 'Cultural Insights', 'Local Experiences', 'Food & Cuisine', 'Safety', 'Destinations'].map((category) => (
                        <Link href={`/blog?category=${category}`} key={category} passHref>
                          <span className="bg-sand hover:bg-sand/70 transition-colors px-3 py-1 rounded-full text-sm">
                            {category}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  {/* Newsletter signup */}
                  <div className="bg-primary text-white rounded-xl p-6">
                    <h3 className="text-xl font-heading font-bold mb-3">Subscribe to Our Newsletter</h3>
                    <p className="text-white/80 text-sm mb-4">
                      Get the latest travel tips and cultural insights delivered to your inbox
                    </p>
                    <form className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-secondary"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Subscribe
                      </button>
                    </form>
                    <p className="text-white/60 text-xs mt-3">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </div>
                  
                  {/* Custom CTA */}
                  <div className="mt-6 bg-sand rounded-xl p-6 border border-border relative overflow-hidden">
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10">
                      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#BE5504" strokeWidth="2" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#BE5504" strokeWidth="2" />
                        <circle cx="50" cy="50" r="20" fill="none" stroke="#BE5504" strokeWidth="2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-navy mb-3">Experience India with a Local</h3>
                    <p className="text-foreground-muted text-sm mb-4">
                      Ready to explore India with your own personal companion? Book your trip now!
                    </p>
                    <Link href="/try-navigo" passHref>
                      <button className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
        
        {/* More from Navigo */}
        <section className="py-16 bg-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-navy text-center mb-12">More from Navigo</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id} passHref>
                  <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative h-48">
                      <Image 
                        src={post.coverImage} 
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-heading font-bold text-navy mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-foreground-muted text-sm mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-auto">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}