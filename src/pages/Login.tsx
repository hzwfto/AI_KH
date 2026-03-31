import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import Logo from '../components/Logo';

interface LoginProps {
  onBack: () => void;
}

export default function Login({ onBack }: LoginProps) {
  const { t, language, setLanguage } = useLanguage();
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 py-4 px-6 sm:px-8 lg:px-12 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 rounded-lg shadow-sm shadow-indigo-200" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">{t.landing.systemName}</span>
          </div>
        </div>
        <button 
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200"
        >
          <Globe size={16} />
          <span>{language === 'zh' ? 'EN' : '中文'}</span>
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.landing.loginTitle}</h2>
              <p className="text-slate-500">{t.landing.loginSubtitle}</p>
            </div>

            <form className="space-y-5 mb-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.landing.email}</label>
                <input 
                  type="email" 
                  disabled
                  placeholder="demo@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{t.landing.password}</label>
                <input 
                  type="password" 
                  disabled
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>
              <button 
                type="button"
                disabled
                className="w-full bg-slate-800 text-white font-medium py-2.5 rounded-lg opacity-50 cursor-not-allowed"
              >
                {t.landing.loginButton}
              </button>
            </form>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">{t.landing.demoHint}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => login('employee')}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm shadow-indigo-200"
              >
                {t.landing.loginAsEmployee}
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => login('manager')}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-3 rounded-xl transition-colors"
              >
                {t.landing.loginAsManager}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
