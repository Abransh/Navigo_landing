// src/data/blog-posts.ts - Data store for blog posts
import { BlogPost } from '@/types/blog';
  
export const blogPosts: BlogPost[] = [
  {
    id: 'essential-travel-tips-india',
    slug: 'essential-travel-tips-india',
    title: '10 Essential Travel Tips for First-Time Visitors to India',
    excerpt: 'Planning your first trip to India? Here are the essential tips every traveler should know before embarking on their journey to this vibrant and diverse country.',
    coverImage: '/images/CompanionAtLocalSpot.png',
    date: 'April 5, 2025',
    readTime: '8 min read',
    author: {
      name: 'Priya Sharma',
      avatar: '/images/blog/authors/priya.jpg',
      role: 'Local Companion & Travel Expert',
      bio: 'Priya is a certified tour guide from Delhi with over 8 years of experience showing travelers the authentic side of India. She specializes in cultural and historical tours.'
    },
    categories: ['Travel Tips', 'Cultural Insights'],
    content: `
      <p>India is a land of incredible diversity, vibrant colors, rich history, and warm hospitality. For first-time visitors, it can also be overwhelming with its bustling cities, unique customs, and sensory overload. As local companions who have helped hundreds of travelers navigate this beautiful chaos, we've compiled our top 10 essential tips to ensure your first trip to India is memorable for all the right reasons.</p>
      
      <h2>1. Start Slow and Plan a Realistic Itinerary</h2>
      <p>Many travelers try to see too much of India in a short time. India is vast and diverse, and travel between cities can take longer than expected. For a two-week trip, limit yourself to 3-4 destinations at most. This gives you time to actually experience each place rather than just checking it off your list.</p>
      <p>Recommended first-timer route: Delhi → Agra → Jaipur (the Golden Triangle) with perhaps one additional destination like Varanasi or Udaipur.</p>
      
      <!-- More content here -->
    `
  },
  {
    id: 'hidden-gems-delhi',
    slug: 'hidden-gems-delhi',
    title: 'Hidden Gems in Delhi: Beyond the Tourist Trail',
    excerpt: 'Discover the lesser-known attractions and authentic experiences in Delhi that most tourists never find. Our local companions share their favorite hidden spots.',
    coverImage: '/images/NewDelhi.jpg',
    date: 'March 22, 2025',
    readTime: '6 min read',
    author: {
      name: 'Amit Verma',
      avatar: '/images/blog/authors/amit.jpg',
      role: 'Delhi Local Companion'
    },
    categories: ['Destinations', 'Local Experiences'],
    content: `
      <p>Delhi, India's capital territory, is a massive metropolitan area with a rich history spanning over millennia. While the city's famous monuments like the Red Fort, Qutub Minar, and India Gate are certainly worth visiting, there's a whole other side to Delhi that many tourists never experience.</p>
      
      <p>As local companions who have spent our lives exploring every nook and cranny of this diverse city, we're excited to share some of Delhi's best-kept secrets with you. These hidden gems will give you a deeper understanding of Delhi's culture, history, and daily life beyond the usual tourist trail.</p>
      
      <!-- More content here -->
    `
  },
  // More blog posts would be added here
  {
    id: 'authentic-india-local-companions',
    slug: 'authentic-india-local-companions',
    title: 'Authentic India: How Local Companions Transform Your Travel Experience',
    excerpt: 'Discover how traveling with local companions can transform your Indian journey from a typical tourist experience to an authentic cultural immersion.',
    coverImage: '/images/blog/featured-post.jpg',
    date: 'April 10, 2025',
    readTime: '12 min read',
    author: {
      name: 'Deepak Kumar',
      avatar: '/images/blog/authors/deepak.jpg',
      role: 'Cultural Expert & Founder'
    },
    categories: ['Cultural Insights', 'Local Experiences', 'Travel Philosophy'],
    content: `
      <p>India is a country that can simultaneously overwhelm and captivate. Its rich tapestry of cultures, languages, traditions, and landscapes offers endless possibilities for exploration. Yet many travelers return home feeling they've only scratched the surface—or worse, that they've seen India through a curated tourist lens without experiencing its authentic heart.</p>
      
      <p>This disconnect between tourist experiences and authentic immersion is what inspired the creation of Navigo. We believe that the true essence of India isn't found in checking monument boxes or following rigid itineraries—it's discovered through genuine human connections.</p>
      
      <!-- More content here -->
    `,
    featured: true
  },
  {
    id: 'india-safe-solo-female-travelers',
    slug: 'india-safe-solo-female-travelers',
    title: 'Is India Safe for Solo Female Travelers? My Journey',
    excerpt: "I've always believed that travel is the ultimate teacher — yet, as a solo female traveler, the question of safety can feel like a heavy weight on your mind.",
    coverImage: '/images/foriengerwithIndians.jpg',
    date: 'April 11, 2025',
    readTime: '5 min read',
    author: {
      name: 'Emma Wilson',
      avatar: '/images/blog/authors/emma.jpg',
      role: 'Travel Writer & Solo Traveler',
      bio: 'Emma is an experienced solo female traveler who has visited over 30 countries. She shares her authentic experiences to help other women travel confidently and safely.'
    },
    categories: ['Safety', 'Solo Travel', 'Travel Tips', 'Women Travelers'],
    content: `
      <p>I've always believed that travel is the ultimate teacher — yet, as a solo female traveler, the question of safety can feel like a heavy weight on your mind. Before setting off on my adventure across India, I spent countless hours reading reviews and hearing mixed stories about what to expect. The reality? India is as diverse as its landscapes, and safety varies widely from one city to the next. While some urban areas demand extra caution, many parts of the country are vibrant, welcoming, and surprisingly secure — especially if you know where to turn for local insights.</p>
    `
  },
  // Existing blog posts would follow...
  {
    id: 'essential-travel-tips-india',
    slug: 'essential-travel-tips-india',
    title: '10 Essential Travel Tips for First-Time Visitors to India',
    excerpt: 'Planning your first trip to India? Here are the essential tips every traveler should know before embarking on their journey to this vibrant and diverse country.',
    coverImage: '/images/Varanasi1.jpg',
    date: 'April 5, 2025',
    readTime: '8 min read',
    author: {
      name: 'Priya Sharma',
      avatar: '/images/blog/authors/priya.jpg',
      role: 'Local Companion & Travel Expert',
      bio: 'Priya is a certified tour guide from Delhi with over 8 years of experience showing travelers the authentic side of India. She specializes in cultural and historical tours.'
    },
    categories: ['Travel Tips', 'Cultural Insights'],
    content: `
      <p>India is a land of incredible diversity, vibrant colors, rich history, and warm hospitality. For first-time visitors, it can also be overwhelming with its bustling cities, unique customs, and sensory overload. As local companions who have helped hundreds of travelers navigate this beautiful chaos, we've compiled our top 10 essential tips to ensure your first trip to India is memorable for all the right reasons.</p>
      
      <!-- Content continues -->
    `
  },
  // Other blog posts...


]