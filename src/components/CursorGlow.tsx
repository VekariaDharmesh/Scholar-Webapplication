'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      // Translate the glow element centered at the mouse coordinates
      // 200px is half of the 400px width/height of the glow card
      glowRef.current.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      glowRef.current.style.opacity = '0.15';
    };

    const handleMouseLeave = () => {
      if (!glowRef.current) return;
      glowRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-0 transition-opacity duration-700 opacity-0 filter blur-[120px] bg-gradient-to-tr from-[#3f6c5b]/6 via-[#d49d6a]/4 to-transparent"
      style={{
        transform: 'translate3d(-450px, -450px, 0)',
        willChange: 'transform',
      }}
    />
  );
}
