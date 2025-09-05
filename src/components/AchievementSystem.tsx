import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy,
  Star,
  Target,
  Calendar,
  Users,
  Brain,
  Heart,
  Zap,
  Shield,
  Award,
  Crown,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Lock,
  Share2,
  Download,
  Gift,
  Flame,
  BookOpen,
  Clock,
  MessageCircle,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Academic' | 'Wellness' | 'Community' | 'Progress' | 'Special';
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  points: number;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  requirements: string[];
  rewards?: string[];
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
}

interface UserStats {
  totalAchievements: number;
  unlockedAchievements: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  experiencePoints: number;
  nextLevelXP: number;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  achievements: number;
  points: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const AchievementSystem: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [userStats, setUserStats] = useState<UserStats>({
    totalAchievements: 45,
    unlockedAchievements: 23,
    totalPoints: 12750,
    currentStreak: 12,
    longestStreak: 28,
    level: 8,
    experiencePoints: 2340,
    nextLevelXP: 3000
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Categories', icon: Star, color: 'text-primary' },
    { id: 'Academic', name: 'Academic', icon: BookOpen, color: 'text-blue-500' },
    { id: 'Wellness', name: 'Wellness', icon: Heart, color: 'text-green-500' },
    { id: 'Community', name: 'Community', icon: Users, color: 'text-purple-500' },
    { id: 'Progress', name: 'Progress', icon: TrendingUp, color: 'text-orange-500' },
    { id: 'Special', name: 'Special', icon: Crown, color: 'text-yellow-500' }
  ];

  const tierColors = {
    Bronze: 'from-amber-600 to-amber-800',
    Silver: 'from-gray-400 to-gray-600',
    Gold: 'from-yellow-400 to-yellow-600',
    Platinum: 'from-cyan-400 to-cyan-600',
    Diamond: 'from-blue-400 to-purple-600'
  };

  const rarityColors = {
    Common: 'border-gray-400',
    Uncommon: 'border-green-400',
    Rare: 'border-blue-400',
    Epic: 'border-purple-400',
    Legendary: 'border-yellow-400'
  };

  // Sample achievements data
  useEffect(() => {
    const sampleAchievements: Achievement[] = [
      // Academic Achievements
      {
        id: 'quiz-master',
        title: 'Quiz Master',
        description: 'Complete all quizzes with 90%+ score',
        category: 'Academic',
        tier: 'Gold',
        points: 500,
        icon: '🎓',
        unlocked: true,
        unlockedAt: new Date('2024-01-15'),
        progress: 8,
        maxProgress: 8,
        requirements: ['Complete 8 quizzes with 90%+ score'],
        rewards: ['500 bonus points', 'Academic Excellence badge'],
        rarity: 'Rare'
      },
      {
        id: 'consistent-learner',
        title: 'Consistent Learner',
        description: 'Maintain a 30-day login streak',
        category: 'Academic',
        tier: 'Silver',
        points: 300,
        icon: '📚',
        unlocked: false,
        progress: 12,
        maxProgress: 30,
        requirements: ['Log in for 30 consecutive days'],
        rewards: ['300 points', 'Consistency badge'],
        rarity: 'Uncommon'
      },
      {
        id: 'resource-explorer',
        title: 'Resource Explorer',
        description: 'Access 50+ educational resources',
        category: 'Academic',
        tier: 'Bronze',
        points: 200,
        icon: '🔍',
        unlocked: true,
        unlockedAt: new Date('2024-01-10'),
        progress: 50,
        maxProgress: 50,
        requirements: ['Access 50 different resources'],
        rarity: 'Common'
      },

      // Wellness Achievements
      {
        id: 'mindful-student',
        title: 'Mindful Student',
        description: 'Complete daily mindfulness for 7 days',
        category: 'Wellness',
        tier: 'Silver',
        points: 250,
        icon: '🧘',
        unlocked: true,
        unlockedAt: new Date('2024-01-08'),
        progress: 7,
        maxProgress: 7,
        requirements: ['Complete mindfulness exercises for 7 consecutive days'],
        rewards: ['250 points', 'Mindfulness badge'],
        rarity: 'Uncommon'
      },
      {
        id: 'stress-warrior',
        title: 'Stress Warrior',
        description: 'Use stress management tools for 2 weeks',
        category: 'Wellness',
        tier: 'Gold',
        points: 400,
        icon: '⚔️',
        unlocked: false,
        progress: 8,
        maxProgress: 14,
        requirements: ['Use stress management tools for 14 days'],
        rewards: ['400 points', 'Stress Management certification'],
        rarity: 'Rare'
      },
      {
        id: 'self-care-champion',
        title: 'Self-Care Champion',
        description: 'Complete self-care tasks for 30 days',
        category: 'Wellness',
        tier: 'Platinum',
        points: 750,
        icon: '💆',
        unlocked: false,
        progress: 15,
        maxProgress: 30,
        requirements: ['Complete daily self-care activities for 30 days'],
        rewards: ['750 points', 'Self-Care mastery badge', 'Premium features unlocked'],
        rarity: 'Epic'
      },

      // Community Achievements
      {
        id: 'supportive-friend',
        title: 'Supportive Friend',
        description: 'Help 5 peers in discussions',
        category: 'Community',
        tier: 'Bronze',
        points: 150,
        icon: '🤝',
        unlocked: true,
        unlockedAt: new Date('2024-01-05'),
        progress: 5,
        maxProgress: 5,
        requirements: ['Provide helpful responses to 5 peer questions'],
        rarity: 'Common'
      },
      {
        id: 'active-participant',
        title: 'Active Participant',
        description: 'Join 3 support groups',
        category: 'Community',
        tier: 'Silver',
        points: 300,
        icon: '👥',
        unlocked: false,
        progress: 1,
        maxProgress: 3,
        requirements: ['Join and participate in 3 different support groups'],
        rewards: ['300 points', 'Community member badge'],
        rarity: 'Uncommon'
      },
      {
        id: 'mentor-material',
        title: 'Mentor Material',
        description: 'Receive 10 positive peer reviews',
        category: 'Community',
        tier: 'Gold',
        points: 500,
        icon: '🌟',
        unlocked: false,
        progress: 3,
        maxProgress: 10,
        requirements: ['Receive 10 positive reviews from peers'],
        rewards: ['500 points', 'Mentor eligibility', 'Special recognition'],
        rarity: 'Rare'
      },

      // Progress Achievements
      {
        id: 'early-bird',
        title: 'Early Bird',
        description: 'Complete morning routine for 2 weeks',
        category: 'Progress',
        tier: 'Bronze',
        points: 200,
        icon: '🌅',
        unlocked: false,
        progress: 5,
        maxProgress: 14,
        requirements: ['Complete morning routine before 8 AM for 14 days'],
        rarity: 'Common'
      },
      {
        id: 'task-master',
        title: 'Task Master',
        description: 'Complete 100 tasks',
        category: 'Progress',
        tier: 'Silver',
        points: 350,
        icon: '✅',
        unlocked: false,
        progress: 67,
        maxProgress: 100,
        requirements: ['Complete 100 tasks across all categories'],
        rewards: ['350 points', 'Productivity badge'],
        rarity: 'Uncommon'
      },
      {
        id: 'habit-former',
        title: 'Habit Former',
        description: 'Maintain 3 habits for 30 days',
        category: 'Progress',
        tier: 'Gold',
        points: 600,
        icon: '🔄',
        unlocked: false,
        progress: 18,
        maxProgress: 30,
        requirements: ['Maintain 3 different habits for 30 consecutive days'],
        rewards: ['600 points', 'Habit mastery certification'],
        rarity: 'Rare'
      },

      // Special Achievements
      {
        id: 'platform-pioneer',
        title: 'Platform Pioneer',
        description: 'One of the first 100 users',
        category: 'Special',
        tier: 'Diamond',
        points: 1000,
        icon: '👑',
        unlocked: true,
        unlockedAt: new Date('2024-01-01'),
        progress: 1,
        maxProgress: 1,
        requirements: ['Register as one of the first 100 users'],
        rewards: ['1000 points', 'Pioneer badge', 'Lifetime premium features'],
        rarity: 'Legendary'
      },
      {
        id: 'new-year-resolver',
        title: 'New Year Resolver',
        description: 'Set and achieve wellness goals in January',
        category: 'Special',
        tier: 'Gold',
        points: 400,
        icon: '🎊',
        unlocked: true,
        unlockedAt: new Date('2024-01-31'),
        progress: 3,
        maxProgress: 3,
        requirements: ['Set and achieve 3 wellness goals in January'],
        rarity: 'Epic'
      }
    ];

    setAchievements(sampleAchievements);
    setFilteredAchievements(sampleAchievements);

    // Sample leaderboard data
    const sampleLeaderboard: LeaderboardEntry[] = [
      { rank: 1, username: 'WellnessMaster', achievements: 42, points: 18500, avatar: '🏆' },
      { rank: 2, username: 'StudyBuddy', achievements: 38, points: 16200, avatar: '📚' },
      { rank: 3, username: 'MindfulLearner', achievements: 35, points: 15100, avatar: '🧘' },
      { rank: 4, username: 'You', achievements: 23, points: 12750, avatar: '🌟', isCurrentUser: true },
      { rank: 5, username: 'HealthyHabits', achievements: 28, points: 12400, avatar: '💪' },
    ];
    setLeaderboard(sampleLeaderboard);
  }, []);

  // Filter achievements
  useEffect(() => {
    let filtered = achievements;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(achievement => achievement.category === selectedCategory);
    }

    if (selectedFilter === 'unlocked') {
      filtered = filtered.filter(achievement => achievement.unlocked);
    } else if (selectedFilter === 'locked') {
      filtered = filtered.filter(achievement => !achievement.unlocked);
    }

    setFilteredAchievements(filtered);
  }, [achievements, selectedCategory, selectedFilter]);

  const shareAchievement = (achievement: Achievement) => {
    if (navigator.share) {
      navigator.share({
        title: `Achievement Unlocked: ${achievement.title}`,
        text: `I just unlocked the "${achievement.title}" achievement on Student Zen Path! ${achievement.description}`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      const text = `🏆 Achievement Unlocked: ${achievement.title}\n${achievement.description}\n\nCheck out Student Zen Path for mental health support!`;
      navigator.clipboard.writeText(text);
      toast({
        title: 'Copied to clipboard!',
        description: 'Share this achievement with your friends.',
      });
    }
  };

  const claimReward = (achievement: Achievement) => {
    if (!achievement.unlocked) return;

    toast({
      title: '🎁 Reward Claimed!',
      description: `You've claimed the rewards for "${achievement.title}"`,
    });
  };

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`relative ${achievement.unlocked ? '' : 'opacity-60'}`}
    >
      <Card className={`wellness-card h-full ${rarityColors[achievement.rarity]} border-2 ${
        achievement.unlocked ? 'shadow-warm' : ''
      }`}>
        {/* Tier Gradient Background */}
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${tierColors[achievement.tier]}`} />
        
        <CardHeader className="relative">
          {achievement.unlocked && (
            <div className="absolute top-2 right-2">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          )}
          {!achievement.unlocked && (
            <div className="absolute top-2 right-2">
              <Lock className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="text-4xl">{achievement.icon}</div>
            <div>
              <Badge variant="outline" className="text-xs mb-1">
                {achievement.tier}
              </Badge>
              <Badge 
                variant="secondary" 
                className={`text-xs ${rarityColors[achievement.rarity].replace('border', 'bg').replace('400', '100')}`}
              >
                {achievement.rarity}
              </Badge>
            </div>
          </div>
          
          <CardTitle className="text-lg">{achievement.title}</CardTitle>
          <p className="text-muted-foreground text-sm">{achievement.description}</p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {/* Progress */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <Progress 
                value={(achievement.progress / achievement.maxProgress) * 100} 
                className="h-2"
              />
            </div>
            
            {/* Points */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">+{achievement.points} points</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {achievement.category}
              </Badge>
            </div>
            
            {/* Requirements */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Requirements:</p>
              {achievement.requirements.map((req, index) => (
                <p key={index} className="text-xs text-muted-foreground">• {req}</p>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              {achievement.unlocked && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => shareAchievement(achievement)}
                    className="flex-1"
                  >
                    <Share2 className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                  {achievement.rewards && (
                    <Button
                      size="sm"
                      onClick={() => claimReward(achievement)}
                      className="flex-1"
                    >
                      <Gift className="w-3 h-3 mr-1" />
                      Claim
                    </Button>
                  )}
                </>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedAchievement(achievement)}
              >
                <Eye className="w-3 h-3 mr-1" />
                Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-calm border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Level {userStats.level}</p>
                <div className="text-xs text-white/60 mt-1">
                  {userStats.experiencePoints}/{userStats.nextLevelXP} XP
                </div>
                <Progress 
                  value={(userStats.experiencePoints / userStats.nextLevelXP) * 100} 
                  className="h-1 mt-2 bg-white/20"
                />
              </div>
              <Crown className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-healing border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Achievements</p>
                <p className="text-2xl font-bold">{userStats.unlockedAchievements}/{userStats.totalAchievements}</p>
              </div>
              <Trophy className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-support border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Current Streak</p>
                <p className="text-2xl font-bold">{userStats.currentStreak} days</p>
              </div>
              <Flame className="w-8 h-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-wellness border-0 text-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary/80 text-sm">Total Points</p>
                <p className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
              </div>
              <Star className="w-8 h-8 text-primary/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-xs"
                  >
                    <IconComponent className={`w-3 h-3 mr-1 ${category.color}`} />
                    {category.name}
                  </Button>
                );
              })}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter('all')}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === 'unlocked' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter('unlocked')}
              >
                Unlocked
              </Button>
              <Button
                variant={selectedFilter === 'locked' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter('locked')}
              >
                Locked
              </Button>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No achievements found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more achievements.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Personal Achievement Focus</h3>
            <p className="text-muted-foreground">
              We focus on your personal growth journey rather than competition. Every achievement is a step forward in your mental wellness path.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements
              .filter(achievement => achievement.unlocked && achievement.rewards)
              .map((achievement) => (
                <Card key={achievement.id} className="wellness-card">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Unlocked {achievement.unlockedAt?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Rewards:</p>
                        <div className="space-y-1">
                          {achievement.rewards?.map((reward, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              🎁 {reward}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <Button onClick={() => claimReward(achievement)} className="w-full">
                        <Gift className="w-4 h-4 mr-2" />
                        Claim Rewards
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{selectedAchievement.icon}</div>
                      <div>
                        <CardTitle>{selectedAchievement.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {selectedAchievement.tier} • {selectedAchievement.rarity}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedAchievement(null)}
                    >
                      ✕
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{selectedAchievement.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Progress</p>
                      <Progress 
                        value={(selectedAchievement.progress / selectedAchievement.maxProgress) * 100} 
                        className="h-3"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedAchievement.progress}/{selectedAchievement.maxProgress}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Requirements:</p>
                      <div className="space-y-1">
                        {selectedAchievement.requirements.map((req, index) => (
                          <p key={index} className="text-sm text-muted-foreground">• {req}</p>
                        ))}
                      </div>
                    </div>
                    
                    {selectedAchievement.rewards && (
                      <div>
                        <p className="text-sm font-medium mb-2">Rewards:</p>
                        <div className="space-y-1">
                          {selectedAchievement.rewards.map((reward, index) => (
                            <p key={index} className="text-sm text-success">🎁 {reward}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-warning" />
                        <span className="font-medium">+{selectedAchievement.points} points</span>
                      </div>
                      {selectedAchievement.unlocked && selectedAchievement.unlockedAt && (
                        <p className="text-xs text-muted-foreground">
                          Unlocked {selectedAchievement.unlockedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementSystem;