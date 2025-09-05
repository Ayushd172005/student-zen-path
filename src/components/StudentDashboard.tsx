import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Download,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Smile,
  Meh,
  Frown,
  Calendar,
  BarChart3
} from 'lucide-react';
import EnhancedTaskManager from './EnhancedTaskManager';
import QuizSystem from './QuizSystem';
import AchievementSystem from './AchievementSystem';
import ResourceHub from './ResourceHub';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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
  
  // Pomodoro Timer State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroSession, setPomodoroSession] = useState(1);
  
  // Mood Tracker State
  const [todayMood, setTodayMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [moodNote, setMoodNote] = useState('');
  
  // Breathing Exercise State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);
  
  const { toast } = useToast();

  // Progress data for charts
  const progressData = [
    { week: 'Week 1', streak: 3, quizScore: 75, activities: 12, mood: 6 },
    { week: 'Week 2', streak: 5, quizScore: 82, activities: 18, mood: 7 },
    { week: 'Week 3', streak: 7, quizScore: 88, activities: 22, mood: 8 },
    { week: 'Week 4', streak: 4, quizScore: 91, activities: 25, mood: 8 },
    { week: 'Week 5', streak: 6, quizScore: 85, activities: 20, mood: 7 },
    { week: 'Week 6', streak: 7, quizScore: 93, activities: 28, mood: 9 }
  ];

  const moodData = [
    { date: '2024-01-01', mood: 7 },
    { date: '2024-01-02', mood: 8 },
    { date: '2024-01-03', mood: 6 },
    { date: '2024-01-04', mood: 9 },
    { date: '2024-01-05', mood: 7 },
    { date: '2024-01-06', mood: 8 },
    { date: '2024-01-07', mood: 9 }
  ];

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
      back: 'Mindfulness is the practice of being fully present and engaged in the current moment, aware of what you\'re doing and where you are, without being overwhelmed by what\'s happening around you.',
      category: 'Mindfulness',
      difficulty: 'Beginner'
    },
    { 
      id: 2, 
      front: 'How to manage anxiety?', 
      back: 'Practice deep breathing, engage in regular exercise, maintain a healthy sleep schedule, limit caffeine, and consider talking to a counsellor or therapist.',
      category: 'Anxiety',
      difficulty: 'Intermediate'
    },
    { 
      id: 3, 
      front: 'Signs of burnout?', 
      back: 'Emotional exhaustion, cynicism, feeling ineffective, physical symptoms like headaches, changes in sleep or appetite, and decreased motivation.',
      category: 'Stress',
      difficulty: 'Advanced'
    },
    { 
      id: 4, 
      front: 'Stress management techniques?', 
      back: 'Time management, regular exercise, meditation, healthy eating, adequate sleep, social support, and setting realistic goals.',
      category: 'Stress',
      difficulty: 'Intermediate'
    },
    { 
      id: 5, 
      front: 'What is cognitive behavioral therapy (CBT)?', 
      back: 'CBT is a type of psychotherapy that helps people identify and change negative thought patterns and behaviors that contribute to their problems.',
      category: 'Therapy',
      difficulty: 'Advanced'
    },
    { 
      id: 6, 
      front: 'Benefits of regular sleep?', 
      back: 'Improved mood, better concentration, enhanced memory, stronger immune system, and reduced stress levels.',
      category: 'Wellness',
      difficulty: 'Beginner'
    }
  ];

  // Pomodoro Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      // Session completed
      if (isBreak) {
        toast({
          title: '🎉 Break Complete!',
          description: 'Ready for your next focus session?',
        });
        setPomodoroTime(25 * 60);
        setIsBreak(false);
        setPomodoroSession(prev => prev + 1);
      } else {
        toast({
          title: '⏰ Focus Session Complete!',
          description: 'Great job! Time for a well-deserved break.',
        });
        setPomodoroTime(5 * 60); // 5 minute break
        setIsBreak(true);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime, isBreak, toast]);

  // Breathing Exercise Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          if (prev <= 1) {
            setBreathingPhase(current => {
              if (current === 'inhale') return 'hold';
              if (current === 'hold') return 'exhale';
              return 'inhale';
            });
            return breathingPhase === 'hold' ? 7 : 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    
    toast({
      title: '🎉 Task Completed!',
      description: `You earned ${points} points! Keep up the great work!`,
    });
  };

  const startPomodoro = () => {
    setIsRunning(true);
    toast({
      title: '🍅 Focus Session Started!',
      description: `${isBreak ? 'Break' : 'Focus'} session for ${Math.floor(pomodoroTime / 60)} minutes`,
    });
  };

  const pausePomodoro = () => {
    setIsRunning(false);
    toast({
      title: '⏸️ Session Paused',
      description: 'Take your time, resume when ready',
    });
  };

  const resetPomodoro = () => {
    setIsRunning(false);
    setPomodoroTime(25 * 60);
    setIsBreak(false);
    setPomodoroSession(1);
  };

  const logMood = () => {
    if (!todayMood) {
      toast({
        title: "Select Mood",
        description: "Please select your mood before logging",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: '📝 Mood Logged!',
      description: `Your ${todayMood} mood has been recorded for today`,
    });

    // In a real app, this would save to database
    console.log('Mood logged:', { mood: todayMood, note: moodNote, date: new Date() });
  };

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingCount(4);
    toast({
      title: '🧘 Breathing Exercise Started',
      description: 'Follow the rhythm: Inhale, Hold, Exhale',
    });
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    toast({
      title: '✨ Great Job!',
      description: 'You completed a breathing exercise. Feel more relaxed?',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}!</h1>
            <p className="text-gray-300">Let's continue your mental wellness journey</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="border-gray-600 text-gray-300 hover:bg-gray-800">
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
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 text-white">
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

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 text-white">
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

        {/* Progress Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Your Progress Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-4">Weekly Progress Trends</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="week" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Line type="monotone" dataKey="streak" stroke="#F59E0B" strokeWidth={2} name="Streak Days" />
                      <Line type="monotone" dataKey="quizScore" stroke="#10B981" strokeWidth={2} name="Quiz Score" />
                      <Line type="monotone" dataKey="activities" stroke="#8B5CF6" strokeWidth={2} name="Activities" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">Mood Tracking (Last 7 Days)</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis domain={[1, 10]} stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Bar dataKey="mood" fill="#EC4899" name="Mood (1-10)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="dashboard" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Dashboard</TabsTrigger>
            <TabsTrigger value="flashcards" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Flashcards</TabsTrigger>
            <TabsTrigger value="tasks" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Tasks</TabsTrigger>
            <TabsTrigger value="quizzes" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Quizzes</TabsTrigger>
            <TabsTrigger value="achievements" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Achievements</TabsTrigger>
            <TabsTrigger value="wellness" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Wellness</TabsTrigger>
            <TabsTrigger value="resources" className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Progress Tracker */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Target className="w-5 h-5" />
                    <span>Learning Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Stress Management</span>
                      <span className="text-sm text-gray-400">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Mindfulness Practice</span>
                      <span className="text-sm text-gray-400">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Sleep Hygiene</span>
                      <span className="text-sm text-gray-400">40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <ArrowRight className="w-5 h-5" />
                    <span>Recommended Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <Brain className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-white">Complete mindfulness assessment</p>
                      <p className="text-sm text-gray-400">Understand your current state</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-white">Schedule counselling session</p>
                      <p className="text-sm text-gray-400">Get personalized support</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <Heart className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-white">Join peer support group</p>
                      <p className="text-sm text-gray-400">Connect with others</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="flashcards" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Study Flashcards</CardTitle>
                <p className="text-gray-400">Click on cards to flip and reveal answers. Track your learning progress.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <CardContent className="p-6 flex flex-col justify-between h-full">
                              <div className="flex justify-between items-start mb-4">
                                <Badge variant="secondary" className="text-xs">{card.category}</Badge>
                                <Badge variant="outline" className="text-xs">{card.difficulty}</Badge>
                              </div>
                              <p className="text-lg font-medium text-center flex-1 flex items-center justify-center">{card.front}</p>
                              <div className="text-center text-xs opacity-70">Click to reveal answer</div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180">
                          <Card className="h-full bg-gradient-healing text-white border-0">
                            <CardContent className="p-6 flex flex-col justify-between h-full">
                              <div className="flex justify-between items-start mb-4">
                                <Badge variant="secondary" className="text-xs">{card.category}</Badge>
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <p className="text-sm text-center leading-relaxed flex-1 flex items-center justify-center">{card.back}</p>
                              <div className="text-center text-xs opacity-70">Click to flip back</div>
                            </CardContent>
                          </Card>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => setFlippedCards([])}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All Cards
                  </Button>
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
              {/* Pomodoro Timer */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Pomodoro Timer</CardTitle>
                  <p className="text-gray-400">Focus sessions with breaks</p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="text-6xl font-bold text-white mb-2">
                      {formatTime(pomodoroTime)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {isBreak ? 'Break Time' : 'Focus Session'} #{pomodoroSession}
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-2 mb-4">
                    {!isRunning ? (
                      <Button onClick={startPomodoro} className="bg-green-600 hover:bg-green-700">
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button onClick={pausePomodoro} className="bg-yellow-600 hover:bg-yellow-700">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button onClick={resetPomodoro} variant="outline" className="border-gray-600 text-gray-300">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                  
                  <Progress 
                    value={isBreak ? 
                      ((5 * 60 - pomodoroTime) / (5 * 60)) * 100 : 
                      ((25 * 60 - pomodoroTime) / (25 * 60)) * 100
                    } 
                    className="h-2" 
                  />
                </CardContent>
              </Card>
              
              {/* Mood Tracker */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Mood Tracker</CardTitle>
                  <p className="text-gray-400">Track your daily mood</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-300 mb-3 block">How are you feeling today?</Label>
                      <div className="flex justify-center space-x-4 mb-4">
                        {[
                          { mood: 'happy', icon: Smile, color: 'text-green-500' },
                          { mood: 'neutral', icon: Meh, color: 'text-yellow-500' },
                          { mood: 'sad', icon: Frown, color: 'text-red-500' }
                        ].map(({ mood, icon: Icon, color }) => (
                          <button
                            key={mood}
                            onClick={() => setTodayMood(mood as any)}
                            className={`p-3 rounded-full border-2 transition-all ${
                              todayMood === mood 
                                ? 'border-primary bg-primary/20' 
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            <Icon className={`w-8 h-8 ${color}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <Textarea
                      placeholder="Add a note about your mood (optional)"
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      rows={3}
                    />
                    
                    <Button onClick={logMood} className="w-full bg-gradient-healing hover:opacity-90">
                      <Calendar className="w-4 h-4 mr-2" />
                      Log Today's Mood
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Breathing Exercise */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Breathing Exercise</CardTitle>
                  <p className="text-gray-400">Guided breathing for calm</p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <motion.div
                      className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4"
                      animate={breathingActive ? {
                        scale: breathingPhase === 'inhale' ? 1.2 : breathingPhase === 'hold' ? 1.2 : 1,
                      } : { scale: 1 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold">{breathingCount}</div>
                        <div className="text-xs uppercase tracking-wide">{breathingPhase}</div>
                      </div>
                    </motion.div>
                    
                    {breathingActive && (
                      <div className="text-sm text-gray-400">
                        {breathingPhase === 'inhale' && 'Breathe in slowly...'}
                        {breathingPhase === 'hold' && 'Hold your breath...'}
                        {breathingPhase === 'exhale' && 'Breathe out slowly...'}
                      </div>
                    )}
                  </div>
                  
                  {!breathingActive ? (
                    <Button onClick={startBreathing} className="w-full bg-gradient-calm hover:opacity-90">
                      <Heart className="w-4 h-4 mr-2" />
                      Start Breathing Exercise
                    </Button>
                  ) : (
                    <Button onClick={stopBreathing} variant="outline" className="w-full border-gray-600 text-gray-300">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Exercise
                    </Button>
                  )}
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