import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  BarChart3, 
  Phone, 
  Heart, 
  Shield, 
  Brain, 
  Zap,
  ChevronRight,
  Play,
  Download,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  Quote
} from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import BookingSystem from '@/components/BookingSystem';
import ResourceHub from '@/components/ResourceHub';
import PeerSupport from '@/components/PeerSupport';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const crisisHotlines = [
    { name: "National Crisis Line", number: "988" },
    { name: "Campus Safety", number: "555-0123" },
    { name: "Student Wellness", number: "555-0124" }
  ];

  return (
    <div className="min-h-screen bg-gradient-wellness smooth-scroll">
      {/* Header Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-gentle border-b border-border/50' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center shadow-warm group-hover:scale-110 transition-all duration-300">
                <Heart className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">Student Zen Path</span>
                <div className="text-sm text-muted-foreground font-medium">Your Mental Wellness Journey</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Get Help', section: 'chat', icon: MessageCircle },
                { label: 'Resources', section: 'resources', icon: BookOpen },
                { label: 'Community', section: 'community', icon: Users }
              ].map((item) => (
                <button 
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-all duration-300 group"
                >
                  <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('booking')}
                className="bg-gradient-hero hover:opacity-90 shadow-gentle hover:shadow-warm transition-all duration-300 px-6"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Session
              </Button>
            </div>
            
            {/* Crisis Hotline */}
            <div className="flex items-center space-x-3">
              <Button 
                variant="destructive" 
                size="sm" 
                className="crisis-pulse hover:scale-105 transition-transform"
                onClick={() => window.open('tel:988')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Crisis: 988
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 floating-shapes wave-background relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Motivational Quote */}
            <div className="motivational-quote mb-12 max-w-3xl mx-auto animate-fade-in-up">
              <Quote className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="text-xl font-medium text-foreground italic">
                "Your mental health journey matters. Every step you take toward healing is a victory worth celebrating."
              </p>
            </div>

            <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-gentle">
                <Shield className="w-5 h-5 mr-3" />
                Confidential • Secure • Available 24/7
                <Sparkles className="w-4 h-4 ml-3 animate-pulse" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
                Your Mental Health Journey
                <span className="block bg-gradient-hero bg-clip-text text-transparent animate-pulse">
                  Starts Here
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-4xl mx-auto">
                A comprehensive digital platform designed specifically for college students, offering AI-powered support, 
                professional counseling, peer community, and evidence-based resources for mental wellness.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:opacity-90 shadow-warm text-lg px-10 py-4 hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('chat')}
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Get Help Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('booking')}
              >
                <Calendar className="w-6 h-6 mr-3" />
                Book Counseling
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {[
                { icon: Users, label: "Students Supported", value: "2,500+", color: "text-primary" },
                { icon: MessageCircle, label: "AI Conversations", value: "15K+", color: "text-secondary" },
                { icon: Heart, label: "Success Rate", value: "95%", color: "text-accent" },
                { icon: Clock, label: "Avg Response Time", value: "< 2min", color: "text-success" }
              ].map((stat, index) => (
                <div key={index} className="interactive-card text-center p-8 group">
                  <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Banner */}
      <section className="py-16 px-6 bg-gradient-healing relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-wave" />
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Brain className="w-16 h-16 text-white mx-auto mb-6 animate-breathe" />
            <h2 className="text-4xl font-bold text-white mb-6">
              You Are Not Alone in This Journey
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Every day is a new opportunity to prioritize your mental health. 
              Our platform is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Featured This Week */}
      <section className="py-20 px-6 bg-gradient-calm floating-shapes">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="motivational-quote mb-8 max-w-2xl mx-auto">
              <p className="text-lg font-medium text-foreground">
                "Knowledge empowers recovery, and every resource you explore brings you closer to wellness."
              </p>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Featured This Week</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Discover our latest wellness programs, live sessions, and resources curated for your mental health journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Featured Video */}
            <Card className="interactive-card overflow-hidden group">
              <div className="relative aspect-video bg-gradient-hero flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <Button 
                  size="lg" 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 relative z-10 group-hover:scale-110 transition-all duration-300"
                  onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                >
                  <Play className="w-6 h-6" />
                </Button>
              </div>
              <CardContent className="p-8">
                <h3 className="font-bold text-xl mb-3">Mindfulness for Students</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Learn practical mindfulness techniques designed specifically for academic stress and daily challenges.
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="px-3 py-1">12 min watch</Badge>
                  <Sparkles className="w-5 h-5 text-warning" />
                </div>
              </CardContent>
            </Card>

            {/* Live Session */}
            <Card className="interactive-card group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-4 h-4 bg-destructive rounded-full mr-3 animate-pulse" />
                  <span className="font-semibold text-destructive">Live Session</span>
                </div>
                <h3 className="font-bold text-xl mb-4">Group Therapy: Anxiety Management</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Join our licensed therapist for a supportive group session on managing academic anxiety and stress.
                </p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground font-medium">Today 7:00 PM EST</span>
                  <Badge className="bg-success">8 spots left</Badge>
                </div>
                <Button 
                  className="w-full bg-gradient-healing hover:opacity-90 group-hover:scale-105 transition-all"
                  onClick={() => window.open('https://meet.google.com/sample-link', '_blank')}
                >
                  Join Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Wellness Program */}
            <Card className="interactive-card group">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Star className="w-6 h-6 text-warning mr-3" />
                  <span className="font-semibold text-warning">New Program</span>
                </div>
                <h3 className="font-bold text-xl mb-4">21-Day Stress Relief Challenge</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Build healthy coping mechanisms with our structured daily activities and progress tracking system.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-support hover:opacity-90 group-hover:scale-105 transition-all"
                    onClick={() => alert('Starting 21-Day Stress Relief Challenge! Check your email for day 1 activities.')}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Program
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full hover:bg-muted"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = 'data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA1OIDAKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnicY2BkYGAA4pdvfKrx/DZfGbiZGBhANAMjAyOQZmBgZIAAEzMDKyOQBqI4NBjZGBkZ2FmZGRg42VgY2NnZGBg52RkY2NjZGBhZWRkYGBlZGRhYWFkYGFhYWRgYGFhYGRgYGBlYGRgYGRgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGEOAGD3BsLgKZW5kc3RyZWFtCmVuZG9iago=';
                      link.download = 'wellness-guide-sample.pdf';
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Divider with Motivational Quote */}
      <section className="py-16 px-6 bg-gradient-support">
        <div className="container mx-auto text-center">
          <div className="motivational-quote max-w-3xl mx-auto border-white/20">
            <MessageCircle className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Every Question is a Step Toward Healing
            </h3>
            <p className="text-white/90 text-lg">
              Our AI companion is here to listen, understand, and guide you with compassion and evidence-based support.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <div className="relative">
        {/* Chat Section Motivational Intro */}
        <div className="bg-gradient-healing py-8 px-6">
          <div className="container mx-auto text-center">
            <div className="motivational-quote max-w-2xl mx-auto bg-white/10 border-white/20">
              <p className="text-white font-medium">
                "Taking this step shows your courage and commitment to your mental wellness."
              </p>
            </div>
          </div>
        </div>
        <ChatInterface />
      </div>

      {/* Booking Section Motivational Intro */}
      <div className="bg-gradient-calm py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="motivational-quote max-w-2xl mx-auto">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-foreground font-medium">
              "Professional support is a sign of strength, not weakness. You deserve care and healing."
            </p>
          </div>
        </div>
      </div>
      <BookingSystem />

      <ResourceHub />

      {/* Community Section Motivational Intro */}
      <div className="bg-gradient-support py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="motivational-quote max-w-2xl mx-auto border-white/20">
            <Users className="w-8 h-8 text-white mx-auto mb-3" />
            <p className="text-white font-medium">
              "Together we grow stronger. Your story and support can help others on their healing journey."
            </p>
          </div>
        </div>
      </div>
      <PeerSupport />
      
      {/* Quick Access Admin */}
      <div className="fixed bottom-8 right-8 z-40">
        <Button 
          onClick={() => setActiveSection(activeSection === 'admin' ? 'home' : 'admin')}
          className="rounded-full w-16 h-16 bg-gradient-support shadow-warm hover:shadow-deep hover:scale-110 transition-all duration-300"
        >
          <BarChart3 className="w-7 h-7" />
        </Button>
      </div>
      
      {activeSection === 'admin' && <AdminDashboard />}

      {/* Footer */}
      <footer className="bg-foreground text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">Student Zen Path</span>
                  <div className="text-sm text-gray-300">Mental Wellness Platform</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Supporting college students on their mental health journey with compassion, technology, and evidence-based care.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Crisis Support</h4>
              <div className="space-y-4">
                {crisisHotlines.map((hotline, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <span className="text-gray-300 font-medium">{hotline.name}</span>
                    <button 
                      onClick={() => window.open(`tel:${hotline.number}`)}
                      className="text-primary hover:text-primary-glow transition-colors font-bold"
                    >
                      {hotline.number}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Resources</h4>
              <div className="space-y-3">
                {[
                  'Mental Health First Aid',
                  'Crisis Prevention',
                  'Wellness Programs',
                  'Peer Support Groups'
                ].map((resource, index) => (
                  <p key={index} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    {resource}
                  </p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Privacy & Safety</h4>
              <div className="space-y-3">
                {[
                  'HIPAA Compliant',
                  'End-to-End Encryption',
                  'Anonymous Options',
                  '24/7 Monitoring'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-success" />
                    <p className="text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="text-center">
              <div className="motivational-quote mb-6 bg-white/5 border-white/10">
                <p className="text-white font-medium">
                  "Remember: Seeking help is a sign of strength, and you are never alone in your journey."
                </p>
              </div>
              <p className="text-gray-300">
                &copy; 2024 Student Zen Path. Confidential mental health support for students.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;