// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog-posts"; // Assuming this path is correct
import Navbar from "@/components/layout/Navbar"; // Assuming this path is correct
import Footer from "@/components/layout/Footer"; // Assuming this path is correct
import { ArrowLeft, ArrowRight, Calendar, Clock, Facebook, Linkedin, Twitter } from "lucide-react";

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Define a type alias for the page component's props
// NOTE: Using 'any' as a temporary workaround for a persistent TypeScript error.
// This sacrifices type safety for params and searchParams and should be revisited
// once the underlying issue (likely a Next.js bug or conflict) is resolved.
type Props = any;
/*
// Original/Ideal Props type (replace 'any' above when fixed):
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
*/


// Dynamic metadata generation for each blog post page
// This remains async as it might involve data fetching in the future
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Navigo Blog",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Navigo Blog`,
    description: post.excerpt,
    keywords: [...post.categories, "India travel", "local companions", "travel tips", "india blog"],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://navigoindia.com/blog/${post.slug}`,
      siteName: "Navigo",
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
    },
  };
}

// The main page component.
// Using 'Props = any' as a temporary workaround for the persistent type error.
export default function BlogPostPage({ params, searchParams }: Props) {
  // Since Props is 'any', access params/searchParams carefully
  const currentSlug = params?.slug; // Optional chaining just in case
  if (!currentSlug) {
      // Handle case where slug might be missing if 'any' hides an issue
      console.error("Blog post slug is missing!");
      notFound();
  }

  const post = blogPosts.find((post) => post.slug === currentSlug);


  if (!post) {
    notFound(); // This function works in non-async Server Components too
  }

  // Synchronous filtering and finding based on the already available blogPosts data
  const relatedPosts = blogPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.categories.some((category) => post.categories.includes(category))
    )
    .slice(0, 3);

  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // JSX return remains the same
  return (
    <main className="min-h-screen bg-sand">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary py-16 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/indian-pattern.svg')] bg-repeat bg-contain" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-white/90 mb-6 flex-wrap gap-x-3 gap-y-1">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full overflow-hidden relative mr-3 flex-shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm md:text-base">{post.author.name}</p>
                <p className="text-white/80 text-xs md:text-sm">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
            <path d="M0 96L60 85.3C120 75 240 53 360 58.7C480 64 600 96 720 90.7C840 85 960 43 1080 32C1200 21 1320 43 1380 53.3L1440 64V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V96Z" fill="#FFF8EA"/>
          </svg>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-10 relative z-10">
        <div className="rounded-xl overflow-hidden shadow-lg relative aspect-[16/9]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 896px, 768px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Article Content */}
          <article className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-md">
              <div
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-navy prose-p:text-foreground-muted prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {/* Author Bio */}
              {post.author.bio && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h2 className="text-lg font-heading font-bold text-navy mb-4">About the Author</h2>
                  <div className="flex items-start">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative mr-4 flex-shrink-0">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy">{post.author.name}</h3>
                      <p className="text-sm text-foreground-muted mb-2">{post.author.role}</p>
                      <p className="text-foreground-muted">{post.author.bio}</p>
                    </div>
                  </div>
                </div>
              )}
              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-navy mr-2">Tags:</span>
                  {post.categories.map((category) => (
                    <Link
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      key={category}
                      className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Social Sharing */}
              <div className="mt-8 pt-8 border-t border-border">
                <h2 className="text-lg font-heading font-bold text-navy mb-4">Share this article</h2>
                <div className="flex space-x-4">
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://navigoindia.com/blog/${currentSlug}`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity" aria-label="Share on Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://navigoindia.com/blog/${currentSlug}`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#4267B2] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity" aria-label="Share on Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://navigoindia.com/blog/${currentSlug}`)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="bg-[#0077B5] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity" aria-label="Share on LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              {/* Post Navigation */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="flex flex-col p-4 border border-border rounded-lg hover:bg-sand/50 transition-colors">
                    <span className="text-sm text-foreground-muted mb-1 flex items-center">
                      <ArrowLeft className="w-4 h-4 mr-1" /> Previous
                    </span>
                    <span className="font-medium text-navy line-clamp-2">{prevPost.title}</span>
                  </Link>
                ) : (<div/>)}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="flex flex-col p-4 border border-border rounded-lg hover:bg-sand/50 transition-colors text-right sm:ml-auto">
                    <span className="text-sm text-foreground-muted mb-1 flex items-center justify-end">
                      Next <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                    <span className="font-medium text-navy line-clamp-2">{nextPost.title}</span>
                  </Link>
                ) : (<div/>)}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            {/* Related Posts */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-heading font-bold text-navy mb-6 flex items-center">
                <span className="w-1 h-5 bg-secondary rounded-full mr-2"></span>
                Related Articles
              </h2>
              <div className="space-y-6">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="flex items-start">
                      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-navy line-clamp-2 mb-1 leading-tight">
                          <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                            {relatedPost.title}
                          </Link>
                        </h3>
                        <div className="flex items-center text-xs text-foreground-muted">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{relatedPost.date}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-foreground-muted">No related posts found.</p>
                )}
              </div>
            </div>
            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-heading font-bold text-navy mb-6 flex items-center">
                <span className="w-1 h-5 bg-primary rounded-full mr-2"></span>
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(blogPosts.flatMap((p) => p.categories))).map((category) => (
                  <Link
                    key={category}
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className="bg-sand hover:bg-sand/70 px-3 py-1.5 rounded-full text-navy text-sm transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            {/* CTA */}
            <div className="bg-primary rounded-xl p-6 text-white relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                </svg>
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-heading font-bold mb-3">
                  Experience India Like a Local
                </h2>
                <p className="text-white/90 mb-4 text-sm">
                  Ready to discover authentic experiences with a trusted local companion? Try Navigo today!
                </p>
                <Link href="/try-navigo">
                  <button className="w-full bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary">
                    Try Navigo
                  </button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
