
// src/app/blog/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Navigo Blog - Travel Tips & India Cultural Insights',
  description: 'Discover travel tips, cultural insights, and local experiences in India. Read our blog for authentic travel advice from local companions.',
  keywords: ['India travel', 'travel blog', 'cultural insights', 'local companions', 'travel tips', 'India tourism'],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}