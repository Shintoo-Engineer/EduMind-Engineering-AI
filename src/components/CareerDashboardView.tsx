import React, { useState } from 'react';
import {
  Briefcase,
  Target,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  TrendingUp,
  ArrowRight,
  Code
} from 'lucide-react';
import { ResumeAnalysis } from '../types';

export const CareerDashboardView: React.FC = () => {
  const [targetRole, setTargetRole] = useState<string>('Software Development Engineer (SDE 1)');
  const [resumeText, setResumeText] = useState<string>(
    `Arun V - B.E. Computer Science and Engineering (CGPA: 8.1)
Skills: Python, C++, Java, React, SQL, Git, Linux
Projects:
1. Zero-Knowledge Biometric Attendance - Built with React, Python and PyTorch.
2. College Library Management System - Developed with Node.js and MongoDB.
Coursework: DBMS, Operating Systems, Computer Networks, Data Structures.`
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>({
    atsScore: 78,
    technicalSkillsScore: 82,
    projectQualityScore: 74,
    achievementsScore: 68,
    formattingScore: 88,
    criticalFeedback: [
      'Project descriptions lack measurable metrics (e.g. "Reduced query latency by 45%", "Handled 10,000 requests/sec").',
      'Missing modern production tools: Docker, CI/CD, Unit Testing (Jest/PyTest).',
      'Include live project URLs and GitHub links with good README documentation.'
    ],
    recommendedAdditions: [
      'Action Verb + Task + Quantified Impact pattern for all bullet points',
      'Highlight Distributed Systems and Indexing in DBMS project description'
    ]
  });

  const handleAnalyzeResume = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole })
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Campus Placements & Skill Gap Roadmap</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            AI Placement & Career Intelligence
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Bridges academic coursework to real-world corporate hiring with role skill-gap analysis, ATS resume evaluation, and mock interview questions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={targetRole}
            onChange={e => setTargetRole(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
          >
            <option value="Software Development Engineer (SDE 1)">Software Developer (SDE 1)</option>
            <option value="Data Scientist / AI Engineer">AI / ML Engineer</option>
            <option value="DevOps & Cloud Engineer">Cloud & DevOps Engineer</option>
            <option value="Embedded Systems Engineer">Embedded Systems (ECE)</option>
          </select>
        </div>
      </div>

      {/* Target Role Skill Gap Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Skill Gap for: <span className="text-indigo-600">{targetRole}</span>
            </h2>
            <p className="text-xs text-slate-500">
              EduMind cross-references your academic transcript and projects against job descriptions from Google, Microsoft, Amazon & Zoho.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
            68% Match
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Mastered Skills */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Skills Acquired & Verified</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Data Structures', 'Python & C++', 'Relational DBMS', 'SQL Queries', 'Operating Systems'].map((s, i) => (
                <span key={i} className="px-2.5 py-1 bg-white text-emerald-950 font-medium rounded-lg border border-emerald-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Missing High-Demand Skills</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Docker Containers', 'System Design Fundamentals', 'Unit Testing (CI/CD)', 'Redis Caching'].map((s, i) => (
                <span key={i} className="px-2.5 py-1 bg-white text-amber-950 font-medium rounded-lg border border-amber-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Placement Interview Focus */}
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Placement Round Breakdown</span>
            </div>
            <div className="space-y-1 text-slate-700">
              <div>• <strong>Round 1:</strong> Online Aptitude & DSA</div>
              <div>• <strong>Round 2:</strong> Core CS (OS, DBMS, Networks)</div>
              <div>• <strong>Round 3:</strong> Project Deep Dive & Viva</div>
              <div>• <strong>Round 4:</strong> HR & Behavioral Fit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume ATS Analyzer */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>ATS Resume Evaluator & Measurable Impact Optimizer</span>
            </h2>
            <p className="text-xs text-slate-500">
              Analyzes engineering resumes for ATS parser pass rates and technical depth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resume Text Input */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-slate-700 block">Resume Markdown / Text:</span>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              rows={10}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-mono text-xs focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleAnalyzeResume}
              disabled={isLoading}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-xs flex items-center space-x-1.5"
            >
              {isLoading ? <span>Analyzing ATS...</span> : <span>Run ATS Evaluation</span>}
            </button>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-4 text-xs">
              {/* Score Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-400">ATS Score</div>
                  <div className="text-xl font-black text-indigo-600 mt-0.5">{analysis.atsScore}%</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-400">Tech Score</div>
                  <div className="text-xl font-black text-emerald-600 mt-0.5">{analysis.technicalSkillsScore}%</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-[11px] text-slate-400">Project Quality</div>
                  <div className="text-xl font-black text-amber-600 mt-0.5">{analysis.projectQualityScore}%</div>
                </div>
              </div>

              {/* Critical Feedback */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 space-y-2">
                <span className="font-bold text-amber-900 block">Key ATS Suggestions:</span>
                <ul className="space-y-1 text-slate-700">
                  {analysis.criticalFeedback.map((fb, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-600 font-bold mt-0.5">!</span>
                      <span>{fb}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
