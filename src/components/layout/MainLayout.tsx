'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Layout from './Layout';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'home' },
    { name: 'Courses', path: '/courses', icon: 'book' },
    { name: 'Institutions', path: '/institutions', icon: 'building' },
    { name: 'Users', path: '/users', icon: 'users' },
    { name: 'Analytics', path: '/analytics', icon: 'chart-bar' },
    { name: 'Integrations', path: '/integrations', icon: 'puzzle-piece' },
    { name: 'AI', path: '/ai', icon: 'brain' },
    { name: 'Web3', path: '/web3', icon: 'cube' },
    { name: 'Settings', path: '/settings', icon: 'cog' }
  ];

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <Layout>
      <div className="flex h-full">
        {/* Sidebar */}
        <aside 
          className={`bg-card text-card-foreground border-r border-border transition-all duration-300 ${
            sidebarExpanded ? 'w-64' : 'w-20'
          }`}
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className={`${sidebarExpanded ? 'block' : 'hidden'}`}>
              <h1 className="text-xl font-bold">NounLogic</h1>
            </div>
            <button 
              onClick={toggleSidebar} 
              className="p-2 rounded-md hover:bg-secondary"
            >
              {sidebarExpanded ? '←' : '→'}
            </button>
          </div>
          <nav className="mt-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.path} className="mb-1">
                  <Link 
                    href={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      pathname === item.path 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <span className="mr-3">{/* Icon would go here */}</span>
                    {sidebarExpanded && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center">
              <div className="relative w-64">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full px-4 py-2 rounded-md bg-secondary text-secondary-foreground"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {/* Search icon would go here */}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md hover:bg-secondary">
                {/* Notification icon */}
              </button>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {/* Profile avatar */}
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default MainLayout;