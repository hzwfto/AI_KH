import React, { useState, useEffect } from 'react';
import { getPerformanceData, getSkillData, getMockAssessments, getDetailedStats } from '../data/mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Target, Award, Activity, Clock } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import { useLanguage } from '../i18n/LanguageContext';

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'];

export default function Reports() {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();
  
  const performanceData = getPerformanceData(language);
  const skillData = getSkillData(language);
  const mockAssessments = getMockAssessments(language);
  const detailedStats = getDetailedStats(language);

  useEffect(() => {
    async function generateAnalysis() {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        const langInstruction = language === 'zh' ? 'Please provide the response entirely in Simplified Chinese.' : 'Please provide the response in English.';

        const prompt = `
          You are an expert hotel HR and training manager. Analyze the following employee performance data for practical assessments and provide a detailed, encouraging, and actionable summary (max 3 paragraphs).
          
          Focus on the characteristics of the assessment projects (e.g., which categories they excel in, which need work based on the category performance).
          
          Overall Stats: Total Assessments: ${detailedStats.totalAssessments}, Pass Rate: ${detailedStats.passRate}%, Avg Score: ${detailedStats.averageScore}, Avg Attempts: ${detailedStats.averageAttempts}
          Category Performance: ${JSON.stringify(detailedStats.categoryPerformance)}
          Recent Scores: ${JSON.stringify(performanceData)}
          Skill Breakdown: ${JSON.stringify(skillData)}
          
          Format the output in Markdown with bullet points for key strengths and areas for improvement. Do not include introductory conversational text.
          ${langInstruction}
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        setAnalysis(response.text || 'Analysis could not be generated.');
      } catch (error) {
        console.error('Error generating analysis:', error);
        setAnalysis(language === 'zh' ? '加载AI分析失败。请检查您的API密钥和网络连接。' : 'Failed to load AI analysis. Please check your API key and connection.');
      } finally {
        setLoading(false);
      }
    }

    generateAnalysis();
  }, [language]); // Re-run when language changes

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.reports.title}</h2>
          <p className="text-slate-500 mt-2">{t.reports.subtitle}</p>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{t.reports.totalAssessments}</p>
            <p className="text-2xl font-bold text-slate-900">{detailedStats.totalAssessments}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{t.reports.passRate}</p>
            <p className="text-2xl font-bold text-slate-900">{detailedStats.passRate}%</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{t.reports.averageScore}</p>
            <p className="text-2xl font-bold text-slate-900">{detailedStats.averageScore}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{t.reports.averageAttempts}</p>
            <p className="text-2xl font-bold text-slate-900">{detailedStats.averageAttempts}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AI Analysis Section */}
        <div className="lg:col-span-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} className="text-indigo-600" />
          </div>
          
          <div className="flex items-center space-x-3 mb-6 relative z-10">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-md">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{t.reports.aiInsights}</h3>
          </div>
          
          <div className="relative z-10 prose prose-indigo max-w-none text-slate-700">
            {loading ? (
              <div className="flex items-center space-x-3 text-indigo-600 font-medium animate-pulse">
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <span>{t.reports.analyzing}</span>
              </div>
            ) : (
              <div className="markdown-body space-y-4">
                <Markdown>{analysis}</Markdown>
              </div>
            )}
          </div>
        </div>

        {/* Category Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">{t.reports.categoryPerformance}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detailedStats.categoryPerformance} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontWeight: 500 }} width={100} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={32}>
                  {detailedStats.categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart for Skills */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-semibold text-slate-800 w-full mb-4">{t.reports.skillProficiency}</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                <Radar name={t.header.name} dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 flex items-center"><CheckCircle2 size={16} className="text-emerald-500 mr-2"/> {t.reports.strongest}</span>
              <span className="font-semibold text-slate-800">{t.reports.procedureAdherence} (95)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 flex items-center"><AlertTriangle size={16} className="text-amber-500 mr-2"/> {t.reports.needsFocus}</span>
              <span className="font-semibold text-slate-800">{t.reports.problemSolving} (80)</span>
            </div>
          </div>
        </div>

        {/* Bar Chart for Recent Scores */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">{t.reports.monthlyScores}</h3>
            <div className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              <TrendingUp size={16} className="mr-1" />
              {t.reports.overallGrowth}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
