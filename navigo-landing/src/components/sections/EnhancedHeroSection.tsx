"use client";

import React from 'react';
import { useMobile } from '@/hooks/use-mobile';
import HeroSectionDesktop from '@/components/sections/HeroSectionDesktop';
import HeroSectionMobile from '@/components/MobileSections/HeroSectionMobile';

const HeroSection: React.FC = () => {
  const isMobile = useMobile();
  
  return isMobile ? <HeroSectionMobile /> : <HeroSectionDesktop />;
};

export default HeroSection;