import React from 'react';
import { Bell, Search, Globe, UserCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { role, setRole } = useAuth();

  const toggleRole = () => {
    setRole(role === 'employee' ? 'manager' : 'employee');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96">
        <Search className="text-slate-400 mr-2" size={20} />
        <input 
          type="text" 
          placeholder={t.header.search}
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button 
          onClick={toggleRole}
          className="flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100"
        >
          <UserCircle2 size={16} />
          <span>{t.header.switchRole} {role === 'employee' ? t.header.managerRole : t.header.role}</span>
        </button>

        <button 
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200"
        >
          <Globe size={16} />
          <span>{language === 'zh' ? 'EN' : '中文'}</span>
        </button>

        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center space-x-3 cursor-pointer pl-6 border-l border-slate-200">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            {role === 'manager' ? (language === 'zh' ? '李' : 'SC') : (language === 'zh' ? '张' : 'JD')}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800">
              {role === 'manager' ? t.header.managerName : t.header.name}
            </span>
            <span className="text-xs text-slate-500">
              {role === 'manager' ? t.header.managerRole : t.header.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
