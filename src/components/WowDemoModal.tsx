import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  UploadCloud,
  BookOpen,
  HelpCircle,
  AlertCircle,
  Brain,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Play,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WowDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoCompleted: () => void;
}

interface DemoStep {
  step: number;
  title: string;
  tagline: string;
  badge: string;
  content: React.ReactNode;
}

export const WowDemoModal: React.FC<WowDemoModalProps> = ({
  isOpen,
  onClose,
  onDemoCompleted
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAuto && currentStep < 10) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 3500);
    } else if (currentStep === 10) {
      setIsPlayingAuto(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe if confetti isn't ready
      }
    }
    return () => clearTimeout(timer);
  }, [isPlayingAuto, currentStep]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep(prev => prev + 1);
      if (currentStep + 1 === 10) {
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    } else {
      onDemoCompleted();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const restartDemo = () => {
    setCurrentStep(1);
    setIsPlayingAuto(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">EduMind Intelligence Loop</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Competition Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">Step {currentStep} of 10: “Most AI tutors answer questions. EduMind learns the learner.”</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                isPlayingAuto
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlayingAuto ? 'Pause Auto' : 'Auto Play'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Tracker Bar */}
        <div className="w-full bg-slate-800 h-1.5 flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-all duration-300 ${
                i + 1 <= currentStep ? 'bg-gradient-to-r from-amber-500 to-indigo-500' : 'bg-slate-800'
              } ${i !== 0 ? 'border-l border-slate-900' : ''}`}
            />
          ))}
        </div>

        {/* Step Content Card */}
        <div className="p-6 md:p-8 flex-1 min-h-[360px] flex flex-col justify-center">
          {/* Step 1: Upload College Notes */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold">
                <UploadCloud className="w-4 h-4" />
                <span>STEP 1 / 10 • KNOWLEDGE INGESTION</span>
              </div>
              <h2 className="text-xl font-bold text-white">Upload Department & College Lecture Notes</h2>
              <p className="text-slate-300 text-sm">
                Instead of relying on generic web summaries, student uploads their college textbook or professor's slide deck.
              </p>
              <div className="p-4 bg-slate-800/80 rounded-xl border border-dashed border-indigo-500/40 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">CS3492_DBMS_Unit4_Normalization.pdf</div>
                  <div className="text-xs text-slate-400">42 pages • Parsed • 84 semantic chunks indexed in Vector Store</div>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  ✓ Ready for RAG
                </span>
              </div>
            </div>
          )}

          {/* Step 2: Ask AI to teach difficult topic */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>STEP 2 / 10 • SOURCE-GROUNDED TUTORING</span>
              </div>
              <h2 className="text-xl font-bold text-white">Ask AI to Teach a Difficult Topic</h2>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm">
                <span className="text-slate-400 text-xs block mb-1">Student:</span>
                <span className="text-indigo-300 font-medium">“Explain 3NF vs BCNF according to our college lecture notes.”</span>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-slate-200">EduMind Tutor (College Grounded):</span>
                  <span className="text-emerald-400">📚 Source: CS3492 Unit 4 – Page 31</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  “According to your uploaded Unit 4 notes, a relation is in <strong>3NF</strong> if for every non-trivial functional dependency X → Y, either X is a superkey OR Y is a prime attribute. In <strong>BCNF</strong>, this second exception is removed: X must <em>strictly</em> be a superkey!”
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Take Adaptive Quiz */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold">
                <HelpCircle className="w-4 h-4" />
                <span>STEP 3 / 10 • ADAPTIVE ASSESSMENT</span>
              </div>
              <h2 className="text-xl font-bold text-white">Student Takes Adaptive Quiz</h2>
              <p className="text-slate-300 text-sm">
                The assessment engine presents questions with calibrated difficulty to stress-test conceptual clarity.
              </p>
              <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 text-xs space-y-3">
                <div className="text-amber-300 font-semibold">Question: Relation R(A, B, C) with FDs AB → C and C → B. What is the highest normal form?</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-700 text-slate-300">A) 1NF</div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-700 text-slate-300">B) 2NF</div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-indigo-500/50 text-indigo-300 font-medium">C) 3NF (Correct)</div>
                  <div className="p-2.5 bg-rose-950/60 rounded-lg border border-rose-500/50 text-rose-300 font-medium">D) BCNF (Student Selected ✗)</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Student Makes Mistake */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold">
                <AlertCircle className="w-4 h-4" />
                <span>STEP 4 / 10 • MISTAKE LOGGED</span>
              </div>
              <h2 className="text-xl font-bold text-white">Student Confuses Superkey Constraint</h2>
              <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-500/30 text-xs space-y-2">
                <div className="flex items-center space-x-2 text-rose-400 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Incorrect Answer Detected on Subtopic: BCNF Determinants</span>
                </div>
                <p className="text-rose-200">
                  Student marked BCNF because they noticed B was part of the candidate key (A, B). But in BCNF, the determinant C <em>must</em> be a superkey, which it is not!
                </p>
              </div>
              <div className="text-xs text-slate-400">
                Baseline DBMS Knowledge calculated before intervention: <strong className="text-amber-400">61%</strong>
              </div>
            </div>
          )}

          {/* Step 5: AI Identifies Misconception */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold">
                <Brain className="w-4 h-4" />
                <span>STEP 5 / 10 • COGNITIVE DIAGNOSTIC</span>
              </div>
              <h2 className="text-xl font-bold text-white">AI Pinpoints Repeated Misconception</h2>
              <div className="p-4 bg-purple-950/30 rounded-xl border border-purple-500/30 text-xs space-y-2">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                  Cognitive Misconception Rule #14:
                </span>
                <p className="text-purple-200 text-sm font-medium">
                  “Student consistently applies the 3NF prime attribute allowance to BCNF problems. This is the 3rd time Arun has made this specific mistake across quizzes.”
                </p>
              </div>
              <p className="text-slate-400 text-xs">
                EduMind avoids generic 'wrong answer' labels; it understands the cognitive reasoning behind the failure.
              </p>
            </div>
          )}

          {/* Step 6: Updates Student Intelligence Profile */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>STEP 6 / 10 • INTELLIGENCE UPDATE</span>
              </div>
              <h2 className="text-xl font-bold text-white">Student Intelligence Profile Updates Live</h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block mb-1">Mistake Bank Added:</span>
                  <span className="text-rose-400 font-bold">Normalization: 8 mistakes (+1)</span>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block mb-1">Risk Topic Escalated:</span>
                  <span className="text-amber-400 font-bold">High Priority for Exam Prep</span>
                </div>
              </div>
              <p className="text-slate-300 text-xs">
                Profile status: Placement readiness dynamically adjusted to 68% until DB integrity concepts are validated.
              </p>
            </div>
          )}

          {/* Step 7: Personalized Remediation Micro-Lesson */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold">
                <Zap className="w-4 h-4" />
                <span>STEP 7 / 10 • TARGETED REMEDIATION</span>
              </div>
              <h2 className="text-xl font-bold text-white">AI Delivers 2-Minute Targeted Micro-Lesson</h2>
              <div className="p-4 bg-slate-800/90 rounded-xl border border-indigo-500/40 text-xs space-y-2">
                <div className="text-indigo-300 font-bold text-sm">💡 The "Superkey Strictness" Rule:</div>
                <p className="text-slate-200 leading-relaxed">
                  “Arun, think of 3NF as lenient: it forgives you if the right side is a prime attribute. <strong>BCNF is completely strict</strong>: every determinant MUST be a superkey, no exceptions! If C → B and C is not a superkey, the table fails BCNF immediately.”
                </p>
              </div>
            </div>
          )}

          {/* Step 8: Retake Quiz */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold">
                <HelpCircle className="w-4 h-4" />
                <span>STEP 8 / 10 • VERIFICATION RETEST</span>
              </div>
              <h2 className="text-xl font-bold text-white">Student Retakes Adaptive Remediation Quiz</h2>
              <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs space-y-3">
                <div className="text-slate-200 font-semibold">
                  New Question: Relation Enrollment(StudentID, CourseID, Professor). FDs: StudentID, CourseID → Professor; Professor → CourseID. Is it in BCNF?
                </div>
                <div className="p-3 bg-emerald-950/50 rounded-lg border border-emerald-500/40 text-emerald-300 font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Student Answer: "No, because Professor is NOT a superkey even though CourseID is prime." (Correct!)</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 9: Score Jumps */}
          {currentStep === 9 && (
            <div className="space-y-4 text-center py-2">
              <div className="flex items-center justify-center space-x-2 text-emerald-400 text-xs font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>STEP 9 / 10 • MEASURABLE MASTERY GAIN</span>
              </div>
              <h2 className="text-2xl font-black text-white">Score Jumps from 61% to 88%!</h2>
              <div className="flex items-center justify-center space-x-6 py-3">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-xs text-slate-400">Before Intervention</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">61%</div>
                  <div className="text-[10px] text-slate-400">At-Risk Topic</div>
                </div>
                <ArrowRight className="w-6 h-6 text-emerald-400" />
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                  <div className="text-xs text-emerald-300">After AI Remediation</div>
                  <div className="text-3xl font-black text-emerald-400 mt-1">88%</div>
                  <div className="text-[10px] text-emerald-300 font-bold">+27% Improvement</div>
                </div>
              </div>
            </div>
          )}

          {/* Step 10: Dashboard Updates */}
          {currentStep === 10 && (
            <div className="space-y-4 text-center py-2">
              <div className="flex items-center justify-center space-x-2 text-amber-400 text-xs font-semibold">
                <Award className="w-4 h-4" />
                <span>STEP 10 / 10 • CLOSED-LOOP MASTERY</span>
              </div>
              <h2 className="text-2xl font-black text-white">“EduMind Learns the Learner”</h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                The Student Intelligence Profile, Mistake Bank, Exam Readiness, and Placement readiness have all synced in real-time.
              </p>
              <div className="p-4 bg-gradient-to-r from-indigo-950/60 to-emerald-950/60 rounded-xl border border-indigo-500/30 text-xs text-slate-200">
                🎉 Badge Awarded: <strong className="text-amber-300">Normalization Conqueror (+250 XP)</strong>!
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={restartDemo}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-xs flex items-center space-x-1"
              title="Restart Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Previous
              </button>
            )}
            <button
              id="next-demo-step-btn"
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <span>{currentStep === 10 ? 'Apply to Dashboard & Finish' : 'Next Step →'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
