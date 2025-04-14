// src/components/blog/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className={`
      bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border
      ${featured ? 'md:flex' : ''}
    `}>
      <Link href={`/blog/${post.slug}`} className={`block ${featured ? 'md:w-1/2' : ''}`}>
        <div className={`relative ${featured ? 'aspect-auto md:h-full' : 'aspect-[16/9]'}`}>
          <Image
            src={post.coverImage || "/images/blog/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover"
          />
          {post.categories[0] && !featured && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy px-3 py-1 rounded-full text-xs font-medium">
              {post.categories[0]}
            </div>
          )}
          {featured && (
            <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          )}
        </div>
      </Link>
      
      <div className={`p-6 ${featured ? 'md:w-1/2 md:flex md:flex-col' : ''}`}>
        {featured && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <span key={category} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                {category}
              </span>
            ))}
          </div>
        )}
        
        <h3 className={`font-heading font-bold text-navy mb-2 line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        
        <p className={`text-foreground-muted mb-4 line-clamp-2 ${featured ? 'text-base' : 'text-sm'}`}>
          {post.excerpt}
        </p>
        
        <div className={`flex items-center ${featured ? 'mt-auto' : 'justify-between'}`}>
          <div className="flex items-center">
            <div className={`rounded-full overflow-hidden relative mr-2 ${featured ? 'w-10 h-10' : 'w-8 h-8'}`}>
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className={`font-medium text-navy ${featured ? 'text-base' : 'text-sm'}`}>{post.author.name}</p>
              {featured && (
                <div className="flex items-center text-xs text-foreground-muted">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>
          </div>
          
          {!featured && (
            <div className="flex items-center text-xs text-foreground-muted">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{post.date}</span>
            </div>
          )}
        </div>
        
        {featured && (
          <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors">
            Read full story
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}
