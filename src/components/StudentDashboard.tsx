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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
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
            <Card>
              <CardHeader>
                <CardTitle>Daily Tasks</CardTitle>
                <p className="text-muted-foreground">Complete tasks to earn points and maintain your streak</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        completedTasks.includes(task.id)
                          ? 'bg-success/10 border-success/20'
                          : 'bg-background border-border'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCompleteTask(task.id, task.points)}
                          disabled={completedTasks.includes(task.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            completedTasks.includes(task.id)
                              ? 'bg-success border-success'
                              : 'border-muted-foreground hover:border-primary'
                          }`}
                        >
                          {completedTasks.includes(task.id) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </motion.button>
                        
                        <div>
                          <p className={`font-medium ${
                            completedTasks.includes(task.id) ? 'line-through text-muted-foreground' : ''
                          }`}>
                            {task.title}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {task.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-primary">+{task.points} pts</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Quizzes</CardTitle>
                <p className="text-muted-foreground">Test your understanding and earn certificates</p>
              </CardHeader>
              <CardContent>
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{quiz.title}</h3>
                      <Button onClick={handleGenerateCertificate} className="flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Get Certificate</span>
                      </Button>
                    </div>
                    
                    {quiz.questions.map((question, qIndex) => (
                      <div key={qIndex} className="space-y-4">
                        <h4 className="font-medium">{question.question}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {question.options.map((option, oIndex) => (
                            <motion.button
                              key={oIndex}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleQuizAnswer(qIndex, oIndex)}
                              className={`p-3 text-left rounded-lg border transition-colors ${
                                quizAnswers[qIndex] === oIndex
                                  ? oIndex === question.correct
                                    ? 'bg-success/10 border-success text-success-foreground'
                                    : 'bg-destructive/10 border-destructive text-destructive-foreground'
                                  : 'border-border hover:border-primary'
                              }`}
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Badges</CardTitle>
                <p className="text-muted-foreground">Your progress milestones and rewards</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: achievement.id * 0.1 }}
                        className={`p-6 rounded-lg border ${
                          achievement.unlocked
                            ? 'bg-primary/10 border-primary/20'
                            : 'bg-muted/50 border-muted'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full ${
                            achievement.unlocked
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${
                              achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            {achievement.unlocked && (
                              <Badge className="mt-2">Unlocked!</Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;