import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  Award,
  Download,
  Star,
  RotateCcw,
  Play,
  BookOpen,
  Heart,
  Shield,
  Zap,
  Target,
  Users,
  FileText,
  Trophy,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  passingScore: number;
  questions: Question[];
  totalQuestions: number;
  icon: string;
  certificateEligible: boolean;
  prerequisites?: string[];
}

interface QuizResult {
  quizId: string;
  score: number;
  percentage: number;
  timeSpent: number;
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: Date;
  certificateGenerated?: boolean;
}

interface UserProgress {
  quizzesCompleted: number;
  totalScore: number;
  certificatesEarned: number;
  averageScore: number;
  streakDays: number;
}

const QuizSystem: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    quizzesCompleted: 12,
    totalScore: 8640,
    certificatesEarned: 6,
    averageScore: 87,
    streakDays: 5
  });

  const { toast } = useToast();

  // Comprehensive quiz data
  useEffect(() => {
    const comprehensiveQuizzes: Quiz[] = [
      {
        id: '1',
        title: 'Mental Health Awareness',
        description: 'Comprehensive assessment of mental health knowledge and awareness',
        category: 'Mental Health',
        difficulty: 'Beginner',
        duration: 20,
        passingScore: 80,
        totalQuestions: 15,
        icon: '🧠',
        certificateEligible: true,
        questions: [
          {
            id: '1-1',
            question: 'Which of the following is a common symptom of anxiety?',
            options: ['Excessive worrying', 'Improved focus', 'Increased energy', 'Better sleep'],
            correct: 0,
            explanation: 'Excessive worrying is one of the most common symptoms of anxiety disorders.',
            difficulty: 'Easy',
            category: 'Mental Health'
          },
          {
            id: '1-2',
            question: 'What percentage of college students experience mental health challenges?',
            options: ['10-20%', '30-40%', '50-60%', '70-80%'],
            correct: 2,
            explanation: 'Studies show that approximately 50-60% of college students experience mental health challenges.',
            difficulty: 'Medium',
            category: 'Mental Health'
          },
          {
            id: '1-3',
            question: 'Which technique is most effective for immediate stress relief?',
            options: ['Deep breathing exercises', 'Intense physical exercise', 'Caffeine consumption', 'Social media scrolling'],
            correct: 0,
            explanation: 'Deep breathing exercises are scientifically proven to provide immediate stress relief.',
            difficulty: 'Easy',
            category: 'Mental Health'
          },
          {
            id: '1-4',
            question: 'What is the primary neurotransmitter associated with depression?',
            options: ['Dopamine', 'Serotonin', 'Adrenaline', 'Cortisol'],
            correct: 1,
            explanation: 'Serotonin imbalance is strongly linked to depression and mood disorders.',
            difficulty: 'Medium',
            category: 'Mental Health'
          },
          {
            id: '1-5',
            question: 'Which of these is NOT a warning sign of mental health crisis?',
            options: ['Social withdrawal', 'Improved academic performance', 'Sleep disturbances', 'Mood swings'],
            correct: 1,
            explanation: 'Improved academic performance is generally positive, while other options are warning signs.',
            difficulty: 'Easy',
            category: 'Mental Health'
          },
          {
            id: '1-6',
            question: 'What does stigma around mental health typically involve?',
            options: ['Seeking professional help', 'Negative attitudes and discrimination', 'Taking medication', 'Joining support groups'],
            correct: 1,
            explanation: 'Mental health stigma involves negative attitudes, stereotypes, and discrimination.',
            difficulty: 'Medium',
            category: 'Mental Health'
          },
          {
            id: '1-7',
            question: 'Which factor is most important for mental health recovery?',
            options: ['Expensive treatment', 'Social support system', 'Perfect life circumstances', 'Avoiding all stress'],
            correct: 1,
            explanation: 'A strong social support system is crucial for mental health recovery and maintenance.',
            difficulty: 'Medium',
            category: 'Mental Health'
          },
          {
            id: '1-8',
            question: 'What is the recommended first step when experiencing mental health concerns?',
            options: ['Ignore the feelings', 'Self-medicate', 'Seek professional help', 'Isolate yourself'],
            correct: 2,
            explanation: 'Seeking professional help is the recommended first step for addressing mental health concerns.',
            difficulty: 'Easy',
            category: 'Mental Health'
          },
          {
            id: '1-9',
            question: 'Which lifestyle factor has the most impact on mental health?',
            options: ['Income level', 'Sleep quality', 'Social media usage', 'Academic grades'],
            correct: 1,
            explanation: 'Sleep quality significantly impacts mood, cognitive function, and overall mental health.',
            difficulty: 'Medium',
            category: 'Mental Health'
          },
          {
            id: '1-10',
            question: 'What is mindfulness?',
            options: ['Thinking about the future', 'Being present in the moment', 'Analyzing past events', 'Multitasking effectively'],
            correct: 1,
            explanation: 'Mindfulness is the practice of being fully present and aware in the current moment.',
            difficulty: 'Easy',
            category: 'Mental Health'
          },
          {
            id: '1-11',
            question: 'Which therapy approach focuses on changing negative thought patterns?',
            options: ['Psychoanalysis', 'Cognitive Behavioral Therapy', 'Art therapy', 'Music therapy'],
            correct: 1,
            explanation: 'CBT specifically targets and helps change negative thought patterns and behaviors.',
            difficulty: 'Medium',
            category: 'Mental Health'
          },
          {
            id: '1-12',
            question: 'What is the difference between sadness and depression?',
            options: ['No difference', 'Duration and intensity', 'Age of onset', 'Gender differences'],
            correct: 1,
            explanation: 'Depression is characterized by persistent sadness lasting weeks/months with significant impact on daily life.',
            difficulty: 'Hard',
            category: 'Mental Health'
          },
          {
            id: '1-13',
            question: 'Which is a healthy coping mechanism for stress?',
            options: ['Substance use', 'Social isolation', 'Regular exercise', 'Avoiding problems'],
            correct: 2,
            explanation: 'Regular exercise is a proven healthy coping mechanism that reduces stress and improves mood.',
            difficulty: 'Easy',
            category: 'Mental Health'
          },
          {
            id: '1-14',
            question: 'What role does nutrition play in mental health?',
            options: ['No impact', 'Significant impact on mood and cognition', 'Only affects physical health', 'Only matters for athletes'],
            correct: 1,
            explanation: 'Nutrition significantly affects brain function, mood regulation, and mental health.',
            difficulty: 'Medium',
            category: 'Mental Health'
          },
          {
            id: '1-15',
            question: 'When should someone seek immediate mental health help?',
            options: ['Only when hospitalized', 'When having thoughts of self-harm', 'After trying everything else', 'Never, handle it alone'],
            correct: 1,
            explanation: 'Thoughts of self-harm or suicide require immediate professional intervention.',
            difficulty: 'Hard',
            category: 'Mental Health'
          }
        ]
      },
      {
        id: '2',
        title: 'Stress Management Techniques',
        description: 'Advanced strategies for managing academic and personal stress',
        category: 'Stress Management',
        difficulty: 'Intermediate',
        duration: 25,
        passingScore: 75,
        totalQuestions: 12,
        icon: '🧘',
        certificateEligible: true,
        questions: [
          {
            id: '2-1',
            question: 'What is the recommended duration for a meditation session for beginners?',
            options: ['2-3 minutes', '5-10 minutes', '20-30 minutes', '45-60 minutes'],
            correct: 1,
            explanation: 'For beginners, 5-10 minutes of meditation is recommended to build a sustainable practice.',
            difficulty: 'Easy',
            category: 'Stress Management'
          },
          {
            id: '2-2',
            question: 'Which hormone is primarily responsible for the stress response?',
            options: ['Insulin', 'Cortisol', 'Melatonin', 'Dopamine'],
            correct: 1,
            explanation: 'Cortisol is the primary stress hormone released by the adrenal glands during stress responses.',
            difficulty: 'Medium',
            category: 'Stress Management'
          },
          {
            id: '2-3',
            question: 'What is the 4-7-8 breathing technique?',
            options: ['Inhale 4, hold 7, exhale 8', 'Inhale 8, hold 7, exhale 4', 'Inhale 7, hold 4, exhale 8', 'Inhale 4, hold 8, exhale 7'],
            correct: 0,
            explanation: 'The 4-7-8 technique involves inhaling for 4 counts, holding for 7, and exhaling for 8.',
            difficulty: 'Easy',
            category: 'Stress Management'
          },
          {
            id: '2-4',
            question: 'Which of these is a sign of chronic stress?',
            options: ['Occasional worry', 'Persistent fatigue', 'Normal sleep patterns', 'Stable mood'],
            correct: 1,
            explanation: 'Persistent fatigue is a common sign of chronic stress affecting the body and mind.',
            difficulty: 'Medium',
            category: 'Stress Management'
          },
          {
            id: '2-5',
            question: 'What is progressive muscle relaxation?',
            options: ['Running progressively faster', 'Tensing and relaxing muscle groups', 'Gradual weight lifting', 'Slow walking'],
            correct: 1,
            explanation: 'Progressive muscle relaxation involves systematically tensing and relaxing different muscle groups.',
            difficulty: 'Medium',
            category: 'Stress Management'
          },
          {
            id: '2-6',
            question: 'Which activity is most effective for stress reduction?',
            options: ['Watching TV', 'Regular physical exercise', 'Eating comfort food', 'Shopping'],
            correct: 1,
            explanation: 'Regular physical exercise is one of the most effective stress reduction activities.',
            difficulty: 'Easy',
            category: 'Stress Management'
          },
          {
            id: '2-7',
            question: 'What is the optimal amount of sleep for stress management?',
            options: ['4-5 hours', '6-7 hours', '7-9 hours', '10+ hours'],
            correct: 2,
            explanation: '7-9 hours of sleep is optimal for most adults to manage stress effectively.',
            difficulty: 'Easy',
            category: 'Stress Management'
          },
          {
            id: '2-8',
            question: 'Which technique helps with acute anxiety attacks?',
            options: ['5-4-3-2-1 grounding', 'Intense exercise', 'Caffeine intake', 'Loud music'],
            correct: 0,
            explanation: 'The 5-4-3-2-1 grounding technique helps focus on the present during anxiety attacks.',
            difficulty: 'Medium',
            category: 'Stress Management'
          },
          {
            id: '2-9',
            question: 'What is the relationship between stress and immune system?',
            options: ['No relationship', 'Stress strengthens immunity', 'Chronic stress weakens immunity', 'Stress only affects mood'],
            correct: 2,
            explanation: 'Chronic stress significantly weakens the immune system, making you more susceptible to illness.',
            difficulty: 'Hard',
            category: 'Stress Management'
          },
          {
            id: '2-10',
            question: 'Which is the most effective long-term stress management strategy?',
            options: ['Avoidance', 'Building resilience skills', 'Perfectionism', 'Isolation'],
            correct: 1,
            explanation: 'Building resilience skills provides long-term protection against stress and improves coping ability.',
            difficulty: 'Hard',
            category: 'Stress Management'
          },
          {
            id: '2-11',
            question: 'What is emotional regulation?',
            options: ['Suppressing all emotions', 'Managing emotional responses effectively', 'Only feeling positive emotions', 'Avoiding emotional situations'],
            correct: 1,
            explanation: 'Emotional regulation involves managing and responding to emotions in healthy, adaptive ways.',
            difficulty: 'Medium',
            category: 'Stress Management'
          },
          {
            id: '2-12',
            question: 'Which practice helps build stress resilience?',
            options: ['Perfectionism', 'Regular mindfulness practice', 'Avoiding challenges', 'Multitasking'],
            correct: 1,
            explanation: 'Regular mindfulness practice builds resilience and improves stress management capabilities.',
            difficulty: 'Medium',
            category: 'Stress Management'
          }
        ]
      },
      {
        id: '3',
        title: 'Study Skills & Time Management',
        description: 'Essential skills for academic success and work-life balance',
        category: 'Academic Skills',
        difficulty: 'Beginner',
        duration: 18,
        passingScore: 70,
        totalQuestions: 10,
        icon: '📚',
        certificateEligible: false,
        questions: [
          {
            id: '3-1',
            question: 'What is the Pomodoro Technique?',
            options: [
              'A cooking method',
              'A 25-minute focused work period followed by a 5-minute break',
              'A type of exercise',
              'A note-taking system'
            ],
            correct: 1,
            explanation: 'The Pomodoro Technique involves working for 25 minutes, then taking a 5-minute break.',
            difficulty: 'Easy',
            category: 'Academic Skills'
          },
          {
            id: '3-2',
            question: 'Which study method is most effective for long-term retention?',
            options: ['Cramming', 'Spaced repetition', 'Reading once', 'Highlighting everything'],
            correct: 1,
            explanation: 'Spaced repetition helps move information from short-term to long-term memory.',
            difficulty: 'Medium',
            category: 'Academic Skills'
          },
          {
            id: '3-3',
            question: 'What is the ideal study environment?',
            options: ['Noisy and distracting', 'Quiet and organized', 'In bed', 'With TV on'],
            correct: 1,
            explanation: 'A quiet, organized environment minimizes distractions and enhances focus.',
            difficulty: 'Easy',
            category: 'Academic Skills'
          },
          {
            id: '3-4',
            question: 'How often should you take breaks during long study sessions?',
            options: ['Never', 'Every 25-50 minutes', 'Every 2 hours', 'Only when tired'],
            correct: 1,
            explanation: 'Regular breaks every 25-50 minutes help maintain focus and prevent mental fatigue.',
            difficulty: 'Easy',
            category: 'Academic Skills'
          },
          {
            id: '3-5',
            question: 'What is active recall?',
            options: ['Reading notes repeatedly', 'Testing yourself without looking at materials', 'Highlighting text', 'Copying notes'],
            correct: 1,
            explanation: 'Active recall involves retrieving information from memory without looking at source materials.',
            difficulty: 'Medium',
            category: 'Academic Skills'
          },
          {
            id: '3-6',
            question: 'Which time management matrix quadrant should be prioritized?',
            options: ['Urgent and Important', 'Urgent but Not Important', 'Not Urgent but Important', 'Neither Urgent nor Important'],
            correct: 2,
            explanation: 'Important but not urgent tasks should be prioritized to prevent them from becoming urgent.',
            difficulty: 'Hard',
            category: 'Academic Skills'
          },
          {
            id: '3-7',
            question: 'What is the best way to handle procrastination?',
            options: ['Wait for motivation', 'Break tasks into smaller steps', 'Work under pressure', 'Avoid the task'],
            correct: 1,
            explanation: 'Breaking tasks into smaller, manageable steps makes them less overwhelming and easier to start.',
            difficulty: 'Medium',
            category: 'Academic Skills'
          },
          {
            id: '3-8',
            question: 'Which note-taking method is most effective for comprehension?',
            options: ['Verbatim transcription', 'Cornell Note-taking System', 'Random scribbling', 'No notes at all'],
            correct: 1,
            explanation: 'The Cornell system organizes notes effectively and promotes active learning.',
            difficulty: 'Medium',
            category: 'Academic Skills'
          },
          {
            id: '3-9',
            question: 'What is the optimal study schedule pattern?',
            options: ['All-night cramming', 'Consistent daily sessions', 'Weekend marathons', 'Random timing'],
            correct: 1,
            explanation: 'Consistent daily study sessions are more effective than irregular intensive sessions.',
            difficulty: 'Easy',
            category: 'Academic Skills'
          },
          {
            id: '3-10',
            question: 'How should you prioritize multiple assignments?',
            options: ['Start with easiest', 'Start with hardest', 'Consider deadlines and importance', 'Random order'],
            correct: 2,
            explanation: 'Prioritizing based on deadlines and importance ensures critical tasks are completed first.',
            difficulty: 'Medium',
            category: 'Academic Skills'
          }
        ]
      },
      {
        id: '4',
        title: 'Crisis Recognition & Response',
        description: 'Identifying mental health crises and appropriate response strategies',
        category: 'Crisis Management',
        difficulty: 'Advanced',
        duration: 30,
        passingScore: 85,
        totalQuestions: 12,
        icon: '🚨',
        certificateEligible: true,
        prerequisites: ['Mental Health Awareness'],
        questions: [
          {
            id: '4-1',
            question: 'Which of the following is a warning sign of suicidal ideation?',
            options: [
              'Increased social activity',
              'Talking about wanting to die or hurt oneself',
              'Improved academic performance',
              'Increased appetite'
            ],
            correct: 1,
            explanation: 'Talking about death or self-harm is a serious warning sign that requires immediate attention.',
            difficulty: 'Hard',
            category: 'Crisis Management'
          },
          {
            id: '4-2',
            question: 'What is the Indian National Suicide Prevention Helpline number?',
            options: ['100', '108', '9152987821', '1098'],
            correct: 2,
            explanation: '9152987821 is the Indian National Suicide Prevention Helpline operated by AASRA.',
            difficulty: 'Medium',
            category: 'Crisis Management'
          },
          {
            id: '4-3',
            question: 'What should you do if a friend expresses suicidal thoughts?',
            options: ['Ignore it', 'Take it seriously and seek help', 'Tell them to get over it', 'Keep it secret'],
            correct: 1,
            explanation: 'Always take suicidal thoughts seriously and help the person connect with professional support.',
            difficulty: 'Easy',
            category: 'Crisis Management'
          },
          {
            id: '4-4',
            question: 'Which is NOT an appropriate response to a mental health crisis?',
            options: ['Listen without judgment', 'Encourage professional help', 'Minimize their feelings', 'Stay with the person'],
            correct: 2,
            explanation: 'Minimizing feelings can worsen the crisis and prevent the person from seeking help.',
            difficulty: 'Medium',
            category: 'Crisis Management'
          },
          {
            id: '4-5',
            question: 'What is a safety plan in crisis intervention?',
            options: ['Emergency contact list', 'Comprehensive strategy for managing crisis situations', 'Insurance information', 'Academic schedule'],
            correct: 1,
            explanation: 'A safety plan is a comprehensive strategy that includes coping strategies, support contacts, and professional resources.',
            difficulty: 'Hard',
            category: 'Crisis Management'
          },
          {
            id: '4-6',
            question: 'Which factor increases suicide risk in college students?',
            options: ['Good grades', 'Social isolation', 'Regular exercise', 'Healthy relationships'],
            correct: 1,
            explanation: 'Social isolation significantly increases suicide risk, especially among college students.',
            difficulty: 'Medium',
            category: 'Crisis Management'
          },
          {
            id: '4-7',
            question: 'What is the first step in crisis intervention?',
            options: ['Give advice', 'Ensure immediate safety', 'Analyze the problem', 'Call parents'],
            correct: 1,
            explanation: 'Ensuring immediate safety is always the first priority in any crisis intervention.',
            difficulty: 'Hard',
            category: 'Crisis Management'
          },
          {
            id: '4-8',
            question: 'Which statement about mental health crises is true?',
            options: ['They only happen to weak people', 'They can happen to anyone', 'They are always predictable', 'They resolve on their own'],
            correct: 1,
            explanation: 'Mental health crises can affect anyone regardless of strength, background, or circumstances.',
            difficulty: 'Easy',
            category: 'Crisis Management'
          },
          {
            id: '4-9',
            question: 'What should you avoid saying to someone in crisis?',
            options: ['I am here for you', 'You are not alone', 'Just think positive', 'Your life matters'],
            correct: 2,
            explanation: 'Telling someone to "just think positive" minimizes their experience and can be harmful.',
            difficulty: 'Medium',
            category: 'Crisis Management'
          },
          {
            id: '4-10',
            question: 'When should you call emergency services for a mental health crisis?',
            options: ['Never', 'When there is immediate danger', 'Only if asked', 'After trying everything else'],
            correct: 1,
            explanation: 'Emergency services should be called when there is immediate danger to self or others.',
            difficulty: 'Hard',
            category: 'Crisis Management'
          },
          {
            id: '4-11',
            question: 'What is the role of a crisis counsellor?',
            options: ['Solve all problems', 'Provide immediate support and safety planning', 'Give medication', 'Make decisions for the person'],
            correct: 1,
            explanation: 'Crisis counsellors provide immediate support, safety planning, and connection to resources.',
            difficulty: 'Medium',
            category: 'Crisis Management'
          },
          {
            id: '4-12',
            question: 'Which is a protective factor against suicide?',
            options: ['Social isolation', 'Strong social connections', 'Academic pressure', 'Financial stress'],
            correct: 1,
            explanation: 'Strong social connections and support systems are major protective factors against suicide.',
            difficulty: 'Medium',
            category: 'Crisis Management'
          }
        ]
      },
      {
        id: '5',
        title: 'Psychoeducational & Wellness Resources',
        description: 'Understanding mental health resources and wellness practices',
        category: 'Wellness',
        difficulty: 'Intermediate',
        duration: 22,
        passingScore: 75,
        totalQuestions: 14,
        icon: '🌱',
        certificateEligible: true,
        questions: [
          {
            id: '5-1',
            question: 'What is psychoeducation?',
            options: ['Teaching psychology', 'Educating about mental health conditions and treatments', 'Academic counselling', 'Career guidance'],
            correct: 1,
            explanation: 'Psychoeducation involves teaching people about mental health conditions, symptoms, and treatments.',
            difficulty: 'Easy',
            category: 'Wellness'
          },
          {
            id: '5-2',
            question: 'Which wellness practice has the most scientific support?',
            options: ['Crystal healing', 'Regular meditation', 'Astrology', 'Detox diets'],
            correct: 1,
            explanation: 'Regular meditation has extensive scientific research supporting its mental health benefits.',
            difficulty: 'Medium',
            category: 'Wellness'
          },
          {
            id: '5-3',
            question: 'What is the purpose of a mood tracker?',
            options: ['Entertainment', 'Identifying patterns and triggers', 'Social sharing', 'Academic grading'],
            correct: 1,
            explanation: 'Mood trackers help identify patterns, triggers, and changes in mental health over time.',
            difficulty: 'Easy',
            category: 'Wellness'
          },
          {
            id: '5-4',
            question: 'Which resource is most helpful for anxiety management?',
            options: ['Caffeine', 'Breathing exercises and relaxation techniques', 'Social media', 'Avoiding all stress'],
            correct: 1,
            explanation: 'Breathing exercises and relaxation techniques are evidence-based tools for managing anxiety.',
            difficulty: 'Easy',
            category: 'Wellness'
          },
          {
            id: '5-5',
            question: 'What is the benefit of peer support groups?',
            options: ['Professional therapy', 'Shared experiences and mutual support', 'Medical treatment', 'Academic tutoring'],
            correct: 1,
            explanation: 'Peer support groups provide shared experiences, understanding, and mutual encouragement.',
            difficulty: 'Easy',
            category: 'Wellness'
          },
          {
            id: '5-6',
            question: 'Which app feature is most useful for mental health tracking?',
            options: ['Games', 'Daily mood and symptom logging', 'Social networking', 'Shopping'],
            correct: 1,
            explanation: 'Daily mood and symptom logging helps track patterns and progress in mental health.',
            difficulty: 'Medium',
            category: 'Wellness'
          },
          {
            id: '5-7',
            question: 'What is the purpose of wellness workshops?',
            options: ['Entertainment', 'Learning practical mental health skills', 'Academic credit', 'Social networking only'],
            correct: 1,
            explanation: 'Wellness workshops teach practical skills for maintaining and improving mental health.',
            difficulty: 'Easy',
            category: 'Wellness'
          },
          {
            id: '5-8',
            question: 'Which is a key component of a comprehensive wellness plan?',
            options: ['Only medication', 'Multiple strategies including lifestyle, therapy, and support', 'Avoiding all stress', 'Perfect life circumstances'],
            correct: 1,
            explanation: 'Comprehensive wellness plans include multiple strategies addressing different aspects of mental health.',
            difficulty: 'Medium',
            category: 'Wellness'
          },
          {
            id: '5-9',
            question: 'What is the role of self-care in mental health?',
            options: ['Selfish behavior', 'Essential for maintaining mental wellness', 'Only for wealthy people', 'Waste of time'],
            correct: 1,
            explanation: 'Self-care is essential for maintaining mental wellness and preventing burnout.',
            difficulty: 'Easy',
            category: 'Wellness'
          },
          {
            id: '5-10',
            question: 'Which resource is most helpful for sleep problems?',
            options: ['Caffeine before bed', 'Sleep hygiene education', 'Staying up all night', 'Irregular schedule'],
            correct: 1,
            explanation: 'Sleep hygiene education provides practical strategies for improving sleep quality.',
            difficulty: 'Easy',
            category: 'Wellness'
          },
          {
            id: '5-11',
            question: 'What is the benefit of mindfulness-based interventions?',
            options: ['Quick fixes', 'Reduced stress and improved emotional regulation', 'Guaranteed happiness', 'Avoiding all problems'],
            correct: 1,
            explanation: 'Mindfulness-based interventions are proven to reduce stress and improve emotional regulation.',
            difficulty: 'Medium',
            category: 'Wellness'
          },
          {
            id: '5-12',
            question: 'Which is an evidence-based wellness practice?',
            options: ['Avoiding all negative emotions', 'Regular physical exercise', 'Perfectionism', 'Social isolation'],
            correct: 1,
            explanation: 'Regular physical exercise has strong evidence for improving mental health and wellness.',
            difficulty: 'Easy',
            category: 'Wellness'
          },
          {
            id: '5-13',
            question: 'What is the purpose of psychoeducational resources?',
            options: ['Entertainment', 'Increasing understanding and self-management skills', 'Academic grades', 'Social status'],
            correct: 1,
            explanation: 'Psychoeducational resources help people understand their conditions and develop self-management skills.',
            difficulty: 'Medium',
            category: 'Wellness'
          },
          {
            id: '5-14',
            question: 'Which approach is most effective for building resilience?',
            options: ['Avoiding all challenges', 'Developing coping skills and support networks', 'Perfectionism', 'Isolation'],
            correct: 1,
            explanation: 'Building resilience involves developing coping skills, support networks, and adaptive strategies.',
            difficulty: 'Hard',
            category: 'Wellness'
          }
        ]
      }
    ];

    setQuizzes(comprehensiveQuizzes);
  }, []);

  // Timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isQuizActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isQuizActive, timeRemaining]);

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeRemaining(quiz.duration * 60);
    setIsQuizActive(true);
  };

  const selectAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuizSubmit = () => {
    if (!currentQuiz) return;

    setIsQuizActive(false);
    
    let correctAnswers = 0;
    currentQuiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
    const timeSpent = (currentQuiz.duration * 60) - timeRemaining;
    const passed = percentage >= currentQuiz.passingScore;

    const result: QuizResult = {
      quizId: currentQuiz.id,
      score: correctAnswers * 100,
      percentage,
      timeSpent,
      correctAnswers,
      totalQuestions: currentQuiz.questions.length,
      passed,
      completedAt: new Date(),
      certificateGenerated: passed && currentQuiz.certificateEligible
    };

    setQuizResult(result);
    setShowResults(true);
    
    setUserProgress(prev => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      totalScore: prev.totalScore + result.score,
      certificatesEarned: result.certificateGenerated ? prev.certificatesEarned + 1 : prev.certificatesEarned,
      averageScore: Math.round((prev.totalScore + result.score) / (prev.quizzesCompleted + 1))
    }));

    toast({
      title: passed ? '🎉 Quiz Completed!' : '📝 Quiz Completed',
      description: passed 
        ? `Congratulations! You scored ${percentage}% and passed the quiz.`
        : `You scored ${percentage}%. Keep studying and try again!`,
    });
  };

  const generateCertificate = () => {
    if (!quizResult || !currentQuiz) return;

    const certificateContent = `
CERTIFICATE OF COMPLETION

This certifies that you have successfully completed:

${currentQuiz.title}

Score: ${quizResult.percentage}%
Date: ${quizResult.completedAt.toLocaleDateString()}
Category: ${currentQuiz.category}
Duration: ${Math.floor(quizResult.timeSpent / 60)} minutes

This certificate is valid for 1 year from the date of completion.
Certificate ID: CERT-${currentQuiz.id}-${Date.now()}

Student Zen Path - Mental Health Platform
Issued under Government of India Digital Education Initiative
    `;

    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificate-${currentQuiz.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: '📜 Certificate Downloaded!',
      description: 'Your certificate has been downloaded successfully.',
    });
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizResult(null);
    setIsQuizActive(false);
    setTimeRemaining(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mental Health': return Brain;
      case 'Stress Management': return Heart;
      case 'Academic Skills': return BookOpen;
      case 'Crisis Management': return Shield;
      case 'Wellness': return Sparkles;
      default: return Target;
    }
  };

  // Quiz Selection View
  if (!currentQuiz) {
    return (
      <div className="space-y-6">
        {/* User Progress Overview */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-warning" />
              <span>Your Quiz Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.quizzesCompleted}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.averageScore}%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.certificatesEarned}</div>
                <div className="text-sm text-muted-foreground">Certificates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.streakDays}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userProgress.totalScore.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Quizzes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => {
            const CategoryIcon = getCategoryIcon(quiz.category);
            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="wellness-card h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="w-5 h-5 text-primary" />
                        <Badge variant="outline" className="text-xs">
                          {quiz.category}
                        </Badge>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs text-white ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </div>
                    </div>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{quiz.icon}</span>
                      <span className="text-lg">{quiz.title}</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {quiz.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{quiz.duration} minutes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span>{quiz.totalQuestions} questions</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-warning" />
                          <span>{quiz.passingScore}% to pass</span>
                        </div>
                        {quiz.certificateEligible && (
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4 text-primary" />
                            <span>Certificate</span>
                          </div>
                        )}
                      </div>
                      
                      {quiz.prerequisites && (
                        <div className="text-xs text-muted-foreground">
                          Prerequisites: {quiz.prerequisites.join(', ')}
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => startQuiz(quiz)}
                      className="w-full bg-gradient-support hover:opacity-90"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Quiz Results View
  if (showResults && quizResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <Card className="wellness-card text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              {quizResult.passed ? (
                <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-destructive rounded-full flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-white" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">
              {quizResult.passed ? 'Congratulations!' : 'Keep Learning!'}
            </CardTitle>
            <p className="text-muted-foreground">
              {quizResult.passed 
                ? `You passed the ${currentQuiz.title} quiz!`
                : `You didn't pass this time, but you're learning!`}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{quizResult.percentage}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{quizResult.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{Math.floor(quizResult.timeSpent / 60)}</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">+{quizResult.score}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Progress value={quizResult.percentage} className="h-3" />
              
              <div className="flex flex-col sm:flex-row gap-3">
                {quizResult.certificateGenerated && (
                  <Button onClick={generateCertificate} className="bg-gradient-support hover:opacity-90">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                )}
                
                <Button onClick={() => startQuiz(currentQuiz)} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                
                <Button onClick={resetQuiz} variant="outline">
                  Back to Quizzes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card className="wellness-card">
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">Q{index + 1}: {question.question}</h4>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded ${
                          optionIndex === question.correct
                            ? 'bg-success/20 text-success border border-success'
                            : optionIndex === userAnswer && !isCorrect
                            ? 'bg-destructive/20 text-destructive border border-destructive'
                            : 'bg-muted'
                        }`}
                      >
                        {option}
                        {optionIndex === question.correct && (
                          <span className="ml-2">✓ Correct</span>
                        )}
                        {optionIndex === userAnswer && !isCorrect && (
                          <span className="ml-2">✗ Your Answer</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-accent/50 rounded text-sm">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Quiz Taking View
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Header */}
      <Card className="wellness-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">{currentQuiz.title}</h2>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Time Remaining</div>
                <div className={`text-xl font-bold ${timeRemaining < 300 ? 'text-destructive' : 'text-primary'}`}>
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="wellness-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {currentQuestion.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {currentQuestion.category}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectAnswer(currentQuestion.id, index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestion.id] === index
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion.id] === index
                        ? 'border-primary bg-primary text-white'
                        : 'border-muted-foreground'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion.id] === undefined}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleQuizSubmit}
              disabled={Object.keys(selectedAnswers).length < currentQuiz.questions.length}
              className="bg-gradient-support hover:opacity-90"
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>

      {/* Question Navigator */}
      <Card className="wellness-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {currentQuiz.questions.map((_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                variant={index === currentQuestionIndex ? "default" : "outline"}
                size="sm"
                className={`w-10 h-10 ${
                  selectedAnswers[currentQuiz.questions[index].id] !== undefined
                    ? 'bg-success/20 border-success'
                    : ''
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSystem;