// src/components/blog/ShareButtons.tsx
import React from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const url = `https://navigoindia.com/blog/${slug}`;
  
  return (
    <div className="mt-8 pt-8 border-t border-border">
      <h2 className="text-lg font-heading font-bold text-navy mb-4">Share this article</h2>
      <div className="flex space-x-4">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#4267B2] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0077B5] text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}