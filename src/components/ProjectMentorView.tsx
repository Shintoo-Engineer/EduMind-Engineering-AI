import React, { useState } from 'react';
import {
  Rocket,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  FileText,
  Sliders,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { ProjectIdea } from '../types';

export const ProjectMentorView: React.FC = () => {
  const [department, setDepartment] = useState<string>('CSE');
  const [domain, setDomain] = useState<string>('AI & Distributed Systems');
  const [skills, setSkills] = useState<string>('React, Python, PyTorch, PostgreSQL');
  const [teamSize, setTeamSize] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedProject, setGeneratedProject] = useState<ProjectIdea | null>({
    id: 'proj-1',
    title: 'Zero-Knowledge Privacy-Preserving Student Attendance & Edge Biometrics',
    department: 'CSE',
    domain: 'AI & Edge Security',
    abstract: 'A distributed edge computing solution for campus attendance that generates zero-knowledge cryptographic proofs from facial biometrics without storing raw facial embeddings on central servers, completely preventing spoofing and identity leak risks.',
    problemStatement: 'Existing facial recognition biometric systems store raw images or embeddings centrally, creating severe GDPR/privacy violations and remaining vulnerable to 2D photograph and deepfake spoofing.',
    proposedSystem: 'An on-device Edge TPU that runs infrared liveness detection and transforms landmarks into homomorphic zero-knowledge proofs before communicating with the university ledger.',
    novelty: 'Combining infrared liveness spoof detection with Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs).',
    features: [
      'Edge TPU local inferencing (<150ms)',
      'Anti-spoof infrared depth calculation',
      'Zero-knowledge proof verification',
      'Automated semester attendance compliance export'
    ],
    techStack: ['Python', 'PyTorch Mobile', 'FastAPI', 'Rust (zk-SNARK)', 'PostgreSQL'],
    architectureOverview: 'Edge Sensor Camera -> Local TensorRT Pipeline -> ZK Prover -> University API Gateway -> Tamperproof Database',
    ratings: {
      innovation: 9.2,
      feasibility: 8.8,
      complexity: 8.6,
      industryValue: 9.4
    }
  });

  const handleGenerateProject = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/project/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          department,
          domain,
          skills,
          teamSize,
          durationMonths: 4
        })
      });
      const data = await res.json();
      if (data.project) {
        setGeneratedProject({ ...data.project, id: `proj-${Date.now()}` });
      }
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
            <Rocket className="w-4 h-4" />
            <span>Capstone & Final-Year Engineering Project Assistant</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Final-Year Project Discovery & Evaluation
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Turn generic ideas into patentable, high-scoring projects with feasibility analysis, system architecture, and IEEE-standard documentation.
          </p>
        </div>
      </div>

      {/* Generator Controls Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Department</label>
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-semibold focus:outline-none"
            >
              <option value="CSE">Computer Science (CSE)</option>
              <option value="ECE">Electronics & Comm (ECE)</option>
              <option value="EEE">Electrical & Electronics (EEE)</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Domain Focus</label>
            <input
              type="text"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="e.g. Edge AI, IoT, Robotics"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Team Core Skills</label>
            <input
              type="text"
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="e.g. Python, Arduino, React"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerateProject}
              disabled={isLoading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-xs flex items-center justify-center space-x-2 active:scale-95"
            >
              {isLoading ? (
                <span>Synthesizing...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Capstone</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Project Showcase */}
      {generatedProject && (
        <div className="space-y-6">
          {/* Main Title & Rating Grid */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2 text-xs mb-1">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {generatedProject.department}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-medium">{generatedProject.domain}</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">{generatedProject.title}</h2>
              </div>
            </div>

            {/* 4 Score Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-400">Innovation Score</div>
                <div className="text-xl font-black text-indigo-600 mt-1">
                  {generatedProject.ratings.innovation}/10
                </div>
                <div className="text-[10px] text-emerald-600">High University Novelty</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-400">Feasibility</div>
                <div className="text-xl font-black text-emerald-600 mt-1">
                  {generatedProject.ratings.feasibility}/10
                </div>
                <div className="text-[10px] text-slate-500">Achievable in 4 Months</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-400">Complexity</div>
                <div className="text-xl font-black text-amber-600 mt-1">
                  {generatedProject.ratings.complexity}/10
                </div>
                <div className="text-[10px] text-slate-500">B.Tech Standard</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-400">Industry Value</div>
                <div className="text-xl font-black text-blue-600 mt-1">
                  {generatedProject.ratings.industryValue}/10
                </div>
                <div className="text-[10px] text-blue-600">High Placement Value</div>
              </div>
            </div>

            {/* Problem Statement & Proposed System */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block">Problem Statement:</span>
                <p className="text-slate-600 leading-relaxed">{generatedProject.problemStatement}</p>
              </div>

              <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-200 space-y-1.5">
                <span className="font-bold text-indigo-950 block">Proposed Solution & System:</span>
                <p className="text-slate-700 leading-relaxed">{generatedProject.proposedSystem}</p>
              </div>
            </div>

            {/* Novelty / Differentiator */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="font-bold flex items-center space-x-1.5 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Project Differentiator & Patent / Paper Potential:</span>
              </div>
              <p className="leading-relaxed text-slate-700 font-medium">{generatedProject.novelty}</p>
            </div>

            {/* Tech Stack & Architecture */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Recommended Tech Stack:</span>
                <div className="flex flex-wrap gap-1.5">
                  {generatedProject.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-mono font-medium border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-slate-400 block mb-1 text-[11px]">System Architecture Pipeline:</span>
                <span className="text-emerald-400 font-bold">{generatedProject.architectureOverview}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
