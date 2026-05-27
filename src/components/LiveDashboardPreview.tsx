'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  ArrowUpRight, 
  Clock, 
  Layers,
  ChevronRight,
  TrendingUp,
  Bookmark,
  ArrowLeft,
  Eye,
  EyeOff,
  HelpCircle,
  Award
} from 'lucide-react';

import { initialSubjects as subjects, SubjectData, PracticeQuestion } from './practiceData';

export default function LiveDashboardPreview() {
  const [selectedSubjectId, setSelectedSubjectId] = useState('org-chem');
  const [showPracticeMode, setShowPracticeMode] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const activeSubject = subjects[selectedSubjectId];

  const toggleAnswer = (questionId: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setRevealedAnswers({});
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl border border-card-border bg-white shadow-md overflow-hidden select-none">
      
      {/* Dashboard Top bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-card-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center shadow-sm">
            <Brain className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-brand-navy-dark leading-tight">ScholarWeb Workspace</h3>
            <span className="text-[10px] text-gray-400 font-mono">Academic Session: Spring 2026</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-card-border shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-[10px] text-gray-500 font-mono">Syllabus Sync: Online</span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        
        {/* LEFT SIDEBAR: Subjects & Exams (Col span 3) */}
        <div className="lg:col-span-3 border-r border-card-border p-4 bg-[#fbfbfa]">
          
          <div className="space-y-4">
            
            {/* Active Subject Selector List */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block font-mono">Active Courses</span>
                {showPracticeMode && (
                  <button 
                    onClick={() => setShowPracticeMode(false)}
                    className="text-[9px] font-bold text-brand-navy hover:underline flex items-center gap-0.5"
                  >
                    <ArrowLeft className="w-2.5 h-2.5" />
                    Back
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {Object.values(subjects).map((subj) => {
                  const isSelected = selectedSubjectId === subj.id;
                  
                  let activeBorder = 'border-card-border hover:border-card-border-hover hover:bg-white bg-transparent';
                  if (isSelected) {
                    if (subj.color === 'amber') activeBorder = 'border-brand-amber bg-brand-amber-light/30 text-brand-navy-dark shadow-sm';
                    if (subj.color === 'navy') activeBorder = 'border-brand-navy bg-slate-100 text-brand-navy-dark shadow-sm';
                    if (subj.color === 'green') activeBorder = 'border-brand-green bg-green-50 text-brand-navy-dark shadow-sm';
                  }

                  return (
                    <button
                      key={subj.id}
                      onClick={() => handleSubjectChange(subj.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between group ${activeBorder}`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-gray-400 font-bold">{subj.code}</span>
                        <h4 className="text-xs font-bold truncate max-w-[130px] text-gray-700 transition-colors">{subj.name}</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-card-border flex items-center justify-center bg-white shadow-inner shrink-0">
                        <span className={`text-[10px] font-mono font-bold ${
                          subj.color === 'amber' ? 'text-brand-amber' : subj.color === 'navy' ? 'text-brand-navy' : 'text-brand-green'
                        }`}>
                          {subj.mastery}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Weak Areas list */}
            <div>
              <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2 px-1">Course Weak Spots</span>
              <div className="space-y-2">
                {activeSubject.weakTopics.map((topic, index) => (
                  <div key={index} className="p-2.5 rounded-lg bg-white border border-card-border flex items-center justify-between shadow-sm">
                    <div className="space-y-0.5 max-w-[140px]">
                      <h5 className="text-[11px] font-bold text-gray-700 truncate">{topic.name}</h5>
                      <span className="text-[9px] font-mono text-gray-400">Weight: {topic.weight}%</span>
                    </div>
                    <span className={`text-[8px] font-extrabold font-mono px-1.5 py-0.2 rounded uppercase ${
                      topic.status === 'critical' 
                        ? 'bg-red-50 border border-red-200 text-red-700' 
                        : 'bg-amber-50 border border-amber-200 text-brand-amber'
                    }`}>
                      {topic.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Exam Card */}
            <div className="pt-2 border-t border-card-border">
              <div className="p-3 bg-white border border-card-border rounded-lg flex items-center gap-2 shadow-sm">
                <Clock className="w-4 h-4 text-brand-amber shrink-0" />
                <div>
                  <span className="text-[8px] text-gray-400 block uppercase font-mono">Exam Date Target</span>
                  <span className="text-xs font-bold text-brand-navy-dark">{activeSubject.examDate}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* DYNAMIC MIDDLE PANEL: INTERACTIVE PRACTICE QUIZ VS GENERAL DASHBOARD */}
        <AnimatePresence mode="wait">
          {showPracticeMode ? (
            /* PRACTICE QUIZ REVIEW MODE */
            <motion.div
              key="practice-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-9 p-6 bg-white flex flex-col justify-between space-y-6"
            >
              <div className="space-y-6">
                
                {/* Practice Mode Header */}
                <div className="flex items-center justify-between border-b border-card-border pb-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowPracticeMode(false)}
                      className="p-1.5 rounded-lg border border-card-border hover:bg-slate-50 text-gray-500 hover:text-black transition-colors"
                      aria-label="Back to Dashboard"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-brand-amber tracking-wider">SYLLABUS PRACTICE ENGINE</span>
                      <h2 className="text-lg font-extrabold text-brand-navy-dark mt-0.5">
                        Predicted Exam Questions — {activeSubject.name} ({activeSubject.code})
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-400 font-mono">Syllabus-Aligned</span>
                    <span className="text-xs font-bold text-brand-amber font-mono flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      100% Mapped
                    </span>
                  </div>
                </div>

                {/* Practice Questions Loop */}
                <div className="space-y-5">
                  {activeSubject.practiceQuestions.map((q, idx) => {
                    const isRevealed = !!revealedAnswers[q.id];
                    return (
                      <div key={q.id} className="paper-card p-5 border border-card-border bg-white shadow-sm space-y-4">
                        
                        {/* Question Metadata */}
                        <div className="flex items-center justify-between border-b border-card-border pb-2.5">
                          <span className="text-[9px] font-bold font-mono text-brand-navy flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-brand-amber" />
                            QUESTION {idx + 1} • {q.section}
                          </span>
                          <span className="text-[9px] font-bold font-mono text-brand-amber px-2 py-0.5 rounded bg-brand-amber-light border border-brand-amber/20">
                            {q.weight}% Predicted Weight
                          </span>
                        </div>

                        {/* Question Text */}
                        <p className="text-xs sm:text-sm font-extrabold text-brand-navy-dark leading-relaxed font-serif">
                          {q.question}
                        </p>

                        {/* Toggle Button */}
                        <div>
                          <button
                            onClick={() => toggleAnswer(q.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono border border-card-border hover:bg-slate-50 text-gray-600 hover:text-black transition-all"
                          >
                            {isRevealed ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Hide Answer Key</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Show Expected Answer Key</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Expected Answer Key Accordion */}
                        <AnimatePresence>
                          {isRevealed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden space-y-3 pt-3 border-t border-card-border/80"
                            >
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-brand-green flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Expected Grading Answer Key (Syllabus Standard)
                                </span>
                                <p className="text-xs text-gray-600 leading-relaxed font-serif p-3 bg-slate-50 border border-card-border rounded-lg">
                                  {q.expectedAnswer}
                                </p>
                              </div>

                              {/* Warning tips */}
                              <div className="p-3 bg-red-50/50 border border-red-200 text-red-800 rounded-lg space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                                  ⚠️ SYLLABUS SAFEGUARD ADVICE
                                </span>
                                <p className="text-[11px] text-gray-600 leading-normal font-sans">
                                  {q.consensustip}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Practice Footer */}
              <div className="pt-4 border-t border-card-border flex items-center justify-between text-[10px] text-gray-400 font-mono mt-6">
                <span className="flex items-center gap-1">
                  <Bookmark className="w-3.5 h-3.5 text-brand-amber" />
                  Outlines generated from authorized college directories
                </span>
                <button 
                  onClick={() => setShowPracticeMode(false)}
                  className="text-brand-navy font-bold hover:underline"
                >
                  Return to Syllabus outline
                </button>
              </div>
            </motion.div>
          ) : (
            /* STANDARD GENERAL DASHBOARD VIEW */
            <>
              {/* MAIN PANEL: AI Insights & Fact checking (Col span 6) */}
              <div className="lg:col-span-6 p-6 bg-white flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  {/* Subject Title */}
                  <div className="flex items-center justify-between border-b border-card-border pb-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-gray-400 tracking-wider">{activeSubject.code} • SYLLABUS DIRECTORY</span>
                      <h2 className="text-lg font-extrabold text-brand-navy-dark mt-1 flex items-center gap-2">
                        {activeSubject.name}
                        <span className={`w-2 h-2 rounded-full ${
                          activeSubject.color === 'amber' ? 'bg-brand-amber' : activeSubject.color === 'navy' ? 'bg-brand-navy' : 'bg-brand-green'
                        }`} />
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5 text-right">
                      <span className="text-[9px] text-gray-400 font-mono">Consensus Accuracy</span>
                      <span className="text-xs font-bold text-brand-green font-mono">99.8%</span>
                    </div>
                  </div>

                  {/* 1. AI Syllabus Insights */}
                  <div className="p-4 rounded-xl border border-brand-amber/20 bg-brand-amber-light/20 relative overflow-hidden space-y-2">
                    <div className="flex items-center gap-2 text-brand-amber">
                      <Sparkles className="w-4 h-4" />
                      <h4 className="text-[10px] font-bold uppercase tracking-wider font-mono">Platform Study Insight</h4>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-serif">
                      &quot;{activeSubject.aiInsight}&quot;
                    </p>
                  </div>

                  {/* 2. Fact checking verifications */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-gray-400 tracking-widest font-mono">Web Fact-Checking Overlay</h4>
                      <button 
                        onClick={() => setShowPracticeMode(true)}
                        className="text-[9px] font-bold text-brand-navy hover:underline"
                      >
                        Try Predicted Questions &rarr;
                      </button>
                    </div>
                    
                    <div className="space-y-2.5">
                      {activeSubject.factClaims.map((claim, index) => (
                        <div 
                          key={index}
                          className={`p-3.5 rounded-lg border flex items-start gap-3 transition-colors ${
                            claim.status === 'verified'
                              ? 'border-brand-green/20 bg-brand-green-light/20 text-brand-green'
                              : 'border-red-200 bg-red-50/40 text-red-800'
                          }`}
                        >
                          {claim.status === 'verified' ? (
                            <CheckCircle className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                          )}
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-700 leading-normal font-serif">
                              &quot;{claim.text}&quot;
                            </p>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[8px] font-extrabold font-mono px-1.5 py-0.2 rounded ${
                                claim.status === 'verified' ? 'bg-brand-green-light border border-brand-green/20 text-brand-green' : 'bg-red-100 border border-red-200 text-red-700'
                              }`}>
                                {claim.status === 'verified' ? 'VERIFIED' : 'TEXTBOOK CONTRADICTION'}
                              </span>
                              <span className="text-[9px] font-mono text-gray-400">{claim.consensus}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Related conceptual chips */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Course-Index Concepts</span>
                    <div className="flex flex-wrap gap-2">
                      {activeSubject.concepts.map((concept, idx) => (
                        <div key={idx} className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-card-border text-[10px] font-bold text-gray-600 hover:border-card-border-hover hover:text-black transition-all cursor-pointer font-mono shadow-sm">
                          <span>{concept}</span>
                          <ArrowUpRight className="w-3 h-3 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-card-border flex items-center justify-between text-[9px] text-gray-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Syllabus Indexing Active
                  </span>
                  <span>Consensus target: Standard course materials</span>
                </div>
              </div>

              {/* RIGHT SIDEBAR: Exam relevance & revision (Col span 3) */}
              <div className="lg:col-span-3 border-l border-card-border p-4 bg-[#fbfbfa] flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Exam Relevance dial */}
                  <div className="p-3.5 bg-white border border-card-border rounded-xl space-y-3 text-center shadow-sm">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Exam Relevance</span>
                    <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                      
                      {/* SVG Circle indicator */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="46" fill="transparent" stroke="#f1f0ec" strokeWidth="6" />
                        <circle cx="56" cy="56" r="46" fill="transparent" 
                          stroke={activeSubject.color === 'amber' ? '#b45309' : activeSubject.color === 'navy' ? '#1e3a8a' : '#166534'} 
                          strokeWidth="6" 
                          strokeDasharray={`${2 * Math.PI * 46}`} 
                          strokeDashoffset={`${2 * Math.PI * 46 * (1 - activeSubject.relevance / 100)}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      
                      <div className="absolute flex flex-col items-center">
                        <span className="text-lg font-extrabold text-brand-navy-dark font-mono leading-none">{activeSubject.relevance}%</span>
                        <span className="text-[8px] font-bold font-mono text-gray-400 uppercase mt-0.5">Weightage</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-normal">
                      Identified as a high-value exam segment.
                    </p>
                  </div>

                  {/* Confidence Score */}
                  <div className="p-3 bg-white border border-card-border rounded-lg space-y-1 shadow-sm">
                    <span className="text-[8px] text-gray-400 font-mono uppercase block">Syllabus Consensus</span>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-brand-green" />
                      <span className="text-[11px] font-bold text-brand-navy-dark">{activeSubject.confidence}% High Agreement</span>
                    </div>
                  </div>

                  {/* Suggested Revision plan */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block px-1">Study Guide Instruction</span>
                    <div className="p-3.5 rounded-lg border border-card-border bg-white text-[11px] text-gray-600 leading-relaxed font-serif flex items-start gap-2 shadow-sm">
                      <Bookmark className="w-3.5 h-3.5 text-brand-amber shrink-0 mt-0.5" />
                      <span>&quot;{activeSubject.revisionText}&quot;</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowPracticeMode(true)}
                  className="w-full py-2.5 rounded-lg text-xs font-bold bg-brand-navy hover:bg-brand-navy-dark text-white shadow-sm transition-all font-mono mt-4 flex items-center justify-center gap-1.5 group"
                >
                  <span>Review Practice Questions</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
