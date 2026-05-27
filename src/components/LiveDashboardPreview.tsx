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
    <div className="w-full max-w-6xl mx-auto rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_24px_80px_rgba(0,0,0,0.03)] overflow-hidden select-none">
      
      {/* Dashboard Top bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#F7F9FA] border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="w-8.5 h-8.5 rounded-lg bg-[#6366F1] flex items-center justify-center shadow-sm">
            <Brain className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#1A2421] leading-tight font-mono uppercase tracking-wider">ScholarOS Workspace</h3>
            <span className="text-[9px] text-[#5C6865]/70 font-mono">Session Core: Spring 2026</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-brand-green/10 px-3 py-1.5 rounded-full border border-brand-green/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-[9px] text-[#10b981] font-bold font-mono">Neural Sync: Live</span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        
        {/* LEFT SIDEBAR: Subjects & Exams (Col span 3) */}
        <div className="lg:col-span-3 border-r border-[#E5E7EB] p-4 bg-[#F7F9FA]/40">
          
          <div className="space-y-4">
            
            {/* Active Subject Selector List */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[9px] font-extrabold text-[#5C6865]/60 uppercase tracking-widest block font-mono">Active Courses</span>
                {showPracticeMode && (
                  <button 
                    onClick={() => setShowPracticeMode(false)}
                    className="text-[9px] font-bold text-[#6366F1] hover:underline flex items-center gap-0.5 font-mono cursor-pointer"
                  >
                    <ArrowLeft className="w-2.5 h-2.5" />
                    Console
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {Object.values(subjects).map((subj) => {
                  const isSelected = selectedSubjectId === subj.id;
                  
                  let activeBorder = 'border-[#E5E7EB] hover:border-brand-purple/40 hover:bg-[#F7F9FA] bg-transparent text-[#5C6865]';
                  if (isSelected) {
                    if (subj.color === 'amber') activeBorder = 'border-[#6366F1] bg-[#6366F1]/5 text-[#1A2421] shadow-sm';
                    if (subj.color === 'navy') activeBorder = 'border-[#3b82f6] bg-[#3b82f6]/5 text-[#1A2421] shadow-sm';
                    if (subj.color === 'green') activeBorder = 'border-[#10b981] bg-[#10b981]/5 text-[#1A2421] shadow-sm';
                  }

                  return (
                    <button
                      key={subj.id}
                      onClick={() => handleSubjectChange(subj.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${activeBorder}`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-[#5C6865]/60 font-bold">{subj.code}</span>
                        <h4 className="text-xs font-bold truncate max-w-[130px] text-[#1A2421] group-hover:text-black transition-colors">{subj.name}</h4>
                      </div>
                      <div className="w-8.5 h-8.5 rounded-full border border-[#E5E7EB] flex items-center justify-center bg-[#FFFFFF] shadow-sm shrink-0">
                        <span className={`text-[10px] font-mono font-black ${
                          subj.color === 'amber' ? 'text-[#6366F1]' : subj.color === 'navy' ? 'text-[#3b82f6]' : 'text-[#10b981]'
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
              <span className="text-[9px] font-extrabold text-[#5C6865]/60 uppercase tracking-widest block mb-2 px-1">Active Weak Spots</span>
              <div className="space-y-2">
                {activeSubject.weakTopics.map((topic, index) => (
                  <div key={index} className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] flex items-center justify-between shadow-sm">
                    <div className="space-y-0.5 max-w-[140px]">
                      <h5 className="text-[11px] font-bold text-[#1A2421]/90 truncate">{topic.name}</h5>
                      <span className="text-[9px] font-mono text-[#5C6865]/70">Weight: {topic.weight}%</span>
                    </div>
                    <span className={`text-[8px] font-extrabold font-mono px-2 py-0.5 rounded-full uppercase ${
                      topic.status === 'critical' 
                        ? 'bg-[#E07A5F]/10 border border-[#E07A5F]/20 text-[#E07A5F]' 
                        : 'bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b]'
                    }`}>
                      {topic.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Exam Card */}
            <div className="pt-2 border-t border-[#E5E7EB]">
              <div className="p-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl flex items-center gap-2.5 shadow-sm">
                <Clock className="w-4 h-4 text-[#f59e0b] shrink-0 animate-pulse" />
                <div>
                  <span className="text-[8px] text-[#5C6865]/70 block uppercase font-mono">Exam Target</span>
                  <span className="text-xs font-bold text-[#1A2421]">{activeSubject.examDate}</span>
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
              className="lg:col-span-9 p-6 bg-[#FFFFFF] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-6">
                
                {/* Practice Mode Header */}
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowPracticeMode(false)}
                      className="p-1.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F7F9FA] text-[#5C6865] hover:text-[#1A2421] transition-colors cursor-pointer"
                      aria-label="Back to Dashboard"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-[#6366F1] tracking-wider">Neural Practice Engine</span>
                      <h2 className="text-lg font-extrabold text-[#1A2421] mt-0.5 font-sans">
                        Predicted Exam Questions — {activeSubject.name}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-[#5C6865]/70 font-mono">Syllabus-Aligned</span>
                    <span className="text-xs font-bold text-[#6366F1] font-mono flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#f59e0b]" />
                      100% Mapped
                    </span>
                  </div>
                </div>

                {/* Practice Questions Loop */}
                <div className="space-y-5 max-h-[480px] overflow-y-auto pr-1">
                  {activeSubject.practiceQuestions.map((q, idx) => {
                    const isRevealed = !!revealedAnswers[q.id];
                    return (
                      <div key={q.id} className="p-5 border border-[#E5E7EB] bg-[#FFFFFF] shadow-sm space-y-4 rounded-2xl">
                        
                        {/* Question Metadata */}
                        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2.5">
                          <span className="text-[9px] font-bold font-mono text-[#6366F1] flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
                            QUESTION {idx + 1} • {q.section}
                          </span>
                          <span className="text-[9px] font-bold font-mono text-[#6366F1] px-2.5 py-0.8 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20">
                            {q.weight}% Exam Weight
                          </span>
                        </div>

                        {/* Question Text */}
                        <p className="text-xs sm:text-sm font-extrabold text-[#1A2421] leading-relaxed font-sans">
                          {q.question}
                        </p>

                        {/* Toggle Button */}
                        <div>
                          <button
                            onClick={() => toggleAnswer(q.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono border border-[#E5E7EB] hover:bg-[#F7F9FA] text-[#5C6865] hover:text-[#1A2421] transition-all cursor-pointer"
                          >
                            {isRevealed ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-[#6366F1]" />
                                <span>Hide Answer Key</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5 text-[#6366F1]" />
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
                              className="overflow-hidden space-y-3 pt-3 border-t border-[#E5E7EB]"
                            >
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-brand-green flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Expected Textbook Grading Matrix
                                </span>
                                <p className="text-xs text-[#1A2421]/90 leading-relaxed font-sans p-3.5 bg-[#F7F9FA] border border-[#E5E7EB] rounded-xl">
                                  {q.expectedAnswer}
                                </p>
                              </div>

                              {/* Warning tips - Terracotta */}
                              <div className="p-3.5 bg-[#E07A5F]/5 border border-[#E07A5F]/20 text-[#E07A5F] rounded-xl space-y-1">
                                <span className="text-[9px] font-bold uppercase tracking-wider font-mono flex items-center gap-1">
                                  ⚠️ SYLLABUS SAFEGUARD ADVICE
                                </span>
                                <p className="text-[11px] text-[#1A2421]/80 leading-normal font-sans">
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
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[9px] text-[#5C6865]/60 font-mono mt-6">
                <span className="flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#6366F1]" />
                  Sourced from standard collegiate outlines
                </span>
                <button 
                  onClick={() => setShowPracticeMode(false)}
                  className="text-[#6366F1] font-bold hover:underline cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          ) : (
            /* STANDARD GENERAL DASHBOARD VIEW */
            <>
              {/* MAIN PANEL: AI Insights & Fact checking (Col span 6) */}
              <div className="lg:col-span-6 p-6 bg-[#FFFFFF] flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  
                  {/* Subject Title & Tab Toggle */}
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase text-[#5C6865]/60 tracking-wider">ACTIVE SYLLABUS UNIT</span>
                      <h2 className="text-lg font-extrabold text-[#1A2421] mt-0.5 flex items-center gap-2 font-sans">
                        {activeSubject.name}
                        <span className={`w-2 h-2 rounded-full ${
                          activeSubject.color === 'amber' ? 'bg-[#6366F1]' : activeSubject.color === 'navy' ? 'bg-[#3b82f6]' : 'bg-[#10b981]'
                        }`} />
                      </h2>
                    </div>
                    
                    {/* Visual Mode Toggles */}
                    <div className="flex items-center gap-1 p-0.5 bg-[#F7F9FA] border border-[#E5E7EB] rounded-lg">
                      <button 
                        onClick={() => setWorkspaceTab('graph')}
                        className={`p-1.5 rounded text-[10px] font-bold font-mono transition-all flex items-center gap-1 cursor-pointer ${
                          workspaceTab === 'graph' ? 'bg-[#6366F1] text-white shadow-sm' : 'text-[#5C6865]/70 hover:text-[#1A2421]'
                        }`}
                        title="Interactive Graph"
                      >
                        <Network className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => setWorkspaceTab('directory')}
                        className={`p-1.5 rounded text-[10px] font-bold font-mono transition-all flex items-center gap-1 cursor-pointer ${
                          workspaceTab === 'directory' ? 'bg-[#6366F1] text-white shadow-sm' : 'text-[#5C6865]/70 hover:text-[#1A2421]'
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
                        <span className="text-[9px] font-bold uppercase text-[#5C6865]/60 tracking-widest font-mono">Interactive Neural Concept Map</span>
                        <span className="text-[8.5px] font-mono text-[#5C6865]/70">Click nodes to stream AI insights</span>
                      </div>

                      {/* SVG Spatial Canvas */}
                      <div className="relative h-64 border border-[#E5E7EB] bg-[#F7F9FA] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                        <div className="absolute inset-0 bg-dot-matrix opacity-60 pointer-events-none" />

                        {/* Connection Paths */}
                        <svg className="w-full h-full absolute inset-0">
                          <line x1="20%" y1="30%" x2="50%" y2="20%" stroke={selectedNode?.id === 'n2' || selectedNode?.id === 'n1' ? '#6366F1' : '#E5E7EB'} strokeWidth="1.5" className="transition-all duration-300" />
                          <line x1="50%" y1="20%" x2="80%" y2="35%" stroke={selectedNode?.id === 'n3' || selectedNode?.id === 'n2' ? '#6366F1' : '#E5E7EB'} strokeWidth="1.5" className="transition-all duration-300" />
                          <line x1="20%" y1="30%" x2="35%" y2="75%" stroke={selectedNode?.id === 'n4' || selectedNode?.id === 'n1' ? '#6366F1' : '#E5E7EB'} strokeWidth="1.5" />
                          <line x1="55%" y1="65%" x2="65%" y2="70%" stroke="#E5E7EB" strokeWidth="1.5" />
                          <line x1="35%" y1="75%" x2="65%" y2="70%" stroke={selectedNode?.id === 'n5' || selectedNode?.id === 'n4' ? '#6366F1' : '#E5E7EB'} strokeWidth="1.5" />
                        </svg>

                        {/* Nodes Loop */}
                        {activeGraphNodes.map((node) => {
                          const isSelected = selectedNode?.id === node.id;
                          
                          let ringColor = 'border-[#E5E7EB] text-[#5C6865] bg-[#FFFFFF]';
                          if (node.status === 'mastered') ringColor = 'border-brand-green bg-brand-green-light text-brand-green shadow-sm animate-pulse-slow';
                          if (node.status === 'weak') ringColor = 'border-[#E07A5F] bg-[#E07A5F]/15 text-[#E07A5F] shadow-sm animate-pulse';
                          if (node.status === 'progress') ringColor = 'border-[#3b82f6] bg-brand-blue-light text-[#3b82f6] shadow-sm';

                          return (
                            <button
                              key={node.id}
                              onClick={() => setSelectedNode(node)}
                              className={`absolute px-2.5 py-1 rounded-full border text-[9.5px] font-extrabold font-mono transition-all hover:scale-[1.08] cursor-pointer ${ringColor} ${
                                isSelected ? 'ring-2 ring-[#6366F1] scale-[1.05] border-[#6366F1] z-20 shadow-sm' : 'z-10'
                              }`}
                              style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            >
                              {node.name}
                            </button>
                          );
                        })}
                      </div>

                      {/* Tooltip Dynamic Details */}
                      <div className="min-h-[85px] p-4 bg-[#F7F9FA] border border-[#E5E7EB] rounded-2xl relative overflow-hidden flex flex-col justify-center shadow-sm">
                        {selectedNode ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-bold text-[#6366F1] flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
                                {selectedNode.name.toUpperCase()} INSIGHTS
                              </span>
                              <span className="text-[9px] font-mono text-[#5C6865]/70">Mastered Delta: {selectedNode.mastery}%</span>
                            </div>
                            <p className="text-[11.5px] text-[#1A2421] leading-relaxed font-sans min-h-[30px]">
                              {streamingText}
                              {isStreaming && <span className="w-1.5 h-3 bg-[#6366F1] inline-block animate-pulse ml-0.5" />}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-[10px] text-[#5C6865]/70 font-mono py-2 flex flex-col items-center gap-1.5">
                            <Network className="w-5 h-5 text-[#5C6865]/35" />
                            <span>Select a neural concept node above to stream syllabus-aware study summaries.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* TRADITIONAL CLAIMS DIRECTORY VIEW */
                    <div className="space-y-4">
                      
                      {/* 1. AI Syllabus Insights */}
                      <div className="p-4 rounded-xl border border-[#6366F1]/20 bg-[#6366F1]/5 relative overflow-hidden space-y-2">
                        <div className="flex items-center gap-2 text-[#6366F1]">
                          <Sparkles className="w-4 h-4" />
                          <h4 className="text-[9px] font-bold uppercase tracking-wider font-mono">Platform Concept Study Insight</h4>
                        </div>
                        <p className="text-xs text-[#1A2421]/90 leading-relaxed font-sans">
                          &quot;{activeSubject.aiInsight}&quot;
                        </p>
                      </div>

                      {/* 2. Fact checking verifications */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-[9px] font-bold uppercase text-[#5C6865]/60 tracking-widest font-mono">Real-Time Web Claim Overlay</h4>
                          <button 
                            onClick={() => setShowPracticeMode(true)}
                            className="text-[9px] font-bold text-[#6366F1] hover:underline font-mono cursor-pointer"
                          >
                            Try Practice Questions &rarr;
                          </button>
                        </div>
                        
                        <div className="space-y-2.5">
                          {activeSubject.factClaims.map((claim, index) => (
                            <div 
                              key={index}
                              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors shadow-sm ${
                                claim.status === 'verified'
                                  ? 'border-[#10b981]/25 bg-brand-green-light text-brand-green'
                                  : 'border-[#E07A5F]/20 bg-[#E07A5F]/5 text-[#E07A5F]'
                              }`}
                            >
                              {claim.status === 'verified' ? (
                                <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5 animate-pulse" />
                              )}
                              <div className="space-y-1">
                                <p className="text-xs font-extrabold text-[#1A2421]/95 leading-normal font-sans">
                                  &quot;{claim.text}&quot;
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[8px] font-extrabold font-mono px-1.5 py-0.2 rounded ${
                                    claim.status === 'verified' ? 'bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981]' : 'bg-[#E07A5F]/10 border border-[#E07A5F]/20 text-[#E07A5F]'
                                  }`}>
                                    {claim.status === 'verified' ? 'VERIFIED' : 'TEXTBOOK WARNING'}
                                  </span>
                                  <span className="text-[9px] font-mono text-[#5C6865]/60">{claim.consensus}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. Related conceptual chips */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-[#5C6865]/60 uppercase tracking-wider block font-mono">Course Concepts Index</span>
                        <div className="flex flex-wrap gap-2">
                          {activeSubject.concepts.map((concept, idx) => (
                            <div key={idx} className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E5E7EB] text-[9px] font-bold text-[#5C6865] hover:border-[#6366F1] hover:text-[#1A2421] transition-all cursor-pointer font-mono shadow-sm">
                              <span>{concept}</span>
                              <ArrowUpRight className="w-3 h-3 text-[#5C6865]/50" />
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-[9px] text-[#5C6865]/60 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#6366F1]" />
                    Syllabus Indexes Synced
                  </span>
                  <span>Target base: Core standard college text keys</span>
                </div>
              </div>

              {/* RIGHT SIDEBAR: Exam relevance & revision (Col span 3) */}
              <div className="lg:col-span-3 border-l border-[#E5E7EB] p-4 bg-[#F7F9FA]/40 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Exam Relevance dial */}
                  <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl space-y-3 text-center shadow-sm">
                    <span className="text-[9px] font-bold text-[#5C6865]/60 uppercase tracking-widest block font-mono">Exam Relevance</span>
                    <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                      
                      {/* SVG Circle indicator */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="56" cy="56" r="46" fill="transparent" stroke="#F7F9FA" strokeWidth="6" />
                        <circle cx="56" cy="56" r="46" fill="transparent" 
                          stroke={activeSubject.color === 'amber' ? '#6366F1' : activeSubject.color === 'navy' ? '#3b82f6' : '#10b981'} 
                          strokeWidth="6" 
                          strokeDasharray={`${2 * Math.PI * 46}`} 
                          strokeDashoffset={`${2 * Math.PI * 46 * (1 - activeSubject.relevance / 100)}`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      
                      <div className="absolute flex flex-col items-center">
                        <span className="text-base font-extrabold text-[#1A2421] font-mono leading-none">{activeSubject.relevance}%</span>
                        <span className="text-[8px] font-bold font-mono text-[#5C6865]/70 uppercase mt-0.5">Readiness</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-[#5C6865]/60 leading-normal font-mono">
                      High-Priority Exam Target Unit
                    </p>
                  </div>

                  {/* Confidence Score */}
                  <div className="p-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl space-y-1 shadow-sm">
                    <span className="text-[8px] text-[#5C6865]/70 font-mono uppercase block">Syllabus Consensus</span>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-brand-green" />
                      <span className="text-[10px] font-bold text-[#1A2421]/90 font-mono">{activeSubject.confidence}% Agreed Matrix</span>
                    </div>
                  </div>

                  {/* Suggested Revision plan */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-extrabold text-[#5C6865]/60 uppercase tracking-widest block px-1 font-mono">AI Guide Instruction</span>
                    <div className="p-3.5 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-[11px] text-[#5C6865] leading-relaxed font-sans flex items-start gap-2 shadow-sm">
                      <Bookmark className="w-3.5 h-3.5 text-[#6366F1] shrink-0 mt-0.5 animate-pulse" />
                      <span>&quot;{activeSubject.revisionText}&quot;</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowPracticeMode(true)}
                  className="w-full py-2.5 rounded-xl text-[10px] font-bold bg-[#6366F1] hover:bg-[#6366F1]/90 text-white shadow-sm transition-all font-mono mt-4 flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
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
