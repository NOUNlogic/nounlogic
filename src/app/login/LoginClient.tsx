'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Mail, Lock, ArrowRight, Wallet, Eye, EyeOff, Sparkles, Shield, Crown, Zap, Home } from 'lucide-react';
import { useAuth } from '@/app/providers';
import { connectWallet, isWalletAvailable } from '@/lib/web3/wallet';

const LoginClient = () => {
  // Wallet integration state
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'wallet'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [loginProgress, setLoginProgress] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'email') {
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      
      setIsLoading(true);
      setError('');
      setLoginProgress(0);
      
      // Simulate progress animation
      const progressInterval = setInterval(() => {
        setLoginProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      try {
        await login(email, password);
        setLoginProgress(100);
        setShowSuccessAnimation(true);
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (err: any) {
        clearInterval(progressInterval);
        setLoginProgress(0);
        setError(err?.message || 'Invalid email or password');
      } finally {
        if (!showSuccessAnimation) {
          setIsLoading(false);
        }
      }
    } else {
      setError('Wallet login is not implemented yet.');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 10
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/"
          className="group flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-xl font-medium hover:bg-white/20 transition-all"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </motion.div>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-green-500/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Crown className="h-8 w-8" />
              </motion.div>
              <span className="text-xl font-bold">Welcome back!</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5
          }}
        >
          {/* Logo and Title */}
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-xl text-slate-300">
              Continue your Web3 learning journey
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            {/* Card gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
            
            <div className="relative z-10 p-8">
              {/* Login Method Toggle */}
              <motion.div 
                className="flex gap-2 mb-8 p-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
                variants={itemVariants}
              >
                <motion.button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    loginMethod === 'email'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-transparent hover:bg-white/10 text-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="h-5 w-5" />
                  Email
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setLoginMethod('wallet')}
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    loginMethod === 'wallet'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-transparent hover:bg-white/10 text-slate-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Wallet className="h-5 w-5" />
                  Web3
                </motion.button>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-sm flex items-center gap-3"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {loginMethod === 'email' ? (
                  <motion.div variants={itemVariants} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          disabled={isLoading}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          disabled={isLoading}
                          className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-end">
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Login Progress */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between text-sm text-slate-400">
                          <span>Signing you in...</span>
                          <span>{loginProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: "0%" }}
                            animate={{ width: `${loginProgress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Login Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl overflow-hidden shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Shield className="h-5 w-5" />
                            </motion.div>
                            Signing in...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants} className="space-y-6">
                    {/* Wallet Connection */}
                    <div className="text-center py-8">
                      <motion.div
                        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Wallet className="h-12 w-12 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-3">Connect Your Wallet</h3>
                      <p className="text-slate-400 mb-6">
                        Use your Web3 wallet to securely sign in to your account
                      </p>
                      
{!walletAddress ? (
  <motion.button
    type="button"
    disabled={walletLoading}
    className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold rounded-xl overflow-hidden shadow-2xl disabled:opacity-50"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={async () => {
      setWalletLoading(true);
      setWalletError(null);
      const result = await connectWallet();
      setWalletLoading(false);
      if ('address' in result) {
        setWalletAddress(result.address);
        setError('');
        // Simulate login with wallet address as email
        try {
          setIsLoading(true);
          await login(`${result.address}@web3.user`, '');
          setShowSuccessAnimation(true);
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        } catch (err: any) {
          setError(err?.message || 'Wallet login failed');
        } finally {
          setIsLoading(false);
        }
      } else {
        setWalletError(result.error);
      }
    }}
  >
    <span className="relative flex items-center justify-center gap-2">
      <Zap className="h-5 w-5" />
      {walletLoading ? 'Connecting...' : 'Connect Wallet'}
    </span>
  </motion.button>
) : (
  <div className="flex flex-col items-center gap-2">
    <div className="text-green-400 font-mono text-sm break-all">Connected: {walletAddress}</div>
    <motion.button
      type="button"
      className="w-full py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all"
      onClick={() => {
        setWalletAddress(null);
      }}
    >
      Disconnect
    </motion.button>
  </div>
)}
{walletError && (
  <div className="text-red-400 text-sm mt-2">{walletError}</div>
)}                    </div>
                  </motion.div>
                )}
              </form>

              {/* Divider */}
              <motion.div 
                className="relative my-8"
                variants={itemVariants}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-900/80 px-4 text-slate-400">
                    Don&apos;t have an account?
                  </span>
                </div>
              </motion.div>

              {/* Register Button */}
              <motion.div variants={itemVariants}>
                <Link href="/register">
                  <motion.button
                    type="button"
                    className="w-full py-3 bg-white/5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create New Account
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-8 text-center text-sm text-slate-500"
            variants={itemVariants}
          >
            <p>© {new Date().getFullYear()} NounLogic. Secure • Decentralized • Future-Ready</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginClient;