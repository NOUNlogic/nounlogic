"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Users, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Set active section based on pathname
  useEffect(() => {
    const currentSection = pathname.split('/')[1];
    setActiveSection(currentSection || 'dashboard');
  }, [pathname]);

  const socialNavItems = [
    { name: "Feed", href: "/feed", icon: Home },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Groups", href: "/groups", icon: Users },
    { name: "People", href: "/people", icon: UserPlus },
  ];

  // Hidden/secondary sections intentionally removed for social-first MVP
  
  const renderNavSection = (items: any[], sectionTitle?: string) => (
    <div className="mb-6">
      {sectionTitle && isOpen && (
        <h3 className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {sectionTitle}
        </h3>
      )}
      <ul className="space-y-1 px-2">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <li key={item.name} className={isActive ? "animate-pulse-subtle" : ""}>
              <Link
                href={item.href}
                className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? "bg-gradient-to-r from-primary/20 to-purple-500/10 text-primary font-medium backdrop-blur-sm" 
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
                title={!isOpen ? item.name : undefined}
              >
                <div className={`flex items-center justify-center w-6 h-6 ${
                  isActive 
                    ? "text-primary relative after:absolute after:inset-0 after:bg-primary after:blur-lg after:opacity-20" 
                    : "text-slate-400 group-hover:text-white"
                }`}>
                  <Icon className={`h-[18px] w-[18px] transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                </div>
                
                {isOpen && (
                  <span className={`ml-3 transition-all ${isActive ? "text-primary" : ""}`}>
                    {item.name}
                  </span>
                )}
                
                {isActive && (
                  <span className={`absolute left-0 w-1 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-r-full ${isOpen ? "opacity-100" : "opacity-0"}`}></span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      <aside 
        className={`bg-gradient-to-b from-slate-900 to-slate-950 text-white transition-all duration-300 ease-in-out fixed h-screen overflow-y-auto z-30
          ${isOpen ? "left-0 w-64" : "-left-64 md:left-0 md:w-20"} 
          shadow-xl border-r border-slate-800/50`}
      >
        {/* Logo section */}
        <div className="p-4 flex items-center justify-between h-16 border-b border-slate-700/30 bg-slate-900/50 backdrop-blur-sm">
          <Link href="/" className="flex items-center">
            {isOpen ? (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-2 shadow-lg shadow-purple-500/20">
                  <span className="text-lg font-bold text-white">NL</span>
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  NounLogic
                </h1>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform">
                <span className="text-lg font-bold text-white">NL</span>
              </div>
            )}
          </Link>
          
          {/* Toggle button visible on desktop */}
          <button 
            onClick={toggleSidebar} 
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors border border-slate-700/50 shadow-inner"
          >
            {isOpen ? (
              <ChevronLeft size={14} className="text-blue-100" />
            ) : (
              <ChevronRight size={14} className="text-blue-100" />
            )}
          </button>
        </div>

        {/* Navigation sections */}
        <div className="py-6">
          {renderNavSection(socialNavItems, "Social")}
        </div>
      </aside>
    </>
  );
}