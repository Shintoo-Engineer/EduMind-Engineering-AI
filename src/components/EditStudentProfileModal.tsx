import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  Building,
  Mail,
  Phone,
  Target,
  Briefcase,
  Code,
  CheckCircle2,
  Save,
  Sparkles
} from 'lucide-react';
import { StudentIntelligenceProfile, Department } from '../types';

interface EditStudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentIntelligenceProfile;
  onSave: (updatedProfile: StudentIntelligenceProfile) => void;
}

export const EditStudentProfileModal: React.FC<EditStudentProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    rollNumber: profile.rollNumber,
    department: profile.department,
    semester: profile.semester,
    cgpa: profile.cgpa,
    targetCgpa: profile.targetCgpa || 8.8,
    collegeName: profile.collegeName || 'National Institute of Engineering & Technology',
    email: profile.email || `${profile.name.toLowerCase().replace(/[^a-z]/g, '')}@engineering.edu.in`,
    phone: profile.phone || '+91 98402 12345',
    bio: profile.bio || 'Passionate engineering student preparing for core placements and university exams.',
    targetRole: profile.targetRole,
    codingLevel: profile.codingLevel,
    targetCompaniesStr: profile.targetCompanies.join(', ')
  });

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentIntelligenceProfile = {
      ...profile,
      name: formData.name.trim() || profile.name,
      rollNumber: formData.rollNumber.trim() || profile.rollNumber,
      department: formData.department as Department,
      semester: Number(formData.semester),
      cgpa: Number(formData.cgpa),
      targetCgpa: Number(formData.targetCgpa),
      collegeName: formData.collegeName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      bio: formData.bio.trim(),
      targetRole: formData.targetRole.trim(),
      codingLevel: formData.codingLevel as any,
      targetCompanies: formData.targetCompaniesStr
        .split(',')
        .map(c => c.trim())
        .filter(Boolean)
    };

    onSave(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 flex items-center justify-between border-b border-indigo-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center space-x-2">
                <span>Edit Student Profile & Academic Details</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  Student Self-Service
                </span>
              </h2>
              <p className="text-xs text-indigo-200/80">
                Update your identity, department, contact info, and career targets.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-700">
          {isSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold">Profile updated successfully! Refreshing view...</span>
            </div>
          )}

          {/* Row 1: Name & Roll Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Arun V."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Roll / Register Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <GraduationCap className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.rollNumber}
                  onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                  placeholder="e.g. 710022104012"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-mono font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Department & Semester */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Department / Branch
              </label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value as Department })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-semibold bg-white"
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
              <label className="block font-bold text-slate-800 mb-1">
                Current Semester
              </label>
              <select
                value={formData.semester}
                onChange={e => setFormData({ ...formData, semester: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-semibold bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>
                    Semester {s} ({Math.ceil(s / 2)}th Year)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: College / University */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              College / University Name
            </label>
            <div className="relative">
              <Building className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={formData.collegeName}
                onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                placeholder="e.g. National Institute of Engineering & Technology"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Row 4: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Official Student Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. arun.v@college.edu.in"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Contact Phone
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98402 12345"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Current CGPA & Target CGPA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Current CGPA (Scale of 10)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={e => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Target CGPA Goal
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.targetCgpa}
                onChange={e => setFormData({ ...formData, targetCgpa: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-bold text-emerald-600"
              />
            </div>
          </div>

          {/* Row 6: Target Role & Coding Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Career Target Role
              </label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                  placeholder="e.g. Full-Stack Software Engineer"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Coding & Problem Solving Level
              </label>
              <div className="relative">
                <Code className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <select
                  value={formData.codingLevel}
                  onChange={e => setFormData({ ...formData, codingLevel: e.target.value as any })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
                >
                  <option value="Beginner">Beginner (Basics of Syntax & Logic)</option>
                  <option value="Intermediate">Intermediate (DSA & LeetCode Medium)</option>
                  <option value="Advanced">Advanced (System Design & Hard DSA)</option>
                  <option value="Competitive">Competitive Programmer (Codeforces/ICPC)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 7: Target Companies */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Target Dream Companies (comma separated)
            </label>
            <div className="relative">
              <Target className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={formData.targetCompaniesStr}
                onChange={e => setFormData({ ...formData, targetCompaniesStr: e.target.value })}
                placeholder="Google, Microsoft, Zoho, TCS Digital, Amazon"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Row 8: Bio & Ambition */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Short Student Bio / Academic Summary
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              placeholder="A brief summary of your academic objectives..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 flex items-center space-x-1.5 transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
