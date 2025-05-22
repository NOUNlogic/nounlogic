// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/components/layout/Topbar.tsx
"use client";

import { useState } from "react";
import { 
  Menu, Search, Bell, User, ChevronDown, LogOut, Settings
} from "lucide-react";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 sticky top-0 z-20">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-300"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1 px-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-slate-300 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium dark:text-white hidden sm:inline">
              User Name
            </span>
            <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-slate-200 dark:ring-slate-700 z-50">
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <User className="h-4 w-4 mr-2" />
                My Profile
              </a>
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </a>
              <hr className="my-1 border-slate-200 dark:border-slate-700" />
              <a
                href="/logout"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}