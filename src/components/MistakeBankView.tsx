import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Brain,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { MistakeEntry } from '../types';

interface MistakeBankViewProps {
  mistakes: MistakeEntry[];
  onClearMistake: (id: string) => void;
  onAskTutorRemediation: (topic: string, subtopic: string) => void;
}

export const MistakeBankView: React.FC<MistakeBankViewProps> = ({
  mistakes,
  onClearMistake,
  onAskTutorRemediation
}) => {
  const [activeRemediation, setActiveRemediation] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>Persistent Cognitive Error Analytics</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            AI Mistake Bank
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Every incorrect quiz, code bug, or viva answer becomes data. EduMind clusters repeated misconceptions to target your root weaknesses.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-rose-50 px-4 py-2.5 rounded-xl border border-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <div className="text-xs font-bold text-rose-900">
              {mistakes.filter(m => m.remediationStatus === 'Pending').length} Pending Weaknesses
            </div>
            <div className="text-[11px] text-rose-700">Clear them before the semester exam</div>
          </div>
        </div>
      </div>

      {/* Mistake Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mistakes.map(item => {
          const isRemediating = activeRemediation === item.id;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 ${
                item.remediationStatus === 'Resolved'
                  ? 'bg-slate-50 border-slate-200 opacity-80'
                  : 'bg-white border-amber-200 shadow-xs hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.subject}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      item.remediationStatus === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {item.remediationStatus}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mt-1.5">{item.topic}</h3>
                  <div className="text-xs text-amber-700 font-medium">Subtopic: {item.subtopic}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-medium">Frequency</div>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    {item.mistakeCount} Repeated
                  </span>
                </div>
              </div>

              {/* Identified Misconception */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center space-x-1.5 text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Cognitive Misconception:</span>
                </div>
                <p className="leading-relaxed text-slate-700">{item.identifiedMisconception}</p>
              </div>

              {/* Expanded Remedial Lesson */}
              {isRemediating && (
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 text-xs space-y-3">
                  <div className="flex items-center space-x-1.5 font-bold text-indigo-900">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    <span>2-Minute AI Remediation Micro-Lesson</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-indigo-100">
                    {item.remedialLesson}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onAskTutorRemediation(item.topic, item.subtopic)}
                      className="text-indigo-700 font-bold hover:underline flex items-center space-x-1"
                    >
                      <span>Ask AI Tutor for More Examples</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onClearMistake(item.id);
                        setActiveRemediation(null);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Cleared</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-400">{item.lastOccurred}</span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveRemediation(isRemediating ? null : item.id)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg font-semibold transition-colors flex items-center space-x-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isRemediating ? 'Hide Lesson' : '2-Min Remediation'}</span>
                  </button>

                  {item.remediationStatus !== 'Resolved' && (
                    <button
                      onClick={() => onClearMistake(item.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 rounded-lg font-semibold transition-colors flex items-center space-x-1"
                      title="Clear from active mistakes"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Retest / Clear</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
