// src/app/blog/authors/[author]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";

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
export function generateMetadata({ params }: { params: { author: string } }): Metadata {
  // Find author
  const authorName = params.author
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const authorPosts = blogPosts.filter(
    (post) => post.author.name.toLowerCase().replace(/\s+/g, '-') === params.author
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
      url: `https://navigoindia.com/blog/authors/${params.author}`,
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

export default function AuthorPage({ params }: { params: { author: string } }) {
  // Find author's posts
  const authorPosts = blogPosts.filter(
    (post) => post.author.name.toLowerCase().replace(/\s+/g, '-') === params.author
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
            <div className="w-24 h-24 rounded-full overflow-hidden relative mb-4">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
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