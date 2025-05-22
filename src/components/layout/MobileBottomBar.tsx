'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Brain, 
  Settings 
} from 'lucide-react';

const MobileBottomBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Users", href: "/users", icon: Users },
    { name: "AI", href: "/ai", icon: Brain },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-border/50 z-50">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 group ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <div className={`relative transition-all duration-200 ${
                isActive ? "transform scale-110" : "group-hover:transform group-hover:scale-105"
              }`}>
                <Icon 
                  size={20} 
                  className={`transition-all duration-200 ${
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  }`} 
                />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
              
              <span className={`text-xs mt-1 font-medium transition-all duration-200 truncate max-w-full ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground group-hover:text-primary"
              }`}>
                {item.name}
              </span>
              
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomBar;