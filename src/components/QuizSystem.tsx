import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  duration: number; // minutes
  passingScore: number; // percentage
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
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);

  const { toast } = useToast();

  // Sample quiz data
  useEffect(() => {
    const sampleQuizzes: Quiz[] = [
      {
        id: '1',
        title: 'Mental Health Awareness',
        description: 'Comprehensive assessment of mental health knowledge and awareness',
        category: 'Mental Health',
        difficulty: 'Beginner',
        duration: 15,
        passingScore: 80,
        totalQuestions: 10,
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
            explanation: 'Deep breathing exercises are scientifically proven to provide immediate stress relief by activating the parasympathetic nervous system.',
            difficulty: 'Easy',
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
        duration: 20,
        passingScore: 75,
        totalQuestions: 15,
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
          }
        ]
      },
      {
        id: '3',
        title: 'Study Skills & Time Management',
        description: 'Essential skills for academic success and work-life balance',
        category: 'Academic Skills',
        difficulty: 'Beginner',
        duration: 12,
        passingScore: 70,
        totalQuestions: 8,
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
            explanation: 'The Pomodoro Technique involves working for 25 minutes, then taking a 5-minute break to improve focus and productivity.',
            difficulty: 'Easy',
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
        duration: 25,
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
            explanation: 'Talking about death or self-harm is a serious warning sign that requires immediate attention and professional help.',
            difficulty: 'Hard',
            category: 'Crisis Management'
          }
        ]
      }
    ];

    setQuizzes(sampleQuizzes);
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
    setTimeRemaining(quiz.duration * 60); // Convert minutes to seconds
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
    
    // Calculate results
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
      score: correctAnswers * 100, // Points per correct answer
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
    
    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      totalScore: prev.totalScore + result.score,
      certificatesEarned: result.certificateGenerated ? prev.certificatesEarned + 1 : prev.certificatesEarned,
      averageScore: Math.round((prev.totalScore + result.score) / (prev.quizzesCompleted + 1))
    }));

    // Add to quiz history
    setQuizHistory(prev => [result, ...prev]);

    // Show completion toast
    toast({
      title: passed ? '🎉 Quiz Completed!' : '📝 Quiz Completed',
      description: passed 
        ? `Congratulations! You scored ${percentage}% and passed the quiz.`
        : `You scored ${percentage}%. Keep studying and try again!`,
    });
  };

  const generateCertificate = () => {
    if (!quizResult || !currentQuiz) return;

    // In a real app, this would generate and download a PDF certificate
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