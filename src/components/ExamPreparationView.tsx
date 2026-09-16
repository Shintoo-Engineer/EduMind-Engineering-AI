import React, { useState } from 'react';
import {
  Calendar,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ExamStudyDay } from '../types';
import { EXAM_STUDY_PLAN } from '../data/mockAcademicData';

export const ExamPreparationView: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('Database Management Systems');
  const [studyPlan, setStudyPlan] = useState<ExamStudyDay[]>(EXAM_STUDY_PLAN);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const activeDay = studyPlan.find(d => d.dayNumber === selectedDay) || studyPlan[0];

  const toggleDayCompletion = (dayNum: number) => {
    setStudyPlan(prev =>
      prev.map(d => (d.dayNumber === dayNum ? { ...d, completed: !d.completed } : d))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>14-Day University Semester Exam Engine</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Exam Readiness & Timetable Planner
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Anna University / State Technical Board patterns, high-frequency question trends, 13 & 16-mark answer templates, and dynamic study timetable.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
          >
            <option value="Database Management Systems">CS3492 • DBMS (Exam in 14 Days)</option>
            <option value="Operating Systems">CS3451 • Operating Systems</option>
            <option value="Computer Networks">CS3591 • Computer Networks</option>
          </select>
        </div>
      </div>

      {/* Exam Readiness Multi-Metric Score Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {selectedSubject} Readiness Calculation
            </span>
            <h2 className="text-2xl font-black text-white mt-1">Total Exam Readiness: 76%</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Based on your continuous quiz accuracy, RAG note coverage, and resolved mistake items.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/90 px-4 py-3 rounded-xl border border-slate-700/80">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg">
              B+
            </div>
            <div>
              <div className="text-xs text-slate-400">Predicted University Grade</div>
              <div className="text-sm font-bold text-white">Target: A+ / O Grade (90%+)</div>
            </div>
          </div>
        </div>

        {/* 5 Readiness Sub-Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 text-xs">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Concept Knowledge</span>
            <span className="text-xl font-bold text-white">82%</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Quiz Accuracy</span>
            <span className="text-xl font-bold text-white">74%</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Revision Completed</span>
            <span className="text-xl font-bold text-white">68%</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Previous Papers</span>
            <span className="text-xl font-bold text-emerald-400">81%</span>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Weak Topics Cleared</span>
            <span className="text-xl font-bold text-amber-400">61% (At Risk)</span>
          </div>
        </div>
      </div>

      {/* 14-Day Calendar & Daily Study Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Days List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            14-Day Dynamic Roadmap
          </h3>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {studyPlan.map(day => (
              <div
                key={day.dayNumber}
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs flex items-center justify-between ${
                  selectedDay === day.dayNumber
                    ? 'bg-indigo-50 border-indigo-500 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                    day.completed
                      ? 'bg-emerald-100 text-emerald-700'
                      : day.isHighRisk
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    D{day.dayNumber}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900">{day.topic}</div>
                    <div className="text-[11px] text-slate-400">{day.recommendedMinutes} mins plan</div>
                  </div>
                </div>

                {day.isHighRisk && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold text-[10px]">
                    High Weightage
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Day Details & Exam Strategy */}
        <div className="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Day {activeDay.dayNumber} Focus Plan
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{activeDay.topic}</h3>
              <p className="text-xs text-slate-500">
                Recommended Study Target: {activeDay.recommendedMinutes} minutes
              </p>
            </div>

            <button
              onClick={() => toggleDayCompletion(activeDay.dayNumber)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                activeDay.completed
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{activeDay.completed ? 'Marked Completed' : 'Mark as Done'}</span>
            </button>
          </div>

          {/* Subtopics Checklist */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-900 block">Required Learning Objectives:</span>
            <div className="space-y-2">
              {activeDay.subtopics.map((sub, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 13 & 16-Mark Answer Blueprint */}
          <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-200 text-xs space-y-2">
            <div className="font-bold text-indigo-950 flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>University 13/16 Mark Writing Formula for this Topic</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              1. <strong>Formal Definition & Necessity (2 marks)</strong><br />
              2. <strong>Neat Labeled Architecture / Schema Diagram (3 marks)</strong><br />
              3. <strong>Step-by-Step Derivation or State Transitions (5 marks)</strong><br />
              4. <strong>Concrete Numerical / Real-World Table Example (4 marks)</strong><br />
              5. <strong>Merits & Demerits Comparison Table (2 marks)</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
