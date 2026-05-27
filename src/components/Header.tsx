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
            ? 'bg-[#ffffff]/85 backdrop-blur-md border-[#e5e7eb] shadow-[0_8px_32px_rgba(0,0,0,0.04)]' 
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-8.5 h-8.5 rounded-lg bg-[#6366F1] flex items-center justify-center shadow-sm group-hover:bg-[#6366F1]/90 transition-all">
            <GraduationCap className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-xs tracking-tight text-[#1a2421] group-hover:text-black transition-colors font-mono uppercase">
            Scholar<span className="text-[#6366F1] font-bold">OS</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-widest text-[#5c6865] hover:text-[#1a2421] transition-all font-mono"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Search / Command Palette Trigger */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/5 text-[10px] text-[#5c6865]/60 font-mono w-44 cursor-pointer hover:bg-black/8 hover:border-black/10 transition-all select-none">
          <Search className="w-3 h-3 text-[#5c6865]/40" />
          <span className="flex-1">Search topics...</span>
          <kbd className="bg-black/10 px-1 py-0.2 rounded text-[8px] text-[#5c6865]/80">⌘K</kbd>
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
            className="relative inline-flex items-center gap-1 px-4 py-2 rounded-full text-[10px] font-bold font-mono text-white bg-[#6366F1] hover:bg-[#6366F1]/90 border border-white/10 hover:border-white/20 shadow-sm hover:shadow transition-all duration-200"
          >
            <span>Launch Console</span>
            <Sparkles className="w-3 h-3 text-brand-amber animate-pulse" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-black/5 text-[#5c6865] hover:text-[#1a2421] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-[#ffffff]/95 backdrop-blur-lg border border-[#e5e7eb] py-5 px-6 flex flex-col gap-4 rounded-2xl animate-reveal md:hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold uppercase tracking-wider text-[#5c6865] hover:text-[#1a2421] transition-colors py-1.5 font-mono"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-4">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-[9px] font-mono text-brand-green">
              <span className="w-1 h-1 rounded-full bg-brand-green" />
              <span>AI ACTIVE</span>
            </div>
            <a
              href="#final-cta"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold font-mono bg-[#6366F1] hover:bg-[#6366F1]/90 text-white shadow-sm transition-all"
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
