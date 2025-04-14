// src/components/blog/AuthorBio.tsx
import React from 'react';
import Image from 'next/image';
import { Author } from '@/types/blog';

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-heading font-bold text-navy mb-4">About the Author</h2>
      <div className="flex items-start">
        <div className="w-16 h-16 rounded-full overflow-hidden relative mr-4 flex-shrink-0">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-navy">{author.name}</h3>
          <p className="text-sm text-foreground-muted mb-2">{author.role}</p>
          {author.bio && (
            <p className="text-foreground-muted">{author.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}