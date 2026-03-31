import React from 'react';
import { ClipboardCheck, Clock, AlertCircle, TrendingUp, Users, FolderKanban, ListChecks } from 'lucide-react';
import { getMockAssessments, getMockEmployees, getMockProjects, getMockSOPs, getSkillData, getImprovementSuggestions } from '../data/mockData';
import { Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { role } = useAuth();
  
  const mockAssessments = getMockAssessments(language);
  const employees = getMockEmployees(language);
  const projects = getMockProjects(language);
  const sops = getMockSOPs(language);
  const skillData = getSkillData(language);
  const suggestions = getImprovementSuggestions(language);

  const completed = mockAssessments.filter(a => a.status === 'completed').length;
  const pending = mockAssessments.filter(a => a.status === 'pending').length;
  const inProgress = mockAssessments.filter(a => a.status === 'in-progress').length;
  
  const averageScore = mockAssessments
    .filter(a => a.score !== undefined)
    .reduce((acc, curr) => acc + (curr.score || 0), 0) / completed;

  const recentAssessments = mockAssessments.slice(0, 3);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {t.dashboard.welcome}, {role === 'manager' ? t.header.managerName : t.header.name}!
          </h2>
          <p className="text-slate-500 mt-2">
            {role === 'manager' ? t.dashboard.managerOverview : t.dashboard.overview}
          </p>
        </div>
        {role === 'employee' && (
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
            {t.dashboard.startNext}
          </button>
        )}
      </div>

      {role === 'manager' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard 
            title={t.dashboard.totalEmployees} 
            value={employees.length} 
            icon={<Users className="text-blue-600" size={24} />} 
          />
          <StatCard 
            title={t.sidebar.projects} 
            value={projects.length} 
            icon={<FolderKanban className="text-indigo-600" size={24} />} 
          />
          <StatCard 
            title={t.sidebar.sop} 
            value={sops.length} 
            icon={<ListChecks className="text-emerald-600" size={24} />} 
          />
          <StatCard 
            title={t.dashboard.passRate} 
            value={`${(employees.reduce((acc, emp) => acc + emp.passRate, 0) / employees.length).toFixed(1)}%`} 
            icon={<TrendingUp className="text-amber-600" size={24} />} 
            trend={t.dashboard.fromLastQuarter}
            trendUp={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard 
            title={t.dashboard.completed} 
            value={completed} 
            icon={<ClipboardCheck className="text-emerald-600" size={24} />} 
            trend={t.dashboard.thisMonth}
            trendUp={true}
          />
          <StatCard 
            title={t.dashboard.pending} 
            value={pending} 
            icon={<Clock className="text-amber-500" size={24} />} 
            trend={t.dashboard.dueSoon}
            trendUp={false}
          />
          <StatCard 
            title={t.dashboard.inProgress} 
            value={inProgress} 
            icon={<AlertCircle className="text-blue-500" size={24} />} 
          />
          <StatCard 
            title={t.dashboard.averageScore} 
            value={`${averageScore.toFixed(1)}`} 
            icon={<TrendingUp className="text-indigo-600" size={24} />} 
            trend={t.dashboard.fromLastQuarter}
            trendUp={true}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {role === 'manager' ? (
            <>
              <h3 className="text-lg font-semibold text-slate-800 mb-6">{t.dashboard.sopStats}</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sops} margin={{ top: 5, right: 20, bottom: 40, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} angle={-45} textAnchor="end" height={60} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: '#f1f5f9' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="participants" name={t.dashboard.participants} fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="passedCount" name={t.dashboard.passedCount} fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-800 mb-6">{t.dashboard.personalAnalysis}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px] w-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                      <Radar name={t.header.name} dataKey="A" stroke="#4f46e5" strokeWidth={2} fill="#4f46e5" fillOpacity={0.5} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <h4 className="font-medium text-slate-700 flex items-center gap-2">
                    <AlertCircle size={18} className="text-amber-500" />
                    {t.dashboard.actionableSuggestions}
                  </h4>
                  <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="p-4 rounded-xl border border-amber-100 bg-amber-50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-amber-800">{suggestion.subject}</span>
                          <span className="text-sm font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                            {t.dashboard.score}: {suggestion.score}
                          </span>
                        </div>
                        <p className="text-sm text-amber-700 leading-relaxed">
                          {suggestion.suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">{t.dashboard.recentTasks}</h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">{t.dashboard.viewAll}</button>
          </div>
          
          <div className="space-y-4 flex-1">
            {recentAssessments.map(assessment => (
              <div key={assessment.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-800 line-clamp-1" title={assessment.title}>{assessment.title}</h4>
                  <StatusBadge status={assessment.status} t={t} />
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>{t.dashboard.due}: {assessment.dueDate}</span>
                  {assessment.score && <span className="font-semibold text-slate-700">{t.dashboard.score}: {assessment.score}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendUp }: { title: string, value: string | number, icon: React.ReactNode, trend?: string, trendUp?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-xl">
          {icon}
        </div>
      </div>
      <h4 className="text-slate-500 font-medium text-sm mb-1">{title}</h4>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
      </div>
      {trend && (
        <div className={`mt-3 text-sm font-medium flex items-center ${trendUp ? 'text-emerald-600' : 'text-amber-600'}`}>
          {trend}
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status, t }: { status: string, t: any }) {
  switch (status) {
    case 'completed':
      return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">{t.dashboard.completed}</span>;
    case 'in-progress':
      return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">{t.dashboard.inProgress}</span>;
    case 'pending':
      return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">{t.dashboard.pending}</span>;
    default:
      return null;
  }
}
