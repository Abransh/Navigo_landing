// src/app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import React from 'react';
import Script from 'next/script';

// Load Montserrat font (for headlines and titles)
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  preload: true,
});

// Load Inter font (for body text and longer content)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "Navigo - Your Local Travel Companion in India",
  description: "Connect with trusted local companions who help you navigate unfamiliar territories, overcome language barriers, and discover authentic cultural experiences.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link rel="preload" href="/images/india-pattern-bg.svg" as="image" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/TextPlugin.min.js" strategy="beforeInteractive" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
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
      <body className="font-body antialiased bg-sand text-navy">
        {/* Protect from FOUC (Flash of Unstyled Content) */}
        <Script id="prevent-fouc" strategy="beforeInteractive">
          {`
            // Add a class to prevent transition animations on page load
            document.documentElement.classList.add('is-loading');
            
            // Remove the class after page has loaded
            window.addEventListener('load', () => {
              document.documentElement.classList.remove('is-loading');
            });
          `}
        </Script>

        {children}
        <Analytics />
      </body>
    </html>
  );
}