// src/components/blog/WebsiteJsonLd.tsx
import React from 'react';

interface WebsiteJsonLdProps {
  url: string;
}

export default function WebsiteJsonLd({ url }: WebsiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Navigo - Your Local Travel Companion in India",
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}