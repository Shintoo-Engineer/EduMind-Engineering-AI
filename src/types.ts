export type Department = 'CSE' | 'ECE' | 'MECH' | 'CIVIL' | 'EEE' | 'AI_DS';

export type TutorMode = 'beginner' | 'intermediate' | 'advanced' | 'exam' | 'socratic';

export type TutorLanguage = 'English' | 'Tamil' | 'Hindi' | 'Telugu' | 'Spanish';

export type UserRole = 'student' | 'faculty' | 'admin';

export interface SourceCitation {
  id: string;
  documentTitle: string;
  unit: string;
  page: number | string;
  excerpt: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  mode?: TutorMode;
  language?: TutorLanguage;
  sources?: SourceCitation[];
  conceptBreakdown?: {
    summary: string;
    keyPoints: string[];
    examTips?: string;
  };
  audioUrl?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  department: Department;
  semester: number;
  credits: number;
  progressPercent: number;
  examReadinessPercent: number;
  topics: string[];
  weakTopics: string[];
}

export interface StudentIntelligenceProfile {
  id: string;
  name: string;
  rollNumber: string;
  department: Department;
  semester: number;
  cgpa: number;
  overallLearningScore: number;
  academicProgress: number;
  technicalSkillsScore: number;
  placementReadiness: number;
  projectsCount: number;
  strongSubjects: string[];
  weakSubjects: string[];
  strongTopics: string[];
  weakTopics: string[];
  codingLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Competitive';
  targetRole: string;
  targetCompanies: string[];
  attendancePercent: number;
  recommendations: string[];
  studyStreakDays: number;
  xpPoints: number;
  level: number;
  email?: string;
  phone?: string;
  collegeName?: string;
  bio?: string;
  targetCgpa?: number;
  badges: Array<{
    id: string;
    title: string;
    icon: string;
    date: string;
    category: string;
  }>;
}

export interface FacultyProfile {
  id: string;
  name: string;
  facultyId: string;
  designation: string;
  department: Department;
  qualification: string;
  handlingSubjects: string[];
  cabinLocation: string;
  email: string;
  phone: string;
  officeHours: string;
  specialization: string;
  experienceYears: number;
  avatarUrl?: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  designation: string;
  institutionName: string;
  campusCode: string;
  accreditationTier: string;
  email: string;
  phone: string;
  academicYear: string;
  visionStatement: string;
  totalStudents: number;
  totalFaculty: number;
  avatarUrl?: string;
}

export interface MistakeEntry {
  id: string;
  subject: string;
  topic: string;
  subtopic: string;
  mistakeCount: number;
  identifiedMisconception: string;
  lastOccurred: string;
  remediationStatus: 'Pending' | 'In Progress' | 'Resolved';
  remedialLesson: string;
}

export interface QuizQuestion {
  id: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  misconceptionTriggered?: string;
}

export interface QuizAttemptResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  identifiedWeaknesses: string[];
  timeTakenSeconds: number;
  xpEarned: number;
  adaptivePath: Array<{
    questionId: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    correct: boolean;
  }>;
}

export interface CodeAnalysisResult {
  language: string;
  hasErrors: boolean;
  logicalErrors: string[];
  timeComplexity: string;
  spaceComplexity: string;
  codeQualityScore: number; // 0-100
  securityIssues: string[];
  bestPracticeSuggestions: string[];
  debuggingHints: Array<{
    line: number;
    issue: string;
    explanation: string;
    guidingQuestion: string;
  }>;
  suggestedOptimization?: string;
}

export interface VivaTurn {
  speaker: 'examiner' | 'student';
  text: string;
  timestamp: string;
}

export interface VivaReport {
  overallScore: number;
  conceptKnowledge: number;
  answerAccuracy: number;
  communication: number;
  confidence: number;
  strengths: string[];
  areasOfImprovement: string[];
  examinerRemarks: string;
}

export interface LabExperiment {
  id: string;
  labName: string;
  department: Department;
  experimentNumber: number;
  title: string;
  objective: string;
  componentsRequired: string[];
  theory: string;
  procedure: string[];
  codeOrCircuitDiagram: string;
  expectedOutput: string;
  troubleshootingTips: string[];
  vivaQuestions: Array<{
    q: string;
    a: string;
  }>;
}

export interface ProjectIdea {
  id: string;
  title: string;
  department: Department;
  domain: string;
  abstract: string;
  problemStatement: string;
  proposedSystem: string;
  novelty: string;
  features: string[];
  techStack: string[];
  architectureOverview: string;
  ratings: {
    innovation: number; // 0-10
    feasibility: number;
    complexity: number;
    industryValue: number;
  };
}

export interface QuestionTrendTopic {
  topic: string;
  subject: string;
  frequencyOutTen: number;
  lastAppearedYears: number[];
  importanceTier: 'High' | 'Medium' | 'Moderate';
  sampleQuestions: string[];
}

export interface DailyStudyPlanDay {
  dayNumber: number;
  topic: string;
  isHighRisk: boolean;
  recommendedMinutes: number;
  subtopics: string[];
  completed: boolean;
}

export interface SkillGapItem {
  skill: string;
  category: 'Core CS' | 'Languages' | 'Frameworks' | 'Tools & Infra' | 'Soft Skills';
  requiredLevelPercent: number;
  currentLevelPercent: number;
  status: 'Mastered' | 'In Progress' | 'High Gap';
}

export interface FacultyStudentRisk {
  id: string;
  name: string;
  rollNumber: string;
  department: Department;
  riskLevel: 'High' | 'Medium' | 'Low';
  trend: number[]; // e.g. [82, 77, 69, 61]
  detectedIssue: string;
  lastActive: string;
  recommendedAction: string;
  scoreTrend?: string;
  weakestTopic?: string;
  attendance?: number;
  status?: string;
}

export type ExamStudyDay = DailyStudyPlanDay;
export type CodeReviewResult = CodeAnalysisResult;

export interface DepartmentPerformance {
  department: string;
  studentCount: number;
  avgScore: number;
  placementPercent: number;
  atRiskCount: number;
}

export interface ResumeAnalysis {
  atsScore: number;
  technicalSkillsScore: number;
  projectQualityScore: number;
  achievementsScore: number;
  formattingScore: number;
  criticalFeedback: string[];
  recommendedAdditions: string[];
}
