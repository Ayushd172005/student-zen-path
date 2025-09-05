import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Target, 
  BookOpen, 
  Clock, 
  Star, 
  Award, 
  TrendingUp,
  Brain,
  Heart,
  Zap,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  Download
} from 'lucide-react';
import EnhancedTaskManager from './EnhancedTaskManager';
import QuizSystem from './QuizSystem';
import AchievementSystem from './AchievementSystem';
import ResourceHub from './ResourceHub';
import { useToast } from '@/hooks/use-toast';

interface StudentDashboardProps {
  user: { name: string; email: string; role: string };
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalPoints, setTotalPoints] = useState(1250);
  const [level, setLevel] = useState(3);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const { toast } = useToast();

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Completed your first session', icon: Star, unlocked: true },
    { id: 2, title: 'Consistent Learner', description: '7-day streak', icon: Trophy, unlocked: true },
    { id: 3, title: 'Knowledge Seeker', description: 'Read 10 resources', icon: BookOpen, unlocked: false },
    { id: 4, title: 'Community Helper', description: 'Helped peers 5 times', icon: Heart, unlocked: false },
  ];

  const flashcards = [
    { 
      id: 1, 
      front: 'What is mindfulness?', 
      back: 'Mindfulness is the practice of being fully present and engaged in the current moment, aware of what you\'re doing and where you are, without being overwhelmed by what\'s happening around you.' 
    },
    { 
      id: 2, 
      front: 'How to manage anxiety?', 
      back: 'Practice deep breathing, engage in regular exercise, maintain a healthy sleep schedule, limit caffeine, and consider talking to a counselor or therapist.' 
    },
    { 
      id: 3, 
      front: 'Signs of burnout?', 
      back: 'Emotional exhaustion, cynicism, feeling ineffective, physical symptoms like headaches, changes in sleep or appetite, and decreased motivation.' 
    },
    { 
      id: 4, 
      front: 'Stress management techniques?', 
      back: 'Time management, regular exercise, meditation, healthy eating, adequate sleep, social support, and setting realistic goals.' 
    }
  ];

  const tasks = [
    { id: 1, title: 'Complete daily mood check-in', points: 50, category: 'Self-care' },
    { id: 2, title: 'Practice 10-minute meditation', points: 75, category: 'Mindfulness' },
    { id: 3, title: 'Read "Managing Stress" article', points: 100, category: 'Learning' },
    { id: 4, title: 'Share experience in community', points: 125, category: 'Community' },
    { id: 5, title: 'Complete sleep hygiene quiz', points: 80, category: 'Health' },
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Stress Management Basics',
      questions: [
        {
          question: 'Which technique is most effective for immediate stress relief?',
          options: ['Deep breathing', 'Running a marathon', 'Watching TV', 'Eating chocolate'],
          correct: 0
        },
        {
          question: 'How many hours of sleep do most adults need?',
          options: ['4-5 hours', '6-7 hours', '7-9 hours', '10+ hours'],
          correct: 2
        }
      ]
    }
  ];

  const handleFlipCard = (cardId: number) => {
    setFlippedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleCompleteTask = (taskId: number, points: number) => {
    if (completedTasks.includes(taskId)) return;
    
    setCompletedTasks(prev => [...prev, taskId]);
    setTotalPoints(prev => prev + points);
    
    // Confetti effect simulation
    const celebrateCompletion = () => {
      toast({
        title: '🎉 Task Completed!',
        description: `You earned ${points} points! Keep up the great work!`,
      });
    };
    
    celebrateCompletion();
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleGenerateCertificate = () => {
    toast({
      title: '📜 Certificate Generated!',
      description: 'Your certificate of completion is ready for download.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">Let's continue your mental wellness journey</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Sign Out
          </Button>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-calm border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">Current Streak</p>
                  <p className="text-3xl font-bold">{currentStreak} days</p>
                </div>
                <Zap className="w-8 h-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-healing border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">Total Points</p>
                  <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
                </div>
                <Star className="w-8 h-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-support border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">Current Level</p>
                  <p className="text-3xl font-bold">Level {level}</p>
                </div>
                <Trophy className="w-8 h-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-wellness border-0 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80">Progress</p>
                  <p className="text-3xl font-bold">78%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Learning Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Stress Management</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Mindfulness Practice</span>
                      <span className="text-sm text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Sleep Hygiene</span>
                      <span className="text-sm text-muted-foreground">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ArrowRight className="w-5 h-5" />
                    <span>Recommended Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <Brain className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Complete mindfulness assessment</p>
                      <p className="text-sm text-muted-foreground">Understand your current state</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Schedule counseling session</p>
                      <p className="text-sm text-muted-foreground">Get personalized support</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                    <Heart className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Join peer support group</p>
                      <p className="text-sm text-muted-foreground">Connect with others</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="flashcards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Flashcards</CardTitle>
                <p className="text-muted-foreground">Click on cards to flip and reveal answers</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {flashcards.map((card) => (
                    <motion.div
                      key={card.id}
                      className="relative h-48 cursor-pointer perspective-1000"
                      onClick={() => handleFlipCard(card.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="relative w-full h-full transition-transform duration-700 preserve-3d"
                        animate={{ rotateY: flippedCards.includes(card.id) ? 180 : 0 }}
                      >
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden">
                          <Card className="h-full bg-gradient-calm text-white border-0">
                            <CardContent className="p-6 flex items-center justify-center h-full">
                              <p className="text-lg font-medium text-center">{card.front}</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180">
                          <Card className="h-full bg-gradient-healing text-white border-0">
                            <CardContent className="p-6 flex items-center justify-center h-full">
                              <p className="text-sm text-center leading-relaxed">{card.back}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <EnhancedTaskManager />
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <QuizSystem />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementSystem />
          </TabsContent>

          <TabsContent value="wellness" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle>Pomodoro Timer</CardTitle>
                  <p className="text-muted-foreground">Focus sessions with breaks</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start 25min Session</Button>
                </CardContent>
              </Card>
              
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle>Mood Tracker</CardTitle>
                  <p className="text-muted-foreground">Track your daily mood</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Log Today's Mood</Button>
                </CardContent>
              </Card>
              
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle>Breathing Exercise</CardTitle>
                  <p className="text-muted-foreground">Guided breathing for calm</p>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Breathing</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <ResourceHub />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;