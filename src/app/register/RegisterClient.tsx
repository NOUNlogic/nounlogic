'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/CardComponents';
import { AlertCircle, Mail, User, Lock, Building, UserCheck, Wallet, CheckCircle } from 'lucide-react';

const RegisterClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registerMethod, setRegisterMethod] = useState<'email' | 'wallet'>('email');
  const [formStep, setFormStep] = useState(1);
  const [formAnimation, setFormAnimation] = useState(false);
  
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
  
  // For animating form transitions
  useEffect(() => {
    if (formAnimation) {
      const timer = setTimeout(() => {
        setFormAnimation(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [formAnimation]);
  
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Registration successful
      router.push('/login?registered=true');
    } catch (error) {
      setErrors({
        form: 'Registration failed. Please try again.'
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background/80 to-background p-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-5"></div>
      
      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Join NounLogic Learning Management System
          </p>
        </div>
        
        <Card className="shadow-xl border-opacity-30 backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Register</CardTitle>
            <CardDescription className="text-center">
              {formStep === 1 ? 'Start by creating your account' : 'Complete your profile information'}
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="w-full flex items-center justify-center mt-4">
              <div className="w-2/3 flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  1
                </div>
                <div className={`flex-1 h-1 ${formStep >= 2 ? 'bg-primary' : 'bg-secondary'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  2
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {formStep === 1 && (
              <div className="flex gap-2 mb-6 rounded-lg p-1 bg-secondary/50">
                <button
                  type="button"
                  onClick={() => setRegisterMethod('email')}
                  className={`flex-1 py-2.5 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                    registerMethod === 'email'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-transparent hover:bg-secondary/80 text-secondary-foreground'
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
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-transparent hover:bg-secondary/80 text-secondary-foreground'
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