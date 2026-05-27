'use client';

import React, { useState, useEffect } from 'react';
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
  Award,
  Zap,
  Network,
  List,
  BookOpen
} from 'lucide-react';

import { initialSubjects as subjects, SubjectData, PracticeQuestion } from './practiceData';

interface GraphNode {
  id: string;
  name: string;
  x: number;
  y: number;
  mastery: number;
  status: 'mastered' | 'weak' | 'progress';
  insights: string;
}

export default function LiveDashboardPreview() {
  const [selectedSubjectId, setSelectedSubjectId] = useState('org-chem');
  const [showPracticeMode, setShowPracticeMode] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [workspaceTab, setWorkspaceTab] = useState<'directory' | 'graph'>('graph');
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const activeSubject = subjects[selectedSubjectId];

  // Subject-specific knowledge graph nodes
  const subjectGraphs: Record<string, GraphNode[]> = {
    'org-chem': [
      { id: 'n1', name: 'Chiral Carbons', x: 20, y: 30, mastery: 85, status: 'mastered', insights: 'Chiral carbons have four distinct substituents. Current mastery is solid. Direct textbook checks confirm polarimetry maps match your exams.' },
      { id: 'n2', name: 'Leaving Groups', x: 50, y: 20, mastery: 60, status: 'progress', insights: 'Leaving group ability correlates with conjugate base strength. Focus on iodide versus fluoride rate variables.' },
      { id: 'n3', name: 'Aprotic Solvents', x: 80, y: 35, mastery: 35, status: 'weak', insights: 'CRITICAL ALERT: Polar, aprotic solvents (DMSO, Acetone) accelerate SN2 by 10^5. You previously confused this with SN1 protic stabilization.' },
      { id: 'n4', name: 'Activation Energy', x: 35, y: 75, mastery: 45, status: 'progress', insights: 'Transition state delta G determines velocity. Review transition-state barrier outlines.' },
      { id: 'n5', name: 'Transition States', x: 65, y: 70, mastery: 28, status: 'weak', insights: 'HIGH EXAM RISK: 85% of points lost here are due to improper drawing of dashed bonds and partial charges on chiral centers.' }
    ],
    'quant-phys': [
      { id: 'p1', name: 'Wavefunctions', x: 20, y: 30, mastery: 90, status: 'mastered', insights: 'Wavefunction continuity requires boundary condition matches. Mastery is excellent.' },
      { id: 'p2', name: 'Eigenstates', x: 50, y: 20, mastery: 55, status: 'progress', insights: 'Operators act on eigenstates to yield observable eigenvalues. Review Hermitian matrices.' },
      { id: 'p3', name: 'Infinite Wells', x: 80, y: 35, mastery: 20, status: 'weak', insights: 'CRITICAL ALERT: Memorize allowed energy formulations. n=0 is a trivial solution and violates uncertainty parameters.' },
      { id: 'p4', name: 'Dirac Notation', x: 35, y: 75, mastery: 70, status: 'mastered', insights: 'Inner products map to Hilbert spaces. Dirac formulations are required on free response.' },
      { id: 'p5', name: 'Probability Density', x: 65, y: 70, mastery: 40, status: 'progress', insights: 'Integral over all space must equal 1.0. Review standard normalization techniques.' }
    ],
    'neurobio': [
      { id: 'b1', name: 'Long-Term Potentiation', x: 20, y: 30, mastery: 95, status: 'mastered', insights: 'LTP requires AMPA/NMDA co-activation. Your cellular cascade outline is fully mapped.' },
      { id: 'b2', name: 'AMPA Receptors', x: 50, y: 20, mastery: 80, status: 'mastered', insights: 'AMPA mediates rapid sodium influx. Focus on ligand-dependent open rates.' },
      { id: 'b3', name: 'NMDA Receptors', x: 80, y: 35, mastery: 30, status: 'weak', insights: 'CRITICAL ALERT: Magnesium block clearance is strictly voltage-dependent, requiring postsynaptic depolarization to -30mV.' },
      { id: 'b4', name: 'Retrograde Travel', x: 35, y: 75, mastery: 65, status: 'progress', insights: 'Nitric oxide triggers presynaptic glutamate release probability increases.' },
      { id: 'b5', name: 'Spine Density', x: 65, y: 70, mastery: 48, status: 'progress', insights: 'Hebbian learning physically alters structural dendritic spine shapes.' }
    ]
  };

  const activeGraphNodes = subjectGraphs[selectedSubjectId] || [];

  // Simulated AI typing streaming effect when a concept node is selected
  useEffect(() => {
    if (!selectedNode) {
      setStreamingText('');
      return;
    }
    
    setIsStreaming(true);
    setStreamingText('');
    const fullText = selectedNode.insights;
    let index = 0;
    
    const interval = setInterval(() => {
      setStreamingText(prev => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 15);
    
    return () => clearInterval(interval);
  }, [selectedNode]);

  const toggleAnswer = (questionId: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setRevealedAnswers({});
    setSelectedNode(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl border border-white/5 bg-[#0d0d10]/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden select-none">
      
      {/* Dashboard Top bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#08080a]/90 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center shadow-sm">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight font-mono uppercase tracking-wider">ScholarOS Workspace</h3>
            <span className="text-[9px] text-white/40 font-mono">Session Core: Spring 2026</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/3 px-3 py-1.5 rounded-full border border-white/5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-[9px] text-white/50 font-mono">Neural Sync: Live</span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        
        {/* LEFT SIDEBAR: Subjects & Exams (Col span 3) */}
        <div className="lg:col-span-3 border-r border-white/5 p-4 bg-[#070709]/60">
          
          <div className="space-y-4">
            
            {/* Active Subject Selector List */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[9px] font-extrabold text-white/30 uppercase tracking-widest block font-mono">Active Courses</span>
                {showPracticeMode && (
                  <button 
                    onClick={() => setShowPracticeMode(false)}
                    className="text-[9px] font-bold text-brand-purple hover:underline flex items-center gap-0.5 font-mono"
                  >
                    <ArrowLeft className="w-2.5 h-2.5" />
                    Console
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {Object.values(subjects).map((subj) => {
                  const isSelected = selectedSubjectId === subj.id;
                  
                  let activeBorder = 'border-white/5 hover:border-white/10 hover:bg-white/3 bg-transparent';
                  if (isSelected) {
                    if (subj.color === 'amber') activeBorder = 'border-brand-purple bg-brand-purple/10 text-white shadow-[0_0_12px_rgba(99,102,241,0.1)]';
                    if (subj.color === 'navy') activeBorder = 'border-brand-blue bg-brand-blue/10 text-white shadow-[0_0_12px_rgba(59,130,246,0.1)]';
                    if (subj.color === 'green') activeBorder = 'border-brand-green bg-brand-green/10 text-white shadow-[0_0_12px_rgba(16,185,129,0.1)]';
                  }

                  return (
                    <button
                      key={subj.id}
                      onClick={() => handleSubjectChange(subj.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${activeBorder}`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-white/40 font-bold">{subj.code}</span>
                        <h4 className="text-xs font-bold truncate max-w-[130px] text-white/80 group-hover:text-white transition-colors">{subj.name}</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center bg-white/3 shadow-inner shrink-0">
                        <span className={`text-[10px] font-mono font-bold ${
                          subj.color === 'amber' ? 'text-brand-purple' : subj.color === 'navy' ? 'text-brand-blue' : 'text-brand-green'
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
              <span className="text-[9px] font-extrabold text-white/30 uppercase tracking-widest block mb-2 px-1">Active Weak Spots</span>
              <div className="space-y-2">
                {activeSubject.weakTopics.map((topic, index) => (
                  <div key={index} className="p-2.5 rounded-xl bg-white/3 border border-white/5 flex items-center justify-between shadow-sm">
                    <div className="space-y-0.5 max-w-[140px]">
                      <h5 className="text-[11px] font-bold text-white/70 truncate">{topic.name}</h5>
                      <span className="text-[9px] font-mono text-white/40">Weight: {topic.weight}%</span>
                    </div>
                    <span className={`text-[8px] font-extrabold font-mono px-1.5 py-0.2 rounded uppercase ${
                      topic.status === 'critical' 
                        ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                        : 'bg-brand-amber/10 border border-brand-amber/20 text-brand-amber'
                    }`}>
                      {topic.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Exam Card */}
            <div className="pt-2 border-t border-white/5">
              <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-center gap-2 shadow-sm">
                <Clock className="w-4 h-4 text-brand-amber shrink-0 animate-pulse" />
                <div>
                  <span className="text-[8px] text-white/40 block uppercase font-mono">Exam Target</span>
                  <span className="text-xs font-bold text-white/80">{activeSubject.examDate}</span>
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
              className="lg:col-span-9 p-6 bg-[#08080a] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-6">
                
                {/* Practice Mode Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowPracticeMode(false)}
                      className="p-1.5 rounded-xl border border-white/5 hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                      aria-label="Back to Dashboard"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-brand-purple tracking-wider">Neural Practice Engine</span>
                      <h2 className="text-lg font-extrabold text-white mt-0.5 font-sans">
                        Predicted Exam Questions — {activeSubject.name}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-white/40 font-mono">Syllabus-Aligned</span>
                    <span className="text-xs font-bold text-brand-purple font-mono flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      100% Mapped
                    </span>
                  </div>
                </div>

                {/* Practice Questions Loop */}
                <div className="space-y-5 max-h-[480px] overflow-y-auto pr-1">
                  {activeSubject.practiceQuestions.map((q, idx) => {
                    const isRevealed = !!revealedAnswers[q.id];
                    return (
                      <div key={q.id} className="glass-panel p-5 border border-white/5 bg-white/2 shadow-sm space-y-4">
                        
                        {/* Question Metadata */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                          <span className="text-[9px] font-bold font-mono text-brand-purple flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-brand-amber animate-pulse" />
                            QUESTION {idx + 1} • {q.section}
                          </span>
                          <span className="text-[9px] font-bold font-mono text-brand-purple px-2 py-0.5 rounded bg-brand-purple/10 border border-brand-purple/20">
                            {q.weight}% Exam Weight
                          </span>
                        </div>

                        {/* Question Text */}
                        <p className="text-xs sm:text-sm font-extrabold text-white leading-relaxed font-serif">
                          {q.question}
                        </p>

                        {/* Toggle Button */}
                        <div>
                          <button
                            onClick={() => toggleAnswer(q.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono border border-white/5 hover:bg-white/5 text-white/60 hover:text-white transition-all"
                          >
                            {isRevealed ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-brand-purple" />
                                <span>Hide Answer Key</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5 text-brand-purple" />
                                <span>Reveal Expected Answer Key</span>
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
                              className="overflow-hidden space-y-3 pt-3 border-t border-white/5"
                            >
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-brand-green flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Expected Textbook Grading Matrix
                                </span>
                                <p className="text-xs text-white/70 leading-relaxed font-serif p-3 bg-white/2 border border-white/5 rounded-xl">
                                  {q.expectedAnswer}
                                </p>
                              </div>

                              {/* Warning tips */}
                              <div className="p-3 bg-red-500/5 border border-red-500/20 text-red-400 rounded-xl space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                                  ⚠️ SYLLABUS SAFEGUARD ADVICE
                                </span>
                                <p className="text-[11px] text-white/60 leading-normal font-sans">
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
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-white/30 font-mono mt-6">
                <span className="flex items-center gap-1">
                  <Bookmark className="w-3.5 h-3.5 text-brand-purple" />
                  Sourced from standard collegiate outlines
                </span>
                <button 
                  onClick={() => setShowPracticeMode(false)}
                  className="text-brand-purple font-bold hover:underline"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          ) : (
            /* STANDARD GENERAL DASHBOARD VIEW */
            <>
              {/* MAIN PANEL: AI Insights & Fact checking (Col span 6) */}
              <div className="lg:col-span-6 p-6 bg-[#08080a] flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  
                  {/* Subject Title & Tab Toggle */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-white/30 tracking-wider">ACTIVE SYLLABUS UNIT</span>
                      <h2 className="text-lg font-extrabold text-white mt-0.5 flex items-center gap-2 font-sans">
                        {activeSubject.name}
                        <span className={`w-2 h-2 rounded-full ${
                          activeSubject.color === 'amber' ? 'bg-brand-purple' : activeSubject.color === 'navy' ? 'bg-brand-blue' : 'bg-brand-green'
                        }`} />
                      </h2>
                    </div>
                    
                    {/* Visual Mode Toggles */}
                    <div className="flex items-center gap-1 p-0.5 bg-white/5 border border-white/5 rounded-lg">
                      <button 
                        onClick={() => setWorkspaceTab('graph')}
                        className={`p-1.5 rounded text-[10px] font-bold font-mono transition-all flex items-center gap-1 ${
                          workspaceTab === 'graph' ? 'bg-brand-purple text-white shadow-sm' : 'text-white/40 hover:text-white'
                        }`}
                        title="Interactive Graph"
                      >
                        <Network className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => setWorkspaceTab('directory')}
                        className={`p-1.5 rounded text-[10px] font-bold font-mono transition-all flex items-center gap-1 ${
                          workspaceTab === 'directory' ? 'bg-brand-purple text-white shadow-sm' : 'text-white/40 hover:text-white'
                        }`}
                        title="Claims Directory"
                      >
                        <List className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* ACTIVE WORKSPACE RENDER */}
                  {workspaceTab === 'graph' ? (
                    /* SPATIAL NEURAL GRAPH CANVAS */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase text-white/30 tracking-widest font-mono">Interactive Neural Concept Map</span>
                        <span className="text-[8px] font-mono text-white/40">Click nodes to stream AI insights</span>
                      </div>

                      {/* SVG Spatial Canvas */}
                      <div className="relative h-64 border border-white/5 bg-[#0a0a0d] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                        <div className="absolute inset-0 bg-dot-matrix opacity-10" />

                        {/* Connection Paths */}
                        <svg className="w-full h-full absolute inset-0">
                          <line x1="20%" y1="30%" x2="50%" y2="20%" stroke={selectedNode?.id === 'n2' || selectedNode?.id === 'n1' ? '#6366f1' : '#1a1a24'} strokeWidth="1.5" className="transition-all duration-300" />
                          <line x1="50%" y1="20%" x2="80%" y2="35%" stroke={selectedNode?.id === 'n3' || selectedNode?.id === 'n2' ? '#6366f1' : '#1a1a24'} strokeWidth="1.5" className="transition-all duration-300" />
                          <line x1="20%" y1="30%" x2="35%" y2="75%" stroke={selectedNode?.id === 'n4' || selectedNode?.id === 'n1' ? '#6366f1' : '#1a1a24'} strokeWidth="1.5" />
                          <line x1="55%" y1="65%" x2="65%" y2="70%" stroke="#1a1a24" strokeWidth="1.5" />
                          <line x1="35%" y1="75%" x2="65%" y2="70%" stroke={selectedNode?.id === 'n5' || selectedNode?.id === 'n4' ? '#6366f1' : '#1a1a24'} strokeWidth="1.5" />
                        </svg>

                        {/* Nodes Loop */}
                        {activeGraphNodes.map((node) => {
                          const isSelected = selectedNode?.id === node.id;
                          
                          let ringColor = 'border-white/10 text-white/40 bg-[#0c0c0f]';
                          if (node.status === 'mastered') ringColor = 'border-brand-green bg-brand-green/20 text-brand-green shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse-slow';
                          if (node.status === 'weak') ringColor = 'border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.35)] animate-pulse';
                          if (node.status === 'progress') ringColor = 'border-brand-blue bg-brand-blue/20 text-brand-blue shadow-[0_0_12px_rgba(59,130,246,0.3)]';

                          return (
                            <button
                              key={node.id}
                              onClick={() => setSelectedNode(node)}
                              className={`absolute px-2.5 py-1 rounded-full border text-[9px] font-bold font-mono transition-all hover:scale-[1.08] cursor-pointer ${ringColor} ${
                                isSelected ? 'ring-2 ring-brand-purple scale-[1.08] z-20' : 'z-10'
                              }`}
                              style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            >
                              {node.name}
                            </button>
                          );
                        })}
                      </div>

                      {/* Tooltip Dynamic Details */}
                      <div className="min-h-[85px] p-3.5 bg-white/2 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col justify-center">
                        {selectedNode ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-bold text-brand-purple flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5 text-brand-amber animate-pulse" />
                                {selectedNode.name.toUpperCase()} INSIGHTS
                              </span>
                              <span className="text-[9px] font-mono text-white/40">Mastered Delta: {selectedNode.mastery}%</span>
                            </div>
                            <p className="text-[11px] text-white/70 leading-relaxed font-sans min-h-[30px]">
                              {streamingText}
                              {isStreaming && <span className="w-1.5 h-3 bg-brand-purple inline-block animate-pulse ml-0.5" />}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-[10px] text-white/30 font-mono py-2 flex flex-col items-center gap-1.5">
                            <Network className="w-5 h-5 text-white/20" />
                            <span>Select a neural concept node above to stream syllabus-aware study summaries.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* TRADITIONAL CLAIMS DIRECTORY VIEW */
                    <div className="space-y-4">
                      
                      {/* 1. AI Syllabus Insights */}
                      <div className="p-4 rounded-xl border border-brand-purple/20 bg-brand-purple/5 relative overflow-hidden space-y-2">
                        <div className="flex items-center gap-2 text-brand-purple">
                          <Sparkles className="w-4 h-4" />
                          <h4 className="text-[9px] font-bold uppercase tracking-wider font-mono">Platform Concept Study Insight</h4>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-serif">
                          &quot;{activeSubject.aiInsight}&quot;
                        </p>
                      </div>

                      {/* 2. Fact checking verifications */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[9px] font-bold uppercase text-white/30 tracking-widest font-mono">Real-Time Web Claim Overlay</h4>
                          <button 
                            onClick={() => setShowPracticeMode(true)}
                            className="text-[9px] font-bold text-brand-purple hover:underline font-mono"
                          >
                            Try Practice Questions &rarr;
                          </button>
                        </div>
                        
                        <div className="space-y-2.5">
                          {activeSubject.factClaims.map((claim, index) => (
                            <div 
                              key={index}
                              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                                claim.status === 'verified'
                                  ? 'border-brand-green/20 bg-brand-green/5 text-brand-green'
                                  : 'border-red-500/20 bg-red-500/5 text-red-400'
                              }`}
                            >
                              {claim.status === 'verified' ? (
                                <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                              )}
                              <div className="space-y-1">
                                <p className="text-xs font-bold text-white/80 leading-normal font-serif">
                                  &quot;{claim.text}&quot;
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[8px] font-extrabold font-mono px-1.5 py-0.2 rounded ${
                                    claim.status === 'verified' ? 'bg-brand-green/10 border border-brand-green/20 text-brand-green' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                  }`}>
                                    {claim.status === 'verified' ? 'VERIFIED' : 'TEXTBOOK WARNING'}
                                  </span>
                                  <span className="text-[9px] font-mono text-white/30">{claim.consensus}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. Related conceptual chips */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider block font-mono">Course Concepts Index</span>
                        <div className="flex flex-wrap gap-2">
                          {activeSubject.concepts.map((concept, idx) => (
                            <div key={idx} className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/2 border border-white/5 text-[9px] font-bold text-white/60 hover:border-brand-purple/40 hover:text-white transition-all cursor-pointer font-mono shadow-sm">
                              <span>{concept}</span>
                              <ArrowUpRight className="w-3 h-3 text-white/30" />
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-white/30 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-purple" />
                    Syllabus Indexes Synced
                  </span>
                  <span>Target base: Core standard college text keys</span>
                </div>
              </div>

              {/* RIGHT SIDEBAR: Exam relevance & revision (Col span 3) */}
              <div className="lg:col-span-3 border-l border-white/5 p-4 bg-[#070709]/60 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Exam Relevance dial */}
                  <div className="p-3.5 bg-white/2 border border-white/5 rounded-xl space-y-3 text-center shadow-sm">
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block font-mono">Exam Relevance</span>
                    <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                      
                      {/* SVG Circle indicator */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="46" fill="transparent" stroke="#16161a" strokeWidth="6" />
                        <circle cx="56" cy="56" r="46" fill="transparent" 
                          stroke={activeSubject.color === 'amber' ? '#6366f1' : activeSubject.color === 'navy' ? '#3b82f6' : '#10b981'} 
                          strokeWidth="6" 
                          strokeDasharray={`${2 * Math.PI * 46}`} 
                          strokeDashoffset={`${2 * Math.PI * 46 * (1 - activeSubject.relevance / 100)}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      
                      <div className="absolute flex flex-col items-center">
                        <span className="text-base font-extrabold text-white font-mono leading-none">{activeSubject.relevance}%</span>
                        <span className="text-[8px] font-bold font-mono text-white/40 uppercase mt-0.5">Readiness</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-white/40 leading-normal font-mono">
                      High-Priority Exam Target Unit
                    </p>
                  </div>

                  {/* Confidence Score */}
                  <div className="p-3 bg-white/2 border border-white/5 rounded-xl space-y-1 shadow-sm">
                    <span className="text-[8px] text-white/40 font-mono uppercase block">Syllabus Consensus</span>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-brand-green" />
                      <span className="text-[10px] font-bold text-white/80 font-mono">{activeSubject.confidence}% Agreed Matrix</span>
                    </div>
                  </div>

                  {/* Suggested Revision plan */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-extrabold text-white/30 uppercase tracking-widest block px-1 font-mono">AI Guide Instruction</span>
                    <div className="p-3.5 rounded-xl border border-white/5 bg-white/2 text-[11px] text-white/60 leading-relaxed font-serif flex items-start gap-2 shadow-sm">
                      <Bookmark className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5 animate-pulse" />
                      <span>&quot;{activeSubject.revisionText}&quot;</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowPracticeMode(true)}
                  className="w-full py-2.5 rounded-xl text-[10px] font-bold bg-brand-purple hover:bg-brand-purple/80 text-white shadow-[0_4px_16px_rgba(99,102,241,0.2)] transition-all font-mono mt-4 flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-brand-amber animate-pulse" />
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
