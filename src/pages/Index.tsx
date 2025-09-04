import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Heart, 
  Shield, 
  Brain, 
  Sparkles,
  Phone,
  Clock,
  Star,
  Award,
  TrendingUp,
  User,
  Zap,
  ChevronRight,
  Play,
  Download,
  ArrowRight,
  Quote,
  BarChart3
} from 'lucide-react';
import EnhancedChatInterface from '@/components/EnhancedChatInterface';
import BookingSystem from '@/components/BookingSystem';
import ResourceHub from '@/components/ResourceHub';
import PeerSupport from '@/components/PeerSupport';
import AdminDashboard from '@/components/AdminDashboard';
import Navigation from '@/components/Navigation';
import GovernmentAuthSystem from '@/components/GovernmentAuthSystem';
import StudentDashboard from '@/components/StudentDashboard';
import ProfessionalDatabase from '@/components/ProfessionalDatabase';

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  // Animation hooks for sections
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleShowAuth = (type: 'login' | 'signup') => {
    setAuthType(type);
    setShowAuth(true);
  };

  const handleAuthSuccess = (user: { name: string; email: string; role: string }) => {
    setCurrentUser(user);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // If user is logged in, show appropriate dashboard
  if (currentUser) {
    if (currentUser.role === 'student') {
      return <StudentDashboard user={currentUser} onLogout={handleLogout} />;
    } else if (currentUser.role === 'admin') {
      return (
        <div className="min-h-screen bg-background">
          <AdminDashboard />
          <div className="fixed top-4 right-4 z-50">
            <Button variant="outline" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      );
    }
  }

  const crisisHotlines = [
    { name: "National Crisis Line", number: "988" },
    { name: "Campus Safety", number: "555-0123" },
    { name: "Student Wellness", number: "555-0124" }
  ];

  return (
    <div className="min-h-screen bg-gradient-wellness">
      {/* Navigation */}
      <Navigation onShowAuth={handleShowAuth} />

      {/* Authentication Modal */}
      <AnimatePresence>
        {showAuth && (
          <GovernmentAuthSystem
            isOpen={showAuth}
            onClose={() => setShowAuth(false)}
            initialType={authType === 'login' ? 'login' : 'student'}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        id="hero"
        className="pt-32 pb-20 px-6 floating-shapes wave-background relative"
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="motivational-quote mb-12 max-w-3xl mx-auto"
            >
              <Quote className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="text-xl font-medium text-foreground italic">
                "Your mental health journey matters. Every step you take toward healing is a victory worth celebrating."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-10"
            >
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:opacity-90 shadow-warm text-lg px-10 py-4 hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('ai-support')}
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Get Help Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection('counselor-booking')}
              >
                <Calendar className="w-6 h-6 mr-3" />
                Book Counseling
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 50 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Users, label: "Students Supported", value: "2,500+", color: "text-primary" },
                { icon: MessageCircle, label: "AI Conversations", value: "15K+", color: "text-secondary" },
                { icon: Heart, label: "Success Rate", value: "95%", color: "text-accent" },
                { icon: Clock, label: "Avg Response Time", value: "< 2min", color: "text-success" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="interactive-card text-center p-8 group"
                >
                  <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

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
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-gradient-support"
      >
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
      </motion.section>

      {/* Main Sections with Enhanced Animations */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-healing py-8 px-6"
        >
          <div className="container mx-auto text-center">
            <div className="motivational-quote max-w-2xl mx-auto bg-white/10 border-white/20">
              <p className="text-white font-medium">
                "Taking this step shows your courage and commitment to your mental wellness."
              </p>
            </div>
          </div>
        </motion.div>
        <div id="ai-support">
          <ChatInterface />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-calm py-8 px-6"
      >
        <div className="container mx-auto text-center">
          <div className="motivational-quote max-w-2xl mx-auto">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-foreground font-medium">
              "Professional support is a sign of strength, not weakness. You deserve care and healing."
            </p>
          </div>
        </div>
      </motion.div>
      <div id="counselor-booking">
        <BookingSystem />
      </div>

      <div id="resources">
        <ResourceHub />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-support py-8 px-6"
      >
        <div className="container mx-auto text-center">
          <div className="motivational-quote max-w-2xl mx-auto border-white/20">
            <Users className="w-8 h-8 text-white mx-auto mb-3" />
            <p className="text-white font-medium">
              "Together we grow stronger. Your story and support can help others on their healing journey."
            </p>
          </div>
        </div>
      </motion.div>
      <div id="peer-support">
        <PeerSupport />
      </div>
      
      {/* Quick Access Admin */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Button 
          onClick={() => setShowAdmin(!showAdmin)}
          className="rounded-full w-16 h-16 bg-gradient-support shadow-warm hover:shadow-deep hover:scale-110 transition-all duration-300"
        >
          <BarChart3 className="w-7 h-7" />
        </Button>
      </motion.div>
      
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            id="admin"
          >
            <AdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-foreground text-white py-16 px-6 relative overflow-hidden"
      >
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
                {[
                  { name: "National Crisis Line", number: "988" },
                  { name: "Campus Safety", number: "555-0123" },
                  { name: "Student Wellness", number: "555-0124" }
                ].map((hotline, index) => (
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
      </motion.footer>
    </div>
  );
};

export default Index;