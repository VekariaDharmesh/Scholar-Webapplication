'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [scrollYPosition, setScrollYPosition] = useState(0);

  // Parallax / Scroll hooks for depth layers
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 3000], [0, -150]);
  const ambientLightY = useTransform(scrollY, [0, 3000], [0, 100]);

  useEffect(() => {
    // Detect low performance/reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handleScroll = () => {
      setScrollYPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Neural Connection Canvas Particle System
  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count
    const particleCount = Math.min(60, Math.floor((width * height) / 28000));
    const particles: Particle[] = [];

    // Botanical Zen Focus colors
    const colors = [
      'rgba(63, 108, 91, 0.15)',  // Sage Green
      'rgba(78, 124, 140, 0.12)',  // Slate Blue
      'rgba(212, 157, 106, 0.10)', // Caramel Amber
      'rgba(142, 124, 147, 0.10)', // Heather Lavender
    ];

    // Mathematical micro-symbols
    const symbols = ['∫', 'Δ', 'ψ', 'e=mc²', '∞', 'λ', 'φ', 'π', 'δ', 'Σ', 'H₂O', 'd/dx'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      symbol: string | null;
      symbolOpacity: number;
      pulseSpeed: number;
      pulseTime: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Super slow organic drifting velocities
        this.vx = (Math.random() - 0.5) * 0.18;
        this.vy = (Math.random() - 0.5) * 0.18;
        this.radius = Math.random() * 1.5 + 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // 25% chance of being a mathematical symbol instead of a plain dot
        this.symbol = Math.random() < 0.25 ? symbols[Math.floor(Math.random() * symbols.length)] : null;
        this.symbolOpacity = Math.random() * 0.25 + 0.08;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulseTime = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Slight drift towards cursor (gravitational magnetic pull)
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 320) {
          this.x += (dx / dist) * 0.08;
          this.y += (dy / dist) * 0.08;
        }

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.pulseTime += this.pulseSpeed;
      }

      draw() {
        if (!ctx) return;

        // Breathes subtly in opacity
        const alpha = Math.abs(Math.sin(this.pulseTime)) * 0.35 + 0.15;

        if (this.symbol) {
          ctx.save();
          ctx.font = '9px monospace';
          ctx.fillStyle = `rgba(110, 120, 117, ${this.symbolOpacity * alpha})`;
          ctx.fillText(this.symbol, this.x, this.y);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color.replace('0.1', alpha.toString());
          ctx.fill();
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement inside canvas coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping/interpolation for spotlight tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Draw connection vectors (knowledge graph lines)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          // Close particles connect organically
          if (dist < 130) {
            const lineOpacity = (1 - dist / 130) * 0.06;
            ctx.strokeStyle = `rgba(99, 108, 91, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Energy stream flow pulses along connection paths
            if (dist < 90 && Math.random() < 0.0015) {
              ctx.save();
              const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              gradient.addColorStop(0, 'rgba(63, 108, 91, 0)');
              gradient.addColorStop(0.5, 'rgba(212, 157, 106, 0.4)'); // Caramel sand spark
              gradient.addColorStop(1, 'rgba(63, 108, 91, 0)');
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.2;
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none bg-[#FCFBF9]"
    >
      {/* LAYER 4: Ambient blurred gradient lights (very dark, slow moving, extremely soft) */}
      <motion.div 
        style={{ y: ambientLightY }}
        className="absolute inset-0 w-full h-full opacity-60"
      >
        <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#3f6c5b]/3 blur-[140px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#4e7c8c]/3 blur-[160px] animate-float-medium" />
        <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#d49d6a]/2 blur-[130px] animate-float-fast" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#8e7c93]/2.5 blur-[150px] animate-float-slow" />
      </motion.div>

      {/* LAYER 1: 3D Perspective Grid with smooth CSS keyframes */}
      {!reduceMotion && (
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        >
          <div className="absolute inset-0 bg-dot-matrix opacity-70" />
          <div 
            className="absolute inset-0 w-full h-[200vh] origin-top"
            style={{
              backgroundImage: `linear-gradient(#e8e5df 1px, transparent 1px), linear-gradient(90deg, #e8e5df 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              perspective: '1000px',
              transform: 'perspective(600px) rotateX(68deg) translateY(-20%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
            }}
          />
        </motion.div>
      )}

      {/* LAYER 2 & 3: Floating Neural Graph & Connection Canvas */}
      {!reduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
        />
      )}

      {/* Hero-specific subtle scan line animation */}
      <div 
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#3f6c5b]/10 to-transparent pointer-events-none animate-scan-slow"
        style={{
          animation: 'scan-slow 16s linear infinite',
        }}
      />

      {/* Custom Styles for Keyframe Grid movements */}
      <style jsx global>{`
        @keyframes scan-slow {
          0% { transform: translateY(-10%); }
          100% { transform: translateY(110%); }
        }
      `}</style>
    </div>
  );
}
