// src/app/layout.tsx
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${inter.variable} font-body antialiased bg-sand text-navy`}
      >
        {children}
      </body>
    </html>
  );
}