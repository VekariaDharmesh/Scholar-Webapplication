'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  Sparkles, 
  Play, 
  Network,
  Lock
} from 'lucide-react';

export default function DemoSlides() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [simState, setSimState] = useState<'idle' | 'running' | 'complete'>('idle');
  const [progressVal, setProgressVal] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFileName, setDroppedFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        setDroppedFileName(file.name);
        setSimState('running');
        setTimeout(() => {
          setSimState('complete');
        }, 2500);
      } else {
        alert("Please select a valid PDF syllabus file.");
      }
    }
  };

  const slides = [
    {
      id: 0,
      title: "1. Syllabus Upload",
      short: "Upload",
      headline: "Index every topic automatically.",
      desc: "Drop in your course syllabus PDF once. Within seconds, ScholarWeb dissects the chapters, reads the exam dates, and builds your visual study index."
    },
    {
      id: 1,
      title: "2. Browser Extension Overlay",
      short: "Browser extension",
      headline: "Browse Wikipedia normally. Spot contradictions.",
      desc: "Open any webpage. The sidebar extension instantly flags which exam topics match that article, calculates the exact weight, and warns you if standard grading guides differ from web claims."
    },
    {
      id: 2,
      title: "3. Visual Syllabus Progress",
      short: "Progress Graph",
      headline: "See your progress fill in visually.",
      desc: "Watch concepts connect in real-time as you study. Weak spots show up clearly in amber so you know exactly what to revise before the countdown ends."
    }
  ];

  // Automated Simulation timer for Slide 3 progress bar
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeSlide === 2 && simState === 'running') {
      timer = setInterval(() => {
        setProgressVal((prev) => {
          if (prev >= 88) {
            setSimState('complete');
            clearInterval(timer);
            return 88;
          }
          return prev + 1;
        });
      }, 80);
    } else if (activeSlide !== 2) {
      setSimState('idle');
      setProgressVal(45);
    }
    return () => clearInterval(timer);
  }, [activeSlide, simState]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        setDroppedFileName(file.name);
        setSimState('running');
        setTimeout(() => {
          setSimState('complete');
        }, 2500);
      } else {
        alert("Please drop a valid PDF syllabus file.");
      }
    }
  };

  const triggerSimulation = () => {
    if (activeSlide === 0) {
      setDroppedFileName(null);
      setSimState('running');
      setTimeout(() => setSimState('complete'), 2500);
    } else if (activeSlide === 1) {
      setSimState('running');
      setTimeout(() => setSimState('complete'), 2000);
    } else if (activeSlide === 2) {
      setProgressVal(45);
      setSimState('running');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4">
      {/* 3-Tab Slide Selector */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#0f0f13]/80 border border-white/5 rounded-full mb-8 max-w-lg mx-auto shadow-lg backdrop-blur-md">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => {
              setActiveSlide(idx);
              setSimState('idle');
              setProgressVal(45);
            }}
            className={`py-2.5 px-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all ${
              activeSlide === idx 
                ? 'bg-brand-purple text-white shadow-[0_0_12px_rgba(99,102,241,0.2)]' 
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            {slide.short}
          </button>
        ))}
      </div>

      {/* Main Slide Card Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 lg:p-10 border border-white/5 bg-[#0d0d10]/90 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* LEFT COLUMN: Narrative & Copy (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider bg-brand-purple/10 border border-brand-purple/20 text-brand-purple">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Interactive Guide</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-[9px] font-bold uppercase text-brand-purple tracking-widest font-mono">
              {slides[activeSlide].title}
            </h3>
            <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-tight">
              {slides[activeSlide].headline}
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
              {slides[activeSlide].desc}
            </p>
          </div>

          {/* Action Trigger inside Demo */}
          <div className="pt-2">
            <button
              onClick={triggerSimulation}
              disabled={simState === 'running'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold font-mono bg-brand-purple hover:bg-brand-purple/80 text-white shadow-[0_4px_16px_rgba(99,102,241,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-3 h-3 fill-white text-white" />
              <span>
                {simState === 'idle' && "Run Simulation"}
                {simState === 'running' && "Processing..."}
                {simState === 'complete' && "Success"}
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Minimalist Visual Sandbox (Col span 7) */}
        <div 
          onDragOver={activeSlide === 0 && simState === 'idle' ? handleDragOver : undefined}
          onDragLeave={activeSlide === 0 && simState === 'idle' ? handleDragLeave : undefined}
          onDrop={activeSlide === 0 && simState === 'idle' ? handleDrop : undefined}
          className={`lg:col-span-7 h-[360px] w-full rounded-xl border overflow-hidden flex items-center justify-center relative shadow-inner transition-all duration-300 ${
            isDragging && activeSlide === 0 && simState === 'idle'
              ? 'border-brand-purple bg-brand-purple/5'
              : 'border-white/5 bg-[#08080a]/60'
          }`}
        >
          <div className="absolute inset-0 bg-dot-matrix opacity-20" />

          <AnimatePresence mode="wait">
            
            {/* VISUAL 1: SYLLABUS UPLOAD */}
            {activeSlide === 0 && (
              <motion.div
                key="upload-sim"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md p-6 space-y-6"
              >
                {simState === 'idle' && (
                  <div 
                    onClick={handleCardClick}
                    className={`border border-dashed rounded-xl p-8 text-center bg-white/2 flex flex-col items-center gap-3 shadow-sm transition-all duration-200 cursor-pointer ${
                      isDragging 
                        ? 'border-brand-purple bg-brand-purple/10 scale-[1.02]' 
                        : 'border-white/10 hover:border-brand-purple/40 hover:bg-white/5'
                    }`}
                  >
                    {/* Hidden Native File Input */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileSelect} 
                      className="hidden" 
                      accept="application/pdf" 
                    />
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200 ${
                      isDragging 
                        ? 'bg-brand-purple border-brand-purple text-white shadow-[0_0_12px_rgba(99,102,241,0.2)]' 
                        : 'bg-white/5 border-white/10 text-white/60'
                    }`}>
                      <UploadCloud className={`w-6 h-6 ${isDragging ? 'text-white' : 'text-brand-purple'}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/80">
                        {isDragging ? "Drop your PDF now!" : "Click to select or drop syllabus PDF"}
                      </p>
                      <p className="text-[10px] text-white/40 mt-1 font-mono">
                        Physics_Curriculum_2026.pdf (1.8MB)
                      </p>
                    </div>
                  </div>
                )}

                {simState === 'running' && (
                  <div className="space-y-4 text-center">
                    <div className="relative w-12 h-12 mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-purple/10" />
                      <div className="absolute inset-0 rounded-full border-2 border-t-brand-purple animate-spin" />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-mono text-brand-purple">
                        {droppedFileName ? `INDEXING ${droppedFileName.toUpperCase()}...` : "INDEXING SYLLABUS TOPICS..."}
                      </p>
                      <p className="text-[10px] text-white/40 mt-1 font-mono">Mapping chapters, exam keys, and weights</p>
                    </div>
                  </div>
                )}

                {simState === 'complete' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <span className="text-[9px] font-bold font-mono text-brand-green uppercase tracking-wider block text-center truncate max-w-xs mx-auto">
                      🧬 {droppedFileName ? droppedFileName.toUpperCase() : "SYLLABUS"} SUCCESSFULLY INDEXED
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex flex-col justify-between shadow-sm">
                        <span className="text-[9px] text-white/40 block font-mono">UNIT A</span>
                        <span className="text-xs font-bold text-white/80">Quantum Mech. Basics</span>
                        <span className="text-[10px] text-brand-purple font-mono font-bold mt-1">32% Exam Weight</span>
                      </div>
                      <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex flex-col justify-between shadow-sm">
                        <span className="text-[9px] text-white/40 block font-mono">UNIT B</span>
                        <span className="text-xs font-bold text-white/80">Electromagnetic Induction</span>
                        <span className="text-[10px] text-brand-purple font-mono font-bold mt-1">28% Exam Weight</span>
                      </div>
                      <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex flex-col justify-between shadow-sm">
                        <span className="text-[9px] text-white/40 block font-mono">UNIT C</span>
                        <span className="text-xs font-bold text-white/80">Thermal Dynamics</span>
                        <span className="text-[10px] text-brand-green font-mono font-bold mt-1">20% Exam Weight</span>
                      </div>
                      <div className="p-3 bg-white/2 border border-white/5 rounded-lg flex flex-col justify-between shadow-sm">
                        <span className="text-[9px] text-white/40 block font-mono">UNIT D</span>
                        <span className="text-xs font-bold text-white/80">Relativity Postulates</span>
                        <span className="text-[10px] text-white/55 font-mono font-bold mt-1">15% Exam Weight</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* VISUAL 2: WEB OVERLAY SIDEBAR */}
            {activeSlide === 1 && (
              <motion.div
                key="web-sim"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch overflow-y-auto sm:overflow-visible"
              >
                {/* Left side: Wikipedia simulation */}
                <div className="flex-1 rounded-lg border border-white/5 bg-[#0a0a0d] p-3 space-y-2 select-none relative overflow-hidden shadow-sm">
                  <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400/20" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/20" />
                    <div className="w-2 h-2 rounded-full bg-green-400/20" />
                    <div className="bg-white/3 text-[9px] font-mono px-2 py-0.5 border border-white/5 rounded text-white/40 flex-1 truncate">
                      wikipedia.org/wiki/Quantum_entanglement
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white">Quantum Entanglement</h4>
                  <p className="text-[10px] text-white/60 font-serif leading-relaxed">
                    ...Quantum entanglement is a physical phenomenon that occurs when a pair of particles are generated, interact, or share spatial proximity. 
                    <span className={`px-1 rounded transition-colors duration-500 ${simState === 'running' || simState === 'complete' ? 'bg-brand-purple/20 text-white font-semibold border-b border-brand-purple/30' : ''}`}>
                      {" "}This state violates the classical local realism criteria...
                    </span>
                  </p>
                </div>

                {/* Right side: Floating ScholarWeb Sidebar */}
                <div className="w-full sm:w-56 rounded-lg border border-brand-purple/20 bg-brand-purple/5 p-3 flex flex-col justify-between relative shadow-sm shrink-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                      <span className="text-[9px] font-bold font-mono text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse" />
                        Syllabus Console
                      </span>
                    </div>

                    {simState === 'idle' && (
                      <div className="h-40 flex flex-col items-center justify-center text-center text-[10px] text-white/40 gap-2">
                        <Lock className="w-4 h-4 text-white/30" />
                        <span>Ready to analyze.</span>
                      </div>
                    )}

                    {(simState === 'running' || simState === 'complete') && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <div className="p-2 rounded bg-[#0a0a0d] border border-white/5">
                          <span className="text-[8px] text-white/40 block font-mono">SYLLABUS MATCH</span>
                          <span className="text-[10px] font-bold text-white block mt-0.5">Topic 6: Quantum Coherence</span>
                          <span className="text-[9px] text-brand-purple font-mono font-bold block mt-0.5">⭐ 25% Exam Weight</span>
                        </div>

                        <div className="p-2 rounded border border-red-500/20 bg-red-500/5 text-red-400 space-y-1">
                          <span className="text-[8px] text-red-400 font-bold font-mono flex items-center gap-1">
                            ⚠️ 1 WARNING FLAG
                          </span>
                          <p className="text-[8.5px] text-white/55 leading-normal">
                            Exam key expects "Copenhagen Interpretation" rather than the "Many-Worlds" theory.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="text-[9px] text-white/30 font-mono text-center pt-2 border-t border-white/5">
                    Consensus Safeguard is active
                  </div>
                </div>
              </motion.div>
            )}

            {/* VISUAL 3: LIVE GROWTH SESSION */}
            {activeSlide === 2 && (
              <motion.div
                key="growth-sim"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg p-6 space-y-6 flex flex-col justify-between h-full"
              >
                {/* Stats Panel */}
                <div className="flex items-center justify-between bg-[#0a0a0d] p-3 rounded-lg border border-white/5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-brand-purple/10 border border-brand-purple/20">
                      <Network className="w-4 h-4 text-brand-purple" />
                    </div>
                    <div>
                      <span className="text-[8px] text-white/40 uppercase block font-mono">Course Index Mapping</span>
                      <span className="text-xs font-bold text-white/80">Quantum Physics Syllabus</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-white/40 uppercase block font-mono font-medium">Exam Readiness</span>
                    <span className="text-sm font-bold text-brand-green font-mono">{progressVal}%</span>
                  </div>
                </div>

                {/* Simulated Graph Workspace */}
                <div className="relative flex-1 border border-white/5 bg-[#0a0a0d] rounded-xl overflow-hidden h-40 shadow-inner">
                  <div className="absolute inset-0 bg-dot-matrix opacity-10" />

                  {/* SVG paths dynamically colored by progress */}
                  <svg className="w-full h-full absolute inset-0">
                    <line x1="20%" y1="30%" x2="50%" y2="20%" stroke={progressVal > 50 ? "#10b981" : "#1f1f29"} strokeWidth="1.5" strokeDasharray={progressVal > 50 ? "0" : "3 3"} className="transition-all duration-300" />
                    <line x1="50%" y1="20%" x2="80%" y2="35%" stroke={progressVal > 70 ? "#10b981" : "#1f1f29"} strokeWidth="1.5" className="transition-all duration-300" />
                    <line x1="20%" y1="30%" x2="40%" y2="80%" stroke={progressVal > 60 ? "#10b981" : "#1f1f29"} strokeWidth="1.5" />
                    <line x1="40%" y1="80%" x2="70%" y2="75%" stroke={progressVal > 80 ? "#10b981" : "#1f1f29"} strokeWidth="1.5" />
                  </svg>

                  {/* Nodes */}
                  <div className="absolute w-5 h-5 rounded-full border border-brand-green bg-brand-green/20 flex items-center justify-center text-[8px] text-brand-green font-extrabold shadow-sm" style={{ left: '20%', top: '30%' }}>Q1</div>
                  <div className={`absolute w-5 h-5 rounded-full border flex items-center justify-center text-[8px] font-extrabold shadow-sm transition-all duration-500 ${
                    progressVal > 50 
                      ? 'border-brand-green bg-brand-green/20 text-brand-green' 
                      : 'border-white/10 bg-white/5 text-white/30'
                  }`} style={{ left: '50%', top: '20%' }}>Q2</div>
                  <div className={`absolute w-5 h-5 rounded-full border flex items-center justify-center text-[8px] font-extrabold shadow-sm transition-all duration-500 ${
                    progressVal > 70 
                      ? 'border-brand-green bg-brand-green/20 text-brand-green' 
                      : 'border-white/10 bg-white/5 text-white/30'
                  }`} style={{ left: '80%', top: '35%' }}>Q3</div>
                  <div className={`absolute w-5 h-5 rounded-full border flex items-center justify-center text-[8px] font-extrabold shadow-sm transition-all duration-500 ${
                    progressVal > 60 
                      ? 'border-brand-green bg-brand-green/20 text-brand-green' 
                      : 'border-brand-amber bg-brand-amber/15 text-brand-amber animate-pulse'
                  }`} style={{ left: '40%', top: '80%' }}>Q4</div>
                  <div className={`absolute w-5 h-5 rounded-full border flex items-center justify-center text-[8px] font-extrabold shadow-sm transition-all duration-500 ${
                    progressVal > 80 
                      ? 'border-brand-green bg-brand-green/20 text-brand-green' 
                      : 'border-white/10 bg-white/5 text-white/30'
                  }`} style={{ left: '70%', top: '75%' }}>Q5</div>

                  {/* Loading/Pulsing Alert */}
                  {simState === 'running' && (
                    <div className="absolute top-2 right-2 bg-brand-purple/20 text-brand-purple border border-brand-purple/20 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse font-bold">
                      Syncing study matrix...
                    </div>
                  )}

                  {simState === 'complete' && (
                    <div className="absolute top-2 right-2 bg-brand-green/20 text-brand-green border border-brand-green/20 text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 font-bold">
                      Matrix Synced
                    </div>
                  )}
                </div>

                {/* Progress bar and control triggers */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-white/40 font-mono">
                    <span>Readiness progress: {progressVal > 60 ? "4" : "1"} / 5 Pillars Done</span>
                    <span className="font-bold text-white/70">{Math.round((progressVal/100)*100)}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-purple rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: `${progressVal}%` }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
