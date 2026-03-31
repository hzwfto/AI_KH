import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { BrainCircuit, LineChart, Zap, Building2, Factory, Store, Globe, ArrowRight, Scan, Video, FileText } from 'lucide-react';
import Logo from '../components/Logo';

interface LandingProps {
  onLoginClick: () => void;
}

export default function Landing({ onLoginClick }: LandingProps) {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sm:px-8 lg:px-12 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 shadow-sm shadow-indigo-200 rounded-lg" />
          <span className="text-xl font-bold text-slate-900 tracking-tight">{t.landing.systemName}</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200"
          >
            <Globe size={16} />
            <span>{language === 'zh' ? 'EN' : '中文'}</span>
          </button>
          <button 
            onClick={onLoginClick}
            className="hidden sm:flex items-center space-x-1 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors px-4 py-1.5 rounded-full"
          >
            <span>{t.landing.signIn}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-20 pb-28 lg:pt-32 lg:pb-40 border-b border-slate-200">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2850&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white"></div>
          
          <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 shadow-sm">
              <BrainCircuit size={16} className="text-indigo-600" />
              {t.landing.aiPowered}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight break-keep">
              {t.landing.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              {t.landing.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onLoginClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 text-lg"
              >
                {t.landing.getStarted}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* AI Advantages Section */}
        <section className="py-20 lg:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16 lg:mb-24">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.landing.aiAdvantages}</h2>
              <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Scan size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t.landing.adv1Title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{t.landing.adv1Desc}</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Video size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t.landing.adv2Title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{t.landing.adv2Desc}</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <FileText size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{t.landing.adv3Title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{t.landing.adv3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Scenarios Section */}
        <section className="py-20 lg:py-32 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16 lg:mb-24">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.landing.scenarios}</h2>
              <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 hover:bg-indigo-50 transition-colors">
                <Building2 size={40} className="text-slate-400 group-hover:text-indigo-600 transition-colors mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.landing.scene1Title}</h3>
                <p className="text-slate-600 text-lg">{t.landing.scene1Desc}</p>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 hover:bg-indigo-50 transition-colors">
                <Factory size={40} className="text-slate-400 group-hover:text-indigo-600 transition-colors mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.landing.scene2Title}</h3>
                <p className="text-slate-600 text-lg">{t.landing.scene2Desc}</p>
              </div>

              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 hover:bg-indigo-50 transition-colors">
                <Store size={40} className="text-slate-400 group-hover:text-indigo-600 transition-colors mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.landing.scene3Title}</h3>
                <p className="text-slate-600 text-lg">{t.landing.scene3Desc}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center border-t border-slate-800">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Logo className="w-6 h-6" />
          <span className="text-xl font-bold text-white tracking-tight">{t.landing.systemName}</span>
        </div>
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {t.landing.systemName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
