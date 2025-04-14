// src/components/blog/CategoryFilter.tsx
import React from 'react';
import Link from 'next/link';

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      <span className="text-navy font-medium">Explore topics:</span>
      <Link href="/blog">
        <button 
          className={`${
            !activeCategory 
              ? 'bg-primary text-white' 
              : 'bg-white hover:bg-secondary/10 border border-border text-navy'
          } px-4 py-1.5 rounded-full text-sm font-medium transition-colors`}
        >
          All Posts
        </button>
      </Link>
      {categories.map((category) => (
        <Link 
          key={category}
          href={`/blog?category=${encodeURIComponent(category)}`}
        >
          <button
            className={`${
              activeCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-white hover:bg-secondary/10 border border-border text-navy'
            } px-4 py-1.5 rounded-full text-sm font-medium transition-colors`}
          >
            {category}
          </button>
        </Link>
      ))}
    </div>
  );
}
