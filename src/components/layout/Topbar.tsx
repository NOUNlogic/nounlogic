'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Search, Bell, User, LogOut, ChevronDown, Sun, Moon, MessageSquare, Bot } from 'lucide-react';
import { account } from '@/lib/appwrite';
import { useTheme } from '@/lib/theme';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useAuthUI } from '@/app/providers';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isDark, setMode } = useTheme();
  const { openAuth } = useAuthUI();

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
    
    // Ensure the theme change is properly applied
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
    }
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
        {/* Sidebar toggle button - only shown on desktop */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-secondary/80 transition-colors mr-3 hidden md:block"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            NounLogic
          </h1>
          <p className="text-sm text-muted-foreground">Connect with students worldwide</p>
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
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* AI Quick Compose */}
        <a 
          href="/ai" 
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          aria-label="Open AI Assistant"
        >
          <Bot size={18} /> Ask AI
        </a>

        {/* Sign in button (when logged out) */}
        {!user && !loading && (
          <button 
            onClick={openAuth}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/80 hover:bg-secondary transition-colors"
          >
            Sign in
          </button>
        )}

        {/* Help / Chat FAB on mobile */}
        <a
          href="#" 
          className="sm:hidden p-2 rounded-full bg-primary/10 text-primary"
          onClick={(e) => {
            e.preventDefault();
            // Attempt to open Sensay widget if exposed globally
            // @ts-ignore
            if (typeof window !== 'undefined' && (window as any).SensayChatWidget?.open) {
              // @ts-ignore
              (window as any).SensayChatWidget.open();
            }
          }}
          aria-label="Help"
        >
          <MessageSquare size={20} />
        </a>

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
              <button onClick={openAuth} className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 hover:text-primary transition-colors">Sign in</button>
                  <a 
                    href="https://chat.whatsapp.com/IVyll17nbSv6Y8D8NCscIC" 
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




