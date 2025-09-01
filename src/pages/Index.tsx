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
  ArrowRight
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
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-gentle' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Student Zen Path</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('chat')}
                className="text-foreground hover:text-primary transition-smooth"
              >
                Get Help
              </button>
              <button 
                onClick={() => scrollToSection('resources')}
                className="text-foreground hover:text-primary transition-smooth"
              >
                Resources
              </button>
              <button 
                onClick={() => scrollToSection('community')}
                className="text-foreground hover:text-primary transition-smooth"
              >
                Community
              </button>
              <Button 
                onClick={() => scrollToSection('booking')}
                className="bg-gradient-hero hover:opacity-90 shadow-gentle"
              >
                Book Session
              </Button>
            </div>
            
            {/* Crisis Hotline */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="destructive" 
                size="sm" 
                className="crisis-pulse"
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
      <section id="home" className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Confidential • Secure • Available 24/7
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your Mental Health Journey
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Starts Here</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                A comprehensive digital platform designed specifically for college students, offering AI-powered support, 
                professional counseling, peer community, and evidence-based resources for mental wellness.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:opacity-90 shadow-warm text-lg px-8 py-3"
                onClick={() => scrollToSection('chat')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Help Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => scrollToSection('booking')}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Counseling
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Users, label: "Students Supported", value: "2,500+" },
                { icon: MessageCircle, label: "AI Conversations", value: "15K+" },
                { icon: Heart, label: "Success Rate", value: "95%" },
                { icon: Clock, label: "Avg Response Time", value: "< 2min" }
              ].map((stat, index) => (
                <div key={index} className="wellness-card text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured This Week */}
      <section className="py-16 px-6 bg-gradient-calm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured This Week</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our latest wellness programs, live sessions, and resources curated for your mental health journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Featured Video */}
            <Card className="wellness-card overflow-hidden">
              <div className="relative aspect-video bg-gradient-hero flex items-center justify-center">
                <Button 
                  size="lg" 
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                  onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                >
                  <Play className="w-6 h-6" />
                </Button>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Mindfulness for Students</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Learn practical mindfulness techniques designed specifically for academic stress.
                </p>
                <Badge variant="secondary">12 min watch</Badge>
              </CardContent>
            </Card>

            {/* Live Session */}
            <Card className="wellness-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-destructive rounded-full mr-2 animate-pulse" />
                  <span className="text-sm font-medium text-destructive">Live Session</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Group Therapy: Anxiety Management</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Join our licensed therapist for a supportive group session on managing academic anxiety.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Today 7:00 PM</span>
                  <Button 
                    size="sm"
                    onClick={() => window.open('https://meet.google.com/sample-link', '_blank')}
                  >
                    Join Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Wellness Program */}
            <Card className="wellness-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="w-5 h-5 text-warning mr-2" />
                  <span className="text-sm font-medium text-warning">New Program</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">21-Day Stress Relief Challenge</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Build healthy coping mechanisms with our structured daily activities and progress tracking.
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => alert('Starting 21-Day Stress Relief Challenge! Check your email for day 1 activities.')}
                  >
                    Start Program
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = 'data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCA1OIDAKL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCnicY2BkYGAA4pdvfKrx/DZfGbiZGBhANAMjAyOQZmBgZIAAEzMDKyOQBqI4NBjZGBkZ2FmZGRg42VgY2NnZGBg52RkY2NjZGBhZWRkYGBlZGRhYWFkYGFhYWRgYGFhYGRgYGBlYGRgYGRgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGEOAGD3BsLgKZW5kc3RyZWFtCmVuZG9iago=';
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

      {/* Main Sections */}
      <ChatInterface />
      <BookingSystem />
      <ResourceHub />
      <PeerSupport />
      
      {/* Quick Access Admin */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={() => setActiveSection(activeSection === 'admin' ? 'home' : 'admin')}
          className="rounded-full w-14 h-14 bg-gradient-support shadow-warm"
        >
          <BarChart3 className="w-6 h-6" />
        </Button>
      </div>
      
      {activeSection === 'admin' && <AdminDashboard />}

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold">Student Zen Path</span>
              </div>
              <p className="text-gray-300 text-sm">
                Supporting college students on their mental health journey with compassion, technology, and evidence-based care.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Help</h4>
              <div className="space-y-2 text-sm">
                {crisisHotlines.map((hotline, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-300">{hotline.name}</span>
                    <button 
                      onClick={() => window.open(`tel:${hotline.number}`)}
                      className="text-primary hover:text-primary-glow transition-smooth"
                    >
                      {hotline.number}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Mental Health First Aid</p>
                <p>Crisis Prevention</p>
                <p>Wellness Programs</p>
                <p>Peer Support Groups</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Privacy & Safety</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>HIPAA Compliant</p>
                <p>End-to-End Encryption</p>
                <p>Anonymous Options</p>
                <p>24/7 Monitoring</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 Student Zen Path. Confidential mental health support for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;