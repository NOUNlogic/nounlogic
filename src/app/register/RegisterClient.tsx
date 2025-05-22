'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/CardComponents';

const RegisterClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registerMethod, setRegisterMethod] = useState<'email' | 'wallet'>('email');
  
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
    
    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">
            Join NounLogic Learning Management System
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Choose your preferred registration method
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setRegisterMethod('email')}
                className={`flex-1 py-2 rounded-md font-medium ${
                  registerMethod === 'email'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setRegisterMethod('wallet')}
                className={`flex-1 py-2 rounded-md font-medium ${
                  registerMethod === 'wallet'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                Web3 Wallet
              </button>
            </div>
            
            {errors.form && (
              <div className="bg-danger/10 border border-danger/30 text-danger rounded-md p-3 mb-4 text-sm">
                {errors.form}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {registerMethod === 'email' ? (
                <div className="space-y-4">
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
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Institution
                    </label>
                    <select
                      name="institution"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                      <p className="text-sm text-danger">{errors.institution}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Role
                    </label>
                    <select
                      name="role"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={isLoading}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="institution">Institution Admin</option>
                    </select>
                  </div>
                  
                  <div className="flex items-start mt-4">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
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
                        <p className="text-sm text-danger">{errors.agreeToTerms}</p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-secondary p-6 rounded-md text-center">
                    <div className="text-2xl mb-2">🦊</div>
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
                className="w-full"
              >
                Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterClient;