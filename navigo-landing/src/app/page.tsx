import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      {/* Add more sections as they're developed */}
    </main>
  );
}