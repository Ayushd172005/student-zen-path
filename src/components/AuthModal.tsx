import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, User, Shield, Mail, Lock, Phone, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: 'login' | 'signup';
  onAuthSuccess: (user: { name: string; email: string; role: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialType, onAuthSuccess }) => {
  const [authType, setAuthType] = useState(initialType);
  const [userType, setUserType] = useState<'student' | 'counsellor'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'details' | 'apaar' | 'otp'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    apaarId: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (step === 'details') {
      if (authType === 'signup' && !formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (authType === 'signup' && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (authType === 'signup' && !formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (authType === 'signup' && !/^[6-9]\d{9}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid Indian mobile number';
      }
    } else if (step === 'apaar') {
      if (!formData.apaarId.trim()) {
        newErrors.apaarId = 'APAAR ID is required';
      } else if (!/^\d{12}$/.test(formData.apaarId)) {
        newErrors.apaarId = 'APAAR ID must be 12 digits';
      }
    } else if (step === 'otp') {
      if (!formData.otp.trim()) {
        newErrors.otp = 'OTP is required';
      } else if (!/^\d{6}$/.test(formData.otp)) {
        newErrors.otp = 'OTP must be 6 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    if (step === 'details') {
      if (authType === 'signup') {
        setStep('apaar');
      } else {
        setStep('otp');
        // Simulate sending OTP
        toast({
          title: 'OTP Sent',
          description: `Verification code sent to +91-${formData.phone || '9876543210'}`,
        });
      }
    } else if (step === 'apaar') {
      setStep('otp');
      // Simulate sending OTP
      toast({
        title: 'OTP Sent',
        description: `Verification code sent to +91-${formData.phone}`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (step !== 'otp') {
      handleNext();
      return;
    }

    setIsLoading(true);

    // Simulate API call with OTP verification
    setTimeout(() => {
      const user = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        role: userType
      };

      onAuthSuccess(user);
      toast({
        title: authType === 'login' ? 'Welcome back!' : 'Account created!',
        description: `Successfully ${authType === 'login' ? 'logged in' : 'signed up'} with APAAR verification`,
      });
      
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const resendOTP = () => {
    toast({
      title: 'OTP Resent',
      description: `New verification code sent to +91-${formData.phone}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md"
      >
        <Card className="w-full bg-background/95 backdrop-blur-lg shadow-warm border-0">
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-2 top-2"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="flex justify-center mb-4">
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setUserType('student')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    userType === 'student'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Student</span>
                </button>
                <button
                  onClick={() => setUserType('counsellor')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    userType === 'counsellor'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Counsellor</span>
                </button>
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">
              {step === 'details' ? (authType === 'login' ? 'Welcome Back' : 'Create Account') :
               step === 'apaar' ? 'APAAR Verification' : 'OTP Verification'}
            </CardTitle>
            <CardDescription>
              {step === 'details' ? 
                (authType === 'login' 
                  ? `Sign in to your ${userType} account`
                  : `Create your ${userType} account to get started`) :
               step === 'apaar' ? 'Enter your APAAR ID for government verification' :
               'Enter the OTP sent to your mobile number'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 'details' && (
                <>
                  <AnimatePresence mode="wait">
                    {authType === 'signup' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
                            autoComplete="name"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {authType === 'signup' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="phone">Mobile Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                            maxLength={10}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                        autoComplete={authType === 'login' ? 'current-password' : 'new-password'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {authType === 'signup' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`pl-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                            autoComplete="new-password"
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {step === 'apaar' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-4">
                    <CreditCard className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      APAAR (Academic Performance Assessment and Accreditation Repository) ID verification
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apaarId">APAAR ID</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="apaarId"
                        type="text"
                        placeholder="Enter 12-digit APAAR ID"
                        value={formData.apaarId}
                        onChange={(e) => handleInputChange('apaarId', e.target.value)}
                        className={`pl-10 ${errors.apaarId ? 'border-destructive' : ''}`}
                        maxLength={12}
                      />
                    </div>
                    {errors.apaarId && (
                      <p className="text-sm text-destructive">{errors.apaarId}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-4">
                    <Phone className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Enter the 6-digit OTP sent to +91-{formData.phone || '9876543210'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={(e) => handleInputChange('otp', e.target.value)}
                      className={`text-center text-2xl tracking-widest ${errors.otp ? 'border-destructive' : ''}`}
                      maxLength={6}
                    />
                    {errors.otp && (
                      <p className="text-sm text-destructive">{errors.otp}</p>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={resendOTP}
                      className="text-sm text-primary hover:underline"
                    >
                      Didn't receive OTP? Resend
                    </button>
                  </div>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : step === 'otp' ? 'Verify & Continue' : 'Next'}
              </Button>

              {step === 'details' && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
                    className="text-sm text-primary hover:underline"
                  >
                    {authType === 'login' 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"
                    }
                  </button>
                </div>
              )}

              {step !== 'details' && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep(step === 'otp' ? (authType === 'signup' ? 'apaar' : 'details') : 'details')}
                    className="text-sm text-primary hover:underline"
                  >
                    Back to previous step
                  </button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthModal;