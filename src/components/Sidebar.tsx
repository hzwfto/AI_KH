import React from 'react';
import { LayoutDashboard, ClipboardList, BarChart3, Settings, LogOut, Users, FolderKanban, ListChecks } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { t } = useLanguage();
  const { role, logout } = useAuth();

  const employeeNavItems = [
    { id: 'dashboard', label: t.sidebar.dashboard, icon: LayoutDashboard },
    { id: 'assessments', label: t.sidebar.assessments, icon: ClipboardList },
    { id: 'reports', label: t.sidebar.reports, icon: BarChart3 },
  ];

  const managerNavItems = [
    { id: 'dashboard', label: t.sidebar.managerDashboard, icon: LayoutDashboard },
    { id: 'manager-employees', label: t.sidebar.employees, icon: Users },
    { id: 'manager-projects', label: t.sidebar.projects, icon: FolderKanban },
    { id: 'manager-sop', label: t.sidebar.sop, icon: ListChecks },
  ];

  const navItems = role === 'manager' ? managerNavItems : employeeNavItems;

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <Logo className="w-8 h-8 rounded-lg shadow-sm shadow-indigo-900" />
        <div>
          <h1 className="text-xl font-bold tracking-tight">{t.sidebar.title}</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {role === 'manager' ? t.sidebar.managerSubtitle : t.sidebar.subtitle}
          </p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left",
                activeTab === item.id 
                  ? "bg-indigo-600 text-white" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-left">
          <Settings size={20} />
          <span className="font-medium">{t.sidebar.settings}</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors text-left"
        >
          <LogOut size={20} />
          <span className="font-medium">{t.sidebar.logout}</span>
        </button>
      </div>
    </aside>
  );
}
