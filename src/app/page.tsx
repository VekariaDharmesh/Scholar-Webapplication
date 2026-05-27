'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  UploadCloud, 
  Compass, 
  Network, 
  Video, 
  ShieldCheck, 
  Timer, 
  GraduationCap,
  ArrowUpRight
} from 'lucide-react';
import Header from '@/components/Header';
import InteractiveMockup from '@/components/InteractiveMockup';
import DemoSlides from '@/components/DemoSlides';
import LiveDashboardPreview from '@/components/LiveDashboardPreview';

// Reveal animation variant for scroll-triggered fades
const fadeUp: any = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function ScholarWebLanding() {
  const trustTags = [
    "Syllabus-Aligned",
    "Notion Sync",
    "Textbook Fact-Check",
    "College Exam Prep",
    "Browser Overlay",
    "Visual Progress Index"
  ];

  const features = [
    {
      icon: UploadCloud,
      title: "Syllabus Upload",
      desc: "Drop in your course syllabus PDF once. AI parses the topics, indexes unit weights, and extracts exam dates automatically.",
      color: "purple"
    },
    {
      icon: Compass,
      title: "Browser Extension Overlay",
      desc: "See exam relevance as you browse Wikipedia, lecture slides, or online articles in real time without leaving your reading tabs.",
      color: "blue"
    },
    {
      icon: Network,
      title: "Visual Progress Index",
      desc: "Track your understanding in a clean, visual course outline that fills in as you read webpages, highlighting weak points in amber.",
      color: "green"
    },
    {
      icon: Video,
      title: "Lecture Outliner & Quizzer",
      desc: "Paste YouTube lectures or class recordings. Convert videos into clean outlines and predicted short-answer exam questions.",
      color: "purple"
    },
    {
      icon: ShieldCheck,
      title: "Consensus Safeguard",
      desc: "Automatically flag claims on standard webpages that contradict your class textbooks so you never lose points on strict test keys.",
      color: "blue"
    },
    {
      icon: Timer,
      title: "Study Revision Scheduler",
      desc: "Tracks remaining days before exams and prioritizes high-weight weak topics based on empty slots in your Google Calendar.",
      color: "green"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Drop in your syllabus PDF",
      desc: "Upload any course outline. Our system extracts weightage and core exam units in under 30 seconds."
    },
    {
      number: "02",
      title: "Study normally",
      desc: "Read articles, look up terms, or watch YouTube lectures. ScholarWeb works in the background in your browser."
    },
    {
      number: "03",
      title: "Learn what actually counts",
      desc: "Get highlighted course relevance, textbook warning flags, and quick outline flashcards directly inside your active tab."
    }
  ];

  const testimonials = [
    {
      quote: "ScholarWeb completely saved me during my biochemistry finals. I'd search mechanisms on Wikipedia, and the browser extension immediately flagged what chapter matched Lehninger. Literally stopped me from studying useless details.",
      username: "sarah_c",
      school: "UCLA • Biology Major"
    },
    {
      quote: "Being able to paste my professor's recorded lectures and immediately see a predicted short-answer quiz matching my exact syllabus outlines is insane. I stopped drowning in open tabs.",
      username: "alex_m",
      school: "UT Austin • EE Junior"
    },
    {
      quote: "Highly structured college exams have super strict grading keys. Standard search articles have errors. ScholarWeb flagging discrepancies between textbook keys and random web paragraphs saved my grades twice.",
      username: "dinesh_p",
      school: "Northwestern • Pre-Med"
    },
    {
      quote: "Students usually waste hours reading adjacent details that aren't on the final. ScholarWeb keeps them anchored directly to standard academic curricula. I recommend it to all my sophomores.",
      username: "elena_r",
      school: "UCSC • Molecular Bio TA"
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#060608] text-gray-100 overflow-x-hidden">
      
      {/* BACKGROUND DECORATIONS - premium spatial glows */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[45%] bg-[#6366f1]/8 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[50%] bg-[#3b82f6]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[40%] bg-[#10b981]/5 rounded-full blur-[120px]" />
      </div>

      {/* STICKY NAVBAR */}
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        
        {/* Subtle dot matrix pattern backdrop */}
        <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060608] to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider bg-brand-purple/10 border border-brand-purple/20 text-brand-purple shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-amber" />
            <span>Introducing ScholarOS 2.0 • The Future of Studying</span>
          </motion.div>

          {/* Clean Human-Crafted Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-tight"
          >
            Stop drowning in open tabs. Map the internet to your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#6366f1] to-[#60a5fa] font-black">actual college syllabus</span>.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Upload your course syllabus PDF. ScholarWeb works in the background in your browser, highlighting exactly what webpages, videos, and articles are relevant for your next exam—and flagging what is a waste of time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <a
              href="#final-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold font-mono bg-brand-purple hover:bg-brand-purple/90 text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] transition-all text-[10px] uppercase tracking-wider"
            >
              <span>Sync Syllabus PDF</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            
            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold font-mono bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-white shadow-sm transition-all text-[10px] uppercase tracking-wider"
            >
              <span>Explore Mechanics</span>
            </a>
          </motion.div>

          {/* INTEGRATED SPLIT VIEW WORKSPACE MOCKUP */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 max-w-5xl mx-auto"
          >
            <InteractiveMockup />
          </motion.div>

        </div>
      </section>

      {/* 2. TRUST BADGES / TAGS */}
      <section className="py-8 border-y border-white/5 bg-[#0a0a0d]/60 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            <span className="text-[9px] uppercase font-bold tracking-widest text-white/30 font-mono mr-2">Core Utilities:</span>
            {trustTags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white/60 bg-white/2 border border-white/5 shadow-sm hover:border-brand-purple/40 hover:text-white transition-all cursor-default select-none font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE CORE ONE-LINER SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="pl-6 border-l-2 border-brand-purple text-left max-w-3xl mx-auto py-1"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-serif italic pr-4">
              &ldquo;Every student already uses the internet to study. We just made the internet study back.&rdquo;
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
              <span className="text-[9px] uppercase font-bold font-mono text-brand-purple tracking-widest">ScholarOS Study Safeguard</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="relative w-full py-24 md:py-36 px-4 sm:px-6 lg:px-8 z-10 border-t border-white/5 bg-[#0a0a0d]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-brand-purple">Academic Safeguard</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Features built around your actual textbooks
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              ScholarWeb stops you from wasting hours on broad web queries by keeping every online article, lecture slide, and video anchored directly back to standard course blueprints.
            </p>
          </div>

          {/* Grid Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="glass-panel glass-panel-hover p-6 border border-white/5 bg-[#0d0d10]/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center border transition-colors ${
                    feat.color === 'purple' 
                      ? 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple group-hover:bg-brand-purple/20' 
                      : feat.color === 'blue' 
                      ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue group-hover:bg-brand-blue/20' 
                      : 'bg-brand-green/10 border-brand-green/20 text-brand-green group-hover:bg-brand-green/20'
                  }`}>
                    <feat.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-brand-purple transition-colors">{feat.title}</h3>
                    <p className="text-white/60 text-xs leading-relaxed font-sans">{feat.desc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-white/30 font-mono">
                  <span>OUTLINE SYNCD</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-brand-purple" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. INTERACTIVE DEMO SECTION */}
      <section id="demo" className="relative w-full py-24 md:py-36 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden bg-[#0a0a0d]/60 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-brand-purple">Syllabus Engine Console</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Syllabus matching, simulated step-by-step
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Interact with the tabs below to see how the system registers outline PDFs, intercept standard webpage content, and maps learning mastery matrices.
            </p>
          </div>

          {/* Integrated Slide Component */}
          <DemoSlides />

        </div>
      </section>

      {/* 6. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="relative w-full py-24 md:py-36 px-4 sm:px-6 lg:px-8 z-10 border-t border-white/5 bg-[#0a0a0d]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-brand-green">Syllabus Protocol</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Three steps. Continuous academic safety.
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              We built ScholarWeb to integrate directly into your standard study routines. No new applications to coordinate, no tedious search setups.
            </p>
          </div>

          {/* 3 Step Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line for large screens */}
            <div className="hidden md:block absolute top-[28%] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-brand-purple via-brand-blue to-brand-green opacity-20 z-0 pointer-events-none" />

            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 glass-panel p-6 border border-white/5 bg-[#0d0d10]/40 backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-black text-white/10 font-mono select-none">
                    {step.number}
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    idx === 0 ? 'bg-brand-purple' : idx === 1 ? 'bg-brand-blue' : 'bg-brand-green'
                  }`} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed font-sans">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. LIVE PRODUCT PREVIEW SECTION */}
      <section id="live-preview" className="relative w-full py-24 md:py-36 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden bg-[#0a0a0d]/60 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-brand-purple">SaaS OS Interface Preview</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              An operating system designed for high stakes
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Interact with a live prototype of our student OS console. Click subjects, examine the interactive neural graph nodes, and explore custom predicted practice quizzes.
            </p>
          </div>

          {/* Interactive full Dashboard widget */}
          <LiveDashboardPreview />

        </div>
      </section>

      {/* 8. SOCIAL PROOF SECTION */}
      <section id="testimonials" className="relative w-full py-24 md:py-36 px-4 sm:px-6 lg:px-8 z-10 border-t border-white/5 bg-[#0a0a0d]/20 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest font-mono text-brand-purple">Tester Feedback</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Raw, unfiltered comments from beta testers
            </h2>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              We asked college students studying molecular biology, engineering, and organic chemistry to stress-test our extension during spring finals. Here is what they noted:
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="glass-panel p-6 border border-white/5 bg-[#0d0d10]/40 backdrop-blur-md flex flex-col justify-between gap-5"
              >
                <p className="text-white/70 text-xs italic leading-relaxed font-serif">
                  &ldquo;{test.quote}&rdquo;
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[9px] font-mono text-white/40">
                  <span className="font-bold">STUDENT_CORE_LOG • {test.username}</span>
                  <span>{test.school}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <section id="final-cta" className="relative w-full py-32 md:py-48 px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-t border-white/5 bg-[#08080a] z-10">
        
        {/* Subtle dot matrix pattern backdrop */}
        <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider bg-brand-purple/10 border border-brand-purple/20 text-brand-purple">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-amber" />
            <span>Map your first course free</span>
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Stop drowning in information. Start learning what <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-blue font-black animate-pulse">actually matters</span>.
          </h2>

          <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Register your student email now for access to the private Cohort. Parse your syllabus and index exam modules under a minute.
          </p>

          {/* Minimalist email input console - glassmorphic */}
          <div className="max-w-md mx-auto p-1 bg-white/3 border border-white/5 rounded-full flex items-center shadow-sm focus-within:border-brand-purple/40 focus-within:bg-white/5 transition-all">
            <input 
              type="email" 
              placeholder="Enter your student email..." 
              className="flex-1 bg-transparent px-4 py-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none w-full"
            />
            <button className="px-5 py-2.5 rounded-full text-xs font-bold bg-brand-purple hover:bg-brand-purple/80 text-white font-mono shadow-[0_2px_12px_rgba(99,102,241,0.2)] transition-all shrink-0 uppercase tracking-wider">
              Get OS Access
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-[9px] text-white/30 font-mono pt-2">
            <span>✓ No credit card required</span>
            <span>✓ Active PDF syllabus parser</span>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="border-t border-white/5 bg-[#070709] py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-white/5">
          
          {/* Logo & Pitch */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center shadow-sm">
                <GraduationCap className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-semibold text-xs tracking-tight text-white font-mono uppercase">
                Scholar<span className="text-brand-purple font-bold">OS</span>
              </span>
            </a>
            <p className="text-white/40 text-xs leading-relaxed max-w-sm">
              Connecting isolated web searches directly back to standard course syllabus guides. The textbook-sync study safeguard for college exams.
            </p>
          </div>

          {/* Link Columns */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-purple font-mono">Console</h5>
            <ul className="space-y-2 text-xs text-white/40">
              <li><a href="#" className="hover:text-brand-purple transition-all">Syllabus Engine</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Extension Overlay</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Consensus Audit</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Beta Portal</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-purple font-mono">Protocols</h5>
            <ul className="space-y-2 text-xs text-white/40">
              <li><a href="#" className="hover:text-brand-purple transition-all">Project Index</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Syllabus Guidelines</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Privacy Safeguards</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Student Portal</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-purple font-mono">Integrations</h5>
            <ul className="space-y-2 text-xs text-white/40">
              <li><a href="#" className="hover:text-brand-purple transition-all">Chrome Web Store</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Firefox Add-Ons</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Notion Sync</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Canvas LMS</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-purple font-mono">Developers</h5>
            <ul className="space-y-2 text-xs text-white/40">
              <li><a href="#" className="hover:text-brand-purple transition-all">GitHub Outlines</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">LinkedIn Group</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">API Specs</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-all">Visual Assets</a></li>
            </ul>
          </div>

        </div>

        {/* Copy & Legal */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/30 font-mono gap-4">
          <span>&copy; 2026 ScholarOS Inc. All rights reserved. Built in partnership with YC Study.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
