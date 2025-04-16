// src/app/blog/categories/[category]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar } from "lucide-react";

// Generate static params for all categories
export function generateStaticParams() {
  const categories = Array.from(
    new Set(blogPosts.flatMap((post) => post.categories))
  );
  
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Dynamic metadata for each category page
export function generateMetadata({ params }) {
  // Convert URL slug to display format (e.g., 'travel-tips' to 'Travel Tips')
  const displayCategory = params.category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Check if the category exists
  const categoryExists = blogPosts.some((post) => 
    post.categories.some(
      (cat) => cat.toLowerCase().replace(/\s+/g, '-') === params.category
    )
  );
  
  if (!categoryExists) {
    return {
      title: "Category Not Found | Navigo Blog",
      description: "The requested blog category could not be found.",
    };
  }
  
  return {
    title: `${displayCategory} | Navigo Blog`,
    description: `Discover articles, tips, and insights about ${displayCategory.toLowerCase()} from Navigo's local travel experts and companions in India.`,
    keywords: [displayCategory, "India travel", "local companions", "travel blog", "travel insights", "India travel guide"],
    openGraph: {
      title: `${displayCategory} | Navigo Blog`,
      description: `Discover articles, tips, and insights about ${displayCategory.toLowerCase()} from Navigo's local travel experts and companions in India.`,
      url: `https://navigoindia.com/blog/categories/${params.category}`,
      siteName: "Navigo",
      images: [
        {
          url: "/images/blog/category-header.jpg",
          width: 1200,
          height: 630,
          alt: `${displayCategory} articles on Navigo Blog`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function CategoryPage({ params }) {
  // Convert URL slug to display format (e.g., 'travel-tips' to 'Travel Tips')
  const displayCategory = params.category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Filter posts by category
  const categoryPosts = blogPosts.filter((post) => 
    post.categories.some(
      (cat) => cat.toLowerCase().replace(/\s+/g, '-') === params.category
    )
  );
  
  // If no posts found, return 404
  if (categoryPosts.length === 0) {
    notFound();
  }
  
  // Get all unique categories for the filter
  const allCategories = Array.from(
    new Set(blogPosts.flatMap((post) => post.categories))
  );

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary py-16 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/indian-pattern.svg')] bg-repeat bg-contain" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {displayCategory}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore our {displayCategory.toLowerCase()} articles written by local experts and travel companions in India.
            </p>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" fill="#FFF8EA"/>
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
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
            <li className="text-navy font-medium">{displayCategory}</li>
          </ol>
        </nav>
        
        {/* Categories Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <span className="text-navy font-medium">Explore topics:</span>
          <Link href="/blog">
            <button className="bg-white hover:bg-secondary/10 border border-border px-4 py-1.5 rounded-full text-sm font-medium text-navy transition-colors">
              All Posts
            </button>
          </Link>
          {allCategories.map((category) => (
            <Link 
              key={category}
              href={`/blog?category=${encodeURIComponent(category)}`}
            >
              <button className={`${
                category === displayCategory 
                  ? 'bg-primary text-white' 
                  : 'bg-white hover:bg-secondary/10 border border-border text-navy'
              } px-4 py-1.5 rounded-full text-sm font-medium transition-colors`}>
                {category}
              </button>
            </Link>
          ))}
        </div>
        
        {/* Category Description */}
        <div className="mb-12 text-center">
          <p className="text-foreground-muted max-w-3xl mx-auto">
            {getCategoryDescription(displayCategory)}
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post) => (
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
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary/10 rounded-xl p-8 md:p-12 relative overflow-hidden">
          {/* Background decoration */}
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

// Helper function to get category descriptions
function getCategoryDescription(category) {
  const descriptions = {
    "Travel Tips": "Essential advice and practical guidance for travelers planning their journey through India. From transportation and accommodation to cultural etiquette and safety.",
    "Cultural Insights": "Dive deeper into Indian culture, traditions, festivals, and customs with articles that help you understand and appreciate the rich cultural tapestry of India.",
    "Local Experiences": "Discover authentic, off-the-beaten-path experiences and activities recommended by our local companions across various destinations in India.",
    "Destinations": "Detailed guides to cities, regions, and hidden gems across India, with insider knowledge on what to see, do, eat, and experience.",
    "Safety": "Important information and advice on staying safe while traveling in India, with a focus on personal security, health precautions, and navigation tips.",
    "Solo Travel": "Resources, tips, and stories specifically for solo travelers exploring India, with advice on making the most of your independent journey.",
    "Women Travelers": "Articles addressing the unique considerations, challenges, and experiences of women traveling in India, written by female companions and travelers.",
    "Travel Philosophy": "Thoughtful perspectives on mindful travel, cultural exchange, sustainable tourism, and the transformative power of authentic travel experiences.",
  };
  
  return descriptions[category] || 
    `Explore our collection of articles about ${category.toLowerCase()} in India, written by local experts and travel companions who know the country intimately.`;
}