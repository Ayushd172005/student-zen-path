import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  User, 
  Mail, 
  Phone, 
  School, 
  GraduationCap,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  FileText,
  MapPin,
  Calendar,
  Award,
  Building,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthFormData {
  // Personal Information
  fullName: string;
  email: string;
  phoneNumber: string;
  aadhaar: string;
  apaarId: string;
  dateOfBirth: string;
  
  // Educational Information
  institutionName: string;
  institutionType: string;
  course: string;
  yearOfStudy: string;
  rollNumber: string;
  
  // Address Information
  state: string;
  district: string;
  pincode: string;
  
  // Authentication
  password: string;
  confirmPassword: string;
  
  // Verification
  emailOtp: string;
  phoneOtp: string;
  
  // Consent
  termsAccepted: boolean;
  privacyAccepted: boolean;
  dataProcessingAccepted: boolean;
}

interface AdminAuthData {
  professionalName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  specialization: string;
  institutionAffiliation: string;
  yearsOfExperience: string;
  qualifications: string;
  registrationBody: string;
  password: string;
  confirmPassword: string;
  documentUpload: File | null;
  termsAccepted: boolean;
  ethicsAccepted: boolean;
}

interface GovernmentAuthSystemProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: 'student' | 'admin' | 'login';
  onAuthSuccess: (user: { name: string; email: string; role: string; apaarId?: string }) => void;
}

const GovernmentAuthSystem: React.FC<GovernmentAuthSystemProps> = ({
  isOpen,
  onClose,
  initialType,
  onAuthSuccess
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'student-register' | 'admin-register'>(
    initialType === 'login' ? 'login' : initialType === 'student' ? 'student-register' : 'admin-register'
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState({ email: false, phone: false });
  
  const { toast } = useToast();
  
  const [studentFormData, setStudentFormData] = useState<AuthFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    aadhaar: '',
    apaarId: '',
    dateOfBirth: '',
    institutionName: '',
    institutionType: '',
    course: '',
    yearOfStudy: '',
    rollNumber: '',
    state: '',
    district: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    emailOtp: '',
    phoneOtp: '',
    termsAccepted: false,
    privacyAccepted: false,
    dataProcessingAccepted: false
  });
  
  const [adminFormData, setAdminFormData] = useState<AdminAuthData>({
    professionalName: '',
    email: '',
    phoneNumber: '',
    licenseNumber: '',
    specialization: '',
    institutionAffiliation: '',
    yearsOfExperience: '',
    qualifications: '',
    registrationBody: '',
    password: '',
    confirmPassword: '',
    documentUpload: null,
    termsAccepted: false,
    ethicsAccepted: false
  });
  
  const [loginData, setLoginData] = useState({
    identifier: '', // APAAR ID, Email, or Phone
    password: '',
    captcha: '',
    rememberMe: false
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry'
  ];

  const institutionTypes = [
    'Central University', 'State University', 'Private University', 'Deemed University',
    'Institute of National Importance', 'Government College', 'Private College',
    'Community College', 'Polytechnic', 'ITI', 'Other'
  ];

  const specializations = [
    'Clinical Psychology', 'Counseling Psychology', 'Psychiatry', 'Social Work',
    'Educational Psychology', 'School Counseling', 'Marriage & Family Therapy',
    'Addiction Counseling', 'Child Psychology', 'Geriatric Mental Health',
    'Trauma Therapy', 'Cognitive Behavioral Therapy', 'Other'
  ];

  const registrationBodies = [
    'Rehabilitation Council of India (RCI)', 'Medical Council of India (MCI)',
    'National Council for Teacher Education (NCTE)', 'University Grants Commission (UGC)',
    'All India Council for Technical Education (AICTE)', 'State Psychology Board',
    'Indian Association of Clinical Psychologists (IACP)', 'Other'
  ];

  const validateStep = (step: number) => {
    if (authMode === 'student-register') {
      switch (step) {
        case 1:
          return studentFormData.fullName && studentFormData.email && studentFormData.phoneNumber && studentFormData.dateOfBirth;
        case 2:
          return studentFormData.apaarId && studentFormData.institutionName && studentFormData.course;
        case 3:
          return studentFormData.state && studentFormData.district && studentFormData.pincode;
        case 4:
          return studentFormData.password && studentFormData.confirmPassword && studentFormData.password === studentFormData.confirmPassword;
        case 5:
          return studentFormData.emailOtp && studentFormData.phoneOtp;
        case 6:
          return studentFormData.termsAccepted && studentFormData.privacyAccepted && studentFormData.dataProcessingAccepted;
        default:
          return false;
      }
    }
    return true;
  };

  const sendVerificationCode = async (type: 'email' | 'phone') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setVerificationSent(prev => ({ ...prev, [type]: true }));
    toast({
      title: '✅ Verification Code Sent',
      description: `OTP sent to your ${type}. Please check and enter the code.`,
    });
    setIsLoading(false);
  };

  const validateApaarId = async (apaarId: string) => {
    // Simulate APAAR ID validation
    if (apaarId.length === 12) {
      toast({
        title: '✅ APAAR ID Validated',
        description: 'Your Academic Bank of Credits ID has been verified successfully.',
      });
      return true;
    }
    return false;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful authentication
    const mockUser = {
      name: 'Priya Sharma',
      email: loginData.identifier.includes('@') ? loginData.identifier : 'priya.sharma@student.ac.in',
      role: loginData.identifier.toLowerCase().includes('admin') ? 'admin' : 'student',
      apaarId: loginData.identifier.length === 12 ? loginData.identifier : '123456789012'
    };
    
    onAuthSuccess(mockUser);
    setIsLoading(false);
    onClose();
    
    toast({
      title: '🎉 Welcome!',
      description: `Successfully logged in as ${mockUser.name}`,
    });
  };

  const handleStudentRegistration = async () => {
    setIsLoading(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newUser = {
      name: studentFormData.fullName,
      email: studentFormData.email,
      role: 'student',
      apaarId: studentFormData.apaarId
    };
    
    onAuthSuccess(newUser);
    setIsLoading(false);
    onClose();
    
    toast({
      title: '🎉 Registration Successful!',
      description: 'Welcome to Student Zen Path! Your account has been created successfully.',
    });
  };

  const handleAdminRegistration = async () => {
    setIsLoading(true);
    
    // Simulate admin registration and verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: '📋 Registration Submitted',
      description: 'Your application is under review. You will be notified within 3-5 business days.',
    });
    
    setIsLoading(false);
    onClose();
  };

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="identifier">APAAR ID / Email / Phone Number</Label>
          <Input
            id="identifier"
            value={loginData.identifier}
            onChange={(e) => setLoginData(prev => ({ ...prev, identifier: e.target.value }))}
            placeholder="Enter your APAAR ID, email, or phone number"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter your password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">Security Verification</p>
          <div className="bg-background p-3 rounded border-2 border-dashed border-border">
            <p className="text-lg font-mono">CAPTCHA: 7A2B9</p>
          </div>
          <Input
            value={loginData.captcha}
            onChange={(e) => setLoginData(prev => ({ ...prev, captcha: e.target.value }))}
            placeholder="Enter CAPTCHA code"
            className="mt-2"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={loginData.rememberMe}
            onCheckedChange={(checked) => setLoginData(prev => ({ ...prev, rememberMe: !!checked }))}
          />
          <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
        </div>
      </div>
      
      <Button
        onClick={handleLogin}
        disabled={isLoading || !loginData.identifier || !loginData.password || !loginData.captcha}
        className="w-full bg-gradient-hero hover:opacity-90"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            <Shield className="w-4 h-4 mr-2" />
            Secure Login
          </>
        )}
      </Button>
      
      <div className="text-center space-y-2">
        <button className="text-sm text-primary hover:underline">
          Forgot Password?
        </button>
        <div className="text-xs text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={() => setAuthMode('student-register')}
            className="text-primary hover:underline font-medium"
          >
            Register as Student
          </button>
          {' '}or{' '}
          <button
            onClick={() => setAuthMode('admin-register')}
            className="text-primary hover:underline font-medium"
          >
            Register as Professional
          </button>
        </div>
      </div>
    </div>
  );

  const renderStudentRegistrationStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">Please provide your basic details</p>
            </div>
            
            <div>
              <Label htmlFor="fullName">Full Name (as per Aadhaar) *</Label>
              <Input
                id="fullName"
                value={studentFormData.fullName}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={studentFormData.email}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email address"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={studentFormData.phoneNumber}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="+91 XXXXX XXXXX"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                id="dob"
                type="date"
                value={studentFormData.dateOfBirth}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Educational Information</h3>
              <p className="text-sm text-muted-foreground">Academic credentials and institution details</p>
            </div>
            
            <div>
              <Label htmlFor="apaarId">APAAR ID (Academic Bank of Credits) *</Label>
              <Input
                id="apaarId"
                value={studentFormData.apaarId}
                onChange={(e) => {
                  setStudentFormData(prev => ({ ...prev, apaarId: e.target.value }));
                  if (e.target.value.length === 12) {
                    validateApaarId(e.target.value);
                  }
                }}
                placeholder="12-digit APAAR ID"
                maxLength={12}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Don't have APAAR ID? <a href="https://abc.gov.in" className="text-primary hover:underline">Get it here</a>
              </p>
            </div>
            
            <div>
              <Label htmlFor="institution">Institution Name *</Label>
              <Input
                id="institution"
                value={studentFormData.institutionName}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, institutionName: e.target.value }))}
                placeholder="Enter your institution name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="institutionType">Institution Type</Label>
              <Select value={studentFormData.institutionType} onValueChange={(value) => setStudentFormData(prev => ({ ...prev, institutionType: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select institution type" />
                </SelectTrigger>
                <SelectContent>
                  {institutionTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="course">Course/Program *</Label>
              <Input
                id="course"
                value={studentFormData.course}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, course: e.target.value }))}
                placeholder="e.g., B.Tech Computer Science"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year of Study</Label>
                <Select value={studentFormData.yearOfStudy} onValueChange={(value) => setStudentFormData(prev => ({ ...prev, yearOfStudy: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="5">5th Year</SelectItem>
                    <SelectItem value="postgrad">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  value={studentFormData.rollNumber}
                  onChange={(e) => setStudentFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
                  placeholder="Your roll number"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Address Information</h3>
              <p className="text-sm text-muted-foreground">Current residential address</p>
            </div>
            
            <div>
              <Label htmlFor="state">State *</Label>
              <Select value={studentFormData.state} onValueChange={(value) => setStudentFormData(prev => ({ ...prev, state: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="district">District *</Label>
              <Input
                id="district"
                value={studentFormData.district}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, district: e.target.value }))}
                placeholder="Enter your district"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="pincode">PIN Code *</Label>
              <Input
                id="pincode"
                value={studentFormData.pincode}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, pincode: e.target.value }))}
                placeholder="6-digit PIN code"
                maxLength={6}
                className="mt-1"
              />
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Account Security</h3>
              <p className="text-sm text-muted-foreground">Create a strong password for your account</p>
            </div>
            
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={studentFormData.password}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Create a strong password"
                className="mt-1"
              />
              <div className="mt-2 space-y-1 text-xs">
                <div className={`flex items-center space-x-2 ${studentFormData.password.length >= 8 ? 'text-success' : 'text-muted-foreground'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center space-x-2 ${/[A-Z]/.test(studentFormData.password) ? 'text-success' : 'text-muted-foreground'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>One uppercase letter</span>
                </div>
                <div className={`flex items-center space-x-2 ${/[0-9]/.test(studentFormData.password) ? 'text-success' : 'text-muted-foreground'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>One number</span>
                </div>
                <div className={`flex items-center space-x-2 ${/[!@#$%^&*]/.test(studentFormData.password) ? 'text-success' : 'text-muted-foreground'}`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>One special character</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={studentFormData.confirmPassword}
                onChange={(e) => setStudentFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm your password"
                className="mt-1"
              />
              {studentFormData.confirmPassword && (
                <div className={`mt-2 text-xs flex items-center space-x-2 ${
                  studentFormData.password === studentFormData.confirmPassword ? 'text-success' : 'text-destructive'
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>
                    {studentFormData.password === studentFormData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
                <Checkbox
                  id="showPassword"
                  checked={showPassword}
                  onCheckedChange={(checked) => setShowPassword(!!checked)}
                />
              <Label htmlFor="showPassword" className="text-sm">Show passwords</Label>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Verification</h3>
              <p className="text-sm text-muted-foreground">Verify your email and phone number</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Email Verification</Label>
                  <Badge variant={verificationSent.email ? "default" : "secondary"}>
                    {verificationSent.email ? "Sent" : "Not Sent"}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={studentFormData.emailOtp}
                    onChange={(e) => setStudentFormData(prev => ({ ...prev, emailOtp: e.target.value }))}
                    placeholder="Enter email OTP"
                    maxLength={6}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => sendVerificationCode('email')}
                    disabled={isLoading || !studentFormData.email}
                    variant="outline"
                    size="sm"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send OTP"}
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Phone Verification</Label>
                  <Badge variant={verificationSent.phone ? "default" : "secondary"}>
                    {verificationSent.phone ? "Sent" : "Not Sent"}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={studentFormData.phoneOtp}
                    onChange={(e) => setStudentFormData(prev => ({ ...prev, phoneOtp: e.target.value }))}
                    placeholder="Enter SMS OTP"
                    maxLength={6}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => sendVerificationCode('phone')}
                    disabled={isLoading || !studentFormData.phoneNumber}
                    variant="outline"
                    size="sm"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send OTP"}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Verification Required</p>
                  <p className="text-muted-foreground">
                    Both email and phone verification are mandatory as per government guidelines for secure access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Terms & Consent</h3>
              <p className="text-sm text-muted-foreground">Please review and accept the following terms</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={studentFormData.termsAccepted}
                  onCheckedChange={(checked) => setStudentFormData(prev => ({ ...prev, termsAccepted: !!checked }))}
                />
                <div className="text-sm">
                  <Label htmlFor="terms" className="font-medium">Terms and Conditions *</Label>
                  <p className="text-muted-foreground">
                    I accept the <button className="text-primary hover:underline">Terms of Service</button> and 
                    understand my rights and responsibilities as a platform user.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacy"
                  checked={studentFormData.privacyAccepted}
                  onCheckedChange={(checked) => setStudentFormData(prev => ({ ...prev, privacyAccepted: !!checked }))}
                />
                <div className="text-sm">
                  <Label htmlFor="privacy" className="font-medium">Privacy Policy *</Label>
                  <p className="text-muted-foreground">
                    I have read and agree to the <button className="text-primary hover:underline">Privacy Policy</button>, 
                    including how my data will be collected, used, and protected.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="dataProcessing"
                  checked={studentFormData.dataProcessingAccepted}
                  onCheckedChange={(checked) => setStudentFormData(prev => ({ ...prev, dataProcessingAccepted: !!checked }))}
                />
                <div className="text-sm">
                  <Label htmlFor="dataProcessing" className="font-medium">Data Processing Consent *</Label>
                  <p className="text-muted-foreground">
                    I consent to the processing of my personal and educational data for 
                    mental health support services and platform functionality.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-primary">Government Compliance</p>
                  <p className="text-muted-foreground">
                    This platform complies with the Digital Personal Data Protection Act, 2023 
                    and follows all applicable Indian government regulations for student data protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-auto"
        >
          <Card className="shadow-2xl border-0">
            <CardHeader className="govt-header text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-green-600/20" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      {authMode === 'login' ? <User className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {authMode === 'login' ? 'Secure Login' : 
                         authMode === 'student-register' ? 'Student Registration' : 'Professional Registration'}
                      </CardTitle>
                      <p className="text-white/90 text-sm">Government of India Compliant Platform</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                    ×
                  </Button>
                </div>
                
                {authMode === 'student-register' && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Step {currentStep} of 6</span>
                      <span className="text-sm">{Math.round((currentStep / 6) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / 6) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {authMode === 'login' && renderLoginForm()}
              {authMode === 'student-register' && renderStudentRegistrationStep()}
              
              {authMode === 'student-register' && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : setAuthMode('login')}
                  >
                    {currentStep > 1 ? 'Previous' : 'Back to Login'}
                  </Button>
                  
                  <Button
                    onClick={() => {
                      if (currentStep < 6) {
                        if (validateStep(currentStep)) {
                          setCurrentStep(currentStep + 1);
                        } else {
                          toast({
                            title: '⚠️ Incomplete Information',
                            description: 'Please fill all required fields before proceeding.',
                            variant: 'destructive'
                          });
                        }
                      } else {
                        handleStudentRegistration();
                      }
                    }}
                    disabled={!validateStep(currentStep) || isLoading}
                    className="bg-gradient-hero hover:opacity-90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : currentStep < 6 ? (
                      'Next Step'
                    ) : (
                      'Complete Registration'
                    )}
                  </Button>
                </div>
              )}
              
              {authMode === 'login' && (
                <div className="mt-6 text-center text-xs text-muted-foreground">
                  <p className="flex items-center justify-center space-x-2">
                    <Shield className="w-3 h-3" />
                    <span>Protected by 256-bit SSL encryption • Government compliant security</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GovernmentAuthSystem;