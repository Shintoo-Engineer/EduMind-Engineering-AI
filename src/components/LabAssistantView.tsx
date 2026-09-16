import React, { useState } from 'react';
import {
  FlaskConical,
  BookOpen,
  Code,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Play,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { LabExperiment } from '../types';
import { LAB_EXPERIMENTS } from '../data/mockAcademicData';

export const LabAssistantView: React.FC = () => {
  const [selectedLabId, setSelectedLabId] = useState<string>(LAB_EXPERIMENTS[0].id);
  const [activeTab, setActiveTab] = useState<'procedure' | 'code' | 'troubleshooting' | 'viva'>('procedure');

  const selectedLab = LAB_EXPERIMENTS.find(l => l.id === selectedLabId) || LAB_EXPERIMENTS[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>Practical Engineering Laboratory Assistant</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            AI Lab Assistant & Experiment Manual
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Step-by-step procedures, circuit/code implementation, expected outputs, common runtime bugs, and viva questions.
          </p>
        </div>
      </div>

      {/* Main Grid: Experiment Selector on Left, Experiment Guide on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Experiments List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available Laboratory Experiments
          </h2>

          <div className="space-y-2">
            {LAB_EXPERIMENTS.map(exp => (
              <div
                key={exp.id}
                onClick={() => setSelectedLabId(exp.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-xs ${
                  selectedLabId === exp.id
                    ? 'bg-indigo-50/80 border-indigo-400 text-slate-900 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {exp.labName}
                  </span>
                  <span className="text-[10px] text-slate-400">{exp.department}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-1.5 leading-snug">
                  {exp.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Experiment Interactive Walkthrough */}
        <div className="lg:col-span-2 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          {/* Experiment Title & Objective */}
          <div className="pb-4 border-b border-slate-100 space-y-1.5">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
              {selectedLab.labName} • Exp #{selectedLab.id.split('-')[1]}
            </span>
            <h2 className="text-xl font-black text-slate-900">{selectedLab.title}</h2>
            <p className="text-xs text-slate-500">
              <strong>Objective:</strong> {selectedLab.objective}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('procedure')}
              className={`py-2 px-3 border-b-2 transition-all ${
                activeTab === 'procedure'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Step-by-Step Procedure
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`py-2 px-3 border-b-2 transition-all ${
                activeTab === 'code'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Code / Query & Expected Output
            </button>
            <button
              onClick={() => setActiveTab('troubleshooting')}
              className={`py-2 px-3 border-b-2 transition-all ${
                activeTab === 'troubleshooting'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Common Lab Errors
            </button>
            <button
              onClick={() => setActiveTab('viva')}
              className={`py-2 px-3 border-b-2 transition-all ${
                activeTab === 'viva'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Lab Viva Q&A
            </button>
          </div>

          {/* Tab Content: Procedure */}
          {activeTab === 'procedure' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Theoretical Background:</span>
                <p className="text-slate-600 leading-relaxed">{selectedLab.theory}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Procedure Steps:</span>
                {selectedLab.procedure.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-white rounded-xl border border-slate-200">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Code / Expected Output */}
          {activeTab === 'code' && (
            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-900 block mb-1.5">Implementation Script:</span>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed">
                  {selectedLab.codeOrCircuitDiagram}
                </pre>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1.5">Expected Terminal / Console Output:</span>
                <div className="p-3 bg-slate-950 text-emerald-400 rounded-xl border border-slate-800 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedLab.expectedOutput}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Troubleshooting */}
          {activeTab === 'troubleshooting' && (
            <div className="space-y-3 text-xs">
              <span className="font-bold text-slate-900 block">Frequently Encountered Lab Errors & Fixes:</span>
              {selectedLab.troubleshootingTips.map((err, idx) => (
                <div key={idx} className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-amber-950 space-y-1">
                  <div className="font-bold flex items-center space-x-1.5 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Pitfall #{idx + 1}</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">{err}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Lab Viva Q&A */}
          {activeTab === 'viva' && (
            <div className="space-y-3 text-xs">
              <span className="font-bold text-slate-900 block">High-Frequency Lab Examiner Viva Questions:</span>
              {selectedLab.vivaQuestions.map((q, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-indigo-700 block">Q{idx + 1}: {q.q}</span>
                  <p className="text-slate-600 leading-relaxed">
                    <strong>Model Answer:</strong> {q.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
