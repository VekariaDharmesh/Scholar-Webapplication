'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  Globe,
  Zap,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  Play
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
    <div className="relative w-full max-w-5xl mx-auto rounded-xl border border-card-border bg-white shadow-md overflow-hidden select-none">
      
      {/* 1. Browser Chrome Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-card-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/10" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/10" />
          <div className="w-3 h-3 rounded-full bg-green-400/80 border border-green-500/10" />
        </div>
        
        {/* Mock Browser URL Bar */}
        <div className="flex items-center gap-2 bg-white border border-card-border rounded-lg px-4 py-1 text-xs text-gray-500 w-3/5 justify-center font-mono shadow-sm">
          <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="truncate">en.wikipedia.org/wiki/Nucleophilic_substitution</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-brand-green-light border border-brand-green/20 text-brand-green flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            Syllabus Match: Active
          </span>
        </div>
      </div>

      {/* 2. Double-Panel Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
        
        {/* LEFT PANEL: The Wikipedia Passage / Textbook (Col Span 7) */}
        <div className="md:col-span-7 p-6 bg-white space-y-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-card-border">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <span className="text-[10px] uppercase font-semibold text-gray-400 font-mono">Wikipedia Article Reading</span>
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                Lehninger Page 122 matches
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>

            {/* Passage Title */}
            <h2 className="text-xl font-bold text-brand-navy font-serif tracking-tight">Nucleophilic Substitution</h2>

            {/* Interactive Passages */}
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed font-serif">
              <p>
                Nucleophilic substitution is a fundamental class of reactions in which an electron-rich chemical species (the nucleophile) replaces a leaving group attached to an electrophilic carbon.
              </p>

              {/* Concept Trigger Block 1 */}
              <button 
                onClick={() => setActiveConceptId('sn2')}
                className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex flex-col gap-1.5 ${
                  activeConceptId === 'sn2' 
                    ? 'border-brand-amber bg-brand-amber-light/35 shadow-sm text-brand-navy-dark' 
                    : 'border-card-border hover:bg-slate-50 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold font-mono text-[9px] uppercase tracking-wider text-brand-amber">CONCEPT SELECTION 01</span>
                  {activeConceptId === 'sn2' && <span className="text-[9px] font-bold text-brand-amber">● ACTIVE OVERLAY</span>}
                </div>
                <p className="italic font-serif leading-relaxed text-[11px] sm:text-xs">
                  {concepts.sn2.highlightText}
                </p>
              </button>

              {/* Concept Trigger Block 2 */}
              <button 
                onClick={() => setActiveConceptId('inversion')}
                className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex flex-col gap-1.5 ${
                  activeConceptId === 'inversion' 
                    ? 'border-brand-amber bg-brand-amber-light/35 shadow-sm text-brand-navy-dark' 
                    : 'border-card-border hover:bg-slate-50 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold font-mono text-[9px] uppercase tracking-wider text-brand-amber">CONCEPT SELECTION 02</span>
                  {activeConceptId === 'inversion' && <span className="text-[9px] font-bold text-brand-amber">● ACTIVE OVERLAY</span>}
                </div>
                <p className="italic font-serif leading-relaxed text-[11px] sm:text-xs">
                  {concepts.inversion.highlightText}
                </p>
              </button>

              {/* Concept Trigger Block 3 */}
              <button 
                onClick={() => setActiveConceptId('solvents')}
                className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex flex-col gap-1.5 ${
                  activeConceptId === 'solvents' 
                    ? 'border-brand-amber bg-brand-amber-light/35 shadow-sm text-brand-navy-dark' 
                    : 'border-card-border hover:bg-slate-50 text-gray-600'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold font-mono text-[9px] uppercase tracking-wider text-brand-amber">CONCEPT SELECTION 03</span>
                  {activeConceptId === 'solvents' && <span className="text-[9px] font-bold text-brand-amber">● ACTIVE OVERLAY</span>}
                </div>
                <p className="italic font-serif leading-relaxed text-[11px] sm:text-xs">
                  {concepts.solvents.highlightText}
                </p>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-card-border text-[10px] text-gray-400 font-mono text-center">
            Click highlights above to test browser overlay response.
          </div>
        </div>

        {/* RIGHT PANEL: ScholarWeb Extension Sidebar (Col Span 5) */}
        <div className="md:col-span-5 p-5 bg-slate-50 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Extension Header */}
            <div className="flex items-center justify-between border-b border-card-border pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-brand-navy flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
                ScholarWeb Overlay
              </span>
              <span className="text-[9px] font-bold font-mono text-brand-green px-1.5 py-0.5 rounded bg-brand-green-light border border-brand-green/20">
                100% Synced
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
                <div className="p-3 bg-white border border-card-border rounded-xl space-y-1">
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest block font-mono">Syllabus Match</span>
                  <span className="text-xs font-bold text-brand-navy-dark leading-tight block">{activeConcept.syllabusMatch}</span>
                </div>

                {/* Exam importance score card */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-white border border-card-border rounded-lg text-center">
                    <span className="text-[9px] text-gray-400 block font-mono uppercase">Exam Weight</span>
                    <span className="text-sm font-extrabold text-brand-amber font-mono leading-none block mt-1">{activeConcept.examWeight}%</span>
                  </div>
                  <div className="p-2.5 bg-white border border-card-border rounded-lg text-center flex flex-col justify-center items-center">
                    <span className="text-[9px] text-gray-400 block font-mono uppercase">Assessment</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider block mt-1 px-2 py-0.5 rounded-full ${
                      activeConcept.priority === 'high' 
                        ? 'bg-red-50 border border-red-200 text-red-700' 
                        : 'bg-amber-50 border border-amber-200 text-brand-amber'
                    }`}>
                      {activeConcept.priority} Priority
                    </span>
                  </div>
                </div>

                {/* textbook Warnings Panel */}
                <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                  activeConcept.id === 'solvents'
                    ? 'border-brand-green/20 bg-brand-green-light/30 text-brand-green'
                    : 'border-red-200 bg-red-50/40 text-red-800'
                }`}>
                  <div className="flex items-center gap-1.5">
                    {activeConcept.id === 'solvents' ? (
                      <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">
                      {activeConcept.id === 'solvents' ? 'TEXTBOOK CONSENSUS SAFE' : 'TEXTBOOK DISCREPANCY'}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-normal font-serif">
                    {activeConcept.textbookWarning}
                  </p>
                </div>

                {/* AI generated Study prompt */}
                <div className="p-3 bg-white border border-card-border rounded-xl space-y-1.5">
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest block font-mono">Syllabus-Aware Outline Study tip</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-sans">
                    {activeConcept.studyTip}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Action Trigger Card */}
          <div className="space-y-2 border-t border-card-border pt-4">
            <button className="w-full text-left text-[11px] font-bold font-mono p-2 bg-brand-navy hover:bg-brand-navy-dark text-white rounded-lg transition-all flex items-center justify-between group shadow-sm">
              <span>Generate Flashcards Review</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-2 text-[9px] text-gray-400 font-mono">
              <ShieldCheck className="w-3 h-3 text-brand-green" />
              <span>Veracity Guard 2.1 • Checked across 12 Textbook matrices</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
