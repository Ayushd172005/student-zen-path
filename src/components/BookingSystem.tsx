import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Clock, 
  User, 
  Users,
  GraduationCap, 
  Heart, 
  Shield,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Video
} from 'lucide-react';

interface Counselor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  availability: string[];
  image: string;
  experience: string;
  languages: string[];
}

interface BookingForm {
  counselorId: string;
  sessionType: string;
  date: string;
  time: string;
  studentName: string;
  studentEmail: string;
  studentId: string;
  concerns: string;
  previousTherapy: string;
  preferredContact: string;
}

const BookingSystem = () => {
  const { toast } = useToast();
  const [selectedCounselor, setSelectedCounselor] = useState<string>('');
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    counselorId: '',
    sessionType: '',
    date: '',
    time: '',
    studentName: '',
    studentEmail: '',
    studentId: '',
    concerns: '',
    previousTherapy: '',
    preferredContact: ''
  });
  const [isBooking, setIsBooking] = useState(false);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      title: 'Licensed Clinical Psychologist',
      specialties: ['Anxiety', 'Depression', 'Academic Stress', 'PTSD'],
      rating: 4.9,
      availability: ['Monday', 'Wednesday', 'Friday'],
      image: '/api/placeholder/64/64',
      experience: '8 years',
      languages: ['English', 'Mandarin']
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      title: 'Licensed Professional Counselor',
      specialties: ['Relationship Issues', 'Substance Abuse', 'Grief', 'Trauma'],
      rating: 4.8,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      image: '/api/placeholder/64/64',
      experience: '12 years',
      languages: ['English', 'Spanish']
    },
    {
      id: '3',
      name: 'Dr. Emily Johnson',
      title: 'Licensed Marriage & Family Therapist',
      specialties: ['Family Issues', 'Eating Disorders', 'Self-Esteem', 'Social Anxiety'],
      rating: 4.9,
      availability: ['Monday', 'Tuesday', 'Thursday'],
      image: '/api/placeholder/64/64',
      experience: '10 years',
      languages: ['English']
    }
  ];

  const sessionTypes = [
    {
      id: 'individual',
      name: 'Individual Counseling',
      duration: '50 minutes',
      description: 'One-on-one session with a licensed counselor',
      icon: User
    },
    {
      id: 'group',
      name: 'Group Therapy',
      duration: '90 minutes',
      description: 'Small group session focused on specific topics',
      icon: Users
    },
    {
      id: 'crisis',
      name: 'Crisis Intervention',
      duration: '30-60 minutes',
      description: 'Immediate support for urgent mental health concerns',
      icon: Shield
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = async () => {
    if (!bookingForm.counselorId || !bookingForm.sessionType || !bookingForm.date || 
        !bookingForm.time || !bookingForm.studentName || !bookingForm.studentEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      const selectedCounselor = counselors.find(c => c.id === bookingForm.counselorId);
      const confirmationNumber = `MH${Date.now().toString().slice(-6)}`;
      
      toast({
        title: "Booking Confirmed!",
        description: `Your session with ${selectedCounselor?.name} has been booked for ${bookingForm.date} at ${bookingForm.time}. Confirmation #: ${confirmationNumber}`,
      });

      // Show detailed confirmation
      setTimeout(() => {
        alert(`
BOOKING CONFIRMATION RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Session Details:
• Counselor: ${selectedCounselor?.name}
• Type: ${sessionTypes.find(s => s.id === bookingForm.sessionType)?.name}
• Date: ${bookingForm.date}
• Time: ${bookingForm.time}
• Duration: ${sessionTypes.find(s => s.id === bookingForm.sessionType)?.duration}

👤 Student Information:
• Name: ${bookingForm.studentName}
• Email: ${bookingForm.studentEmail}
• Student ID: ${bookingForm.studentId}

📞 Contact Information:
• Campus Counseling: (555) 123-4567
• Emergency Crisis Line: 988
• Confirmation Number: ${confirmationNumber}

⚠️ Important Notes:
• Please arrive 10 minutes early
• Bring your student ID
• Sessions are confidential and HIPAA compliant
• Cancellations require 24-hour notice

If you need to reschedule or have questions, please contact our office at counseling@university.edu
        `);
      }, 1000);

      setIsBooking(false);
      
      // Reset form
      setBookingForm({
        counselorId: '',
        sessionType: '',
        date: '',
        time: '',
        studentName: '',
        studentEmail: '',
        studentId: '',
        concerns: '',
        previousTherapy: '',
        preferredContact: ''
      });
      setSelectedCounselor('');
    }, 2000);
  };

  return (
    <section id="booking" className="py-16 px-6 bg-gradient-wellness">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Professional Counseling Services
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Book Your Counseling Session
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with licensed mental health professionals who understand student life. 
            All sessions are confidential and covered by student health services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Counselor Selection */}
          <div className="space-y-6">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Choose Your Counselor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {counselors.map((counselor) => (
                  <div
                    key={counselor.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedCounselor === counselor.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => {
                      setSelectedCounselor(counselor.id);
                      handleInputChange('counselorId', counselor.id);
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={counselor.image} alt={counselor.name} />
                        <AvatarFallback>{counselor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{counselor.name}</h3>
                          <div className="flex items-center text-warning">
                            <Star className="w-4 h-4 fill-current mr-1" />
                            <span className="text-sm font-medium">{counselor.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-3">{counselor.title}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {counselor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Experience:</span> {counselor.experience}
                          </div>
                          <div>
                            <span className="font-medium">Languages:</span> {counselor.languages.join(', ')}
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <span className="text-xs font-medium text-muted-foreground">Available: </span>
                          <span className="text-xs text-success">{counselor.availability.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Session Types */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Session Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sessionTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      bookingForm.sessionType === type.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleInputChange('sessionType', type.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <type.icon className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{type.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Booking Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select value={bookingForm.time} onValueChange={(value) => handleInputChange('time', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Student Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="studentName">Full Name *</Label>
                    <Input
                      id="studentName"
                      value={bookingForm.studentName}
                      onChange={(e) => handleInputChange('studentName', e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="studentEmail">Email Address *</Label>
                      <Input
                        id="studentEmail"
                        type="email"
                        value={bookingForm.studentEmail}
                        onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                        placeholder="your.email@university.edu"
                      />
                    </div>
                    <div>
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        value={bookingForm.studentId}
                        onChange={(e) => handleInputChange('studentId', e.target.value)}
                        placeholder="12345678"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="concerns">What would you like to discuss? (Optional)</Label>
                    <Textarea
                      id="concerns"
                      value={bookingForm.concerns}
                      onChange={(e) => handleInputChange('concerns', e.target.value)}
                      placeholder="Briefly describe your concerns or what you'd like to work on..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="previousTherapy">Previous Therapy Experience</Label>
                    <Select value={bookingForm.previousTherapy} onValueChange={(value) => handleInputChange('previousTherapy', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">First time in therapy</SelectItem>
                        <SelectItem value="some">Some previous experience</SelectItem>
                        <SelectItem value="extensive">Extensive therapy experience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                    <Select value={bookingForm.preferredContact} onValueChange={(value) => handleInputChange('preferredContact', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How should we contact you?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="text">Text Message</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="w-full bg-gradient-hero hover:opacity-90 shadow-warm"
                >
                  {isBooking ? (
                    <>
                      <div className="loading-dots mr-2">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      Booking Session...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card className="wellness-card">
              <CardHeader>
                <CardTitle>Quick Contact Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Campus Counseling Center</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('tel:555-123-4567')}
                  >
                    (555) 123-4567
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Video className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Virtual Session Available</span>
                  </div>
                  <Badge variant="secondary">Remote</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Student Health Center, 2nd Floor</span>
                  </div>
                  <Badge variant="outline">Walk-ins Welcome</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;