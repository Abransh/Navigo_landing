import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeatureBoxes from '@/components/sections/FeatureBoxes';
import HowItWorksSection from '@/components/sections/HowItWorksSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-sand">
      <Navbar />
      <HeroSection />
      <div className="bg-white py-10">
        {/* Decorative element - inspired by Indian designs */}
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center">
            <div className="w-full h-px bg-border"></div>
            <div className="px-4">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                <circle cx="20" cy="20" r="15" fill="none" stroke="#BE5504" strokeWidth="1" />
                <circle cx="20" cy="20" r="10" fill="none" stroke="#BE5504" strokeWidth="1" />
                <circle cx="20" cy="20" r="5" fill="none" stroke="#BE5504" strokeWidth="1" />
                <path d="M10,20 L30,20 M20,10 L20,30" stroke="#BE5504" strokeWidth="1" />
              </svg>
            </div>
            <div className="w-full h-px bg-border"></div>
          </div>
        </div>
      </div>
      <FeatureBoxes />
      {/* Decorative wave pattern - inspired by Indian textile designs */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <svg viewBox="0 0 1200 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C50,40 100,0 150,20 C200,40 250,0 300,20 C350,40 400,0 450,20 C500,40 550,0 600,20 C650,40 700,0 750,20 C800,40 850,0 900,20 C950,40 1000,0 1050,20 C1100,40 1150,0 1200,20" 
              fill="none" stroke="#FF9933" strokeWidth="1" opacity="0.3" />
            <path d="M0,20 C50,0 100,40 150,20 C200,0 250,40 300,20 C350,0 400,40 450,20 C500,0 550,40 600,20 C650,0 700,40 750,20 C800,0 850,40 900,20 C950,0 1000,40 1050,20 C1100,0 1150,40 1200,20" 
              fill="none" stroke="#1A5F7A" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>
      </div>
      <HowItWorksSection />
      {/* Add more sections as they're developed */}
    </main>
  );
}