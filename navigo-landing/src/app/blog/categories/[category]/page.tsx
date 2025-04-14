// src/app/blog/categories/[category]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogHero } from "@/components/blog/BlogHero";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import WebsiteJsonLd from "@/components/blog/WebsiteJsonLd";
import BreadcrumbJsonLd from "@/components/blog/BreadcrumbJsonLd";

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
export function generateMetadata({ params }: { params: { category: string } }): Metadata {
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

export default function CategoryPage({ params }: { params: { category: string } }) {
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
  
  // Create breadcrumb items for SEO
  const breadcrumbItems = [
    { name: "Home", item: "https://navigoindia.com" },
    { name: "Blog", item: "https://navigoindia.com/blog" },
    { name: displayCategory, item: `https://navigoindia.com/blog/categories/${params.category}` },
  ];

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      
      {/* JSON-LD for SEO */}
      <WebsiteJsonLd url="https://navigoindia.com" />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <BlogHero 
        title={displayCategory}
        subtitle={`Explore our ${displayCategory.toLowerCase()} articles written by local experts and travel companions in India.`}
      />

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
        <CategoryFilter 
          categories={allCategories} 
          activeCategory={displayCategory}
        />
        
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
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </div>

      <Footer />
    </main>
  );
}

// Helper function to get category descriptions
function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
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