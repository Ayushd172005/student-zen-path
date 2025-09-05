import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Download, 
  Play, 
  Search, 
  Filter,
  Clock,
  Star,
  Volume2,
  FileText,
  Video,
  Headphones,
  Brain,
  Heart,
  Shield,
  Users,
  Zap,
  Pause,
  SkipForward,
  VolumeX
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'video' | 'audio' | 'worksheet';
  category: string;
  duration?: string;
  rating: number;
  downloads: number;
  tags: string[];
  featured?: boolean;
  audioUrl?: string;
}

const ResourceHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const { toast } = useToast();

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Complete Guide to Managing Academic Stress',
      description: 'Comprehensive strategies for handling exam pressure, deadlines, and academic overwhelm.',
      type: 'guide',
      category: 'stress',
      rating: 4.8,
      downloads: 2456,
      tags: ['stress', 'academic', 'time-management', 'coping'],
      featured: true
    },
    {
      id: '2',
      title: 'Mindfulness Meditation for Students',
      description: '20-minute guided meditation specifically designed for student life and academic challenges.',
      type: 'audio',
      category: 'mindfulness',
      duration: '20 min',
      rating: 4.9,
      downloads: 3210,
      tags: ['meditation', 'mindfulness', 'relaxation', 'focus'],
      audioUrl: 'meditation-audio'
    },
    {
      id: '3',
      title: 'Understanding Anxiety: What Every Student Should Know',
      description: 'Educational video explaining anxiety symptoms, triggers, and management techniques.',
      type: 'video',
      category: 'anxiety',
      duration: '15 min',
      rating: 4.7,
      downloads: 1876,
      tags: ['anxiety', 'education', 'mental-health', 'awareness'],
      featured: true
    },
    {
      id: '4',
      title: 'Daily Mood Tracking Worksheet',
      description: 'Printable mood tracker to help identify patterns and triggers in your mental health.',
      type: 'worksheet',
      category: 'self-help',
      rating: 4.6,
      downloads: 1543,
      tags: ['mood', 'tracking', 'self-awareness', 'worksheet']
    },
    {
      id: '5',
      title: 'Sleep Hygiene for Better Mental Health',
      description: 'Evidence-based guide to improving sleep quality and its impact on mental wellness.',
      type: 'guide',
      category: 'sleep',
      rating: 4.8,
      downloads: 2134,
      tags: ['sleep', 'wellness', 'routine', 'health']
    },
    {
      id: '6',
      title: 'Progressive Muscle Relaxation',
      description: 'Audio guide for deep relaxation technique to reduce physical tension and anxiety.',
      type: 'audio',
      category: 'relaxation',
      duration: '25 min',
      rating: 4.9,
      downloads: 2876,
      tags: ['relaxation', 'tension', 'body', 'calming'],
      audioUrl: 'relaxation-audio'
    },
    {
      id: '7',
      title: 'Building Healthy Relationships in College',
      description: 'Video series on maintaining friendships, setting boundaries, and social wellness.',
      type: 'video',
      category: 'relationships',
      duration: '12 min',
      rating: 4.5,
      downloads: 1234,
      tags: ['relationships', 'social', 'boundaries', 'communication']
    },
    {
      id: '8',
      title: 'Crisis Management Action Plan',
      description: 'Essential worksheet for creating your personal crisis response plan and safety network.',
      type: 'worksheet',
      category: 'crisis',
      rating: 4.9,
      downloads: 987,
      tags: ['crisis', 'safety', 'planning', 'emergency'],
      featured: true
    },
    {
      id: '9',
      title: 'Ocean Waves for Deep Focus',
      description: 'Calming ocean sounds to enhance concentration and reduce study stress.',
      type: 'audio',
      category: 'focus',
      duration: '60 min',
      rating: 4.7,
      downloads: 3456,
      tags: ['focus', 'concentration', 'nature-sounds', 'study'],
      audioUrl: 'ocean-waves'
    },
    {
      id: '10',
      title: 'Forest Rain Meditation',
      description: 'Peaceful rain sounds combined with gentle forest ambiance for relaxation.',
      type: 'audio',
      category: 'relaxation',
      duration: '45 min',
      rating: 4.8,
      downloads: 2987,
      tags: ['rain', 'forest', 'meditation', 'peace'],
      audioUrl: 'forest-rain'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    { id: 'stress', name: 'Stress Management', icon: Brain },
    { id: 'anxiety', name: 'Anxiety Support', icon: Heart },
    { id: 'depression', name: 'Depression Help', icon: Shield },
    { id: 'mindfulness', name: 'Mindfulness', icon: Zap },
    { id: 'sleep', name: 'Sleep Health', icon: Clock },
    { id: 'relationships', name: 'Relationships', icon: Users },
    { id: 'self-help', name: 'Self-Help Tools', icon: Star },
    { id: 'crisis', name: 'Crisis Support', icon: Shield },
    { id: 'focus', name: 'Focus & Study', icon: Target },
    { id: 'relaxation', name: 'Relaxation', icon: Heart }
  ];

  const resourceTypes = [
    { id: 'all', name: 'All Types', icon: BookOpen },
    { id: 'guide', name: 'Guides & Articles', icon: FileText },
    { id: 'video', name: 'Videos', icon: Video },
    { id: 'audio', name: 'Audio Content', icon: Headphones },
    { id: 'worksheet', name: 'Worksheets', icon: Download }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide': return FileText;
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'worksheet': return Download;
      default: return BookOpen;
    }
  };

  const playAudio = (resource: Resource) => {
    if (resource.audioUrl) {
      setCurrentAudio(resource.id);
      setIsPlaying(true);
      setAudioProgress(0);
      
      // Simulate audio playback
      const duration = parseInt(resource.duration?.split(' ')[0] || '20') * 60; // Convert to seconds
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            setCurrentAudio(null);
            toast({
              title: '🎵 Audio Complete',
              description: `Finished playing "${resource.title}"`,
            });
            return 100;
          }
          return prev + (100 / duration);
        });
      }, 1000);

      toast({
        title: '🎵 Now Playing',
        description: `"${resource.title}" - ${resource.duration}`,
      });
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    toast({
      title: '⏸️ Audio Paused',
      description: 'Audio playback paused',
    });
  };

  const stopAudio = () => {
    setCurrentAudio(null);
    setIsPlaying(false);
    setAudioProgress(0);
    toast({
      title: '⏹️ Audio Stopped',
      description: 'Audio playback stopped',
    });
  };

  const handleResourceDownload = (resource: Resource) => {
    if (resource.type === 'video') {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      return;
    }
    
    if (resource.type === 'audio') {
      playAudio(resource);
      return;
    }
    
    // For guides and worksheets, create a sample download
    const sampleContent = `
Sample ${resource.type.toUpperCase()}: ${resource.title}

${resource.description}

This is a comprehensive resource containing:
- Detailed information about ${resource.category}
- Practical exercises and techniques
- Evidence-based strategies
- Professional resources and references
- Indian context and cultural considerations

Tags: ${resource.tags.join(', ')}
Rating: ${resource.rating}/5 stars
Downloads: ${resource.downloads.toLocaleString()}

For the complete resource, this would be a professionally designed PDF 
with comprehensive content, exercises, and visual aids tailored for 
Indian college students.

Contact: resources@studentzenpath.edu for more information.
    `;
    
    const blob = new Blob([sampleContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: '📥 Download Started',
      description: `"${resource.title}" is being downloaded`,
    });
  };

  return (
    <section id="resources" className="py-16 px-6 bg-gradient-calm">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Evidence-Based Mental Health Resources
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Psychoeducational Resource Hub
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access our comprehensive library of mental health guides, videos, audio content, and interactive worksheets. 
            All resources are evidence-based and tailored for Indian student life.
          </p>
        </div>

        {/* Audio Player */}
        {currentAudio && (
          <Card className="wellness-card mb-8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Headphones className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium">
                      {resources.find(r => r.id === currentAudio)?.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Progress value={audioProgress} className="w-32 h-2" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(audioProgress)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isPlaying ? (
                    <Button onClick={pauseAudio} size="sm">
                      <Pause className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={() => setIsPlaying(true)} size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  <Button onClick={stopAudio} variant="outline" size="sm">
                    <VolumeX className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Resources */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Star className="w-6 h-6 mr-2 text-warning" />
            Featured This Week
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => {
              const ResourceIcon = getResourceIcon(resource.type);
              return (
                <Card key={resource.id} className="wellness-card border-2 border-warning/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <ResourceIcon className="w-5 h-5 text-primary" />
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <Badge className="bg-warning text-warning-foreground">Featured</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-warning fill-current" />
                          {resource.rating}
                        </div>
                        <div className="flex items-center">
                          <Download className="w-3 h-3 mr-1" />
                          {resource.downloads.toLocaleString()}
                        </div>
                        {resource.duration && (
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.duration}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-support hover:opacity-90"
                      onClick={() => handleResourceDownload(resource)}
                    >
                      {resource.type === 'video' ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Watch Video
                        </>
                      ) : resource.type === 'audio' ? (
                        <>
                          <Volume2 className="w-4 h-4 mr-2" />
                          Play Audio
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <Card className="wellness-card">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources, topics, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 6).map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="text-xs"
                    >
                      <category.icon className="w-3 h-3 mr-1" />
                      {category.name}
                    </Button>
                  ))}
                </div>
                
                {/* Type Filter */}
                <div className="flex gap-2">
                  {resourceTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type.id)}
                      className="text-xs"
                    >
                      <type.icon className="w-3 h-3 mr-1" />
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const ResourceIcon = getResourceIcon(resource.type);
            const isCurrentlyPlaying = currentAudio === resource.id && isPlaying;
            
            return (
              <Card key={resource.id} className="wellness-card h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <ResourceIcon className="w-4 h-4 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      {isCurrentlyPlaying && (
                        <Badge className="bg-success text-xs">Playing</Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Star className="w-3 h-3 mr-1 text-warning fill-current" />
                      {resource.rating}
                    </div>
                  </div>
                  <CardTitle className="text-base leading-tight">{resource.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {resource.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {resource.downloads.toLocaleString()}
                    </div>
                    {resource.duration && (
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {resource.duration}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {currentAudio === resource.id && (
                    <div className="mb-4">
                      <Progress value={audioProgress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Playing...</span>
                        <span>{Math.round(audioProgress)}%</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleResourceDownload(resource)}
                    >
                      {resource.type === 'video' ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Watch
                        </>
                      ) : resource.type === 'audio' ? (
                        currentAudio === resource.id ? (
                          isPlaying ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Resume
                            </>
                          )
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 mr-2" />
                            Play
                          </>
                        )
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                    
                    {resource.type === 'audio' && currentAudio === resource.id && (
                      <Button onClick={stopAudio} variant="outline" size="sm">
                        <VolumeX className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Wellness Tools Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-primary" />
            Interactive Wellness Tools
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Pomodoro Timer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Boost productivity with focused 25-minute work sessions followed by short breaks.
                </p>
                <Button 
                  className="w-full bg-gradient-healing hover:opacity-90"
                  onClick={() => toast({ title: 'Pomodoro Timer', description: 'Switch to Wellness tab to use the Pomodoro timer!' })}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Focus Session
                </Button>
              </CardContent>
            </Card>
            
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-primary" />
                  Mood Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Track your daily emotions and identify patterns in your mental health journey.
                </p>
                <Button 
                  className="w-full bg-gradient-support hover:opacity-90"
                  onClick={() => toast({ title: 'Mood Tracker', description: 'Switch to Wellness tab to log your mood!' })}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Log Today's Mood
                </Button>
              </CardContent>
            </Card>
            
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Breathing Exercise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Practice guided breathing exercises to reduce anxiety and promote relaxation.
                </p>
                <Button 
                  className="w-full bg-gradient-calm hover:opacity-90"
                  onClick={() => toast({ title: 'Breathing Exercise', description: 'Switch to Wellness tab to start breathing exercises!' })}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Start Breathing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resource Categories Info */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="wellness-card text-center">
            <CardContent className="p-6">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Educational Guides</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive written resources covering various mental health topics
              </p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card text-center">
            <CardContent className="p-6">
              <Video className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Video Content</h4>
              <p className="text-sm text-muted-foreground">
                Educational videos and wellness demonstrations by mental health professionals
              </p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card text-center">
            <CardContent className="p-6">
              <Headphones className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Audio Resources</h4>
              <p className="text-sm text-muted-foreground">
                Guided meditations, relaxation exercises, and calming soundscapes
              </p>
            </CardContent>
          </Card>
          
          <Card className="wellness-card text-center">
            <CardContent className="p-6">
              <Download className="w-12 h-12 text-success mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Interactive Tools</h4>
              <p className="text-sm text-muted-foreground">
                Downloadable worksheets, trackers, and self-assessment tools
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;