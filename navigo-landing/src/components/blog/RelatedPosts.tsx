// src/components/blog/RelatedPosts.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { Calendar } from 'lucide-react';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-heading font-bold text-navy mb-6 flex items-center">
        <span className="w-1 h-5 bg-secondary rounded-full mr-2"></span>
        Related Articles
      </h2>
      
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="flex">
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-navy line-clamp-2 mb-1">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <div className="flex items-center text-xs text-foreground-muted">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-foreground-muted">No related posts found.</p>
        )}
      </div>
    </div>
  );
}