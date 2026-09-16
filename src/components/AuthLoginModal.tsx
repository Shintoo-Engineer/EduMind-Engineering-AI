import React, { useState } from 'react';
import {
  GraduationCap,
  User,
  Shield,
  Briefcase,
  Lock,
  Mail,
  Building,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  X
} from 'lucide-react';
import { UserRole, Department, StudentIntelligenceProfile, FacultyProfile, AdminProfile } from '../types';

interface AuthLoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onLoginSuccess: (role: UserRole) => void;
  initialRole?: UserRole;
  studentProfile: StudentIntelligenceProfile;
  facultyProfile: FacultyProfile;
  adminProfile: AdminProfile;
  isClosable?: boolean;
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'student',
  studentProfile,
  facultyProfile,
  adminProfile,
  isClosable = true
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states per role
  const [studentForm, setStudentForm] = useState({
    rollNumber: studentProfile.rollNumber,
    department: studentProfile.department,
    password: 'student@edumind'
  });

  const [facultyForm, setFacultyForm] = useState({
    facultyId: facultyProfile.facultyId,
    department: facultyProfile.department,
    password: 'faculty@edumind'
  });

  const [adminForm, setAdminForm] = useState({
    adminEmail: adminProfile.email,
    campusCode: adminProfile.campusCode,
    pin: '7100'
  });

  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMsg('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    // Simulate authentic authentication verification
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
      if (onClose) onClose();
    }, 600);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setSelectedRole(role);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(role);
      if (onClose) onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative">
        {/* Close Button if closable */}
        {isClosable && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Portal Header */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-600 text-white shadow-xl shadow-indigo-500/25 mb-3">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-2xl font-black tracking-tight text-white">EduMind Engineering AI</h1>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 rounded-full uppercase tracking-wider">
              Single Sign-On
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Choose your institutional role to access role-specific learning intelligence, question generation, and accreditation analytics.
          </p>

          {/* Role Navigation Tabs */}
          <div className="grid grid-cols-3 gap-2 mt-6 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 backdrop-blur-xs">
            <button
              type="button"
              onClick={() => handleRoleSelect('student')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'student'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('faculty')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'faculty'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Faculty</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'admin'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Dean / Admin</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. STUDENT LOGIN FORM */}
          {selectedRole === 'student' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-950">Student Portal Gateway</div>
                  <div className="text-[11px] text-indigo-700">
                    Target: {studentProfile.name} • Sem {studentProfile.semester} ({studentProfile.department})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('student')}
                  className="px-2.5 py-1 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xs transition-all active:scale-95"
                >
                  1-Click Login →
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Roll / Register Number
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={studentForm.rollNumber}
                    onChange={e => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                    placeholder="e.g. 710022104012"
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Engineering Department
                </label>
                <select
                  value={studentForm.department}
                  onChange={e => setStudentForm({ ...studentForm, department: e.target.value as Department })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
                >
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="EEE">Electrical & Electronics (EEE)</option>
                  <option value="MECH">Mechanical Engineering (MECH)</option>
                  <option value="CIVIL">Civil Engineering (CIVIL)</option>
                  <option value="AI_DS">AI & Data Science (AI_DS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Student Portal Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={studentForm.password}
                    onChange={e => setStudentForm({ ...studentForm, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <span>Authenticating Student Session...</span>
                  ) : (
                    <>
                      <span>Enter Student Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* 2. FACULTY LOGIN FORM */}
          {selectedRole === 'faculty' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-950">Faculty & Department Coordinator</div>
                  <div className="text-[11px] text-emerald-700">
                    Logged as: {facultyProfile.name} ({facultyProfile.designation})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('faculty')}
                  className="px-2.5 py-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-all active:scale-95"
                >
                  1-Click Login →
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Faculty Employee ID / Official Email
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={facultyForm.facultyId}
                    onChange={e => setFacultyForm({ ...facultyForm, facultyId: e.target.value })}
                    placeholder="FAC-CSE-018"
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Teaching Department
                </label>
                <select
                  value={facultyForm.department}
                  onChange={e => setFacultyForm({ ...facultyForm, department: e.target.value as Department })}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-white"
                >
                  <option value="CSE">Computer Science & Engineering (CSE)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="EEE">Electrical & Electronics (EEE)</option>
                  <option value="MECH">Mechanical Engineering (MECH)</option>
                  <option value="CIVIL">Civil Engineering (CIVIL)</option>
                  <option value="AI_DS">AI & Data Science (AI_DS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Faculty Security Passkey
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={facultyForm.password}
                    onChange={e => setFacultyForm({ ...facultyForm, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <span>Verifying Faculty Credentials...</span>
                  ) : (
                    <>
                      <span>Enter Faculty Portal & Question Generator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* 3. ADMIN LOGIN FORM */}
          {selectedRole === 'admin' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-sky-950">Institutional Dean Portal</div>
                  <div className="text-[11px] text-sky-700">
                    Dean: {adminProfile.name} • {adminProfile.institutionName}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin')}
                  className="px-2.5 py-1 text-[11px] font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-xs transition-all active:scale-95"
                >
                  1-Click Login →
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Administrative Dean Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={adminForm.adminEmail}
                    onChange={e => setAdminForm({ ...adminForm, adminEmail: e.target.value })}
                    placeholder="dean.academics@college.edu.in"
                    className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Campus / AISHE Code
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={adminForm.campusCode}
                    onChange={e => setAdminForm({ ...adminForm, campusCode: e.target.value })}
                    placeholder="NIET-7100"
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Master Security PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminForm.pin}
                    onChange={e => setAdminForm({ ...adminForm, pin: e.target.value })}
                    placeholder="4-digit admin PIN"
                    className="w-full pl-9 pr-10 py-2 text-xs font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <span>Validating Administrative Key...</span>
                  ) : (
                    <>
                      <span>Enter Institutional Governance Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Credentials Footer Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Multi-Role Academic Environment</span>
            </span>
            <span>Switch roles anytime via the top header bar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
