"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, BookOpen, Building, Users, BarChart2,
  Plug, Brain, Wallet, Settings, ChevronLeft, ChevronRight
} from "lucide-react";

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

  const mainNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Institutions", href: "/institutions", icon: Building },
  ];

  const secondaryNavItems = [
    { name: "Users", href: "/users", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Integrations", href: "/integrations", icon: Plug },
  ];

  const techNavItems = [
    { name: "AI", href: "/ai", icon: Brain },
    { name: "Web3", href: "/web3", icon: Wallet },
    { name: "Settings", href: "/settings", icon: Settings },
  ];
  
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
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
                title={!isOpen ? item.name : undefined}
              >
                <div className={`flex items-center justify-center w-6 h-6 ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary-foreground"}`}>
                  <Icon className={`h-[18px] w-[18px] transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                </div>
                
                {isOpen && (
                  <span className={`ml-3 transition-all ${isActive ? "text-primary" : ""}`}>
                    {item.name}
                  </span>
                )}
                
                {isActive && (
                  <span className={`absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary ${isOpen ? "opacity-100" : "opacity-0"}`}></span>
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
        className={`bg-slate-900 text-white transition-all duration-300 ease-in-out fixed h-screen overflow-y-auto z-30
          ${isOpen ? "left-0 w-64" : "-left-64 md:left-0 md:w-20"} 
          shadow-xl border-r border-slate-800`}
      >
        {/* Logo section */}
        <div className="p-4 flex items-center justify-between h-16 border-b border-slate-800/50">
          <Link href="/" className="flex items-center">
            {isOpen ? (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-2">
                  <span className="text-lg font-bold text-white">NL</span>
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  NounLogic
                </h1>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center mx-auto">
                <span className="text-lg font-bold text-white">NL</span>
              </div>
            )}
          </Link>
          
          {/* Toggle button visible on desktop */}
          <button 
            onClick={toggleSidebar} 
            className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
        </div>

        {/* Navigation sections */}
        <div className="py-6">
          {renderNavSection(mainNavItems, "Main")}
          {isOpen && <div className="mx-4 my-4 border-t border-slate-800/50"></div>}
          {renderNavSection(secondaryNavItems, "Management")}
          {isOpen && <div className="mx-4 my-4 border-t border-slate-800/50"></div>}
          {renderNavSection(techNavItems, "Advanced")}
        </div>
        
        {/* User profile section */}
        {isOpen && (
          <div className="absolute bottom-0 w-full p-4 border-t border-slate-800/50 bg-slate-900/90 backdrop-blur-sm">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}