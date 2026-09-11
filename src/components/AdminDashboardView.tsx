import React from 'react';
import {
  Shield,
  GraduationCap,
  Building,
  TrendingUp,
  Award,
  Users,
  Target,
  FileCheck,
  BarChart3,
  Edit3,
  Calendar,
  Mail,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { AdminProfile } from '../types';
import { DEPARTMENT_PERFORMANCES } from '../data/mockAcademicData';

interface AdminDashboardViewProps {
  adminProfile: AdminProfile;
  onOpenEditProfile: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  adminProfile,
  onOpenEditProfile
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Admin Profile & Institutional Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white p-6 sm:p-8 rounded-2xl border border-sky-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-sky-500/30 shrink-0">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider">
                  Code: {adminProfile.campusCode} • Term: {adminProfile.academicYear}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {adminProfile.accreditationTier}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {adminProfile.institutionName}
              </h1>
              <p className="text-sky-200/90 text-sm mt-0.5 font-medium">
                {adminProfile.name} • {adminProfile.designation}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>{adminProfile.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>{adminProfile.phone}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onOpenEditProfile}
              id="edit-admin-profile-btn"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 active:scale-95 shadow-xs"
            >
              <Edit3 className="w-4 h-4 text-sky-300" />
              <span>Modify Institutional Details</span>
            </button>
          </div>
        </div>

        {/* Quality Policy Quote */}
        {adminProfile.visionStatement && (
          <div className="mt-5 pt-4 border-t border-sky-800/60 text-xs text-sky-200/80 italic">
            "{adminProfile.visionStatement}"
          </div>
        )}
      </div>

      {/* Institutional Core Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-medium">Enrolled Engineering Students</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {adminProfile.totalStudents.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">98.2% Active on AI Portal</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-medium">Faculty Member Strength</div>
          <div className="text-2xl font-black text-sky-600 mt-1">
            {adminProfile.totalFaculty}
          </div>
          <div className="text-[11px] text-sky-700 font-semibold">1:15 Student-Faculty Ratio</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-medium">Placement Conversion</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">79.2%</div>
          <div className="text-[11px] text-slate-500">Target: 85% by Semester End</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-medium">Accreditation Audit Tier</div>
          <div className="text-base font-black text-purple-700 mt-1 truncate">
            {adminProfile.accreditationTier.split('&')[0] || 'NBA Tier-1'}
          </div>
          <div className="text-[11px] text-purple-600 font-semibold">Outcome-Based Education</div>
        </div>
      </div>

      {/* Department Comparison Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Building className="w-4 h-4 text-sky-600" />
              <span>Departmental Performance Benchmarks</span>
            </h2>
            <p className="text-xs text-slate-500">
              Comparative pass rates, placement conversion, student count, and early risk counts across all engineering departments.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Department Name</th>
                <th className="p-3">Enrolled Students</th>
                <th className="p-3">Avg Academic Score</th>
                <th className="p-3">Placement Rate</th>
                <th className="p-3">Students at Academic Risk</th>
                <th className="p-3">Accreditation Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEPARTMENT_PERFORMANCES.map(dept => (
                <tr key={dept.department} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{dept.department}</td>
                  <td className="p-3 text-slate-600 font-mono">{dept.studentCount}</td>
                  <td className="p-3">
                    <span className="font-bold text-slate-900">{dept.avgScore}%</span>
                  </td>
                  <td className="p-3 font-bold text-emerald-600">{dept.placementPercent}%</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        dept.atRiskCount > 10 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {dept.atRiskCount} Students
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Tier-1 Compliant
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
