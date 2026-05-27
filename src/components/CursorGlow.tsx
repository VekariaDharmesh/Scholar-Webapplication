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
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 transition-opacity duration-700 opacity-0 filter blur-[100px] bg-gradient-to-tr from-brand-amber/15 via-brand-navy/10 to-brand-green/5"
      style={{
        transform: 'translate3d(-400px, -400px, 0)',
        willChange: 'transform',
      }}
    />
  );
}
