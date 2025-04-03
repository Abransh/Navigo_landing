"use client";

import React from 'react';
import { useMobile } from '@/hooks/use-mobile';
import InteractiveMapMobile from '@/components/MobileSections/InteractiveMapMobile';
import InteractiveMapDesktop from './InteractiveMapDesktop';

const InteractiveMapSection: React.FC = () => {
  const isMobile = useMobile();

  return isMobile ? <InteractiveMapMobile /> : <InteractiveMapDesktop />;
};

export default InteractiveMapSection;