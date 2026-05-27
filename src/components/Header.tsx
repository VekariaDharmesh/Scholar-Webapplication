'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Sparkles } from 'lucide-react';

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
          ? 'py-3 bg-bg-cream/80 backdrop-blur-md border-b border-card-border/80 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative w-8.5 h-8.5 rounded-lg bg-brand-navy flex items-center justify-center shadow-sm group-hover:bg-brand-navy-dark transition-all">
            <GraduationCap className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-base tracking-tight text-brand-navy-dark group-hover:text-black transition-colors font-mono">
            Scholar<span className="text-brand-amber font-bold">Web</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-brand-navy transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#final-cta"
            className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold font-mono text-gray-700 bg-white border border-card-border hover:border-card-border-hover hover:bg-slate-50 shadow-sm hover:shadow transition-all duration-200"
          >
            <span>Upload Syllabus</span>
            <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-black/5 text-gray-600 hover:text-black transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-card-border py-6 px-6 flex flex-col gap-4 animate-reveal md:hidden shadow-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-semibold uppercase tracking-wider text-gray-700 hover:text-brand-navy transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#final-cta"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold font-mono bg-brand-navy hover:bg-brand-navy-dark text-white shadow-sm transition-all"
          >
            <span>Upload Syllabus</span>
            <Sparkles className="w-4 h-4 text-brand-amber" />
          </a>
        </div>
      )}
    </header>
  );
}
