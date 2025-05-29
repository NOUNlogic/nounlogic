'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Search, Bell, User, LogOut, ChevronDown, Sun, Moon, MessageSquare } from 'lucide-react';
import { account } from '@/lib/appwrite';
import { useTheme } from '@/lib/theme';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isDark, setMode } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
    window.location.reload();
  };

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <header
      className={`h-16 px-4 md:px-6 flex items-center justify-between 
        ${isDark 
          ? 'bg-slate-900 border-b border-slate-700 header-shadow' 
          : 'bg-white border-b border-slate-200 header-shadow'}
        fixed top-0 left-0 right-0 z-40 transition-all duration-300`}
    >
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-secondary/80 transition-colors mr-3 md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            NounLogic LMS
          </h1>
          <p className="text-sm text-muted-foreground">Web3 Learning Platform</p>
        </div>
        
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mr-2 shadow-md">
            <span className="text-sm font-bold text-white">NL</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            NounLogic
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Search - Hidden on mobile */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          />
        </div>
        
        {/* Mobile Search Icon */}
        <button 
          className="sm:hidden p-2 rounded-lg hover:bg-secondary/80 transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
        
        {/* Theme Toggle - Simplified */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all duration-200 hover:bg-secondary flex items-center justify-center theme-toggle-btn ${isDark ? 'text-yellow-200 hover:text-yellow-300' : 'text-purple-700 hover:text-purple-800'}`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun size={20} className="transition-transform duration-300" /> : <Moon size={20} className="transition-transform duration-300" />}
        </button>
        
        {/* Notifications */}
        <button 
          className="relative p-2 rounded-lg hover:bg-secondary/80 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
          </span>
        </button>
        
        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/80 transition-colors"
            aria-label="User menu"
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
          >
            {user ? (
              <img src={user.prefs?.avatar || user.avatar || '/avatar.svg'} alt="avatar" className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
            )}
            <span className="hidden md:block text-sm font-medium">
              {user ? user.name || user.email : 'Account'}
            </span>
            <ChevronDown size={16} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-border z-50">
              {loading ? (
                <div className="p-4 text-center text-muted-foreground">Loading...</div>
              ) : user ? (
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
                    <p className="text-sm font-medium">{user.name || user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <a href="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors">
                    <User size={16} className="mr-2" />
                    Profile
                  </a>
                  <a 
                    href="https://whatsapp.com/channel/XXXXXXXXXXXX" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center px-4 py-2 text-sm whatsapp-btn hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Join WhatsApp Group
                  </a>
                  <div className="border-t border-border mt-2 pt-2">
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <a href="/login" className="block px-4 py-2 text-foreground hover:bg-primary/10 hover:text-primary transition-colors">Sign in</a>
                  <a href="/register" className="block px-4 py-2 text-foreground hover:bg-primary/10 hover:text-primary transition-colors">Register</a>
                  <a 
                    href="https://whatsapp.com/channel/XXXXXXXXXXXX" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center px-4 py-2 text-sm border-t border-border whatsapp-btn hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Join WhatsApp Group
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;