// src/app/api/blog/route.ts - API route to get all blog posts
import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog-posts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  let filteredPosts = [...blogPosts];
  
  // Filter by category if provided
  if (category && category !== 'All Posts') {
    filteredPosts = filteredPosts.filter(post => 
      post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
    );
  }
  
  // Calculate pagination
  const total = filteredPosts.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  return NextResponse.json({
    posts: paginatedPosts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
}