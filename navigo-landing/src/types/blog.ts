// src/types/blog.ts - Blog post data types
export interface Author {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  }
  
  export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    readTime: string;
    author: Author;
    categories: string[];
    content: string;
    featured?: boolean;
  }
  
  
  
  
  
  