import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  MapPin, 
  Award, 
  Phone, 
  Mail,
  Clock,
  Users,
  CheckCircle,
  Heart,
  Brain,
  User,
  Shield,
  Globe,
  Video,
  MessageCircle,
  ChevronRight,
  BookOpen,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Professional {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  qualification: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  languages: string[];
  location: string;
  availability: string;
  sessionTypes: ('video' | 'audio' | 'chat' | 'in-person')[];
  sessionRate: number;
  profileImage: string;
  verified: boolean;
  bio: string;
  approachToTherapy: string;
  availableSlots: string[];
  nextAvailable: string;
  acceptsInsurance: boolean;
  emergencyAvailable: boolean;
}

const ProfessionalDatabase: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  
  const { toast } = useToast();

  const specializations = [
    'Clinical Psychology', 'Counseling Psychology', 'Psychiatry', 'Social Work',
    'Educational Psychology', 'School Counseling', 'Marriage & Family Therapy',
    'Addiction Counseling', 'Child Psychology', 'Geriatric Mental Health',
    'Trauma Therapy', 'Cognitive Behavioral Therapy', 'Anxiety Disorders',
    'Depression Treatment', 'PTSD Therapy', 'Eating Disorders'
  ];

  const languages = [
    'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati',
    'Kannada', 'Odia', 'Punjabi', 'Assamese', 'Malayalam', 'Urdu'
  ];

  // Generate mock professional data
  useEffect(() => {
    const generateProfessionals = (): Professional[] => {
      const names = [
        'Dr. Priya Sharma', 'Dr. Rajesh Kumar', 'Dr. Anita Patel', 'Dr. Suresh Menon',
        'Dr. Kavitha Reddy', 'Dr. Amit Singh', 'Dr. Neha Agarwal', 'Dr. Vikram Joshi',
        'Dr. Sunita Gupta', 'Dr. Rahul Verma', 'Dr. Deepika Nair', 'Dr. Arjun Rao',
        'Dr. Meera Iyer', 'Dr. Sanjay Das', 'Dr. Pooja Bansal', 'Dr. Krishna Murthy',
        'Dr. Ritu Chopra', 'Dr. Manoj Tiwari', 'Dr. Sneha Jain', 'Dr. Arun Pillai',
        'Dr. Shilpa Bhatt', 'Dr. Naveen Kumar', 'Dr. Preeti Saxena', 'Dr. Gopal Krishnan',
        'Dr. Nisha Pandey', 'Dr. Ravi Chandra', 'Dr. Swati Malhotra', 'Dr. Vinod Agrawal',
        'Dr. Seema Roy', 'Dr. Kiran Desai', 'Dr. Harsh Vardhan', 'Dr. Lalita Sinha',
        'Dr. Ashok Mehta', 'Dr. Divya Bhardwaj', 'Dr. Ramesh Khurana', 'Dr. Anjali Sood',
        'Dr. Prakash Yadav', 'Dr. Vaishali Joshi', 'Dr. Sunil Kapoor', 'Dr. Madhuri Kelkar',
        'Dr. Ajay Mishra', 'Dr. Rina Shah', 'Dr. Hemant Sharma', 'Dr. Priyanka Gupta',
        'Dr. Saurabh Jha', 'Dr. Vandana Singh', 'Dr. Alok Pandey', 'Dr. Sushma Nair',
        'Dr. Girish Patel', 'Dr. Rekha Agarwal', 'Dr. Nitin Verma', 'Dr. Bhavana Rao'
      ];

      const titles = [
        'Clinical Psychologist', 'Licensed Counselor', 'Psychiatrist', 
        'Licensed Clinical Social Worker', 'Marriage & Family Therapist',
        'Licensed Professional Counselor', 'Psychiatric Social Worker'
      ];

      const locations = [
        'Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka', 'Hyderabad, Telangana',
        'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra', 'Ahmedabad, Gujarat',
        'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Kochi, Kerala', 'Bhubaneswar, Odisha',
        'Chandigarh, Punjab', 'Indore, Madhya Pradesh', 'Coimbatore, Tamil Nadu', 'Vadodara, Gujarat'
      ];

      return names.map((name, index) => ({
        id: `prof-${index + 1}`,
        name,
        title: titles[index % titles.length],
        specialization: specializations.slice(index % 3, (index % 3) + 2 + Math.floor(Math.random() * 2)),
        qualification: ['PhD Psychology', 'MD Psychiatry', 'MSW', 'M.Phil Psychology'][index % 4],
        experience: 3 + (index % 15),
        rating: 3.5 + Math.random() * 1.5,
        reviewsCount: 20 + Math.floor(Math.random() * 180),
        languages: languages.slice(0, 2 + Math.floor(Math.random() * 3)),
        location: locations[index % locations.length],
        availability: ['Available Today', 'Available Tomorrow', 'Available This Week'][index % 3],
        sessionTypes: ['video', 'audio', 'chat', 'in-person'].slice(0, 2 + Math.floor(Math.random() * 3)) as ('video' | 'audio' | 'chat' | 'in-person')[],
        sessionRate: 500 + Math.floor(Math.random() * 2000),
        profileImage: `https://images.unsplash.com/photo-${1500000000000 + index}?w=150&h=150&fit=crop&crop=face`,
        verified: Math.random() > 0.1,
        bio: `Experienced ${titles[index % titles.length].toLowerCase()} specializing in ${specializations[index % specializations.length].toLowerCase()} with ${3 + (index % 15)} years of clinical practice. Passionate about helping individuals achieve mental wellness through evidence-based therapeutic approaches.`,
        approachToTherapy: ['Cognitive Behavioral Therapy', 'Humanistic Approach', 'Psychodynamic Therapy', 'Solution-Focused Therapy'][index % 4],
        availableSlots: [
          'Today 2:00 PM', 'Today 4:00 PM', 'Tomorrow 10:00 AM', 
          'Tomorrow 3:00 PM', 'Day After 11:00 AM'
        ].slice(0, 2 + Math.floor(Math.random() * 3)),
        nextAvailable: ['Today 2:00 PM', 'Tomorrow 10:00 AM', 'Day After 11:00 AM'][index % 3],
        acceptsInsurance: Math.random() > 0.3,
        emergencyAvailable: Math.random() > 0.7
      }));
    };

    const mockProfessionals = generateProfessionals();
    setProfessionals(mockProfessionals);
    setFilteredProfessionals(mockProfessionals);
  }, []);

  useEffect(() => {
    let filtered = professionals.filter(prof => {
      const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prof.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSpecialization = selectedSpecialization === 'all' || 
                                   prof.specialization.includes(selectedSpecialization);
      
      const matchesLanguage = selectedLanguage === 'all' ||
                             prof.languages.includes(selectedLanguage);
      
      return matchesSearch && matchesSpecialization && matchesLanguage;
    });

    // Sort professionals
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'experience':
        filtered.sort((a, b) => b.experience - a.experience);
        break;
      case 'availability':
        filtered.sort((a, b) => {
          const availabilityOrder = { 'Available Today': 0, 'Available Tomorrow': 1, 'Available This Week': 2 };
          return availabilityOrder[a.availability] - availabilityOrder[b.availability];
        });
        break;
      case 'rate':
        filtered.sort((a, b) => a.sessionRate - b.sessionRate);
        break;
    }

    setFilteredProfessionals(filtered);
  }, [professionals, searchTerm, selectedSpecialization, selectedLanguage, sortBy]);

  const bookSession = (professional: Professional) => {
    toast({
      title: '📅 Booking Session',
      description: `Redirecting to book a session with ${professional.name}...`,
    });
    
    // Simulate booking process
    setTimeout(() => {
      toast({
        title: '✅ Session Booked!',
        description: `Your session with ${professional.name} has been scheduled. Check your email for confirmation.`,
      });
    }, 2000);
  };

  const sendMessage = (professional: Professional) => {
    toast({
      title: '💬 Message Sent',
      description: `Your message has been sent to ${professional.name}. They will respond within 24 hours.`,
    });
  };

  const renderProfessionalCard = (professional: Professional) => (
    <motion.div
      key={professional.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="hover-lift hover-glow cursor-pointer transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {professional.name.split(' ').map(n => n[0]).join('')}
              </div>
              {professional.verified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
              {professional.emergencyAvailable && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-destructive rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Professional Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {professional.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{professional.title}</p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-warning fill-current" />
                  <span className="text-sm font-medium">{professional.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({professional.reviewsCount})</span>
                </div>
              </div>

              {/* Specializations */}
              <div className="flex flex-wrap gap-1 mb-3">
                {professional.specialization.slice(0, 2).map((spec, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {spec}
                  </Badge>
                ))}
                {professional.specialization.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{professional.specialization.length - 2} more
                  </Badge>
                )}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span>{professional.experience} years exp.</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{professional.location.split(',')[0]}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-success font-medium">{professional.availability}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{professional.languages.slice(0, 2).join(', ')}</span>
                </div>
              </div>

              {/* Session Types */}
              <div className="flex items-center space-x-2 mb-4">
                {professional.sessionTypes.map((type) => {
                  const icons = { video: Video, audio: Phone, chat: MessageCircle, 'in-person': Users };
                  const Icon = icons[type];
                  return (
                    <div key={type} className="flex items-center space-x-1 px-2 py-1 bg-accent rounded-full text-xs">
                      <Icon className="w-3 h-3" />
                      <span className="capitalize">{type.replace('-', ' ')}</span>
                    </div>
                  );
                })}
              </div>

              {/* Pricing and Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold text-primary">₹{professional.sessionRate}</span>
                  <span className="text-sm text-muted-foreground"> /session</span>
                  {professional.acceptsInsurance && (
                    <Badge variant="outline" className="ml-2 text-xs">Insurance</Badge>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(professional)}
                    className="flex items-center space-x-1 hover:bg-primary hover:text-primary-foreground"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Message</span>
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => bookSession(professional)}
                    className="bg-gradient-hero hover:opacity-90 flex items-center space-x-1"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book Now</span>
                  </Button>
                </div>
              </div>

              {/* Next Available */}
              {professional.nextAvailable && (
                <div className="mt-3 text-xs text-muted-foreground">
                  Next available: <span className="font-medium text-success">{professional.nextAvailable}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mental Health Professionals</h1>
        <p className="text-muted-foreground text-lg">
          Connect with verified, licensed mental health professionals across India
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by name, specialization, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-base"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    {specializations.map(spec => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="availability">Available Soon</SelectItem>
                    <SelectItem value="rate">Lowest Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border"
              >
                <div>
                  <label className="text-sm font-medium">Session Type</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="audio">Audio Call</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Availability</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Any time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Available Today</SelectItem>
                      <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Price Range</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Any price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1000">₹0 - ₹1,000</SelectItem>
                      <SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
                      <SelectItem value="2000+">₹2,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Experience</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Any experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">0-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredProfessionals.length} of {professionals.length} professionals
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>All Verified</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Heart className="w-3 h-3" />
            <span>Government Approved</span>
          </Badge>
        </div>
      </div>

      {/* Professional Cards Grid */}
      <div className="grid gap-6">
        <AnimatePresence>
          {filteredProfessionals.map(professional => renderProfessionalCard(professional))}
        </AnimatePresence>
      </div>

      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No professionals found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialization('all');
              setSelectedLanguage('all');
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Emergency Support Banner */}
      <Card className="mt-8 crisis-section border-destructive/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground">
                  If you're in crisis, don't wait. Call our 24/7 emergency support line.
                </p>
              </div>
            </div>
            <Button className="crisis-pulse bg-destructive hover:bg-destructive/90">
              <Phone className="w-4 h-4 mr-2" />
              Call 1800-599-0019
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalDatabase;