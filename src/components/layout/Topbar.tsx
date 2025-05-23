'use client';

import React, { useEffect, useState } from 'react';
import { Menu, Search, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { account } from '@/lib/appwrite';
import { ThemeToggle } from '@/components/ui';
import { useTheme } from '@/lib/theme';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isDark } = useTheme();

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

  return (
    <header className={`
      h-16 px-4 md:px-6 flex items-center justify-between 
      ${isDark ? 'bg-card/80 backdrop-blur-sm border-b border-border/50' : 'bg-card border-b border-border shadow-sm'}
      transition-colors duration-200 sticky top-0 z-20
    `}>
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-secondary/80 transition-colors mr-3 md:hidden"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-foreground bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back to NounLogic</p>
        </div>
        
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mr-2 shadow-sm">
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
            className="pl-10 pr-4 py-2 w-64 bg-secondary/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
          />
        </div>
        
        {/* Mobile Search Icon */}
        <button className="sm:hidden p-2 rounded-lg hover:bg-secondary/80 transition-colors">
          <Search size={20} />
        </button>
        
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-secondary/80 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
          </span>
        </button>
        
        {/* Right side with theme toggle */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/80 transition-colors"
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
              <div className="absolute right-0 mt-2 w-48 bg-card/90 rounded-lg shadow-lg border border-border/50 backdrop-blur-lg z-50">
                {loading ? (
                  <div className="p-4 text-center text-muted-foreground">Loading...</div>
                ) : user ? (
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-border/50 bg-gradient-to-r from-primary/5 to-purple-500/5">
                      <p className="text-sm font-medium">{user.name || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <a href="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors">
                      <User size={16} className="mr-2" />
                      Profile
                    </a>
                    <div className="border-t border-border/50 mt-2 pt-2">
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
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;