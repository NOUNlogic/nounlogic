'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { CubeIcon, HomeIcon, BookIcon, PuzzleIcon } from '@/components/ui/Icons';

const NotFoundClient = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [animateCube, setAnimateCube] = useState(false);

  // Suggestions for pages user might be looking for
  const suggestions = [
    { name: 'Dashboard', path: '/dashboard', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'Courses', path: '/courses', icon: <BookIcon className="h-5 w-5" /> },
    { name: 'Web3', path: '/web3', icon: <CubeIcon className="h-5 w-5" /> },
    { name: 'Integrations', path: '/integrations', icon: <PuzzleIcon className="h-5 w-5" /> },
  ];

  // Auto-redirect to dashboard after countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/dashboard');
    }
  }, [countdown, router]);

  // Animate cube on component mount
  useEffect(() => {
    setAnimateCube(true);
  }, []);

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="max-w-3xl w-full text-center">
          <div className="relative mb-8">
            {/* Animated cube icon */}
            <div className={`
              inline-flex items-center justify-center h-32 w-32 
              transition-all duration-1000 ease-in-out
              ${animateCube ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-45 opacity-0'}
            `}>
              {/* The 404 number with animated gradient */}
              <div className="relative">
                <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur animate-pulse"></span>
                <div className="relative flex items-center justify-center h-32 w-32 bg-background rounded-lg shadow-2xl">
                  <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-pulse">
                    404
                  </span>
                </div>
              </div>
            </div>

            {/* Animated particles (small dots) */}
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="absolute h-2 w-2 rounded-full bg-accent/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Page Not Found
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto animate-fadeIn animation-delay-200">
            The page you are looking for doesn't exist or has been moved.
          </p>

          {/* Countdown with animated progress bar */}
          <div className="mb-10 max-w-sm mx-auto animate-fadeIn animation-delay-400">
            <p className="text-muted-foreground mb-2">
              Redirecting to Dashboard in {countdown} seconds...
            </p>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mb-10 animate-fadeIn animation-delay-600">
            <h2 className="text-lg font-medium mb-4">Looking for one of these?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion.path}
                  href={suggestion.path}
                  className="p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
                      {suggestion.icon}
                    </div>
                    <span>{suggestion.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn animation-delay-800">
            <Button onClick={() => router.back()}>
              Go Back
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundClient;