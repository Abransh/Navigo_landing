// src/app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import React from 'react';

// Load Montserrat font (for headlines and titles)
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

// Load Inter font (for body text and longer content)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500']
});

export const metadata: Metadata = {
  title: "Navigo - Your Local Travel Companion in India",
  description: "Experience India like a local with Navigo's verified travel companions. Get personalized guidance, cultural insights, and authentic experiences.",
  icons: {
    icon: '/Favicon.png',
    apple: '/Favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} font-body antialiased bg-sand text-navy`}>
      <head>
        <link rel="icon" href="/Favicon.png" />
        <link rel="apple-touch-icon" href="/Favicon.png" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HQHJ5XL5EJ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HQHJ5XL5EJ');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}