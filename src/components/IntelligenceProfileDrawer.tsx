import React from 'react';
import {
  X,
  User,
  GraduationCap,
  Briefcase,
  Code,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Award,
  BookOpen,
  Target,
  Sparkles,
  TrendingUp,
  Clock,
  Edit3,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { StudentIntelligenceProfile } from '../types';

interface IntelligenceProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentIntelligenceProfile;
  onSelectTopicAction?: (topic: string) => void;
  onOpenEditProfile?: () => void;
}

export const IntelligenceProfileDrawer: React.FC<IntelligenceProfileDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onSelectTopicAction,
  onOpenEditProfile
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-slate-900 text-slate-100 shadow-2xl border-l border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-indigo-500/30">
                {profile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-white">{profile.name}</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                    {profile.department} • Sem {profile.semester}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Roll: {profile.rollNumber} • CGPA: {profile.cgpa} (Target: {profile.targetCgpa || 8.8})</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {onOpenEditProfile && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenEditProfile();
                  }}
                  id="drawer-edit-profile-btn"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-xs flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>CGPA</span>
                </div>
                <div className="text-xl font-bold text-white mt-1">{profile.cgpa}</div>
                <div className="text-[10px] text-emerald-400">Top 15% in Dept</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-xs flex items-center space-x-1">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Placement</span>
                </div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{profile.placementReadiness}%</div>
                <div className="text-[10px] text-slate-400">Readiness Score</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-xs flex items-center space-x-1">
                  <Code className="w-3.5 h-3.5 text-blue-400" />
                  <span>Coding</span>
                </div>
                <div className="text-base font-bold text-blue-300 mt-1">{profile.codingLevel}</div>
                <div className="text-[10px] text-slate-400">{profile.projectsCount} Projects Done</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-xs flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Attendance</span>
                </div>
                <div className="text-xl font-bold text-amber-300 mt-1">{profile.attendancePercent}%</div>
                <div className="text-[10px] text-emerald-400">Regular Eligibility</div>
              </div>
            </div>

            {/* AI Core Intelligence Loop Diagram */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs">
              <div className="flex items-center space-x-2 text-indigo-300 font-semibold mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Continuously Updated Intelligence Profile</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                EduMind monitors quiz answers, lab code, oral viva simulations, and lecture notes to dynamically recalculate your strengths and misconceptions.
              </p>
            </div>

            {/* Academics: Strong vs Weak */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Academic Mastery & Weak Topics</span>
              </h3>

              {/* Strong Topics */}
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Strong Topics</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.strongTopics.map((topic, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Weak Topics */}
              <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Identified Weaknesses & High-Risk Areas</span>
                  </div>
                  <span className="text-[10px] text-amber-300/80">Priority Intervention</span>
                </div>
                <div className="space-y-2">
                  {profile.weakTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-slate-900/80 rounded-lg border border-amber-500/20 flex items-center justify-between text-xs"
                    >
                      <span className="text-amber-200 font-medium">{topic}</span>
                      {onSelectTopicAction && (
                        <button
                          onClick={() => {
                            onSelectTopicAction(topic);
                            onClose();
                          }}
                          className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] rounded transition-colors font-medium"
                        >
                          Revise with AI →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Career & Target Role */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Target Career & Placement Alignment</span>
              </h3>
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Target Role:</span>
                  <span className="font-semibold text-white bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                    {profile.targetRole}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1.5">Target Companies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.targetCompanies.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded text-xs border border-slate-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-bold text-indigo-400 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Actionable AI Recommendations</span>
              </h3>
              <div className="space-y-2">
                {profile.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-300 flex items-start space-x-2.5"
                  >
                    <span className="text-indigo-400 font-bold mt-0.5">→</span>
                    <span className="leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges Earned */}
            <div className="space-y-3 pb-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400 flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Earned Achievements</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {profile.badges.map(b => (
                  <div key={b.id} className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center space-x-2.5">
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-white">{b.title}</div>
                      <div className="text-[10px] text-slate-400">{b.category} • {b.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
