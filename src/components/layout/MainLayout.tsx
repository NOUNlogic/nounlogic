'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileBottomBar from './MobileBottomBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Only show sidebar expanded by default on desktop
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Check if we're on mobile on initial load and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile, auto-expand on desktop
      if (!mobile && !sidebarOpen) {
        setSidebarOpen(true);
      } else if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [sidebarOpen]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Topbar toggleSidebar={toggleSidebar} />
      
      {/* Single Sidebar Component - Only visible on desktop */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-40 transform transition-all duration-300 ease-in-out 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isMobile ? 'hidden' : 'block'}`}
      >
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      <main 
        className={`pt-16 pb-20 md:pb-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 text-slate-900 dark:text-slate-200
          ${sidebarOpen && !isMobile ? 'md:ml-64' : 'ml-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      <MobileBottomBar />
    </div>
  );
};

export default MainLayout;