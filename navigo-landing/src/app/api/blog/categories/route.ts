
  // src/app/api/blog/categories/route.ts - API route to get all blog categories
  import { NextRequest, NextResponse } from 'next/server';
  import { blogPosts } from '@/data/blog-posts';
  
  export async function GET() {
    // Extract all categories from blog posts and remove duplicates
    const allCategories = blogPosts.flatMap(post => post.categories);
    const uniqueCategories = ['All Posts', ...new Set(allCategories)];
    
    return NextResponse.json({
      categories: uniqueCategories
    });
  }