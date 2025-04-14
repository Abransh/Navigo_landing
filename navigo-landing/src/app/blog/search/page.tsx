// src/app/blog/search/page.tsx
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogHero } from "@/components/blog/BlogHero";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";
import { SearchBar } from "@/components/blog/SearchBar";

export const metadata: Metadata = {
  title: "Search Results | Navigo Blog",
  description: "Find articles, tips, and insights about India travel on the Navigo blog.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  
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
          <SearchBar />
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
                    <BlogCard key={post.id} post={post} />
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
