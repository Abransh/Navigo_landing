import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeatureBoxes from '@/components/sections/FeatureBoxes';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureBoxes />
      {/* Add more sections as they're developed */}
    </main>
  );
}