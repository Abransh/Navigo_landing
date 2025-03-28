import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeatureBoxes from '@/components/sections/FeatureBoxes';
import HowItWorksSection from '@/components/sections/HowItWorksSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureBoxes />
      <HowItWorksSection />
      {/* Add more sections as they're developed */}
    </main>
  );
}