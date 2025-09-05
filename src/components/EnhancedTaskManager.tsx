import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Plus, 
  Calendar as CalendarIcon,
  Flag,
  CheckCircle,
  Circle,
  Clock,
  Target,
  Trash2,
  Edit,
  Star,
  Trophy,
  Flame,
  BarChart3,
  Filter,
  Search,
  Grid3X3,
  List,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, isToday, isPast, isFuture } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'Study' | 'Self-Care' | 'Exercise' | 'Social' | 'Medical' | 'Mindfulness';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  points: number;
  tags: string[];
  reminders: Date[];
  subtasks?: { id: string; title: string; completed: boolean }[];
}

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  streakDays: number;
  totalPoints: number;
  completionRate: number;
}

const EnhancedTaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Study' as Task['category'],
    priority: 'Medium' as Task['priority'],
    dueDate: new Date(),
    tags: [] as string[],
  });
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [stats, setStats] = useState<TaskStats>({
    totalTasks: 0,
    completedTasks: 0,
    streakDays: 0,
    totalPoints: 0,
    completionRate: 0
  });

  const { toast } = useToast();

  const categories = [
    { value: 'Study', color: 'bg-blue-500', icon: '📚' },
    { value: 'Self-Care', color: 'bg-green-500', icon: '🧘' },
    { value: 'Exercise', color: 'bg-red-500', icon: '💪' },
    { value: 'Social', color: 'bg-purple-500', icon: '👥' },
    { value: 'Medical', color: 'bg-yellow-500', icon: '🏥' },
    { value: 'Mindfulness', color: 'bg-teal-500', icon: '🕯️' }
  ];

  const priorities = [
    { value: 'Low', color: 'bg-gray-400', points: 25 },
    { value: 'Medium', color: 'bg-yellow-500', points: 50 },
    { value: 'High', color: 'bg-orange-500', points: 75 },
    { value: 'Urgent', color: 'bg-red-500', points: 100 }
  ];

  // Sample tasks for demo
  useEffect(() => {
    const sampleTasks: Task[] = [
      {
        id: '1',
        title: 'Complete stress management quiz',
        description: 'Take the daily stress assessment',
        category: 'Study',
        priority: 'Medium',
        dueDate: new Date(),
        completed: false,
        createdAt: new Date(),
        points: 50,
        tags: ['quiz', 'stress', 'daily'],
        reminders: [addDays(new Date(), -1)]
      },
      {
        id: '2',
        title: '20-minute meditation session',
        description: 'Practice mindfulness meditation',
        category: 'Mindfulness',
        priority: 'High',
        dueDate: new Date(),
        completed: true,
        createdAt: addDays(new Date(), -1),
        completedAt: new Date(),
        points: 75,
        tags: ['meditation', 'mindfulness', 'daily'],
        reminders: []
      },
      {
        id: '3',
        title: 'Schedule counselor appointment',
        description: 'Book next session with Dr. Smith',
        category: 'Medical',
        priority: 'Urgent',
        dueDate: addDays(new Date(), 2),
        completed: false,
        createdAt: new Date(),
        points: 100,
        tags: ['appointment', 'counselor', 'important'],
        reminders: [addDays(new Date(), 1)]
      }
    ];
    setTasks(sampleTasks);
    setFilteredTasks(sampleTasks);
    calculateStats(sampleTasks);
  }, []);

  // Filter tasks based on search and filters
  useEffect(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      
      return matchesSearch && matchesCategory && matchesPriority;
    });
    
    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filterCategory, filterPriority]);

  const calculateStats = (taskList: Task[]) => {
    const completed = taskList.filter(task => task.completed);
    const totalPoints = completed.reduce((sum, task) => sum + task.points, 0);
    const completionRate = taskList.length > 0 ? (completed.length / taskList.length) * 100 : 0;
    
    // Calculate streak (simplified - in real app would check daily completion)
    const streakDays = 7; // Mock streak
    
    setStats({
      totalTasks: taskList.length,
      completedTasks: completed.length,
      streakDays,
      totalPoints,
      completionRate
    });
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const priorityConfig = priorities.find(p => p.value === newTask.priority);
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      completed: false,
      createdAt: new Date(),
      points: priorityConfig?.points || 50,
      tags: newTask.tags,
      reminders: []
    };
    
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    calculateStats(updatedTasks);
    
    setNewTask({
      title: '',
      description: '',
      category: 'Study',
      priority: 'Medium',
      dueDate: new Date(),
      tags: []
    });
    setShowAddTask(false);
    
    toast({
      title: '✅ Task Added!',
      description: `"${task.title}" has been added to your task list.`,
    });
  };

  const toggleTaskComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date() : undefined
        };
        
        if (!task.completed) {
          // Celebrate completion
          toast({
            title: '🎉 Task Completed!',
            description: `You earned ${task.points} points! Great job!`,
          });
        }
        
        return updatedTask;
      }
      return task;
    });
    
    setTasks(updatedTasks);
    calculateStats(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    calculateStats(updatedTasks);
    
    toast({
      title: 'Task Deleted',
      description: 'Task has been removed from your list.',
    });
  };

  const getPriorityColor = (priority: string) => {
    return priorities.find(p => p.value === priority)?.color || 'bg-gray-400';
  };

  const getCategoryIcon = (category: string) => {
    return categories.find(c => c.value === category)?.icon || '📋';
  };

  const TaskCard = ({ task, index }: { task: Task; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`wellness-card ${task.completed ? 'bg-success/10 border-success/20' : ''}`}
    >
      <div className="flex items-start space-x-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleTaskComplete(task.id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-success border-success text-white'
              : 'border-muted-foreground hover:border-primary'
          }`}
        >
          {task.completed && <CheckCircle className="w-4 h-4" />}
        </motion.button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {getCategoryIcon(task.category)} {task.category}
              </Badge>
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
            </div>
          </div>
          
          {task.description && (
            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <CalendarIcon className="w-3 h-3 mr-1" />
                {format(task.dueDate, 'MMM dd')}
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-warning" />
                +{task.points} pts
              </div>
              {isToday(task.dueDate) && (
                <Badge variant="secondary" className="text-xs">Today</Badge>
              )}
              {isPast(task.dueDate) && !task.completed && (
                <Badge variant="destructive" className="text-xs">Overdue</Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-calm border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold">{stats.totalTasks}</p>
              </div>
              <Target className="w-6 h-6 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-healing border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Completed</p>
                <p className="text-2xl font-bold">{stats.completedTasks}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-support border-0 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Streak Days</p>
                <p className="text-2xl font-bold">{stats.streakDays}</p>
              </div>
              <Flame className="w-6 h-6 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-wellness border-0 text-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary/80 text-sm">Total Points</p>
                <p className="text-2xl font-bold">{stats.totalPoints}</p>
              </div>
              <Trophy className="w-6 h-6 text-primary/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Daily Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(stats.completionRate)}%</span>
          </div>
          <Progress value={stats.completionRate} className="h-2" />
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.icon} {cat.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {priorities.map(priority => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-2"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="h-8 px-2"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className="h-8 px-2"
            >
              <CalendarIcon className="w-4 h-4" />
            </Button>
          </div>
          
          <Button onClick={() => setShowAddTask(true)} className="bg-gradient-support hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAddTask(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background p-6 rounded-lg w-full max-w-md m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Add New Task</h2>
              
              <div className="space-y-4">
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                
                <Input
                  placeholder="Description (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value as Task['category'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.icon} {cat.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value as Task['priority'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.value} (+{priority.points} pts)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {format(newTask.dueDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate}
                      onSelect={(date) => date && setNewTask({ ...newTask, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <div className="flex gap-2">
                  <Button onClick={addTask} className="flex-1">
                    Add Task
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddTask(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Views */}
      <div className="space-y-4">
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No tasks found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterCategory !== 'all' || filterPriority !== 'all' 
                    ? 'Try adjusting your filters or search terms.'
                    : 'Add your first task to get started!'}
                </p>
              </div>
            )}
          </div>
        )}

        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">To Do</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredTasks.filter(task => !task.completed && isFuture(task.dueDate)).map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Today/Overdue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredTasks.filter(task => !task.completed && (isToday(task.dueDate) || isPast(task.dueDate))).map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Completed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredTasks.filter(task => task.completed).map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {viewMode === 'calendar' && (
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                
                <div>
                  <h3 className="font-semibold mb-4">
                    Tasks for {selectedDate ? format(selectedDate, 'PPP') : 'Selected Date'}
                  </h3>
                  <div className="space-y-3">
                    {selectedDate && filteredTasks
                      .filter(task => format(task.dueDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
                      .map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedTaskManager;