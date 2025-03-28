// src/hooks/use-mobile.ts
"use client"

import { useState, useEffect } from 'react'

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Initial check
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
    
    function checkIfMobile() {
      setIsMobile(window.innerWidth < breakpoint)
    }
  }, [breakpoint])

  return isMobile
}