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
  matchPercentage: number;
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
      matchPercentage: 94,
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
      matchPercentage: 89,
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
      matchPercentage: 97,
      examWeight: 12,
      priority: 'medium',
      textbookWarning: 'No contradictions. Standard Wikipedia listings for polar, aprotic solvent velocity match your Lehninger textbook exactly.',
      studyTip: 'Understand why DMSO and Acetone are selected for rapid SN2 reaction speeds, stabilizing transition vectors without solvating the nucleophile.',
      highlightText: '...Polar, aprotic solvents (such as DMSO or acetone) do not form hydrogen bonds with the nucleophile, significantly increasing its ground-state energy and acceleration...'
    }
  };

  const activeConcept = concepts[activeConceptId];

  // SVG Circular Ring details
  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_24px_80px_rgba(0,0,0,0.03)] overflow-hidden select-none">
      
      {/* 1. Browser Chrome Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F7F9FA] border-b border-[#E5E7EB]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 border border-red-500/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 border border-yellow-500/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 border border-green-500/10" />
        </div>
        
        {/* Mock Browser URL Bar */}
        <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E5E7EB] rounded-full px-4 py-1 text-[10px] text-[#5C6865] w-3/5 justify-center font-mono shadow-sm">
          <Globe className="w-3.5 h-3.5 text-[#5C6865]/60 shrink-0" />
          <span className="truncate">en.wikipedia.org/wiki/Nucleophilic_substitution</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[9px] uppercase font-mono font-bold px-2.5 py-0.8 rounded-full bg-brand-green-light border border-brand-green/20 text-brand-green flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            Live Sync
          </span>
        </div>
      </div>

      {/* 2. Double-Panel Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
        
        {/* LEFT PANEL: The Wikipedia Passage / Textbook (Col Span 7) */}
        <div className="md:col-span-7 p-6 bg-[#FFFFFF] space-y-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5E7EB]">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#5C6865]/60 font-mono">Active Browser Tab</span>
              <span className="text-[9px] text-[#5C6865] font-mono flex items-center gap-1">
                Lehninger Page 122 matches
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>

            {/* Passage Title */}
            <h2 className="text-lg font-bold text-[#1A2421] font-serif tracking-tight">Nucleophilic Substitution</h2>

            {/* Interactive Passages */}
            <div className="space-y-4 text-xs sm:text-sm text-[#1A2421]/80 leading-relaxed font-serif">
              <p>
                Nucleophilic substitution is a fundamental class of reactions in which an electron-rich chemical species (the nucleophile) replaces a leaving group attached to an electrophilic carbon.
              </p>

              {/* Concept Trigger Block 1 */}
              <button 
                onClick={() => setActiveConceptId('sn2')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  activeConceptId === 'sn2' 
                    ? 'border-brand-purple bg-[#6366F1]/5 text-[#1A2421] shadow-sm' 
                    : 'border-[#E5E7EB] hover:bg-[#F7F9FA] text-[#5C6865]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-bold font-mono text-[8px] uppercase tracking-wider ${activeConceptId === 'sn2' ? 'text-brand-purple' : 'text-[#5C6865]'}`}>Syllabus Anchor 01</span>
                  {activeConceptId === 'sn2' && <span className="text-[8px] font-bold text-brand-purple font-mono">● ACTIVE SCANNER</span>}
                </div>
                <p className={`italic font-serif leading-relaxed text-[11px] sm:text-xs ${activeConceptId === 'sn2' ? 'text-[#1A2421]' : 'text-[#1A2421]/70'}`}>
                  {concepts.sn2.highlightText}
                </p>
              </button>

              {/* Concept Trigger Block 2 */}
              <button 
                onClick={() => setActiveConceptId('inversion')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  activeConceptId === 'inversion' 
                    ? 'border-brand-purple bg-[#6366F1]/5 text-[#1A2421] shadow-sm' 
                    : 'border-[#E5E7EB] hover:bg-[#F7F9FA] text-[#5C6865]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-bold font-mono text-[8px] uppercase tracking-wider ${activeConceptId === 'inversion' ? 'text-brand-purple' : 'text-[#5C6865]'}`}>Syllabus Anchor 02</span>
                  {activeConceptId === 'inversion' && <span className="text-[8px] font-bold text-brand-purple font-mono">● ACTIVE SCANNER</span>}
                </div>
                <p className={`italic font-serif leading-relaxed text-[11px] sm:text-xs ${activeConceptId === 'inversion' ? 'text-[#1A2421]' : 'text-[#1A2421]/70'}`}>
                  {concepts.inversion.highlightText}
                </p>
              </button>

              {/* Concept Trigger Block 3 */}
              <button 
                onClick={() => setActiveConceptId('solvents')}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  activeConceptId === 'solvents' 
                    ? 'border-brand-purple bg-[#6366F1]/5 text-[#1A2421] shadow-sm' 
                    : 'border-[#E5E7EB] hover:bg-[#F7F9FA] text-[#5C6865]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-bold font-mono text-[8px] uppercase tracking-wider ${activeConceptId === 'solvents' ? 'text-brand-purple' : 'text-[#5C6865]'}`}>Syllabus Anchor 03</span>
                  {activeConceptId === 'solvents' && <span className="text-[8px] font-bold text-brand-purple font-mono">● ACTIVE SCANNER</span>}
                </div>
                <p className={`italic font-serif leading-relaxed text-[11px] sm:text-xs ${activeConceptId === 'solvents' ? 'text-[#1A2421]' : 'text-[#1A2421]/70'}`}>
                  {concepts.solvents.highlightText}
                </p>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] text-[9px] text-[#5C6865]/60 font-mono text-center">
            Click highlights above to test browser overlay response.
          </div>
        </div>

        {/* RIGHT PANEL: ScholarWeb Extension Sidebar (Col Span 5) */}
        <div className="md:col-span-5 p-5 bg-[#F7F9FA] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Extension Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <span className="text-[9px] font-bold uppercase tracking-widest font-mono text-[#1A2421] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
                Syllabus Overlay
              </span>
              <span className="text-[8px] font-bold font-mono text-brand-green px-2 py-0.5 rounded bg-brand-green-light border border-brand-green/20">
                CONNECTED
              </span>
            </div>

            {/* Dynamic Concept details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="space-y-4"
              >
                {/* Syllabus match pill with Circular SVG progress ring */}
                <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <span className="text-[8px] font-semibold text-[#5C6865]/70 uppercase tracking-widest block font-mono">Syllabus Match</span>
                    <span className="text-xs font-bold text-[#1A2421] leading-tight block pr-2">{activeConcept.syllabusMatch}</span>
                  </div>
                  <div className="relative flex items-center justify-center shrink-0 w-14 h-14">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        className="stroke-[#E5E7EB]"
                        strokeWidth="3.5"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="28"
                        cy="28"
                        r={radius}
                        className="stroke-[#6366F1]"
                        strokeWidth="3.5"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - (activeConcept.matchPercentage / 100) * circumference }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute text-[10px] font-black text-[#6366F1] font-mono">
                      {activeConcept.matchPercentage}%
                    </span>
                  </div>
                </div>

                {/* Exam importance score card */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-center shadow-sm">
                    <span className="text-[8px] text-[#5C6865]/70 block font-mono uppercase">Exam Weight</span>
                    <span className="text-sm font-extrabold text-[#6366F1] font-mono leading-none block mt-1.5">{activeConcept.examWeight}%</span>
                  </div>
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl text-center flex flex-col justify-center items-center shadow-sm">
                    <span className="text-[8px] text-[#5C6865]/70 block font-mono uppercase">Assessment</span>
                    <span className={`text-[8.5px] font-bold uppercase tracking-wider block mt-1.5 px-2.5 py-0.8 rounded-full ${
                      activeConcept.priority === 'high' 
                        ? 'bg-[#E07A5F]/10 border border-[#E07A5F]/20 text-[#E07A5F]' 
                        : 'bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b]'
                    }`}>
                      {activeConcept.priority} Priority
                    </span>
                  </div>
                </div>

                {/* textbook Warnings Panel (Terracotta for Discrepancy, Green for consensus safe) */}
                <div className={`p-3.5 rounded-xl border space-y-1.5 shadow-sm transition-colors duration-300 ${
                  activeConcept.id === 'solvents'
                    ? 'border-brand-green/20 bg-brand-green/5 text-brand-green'
                    : 'border-[#E07A5F]/20 bg-[#E07A5F]/5 text-[#E07A5F]'
                }`}>
                  <div className="flex items-center gap-1.5">
                    {activeConcept.id === 'solvents' ? (
                      <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#E07A5F] shrink-0" />
                    )}
                    <span className="text-[8px] font-bold uppercase tracking-wider font-mono">
                      {activeConcept.id === 'solvents' ? 'TEXTBOOK CONSENSUS SAFE' : 'TEXTBOOK DISCREPANCY'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#1A2421]/80 leading-normal font-sans">
                    {activeConcept.textbookWarning}
                  </p>
                </div>

                {/* AI generated Study prompt */}
                <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl space-y-1.5 shadow-sm">
                  <span className="text-[8px] font-semibold text-[#5C6865]/70 uppercase tracking-widest block font-mono">Study Guide Insight</span>
                  <p className="text-[11.5px] text-[#5C6865] leading-relaxed font-sans">
                    {activeConcept.studyTip}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Action Trigger Card */}
          <div className="space-y-2 border-t border-[#E5E7EB] pt-4">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left text-[10px] font-bold font-mono p-2.5 bg-[#6366F1] hover:bg-[#6366F1]/90 text-white rounded-lg transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
                Generate Active Flashcards
              </span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
            <div className="flex items-center justify-center gap-1.5 text-[8.5px] text-[#5C6865]/60 font-mono">
              <ShieldCheck className="w-3 h-3 text-brand-green" />
              <span>Checked across 12 Textbook matrices</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
