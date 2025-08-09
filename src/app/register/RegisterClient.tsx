'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Mail, User, Lock, Building, UserCheck, Wallet, CheckCircle, Eye, EyeOff, Sparkles, Crown, Shield, Home, ArrowRight, ArrowLeft, Star, Zap, Rocket, Gem } from 'lucide-react';
import { useAuth } from '@/app/providers';
import { Button, Input } from '@/components/ui';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/CardComponents';

const RegisterClient = () => {
  const [formAnimation, setFormAnimation] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registerMethod, setRegisterMethod] = useState<'email' | 'wallet'>('email');
  const [formStep, setFormStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { register } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    role: 'student',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationProgress, setRegistrationProgress] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX - innerWidth / 2) / 50,
        y: (clientY - innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formStep === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (registerMethod === 'email') {
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
    } else if (formStep === 2) {
      if (!formData.institution.trim()) {
        newErrors.institution = 'Institution is required';
      }
      
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateForm()) {
      setFormAnimation(true);
      setTimeout(() => {
        setFormStep(2);
      }, 300);
    }
  };
  
  const handlePrevStep = () => {
    setFormAnimation(true);
    setTimeout(() => {
      setFormStep(1);
    }, 300);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep === 1) {
      handleNextStep();
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      router.push('/dashboard');
    } catch (error: any) {
      setErrors({
        form: error?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderFormStep = () => {
    if (formStep === 1) {
      return (
        <div className={`space-y-4 transition-all duration-300 ${formAnimation ? 'opacity-0 transform translate-x-10' : 'opacity-100 transform translate-x-0'}`}>
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            disabled={isLoading}
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={isLoading}
          />
          
          {registerMethod === 'email' && (
            <>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isLoading}
              />
              
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                disabled={isLoading}
              />
            </>
          )}
          
          <Button
            type="button"
            className="w-full mt-2 group"
            disabled={isLoading}
            onClick={handleNextStep}
          >
            Next Step
          </Button>
        </div>
      );
    }
    
    return (
      <div className={`space-y-4 transition-all duration-300 ${formAnimation ? 'opacity-0 transform -translate-x-10' : 'opacity-100 transform translate-x-0'}`}>
        <div className="space-y-2">
          <label className="block text-sm font-medium flex items-center gap-2">
            <Building size={16} />
            Institution
          </label>
          <select
            name="institution"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            value={formData.institution}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Select an institution</option>
            <option value="Blockchain Academy">Blockchain Academy</option>
            <option value="Tech University">Tech University</option>
            <option value="AI Institute">AI Institute</option>
            <option value="Code Academy">Code Academy</option>
            <option value="Crypto Institute">Crypto Institute</option>
            <option value="Global Tech College">Global Tech College</option>
          </select>
          {errors.institution && (
            <p className="text-sm text-danger flex items-center gap-1 mt-1">
              <AlertCircle size={14} />
              {errors.institution}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium flex items-center gap-2">
            <UserCheck size={16} />
            Role
          </label>
          <select
            name="role"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            value={formData.role}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="institution">Institution Admin</option>
          </select>
        </div>
        
        <div className="mt-4 bg-secondary/30 p-4 rounded-lg border border-secondary/20">
          <div className="flex items-start mt-1">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary transition-colors"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="font-medium">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
              {errors.agreeToTerms && (
                <p className="text-sm text-danger flex items-center gap-1 mt-1">
                  <AlertCircle size={14} />
                  {errors.agreeToTerms}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={isLoading}
            onClick={handlePrevStep}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 group"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-5"></div>
      
      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/30 animate-float">
              <span className="text-2xl font-bold text-white">NL</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-sm">
            Create an Account
          </h1>
          <p className="text-blue-100/80 mt-2 text-lg">
            Join NounLogic Learning Management System
          </p>
        </div>
        
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl shadow-black/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 z-0 opacity-50"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl text-center bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Register</CardTitle>
            <CardDescription className="text-center text-blue-100/80">
              {formStep === 1 ? 'Start by creating your account' : 'Complete your profile information'}
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="w-full flex items-center justify-center mt-4">
              <div className="w-2/3 flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formStep >= 1 
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-sm' 
                    : 'bg-secondary/50 text-secondary-foreground'
                }`}>
                  {formStep > 1 ? <CheckCircle size={16} /> : '1'}
                </div>
                <div className={`flex-1 h-1 transition-all duration-300 ${
                  formStep >= 2 
                    ? 'bg-gradient-to-r from-primary to-purple-600' 
                    : 'bg-secondary/50'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  formStep >= 2 
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-sm' 
                    : 'bg-secondary/50 text-secondary-foreground'
                }`}>
                  2
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {formStep === 1 && (
              <div className="flex gap-2 mb-6 rounded-lg p-1 bg-white/5 backdrop-blur-sm border border-white/10">
                <button
                  type="button"
                  onClick={() => setRegisterMethod('email')}
                  className={`flex-1 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                    registerMethod === 'email'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'bg-transparent hover:bg-white/10 text-white'
                  }`}
                >
                  <Mail size={18} />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterMethod('wallet')}
                  className={`flex-1 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                    registerMethod === 'wallet'
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'bg-transparent hover:bg-white/10 text-white'
                  }`}
                >
                  <Wallet size={18} />
                  Web3 Wallet
                </button>
              </div>
            )}
            
            {errors.form && (
              <div className="bg-danger/10 border border-danger/30 text-danger rounded-md p-3 mb-4 text-sm flex items-start gap-2 animate-fadeIn">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {registerMethod === 'email' ? (
                renderFormStep()
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-secondary/40 to-secondary/80 p-6 rounded-xl text-center transform transition-all hover:scale-[1.02] border border-secondary/20">
                    <div className="text-3xl mb-3">🦊</div>
                    <p className="text-muted-foreground text-sm mb-6">
                      Connect your wallet to register using your blockchain identity
                    </p>
                    
                    <Button
                      type="button"
                      className="w-full"
                      disabled={isLoading}
                      onClick={() => {
                        // Simulate wallet connection and then show form
                        setRegisterMethod('email');
                        setFormData(prev => ({
                          ...prev,
                          email: '0x71C7...F9E2@web3.user',
                        }));
                      }}
                    >
                      {isLoading ? 'Connecting...' : 'Connect Wallet'}
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    After connecting your wallet, you'll need to provide some additional information to complete your registration.
                  </p>
                </div>
              )}
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <div className="relative w-full my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">
                  Already have an account?
                </span>
              </div>
            </div>
            
            <Link href="/login" className="w-full">
              <Button
                type="button"
                variant="outline"
                className="w-full hover:bg-secondary/20 transition-colors"
              >
                Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NounLogic. All rights reserved.</p>
        </div>
      </div>
      
      {/* Background decoration elements */}
      <div className="hidden md:block absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
    </div>
  );
};

export default RegisterClient;