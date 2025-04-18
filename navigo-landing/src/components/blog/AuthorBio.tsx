// src/components/blog/AuthorBio.tsx
import React from 'react';
import { Author } from '@/types/blog';

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-heading font-bold text-navy mb-4">About the Author</h2>
      <div>
        <h3 className="font-medium text-navy">{author.name}</h3>
        <p className="text-sm text-foreground-muted mb-2">{author.role}</p>
        <p className="text-foreground-muted">{author.bio}</p>
      </div>
    </div>
  );
}