// src/components/blog/BlogJsonLd.tsx
import React from 'react';
import { BlogPost } from '@/types/blog';

interface BlogJsonLdProps {
  post: BlogPost;
  url: string;
}

export default function BlogJsonLd({ post, url }: BlogJsonLdProps) {
  // Format the date for Schema.org (ISO format)
  const formattedDate = new Date(post.date).toISOString();
  
  // Create the JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Navigo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://navigoindia.com/images/logo.png"
      }
    },
    "datePublished": formattedDate,
    "dateModified": formattedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": post.categories.join(", ")
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}