// src/app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export function generateMetadata() {
  return {
    title: "Navigo Blog | Travel Tips & Cultural Insights for Exploring India",
    description: "Discover authentic travel experiences, local insights, and essential tips for traveling in India with Navigo's blog, written by local companions and travel experts.",
    keywords: [
      "India travel blog", 
      "local travel tips India", 
      "authentic India experiences", 
      "travel with locals India", 
      "India cultural insights", 
      "safety tips India travel", 
      "solo female travel India"
    ],
    openGraph: {
      title: "Navigo Blog | Travel Tips & Cultural Insights for Exploring India",
      description: "Discover authentic travel experiences, local insights, and essential tips for traveling in India with Navigo's local companions.",
      url: "https://navigoindia.com/blog",
      siteName: "Navigo",
      images: [
        {
          url: "/images/blog/featured-post.jpg",
          width: 1200,
          height: 630,
          alt: "Navigo Blog",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function BlogPage({ searchParams }) {
  // Get the category from search params (if any)
  const activeCategory = searchParams?.category || "";
  
  // Get all unique categories for the filter
  const categories = Array.from(
    new Set(blogPosts.flatMap((post) => post.categories))
  );
  
  // Filter posts by category (if specified)
  const filteredPosts = activeCategory 
    ? blogPosts.filter(post => 
        post.categories.some(cat => 
          cat.toLowerCase() === activeCategory.toLowerCase()
        )
      )
    : blogPosts;
  
  // Find the featured post (filter by active category if specified)
  const featuredPost = filteredPosts.find((post) => post.featured) || 
                       (filteredPosts.length > 0 ? filteredPosts[0] : null);
  
  // All other posts
  const regularPosts = featuredPost 
    ? filteredPosts.filter((post) => post.id !== featuredPost.id)
    : filteredPosts;

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary py-16 relative overflow-hidden">
        {/* Background pattern - inspired by Indian designs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/indian-pattern.svg')] bg-repeat bg-contain" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              The Navigo <span className="text-secondary">Travel Journal</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Authentic insights, local perspectives, and essential tips for experiencing the real India
            </p>
          </div>
        </div>
        
        {/* Wave decoration with Indian-inspired pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" fill="#FFF8EA"/>
            <path d="M120 32C150 25 180 35 210 32C240 28 270 18 300 20C330 22 360 35 390 35C420 35 450 20 480 18C510 16 540 25 570 30C600 35 630 37 660 35C690 33 720 27 750 27C780 27 810 32 840 30C870 28 900 20 915 16L930 12" stroke="#FF9933" strokeWidth="1" strokeDasharray="2 3" opacity="0.3"/>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        {activeCategory && (
          <nav className="text-sm mb-8">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-foreground-muted hover:text-navy transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-foreground-muted">/</li>
              <li>
                <Link href="/blog" className="text-foreground-muted hover:text-navy transition-colors">
                  Blog
                </Link>
              </li>
              <li className="text-foreground-muted">/</li>
              <li className="text-navy font-medium">
                {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </li>
            </ol>
          </nav>
        )}
        
        {/* Categories Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <span className="text-navy font-medium">Explore topics:</span>
          <Link href="/blog">
            <button className={`${!activeCategory ? 'bg-primary text-white' : 'bg-white hover:bg-secondary/10 border border-border text-navy'} px-4 py-1.5 rounded-full text-sm font-medium transition-colors`}>
              All Posts
            </button>
          </Link>
          {categories.map((category) => (
            <Link 
              key={category}
              href={`/blog?category=${encodeURIComponent(category)}`}
            >
              <button className={`${activeCategory === category.toLowerCase() ? 'bg-primary text-white' : 'bg-white hover:bg-secondary/10 border border-border text-navy'} px-4 py-1.5 rounded-full text-sm font-medium transition-colors`}>
                {category}
              </button>
            </Link>
          ))}
        </div>

        {featuredPost && !activeCategory && (
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold text-navy mb-8 flex items-center">
              <span className="w-1.5 h-5 bg-secondary rounded-full mr-2"></span>
              Featured Story
            </h2>
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                
                <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {featuredPost.categories.map((category) => (
                    <span key={category} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {category}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
                  {featuredPost.title}
                </h3>
                
                <p className="text-foreground-muted mb-6">{featuredPost.excerpt}</p>
                
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative mr-3">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-navy">{featuredPost.author.name}</p>
                    <div className="flex items-center text-xs text-foreground-muted">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{featuredPost.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <Link href={`/blog/${featuredPost.slug}`} className="mt-6 inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors">
                  Read full story
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-navy mb-8 flex items-center">
            <span className="w-1.5 h-5 bg-primary rounded-full mr-2"></span>
            {activeCategory ? `Articles about ${activeCategory}` : 'Latest Articles'}
          </h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={post.coverImage || "/images/blog/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      {post.categories[0] && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy px-3 py-1 rounded-full text-xs font-medium">
                          {post.categories[0]}
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-navy mb-2 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-foreground-muted mb-4 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden relative mr-2">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-navy">{post.author.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-foreground-muted">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-foreground-muted">No articles found for this category.</p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary/10 rounded-xl p-8 md:p-12 relative overflow-hidden">
          {/* Background decoration - inspired by Indian patterns */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,10 L120,90 L200,100 L120,110 L100,190 L80,110 L0,100 L80,90 L100,10 Z" fill="#1A5F7A"/>
              <circle cx="100" cy="100" r="50" fill="none" stroke="#1A5F7A" strokeWidth="1" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#1A5F7A" strokeWidth="1" />
            </svg>
          </div>
          
          <div className="relative z-10 md:max-w-xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-3">
              Never Miss a Story
            </h2>
            <p className="text-foreground-muted mb-6">
              Subscribe to our newsletter for the latest travel tips, local insights, and exclusive content delivered straight to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="mt-3 text-xs text-foreground-muted">
              By subscribing, you agree to our privacy policy. We'll never spam you.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}