import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  AlertTriangle, 
  Phone,
  Heart,
  Brain,
  Shield,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isCrisis?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI mental health companion. I'm here to provide support, coping strategies, and connect you with resources. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mentalHealthTopics = {
    anxiety: {
      keywords: ['anxious', 'anxiety', 'worried', 'panic', 'nervous', 'stress'],
      response: "I understand you're experiencing anxiety. This is very common among students. Here are some immediate techniques: Try the 4-7-8 breathing method (inhale for 4, hold for 7, exhale for 8). Ground yourself by naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. Would you like to explore what might be triggering your anxiety?"
    },
    depression: {
      keywords: ['depressed', 'depression', 'sad', 'hopeless', 'empty', 'worthless'],
      response: "I'm sorry you're going through this difficult time. Depression is treatable, and you're not alone. Small steps can help: try to maintain a daily routine, get some sunlight, and reach out to friends or family. Professional help can make a significant difference. Would you like me to help you find counseling resources on campus?"
    },
    stress: {
      keywords: ['stressed', 'overwhelmed', 'pressure', 'deadline', 'exam'],
      response: "Academic stress is very common. Let's break this down: What specific areas are causing you the most stress? Some strategies that help: prioritize tasks, break large projects into smaller steps, practice time management, and remember to take breaks. Would you like help creating a study schedule or stress management plan?"
    },
    sleep: {
      keywords: ['sleep', 'insomnia', 'tired', 'exhausted', 'can\'t sleep'],
      response: "Sleep issues can significantly impact your mental health and academic performance. Try these sleep hygiene tips: maintain a consistent sleep schedule, avoid screens 1 hour before bed, create a relaxing bedtime routine, and limit caffeine after 2pm. If problems persist, consider speaking with a healthcare provider."
    },
    relationships: {
      keywords: ['relationship', 'friend', 'family', 'lonely', 'isolated', 'social'],
      response: "Relationship challenges and social connections are crucial for mental health. It's okay to feel this way. Consider joining clubs or activities aligned with your interests, practice active listening in conversations, and remember that quality matters more than quantity in friendships. Would you like tips on building social connections?"
    },
    ptsd: {
      keywords: ['trauma', 'ptsd', 'flashback', 'nightmare', 'triggered'],
      response: "Thank you for trusting me with this. Trauma responses are the mind's way of trying to protect you. Grounding techniques can help: focus on your breath, use ice cubes or cold water on your wrists, practice the 5-4-3-2-1 grounding method. Professional trauma-informed therapy is highly recommended for healing. Would you like help finding specialized support?"
    },
    eating: {
      keywords: ['eating', 'food', 'weight', 'body', 'appetite', 'binge'],
      response: "Eating concerns often reflect deeper emotional needs. You deserve support and care. Focus on nourishing your body rather than restricting it. If you're struggling with eating patterns, please consider reaching out to a counselor who specializes in eating disorders. Campus health centers often have specialized resources."
    },
    substance: {
      keywords: ['drinking', 'alcohol', 'drugs', 'substance', 'addiction'],
      response: "Substance use often starts as a coping mechanism for stress or other challenges. You're brave for acknowledging this concern. There are confidential resources available, including counseling, support groups, and medical support if needed. Would you like information about campus or community resources for substance use support?"
    },
    crisis: {
      keywords: ['suicide', 'kill myself', 'end it all', 'don\'t want to live', 'hurt myself', 'self harm'],
      response: "I'm very concerned about you and want you to know that you matter. Please reach out for immediate help: National Suicide Prevention Lifeline: 988, Campus Crisis Line: 555-0123, or go to your nearest emergency room. You don't have to face this alone - there are people who want to help you through this difficult time."
    }
  };

  const detectMentalHealthTopic = (message: string): { topic: string; response: string; isCrisis: boolean } => {
    const lowerMessage = message.toLowerCase();
    
    // Check for crisis keywords first
    const crisisMatch = mentalHealthTopics.crisis.keywords.some(keyword => 
      lowerMessage.includes(keyword)
    );
    
    if (crisisMatch) {
      return { 
        topic: 'crisis', 
        response: mentalHealthTopics.crisis.response, 
        isCrisis: true 
      };
    }

    // Check other topics
    for (const [topic, data] of Object.entries(mentalHealthTopics)) {
      if (topic === 'crisis') continue;
      
      const hasKeyword = data.keywords.some(keyword => 
        lowerMessage.includes(keyword)
      );
      
      if (hasKeyword) {
        return { topic, response: data.response, isCrisis: false };
      }
    }

    // Default response
    return {
      topic: 'general',
      response: "Thank you for sharing with me. I'm here to listen and support you. Can you tell me more about what you're experiencing? Remember, seeking help is a sign of strength, and there are many resources available to support your mental health journey.",
      isCrisis: false
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const { response, isCrisis } = detectMentalHealthTopic(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
        isCrisis
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: "I'm feeling anxious", value: "I'm feeling really anxious about my upcoming exams" },
    { label: "Can't sleep", value: "I've been having trouble sleeping lately" },
    { label: "Feeling overwhelmed", value: "I'm feeling overwhelmed with everything right now" },
    { label: "Need stress tips", value: "Can you give me some stress management techniques?" }
  ];

  return (
    <section id="chat" className="py-16 px-6 bg-gradient-healing">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Mental Health Support
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Talk to Your AI Companion
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI is trained in mental health support and crisis detection. Share what you're experiencing 
            in a safe, confidential environment.
          </p>
        </div>

        <Card className="wellness-card h-[600px] flex flex-col">
          <CardHeader className="border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-healing rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Mental Health AI Companion</CardTitle>
                <div className="flex items-center text-sm text-success">
                  <div className="w-2 h-2 bg-success rounded-full mr-2" />
                  Available 24/7 • Confidential
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-6 overflow-hidden flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'chat-message-user' : 'chat-message-ai'}`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'ai' && (
                        <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        {message.isCrisis && (
                          <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                            <div className="flex items-center text-destructive text-sm font-medium mb-2">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Crisis Support Resources
                            </div>
                            <div className="space-y-2">
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                className="w-full"
                                onClick={() => window.open('tel:988')}
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call Crisis Line: 988
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                onClick={() => window.open('tel:555-0123')}
                              >
                                Campus Crisis: 555-0123
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      {message.type === 'user' && (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
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
                      <Bot className="w-4 h-4" />
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

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInputValue(action.value)}
                >
                  {action.label}
                </Button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what you're feeling or experiencing..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-healing hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <div className="mt-6 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-4 h-4 mr-2" />
            <span className="font-medium">Privacy & Safety</span>
          </div>
          <p>
            This AI provides support and information but is not a replacement for professional mental health care. 
            In emergencies, please call 988 or visit your nearest emergency room.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;