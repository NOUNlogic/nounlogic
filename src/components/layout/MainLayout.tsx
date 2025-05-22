'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Layout from './Layout';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Check if window width is mobile on initial load
  useEffect(() => {
    setMounted(true);
    const checkMobileView = () => {
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
      } else {
        setSidebarExpanded(true);
      }
    };
    
    // Set initial state
    checkMobileView();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobileView);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  if (!mounted) {
    return <div className="flex h-screen items-center justify-center">
      <div className="spinner"></div>
    </div>;
  }

  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <Sidebar isOpen={sidebarExpanded} toggleSidebar={toggleSidebar} />
        
        <div className={`flex-1 transition-all duration-300 ${
          sidebarExpanded ? 'md:ml-64' : 'md:ml-20'
        }`}>
          <Topbar toggleSidebar={toggleSidebar} />
          
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          
          <footer className="border-t border-border py-4 px-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} NounLogic Learning Management System. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </Layout>
  );
};

export default MainLayout;