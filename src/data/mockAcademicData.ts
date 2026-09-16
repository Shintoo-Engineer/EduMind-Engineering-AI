import {
  Department,
  Subject,
  StudentIntelligenceProfile,
  MistakeEntry,
  QuizQuestion,
  LabExperiment,
  ProjectIdea,
  QuestionTrendTopic,
  SkillGapItem,
  FacultyStudentRisk,
  DailyStudyPlanDay,
  DepartmentPerformance,
  FacultyProfile,
  AdminProfile
} from '../types';

export const INITIAL_STUDENT_PROFILE: StudentIntelligenceProfile = {
  id: 'stu-arun-104',
  name: 'Arun V.',
  rollNumber: '710022104012',
  department: 'CSE',
  semester: 6,
  cgpa: 8.1,
  targetCgpa: 8.8,
  collegeName: 'National Institute of Engineering & Technology',
  email: 'arun.v21@engineering.edu.in',
  phone: '+91 98402 12345',
  bio: 'Passionate B.E Computer Science student focused on distributed systems, DBMS architecture, and full-stack cloud engineering.',
  overallLearningScore: 78,
  academicProgress: 82,
  technicalSkillsScore: 76,
  placementReadiness: 68,
  projectsCount: 2,
  strongSubjects: ['Python Programming', 'Database Management Systems (SQL)', 'Web Technologies'],
  weakSubjects: ['Operating Systems (Deadlocks/Memory)', 'Computer Networks (Transport Layer)'],
  strongTopics: ['ER Modeling', 'SQL Joins & Grouping', 'Relational Algebra', 'OOP Inheritance'],
  weakTopics: ['Normalization (3NF / BCNF / Functional Dependencies)', 'Deadlock Handling Algorithms', 'TCP 3-Way Handshake & Flow Control', 'Dynamic Programming'],
  codingLevel: 'Intermediate',
  targetRole: 'Full-Stack Software Engineer',
  targetCompanies: ['Google', 'Microsoft', 'Zoho', 'TCS Digital', 'Amazon'],
  attendancePercent: 88,
  recommendations: [
    'Focus on Normalization in DBMS today (Exam countdown: 14 days remaining)',
    'Practice OS Deadlock banker\'s algorithm with 2 numerical problems',
    'Improve DSA graph traversal (BFS/DFS) interview patterns',
    'Add measurable performance metrics to project descriptions on resume'
  ],
  studyStreakDays: 12,
  xpPoints: 7820,
  level: 18,
  badges: [
    { id: 'b1', title: 'Quiz Master', icon: '🏆', date: 'Yesterday', category: 'Assessment' },
    { id: 'b2', title: 'Coding Warrior', icon: '💻', date: '3 days ago', category: 'Coding' },
    { id: 'b3', title: 'Concept Crusher', icon: '🧠', date: 'Last week', category: 'Academics' },
    { id: 'b4', title: 'Viva Champion', icon: '🎤', date: '2 weeks ago', category: 'Oral' },
    { id: 'b5', title: 'Project Builder', icon: '🚀', date: 'Last month', category: 'Projects' }
  ]
};

export const INITIAL_FACULTY_PROFILE: FacultyProfile = {
  id: 'fac-ram-018',
  name: 'Dr. R. Ramanathan',
  facultyId: 'FAC-CSE-018',
  designation: 'Professor & Head of Department',
  department: 'CSE',
  qualification: 'Ph.D. in Distributed Computing (IIT Madras), M.E. (Anna Univ)',
  handlingSubjects: [
    'Database Management Systems (CS3492)',
    'Operating Systems & Kernel Architecture (CS3451)',
    'Advanced Cloud & Distributed Systems (CS3601)'
  ],
  cabinLocation: 'CSE Academic Block, 3rd Floor - Cabin 304',
  email: 'ramanathan.cse@engineering.edu.in',
  phone: '+91 94432 98765',
  officeHours: 'Mon-Thu: 2:30 PM - 4:30 PM, Fri: 10:00 AM - 12:00 PM',
  specialization: 'Transaction Processing, Relational Decomposition, Autonomous Cloud Systems',
  experienceYears: 18
};

export const INITIAL_ADMIN_PROFILE: AdminProfile = {
  id: 'adm-dean-001',
  name: 'Dr. K. S. Sundaram',
  designation: 'Dean of Academic Affairs & Chief Controller of Examinations',
  institutionName: 'National Institute of Engineering & Technology',
  campusCode: 'NIET-7100',
  accreditationTier: 'NBA Tier-1 Accredited & NAAC A++ Grade (CGPA 3.72/4.00)',
  email: 'dean.academics@engineering.edu.in',
  phone: '+91 44 2855 0100',
  academicYear: '2025 - 2026 (Even Semester)',
  visionStatement: 'Nurturing globally competent, ethically upright engineering professionals through outcome-based continuous quality improvement (OBE-CQI).',
  totalStudents: 3420,
  totalFaculty: 186
};

export const SUBJECTS_CATALOG: Subject[] = [
  {
    id: 'sub-dbms',
    code: 'CS3492',
    name: 'Database Management Systems',
    department: 'CSE',
    semester: 4,
    credits: 3,
    progressPercent: 78,
    examReadinessPercent: 72,
    topics: ['ER Model', 'Relational Calculus', 'SQL & PL/SQL', 'Normalization (1NF-BCNF)', 'Transactions & ACID', 'Concurrency Control & Locking', 'Indexing & B+ Trees'],
    weakTopics: ['Normalization', 'Two-Phase Locking (2PL)']
  },
  {
    id: 'sub-os',
    code: 'CS3451',
    name: 'Operating Systems',
    department: 'CSE',
    semester: 4,
    credits: 3,
    progressPercent: 71,
    examReadinessPercent: 64,
    topics: ['Process Synchronization', 'CPU Scheduling', 'Deadlocks & Banker\'s Algorithm', 'Virtual Memory & Paging', 'File Systems', 'Disk Scheduling'],
    weakTopics: ['Deadlock Detection', 'Paging Replacement (LRU/Clock)']
  },
  {
    id: 'sub-cn',
    code: 'CS3591',
    name: 'Computer Networks',
    department: 'CSE',
    semester: 5,
    credits: 3,
    progressPercent: 68,
    examReadinessPercent: 60,
    topics: ['OSI & TCP/IP Reference Model', 'Data Link Framing & Flow Control', 'IP Addressing & Subnetting', 'Routing Algorithms (Dijkstra/Bellman)', 'TCP 3-Way Handshake & Congestion', 'DNS & HTTP/HTTPS'],
    weakTopics: ['TCP Handshake & Congestion Window', 'Subnet Mask Calculation']
  },
  {
    id: 'sub-dsa',
    code: 'CS3301',
    name: 'Data Structures & Algorithms',
    department: 'CSE',
    semester: 3,
    credits: 4,
    progressPercent: 86,
    examReadinessPercent: 82,
    topics: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees (BST, AVL, Red-Black)', 'Heaps & Priority Queues', 'Graph Traversal (BFS/DFS)', 'Dynamic Programming & Greedy'],
    weakTopics: ['AVL Rotations', 'Dynamic Programming Sub-problems']
  },
  {
    id: 'sub-de',
    code: 'EC3352',
    name: 'Digital Electronics',
    department: 'ECE',
    semester: 3,
    credits: 3,
    progressPercent: 65,
    examReadinessPercent: 68,
    topics: ['Boolean Algebra & K-Maps', 'Combinational Circuits (Multiplexers, Decoders)', 'Sequential Circuits (Flip-Flops, Registers)', 'Counters & State Machines', 'Semiconductor Memories'],
    weakTopics: ['JK Flip-Flop Race Around Condition', 'Mod-N Counter Design']
  },
  {
    id: 'sub-thermo',
    code: 'ME3391',
    name: 'Thermodynamics',
    department: 'MECH',
    semester: 3,
    credits: 4,
    progressPercent: 62,
    examReadinessPercent: 58,
    topics: ['First Law of Thermodynamics', 'Second Law & Entropy', 'Carnot Cycle & Efficiency', 'Steam Properties & Rankine Cycle', 'Gas Power Cycles (Otto, Diesel, Brayton)'],
    weakTopics: ['Entropy Generation in Open Systems', 'Brayton Reheat Calculation']
  }
];

export const ACADEMIC_SUBJECTS_CATALOG: Subject[] = SUBJECTS_CATALOG;

export const INITIAL_MISTAKES: MistakeEntry[] = [
  {
    id: 'mst-1',
    subject: 'Database Management Systems',
    topic: 'Normalization',
    subtopic: 'Candidate Keys & 3NF vs BCNF',
    mistakeCount: 4,
    identifiedMisconception: 'Confusing functional dependency determinant requirement in BCNF (must be a superkey) with 3NF (can be prime attribute on RHS).',
    lastOccurred: 'Yesterday during Unit 4 Mock Test',
    remediationStatus: 'Pending',
    remedialLesson: 'Key Rule: For X -> Y in BCNF, X must ALWAYS be a superkey. Unlike 3NF, BCNF does not forgive the relation if Y is a prime attribute!'
  },
  {
    id: 'mst-2',
    subject: 'Operating Systems',
    topic: 'Deadlocks',
    subtopic: 'Banker\'s Algorithm Safe State',
    mistakeCount: 3,
    identifiedMisconception: 'Assuming an unsafe state is strictly identical to a deadlock, rather than a state that may lead to deadlock if max demands occur.',
    lastOccurred: '3 days ago in Class Quiz',
    remediationStatus: 'In Progress',
    remedialLesson: 'Remember: Deadlock State ⊂ Unsafe State. All deadlocks are unsafe, but an unsafe state does not guarantee deadlock until processes actually request maximum resources.'
  },
  {
    id: 'mst-3',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    subtopic: 'TCP 3-Way Handshake SYN Flooding',
    mistakeCount: 2,
    identifiedMisconception: 'Mixing sequence number increments on SYN vs ACK packets in connection establishment.',
    lastOccurred: '5 days ago',
    remediationStatus: 'Pending',
    remedialLesson: 'SYN packet consumes 1 sequence number even without payload data. Client sends SEQ=x; Server responds with ACK=x+1 and SEQ=y; Client completes with ACK=y+1.'
  },
  {
    id: 'mst-4',
    subject: 'Data Structures',
    topic: 'Trees',
    subtopic: 'AVL Double Rotations (LR and RL)',
    mistakeCount: 3,
    identifiedMisconception: 'Incorrectly identifying rotation node during Left-Right imbalance, performing only single left rotation.',
    lastOccurred: '1 week ago',
    remediationStatus: 'Resolved',
    remedialLesson: 'LR case requires two steps: 1) Left rotation on the left child, 2) Right rotation on the unbalanced parent root.'
  }
];

export const INITIAL_MISTAKE_BANK: MistakeEntry[] = INITIAL_MISTAKES;

export const PRELOADED_RAG_DOCUMENTS = [
  {
    id: 'doc-dbms-u4',
    title: 'CS3492 DBMS Unit 4 - Normalization & Relational Design',
    department: 'CSE',
    category: 'Lecture Notes',
    pages: 42,
    uploadDate: '2026-08-15',
    content: `CS3492 DBMS Unit 4 Lecture Notes:
Unit IV: Relational Database Design & Normalization.
Page 21: Functional Dependency: A functional dependency X -> Y holds on relation R if for every pair of tuples t1, t2 in R, t1[X] = t2[X] implies t1[Y] = t2[Y].
Page 22: First Normal Form (1NF): A relation is in 1NF if and only if all underlying domains contain atomic (indivisible) values only. Multi-valued attributes or nested relations are prohibited.
Page 23: Second Normal Form (2NF): A relation is in 2NF if it is in 1NF and no non-prime attribute is partially dependent on any candidate key of a relation. If a candidate key is composite (e.g. {StudentID, CourseID}), non-prime attributes like CourseName dependent solely on CourseID violate 2NF!
Page 26: Third Normal Form (3NF): A relation is in 3NF if whenever a non-trivial functional dependency X -> Y holds, either: 1) X is a superkey, or 2) Y is a prime attribute (member of a candidate key). Eliminates transitive dependencies like StudentID -> DepartmentID -> DepartmentHead.
Page 31: Boyce-Codd Normal Form (BCNF): A stricter version of 3NF. For every non-trivial functional dependency X -> Y, X MUST be a superkey! BCNF eliminates anomalies that 3NF allows when there are overlapping composite candidate keys.
Page 38: De-normalization and multi-valued dependencies (4NF). Lossless join decomposition and dependency preservation guarantees.`
  },
  {
    id: 'doc-os-u3',
    title: 'CS3451 OS Unit 3 - Deadlocks & Process Synchronization',
    department: 'CSE',
    category: 'University Notes',
    pages: 36,
    uploadDate: '2026-08-10',
    content: `CS3451 Operating Systems Unit III Lecture Notes:
Page 15: Critical Section Problem and Semaphore primitives (wait() / P() and signal() / V()).
Page 20: Deadlock Definition: A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process in the same set.
Page 22: Coffman's Four Necessary Conditions for Deadlock:
1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.
2. Hold and Wait: A process must be holding at least one resource and waiting to acquire additional resources.
3. No Preemption: Resources cannot be preempted; they can only be released voluntarily by the process after task completion.
4. Circular Wait: A closed chain of processes exists such that each process holds at least one resource that is needed by the next process in the chain.
Page 27: Deadlock Handling Strategies:
- Deadlock Prevention: Invalidate at least one of the 4 conditions. (e.g. impose resource ordering to eliminate circular wait).
- Deadlock Avoidance: Use Banker's Algorithm by Dijkstra. Ensure the system never enters an unsafe state.
- Deadlock Detection and Recovery: Allow deadlock to occur, run detection algorithm (Resource Allocation Graph cycles for single-unit resources), terminate processes or preempt resources.`
  },
  {
    id: 'doc-cn-u4',
    title: 'CS3591 Computer Networks Unit 4 - Transport Layer Protocols',
    department: 'CSE',
    category: 'Question Bank & Notes',
    pages: 32,
    uploadDate: '2026-08-01',
    content: `CS3591 Computer Networks Unit IV:
Page 18: Transport Layer services: Process-to-process delivery, port addressing, multiplexing, demultiplexing.
Page 21: TCP vs UDP Comparison: Connection-oriented vs connectionless, reliable byte-stream vs unreliable datagram, flow control and congestion control present in TCP.
Page 24: TCP 3-Way Handshake Connection Establishment:
1. Client sends SYN with initial sequence number SEQ=x.
2. Server responds with SYN-ACK, with ACK=x+1 and its own SEQ=y.
3. Client completes connection with ACK, sending SEQ=x+1 and ACK=y+1.
Page 29: TCP Congestion Control Algorithms: Slow Start (exponential cwnd growth), Congestion Avoidance (additive increase / AIMD), Fast Retransmit (3 duplicate ACKs), Fast Recovery.`
  }
];

export const ADAPTIVE_QUIZ_POOL: QuizQuestion[] = [
  // Easy
  {
    id: 'q-dbms-1',
    subject: 'Database Management Systems',
    topic: 'Normalization',
    difficulty: 'Easy',
    question: 'A relation where every attribute contains only atomic (indivisible) values is guaranteed to be in which normal form?',
    options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'BCNF'],
    correctAnswerIndex: 0,
    explanation: 'By definition, 1NF disallows multi-valued attributes and composite attributes; all domain values must be atomic.'
  },
  {
    id: 'q-os-1',
    subject: 'Operating Systems',
    topic: 'Deadlocks',
    difficulty: 'Easy',
    question: 'Which of the following is NOT one of Coffman\'s four necessary conditions for deadlock?',
    options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
    correctAnswerIndex: 2,
    explanation: 'The condition is NO PREEMPTION. If preemption is allowed, deadlocks cannot occur.'
  },
  // Medium
  {
    id: 'q-dbms-2',
    subject: 'Database Management Systems',
    topic: 'Normalization',
    difficulty: 'Medium',
    question: 'A relation R(A, B, C, D) has candidate key {A, B} and functional dependency B -> C. Which normal form is violated?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctAnswerIndex: 1,
    explanation: 'Since B is a proper subset of candidate key {A, B}, the dependency B -> C represents a partial dependency on a non-prime attribute (C), violating 2NF.',
    misconceptionTriggered: 'Partial vs Transitive dependency'
  },
  {
    id: 'q-cn-2',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    difficulty: 'Medium',
    question: 'During a TCP 3-way handshake, if client sends SEQ=500 in SYN, what should the ACK number sent back by the server be?',
    options: ['500', '501', '502', 'Random value'],
    correctAnswerIndex: 1,
    explanation: 'A SYN flag logically consumes 1 sequence number. Therefore, the acknowledgment number indicates the next expected sequence number: 500 + 1 = 501.',
    misconceptionTriggered: 'TCP sequence increment on flags'
  },
  // Hard
  {
    id: 'q-dbms-3',
    subject: 'Database Management Systems',
    topic: 'Normalization',
    difficulty: 'Hard',
    question: 'Relation R(A, B, C) has functional dependencies AB -> C and C -> B. Candidate keys are {A, B} and {A, C}. In what highest normal form is R?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctAnswerIndex: 2,
    explanation: 'It is in 3NF because for C -> B, B is a prime attribute (part of candidate key {A, B}). However, C is NOT a superkey, so it violates BCNF! Thus highest NF is 3NF.',
    misconceptionTriggered: 'Candidate Keys & 3NF vs BCNF'
  },
  {
    id: 'q-os-3',
    subject: 'Operating Systems',
    topic: 'Deadlocks',
    difficulty: 'Hard',
    question: 'In Banker\'s Algorithm, if the state is found to be "Unsafe", what can be definitively concluded?',
    options: [
      'The system is currently in a deadlock state.',
      'The system will definitely deadlock in the next resource request.',
      'The system has no guarantee of avoiding deadlock if all processes simultaneously demand their maximum claims.',
      'All processes must immediately be terminated by the OS scheduler.'
    ],
    correctAnswerIndex: 2,
    explanation: 'An unsafe state is NOT synonymous with deadlock. It simply means the OS cannot guarantee that deadlock will not happen if processes request up to their declared maximums.',
    misconceptionTriggered: 'Unsafe state vs Deadlock state'
  }
];

export const QUESTION_TREND_DATA: QuestionTrendTopic[] = [
  {
    topic: 'Normalization (3NF / BCNF / Lossless Decomposition)',
    subject: 'Database Management Systems',
    frequencyOutTen: 9,
    lastAppearedYears: [2022, 2023, 2024, 2025],
    importanceTier: 'High',
    sampleQuestions: [
      'State 1NF, 2NF, 3NF and BCNF with suitable examples (16 marks)',
      'Given R(A, B, C, D, E) with FDs, determine the candidate keys and decompose to BCNF (13 marks)',
      'Prove why every relation in BCNF is also in 3NF, but not vice-versa (8 marks)'
    ]
  },
  {
    topic: 'Transactions & Concurrency Control (ACID & 2PL)',
    subject: 'Database Management Systems',
    frequencyOutTen: 8,
    lastAppearedYears: [2021, 2022, 2023, 2025],
    importanceTier: 'High',
    sampleQuestions: [
      'Explain Strict Two-Phase Locking (S2PL) and Rigorous 2PL with schedule validation (13 marks)',
      'Discuss conflict serializability vs view serializability with precedence graphs (13 marks)'
    ]
  },
  {
    topic: 'Deadlock Handling & Banker\'s Algorithm',
    subject: 'Operating Systems',
    frequencyOutTen: 9,
    lastAppearedYears: [2022, 2023, 2024, 2025],
    importanceTier: 'High',
    sampleQuestions: [
      'Solve Banker\'s safety numerical for 5 processes and 3 resource types (16 marks)',
      'Detail the four necessary conditions for deadlock and methods to prevent them (13 marks)'
    ]
  },
  {
    topic: 'TCP 3-Way Handshake & Flow Control',
    subject: 'Computer Networks',
    frequencyOutTen: 8,
    lastAppearedYears: [2022, 2023, 2024],
    importanceTier: 'High',
    sampleQuestions: [
      'Draw the state transition diagram for TCP connection establishment and termination (13 marks)',
      'Explain TCP Tahoe and Reno congestion control with Slow Start threshold graphs (16 marks)'
    ]
  },
  {
    topic: 'B+ Tree Indexing & Query Optimization',
    subject: 'Database Management Systems',
    frequencyOutTen: 7,
    lastAppearedYears: [2021, 2023, 2024],
    importanceTier: 'Medium',
    sampleQuestions: [
      'Construct a B+ tree of order 3 for the given key insertions and node splits (13 marks)'
    ]
  }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'lab-dbms-1',
    labName: 'Database Management Systems Laboratory',
    department: 'CSE',
    experimentNumber: 4,
    title: 'Implementation of Database Normalization & Integrity Constraints',
    objective: 'To design a normalized relational schema up to 3NF/BCNF with primary key, foreign key, and check constraints in SQL.',
    componentsRequired: ['PostgreSQL / MySQL Server 8.0', 'DBeaver / pgAdmin client'],
    theory: 'Normalization organizes data to reduce redundancy and eliminate undesirable insert, update, and delete anomalies. In 3NF, transitive functional dependencies are removed by splitting non-prime dependent attributes into separate referenced tables with foreign key relationships.',
    procedure: [
      'Analyze un-normalized student-course enrollment table with composite attributes.',
      'Decompose relation into Students(student_id PK, name, dept_id FK), Departments(dept_id PK, dept_name), Courses(course_id PK, title, credits), and Enrollments(enroll_id PK, student_id FK, course_id FK, grade).',
      'Execute DDL scripts with appropriate ON DELETE CASCADE foreign keys.',
      'Populate test records and demonstrate prevention of update and deletion anomalies.'
    ],
    codeOrCircuitDiagram: `CREATE TABLE Departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Students (
    student_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept_id INT REFERENCES Departments(dept_id) ON DELETE RESTRICT
);

CREATE TABLE Enrollments (
    enroll_id SERIAL PRIMARY KEY,
    student_id VARCHAR(20) REFERENCES Students(student_id),
    course_code VARCHAR(10) NOT NULL,
    semester INT CHECK (semester BETWEEN 1 AND 8),
    grade VARCHAR(2)
);`,
    expectedOutput: 'Relational schema successfully compiled with zero redundancy. Foreign key constraints reject orphan student enrollments with SQLSTATE 23503.',
    troubleshootingTips: [
      'If foreign key creation throws an error, verify that referenced column has a UNIQUE or PRIMARY KEY index.',
      'Check data types match exactly between foreign key and referenced primary key.'
    ],
    vivaQuestions: [
      { q: 'Why is ON DELETE CASCADE used with caution in banking or core college systems?', a: 'Because cascading deletion can accidentally purge historical financial ledgers or academic transcript audit trails.' },
      { q: 'What is the primary difference between 3NF and BCNF?', a: 'In BCNF, every determinant must be a superkey. 3NF relaxes this if the right-hand attribute is prime.' }
    ]
  },
  {
    id: 'lab-os-1',
    labName: 'Operating Systems Laboratory',
    department: 'CSE',
    experimentNumber: 5,
    title: 'Banker\'s Algorithm for Deadlock Avoidance',
    objective: 'To simulate Banker\'s algorithm in C/C++ to test whether a given allocation state is safe and generate the safe execution sequence.',
    componentsRequired: ['GCC Compiler', 'Linux Terminal / POSIX environment'],
    theory: 'Banker\'s Algorithm checks if granting resource requests maintains a safe state where there is at least one sequence of process executions that can complete without deadlocking.',
    procedure: [
      'Input number of processes (P) and resource instances (R).',
      'Input Allocation matrix, Max claim matrix, and Available vector.',
      'Calculate Need matrix: Need[i][j] = Max[i][j] - Allocation[i][j].',
      'Initialize Work = Available and Finish[i] = false for all i.',
      'Find process Pi such that Finish[i] == false and Need[i] <= Work.',
      'If found: Work += Allocation[i], Finish[i] = true, append Pi to safe sequence. Repeat.',
      'If all Finish[i] == true, print Safe Sequence; else report Deadlock/Unsafe.'
    ],
    codeOrCircuitDiagram: `// Banker's Algorithm Need Calculation & Safety Test
bool isSafeState(int P, int R, int alloc[P][R], int max[P][R], int avail[R], int safeSeq[P]) {
    int need[P][R];
    for (int i = 0; i < P; i++)
        for (int j = 0; j < R; j++)
            need[i][j] = max[i][j] - alloc[i][j];

    bool finish[P] = {0};
    int work[R];
    for (int j = 0; j < R; j++) work[j] = avail[j];

    int count = 0;
    while (count < P) {
        bool found = false;
        for (int p = 0; p < P; p++) {
            if (!finish[p]) {
                int j;
                for (j = 0; j < R; j++) if (need[p][j] > work[j]) break;
                if (j == R) {
                    for (int k = 0; k < R; k++) work[k] += alloc[p][k];
                    safeSeq[count++] = p;
                    finish[p] = true;
                    found = true;
                }
            }
        }
        if (!found) return false; // System is unsafe!
    }
    return true;
}`,
    expectedOutput: 'System is in a SAFE state. Safe execution sequence: P1 -> P3 -> P4 -> P0 -> P2.',
    troubleshootingTips: [
      'Ensure Available resources input matches Total Resources minus sum of allocated resources.',
      'Beware of array bounds when indexing processes and resources.'
    ],
    vivaQuestions: [
      { q: 'Why is Banker\'s algorithm rarely used in modern general-purpose operating systems like Linux or Windows?', a: 'Because processes rarely know their maximum resource claims in advance, and resource counts are dynamic.' },
      { q: 'What is the time complexity of the Banker\'s safety algorithm?', a: 'O(P² * R), where P is number of processes and R is resource types.' }
    ]
  }
];

export const PROJECT_IDEAS: ProjectIdea[] = [
  {
    id: 'proj-1',
    title: 'AI-Powered Continuous Smart Campus & Academic Intelligence Ecosystem',
    department: 'CSE',
    domain: 'Artificial Intelligence & EdTech',
    abstract: 'An enterprise educational intelligence platform that aggregates student learning footprints, RAG-grounded college syllabus repositories, and adaptive knowledge assessment to synthesize predictive academic interventions.',
    problemStatement: 'Current Learning Management Systems (LMS) act as passive document dumpsters without personalized intelligence, failing to detect conceptual learning breakdowns before semester examinations.',
    proposedSystem: 'A real-time hybrid architecture combining vector search over lecture slide notes, adaptive misconception diagnostics, and automated career skill-gap mitigation.',
    novelty: 'Closed-loop Student Intelligence Profile that continuously recalculates conceptual mastery from live quiz mistakes, oral viva simulations, and git commits.',
    features: [
      'Document Chunking & Vector RAG with university syllabus alignment',
      'Adaptive testing changing difficulty in real-time based on concept graphs',
      'AI Oral Viva simulator with speech emotion and conceptual depth scoring',
      'Placement readiness engine with resume ATS auditing'
    ],
    techStack: ['React 19 / TypeScript', 'FastAPI / Node.js Express', 'Gemini 3.8 Flash', 'PostgreSQL / pgvector', 'Tailwind CSS'],
    architectureOverview: 'Client Web Application -> REST / WebSocket API Gateway -> Agent Decision Orchestrator -> Vector Document Indexer -> LLM Grounding Pipeline -> Relational Analytics DB',
    ratings: {
      innovation: 8.8,
      feasibility: 9.2,
      complexity: 8.4,
      industryValue: 9.5
    }
  },
  {
    id: 'proj-2',
    title: 'Autonomous Edge IoT Pipeline for Structural Health Monitoring in Civil Bridges',
    department: 'CIVIL',
    domain: 'IoT & Structural Engineering',
    abstract: 'Deployment of wireless vibration, tilt, and strain sensor arrays across municipal highway bridges utilizing tinyML edge inference to identify micro-fractures prior to catastrophic structural collapse.',
    problemStatement: 'Manual physical bridge inspections are infrequent, labor-intensive, and fail to detect interior fatigue degradation under dynamic vehicle loads.',
    proposedSystem: 'ESP32 / LoRaWAN edge sensor mesh transmitting accelerometer FFT spectrograms to a cloud dashboard with automated deflection threshold warnings.',
    novelty: 'Sub-second edge vibration harmonic anomaly detection powered by quantized autoencoders running on microcontroller memory.',
    features: ['Real-time 3-axis accelerometer logging', 'Solar powered battery harvesting', 'Predictive maintenance life cycle curve', 'Emergency SMS dispatch'],
    techStack: ['ESP32 microcontrollers', 'LoRaWAN', 'Python', 'MQTT Broker', 'Grafana'],
    architectureOverview: 'Sensors -> ESP32 Edge Node -> LoRa Gateway -> Cloud MQTT -> Time-Series DB -> Web Visualizer',
    ratings: {
      innovation: 8.5,
      feasibility: 8.9,
      complexity: 8.0,
      industryValue: 9.1
    }
  }
];

export const SKILL_GAP_ANALYSIS: SkillGapItem[] = [
  { skill: 'Data Structures & Algorithms (LeetCode/Interview)', category: 'Core CS', requiredLevelPercent: 85, currentLevelPercent: 55, status: 'High Gap' },
  { skill: 'Operating Systems & System Concurrency', category: 'Core CS', requiredLevelPercent: 75, currentLevelPercent: 52, status: 'High Gap' },
  { skill: 'Database Management Systems & SQL Optimization', category: 'Core CS', requiredLevelPercent: 80, currentLevelPercent: 74, status: 'In Progress' },
  { skill: 'Computer Networks & HTTP/REST/WebSockets', category: 'Core CS', requiredLevelPercent: 70, currentLevelPercent: 48, status: 'High Gap' },
  { skill: 'Python Programming & Scripting', category: 'Languages', requiredLevelPercent: 80, currentLevelPercent: 88, status: 'Mastered' },
  { skill: 'React / Frontend Architecture', category: 'Frameworks', requiredLevelPercent: 75, currentLevelPercent: 62, status: 'In Progress' },
  { skill: 'FastAPI / Node.js Backend & API Design', category: 'Frameworks', requiredLevelPercent: 70, currentLevelPercent: 58, status: 'In Progress' },
  { skill: 'Git, GitHub CI/CD & Version Control', category: 'Tools & Infra', requiredLevelPercent: 75, currentLevelPercent: 82, status: 'Mastered' },
  { skill: 'System Design Basics (Caching, Scaling, DB Indexing)', category: 'Core CS', requiredLevelPercent: 65, currentLevelPercent: 40, status: 'High Gap' },
  { skill: 'Technical Communication & Viva Articulation', category: 'Soft Skills', requiredLevelPercent: 80, currentLevelPercent: 71, status: 'In Progress' }
];

export const FACULTY_CLASS_RISKS: FacultyStudentRisk[] = [
  {
    id: 'risk-1',
    name: 'Kavitha R.',
    rollNumber: '710022104044',
    department: 'CSE',
    riskLevel: 'High',
    trend: [82, 77, 69, 61],
    scoreTrend: '82% → 77% → 69% → 61%',
    weakestTopic: 'Normalization & BCNF',
    attendance: 78,
    status: 'High Intervention Needed',
    detectedIssue: 'Declining test scores across 3 consecutive DBMS tests; critical misconceptions in Normalization and Multi-valued dependencies.',
    lastActive: '3 hours ago',
    recommendedAction: 'Assign Unit 4 remediation micro-module and schedule 1-on-1 concept review before the second internal assessment.'
  },
  {
    id: 'risk-2',
    name: 'Dinesh Kumar M.',
    rollNumber: '710022104028',
    department: 'CSE',
    riskLevel: 'High',
    trend: [74, 68, 62, 54],
    scoreTrend: '74% → 68% → 62% → 54%',
    weakestTopic: 'Banker\'s Algorithm & Deadlocks',
    attendance: 64,
    status: 'Critical Alert',
    detectedIssue: 'Zero attendance in OS lab sessions for 2 weeks; unable to submit Banker\'s algorithm simulation test.',
    lastActive: '4 days ago',
    recommendedAction: 'Trigger parent/advisor advisory alert; provision makeup laboratory slot for OS practicals.'
  },
  {
    id: 'risk-3',
    name: 'Siddharth S.',
    rollNumber: '710022104089',
    department: 'CSE',
    riskLevel: 'Medium',
    trend: [88, 85, 76, 72],
    scoreTrend: '88% → 85% → 76% → 72%',
    weakestTopic: 'Subnetting & Routing Protocols',
    attendance: 88,
    status: 'Monitoring',
    detectedIssue: 'Drop in Computer Networks test scores, specifically in subnetting numericals and routing vector calculations.',
    lastActive: 'Yesterday',
    recommendedAction: 'Provide CN numerical practice worksheet with step-by-step IP calculation tutorials.'
  },
  {
    id: 'risk-4',
    name: 'Pooja Nair',
    rollNumber: '710022104065',
    department: 'CSE',
    riskLevel: 'Low',
    trend: [78, 80, 84, 86],
    scoreTrend: '78% → 80% → 84% → 86%',
    weakestTopic: 'Dynamic Programming',
    attendance: 94,
    status: 'Targeting Honors',
    detectedIssue: 'Consistent positive progression, active in coding mentor and viva preparation modules.',
    lastActive: '20 minutes ago',
    recommendedAction: 'Nominate for competitive hackathon team and advanced project mentorship track.'
  }
];

export const EXAM_STUDY_PLAN: DailyStudyPlanDay[] = [
  {
    dayNumber: 1,
    topic: 'Relational Model & ER Diagrams',
    isHighRisk: false,
    recommendedMinutes: 90,
    subtopics: ['Entities, Attributes, Relationship mapping', 'Weak entity sets and identifying relationships', 'Converting ER models to relational tables'],
    completed: true
  },
  {
    dayNumber: 2,
    topic: 'Relational Algebra & Tuple Calculus',
    isHighRisk: false,
    recommendedMinutes: 100,
    subtopics: ['Select, Project, Cartesian Product, Join operators', 'Division operator and universal quantification', 'Tuple Relational Calculus safety conditions'],
    completed: true
  },
  {
    dayNumber: 3,
    topic: 'SQL DDL, DML & Integrity Constraints',
    isHighRisk: false,
    recommendedMinutes: 80,
    subtopics: ['Primary key, foreign key, check, and unique constraints', 'Complex aggregate queries with GROUP BY and HAVING', 'Correlated subqueries vs nested subqueries'],
    completed: true
  },
  {
    dayNumber: 4,
    topic: 'Functional Dependencies & Closure',
    isHighRisk: true,
    recommendedMinutes: 120,
    subtopics: ['Armstrong\'s Axioms (Reflexivity, Augmentation, Transitivity)', 'Computing attribute closure X+', 'Finding all Candidate Keys from functional dependencies'],
    completed: false
  },
  {
    dayNumber: 5,
    topic: 'Normalization: 1NF, 2NF, 3NF',
    isHighRisk: true,
    recommendedMinutes: 140,
    subtopics: ['Anomalies: insertion, deletion, and update redundancy', 'Partial dependencies and 2NF decomposition', 'Transitive dependencies and 3NF decomposition formula'],
    completed: false
  },
  {
    dayNumber: 6,
    topic: 'Boyce-Codd Normal Form (BCNF) & Lossless Joins',
    isHighRisk: true,
    recommendedMinutes: 150,
    subtopics: ['BCNF determinant superkey condition', 'Lossless-join decomposition test', 'Dependency preservation vs BCNF trade-offs'],
    completed: false
  },
  {
    dayNumber: 7,
    topic: '4NF, 5NF & Multi-Valued Dependencies',
    isHighRisk: false,
    recommendedMinutes: 90,
    subtopics: ['MVD definitions and trivial MVDs', '4NF decomposition', 'Join dependencies and Project-Join Normal Form (5NF)'],
    completed: false
  },
  {
    dayNumber: 8,
    topic: 'Transactions & ACID Properties',
    isHighRisk: true,
    recommendedMinutes: 110,
    subtopics: ['Atomicity, Consistency, Isolation, Durability definitions', 'Transaction states transition diagram', 'Dirty Read, Unrepeatable Read, Phantom Read anomalies'],
    completed: false
  },
  {
    dayNumber: 9,
    topic: 'Concurrency Control & Two-Phase Locking (2PL)',
    isHighRisk: true,
    recommendedMinutes: 130,
    subtopics: ['Conflict serializability and Precedence Graph test', 'Basic 2PL, Conservative 2PL, Strict 2PL, Rigorous 2PL', 'Timestamp ordering protocol and Thomas Write Rule'],
    completed: false
  },
  {
    dayNumber: 10,
    topic: 'Database Deadlocks & Recovery Systems',
    isHighRisk: false,
    recommendedMinutes: 100,
    subtopics: ['Wait-for Graph deadlock detection', 'Log-based recovery (Immediate vs Deferred update)', 'Checkpoints and ARIES recovery algorithm'],
    completed: false
  },
  {
    dayNumber: 11,
    topic: 'File Organization & Indexing Basics',
    isHighRisk: false,
    recommendedMinutes: 90,
    subtopics: ['Dense vs Sparse Indexing', 'Primary, Clustered, and Secondary Indexes', 'Static vs Dynamic Hashing (Extendible hashing)'],
    completed: false
  },
  {
    dayNumber: 12,
    topic: 'B-Trees and B+ Trees Construction',
    isHighRisk: true,
    recommendedMinutes: 120,
    subtopics: ['B+ tree search, insert with node splitting, and delete', 'Comparing B+ trees with B-trees for disk page I/O', 'Calculating order and maximum records for a given block size'],
    completed: false
  },
  {
    dayNumber: 13,
    topic: 'Query Processing & Cost Estimation',
    isHighRisk: false,
    recommendedMinutes: 90,
    subtopics: ['Query evaluation steps (Parsing, Optimization, Execution)', 'Join algorithms: Nested loop, Block nested, Merge join, Hash join', 'Relational algebra equivalence rules for heuristics'],
    completed: false
  },
  {
    dayNumber: 14,
    topic: 'Full Previous Year Paper Mock & Revision',
    isHighRisk: true,
    recommendedMinutes: 180,
    subtopics: ['Anna University 2024 Question Paper Full 3-Hour Simulation', 'Mistake Bank high-yield flashcard review', '13-mark and 16-mark answer presentation rehearsal'],
    completed: false
  }
];

export const DEPARTMENT_PERFORMANCES: DepartmentPerformance[] = [
  { department: 'Computer Science & Engineering', studentCount: 540, avgScore: 81.2, placementPercent: 88.4, atRiskCount: 14 },
  { department: 'Information Technology', studentCount: 360, avgScore: 79.5, placementPercent: 85.0, atRiskCount: 11 },
  { department: 'Electronics & Communication', studentCount: 420, avgScore: 76.8, placementPercent: 78.2, atRiskCount: 18 },
  { department: 'Electrical & Electronics', studentCount: 260, avgScore: 74.3, placementPercent: 72.5, atRiskCount: 15 },
  { department: 'Mechanical Engineering', studentCount: 210, avgScore: 72.1, placementPercent: 68.0, atRiskCount: 16 },
  { department: 'Civil Engineering', studentCount: 150, avgScore: 73.9, placementPercent: 64.5, atRiskCount: 9 }
];
