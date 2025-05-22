'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Layout from './Layout';
import { 
  HomeIcon, BookIcon, BuildingIcon, UsersIcon, ChartBarIcon, 
  PuzzleIcon, BrainIcon, CubeIcon, CogIcon, SearchIcon, BellIcon, LogoutIcon 
} from '@/components/ui/Icons';
import { useAuth } from '@/app/providers';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'Courses', path: '/courses', icon: <BookIcon className="h-5 w-5" /> },
    { name: 'Institutions', path: '/institutions', icon: <BuildingIcon className="h-5 w-5" /> },
    { name: 'Users', path: '/users', icon: <UsersIcon className="h-5 w-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <ChartBarIcon className="h-5 w-5" /> },
    { name: 'Integrations', path: '/integrations', icon: <PuzzleIcon className="h-5 w-5" /> },
    { name: 'AI', path: '/ai', icon: <BrainIcon className="h-5 w-5" /> },
    { name: 'Web3', path: '/web3', icon: <CubeIcon className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <CogIcon className="h-5 w-5" /> }
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
                <li key={item.path} className="mb-1">                    <Link 
                    href={item.path}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      pathname === item.path 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-secondary'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
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
                  className="w-full px-4 py-2 pl-10 rounded-md bg-secondary text-secondary-foreground"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <SearchIcon className="h-4 w-4 text-muted-foreground" />
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-md hover:bg-secondary relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger"></span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)} 
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden"
                >
                  {user?.profile?.avatar ? (
                    <img src={user.profile.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-medium">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border z-10">
                    <div className="p-4 border-b border-border">
                      <p className="font-medium">{user?.profile?.name || 'User'}</p>
                      <p className="text-sm text-muted-foreground">{user?.email || ''}</p>
                    </div>
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-secondary">
                        Your Profile
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-secondary">
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-border py-1">
                      <button 
                        onClick={() => {
                          logout();
                          window.location.href = '/login';
                        }} 
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-danger hover:bg-secondary"
                      >
                        <LogoutIcon className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
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