'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  Globe,
  ShieldCheck,
  ExternalLink,
  Zap
} from 'lucide-react';

interface MockConcept {
  id: string;
  name: string;
  syllabusMatch: string;
  examWeight: number;
  priority: 'high' | 'medium' | 'low';
  textbookWarning: string;
  studyTip: string;
  highlightText: string;
}

export default function InteractiveMockup() {
  const [activeConceptId, setActiveConceptId] = useState('sn2');

  const concepts: Record<string, MockConcept> = {
    'sn2': {
      id: 'sn2',
      name: 'SN2 Kinetics & Transition States',
      syllabusMatch: 'Topic 4.2 • Organic Substitution Reactions',
      examWeight: 25,
      priority: 'high',
      textbookWarning: 'Syllabus grading keys expect polar aprotic solvents. This Wikipedia page heavily details protic variants which will lower your Section B test scores.',
      studyTip: 'Re-study transition state shapes. Memorize carbon inversion configurations since improper drawing accounts for 85% of exam errors in this unit.',
      highlightText: '...During a Bimolecular Nucleophilic Substitution (SN2) reaction, the incoming nucleophile attacks the carbon center from the opposite side of the leaving group, resulting in an instantaneous pentacoordinate transition state...'
    },
    'inversion': {
      id: 'inversion',
      name: 'Stereochemical Inversion Mechanics',
      syllabusMatch: 'Topic 4.5 • Walden Inversion & Chiral Centers',
      examWeight: 18,
      priority: 'high',
      textbookWarning: 'Exams require drawing full Wedges & Dashes representation to prove inversion. Standard pages list stereochemistry loosely; follow textbook rules.',
      studyTip: 'Walden inversion is always a high-yield short-answer question. Practice drawing chiral carbon structures before and after nucleophilic attacks.',
      highlightText: '...This back-side attack forces a complete stereochemical inversion of the chiral center. Often referred to as a Walden inversion, it mirrors an umbrella blowing inside out in a gust of wind...'
    },
    'solvents': {
      id: 'solvents',
      name: 'Solvent Effects on Velocity',
      syllabusMatch: 'Topic 5.1 • Thermodynamic Solvent Properties',
      examWeight: 12,
      priority: 'medium',
      textbookWarning: 'No contradictions. Standard Wikipedia listings for polar, aprotic solvent velocity match your Lehninger textbook exactly.',
      studyTip: 'Understand why DMSO and Acetone are selected for rapid SN2 reaction speeds, stabilizing transition vectors without solvating the nucleophile.',
      highlightText: '...Polar, aprotic solvents (such as DMSO or acetone) do not form hydrogen bonds with the nucleophile, significantly increasing its ground-state energy and acceleration...'
    }
  };

  const activeConcept = concepts[activeConceptId];

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-white/5 bg-[#0d0d10]/90 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden select-none">
      
      {/* 1. Browser Chrome Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0d]/90 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-600/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 border border-yellow-600/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 border border-green-600/10" />
        </div>
        
        {/* Mock Browser URL Bar */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-4 py-1 text-[10px] text-white/50 w-3/5 justify-center font-mono shadow-inner">
          <Globe className="w-3 h-3 text-white/30 shrink-0" />
          <span className="truncate">en.wikipedia.org/wiki/Nucleophilic_substitution</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-brand-green/10 border border-brand-green/20 text-brand-green flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-brand-green animate-pulse" />
            Live Sync
          </span>
        </div>
      </div>

      {/* 2. Double-Panel Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
        
        {/* LEFT PANEL: The Wikipedia Passage / Textbook (Col Span 7) */}
        <div className="md:col-span-7 p-6 bg-[#08080a] space-y-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-[9px] uppercase font-bold tracking-widest text-white/40 font-mono">Active Browser Tab</span>
              <span className="text-[9px] text-white/40 font-mono flex items-center gap-1">
                Lehninger Page 122 matches
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>

            {/* Passage Title */}
            <h2 className="text-lg font-bold text-white font-serif tracking-tight">Nucleophilic Substitution</h2>

            {/* Interactive Passages */}
            <div className="space-y-4 text-xs sm:text-sm text-white/70 leading-relaxed font-serif">
              <p>
                Nucleophilic substitution is a fundamental class of reactions in which an electron-rich chemical species (the nucleophile) replaces a leaving group attached to an electrophilic carbon.
              </p>

              {/* Concept Trigger Block 1 */}
              <button 
                onClick={() => setActiveConceptId('sn2')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  activeConceptId === 'sn2' 
                    ? 'border-brand-purple bg-brand-purple/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.08)]' 
                    : 'border-white/5 hover:bg-white/5 text-white/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold font-mono text-[8px] uppercase tracking-wider text-brand-purple">Syllabus Anchor 01</span>
                  {activeConceptId === 'sn2' && <span className="text-[8px] font-bold text-brand-purple font-mono">● ACTIVE SCANNER</span>}
                </div>
                <p className="italic font-serif leading-relaxed text-[11px] sm:text-xs text-white/80">
                  {concepts.sn2.highlightText}
                </p>
              </button>

              {/* Concept Trigger Block 2 */}
              <button 
                onClick={() => setActiveConceptId('inversion')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  activeConceptId === 'inversion' 
                    ? 'border-brand-purple bg-brand-purple/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.08)]' 
                    : 'border-white/5 hover:bg-white/5 text-white/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold font-mono text-[8px] uppercase tracking-wider text-brand-purple">Syllabus Anchor 02</span>
                  {activeConceptId === 'inversion' && <span className="text-[8px] font-bold text-brand-purple font-mono">● ACTIVE SCANNER</span>}
                </div>
                <p className="italic font-serif leading-relaxed text-[11px] sm:text-xs text-white/80">
                  {concepts.inversion.highlightText}
                </p>
              </button>

              {/* Concept Trigger Block 3 */}
              <button 
                onClick={() => setActiveConceptId('solvents')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  activeConceptId === 'solvents' 
                    ? 'border-brand-purple bg-brand-purple/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.08)]' 
                    : 'border-white/5 hover:bg-white/5 text-white/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold font-mono text-[8px] uppercase tracking-wider text-brand-purple">Syllabus Anchor 03</span>
                  {activeConceptId === 'solvents' && <span className="text-[8px] font-bold text-brand-purple font-mono">● ACTIVE SCANNER</span>}
                </div>
                <p className="italic font-serif leading-relaxed text-[11px] sm:text-xs text-white/80">
                  {concepts.solvents.highlightText}
                </p>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-[9px] text-white/30 font-mono text-center">
            Click highlights above to test browser overlay response.
          </div>
        </div>

        {/* RIGHT PANEL: ScholarWeb Extension Sidebar (Col Span 5) */}
        <div className="md:col-span-5 p-5 bg-[#0b0b0e]/60 backdrop-blur-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Extension Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest font-mono text-white/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                Syllabus Overlay
              </span>
              <span className="text-[8px] font-bold font-mono text-brand-green px-2 py-0.5 rounded bg-brand-green/10 border border-brand-green/20">
                CONNECTED
              </span>
            </div>

            {/* Dynamic Concept details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Syllabus match pill */}
                <div className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[8px] font-semibold text-white/40 uppercase tracking-widest block font-mono">Syllabus Match</span>
                  <span className="text-xs font-bold text-white leading-tight block">{activeConcept.syllabusMatch}</span>
                </div>

                {/* Exam importance score card */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white/3 border border-white/5 rounded-lg text-center">
                    <span className="text-[8px] text-white/40 block font-mono uppercase">Exam Weight</span>
                    <span className="text-xs sm:text-sm font-extrabold text-brand-purple font-mono leading-none block mt-1">{activeConcept.examWeight}%</span>
                  </div>
                  <div className="p-2.5 bg-white/3 border border-white/5 rounded-lg text-center flex flex-col justify-center items-center">
                    <span className="text-[8px] text-white/40 block font-mono uppercase">Assessment</span>
                    <span className={`text-[8px] font-bold uppercase tracking-wider block mt-1 px-2 py-0.5 rounded-full ${
                      activeConcept.priority === 'high' 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                        : 'bg-brand-amber/10 border border-brand-amber/20 text-brand-amber'
                    }`}>
                      {activeConcept.priority} Priority
                    </span>
                  </div>
                </div>

                {/* textbook Warnings Panel */}
                <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                  activeConcept.id === 'solvents'
                    ? 'border-brand-green/20 bg-brand-green/5 text-brand-green'
                    : 'border-red-500/20 bg-red-500/5 text-red-400'
                }`}>
                  <div className="flex items-center gap-1.5">
                    {activeConcept.id === 'solvents' ? (
                      <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span className="text-[8px] font-bold uppercase tracking-wider font-mono">
                      {activeConcept.id === 'solvents' ? 'TEXTBOOK CONSENSUS SAFE' : 'TEXTBOOK DISCREPANCY'}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70 leading-normal font-serif">
                    {activeConcept.textbookWarning}
                  </p>
                </div>

                {/* AI generated Study prompt */}
                <div className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-1.5">
                  <span className="text-[8px] font-semibold text-white/40 uppercase tracking-widest block font-mono">Study Guide Insight</span>
                  <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                    {activeConcept.studyTip}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Action Trigger Card */}
          <div className="space-y-2 border-t border-white/5 pt-4">
            <button className="w-full text-left text-[10px] font-bold font-mono p-2 bg-brand-purple hover:bg-brand-purple/80 text-white rounded-lg transition-all flex items-center justify-between group shadow-sm">
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-brand-amber animate-pulse" />
                Generate Active Flashcards
              </span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-2 text-[8px] text-white/30 font-mono">
              <ShieldCheck className="w-3 h-3 text-brand-green" />
              <span>Checked across 12 Textbook matrices</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
