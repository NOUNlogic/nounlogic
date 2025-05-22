// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/components/layout/Topbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Menu, Search, Bell, User, ChevronDown, LogOut, Settings,
  Moon, Sun, LayoutGrid, MessageSquare, HelpCircle,
  BookOpen, Brain, Wallet, Users, BarChart2, Plug
} from "lucide-react";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setAppsOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: "New course published", message: "Introduction to Blockchain is now available", time: "5m ago", unread: true },
    { id: 2, title: "Assignment submitted", message: "John Doe submitted Smart Contract assignment", time: "1h ago", unread: true },
    { id: 3, title: "Meeting reminder", message: "Department meeting starts in 30 minutes", time: "3h ago", unread: false },
    { id: 4, title: "System update", message: "Platform will be updated on May 25", time: "1d ago", unread: false },
  ];

  return (
    <header 
      className={`h-16 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center px-4 sticky top-0 z-20 transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1 px-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search courses, resources, users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>

      <div className="flex items-center">
        {/* Apps Menu */}
        <div className="relative mr-2" ref={appsRef}>
          <button
            onClick={() => setAppsOpen(!appsOpen)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors relative"
            aria-label="Applications"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          
          {appsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg py-3 ring-1 ring-slate-200 dark:ring-slate-700 z-50 animate-fade-in">
              <div className="px-4 pb-2 mb-1 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Applications</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 p-3">
                {[
                  { icon: <BookOpen className="h-5 w-5" />, name: "Courses", href: "/courses" },
                  { icon: <Brain className="h-5 w-5" />, name: "AI", href: "/ai" },
                  { icon: <Wallet className="h-5 w-5" />, name: "Web3", href: "/web3" },
                  { icon: <Users className="h-5 w-5" />, name: "Users", href: "/users" },
                  { icon: <BarChart2 className="h-5 w-5" />, name: "Analytics", href: "/analytics" },
                  { icon: <Plug className="h-5 w-5" />, name: "Integrations", href: "/integrations" },
                ].map((app, i) => (
                  <Link
                    key={i}
                    href={app.href}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-1">
                      {app.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{app.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Notifications */}
        <div className="relative mr-3" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700 z-50 animate-fade-in">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Notifications</h3>
                <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {notifications.filter(n => n.unread).length} new
                </span>
              </div>
              
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${
                      notification.unread ? 'bg-slate-50/80 dark:bg-slate-700/20' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${notification.unread ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">{notification.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-slate-100 dark:border-slate-700">
                <a href="/notifications" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors block text-center">
                  View all notifications
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Theme toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors mr-3"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
        
        {/* Help */}
        <Link href="/help" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors mr-3 hidden sm:block">
          <HelpCircle className="h-5 w-5" />
        </Link>
        
        {/* Chat */}
        <Link href="/messages" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300 transition-colors mr-3 hidden sm:block">
          <MessageSquare className="h-5 w-5" />
        </Link>

        {/* User profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2 py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-sm">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-700 dark:text-white text-left">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-left">Administrator</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700 z-50 animate-fade-in">
              <div className="p-3 border-b border-slate-100 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-700 dark:text-white">John Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">john.doe@example.com</p>
              </div>
              
              <div className="py-1">
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <User className="h-4 w-4 mr-3 text-slate-400 dark:text-slate-500" />
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <Settings className="h-4 w-4 mr-3 text-slate-400 dark:text-slate-500" />
                  Settings
                </Link>
              </div>
              
              <div className="py-1 border-t border-slate-100 dark:border-slate-700">
                <Link
                  href="/logout"
                  className="flex items-center px-4 py-2 text-sm text-destructive hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}