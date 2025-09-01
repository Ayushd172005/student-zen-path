import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  MessageCircle,
  Send,
  Heart,
  Reply,
  MoreHorizontal,
  Star,
  Shield,
  Clock,
  ThumbsUp,
  Plus,
  Paperclip,
  Image,
  CheckCircle2,
  User,
  Crown,
  FileText
} from 'lucide-react';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image';
  isRead: boolean;
  isMentor?: boolean;
}

interface Discussion {
  id: string;
  title: string;
  category: string;
  author: string;
  authorAvatar: string;
  content: string;
  replies: number;
  likes: number;
  timestamp: Date;
  tags: string[];
  isActive: boolean;
}

interface ChatSession {
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  specialties: string[];
  isOnline: boolean;
  messages: Message[];
}

const PeerSupport = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'community' | 'mentors'>('community');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '', category: '', tags: '' });
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [activeChatMentor, setActiveChatMentor] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const discussionCategories = [
    { id: 'all', name: 'All Discussions', count: 78, color: 'primary' },
    { id: 'academic', name: 'Academic Stress', count: 24, color: 'blue' },
    { id: 'anxiety', name: 'Anxiety', count: 18, color: 'green' },
    { id: 'depression', name: 'Depression', count: 15, color: 'purple' },
    { id: 'social', name: 'Social Issues', count: 12, color: 'orange' },
    { id: 'sleep', name: 'Sleep Problems', count: 9, color: 'teal' },
    { id: 'relationships', name: 'Relationships', count: 6, color: 'pink' }
  ];

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'How do you manage exam anxiety?',
      category: 'anxiety',
      author: 'Sarah M.',
      authorAvatar: '/api/placeholder/32/32',
      content: 'Finals are coming up and I feel overwhelmed. What techniques have helped you stay calm during exams?',
      replies: 23,
      likes: 45,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['exams', 'anxiety', 'coping'],
      isActive: true
    },
    {
      id: '2',
      title: 'Study group success stories',
      category: 'academic',
      author: 'Mike R.',
      authorAvatar: '/api/placeholder/32/32',
      content: 'Started a study group for organic chemistry and it changed everything! Anyone else have positive group study experiences?',
      replies: 17,
      likes: 32,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      tags: ['study-groups', 'academic', 'success'],
      isActive: true
    },
    {
      id: '3',
      title: 'Dealing with homesickness as a freshman',
      category: 'social',
      author: 'Emma L.',
      authorAvatar: '/api/placeholder/32/32',
      content: 'Missing home more than I expected. How did you adjust to college life away from family?',
      replies: 31,
      likes: 67,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      tags: ['homesickness', 'freshman', 'adjustment'],
      isActive: true
    },
    {
      id: '4',
      title: 'Sleep schedule completely messed up',
      category: 'sleep',
      author: 'Alex K.',
      authorAvatar: '/api/placeholder/32/32',
      content: 'Been staying up until 3am and sleeping through morning classes. Any tips for fixing my sleep cycle?',
      replies: 28,
      likes: 41,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      tags: ['sleep', 'routine', 'health'],
      isActive: false
    }
  ];

  const mentors = [
    {
      id: '1',
      name: 'Jessica Chen',
      avatar: '/api/placeholder/48/48',
      specialties: ['Anxiety', 'Academic Stress', 'Time Management'],
      year: 'Senior Psychology Major',
      isOnline: true,
      rating: 4.9,
      sessionsCompleted: 89
    },
    {
      id: '2',
      name: 'Marcus Williams',
      avatar: '/api/placeholder/48/48',
      specialties: ['Depression', 'Social Skills', 'Motivation'],
      year: 'Graduate Student',
      isOnline: true,
      rating: 4.8,
      sessionsCompleted: 67
    },
    {
      id: '3',
      name: 'Priya Patel',
      avatar: '/api/placeholder/48/48',
      specialties: ['Relationships', 'Self-Esteem', 'Cultural Issues'],
      year: 'Senior Social Work Major',
      isOnline: false,
      rating: 4.9,
      sessionsCompleted: 94
    }
  ];

  const filteredDiscussions = selectedCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === selectedCategory);

  const handleNewDiscussion = () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and content for your discussion.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Discussion Created!",
      description: "Your discussion has been posted and is awaiting moderation.",
    });

    setNewDiscussion({ title: '', content: '', category: '', tags: '' });
    setShowNewDiscussion(false);
  };

  const handleStartChat = (mentorId: string) => {
    setActiveChatMentor(mentorId);
    // Initialize chat with welcome message
    const welcomeMessage: Message = {
      id: '1',
      userId: mentorId,
      userName: mentors.find(m => m.id === mentorId)?.name || 'Mentor',
      userAvatar: mentors.find(m => m.id === mentorId)?.avatar || '',
      content: "Hi! I'm here to support you. What would you like to talk about today?",
      timestamp: new Date(),
      type: 'text',
      isRead: false,
      isMentor: true
    };
    setChatMessages([welcomeMessage]);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !activeChatMentor) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: '/api/placeholder/32/32',
      content: chatMessage,
      timestamp: new Date(),
      type: 'text',
      isRead: true
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatMessage('');
    setIsTyping(true);

    // Simulate mentor response
    setTimeout(() => {
      const mentor = mentors.find(m => m.id === activeChatMentor);
      const responses = [
        "That sounds really challenging. Can you tell me more about what specifically is causing you stress?",
        "I understand how you're feeling. Many students go through similar experiences. What coping strategies have you tried so far?",
        "Thank you for sharing that with me. It takes courage to open up about these feelings. Let's work together on some techniques that might help.",
        "That's a very common concern among college students. Have you considered talking to a counselor about this as well?",
        "I appreciate you trusting me with this. Let's break this down into smaller, manageable steps."
      ];

      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        userId: activeChatMentor,
        userName: mentor?.name || 'Mentor',
        userAvatar: mentor?.avatar || '',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text',
        isRead: false,
        isMentor: true
      };

      setChatMessages(prev => [...prev, mentorMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileShare = () => {
    if (!activeChatMentor) return;
    
    const fileMessage: Message = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: '/api/placeholder/32/32',
      content: 'Shared: relaxation-techniques.pdf',
      timestamp: new Date(),
      type: 'file',
      isRead: true
    };

    setChatMessages(prev => [...prev, fileMessage]);
  };

  return (
    <section id="community" className="py-16 px-6 bg-gradient-support">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Peer Support Community
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Connect with Fellow Students
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our supportive community where students share experiences, offer encouragement, 
            and connect with trained peer mentors for guidance and support.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-background rounded-lg p-1 shadow-gentle">
            <Button
              variant={activeTab === 'community' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('community')}
              className="px-6"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Community Discussions
            </Button>
            <Button
              variant={activeTab === 'mentors' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('mentors')}
              className="px-6"
            >
              <Crown className="w-4 h-4 mr-2" />
              Peer Mentors
            </Button>
          </div>
        </div>

        {activeTab === 'community' && (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <Card className="wellness-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Discussion Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {discussionCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                        selectedCategory === category.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* New Discussion Button */}
              <Button 
                onClick={() => setShowNewDiscussion(true)}
                className="w-full mt-4 bg-gradient-healing hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start New Discussion
              </Button>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* New Discussion Form */}
              {showNewDiscussion && (
                <Card className="wellness-card mb-6">
                  <CardHeader>
                    <CardTitle>Start a New Discussion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Input
                        placeholder="Discussion title"
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Share your experience, ask a question, or start a conversation..."
                        rows={4}
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-4">
                      <select 
                        className="flex-1 p-2 border rounded-md"
                        value={newDiscussion.category}
                        onChange={(e) => setNewDiscussion(prev => ({ ...prev, category: e.target.value }))}
                      >
                        <option value="">Select Category</option>
                        {discussionCategories.slice(1).map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <Input
                        placeholder="Tags (comma separated)"
                        className="flex-1"
                        value={newDiscussion.tags}
                        onChange={(e) => setNewDiscussion(prev => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleNewDiscussion} className="bg-gradient-healing">
                        Post Discussion
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewDiscussion(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Discussion List */}
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="wellness-card">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                          <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg">{discussion.title}</h3>
                              {discussion.isActive && (
                                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                              )}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {discussion.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {discussionCategories.find(cat => cat.id === discussion.category)?.name}
                            </Badge>
                            <span className="text-sm text-muted-foreground">by {discussion.author}</span>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{discussion.content}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-smooth">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">{discussion.likes}</span>
                              </button>
                              <button 
                                className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-smooth"
                                onClick={() => toast({ title: "Coming Soon", description: "Reply functionality is being developed!" })}
                              >
                                <Reply className="w-4 h-4" />
                                <span className="text-sm">{discussion.replies} replies</span>
                              </button>
                            </div>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Join Discussion
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button 
                  variant="outline"
                  onClick={() => toast({ title: "Loading...", description: "More discussions are being loaded!" })}
                >
                  Load More Discussions
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mentors' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mentor List */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {mentors.map((mentor) => (
                  <Card key={mentor.id} className="wellness-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={mentor.avatar} alt={mentor.name} />
                            <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          {mentor.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{mentor.name}</h3>
                            <Crown className="w-4 h-4 text-warning" />
                          </div>
                          <p className="text-sm text-muted-foreground">{mentor.year}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-3 h-3 text-warning fill-current mr-1" />
                            <span className="text-xs">{mentor.rating} ({mentor.sessionsCompleted} sessions)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-1">
                          {mentor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleStartChat(mentor.id)}
                        disabled={!mentor.isOnline}
                        className="w-full bg-gradient-healing hover:opacity-90"
                      >
                        {mentor.isOnline ? (
                          <>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Start Chat
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 mr-2" />
                            Currently Offline
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-1">
              {activeChatMentor ? (
                <Card className="wellness-card h-[600px] flex flex-col">
                  <CardHeader className="border-b border-border flex-shrink-0">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={mentors.find(m => m.id === activeChatMentor)?.avatar} />
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-base">
                          {mentors.find(m => m.id === activeChatMentor)?.name}
                        </CardTitle>
                        <div className="flex items-center text-xs text-success">
                          <div className="w-2 h-2 bg-success rounded-full mr-2" />
                          Online • Peer Mentor
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                      {chatMessages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.isMentor ? 'justify-start' : 'justify-end'}`}
                        >
                          <div className={`max-w-[80%] ${
                            message.isMentor 
                              ? 'chat-message-ai' 
                              : 'chat-message-user'
                          }`}>
                            <div className="flex items-start space-x-2">
                              {message.isMentor && (
                                <Crown className="w-3 h-3 mt-1 text-warning flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="text-sm">{message.content}</p>
                                {message.type === 'file' && (
                                  <div className="flex items-center mt-2 p-2 bg-muted rounded text-xs">
                                    <FileText className="w-4 h-4 mr-2" />
                                    <span>Document shared</span>
                                  </div>
                                )}
                                {!message.isRead && !message.isMentor && (
                                  <CheckCircle2 className="w-3 h-3 text-success mt-1" />
                                )}
                              </div>
                            </div>
                            <div className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="chat-message-ai">
                            <div className="flex items-center space-x-2">
                              <Crown className="w-3 h-3 text-warning" />
                              <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="flex-shrink-0">
                      <div className="flex space-x-2 mb-2">
                        <Button variant="outline" size="sm" onClick={handleFileShare}>
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Image className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="wellness-card">
                  <CardContent className="p-8 text-center">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Mentor to Chat</h3>
                    <p className="text-muted-foreground text-sm">
                      Choose an online peer mentor to start a confidential conversation about your concerns.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Community Guidelines */}
        <Card className="wellness-card mt-12">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              <h3 className="font-semibold">Community Guidelines</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Be Respectful</h4>
                <p>Treat all community members with kindness and empathy. Everyone is on their own journey.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Stay Anonymous</h4>
                <p>Protect your privacy and others'. Use first names or initials only when sharing experiences.</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Seek Help When Needed</h4>
                <p>This community supports but doesn't replace professional help. Contact crisis services if in immediate danger.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PeerSupport;