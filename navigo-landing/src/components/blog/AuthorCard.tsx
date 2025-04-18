
import React from 'react';
import Link from 'next/link';
import { Author } from '@/types/blog';

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const authorSlug = author.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/blog/authors/${authorSlug}`}>
        <h3 className="text-xl font-heading font-bold text-navy mb-2">{author.name}</h3>
      </Link>
      <p className="text-sm text-foreground-muted mb-3">{author.role}</p>
      {author.bio && (
        <p className="text-foreground-muted text-sm line-clamp-3 mb-4">{author.bio}</p>
      )}
      <Link href={`/blog/authors/${authorSlug}`} className="text-primary hover:underline text-sm font-medium">
        View articles
      </Link>
    </div>
  );
}