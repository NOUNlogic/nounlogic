// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, BookOpen, Building, Users, BarChart2,
  Plug, Brain, Wallet, Settings
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Institutions", href: "/institutions", icon: Building },
    { name: "Users", href: "/users", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Integrations", href: "/integrations", icon: Plug },
    { name: "AI", href: "/ai", icon: Brain },
    { name: "Web3", href: "/web3", icon: Wallet },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside 
      className={`bg-slate-900 text-white transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } h-screen overflow-y-auto fixed left-0 top-0 z-30`}
    >
      <div className="p-4 flex items-center justify-center h-16">
        <Link href="/" className="flex items-center justify-center">
          {isOpen ? (
            <h1 className="text-xl font-bold">NounLogic LMS</h1>
          ) : (
            <span className="text-2xl font-bold">NL</span>
          )}
        </Link>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-slate-700 text-white" 
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {isOpen && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}