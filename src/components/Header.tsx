'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Sparkles, Search } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Live Preview', href: '#live-preview' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 px-4 sm:px-6'
          : 'py-5 px-4 sm:px-6'
      }`}
    >
      <div 
        className={`max-w-6xl mx-auto px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300 flex items-center justify-between ${
          scrolled 
            ? 'bg-[#0f0f12]/60 backdrop-blur-md border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center shadow-sm group-hover:bg-brand-purple/80 transition-all">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-xs tracking-tight text-white group-hover:text-white/80 transition-colors font-mono uppercase">
            Scholar<span className="text-brand-purple font-bold">OS</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-all font-mono"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Search / Command Palette Trigger */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-white/40 font-mono w-44 cursor-pointer hover:bg-white/10 hover:border-white/10 transition-all select-none">
          <Search className="w-3 h-3 text-white/30" />
          <span className="flex-1">Search topics...</span>
          <kbd className="bg-white/10 px-1 py-0.2 rounded text-[8px] text-white/50">⌘K</kbd>
        </div>

        {/* Action Button & Status Pill */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-[9px] font-bold font-mono text-brand-green">
            <span className="w-1 h-1 rounded-full bg-brand-green animate-pulse" />
            <span>AI OS: SYNCED</span>
          </div>

          <a
            href="#final-cta"
            className="relative inline-flex items-center gap-1 px-4 py-2 rounded-full text-[10px] font-bold font-mono text-white bg-brand-purple hover:bg-brand-purple/90 border border-white/10 hover:border-white/20 shadow-sm hover:shadow transition-all duration-200"
          >
            <span>Launch Console</span>
            <Sparkles className="w-3 h-3 text-brand-amber animate-pulse" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-[#0c0c0e]/95 backdrop-blur-lg border border-white/5 py-5 px-6 flex flex-col gap-4 rounded-2xl animate-reveal md:hidden shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors py-1.5 font-mono"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-[9px] font-mono text-brand-green">
              <span className="w-1 h-1 rounded-full bg-brand-green" />
              <span>AI ACTIVE</span>
            </div>
            <a
              href="#final-cta"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold font-mono bg-brand-purple hover:bg-brand-purple/90 text-white shadow-sm transition-all"
            >
              <span>Launch Console</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
