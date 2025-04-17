// src/app/blog/search/page.tsx
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BlogHero } from "@/components/blog/BlogHero";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Results | Navigo Blog",
  description: "Find articles, tips, and insights about India travel on the Navigo blog.",
  robots: {
    index: false,
    follow: true,
  },
};

// Define type for search page props
type SearchPageProps = {
  params: Promise<{}>;
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  // Resolve the params promise (although it's empty for search pages)
  const resolvedParams = await params;
  
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || "";
  
  // Search logic
  const searchResults = query
    ? blogPosts.filter((post) => {
        const searchableContent = `
          ${post.title.toLowerCase()}
          ${post.excerpt.toLowerCase()}
          ${post.categories.join(" ").toLowerCase()}
          ${post.author.name.toLowerCase()}
          ${post.content.toLowerCase()}
        `;
        return searchableContent.includes(query.toLowerCase());
      })
    : [];

  return (
    <main className="min-h-screen bg-sand">
      <Navbar />

      {/* Hero Section */}
      <BlogHero 
        title={query ? `Search Results for "${query}"` : "Search Our Blog"}
        subtitle="Find travel tips, local insights, and destination guides for your India journey"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form className="relative" action="/blog/search" method="get">
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              defaultValue={query}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-navy transition-colors"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
        
        {/* Search Results */}
        <div className="mb-16">
          {query ? (
            <>
              <h2 className="text-2xl font-heading font-bold text-navy mb-8 flex items-center">
                <span className="w-1.5 h-5 bg-primary rounded-full mr-2"></span>
                {searchResults.length === 0
                  ? "No Results Found"
                  : `Found ${searchResults.length} Result${searchResults.length !== 1 ? "s" : ""}`}
              </h2>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-foreground-muted mb-4">
                    We couldn't find any articles matching your search for "{query}".
                  </p>
                  <p className="text-foreground-muted">
                    Try using different keywords or browse our categories instead.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((post) => (
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
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground-muted">
                Enter a search term above to find articles.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </div>

      <Footer />
    </main>
  );
}