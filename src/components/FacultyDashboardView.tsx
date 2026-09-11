import React, { useState } from 'react';
import {
  User,
  AlertTriangle,
  FileText,
  Sparkles,
  CheckCircle2,
  Download,
  Users,
  BarChart3,
  Send,
  Edit3,
  BookOpen,
  Printer,
  Copy,
  Plus,
  HelpCircle,
  Eye,
  EyeOff,
  Filter,
  Layers,
  ChevronDown,
  Award,
  Clock,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { FacultyProfile, UserRole } from '../types';
import { FACULTY_CLASS_RISKS } from '../data/mockAcademicData';

interface FacultyDashboardViewProps {
  facultyProfile: FacultyProfile;
  onOpenEditProfile: () => void;
}

export const FacultyDashboardView: React.FC<FacultyDashboardViewProps> = ({
  facultyProfile,
  onOpenEditProfile
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(
    facultyProfile.handlingSubjects[0] || 'Database Management Systems (CS3492)'
  );
  const [paperType, setPaperType] = useState<'semester' | 'internal' | 'mcq' | 'viva' | 'unit_bank'>('semester');
  const [selectedUnits, setSelectedUnits] = useState<number[]>([1, 2, 3, 4, 5]);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [bloomsTaxonomy, setBloomsTaxonomy] = useState<string>('All Levels (K1 - K4)');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [showAnswerKeys, setShowAnswerKeys] = useState<boolean>(true);

  const [isGeneratingPaper, setIsGeneratingPaper] = useState<boolean>(false);
  const [generatedPaper, setGeneratedPaper] = useState<any>(null);
  const [copyStatus, setCopyStatus] = useState<string>('');
  const [savedQuestionBank, setSavedQuestionBank] = useState<any[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'generator' | 'risk_queue' | 'question_bank'>('generator');

  const toggleUnit = (unitNum: number) => {
    if (selectedUnits.includes(unitNum)) {
      if (selectedUnits.length > 1) {
        setSelectedUnits(selectedUnits.filter(u => u !== unitNum));
      }
    } else {
      setSelectedUnits([...selectedUnits, unitNum].sort());
    }
  };

  const handleGeneratePaper = async () => {
    setIsGeneratingPaper(true);
    try {
      const res = await fetch('/api/faculty/question-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: selectedSubject,
          paperType,
          units: selectedUnits,
          difficulty,
          totalMarks: paperType === 'internal' ? 50 : (paperType === 'mcq' ? 30 : 100),
          bloomsTaxonomy,
          specialInstructions,
          examinerName: `${facultyProfile.name} (${facultyProfile.designation})`,
          department: facultyProfile.department
        })
      });
      const data = await res.json();
      setGeneratedPaper(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPaper(false);
    }
  };

  const handleCopyPaper = () => {
    if (!generatedPaper) return;
    const text = JSON.stringify(generatedPaper, null, 2);
    navigator.clipboard.writeText(text);
    setCopyStatus('Copied to clipboard!');
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const handleSaveToQuestionBank = () => {
    if (!generatedPaper) return;
    setSavedQuestionBank(prev => [generatedPaper, ...prev]);
    setCopyStatus('Added to Department Question Bank!');
    setTimeout(() => setCopyStatus(''), 2500);
  };

  const handlePrintPaper = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Faculty Profile Banner & Details Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl border border-emerald-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-emerald-500/30 shrink-0">
              {facultyProfile.name.replace('Dr. ', '').charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  {facultyProfile.department} Department • ID: {facultyProfile.facultyId}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {facultyProfile.experienceYears}+ Yrs Academic Experience
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {facultyProfile.name}
              </h1>
              <p className="text-emerald-200/90 text-sm mt-0.5 font-medium">
                {facultyProfile.designation} • {facultyProfile.qualification}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{facultyProfile.cabinLocation}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{facultyProfile.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{facultyProfile.officeHours}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onOpenEditProfile}
              id="edit-faculty-profile-btn"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-xs"
            >
              <Edit3 className="w-4 h-4 text-emerald-300" />
              <span>Modify Faculty Details</span>
            </button>
          </div>
        </div>

        {/* Handling Subjects Chips */}
        <div className="mt-6 pt-5 border-t border-emerald-800/60 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-2">Allocated Courses:</span>
          {facultyProfile.handlingSubjects.map((sub, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 text-slate-200 text-xs rounded-full font-medium"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('generator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'generator'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Question & Paper Generator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('risk_queue')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'risk_queue'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>Early Academic Risk Detection ({FACULTY_CLASS_RISKS.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('question_bank')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeSubTab === 'question_bank'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Question Bank Archive ({savedQuestionBank.length})</span>
        </button>
      </div>

      {/* SUB-TAB 1: AI QUESTION & PAPER GENERATOR */}
      {activeSubTab === 'generator' && (
        <div className="space-y-6">
          {/* Controls Panel */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-black text-slate-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>University Examination Question Generator</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Generate autonomous university-standard semester papers, internal tests (CIA), objective MCQs, or Viva Voce sets mapped to Course Outcomes & Bloom's Taxonomy.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Examiner:</span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {facultyProfile.name}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Subject Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Subject / Course
                </label>
                <select
                  value={selectedSubject}
                  onChange={e => setSelectedSubject(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                >
                  {facultyProfile.handlingSubjects.map((sub, i) => (
                    <option key={i} value={sub}>
                      {sub}
                    </option>
                  ))}
                  <option value="Computer Networks & Protocols (CS3591)">Computer Networks & Protocols (CS3591)</option>
                  <option value="Theory of Computation & Automata (CS3401)">Theory of Computation & Automata (CS3401)</option>
                  <option value="Artificial Intelligence & Machine Learning (AI3402)">AI & Machine Learning (AI3402)</option>
                </select>
              </div>

              {/* Paper Format */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Examination Format
                </label>
                <select
                  value={paperType}
                  onChange={e => setPaperType(e.target.value as any)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                >
                  <option value="semester">Full Semester Examination (100 Marks - Part A, B, C)</option>
                  <option value="internal">Continuous Internal Assessment - CIA (50 Marks)</option>
                  <option value="mcq">Objective Multiple Choice Assessment (30 Marks with Keys)</option>
                  <option value="viva">Oral Viva Voce Question Bank (With Rubrics)</option>
                </select>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Cognitive Rigor & Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as any)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                >
                  <option value="Easy">Foundational (Conceptual & Definitions)</option>
                  <option value="Medium">University Standard (Derivations & Standard Problems)</option>
                  <option value="Hard">Advanced / GATE Level (Analytical & Edge Cases)</option>
                </select>
              </div>
            </div>

            {/* Units Selection Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Target Syllabus Units
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4, 5].map(unitNum => {
                  const isSelected = selectedUnits.includes(unitNum);
                  return (
                    <button
                      type="button"
                      key={unitNum}
                      onClick={() => toggleUnit(unitNum)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      Unit {unitNum} {isSelected ? '✓' : '+'}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setSelectedUnits([1, 2, 3, 4, 5])}
                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline"
                >
                  Select All
                </button>
              </div>
            </div>

            {/* Bloom's Focus & Special Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Bloom's Taxonomy Focus
                </label>
                <select
                  value={bloomsTaxonomy}
                  onChange={e => setBloomsTaxonomy(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                >
                  <option value="All Levels (K1 - K4)">Balanced OBE Distribution (K1, K2, K3, K4)</option>
                  <option value="Higher Order Thinking (K3/K4)">Higher Order Analytical (K3: Apply, K4: Analyze)</option>
                  <option value="Evaluation & Synthesis (K5/K6)">Evaluation & Design (K5: Evaluate, K6: Create)</option>
                  <option value="Conceptual Recall (K1/K2)">Conceptual Recall & Comprehension (K1: Remember, K2: Understand)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Special Examiner Instructions / Keywords
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={e => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Include BCNF decomposition numerical, Banker's algorithm matrix problem"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center space-x-3 text-xs text-slate-600">
                <button
                  type="button"
                  onClick={() => setShowAnswerKeys(!showAnswerKeys)}
                  className="flex items-center space-x-1.5 font-semibold text-slate-700 hover:text-emerald-700"
                >
                  {showAnswerKeys ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  <span>{showAnswerKeys ? 'Solution Keys: Visible' : 'Solution Keys: Hidden'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleGeneratePaper}
                  disabled={isGeneratingPaper}
                  id="generate-questions-btn"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 flex items-center space-x-2 transition-all active:scale-95"
                >
                  {isGeneratingPaper ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Examination Questions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate University Question Paper</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* GENERATED QUESTION PAPER DISPLAY */}
          {generatedPaper ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Paper Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    {generatedPaper.paperType?.toUpperCase() || 'EXAMINATION'}
                  </span>
                  <span className="text-slate-500 font-medium">
                    Total Marks: <strong className="text-slate-900">{generatedPaper.totalMarks}</strong> • Time: <strong className="text-slate-900">{generatedPaper.durationHours} Hours</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {copyStatus && (
                    <span className="text-xs font-bold text-emerald-600 animate-in fade-in mr-2">
                      {copyStatus}
                    </span>
                  )}
                  <button
                    onClick={handleCopyPaper}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </button>
                  <button
                    onClick={handleSaveToQuestionBank}
                    className="px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Save to Question Bank</span>
                  </button>
                  <button
                    onClick={handlePrintPaper}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Paper</span>
                  </button>
                </div>
              </div>

              {/* University Exam Paper Body Header */}
              <div className="text-center pb-6 border-b border-slate-300 space-y-1">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-950 uppercase tracking-wide">
                  {generatedPaper.paperTitle}
                </h3>
                <p className="text-xs font-bold text-slate-700">
                  Course: {generatedPaper.courseCodeAndName || selectedSubject}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-600 pt-1 font-serif">
                  <span>Department: {generatedPaper.department || facultyProfile.department}</span>
                  <span>•</span>
                  <span>Examiner: {generatedPaper.examiner || facultyProfile.name}</span>
                  <span>•</span>
                  <span>Max Marks: {generatedPaper.totalMarks}</span>
                </div>
              </div>

              {/* Course Outcomes Table */}
              {generatedPaper.courseOutcomes && generatedPaper.courseOutcomes.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                    Course Outcomes (CO) Addressed:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {generatedPaper.courseOutcomes.map((co: any, i: number) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px]">
                          {co.code}
                        </span>
                        <span>{co.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 1. MCQ MODE */}
              {generatedPaper.mcqs && generatedPaper.mcqs.length > 0 && (
                <div className="space-y-4">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
                    Multiple Choice Questions ({generatedPaper.mcqs.length} Questions)
                  </div>
                  <div className="space-y-4">
                    {generatedPaper.mcqs.map((q: any) => (
                      <div key={q.qNo} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="flex justify-between items-start font-medium text-slate-900">
                          <span><strong>{q.qNo}.</strong> {q.question}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 text-slate-700 rounded ml-2 shrink-0">
                            {q.bloomsLevel} • {q.co}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-4">
                          {q.options.map((opt: string, optIdx: number) => (
                            <div
                              key={optIdx}
                              className={`p-2 rounded-lg border text-xs ${
                                showAnswerKeys && opt === q.correctOption
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                        {showAnswerKeys && q.explanation && (
                          <div className="mt-2 p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-emerald-900 text-[11px]">
                            <strong>Answer & Rationale:</strong> {q.correctOption}. {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. VIVA VOCE MODE */}
              {generatedPaper.vivaQuestions && generatedPaper.vivaQuestions.length > 0 && (
                <div className="space-y-4">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
                    Viva-Voce Oral Examination Assessment
                  </div>
                  <div className="space-y-4">
                    {generatedPaper.vivaQuestions.map((v: any) => (
                      <div key={v.qNo} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-slate-900 text-sm">
                            Question {v.qNo}: {v.question}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded ml-2 shrink-0">
                            {v.bloomsLevel} • {v.co}
                          </span>
                        </div>
                        {showAnswerKeys && (
                          <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                            <div className="text-slate-800">
                              <strong className="text-emerald-700">Ideal Student Answer:</strong> {v.idealResponse}
                            </div>
                            <div className="flex flex-wrap gap-1.5 items-center">
                              <span className="text-[11px] font-bold text-slate-500">Key Terms to Verify:</span>
                              {v.expectedKeywords?.map((kw: string, i: number) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-semibold">
                                  {kw}
                                </span>
                              ))}
                            </div>
                            <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                              <strong>Examiner Scoring Rubric:</strong> {v.rubric}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. PART A: 2-MARK QUESTIONS */}
              {generatedPaper.partA && generatedPaper.partA.length > 0 && (
                <div className="space-y-3">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1 flex justify-between">
                    <span>PART A — ({generatedPaper.partA.length} × 2 = {generatedPaper.partA.length * 2} Marks) [Answer All Questions]</span>
                    <span className="text-slate-500 font-normal">Course Outcome & Bloom's Level</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {generatedPaper.partA.map((q: any) => (
                      <div key={q.qNo} className="py-2.5 text-xs text-slate-800">
                        <div className="flex justify-between items-start gap-4">
                          <span>
                            <strong>{q.qNo}.</strong> {q.text}
                          </span>
                          <div className="flex items-center space-x-2 shrink-0">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                              {q.bloomsLevel || 'K1'}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded">
                              {q.co || 'CO1'}
                            </span>
                            <span className="font-mono text-slate-600 font-bold">({q.marks || 2})</span>
                          </div>
                        </div>

                        {showAnswerKeys && q.modelAnswer && (
                          <div className="mt-2 ml-4 p-2.5 bg-emerald-50/60 border border-emerald-100 rounded-lg text-[11px] text-emerald-950 leading-relaxed">
                            <strong className="text-emerald-800">Model Answer / Key:</strong> {q.modelAnswer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. PART B: 13 / 16-MARK QUESTIONS (EITHER / OR) */}
              {generatedPaper.partB && generatedPaper.partB.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
                    PART B — (Answer All Questions — Either / Or Choice)
                  </div>
                  <div className="space-y-6">
                    {generatedPaper.partB.map((q: any) => (
                      <div key={q.qNo} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                        <div className="font-bold text-slate-900 flex justify-between border-b border-slate-200 pb-1">
                          <span>Question {q.qNo}</span>
                          <span className="font-mono text-slate-600">({q.choiceA?.marks || 16} Marks)</span>
                        </div>

                        {/* Choice A */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-indigo-700">(a)</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded">
                              {q.choiceA?.bloomsLevel || 'K3'} • {q.choiceA?.co || 'CO2'}
                            </span>
                          </div>
                          <p className="text-slate-800 whitespace-pre-line pl-4 font-serif">
                            {q.choiceA?.text || q.text}
                          </p>
                          {showAnswerKeys && q.choiceA?.solutionSummary && (
                            <div className="ml-4 p-2 bg-emerald-50 rounded border border-emerald-100 text-[11px] text-emerald-900">
                              <strong>Marking Scheme & Steps:</strong> {q.choiceA.solutionSummary}
                            </div>
                          )}
                        </div>

                        {/* OR Divider */}
                        {q.choiceB && (
                          <>
                            <div className="text-center font-bold text-slate-500 uppercase tracking-widest text-[11px]">
                              [OR]
                            </div>

                            {/* Choice B */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-indigo-700">(b)</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded">
                                  {q.choiceB?.bloomsLevel || 'K4'} • {q.choiceB?.co || 'CO2'}
                                </span>
                              </div>
                              <p className="text-slate-800 whitespace-pre-line pl-4 font-serif">
                                {q.choiceB?.text}
                              </p>
                              {showAnswerKeys && q.choiceB?.solutionSummary && (
                                <div className="ml-4 p-2 bg-emerald-50 rounded border border-emerald-100 text-[11px] text-emerald-900">
                                  <strong>Marking Scheme & Steps:</strong> {q.choiceB.solutionSummary}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. PART C: APPLICATION / SYSTEM DESIGN */}
              {generatedPaper.partC && generatedPaper.partC.length > 0 && (
                <div className="space-y-3 pt-4">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
                    PART C — (1 × 15 = 15 Marks) [Application / System Design Case Study]
                  </div>
                  {generatedPaper.partC.map((q: any) => (
                    <div key={q.qNo} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-900">
                          {q.qNo}. Case Study Problem
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded font-bold">
                            {q.bloomsLevel || 'K5/K6'}
                          </span>
                          <span className="font-mono font-bold text-slate-600">({q.marks || 15})</span>
                        </div>
                      </div>
                      <p className="text-slate-800 whitespace-pre-line font-serif pl-2">
                        {q.text}
                      </p>
                      {showAnswerKeys && q.modelAnswer && (
                        <div className="mt-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-950">
                          <strong>Evaluation Architecture:</strong> {q.modelAnswer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Empty State Prompt */
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
              <Sparkles className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                Ready to Generate University Questions
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Configure the subject, examination format, unit selection, and cognitive levels above, then click <strong>Generate University Question Paper</strong>.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: EARLY ACADEMIC RISK DETECTION */}
      {activeSubTab === 'risk_queue' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Early Academic Risk Detection & Intervention Queue
                  </h2>
                  <p className="text-xs text-slate-500">
                    EduMind flags students before semester exams when downward score trajectories or misconception accumulations are detected.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Roll Number</th>
                    <th className="p-3">Score Trajectory</th>
                    <th className="p-3">Primary Concept Gap</th>
                    <th className="p-3">Attendance</th>
                    <th className="p-3">AI Intervention Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {FACULTY_CLASS_RISKS.map(student => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{student.name}</td>
                      <td className="p-3 font-mono text-slate-600">{student.rollNumber}</td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-rose-600">{student.scoreTrend}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold">
                          {student.weakestTopic}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-700">{student.attendance}%</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: QUESTION BANK ARCHIVE */}
      {activeSubTab === 'question_bank' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Department Question Bank Archive</span>
              </h2>
              <p className="text-xs text-slate-500">
                Archived question sets curated by {facultyProfile.name} for future internal assessments and term tests.
              </p>
            </div>
          </div>

          {savedQuestionBank.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No saved papers in archive yet. Generate a question paper and click <strong>"Save to Question Bank"</strong> to store it here.
            </div>
          ) : (
            <div className="space-y-4">
              {savedQuestionBank.map((paper, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-start font-bold text-slate-900">
                    <span>{paper.paperTitle}</span>
                    <span className="text-[11px] font-mono text-emerald-700">{paper.totalMarks} Marks</span>
                  </div>
                  <p className="text-slate-600">
                    Subject: {paper.courseCodeAndName || paper.subject} • Format: {paper.paperType}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
