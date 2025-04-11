// src/app/api/blog/[slug]/route.ts - API route to get a specific blog post
import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/data/blog-posts';

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = params;
  
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
  
  // Get related posts based on categories
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .filter(p => p.categories.some(category => post.categories.includes(category)))
    .slice(0, 3);
  
  return NextResponse.json({
    post,
    relatedPosts
  });
}