import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Phone, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Calendar,
  Book,
  Users,
  Globe,
  Star,
  Shield,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isCrisis?: boolean;
  category?: string;
  mood?: string;
  suggestions?: string[];
}

interface ChatMemory {
  previousTopics: string[];
  userMood: string[];
  preferredLanguage: string;
  sessionStartTime: Date;
  interactionCount: number;
}

interface MentalHealthTopic {
  keywords: string[];
  responses: string[];
  techniques?: string[];
  crisis?: boolean;
  immediate?: boolean;
  resources?: string[];
}

const EnhancedChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Namaste! 🙏 I am your AI Mental Health Companion. I\'m here to support you in Hindi, English, or any regional language you prefer. How are you feeling today?',
      timestamp: new Date(),
      suggestions: ['I\'m feeling stressed', 'I need help with anxiety', 'I want to learn about mindfulness', 'I\'m having trouble sleeping']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [chatMemory, setChatMemory] = useState<ChatMemory>({
    previousTopics: [],
    userMood: [],
    preferredLanguage: 'en',
    sessionStartTime: new Date(),
    interactionCount: 0
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const comprehensiveMentalHealthTopics: Record<string, MentalHealthTopic> = {
    stress: {
      keywords: ['stress', 'stressed', 'pressure', 'overwhelmed', 'तनाव', 'চাপ', 'ఒత్తిడి'],
      responses: [
        "I understand you're feeling stressed. This is very common among students. Let's work through some immediate relief techniques together.",
        "Stress can feel overwhelming, but you're not alone. Here are some evidence-based strategies that can help you right now.",
        "It's completely normal to feel stressed. Your mental health matters, and seeking support shows great strength."
      ],
      techniques: [
        "4-7-8 Breathing: Inhale for 4, hold for 7, exhale for 8 seconds",
        "Progressive Muscle Relaxation: Tense and release each muscle group",
        "5-4-3-2-1 Grounding: Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste"
      ]
    },
    anxiety: {
      keywords: ['anxiety', 'anxious', 'worried', 'panic', 'चिंता', 'উদ্বেগ', 'ఆందోళన'],
      responses: [
        "Anxiety can be really challenging. Remember, these feelings are temporary and manageable. Let's explore some coping strategies.",
        "I hear that you're experiencing anxiety. You're taking a positive step by reaching out for support.",
        "Anxiety affects millions of students. You're not alone, and there are proven techniques to help manage these feelings."
      ],
      techniques: [
        "Box Breathing: 4 counts in, hold 4, out 4, hold 4",
        "Thought Challenging: Question anxious thoughts with evidence",
        "Mindfulness Meditation: Focus on present moment awareness"
      ]
    },
    depression: {
      keywords: ['depressed', 'sad', 'hopeless', 'down', 'अवसाद', 'বিষাদ', 'నిరాశ'],
      responses: [
        "I'm sorry you're feeling this way. Depression is a serious but treatable condition. Your feelings are valid, and help is available.",
        "Thank you for sharing something so personal. Depression can make everything feel harder, but recovery is possible.",
        "You've taken a brave step by reaching out. Depression is not a sign of weakness - it's a medical condition that responds to treatment."
      ],
      crisis: true,
      resources: [
        "National Suicide Prevention Lifeline: 988",
        "Crisis Text Line: Text HOME to 741741",
        "SAMHSA National Helpline: 1-800-662-4357"
      ]
    },
    sleep: {
      keywords: ['sleep', 'insomnia', 'tired', 'exhausted', 'नींद', 'ঘুম', 'నిద్రలేమి'],
      responses: [
        "Sleep issues are very common among students. Good sleep hygiene can make a huge difference in your mental health.",
        "Quality sleep is crucial for both physical and mental wellbeing. Let's explore some strategies to improve your sleep.",
        "Sleep problems can affect everything from mood to academic performance. I can help you develop better sleep habits."
      ],
      techniques: [
        "Sleep Schedule: Go to bed and wake up at the same time daily",
        "Sleep Environment: Keep room cool, dark, and quiet",
        "Digital Sunset: No screens 1 hour before bedtime"
      ]
    },
    study: {
      keywords: ['study', 'exam', 'academic', 'grades', 'college', 'पढ़ाई', 'পড়াশোনা', 'చదువు'],
      responses: [
        "Academic stress is one of the top challenges for students. Let's work on strategies to manage study-related pressure.",
        "Balancing academics with mental health is crucial. I can help you develop sustainable study habits.",
        "Academic performance and mental health are closely connected. Let's focus on both your wellbeing and success."
      ]
    },
    relationships: {
      keywords: ['relationship', 'friends', 'family', 'lonely', 'social', 'रिश्ते', 'সম্পর্ক', 'సంబంధాలు'],
      responses: [
        "Relationships play a crucial role in our mental health. It's important to have supportive connections.",
        "Social connections can be challenging to navigate. Let's explore healthy relationship patterns.",
        "Feeling isolated is common, especially during college years. Building meaningful connections takes time."
      ]
    },
    crisis: {
      keywords: ['suicide', 'kill myself', 'end it all', 'hurt myself', 'die', 'आत्महत्या', 'আত্মহত্যা', 'ఆత్మహత్య'],
      responses: [
        "I'm very concerned about you. Your life has value and meaning. Please reach out to a crisis counselor immediately.",
        "You're going through something really difficult right now. There are people trained to help you through this crisis.",
        "I want you to know that you don't have to go through this alone. Crisis support is available 24/7."
      ],
      crisis: true,
      immediate: true
    }
  };

  const quickActions = [
    { 
      label: 'Mood Check-in', 
      icon: Heart, 
      message: 'I\'d like to do a mood check-in',
      category: 'wellness'
    },
    { 
      label: 'Breathing Exercise', 
      icon: Zap, 
      message: 'Can you guide me through a breathing exercise?',
      category: 'technique'
    },
    { 
      label: 'Study Stress', 
      icon: Book, 
      message: 'I\'m feeling overwhelmed with my studies',
      category: 'academic'
    },
    { 
      label: 'Sleep Help', 
      icon: Brain, 
      message: 'I\'m having trouble sleeping',
      category: 'health'
    },
    { 
      label: 'Talk to Counselor', 
      icon: Users, 
      message: 'I think I need to speak with a professional counselor',
      category: 'professional'
    },
    { 
      label: 'Crisis Support', 
      icon: Phone, 
      message: 'I need immediate crisis support',
      category: 'crisis'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectMentalHealthTopic = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    for (const [topic, data] of Object.entries(comprehensiveMentalHealthTopics)) {
      if (data.keywords.some(keyword => lowerInput.includes(keyword.toLowerCase()))) {
        return { topic, data };
      }
    }
    return null;
  };

  const generateAIResponse = (userInput: string): Message => {
    const detection = detectMentalHealthTopic(userInput);
    
    if (detection) {
      const { topic, data } = detection;
      const response = data.responses[Math.floor(Math.random() * data.responses.length)];
      
      let fullResponse = response;
      
      if (data.techniques) {
        fullResponse += `\n\n🧘‍♀️ **Helpful Techniques:**\n${data.techniques.map(t => `• ${t}`).join('\n')}`;
      }
      
      if (data.crisis) {
        fullResponse += `\n\n🚨 **Immediate Support:**\nIf you're in crisis, please contact:\n• National Crisis Helpline: 1800-599-0019\n• KIRAN Mental Health: 1800-500-0019\n• Emergency Services: 112`;
      }
      
      fullResponse += `\n\n💡 **Would you like me to:**\n• Connect you with a counselor\n• Teach you a specific technique\n• Provide more resources\n• Schedule a wellness check-in`;
      
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: fullResponse,
        timestamp: new Date(),
        isCrisis: data.crisis,
        category: topic,
        suggestions: data.crisis ? 
          ['Connect me with crisis support', 'I want to talk to someone now', 'Show me safety resources'] :
          ['Tell me more', 'I want to try a technique', 'Connect me with a counselor', 'I need more support']
      };
    }
    
    // Default supportive response with mood tracking
    const supportiveResponses = [
      "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what you're experiencing?",
      "I appreciate you opening up. Your feelings are valid, and it's great that you're seeking support. How can I best help you today?",
      "I'm glad you reached out. Taking care of your mental health is so important. What would be most helpful for you right now?",
      "It takes courage to share your thoughts and feelings. I'm here to support you through whatever you're going through."
    ];
    
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)] + 
        `\n\n🌟 **I can help you with:**\n• Stress and anxiety management\n• Study-life balance\n• Sleep and wellness tips\n• Connecting with professional support\n• Mindfulness and coping techniques`,
      timestamp: new Date(),
      suggestions: ['I\'m feeling stressed', 'I need sleep help', 'I want relaxation techniques', 'Connect me with a counselor']
    };
  };

  const handleSendMessage = (messageText?: string) => {
    const message = messageText || inputValue.trim();
    if (!message) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Update chat memory
    setChatMemory(prev => ({
      ...prev,
      previousTopics: [...prev.previousTopics.slice(-4), message.toLowerCase()],
      interactionCount: prev.interactionCount + 1
    }));
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputValue("Voice input: I'm feeling stressed about my upcoming exams");
      }, 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col">
      <Card className="flex-1 shadow-deep border-0 overflow-hidden">
        <CardHeader className="bg-gradient-hero text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl">AI Mental Health Companion</CardTitle>
                <p className="text-white/90 text-sm">Available 24/7 • Confidential • Multilingual</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
              
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-white/20 text-white text-sm rounded-md px-2 py-1 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-primary text-white">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-wellness">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'chat-message-user' 
                      : `chat-message-ai ${message.isCrisis ? 'border-l-4 border-destructive' : ''}`
                  }`}>
                    {message.isCrisis && (
                      <div className="flex items-center space-x-2 mb-3 p-2 bg-destructive/10 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="text-sm font-medium text-destructive">Crisis Support Available</span>
                      </div>
                    )}
                    
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.suggestions && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendMessage(suggestion)}
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="chat-message-ai">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="text-xs opacity-70 mt-2">AI is thinking...</div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick Action Buttons */}
          <div className="px-6 py-4 border-t border-border bg-background">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(action.message)}
                  className={`flex flex-col items-center p-3 h-auto hover-lift ${
                    action.category === 'crisis' ? 'border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground' : ''
                  }`}
                >
                  <action.icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-6 border-t border-border bg-background">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind... (Press Enter to send)"
                  className="pr-20 py-3 text-base focus-ring"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleVoiceInput}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                    isListening ? 'text-destructive animate-pulse' : 'text-muted-foreground'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="px-6 py-3 bg-gradient-hero hover:opacity-90 hover-lift"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-muted-foreground">
                🔒 Your conversations are confidential. If you're in crisis, call{' '}
                <button 
                  onClick={() => window.open('tel:1800-599-0019')}
                  className="text-primary hover:underline font-medium"
                >
                  1800-599-0019
                </button>
                {' '}for immediate help.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedChatInterface;