import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { TutorEngine } from './components/TutorEngine';
import { RagLibrary } from './components/RagLibrary';
import { AdaptiveQuizEngine } from './components/AdaptiveQuizEngine';
import { MistakeBankView } from './components/MistakeBankView';
import { CodingMentorView } from './components/CodingMentorView';
import { VivaSimulatorView } from './components/VivaSimulatorView';
import { LabAssistantView } from './components/LabAssistantView';
import { ProjectMentorView } from './components/ProjectMentorView';
import { ExamPreparationView } from './components/ExamPreparationView';
import { CareerDashboardView } from './components/CareerDashboardView';
import { FacultyDashboardView } from './components/FacultyDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { IntelligenceProfileDrawer } from './components/IntelligenceProfileDrawer';
import { WowDemoModal } from './components/WowDemoModal';
import { EditStudentProfileModal } from './components/EditStudentProfileModal';
import { EditFacultyProfileModal } from './components/EditFacultyProfileModal';
import { EditAdminProfileModal } from './components/EditAdminProfileModal';
import { AuthLoginModal } from './components/AuthLoginModal';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_FACULTY_PROFILE,
  INITIAL_ADMIN_PROFILE,
  ACADEMIC_SUBJECTS_CATALOG,
  INITIAL_MISTAKE_BANK
} from './data/mockAcademicData';
import {
  UserRole,
  MistakeEntry,
  StudentIntelligenceProfile,
  FacultyProfile,
  AdminProfile
} from './types';
import {
  BookOpen,
  HelpCircle,
  Code,
  Mic,
  Calendar,
  Target,
  Sparkles,
  Database,
  FlaskConical,
  Rocket,
  Brain,
  Layers,
  LayoutDashboard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeSubjectContext, setActiveSubjectContext] = useState<string>('Database Management Systems');
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState<boolean>(false);
  const [isWowDemoOpen, setIsWowDemoOpen] = useState<boolean>(false);

  // Modals for editing profiles and authentication
  const [isEditStudentOpen, setIsEditStudentOpen] = useState<boolean>(false);
  const [isEditFacultyOpen, setIsEditFacultyOpen] = useState<boolean>(false);
  const [isEditAdminOpen, setIsEditAdminOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Persistent Profiles State for Student, Faculty, and Admin
  const [studentProfile, setStudentProfile] = useState<StudentIntelligenceProfile>(() => {
    try {
      const saved = localStorage.getItem('edumind_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_STUDENT_PROFILE;
  });

  const [facultyProfile, setFacultyProfile] = useState<FacultyProfile>(() => {
    try {
      const saved = localStorage.getItem('edumind_faculty_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_FACULTY_PROFILE;
  });

  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    try {
      const saved = localStorage.getItem('edumind_admin_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ADMIN_PROFILE;
  });

  const [mistakeBank, setMistakeBank] = useState<MistakeEntry[]>(INITIAL_MISTAKE_BANK);

  // Profile save handlers with local storage & API sync
  const handleSaveStudentProfile = async (updated: StudentIntelligenceProfile) => {
    setStudentProfile(updated);
    try {
      localStorage.setItem('edumind_student_profile', JSON.stringify(updated));
      await fetch('/api/profile/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveFacultyProfile = async (updated: FacultyProfile) => {
    setFacultyProfile(updated);
    try {
      localStorage.setItem('edumind_faculty_profile', JSON.stringify(updated));
      await fetch('/api/profile/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveAdminProfile = async (updated: AdminProfile) => {
    setAdminProfile(updated);
    try {
      localStorage.setItem('edumind_admin_profile', JSON.stringify(updated));
      await fetch('/api/profile/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Open modal based on active role
  const handleOpenEditCurrentRole = () => {
    if (currentRole === 'student') setIsEditStudentOpen(true);
    else if (currentRole === 'faculty') setIsEditFacultyOpen(true);
    else if (currentRole === 'admin') setIsEditAdminOpen(true);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'faculty') setActiveTab('faculty');
    else if (role === 'admin') setActiveTab('admin');
    else setActiveTab('dashboard');
  };

  const handleLoginSuccess = (role: UserRole) => {
    handleRoleChange(role);
  };

  const handleSelectTab = (tab: string, contextSubject?: string) => {
    setActiveTab(tab);
    if (contextSubject) {
      setActiveSubjectContext(contextSubject);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogMistake = (mistake: MistakeEntry) => {
    setMistakeBank(prev => [mistake, ...prev]);
  };

  const handleClearMistake = (id: string) => {
    setMistakeBank(prev =>
      prev.map(m => (m.id === id ? { ...m, remediationStatus: 'Resolved' } : m))
    );
    setStudentProfile(prev => ({
      ...prev,
      overallLearningScore: Math.min(100, prev.overallLearningScore + 2),
      academicProgress: Math.min(100, prev.academicProgress + 2),
      xpPoints: prev.xpPoints + 150
    }));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleUpdateScore = (points: number) => {
    setStudentProfile(prev => ({
      ...prev,
      xpPoints: prev.xpPoints + points,
      overallLearningScore: Math.min(100, prev.overallLearningScore + 1)
    }));
  };

  const handleStartRemediation = (topic: string) => {
    setActiveTab('tutor');
    setActiveSubjectContext('Database Management Systems');
  };

  const handleGroundingQuery = (query: string, docTitle: string) => {
    setActiveTab('tutor');
    setActiveSubjectContext(docTitle.includes('OS') ? 'Operating Systems' : 'Database Management Systems');
  };

  const handleDemoCompleted = () => {
    setStudentProfile(prev => ({
      ...prev,
      overallLearningScore: 88,
      academicProgress: 91,
      placementReadiness: 74,
      xpPoints: prev.xpPoints + 300,
      strongTopics: [...prev.strongTopics, 'Normalization & BCNF Superkeys']
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar with Profile Pills, Role Switcher, and Edit/Login Controls */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        studentProfile={studentProfile}
        facultyProfile={facultyProfile}
        adminProfile={adminProfile}
        onOpenProfile={() => setIsProfileDrawerOpen(true)}
        onOpenEditProfile={handleOpenEditCurrentRole}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLaunchWowDemo={() => setIsWowDemoOpen(true)}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pt-6 pb-16">
        {/* Role: Student Navigation Pills */}
        {currentRole === 'student' && (
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-4 mb-4 text-xs font-semibold scrollbar-none">
            <button
              onClick={() => handleSelectTab('dashboard')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => handleSelectTab('tutor')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'tutor'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>AI Tutor</span>
            </button>

            <button
              onClick={() => handleSelectTab('rag')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'rag'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-blue-500" />
              <span>College Notes (RAG)</span>
            </button>

            <button
              onClick={() => handleSelectTab('quiz')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'quiz'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Adaptive Quiz</span>
            </button>

            <button
              onClick={() => handleSelectTab('mistakes')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'mistakes'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-rose-500" />
              <span>Mistake Bank ({mistakeBank.filter(m => m.remediationStatus === 'Pending').length})</span>
            </button>

            <button
              onClick={() => handleSelectTab('coding')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'coding'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-emerald-500" />
              <span>Coding Mentor</span>
            </button>

            <button
              onClick={() => handleSelectTab('viva')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'viva'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-rose-500" />
              <span>Viva Simulator</span>
            </button>

            <button
              onClick={() => handleSelectTab('lab')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'lab'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-indigo-500" />
              <span>Lab Assistant</span>
            </button>

            <button
              onClick={() => handleSelectTab('project')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'project'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Rocket className="w-3.5 h-3.5 text-purple-500" />
              <span>Final Year Project</span>
            </button>

            <button
              onClick={() => handleSelectTab('exam')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'exam'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              <span>Exam Prep (14D)</span>
            </button>

            <button
              onClick={() => handleSelectTab('career')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === 'career'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-cyan-500" />
              <span>Placements & ATS</span>
            </button>
          </div>
        )}

        {/* View Switcher by Role */}
        {currentRole === 'student' && (
          <>
            {activeTab === 'dashboard' && (
              <StudentDashboard
                profile={studentProfile}
                subjects={ACADEMIC_SUBJECTS_CATALOG}
                onSelectTab={handleSelectTab}
                onOpenProfile={() => setIsProfileDrawerOpen(true)}
                onStartRemediation={handleStartRemediation}
                onOpenEditProfile={() => setIsEditStudentOpen(true)}
              />
            )}

            {activeTab === 'tutor' && (
              <TutorEngine
                initialSubject={activeSubjectContext}
                department={studentProfile.department}
                onOpenRagModal={() => setActiveTab('rag')}
              />
            )}

            {activeTab === 'rag' && (
              <RagLibrary onGroundingQuerySelect={handleGroundingQuery} />
            )}

            {activeTab === 'quiz' && (
              <AdaptiveQuizEngine
                onLogMistake={handleLogMistake}
                onUpdateScore={handleUpdateScore}
                onOpenMistakeBank={() => setActiveTab('mistakes')}
              />
            )}

            {activeTab === 'mistakes' && (
              <MistakeBankView
                mistakes={mistakeBank}
                onClearMistake={handleClearMistake}
                onAskTutorRemediation={(t, s) => {
                  setActiveSubjectContext(t);
                  setActiveTab('tutor');
                }}
              />
            )}

            {activeTab === 'coding' && <CodingMentorView />}

            {activeTab === 'viva' && <VivaSimulatorView />}

            {activeTab === 'lab' && <LabAssistantView />}

            {activeTab === 'project' && <ProjectMentorView />}

            {activeTab === 'exam' && <ExamPreparationView />}

            {activeTab === 'career' && <CareerDashboardView />}
          </>
        )}

        {/* Faculty Dashboard with Edit Details & AI Question Generation */}
        {currentRole === 'faculty' && (
          <FacultyDashboardView
            facultyProfile={facultyProfile}
            onOpenEditProfile={() => setIsEditFacultyOpen(true)}
          />
        )}

        {/* Admin Dashboard with Institutional Details & Accreditation Metrics */}
        {currentRole === 'admin' && (
          <AdminDashboardView
            adminProfile={adminProfile}
            onOpenEditProfile={() => setIsEditAdminOpen(true)}
          />
        )}
      </div>

      {/* Student Intelligence Profile Drawer */}
      <IntelligenceProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        profile={studentProfile}
        onOpenEditProfile={() => setIsEditStudentOpen(true)}
        onSelectTopicAction={topic => {
          setActiveSubjectContext(topic);
          setActiveTab('tutor');
        }}
      />

      {/* 10-Step Interactive Wow Demo Modal */}
      <WowDemoModal
        isOpen={isWowDemoOpen}
        onClose={() => setIsWowDemoOpen(false)}
        onDemoCompleted={handleDemoCompleted}
      />

      {/* Edit Student Details Modal */}
      <EditStudentProfileModal
        isOpen={isEditStudentOpen}
        onClose={() => setIsEditStudentOpen(false)}
        profile={studentProfile}
        onSave={handleSaveStudentProfile}
      />

      {/* Edit Faculty Details Modal */}
      <EditFacultyProfileModal
        isOpen={isEditFacultyOpen}
        onClose={() => setIsEditFacultyOpen(false)}
        profile={facultyProfile}
        onSave={handleSaveFacultyProfile}
      />

      {/* Edit Admin Details Modal */}
      <EditAdminProfileModal
        isOpen={isEditAdminOpen}
        onClose={() => setIsEditAdminOpen(false)}
        profile={adminProfile}
        onSave={handleSaveAdminProfile}
      />

      {/* Role-Based Authentication & Login Screen Modal */}
      <AuthLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={currentRole}
        studentProfile={studentProfile}
        facultyProfile={facultyProfile}
        adminProfile={adminProfile}
      />
    </div>
  );
}
