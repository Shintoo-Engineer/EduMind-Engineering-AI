import React from 'react';
import {
  GraduationCap,
  Sparkles,
  User,
  Shield,
  Briefcase,
  Flame,
  Award,
  ChevronRight,
  LogOut,
  LogIn,
  Edit3,
  Building
} from 'lucide-react';
import { UserRole, StudentIntelligenceProfile, FacultyProfile, AdminProfile } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  studentProfile: StudentIntelligenceProfile;
  facultyProfile: FacultyProfile;
  adminProfile: AdminProfile;
  onOpenProfile: () => void;
  onOpenEditProfile: () => void;
  onOpenLoginModal: () => void;
  onLaunchWowDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  studentProfile,
  facultyProfile,
  adminProfile,
  onOpenProfile,
  onOpenEditProfile,
  onOpenLoginModal,
  onLaunchWowDemo
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  EduMind
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded uppercase tracking-wider">
                  Engineering AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Academic • Coding • Projects • Placements Ecosystem
              </p>
            </div>
          </div>

          {/* Center: Demo Action & Role Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Interactive Demo Loop CTA */}
            <button
              id="wow-demo-btn"
              onClick={onLaunchWowDemo}
              className="flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-lg shadow-md transition-all active:scale-95"
              title="Demonstrate the complete closed-loop Student Intelligence engine"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span className="hidden sm:inline">Interactive Wow Demo</span>
              <span className="sm:hidden">Demo Loop</span>
            </button>

            {/* Quick Role Switcher */}
            <div className="bg-slate-800/80 p-1 rounded-lg border border-slate-700 flex items-center space-x-1 text-xs">
              <button
                onClick={() => onRoleChange('student')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  currentRole === 'student'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => onRoleChange('faculty')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  currentRole === 'faculty'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={() => onRoleChange('admin')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  currentRole === 'admin'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Dedicated Role Login Modal Trigger */}
            <button
              onClick={onOpenLoginModal}
              id="navbar-login-btn"
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              title="Open Role-Based Login Screen"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Switch Login</span>
            </button>
          </div>

          {/* Right Side: Active Role Profile Pill & Edit Trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* 1. STUDENT ROLE PILL */}
            {currentRole === 'student' && (
              <>
                {/* Streak & XP */}
                <div className="hidden lg:flex items-center space-x-2 text-xs">
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-500/30 rounded-full text-amber-400">
                    <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span className="font-semibold">{studentProfile.studyStreakDays}d</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-indigo-950/40 border border-indigo-500/30 rounded-full text-indigo-300">
                    <Award className="w-3.5 h-3.5" />
                    <span className="font-semibold">{studentProfile.xpPoints} XP</span>
                  </div>
                </div>

                {/* Profile Pill */}
                <button
                  id="open-profile-btn"
                  onClick={onOpenProfile}
                  className="flex items-center space-x-2 pl-2 pr-3 py-1 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-full text-xs font-medium text-slate-200 transition-colors"
                  title="View Student Intelligence Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-[11px]">
                    {studentProfile.name.charAt(0)}
                  </div>
                  <span className="max-w-[75px] truncate sm:max-w-none">{studentProfile.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded">
                    {studentProfile.department}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>

                {/* Edit Student Profile Button */}
                <button
                  onClick={onOpenEditProfile}
                  id="navbar-edit-student-btn"
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white border border-slate-700 rounded-lg transition-colors"
                  title="Edit Student Details"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            {/* 2. FACULTY ROLE PILL */}
            {currentRole === 'faculty' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenEditProfile}
                  className="flex items-center space-x-2 px-3 py-1 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 rounded-full text-xs text-emerald-300 transition-colors"
                  title="Click to modify faculty credentials"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                    {facultyProfile.name.replace('Dr. ', '').charAt(0)}
                  </div>
                  <span className="font-semibold max-w-[100px] truncate sm:max-w-none">
                    {facultyProfile.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-200 rounded">
                    {facultyProfile.department}
                  </span>
                  <Edit3 className="w-3 h-3 text-emerald-400" />
                </button>
              </div>
            )}

            {/* 3. ADMIN ROLE PILL */}
            {currentRole === 'admin' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenEditProfile}
                  className="flex items-center space-x-2 px-3 py-1 bg-sky-950/40 hover:bg-sky-900/40 border border-sky-500/30 rounded-full text-xs text-sky-300 transition-colors"
                  title="Click to modify institutional settings"
                >
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-semibold max-w-[110px] truncate sm:max-w-none">
                    {adminProfile.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-sky-500/20 text-sky-200 rounded">
                    Dean
                  </span>
                  <Edit3 className="w-3 h-3 text-sky-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
