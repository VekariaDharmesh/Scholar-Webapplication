'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Layers,
  Network,
  Clock
} from 'lucide-react';

interface Particle {
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
  type: 'binary' | 'star' | 'symbol' | 'dot';
  update(): void;
  draw(): void;
}

interface KnowledgeNode {
  id: string;
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  connections: string[];
}

export default function BackgroundSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [windowWidth, setWindowWidth] = useState(1200);

  // Framer Motion Springs for mouse parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  // Parallax transform layers
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 3000], [0, -220]);
  const ambientLightY = useTransform(scrollY, [0, 3000], [0, 120]);

  // Floating Elements mouse offset transforms
  const floatParallaxX = useTransform(springX, [-500, 500], [-35, 35]);
  const floatParallaxY = useTransform(springY, [-500, 500], [-35, 35]);

  useEffect(() => {
    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse move parallax trackers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Scale mouse position to range [-500, 500] for spring inputs
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      mouseX.set(e.clientX - halfWidth);
      mouseY.set(e.clientY - halfHeight);

      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Premium Canvas Network Loop
  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Curated Zen botanical focus color palette strings
    const colors = [
      'rgba(63, 108, 91, 0.14)',  // Sage Green
      'rgba(78, 124, 140, 0.12)',  // Slate Blue
      'rgba(212, 157, 106, 0.08)', // Caramel Amber
      'rgba(142, 124, 147, 0.08)', // Heather Lavender
    ];

    const mathSymbols = ['∫', 'Δ', 'ψ', 'e=mc²', '∞', 'λ', 'φ', 'π', 'δ', 'Σ', 'H₂O', 'd/dx', '√x', 'Ψ'];
    const binaryGlyphs = ['0', '1'];

    // Large floating cognitive outline nodes
    const knowledgeNodes: KnowledgeNode[] = [
      { id: 'kn1', name: 'Quantum Coherence', x: width * 0.15, y: height * 0.22, targetX: width * 0.15, targetY: height * 0.22, radius: 4, pulse: 0, pulseSpeed: 0.015, connections: ['kn2', 'kn4'] },
      { id: 'kn2', name: 'Organic Synthesis', x: width * 0.82, y: height * 0.18, targetX: width * 0.82, targetY: height * 0.18, radius: 5, pulse: Math.PI / 4, pulseSpeed: 0.012, connections: ['kn3'] },
      { id: 'kn3', name: 'Leitner System V', x: width * 0.88, y: height * 0.65, targetX: width * 0.88, targetY: height * 0.65, radius: 4, pulse: Math.PI / 2, pulseSpeed: 0.018, connections: ['kn2', 'kn5'] },
      { id: 'kn4', name: 'LTP Cascades', x: width * 0.12, y: height * 0.72, targetX: width * 0.12, targetY: height * 0.72, radius: 4.5, pulse: Math.PI / 3, pulseSpeed: 0.01, connections: ['kn1', 'kn5'] },
      { id: 'kn5', name: 'Consensus Check', x: width * 0.48, y: height * 0.85, targetX: width * 0.48, targetY: height * 0.85, radius: 5, pulse: Math.PI / 6, pulseSpeed: 0.014, connections: ['kn3', 'kn4'] },
    ];

    // Initialize interactive particles (Responsive count)
    const particleCount = Math.min(90, Math.floor((width * height) / 20000));
    const particles: Particle[] = [];

    class CanvasParticle implements Particle {
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
      type: 'binary' | 'star' | 'symbol' | 'dot';

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Super slow drifting velocity parameters
        this.vx = (Math.random() - 0.5) * 0.14;
        this.vy = (Math.random() - 0.5) * 0.14;
        this.radius = Math.random() * 1.5 + 0.6;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        const rand = Math.random();
        if (rand < 0.15) {
          this.type = 'symbol';
          this.symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
          this.symbolOpacity = Math.random() * 0.18 + 0.05;
        } else if (rand < 0.3) {
          this.type = 'binary';
          this.symbol = binaryGlyphs[Math.floor(Math.random() * binaryGlyphs.length)];
          this.symbolOpacity = Math.random() * 0.14 + 0.03;
        } else if (rand < 0.4) {
          this.type = 'star';
          this.symbol = null;
          this.symbolOpacity = 0;
          this.radius = Math.random() * 0.8 + 0.4;
        } else {
          this.type = 'dot';
          this.symbol = null;
          this.symbolOpacity = 0;
        }

        this.pulseSpeed = Math.random() * 0.008 + 0.003;
        this.pulseTime = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Slight drift toward cursor spotlight
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 280) {
          this.x += (dx / dist) * 0.05;
          this.y += (dy / dist) * 0.05;
        }

        // Screen boundary wrap
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.pulseTime += this.pulseSpeed;
      }

      draw() {
        if (!ctx) return;
        const alpha = Math.abs(Math.sin(this.pulseTime)) * 0.4 + 0.1;

        if (this.type === 'symbol' && this.symbol) {
          ctx.save();
          ctx.font = '8px monospace';
          ctx.fillStyle = `rgba(110, 120, 117, ${this.symbolOpacity * alpha})`;
          ctx.fillText(this.symbol, this.x, this.y);
          ctx.restore();
        } else if (this.type === 'binary' && this.symbol) {
          ctx.save();
          ctx.font = '7px monospace';
          ctx.fillStyle = `rgba(63, 108, 91, ${this.symbolOpacity * alpha})`;
          ctx.fillText(this.symbol, this.x, this.y);
          ctx.restore();
        } else if (this.type === 'star') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 157, 106, ${alpha * 0.25})`; // glowing amber star
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color.replace('0.1', (alpha * 0.6).toString());
          ctx.fill();
        }
      }
    }

    // Populate particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new CanvasParticle());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-align large Knowledge Nodes
      knowledgeNodes[0].targetX = width * 0.15;
      knowledgeNodes[0].targetY = height * 0.22;
      knowledgeNodes[1].targetX = width * 0.82;
      knowledgeNodes[1].targetY = height * 0.18;
      knowledgeNodes[2].targetX = width * 0.88;
      knowledgeNodes[2].targetY = height * 0.65;
      knowledgeNodes[3].targetX = width * 0.12;
      knowledgeNodes[3].targetY = height * 0.72;
      knowledgeNodes[5].targetX = width * 0.48;
      knowledgeNodes[5].targetY = height * 0.85;
    };
    window.addEventListener('resize', handleResize);

    // Main render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // 1. Draw Mouse Reactive Aura Spotlight
      const gradientSpotlight = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        10,
        mouseRef.current.x,
        mouseRef.current.y,
        380
      );
      gradientSpotlight.addColorStop(0, 'rgba(63, 108, 91, 0.045)');   // Sage
      gradientSpotlight.addColorStop(0.5, 'rgba(78, 124, 140, 0.02)');  // Slate Blue
      gradientSpotlight.addColorStop(1, 'rgba(252, 251, 249, 0)');     // Canvas fade
      ctx.fillStyle = gradientSpotlight;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 380, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw micro star-field / equations particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // 3. Update & Draw large floating Knowledge Nodes
      ctx.lineWidth = 0.5;
      knowledgeNodes.forEach((node) => {
        // Slow float orbital movement
        node.pulse += node.pulseSpeed;
        const driftX = Math.sin(node.pulse) * 12;
        const driftY = Math.cos(node.pulse) * 8;
        node.x = node.targetX + driftX;
        node.y = node.targetY + driftY;

        // Mouse displacement pull
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 260) {
          const factor = (1 - dist / 260) * 20;
          node.x -= (dx / dist) * factor;
          node.y -= (dy / dist) * factor;
        }

        // Draw node center glow
        const nodeAlpha = Math.abs(Math.sin(node.pulse)) * 0.35 + 0.35;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(63, 108, 91, ${nodeAlpha * 0.12})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#3f6c5b';
        ctx.fill();

        // Node label
        ctx.save();
        ctx.font = 'bold 8px monospace';
        ctx.fillStyle = `rgba(42, 48, 46, ${nodeAlpha * 0.5 + 0.3})`;
        ctx.fillText(node.name.toUpperCase(), node.x + 10, node.y + 3);
        ctx.restore();
      });

      // 4. Draw node connections
      ctx.strokeStyle = 'rgba(63, 108, 91, 0.05)';
      knowledgeNodes.forEach((node) => {
        node.connections.forEach((connId) => {
          const target = knowledgeNodes.find((n) => n.id === connId);
          if (target) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();

            // Energy spark flow pulses along target outline links
            if (Math.random() < 0.005) {
              ctx.save();
              const sparkGrad = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
              sparkGrad.addColorStop(0, 'rgba(63, 108, 91, 0)');
              sparkGrad.addColorStop(0.5, 'rgba(212, 157, 106, 0.6)'); // Amber spark
              sparkGrad.addColorStop(1, 'rgba(63, 108, 91, 0)');
              ctx.strokeStyle = sparkGrad;
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(target.x, target.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      // 5. Connect particles to nearby large nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        knowledgeNodes.forEach((node) => {
          const d = Math.hypot(p.x - node.x, p.y - node.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(78, 124, 140, ${(1 - d / 110) * 0.03})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none bg-[#FCFBF9]"
    >
      {/* LAYER 4: Ambient blurred gradient lights (curated low-opacity botanical glows) */}
      <motion.div 
        style={{ y: ambientLightY }}
        className="absolute inset-0 w-full h-full opacity-60"
      >
        <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#3f6c5b]/2.5 blur-[140px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#4e7c8c]/3 blur-[160px] animate-float-medium" />
        <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#d49d6a]/2 blur-[130px] animate-float-fast" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#8e7c93]/2 blur-[150px] animate-float-slow" />
      </motion.div>

      {/* LAYER 1: 3D Perspective Grid with smooth CSS rotations */}
      {!reduceMotion && (
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
        >
          <div className="absolute inset-0 bg-dot-matrix opacity-70" />
          <div 
            className="absolute inset-0 w-full h-[200vh] origin-top"
            style={{
              backgroundImage: `linear-gradient(#e8e5df 1px, transparent 1px), linear-gradient(90deg, #e8e5df 1px, transparent 1px)`,
              backgroundSize: '85px 85px',
              perspective: '1200px',
              transform: 'perspective(600px) rotateX(70deg) translateY(-22%)',
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

      {/* FLOATING UI ELEMENTS: Glassmorphic interactive labels in empty space */}
      {windowWidth > 1200 && !reduceMotion && (
        <div className="absolute inset-0 w-full h-full z-10 overflow-hidden pointer-events-none">
          
          {/* Badge 1: Spaced Repetition (Left margin) */}
          <motion.div
            style={{ x: floatParallaxX, y: floatParallaxY }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[3%] top-[25%] p-3.5 rounded-2xl glass-panel border border-card-border bg-[#FFFFFF]/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex items-center gap-2.5 max-w-[210px] pointer-events-auto cursor-default hover:scale-[1.03] transition-transform select-none"
          >
            <div className="p-1.5 rounded-lg bg-brand-green/10 text-brand-green">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] text-muted-slate font-mono uppercase block leading-none">Repetition OS</span>
              <span className="text-[10px] font-bold text-primary-charcoal mt-1 block">Leitner System V Active</span>
            </div>
          </motion.div>

          {/* Badge 2: Neural Indexer (Right margin) */}
          <motion.div
            style={{ x: floatParallaxX, y: floatParallaxY }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[4%] top-[32%] p-3.5 rounded-2xl glass-panel border border-card-border bg-[#FFFFFF]/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex items-center gap-2.5 max-w-[220px] pointer-events-auto cursor-default hover:scale-[1.03] transition-transform select-none"
          >
            <div className="p-1.5 rounded-lg bg-brand-blue/10 text-brand-blue">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] text-muted-slate font-mono uppercase block leading-none">Course Index</span>
              <span className="text-[10px] font-bold text-primary-charcoal mt-1 block">Physics & Bio Outlines Synced</span>
            </div>
          </motion.div>

          {/* Badge 3: Speech Recognition (Left margin bottom) */}
          <motion.div
            style={{ x: floatParallaxX, y: floatParallaxY }}
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute left-[2.5%] top-[65%] p-3.5 rounded-2xl glass-panel border border-card-border bg-[#FFFFFF]/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex items-center gap-2.5 max-w-[200px] pointer-events-auto cursor-default hover:scale-[1.03] transition-transform select-none"
          >
            <div className="p-1.5 rounded-lg bg-brand-amber/10 text-brand-amber">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] text-muted-slate font-mono uppercase block leading-none">Synthesis</span>
              <span className="text-[10px] font-bold text-primary-charcoal mt-1 block">Speech-to-Notes Compiler</span>
            </div>
          </motion.div>

          {/* Badge 4: Exam Readiness timer (Right margin bottom) */}
          <motion.div
            style={{ x: floatParallaxX, y: floatParallaxY }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute right-[3%] top-[72%] p-3.5 rounded-2xl glass-panel border border-card-border bg-[#FFFFFF]/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex items-center gap-2.5 max-w-[200px] pointer-events-auto cursor-default hover:scale-[1.03] transition-transform select-none"
          >
            <div className="p-1.5 rounded-lg bg-brand-purple/10 text-brand-purple">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] text-muted-slate font-mono uppercase block leading-none">Countdown</span>
              <span className="text-[10px] font-bold text-primary-charcoal mt-1 block">Readiness Matrix Calibrated</span>
            </div>
          </motion.div>

        </div>
      )}

      {/* Sweep Scanner line animation */}
      <div 
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#3f6c5b]/8 to-transparent pointer-events-none animate-scan-slow"
        style={{
          animation: 'scan-slow 18s linear infinite',
        }}
      />
    </div>
  );
}
