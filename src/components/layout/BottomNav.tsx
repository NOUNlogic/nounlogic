'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Users, UserPlus, Bot } from 'lucide-react';

const BottomNav = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Feed', href: '/feed', icon: Home },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'AI', href: '/ai', icon: Bot },
    { name: 'Groups', href: '/groups', icon: Users },
    { name: 'People', href: '/people', icon: UserPlus },
  ];

  // Only show on mobile devices
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 h-16">
      <div className="grid grid-cols-5 h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center transition-colors
                ${isActive
                  ? 'text-primary'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary'
                }
              `}
            >
              <item.icon 
                size={22} 
                className={`${isActive ? 'animate-pulse' : ''}`} 
              />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-1 bg-primary rounded-t-md"></span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;