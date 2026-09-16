import React from 'react';
import {
  Sparkles,
  BookOpen,
  Code,
  Target,
  Rocket,
  AlertTriangle,
  ArrowUpRight,
  HelpCircle,
  Brain,
  Mic,
  FileText,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { StudentIntelligenceProfile, Subject, Department } from '../types';

interface StudentDashboardProps {
  profile: StudentIntelligenceProfile;
  subjects: Subject[];
  onSelectTab: (tab: string, contextSubject?: string) => void;
  onOpenProfile: () => void;
  onStartRemediation: (topic: string) => void;
  onOpenEditProfile?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  subjects,
  onSelectTab,
  onOpenProfile,
  onStartRemediation,
  onOpenEditProfile
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Greeting & Overall Learning Score */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <span>{profile.department} Department • Semester {profile.semester}</span>
              <span>•</span>
              <span className="flex items-center text-amber-400">
                <Flame className="w-3.5 h-3.5 mr-0.5 fill-amber-400" />
                {profile.studyStreakDays} Day Streak
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Good Morning, {profile.name.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              EduMind has analyzed your latest quiz submissions, lab reports, and exam dates. Here is your continuously updated academic intelligence overview.
            </p>
          </div>

          {/* Overall Learning Score Circle / Metric */}
          <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-xs">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-500"
                  strokeDasharray={`${profile.overallLearningScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute font-black text-lg text-white">
                {profile.overallLearningScore}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Overall Learning Score</div>
              <div className="text-sm font-bold text-indigo-300">Level {profile.level} Scholar</div>
              <div className="flex items-center space-x-3 mt-1">
                <button
                  onClick={onOpenProfile}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center font-medium"
                >
                  View Profile →
                </button>
                {onOpenEditProfile && (
                  <button
                    onClick={onOpenEditProfile}
                    className="text-[11px] text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-center font-medium transition-colors"
                  >
                    Edit Details
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillar Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Academic Progress</span>
            </div>
            <div className="text-xl font-bold text-white">{profile.academicProgress}%</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">CGPA {profile.cgpa}</div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
              <Code className="w-4 h-4 text-blue-400" />
              <span>Technical Skills</span>
            </div>
            <div className="text-xl font-bold text-white">{profile.technicalSkillsScore}%</div>
            <div className="text-[11px] text-blue-300 mt-0.5">{profile.codingLevel} Coding</div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Placement Readiness</span>
            </div>
            <div className="text-xl font-bold text-emerald-400">{profile.placementReadiness}%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{profile.targetRole.split(' ')[0]} Track</div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-slate-400 text-xs mb-1">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span>Projects Track</span>
            </div>
            <div className="text-xl font-bold text-white">80%</div>
            <div className="text-[11px] text-purple-300 mt-0.5">{profile.projectsCount} Active Projects</div>
          </div>
        </div>
      </div>

      {/* AI Intervention / Urgent Recommendation Banner */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                AI Intelligence Recommendation
              </span>
              <span className="px-2 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded-full font-semibold">
                High Priority
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white mt-0.5">
              Focus on Normalization & BCNF in Database Management Systems today.
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Detected 4 repeated mistakes regarding candidate keys. Exam in 14 days. Estimated study time: 45 minutes.
            </p>
          </div>
        </div>
        <button
          onClick={() => onStartRemediation('Normalization')}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shrink-0 active:scale-95"
        >
          Start 45m Remediation →
        </button>
      </div>

      {/* Quick Launch Engine Hub */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span>7 Major AI Engines</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-xs">
          <button
            onClick={() => onSelectTab('tutor')}
            className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900">AI Tutor</div>
            <div className="text-[10px] text-slate-500">Adaptive Q&A</div>
          </button>

          <button
            onClick={() => onSelectTab('rag')}
            className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900">College RAG</div>
            <div className="text-[10px] text-slate-500">Lecture Notes</div>
          </button>

          <button
            onClick={() => onSelectTab('quiz')}
            className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900">Adaptive Quiz</div>
            <div className="text-[10px] text-slate-500">Dynamic Testing</div>
          </button>

          <button
            onClick={() => onSelectTab('coding')}
            className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Code className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900">Coding Mentor</div>
            <div className="text-[10px] text-slate-500">Socratic Debug</div>
          </button>

          <button
            onClick={() => onSelectTab('viva')}
            className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Mic className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900">Viva Simulator</div>
            <div className="text-[10px] text-slate-500">Oral Exams</div>
          </button>

          <button
            onClick={() => onSelectTab('exam')}
            className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900">Exam Prep</div>
            <div className="text-[10px] text-slate-500">14-Day Plan</div>
          </button>

          <button
            onClick={() => onSelectTab('career')}
            className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Target className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900">Career & ATS</div>
            <div className="text-[10px] text-slate-500">Placement Path</div>
          </button>
        </div>
      </div>

      {/* My Subjects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>My Subjects ({profile.department} Semester {profile.semester})</span>
          </h2>
          <span className="text-xs text-slate-500">Showing 4 active university courses</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.filter(s => s.department === profile.department).map(subject => (
            <div
              key={subject.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-xs transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {subject.code}
                    </span>
                    <span className="text-xs text-slate-400">{subject.credits} Credits</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mt-1">{subject.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Exam Readiness</div>
                  <div className={`text-base font-black ${
                    subject.examReadinessPercent >= 75 ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {subject.examReadinessPercent}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Syllabus Covered</span>
                  <span className="font-semibold text-slate-700">{subject.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${subject.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Weak Topic Alert */}
              {subject.weakTopics.length > 0 && (
                <div className="p-2.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Focus area: <strong>{subject.weakTopics.join(', ')}</strong></span>
                  </div>
                  <button
                    onClick={() => onSelectTab('tutor', subject.name)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold text-[11px] shrink-0"
                  >
                    Ask Tutor →
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                <button
                  onClick={() => onSelectTab('tutor', subject.name)}
                  className="py-1.5 px-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-lg font-medium transition-colors text-center"
                >
                  AI Tutor
                </button>
                <button
                  onClick={() => onSelectTab('quiz', subject.name)}
                  className="py-1.5 px-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-lg font-medium transition-colors text-center"
                >
                  Practice Quiz
                </button>
                <button
                  onClick={() => onSelectTab('exam', subject.name)}
                  className="py-1.5 px-2 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-lg font-medium transition-colors text-center"
                >
                  Exam Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
