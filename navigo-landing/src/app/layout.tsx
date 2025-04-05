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
  title: "Navigo - Travel Like a Local in India",
  description: "Connect with trusted local companions who help you navigate language barriers, avoid scams, and discover authentic cultural experiences in India.",
  icons: {
    icon: '/images/logonew1.svg',
    apple: '/images/logonew1.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logonew1.svg" />
        <link rel="apple-touch-icon" href="/images/logonew1.svg" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} font-body antialiased bg-sand text-navy`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}