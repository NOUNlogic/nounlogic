'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Mail, User, Lock, Building, UserCheck, Wallet, CheckCircle, Eye, EyeOff, Sparkles, Crown, Shield, Home, ArrowRight, ArrowLeft, Star, Zap, Rocket, Gem } from 'lucide-react';
import { useAuth } from '@/app/providers';
import { Button, Input } from '@/components/ui';
import { connectWallet, isWalletAvailable } from '@/lib/web3/wallet';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/CardComponents';

const RegisterClient = () => {
  // Wallet integration state
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);

  // ...rest of state
  const [formAnimation, setFormAnimation] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registerMethod, setRegisterMethod] = useState<'email' | 'wallet'>('email');
  const [formStep, setFormStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const [registrationProgress, setRegistrationProgress] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as any,
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

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as any
      }
    }
  };

  const sparkleVariants = {
    sparkle: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as any
      }
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

  // Password strength calculator
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
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
        setFormAnimation(false);
      }, 300);
    }
  };
  
  const handlePrevStep = () => {
    setFormAnimation(true);
    setTimeout(() => {
      setFormStep(1);
      setFormAnimation(false);
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
      setShowSuccessAnimation(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      setErrors({
        form: error?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-orange-500';
    if (passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };
  
  const renderFormStep = () => {
    if (formStep === 1) {
      return (
        <motion.div 
          initial={{ opacity: 0, x: formAnimation ? 50 : 0 }}
          animate={{ opacity: formAnimation ? 0 : 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="relative">
            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={isLoading}
              leftIcon={<User size={18} className="text-primary/60" />}
              variant="floating"
              className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
          
          <div className="relative">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isLoading}
              leftIcon={<Mail size={18} className="text-primary/60" />}
              variant="floating"
              className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
          
          {registerMethod === 'email' && (
            <>
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  disabled={isLoading}
                  leftIcon={<Lock size={18} className="text-primary/60" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-primary/60 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  variant="floating"
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-primary/50 focus:ring-primary/20"
                />
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Password Strength</span>
                      <span className={`font-medium ${passwordStrength >= 75 ? 'text-green-400' : passwordStrength >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {getPasswordStrengthLabel()}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  disabled={isLoading}
                  leftIcon={<Shield size={18} className="text-primary/60" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-primary/60 hover:text-primary transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  variant="floating"
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
            </>
          )}
          
          <Button
            type="button"
            className="w-full mt-8 h-12 bg-gradient-to-r from-primary via-purple-600 to-blue-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-blue-600/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group"
            disabled={isLoading}
            onClick={handleNextStep}
            rightIcon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          >
            Continue to Step 2
          </Button>
        </motion.div>
      );
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0, x: formAnimation ? -50 : 0 }}
        animate={{ opacity: formAnimation ? 0 : 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
            <Building size={16} className="text-primary" />
            Institution
          </label>
          <select
            name="institution"
            className="w-full h-12 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            value={formData.institution}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="" className="bg-slate-800 text-white">Select an institution</option>
            <option value="Blockchain Academy" className="bg-slate-800 text-white">🏛️ Blockchain Academy</option>
            <option value="Tech University" className="bg-slate-800 text-white">🎓 Tech University</option>
            <option value="AI Institute" className="bg-slate-800 text-white">🤖 AI Institute</option>
            <option value="Code Academy" className="bg-slate-800 text-white">💻 Code Academy</option>
            <option value="Crypto Institute" className="bg-slate-800 text-white">₿ Crypto Institute</option>
            <option value="Global Tech College" className="bg-slate-800 text-white">🌐 Global Tech College</option>
          </select>
          {errors.institution && (
            <p className="text-sm text-red-400 flex items-center gap-1 mt-2">
              <AlertCircle size={14} />
              {errors.institution}
            </p>
          )}
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
            <UserCheck size={16} className="text-primary" />
            Role
          </label>
          <select
            name="role"
            className="w-full h-12 rounded-lg bg-white/5 backdrop-blur-sm border border-white/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
            value={formData.role}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="student" className="bg-slate-800 text-white">👨‍🎓 Student</option>
            <option value="instructor" className="bg-slate-800 text-white">👨‍🏫 Instructor</option>
            <option value="institution" className="bg-slate-800 text-white">🏢 Institution Admin</option>
          </select>
        </div>
        
        <div className="relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <div className="flex items-start space-x-3">
            <div className="flex items-center h-5 pt-1">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="h-4 w-4 rounded border-white/30 bg-white/10 text-primary focus:ring-primary focus:ring-offset-0 transition-colors"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="text-sm">
              <label htmlFor="agreeToTerms" className="font-medium text-white/90 cursor-pointer">
                I agree to the <a href="#" className="text-primary hover:text-primary/80 underline">Terms of Service</a> and <a href="#" className="text-primary hover:text-primary/80 underline">Privacy Policy</a>
              </label>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-400 flex items-center gap-1 mt-2">
                  <AlertCircle size={14} />
                  {errors.agreeToTerms}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-12 border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm"
            disabled={isLoading}
            onClick={handlePrevStep}
            leftIcon={<ArrowLeft size={18} />}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 group"
            disabled={isLoading}
            rightIcon={!isLoading && <Rocket size={18} className="group-hover:translate-x-1 transition-transform" />}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-4 overflow-hidden relative">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        {/* Floating gradient orbs */}
        <motion.div 
          variants={floatingVariants}
          animate="floating"
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/30 to-blue-600/30 rounded-full filter blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="floating"
          style={{ animationDelay: '2s' }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full filter blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="floating"
          style={{ animationDelay: '4s' }}
          className="absolute bottom-20 right-40 w-96 h-96 bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full filter blur-3xl"
        />
        
        {/* Animated sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              variants={sparkleVariants}
              animate="sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
              className="absolute w-2 h-2"
            >
              <Sparkles className="w-full h-full text-yellow-400/60" />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-8 text-center max-w-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to NounLogic!</h3>
              <p className="text-emerald-100">Your account has been created successfully. Redirecting to your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md z-10"
      >
        {/* Enhanced Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div 
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-blue-600 flex items-center justify-center shadow-2xl shadow-primary/50">
                <span className="text-3xl font-bold text-white">NL</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-sm mb-3"
          >
            Join NounLogic
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-blue-100/80 text-lg font-medium"
          >
            The Future of Learning Management
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mt-2 text-primary/80"
          >
            <Gem size={16} />
            <span className="text-sm">Premium Experience Awaits</span>
            <Gem size={16} />
          </motion.div>
        </motion.div>
        
        {/* Enhanced Card */}
        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl shadow-black/20 overflow-hidden relative">
            {/* Card background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 opacity-50"></div>
            
            <CardHeader className="relative z-10 pb-4">
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent font-bold">
                Create Account
              </CardTitle>
              <CardDescription className="text-center text-blue-100/80 text-base">
                {formStep === 1 ? 'Enter your personal information' : 'Complete your profile setup'}
              </CardDescription>
              
              {/* Enhanced Progress indicator */}
              <div className="w-full flex items-center justify-center mt-6">
                <div className="w-3/4 flex items-center relative">
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
                      formStep >= 1 
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30' 
                        : 'bg-white/10 text-white/50 border border-white/20'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {formStep > 1 ? <CheckCircle size={20} /> : <User size={20} />}
                  </motion.div>
                  
                  <motion.div 
                    className="flex-1 h-1 mx-4 rounded-full bg-white/10 relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: formStep >= 2 ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
                      formStep >= 2 
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30' 
                        : 'bg-white/10 text-white/50 border border-white/20'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Building size={20} />
                  </motion.div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10 px-8">
              {/* Registration method selector for step 1 */}
              {formStep === 1 && (
                <motion.div 
                  variants={itemVariants}
                  className="flex gap-3 mb-8 rounded-xl p-1 bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <motion.button
                    type="button"
                    onClick={() => setRegisterMethod('email')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      registerMethod === 'email'
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25'
                        : 'bg-transparent hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <Mail size={18} />
                    Email
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setRegisterMethod('wallet')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      registerMethod === 'wallet'
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25'
                        : 'bg-transparent hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <Wallet size={18} />
                    Web3 Wallet
                  </motion.button>
                </motion.div>
              )}
              
              {/* Error message */}
              <AnimatePresence>
                {errors.form && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 mb-6 text-sm flex items-start gap-3"
                  >
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <span>{errors.form}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form onSubmit={handleSubmit}>
                {registerMethod === 'email' ? (
                  renderFormStep()
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-xl text-center border border-white/20 hover:border-white/30 transition-all duration-300">
                      <motion.div 
                        className="text-6xl mb-6"
                        animate={{ 
                          rotate: [0, 10, 0, -10, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut" as any
                        }}
                      >
                        🦊
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-3">Connect Your Wallet</h3>
                      <p className="text-white/70 text-sm mb-6 leading-relaxed">
                        Connect your MetaMask or other Web3 wallet to register using your blockchain identity. Fast, secure, and decentralized.
                      </p>
                      
                      {!walletAddress ? (
  <Button
    type="button"
    className="w-full h-12 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
    disabled={walletLoading}
    onClick={async () => {
      setWalletLoading(true);
      setWalletError(null);
      const result = await connectWallet();
      setWalletLoading(false);
      if ('address' in result) {
        setWalletAddress(result.address);
        setFormData(prev => ({
          ...prev,
          email: `${result.address}@web3.user`,
        }));
        setRegisterMethod('email'); // Switch to email form after connect
      } else {
        setWalletError(result.error);
      }
    }}
  >
    {walletLoading ? 'Connecting...' : 'Connect Wallet'}
  </Button>
) : (
  <div className="flex flex-col items-center gap-2">
    <div className="text-green-400 font-mono text-sm break-all">Connected: {walletAddress}</div>
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        setWalletAddress(null);
        setFormData(prev => ({ ...prev, email: '' }));
      }}
    >
      Disconnect
    </Button>
  </div>
)}
{walletError && (
  <div className="text-red-400 text-sm mt-2">{walletError}</div>
)}
                    </div>
                    
                    <p className="text-sm text-white/60 text-center">
                      After connecting your wallet, you'll provide additional information to complete registration.
                    </p>
                  </motion.div>
                )}
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col relative z-10 pt-4">
              <div className="relative w-full my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-white/60">
                    Already have an account?
                  </span>
                </div>
              </div>
              
              <Link href="/login" className="w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/30"
                >
                  Sign In Instead
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Enhanced Footer */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center text-sm text-white/50"
        >
          <p>© {new Date().getFullYear()} NounLogic. Powering the future of education.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterClient;