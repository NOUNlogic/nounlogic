'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/CardComponents';
import { useAuth } from '@/app/providers';

const LoginClient = () => {
  const router = useRouter();
  const { login, loginWithWallet, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'wallet'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginMethod === 'email') {
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      
      setIsLoading(true);
      setError('');
      
      try {
        await login(email, password);
        router.push('/dashboard');
      } catch (err) {
        setError('Invalid email or password');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Handle wallet connection
      try {
        setIsLoading(true);
        
        // Mock wallet address for demo
        const mockWalletAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
        await loginWithWallet(mockWalletAddress);
        
        router.push('/dashboard');
      } catch (err) {
        setError('Failed to connect wallet');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">NounLogic LMS</h1>
          <p className="text-muted-foreground mt-2">
            Global Learning Management System
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose your preferred login method
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 rounded-md font-medium ${
                  loginMethod === 'email'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('wallet')}
                className={`flex-1 py-2 rounded-md font-medium ${
                  loginMethod === 'wallet'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                Web3 Wallet
              </button>
            </div>
            
            {error && (
              <div className="bg-danger/10 border border-danger/30 text-danger rounded-md p-3 mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {loginMethod === 'email' ? (
                <>
                  <div className="space-y-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <div className="flex justify-end">
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in with Email'}
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-md text-center">
                    <div className="text-2xl mb-2">🦊</div>
                    <p className="text-muted-foreground text-sm">
                      Connect your wallet to sign in securely using your blockchain identity
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
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
                  Don't have an account?
                </span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push('/register')}
            >
              Create Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginClient;