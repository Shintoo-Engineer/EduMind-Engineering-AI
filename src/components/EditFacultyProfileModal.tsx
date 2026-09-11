import React, { useState } from 'react';
import {
  X,
  User,
  Building,
  Mail,
  Phone,
  BookOpen,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  Save,
  Briefcase
} from 'lucide-react';
import { FacultyProfile, Department } from '../types';

interface EditFacultyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FacultyProfile;
  onSave: (updatedProfile: FacultyProfile) => void;
}

export const EditFacultyProfileModal: React.FC<EditFacultyProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    facultyId: profile.facultyId,
    designation: profile.designation,
    department: profile.department,
    qualification: profile.qualification,
    specialization: profile.specialization,
    cabinLocation: profile.cabinLocation,
    email: profile.email,
    phone: profile.phone,
    officeHours: profile.officeHours,
    experienceYears: profile.experienceYears,
    handlingSubjectsStr: profile.handlingSubjects.join('\n')
  });

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FacultyProfile = {
      ...profile,
      name: formData.name.trim() || profile.name,
      facultyId: formData.facultyId.trim() || profile.facultyId,
      designation: formData.designation.trim() || profile.designation,
      department: formData.department as Department,
      qualification: formData.qualification.trim() || profile.qualification,
      specialization: formData.specialization.trim() || profile.specialization,
      cabinLocation: formData.cabinLocation.trim() || profile.cabinLocation,
      email: formData.email.trim() || profile.email,
      phone: formData.phone.trim() || profile.phone,
      officeHours: formData.officeHours.trim() || profile.officeHours,
      experienceYears: Number(formData.experienceYears) || profile.experienceYears,
      handlingSubjects: formData.handlingSubjectsStr
        .split('\n')
        .map(s => s.trim())
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
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 flex items-center justify-between border-b border-emerald-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center space-x-2">
                <span>Edit Faculty & Examiner Details</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  Faculty Portal
                </span>
              </h2>
              <p className="text-xs text-emerald-200/80">
                Manage your academic credentials, teaching allocations, and office hours.
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
              <span className="font-bold">Faculty profile updated successfully!</span>
            </div>
          )}

          {/* Row 1: Name & Faculty ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Faculty Full Name & Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. R. Ramanathan"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Faculty Employee ID <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.facultyId}
                  onChange={e => setFormData({ ...formData, facultyId: e.target.value })}
                  placeholder="e.g. FAC-CSE-018"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-mono font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Designation & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Academic Designation
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. Professor & Head of Department"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Department
              </label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value as Department })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-semibold bg-white"
              >
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EEE">Electrical & Electronics (EEE)</option>
                <option value="MECH">Mechanical Engineering (MECH)</option>
                <option value="CIVIL">Civil Engineering (CIVIL)</option>
                <option value="AI_DS">AI & Data Science (AI_DS)</option>
              </select>
            </div>
          </div>

          {/* Row 3: Qualification & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Academic Qualifications
              </label>
              <div className="relative">
                <Award className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. Ph.D. in Distributed Systems (IIT Madras)"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Teaching & Industry Experience (Years)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.experienceYears}
                onChange={e => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-bold"
              />
            </div>
          </div>

          {/* Row 4: Specialization & Cabin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Research / Technical Specialization
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={e => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g. Transaction Processing, Autonomous Systems"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Cabin / Office Location
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.cabinLocation}
                  onChange={e => setFormData({ ...formData, cabinLocation: e.target.value })}
                  placeholder="CSE Block, Room 304, Third Floor"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Official Faculty Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ramanathan.cse@college.edu.in"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Official Phone / Intercom
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 94432 98765"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Row 6: Office Hours */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Student Consultation / Office Hours
            </label>
            <div className="relative">
              <Clock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={formData.officeHours}
                onChange={e => setFormData({ ...formData, officeHours: e.target.value })}
                placeholder="Mon-Thu: 2:30 PM - 4:30 PM, Fri: 10:00 AM - 12:00 PM"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Row 7: Handling Subjects */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              Course / Subject Allocations (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.handlingSubjectsStr}
              onChange={e => setFormData({ ...formData, handlingSubjectsStr: e.target.value })}
              placeholder="Database Management Systems (CS3492)&#10;Operating Systems & Kernel Architecture (CS3451)"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-mono text-xs"
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
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Faculty Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
