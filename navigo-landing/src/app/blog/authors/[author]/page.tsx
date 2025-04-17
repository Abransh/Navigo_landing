// src/app/blog/authors/[author]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock } from "lucide-react";

// Define type for author page params
type AuthorPageParams = {
  params:  Promise<{
    author: string;
  }>;
};

// Generate static params for all authors
export function generateStaticParams() {
  const authors = Array.from(
    new Set(blogPosts.map((post) => post.author.name))
  );
  
  return authors.map((author) => ({
    author: author.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Dynamic metadata for each author page
export async function generateMetadata({ params }: AuthorPageParams) {
  // Find author
  
  const resolvedParams = await params;
  const authorName = resolvedParams.author
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const authorPosts = blogPosts.filter(
    (post) => post.author.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.author
  );
  
  if (authorPosts.length === 0) {
    return {
      title: "Author Not Found | Navigo Blog",
      description: "The requested author could not be found.",
    };
  }
  
  const author = authorPosts[0].author;
  
  return {
    title: `Articles by ${author.name} | Navigo Blog`,
    description: `Read travel insights, tips, and stories about India written by ${author.name}, ${author.role.toLowerCase()}.`,
    openGraph: {
      title: `Articles by ${author.name} | Navigo Blog`,
      description: `Read travel insights, tips, and stories about India written by ${author.name}, ${author.role.toLowerCase()}.`,
      url: `https://www.trynavigo.com/blog/authors/${resolvedParams.author}`,
      siteName: "Navigo",
      images: [
        {
          url: author.avatar,
          width: 800,
          height: 800,
          alt: author.name,
        },
      ],
      locale: "en_US",
      type: "profile",
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageParams) {
  // Find author's posts
  const resolvedParams = await params;
  
  const authorPosts = blogPosts.filter(
    (post) => post.author.name.toLowerCase().replace(/\s+/g, '-') === resolvedParams.author
  );
  
  if (authorPosts.length === 0) {
    notFound();
  }
  
  const author = authorPosts[0].author;

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
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              {author.name}
            </h1>
            
            <p className="text-xl text-white/90 mb-4">{author.role}</p>
            
            {author.bio && (
              <p className="text-white/80 max-w-2xl">
                {author.bio}
              </p>
            )}
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
            <li>
              <Link href="/blog/authors" className="text-foreground-muted hover:text-navy transition-colors">
                Authors
              </Link>
            </li>
            <li className="text-foreground-muted">/</li>
            <li className="text-navy font-medium">{author.name}</li>
          </ol>
        </nav>
        
        {/* Author's Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-navy mb-8 flex items-center">
            <span className="w-1.5 h-5 bg-primary rounded-full mr-2"></span>
            Articles by {author.name}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorPosts.map((post) => (
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
                    <div className="flex items-center text-xs text-foreground-muted">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    
                    <div className="flex items-center text-xs text-foreground-muted">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{post.readTime}</span>
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