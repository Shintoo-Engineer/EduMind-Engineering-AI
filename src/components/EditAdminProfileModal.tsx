import React, { useState } from 'react';
import {
  X,
  Shield,
  Building2,
  Mail,
  Phone,
  Award,
  Calendar,
  Users,
  CheckCircle2,
  Save,
  FileCheck
} from 'lucide-react';
import { AdminProfile } from '../types';

interface EditAdminProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AdminProfile;
  onSave: (updatedProfile: AdminProfile) => void;
}

export const EditAdminProfileModal: React.FC<EditAdminProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    designation: profile.designation,
    institutionName: profile.institutionName,
    campusCode: profile.campusCode,
    accreditationTier: profile.accreditationTier,
    email: profile.email,
    phone: profile.phone,
    academicYear: profile.academicYear,
    totalStudents: profile.totalStudents,
    totalFaculty: profile.totalFaculty,
    visionStatement: profile.visionStatement
  });

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AdminProfile = {
      ...profile,
      name: formData.name.trim() || profile.name,
      designation: formData.designation.trim() || profile.designation,
      institutionName: formData.institutionName.trim() || profile.institutionName,
      campusCode: formData.campusCode.trim() || profile.campusCode,
      accreditationTier: formData.accreditationTier.trim() || profile.accreditationTier,
      email: formData.email.trim() || profile.email,
      phone: formData.phone.trim() || profile.phone,
      academicYear: formData.academicYear.trim() || profile.academicYear,
      totalStudents: Number(formData.totalStudents) || profile.totalStudents,
      totalFaculty: Number(formData.totalFaculty) || profile.totalFaculty,
      visionStatement: formData.visionStatement.trim() || profile.visionStatement
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
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-900 text-white p-6 flex items-center justify-between border-b border-sky-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center space-x-2">
                <span>Edit Institutional & Dean Administration Details</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/30 text-sky-200 border border-sky-400/30">
                  Admin Authority
                </span>
              </h2>
              <p className="text-xs text-sky-200/80">
                Configure institution name, accreditation status, academic calendar, and officer profile.
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
              <span className="font-bold">Institutional profile saved successfully!</span>
            </div>
          )}

          {/* Row 1: Admin Name & Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Admin Officer Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. K. S. Sundaram"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Administrative Designation / Portfolio <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                placeholder="Dean of Academic Affairs & COE"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-semibold"
              />
            </div>
          </div>

          {/* Row 2: Institution Name & Campus Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Institution / University Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.institutionName}
                  onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                  placeholder="National Institute of Engineering & Technology"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Campus / AISHE Code
              </label>
              <input
                type="text"
                value={formData.campusCode}
                onChange={e => setFormData({ ...formData, campusCode: e.target.value })}
                placeholder="NIET-7100"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-mono font-semibold"
              />
            </div>
          </div>

          {/* Row 3: Accreditation Tier & Academic Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Accreditation Status & Grades
              </label>
              <div className="relative">
                <Award className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.accreditationTier}
                  onChange={e => setFormData({ ...formData, accreditationTier: e.target.value })}
                  placeholder="NBA Tier-1 & NAAC A++ (CGPA 3.72)"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 text-sky-700 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Current Academic Term
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={e => setFormData({ ...formData, academicYear: e.target.value })}
                  placeholder="2025 - 2026 (Even Semester)"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Total Students & Total Faculty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Total Enrolled Students (Institution-wide)
              </label>
              <div className="relative">
                <Users className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="number"
                  value={formData.totalStudents}
                  onChange={e => setFormData({ ...formData, totalStudents: Number(e.target.value) })}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Total Approved Faculty Strength
              </label>
              <input
                type="number"
                value={formData.totalFaculty}
                onChange={e => setFormData({ ...formData, totalFaculty: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 font-bold"
              />
            </div>
          </div>

          {/* Row 5: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Dean / Admin Official Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="dean.academics@college.edu.in"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Administrative Secretariat Phone
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 44 2855 0100"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Row 6: Vision Statement */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Institutional Quality Policy / Vision Statement
            </label>
            <textarea
              rows={3}
              value={formData.visionStatement}
              onChange={e => setFormData({ ...formData, visionStatement: e.target.value })}
              placeholder="Institutional vision and accreditation goal..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 resize-none"
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
              className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-md shadow-sky-600/20 flex items-center space-x-1.5 transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Institutional Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
