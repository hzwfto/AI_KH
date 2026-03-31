import React, { useState } from 'react';
import { getMockAssessments, getAssessmentAttempts } from '../data/mockData';
import { StatusBadge } from './Dashboard';
import { Search, Filter, Calendar, User, ChevronRight, RefreshCw, ArrowLeft, Award, TrendingUp, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';

export default function Assessments() {
  const [filter, setFilter] = useState('all');
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);
  const { t, language } = useLanguage();
  const mockAssessments = getMockAssessments(language);

  const filteredAssessments = mockAssessments.filter(a => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  const filterOptions = [
    { id: 'all', label: t.assessments.all },
    { id: 'pending', label: t.assessments.pending },
    { id: 'in-progress', label: t.assessments.inProgress },
    { id: 'completed', label: t.assessments.completed }
  ];

  if (selectedAssessmentId) {
    const assessment = mockAssessments.find(a => a.id === selectedAssessmentId);
    const attempts = getAssessmentAttempts(language, selectedAssessmentId);
    
    const highestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
    const latestScore = attempts.length > 0 ? attempts[attempts.length - 1].score : 0;
    
    const currentAttemptId = selectedAttemptId || (attempts.length > 0 ? attempts[attempts.length - 1].id : null);
    const selectedAttempt = attempts.find(a => a.id === currentAttemptId);

    return (
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedAssessmentId(null)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {assessment?.title} - {t.assessments.details.title}
            </h2>
            <p className="text-slate-500 mt-2">{assessment?.category} | {t.dashboard.due}: {assessment?.dueDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{t.assessments.details.highestScore}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{highestScore}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <Award size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{t.assessments.details.latestScore}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{latestScore}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{t.assessments.details.totalAttempts}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{attempts.length} / {assessment?.maxAttempts}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <RefreshCw size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Attempt History List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{t.assessments.details.attemptHistory}</h3>
            
            {attempts.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 shadow-sm">
                No attempts yet.
              </div>
            ) : (
              <div className="space-y-3">
                {attempts.map((attempt) => (
                  <div 
                    key={attempt.id}
                    onClick={() => setSelectedAttemptId(attempt.id)}
                    className={cn(
                      "bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md",
                      currentAttemptId === attempt.id 
                        ? "border-indigo-500 shadow-sm ring-1 ring-indigo-500" 
                        : "border-slate-200 shadow-sm"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-slate-900">
                        {t.assessments.details.attempt} #{attempt.attemptNumber}
                      </span>
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium",
                        attempt.status === 'Passed' || attempt.status === '通过' 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-rose-100 text-rose-700"
                      )}>
                        {attempt.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1.5" />
                        {attempt.date}
                      </div>
                      <div className="font-bold text-slate-900">
                        {attempt.score}/100
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Attempt Details */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{t.assessments.details.attemptDetails}</h3>
            
            {selectedAttempt ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">
                      {t.assessments.details.attempt} #{selectedAttempt.attemptNumber}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">{selectedAttempt.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">{selectedAttempt.score}</div>
                    <div className={cn(
                      "text-sm font-medium mt-1",
                      selectedAttempt.status === 'Passed' || selectedAttempt.status === '通过' 
                        ? "text-emerald-600" 
                        : "text-rose-600"
                    )}>
                      {selectedAttempt.status}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-500">{t.assessments.details.evaluator}</p>
                        <p className="text-slate-900 font-medium mt-1">{selectedAttempt.evaluator}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-500">{t.assessments.details.duration}</p>
                        <p className="text-slate-900 font-medium mt-1">{selectedAttempt.duration || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-slate-900 font-bold">
                      <AlertCircle className="w-5 h-5 text-indigo-500" />
                      <span>{t.assessments.details.feedback}</span>
                    </div>
                    <p className="text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100 leading-relaxed">
                      {selectedAttempt.feedback}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedAttempt.strengths && selectedAttempt.strengths.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-slate-900 font-bold">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <span>{t.assessments.details.strengths}</span>
                        </div>
                        <ul className="space-y-2">
                          {selectedAttempt.strengths.map((strength: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-2 flex-shrink-0"></span>
                              <span className="text-slate-600">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedAttempt.weaknesses && selectedAttempt.weaknesses.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-slate-900 font-bold">
                          <XCircle className="w-5 h-5 text-rose-500" />
                          <span>{t.assessments.details.weaknesses}</span>
                        </div>
                        <ul className="space-y-2">
                          {selectedAttempt.weaknesses.map((weakness: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 mr-2 flex-shrink-0"></span>
                              <span className="text-slate-600">{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm flex flex-col items-center justify-center h-64">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500">{t.assessments.details.selectAttempt}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.assessments.title}</h2>
          <p className="text-slate-500 mt-2">{t.assessments.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder={t.assessments.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                filter === option.id 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {assessment.category}
              </span>
              <StatusBadge status={assessment.status} t={t} />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {assessment.title}
            </h3>
            
            <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3">
              {assessment.description}
            </p>
            
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center text-sm text-slate-600">
                <Calendar size={16} className="mr-2 text-slate-400" />
                <span>{t.dashboard.due}: <span className="font-medium text-slate-900">{assessment.dueDate}</span></span>
              </div>
              
              {assessment.evaluator && (
                <div className="flex items-center text-sm text-slate-600">
                  <User size={16} className="mr-2 text-slate-400" />
                  <span>{t.assessments.evaluator}: <span className="font-medium text-slate-900">{assessment.evaluator}</span></span>
                </div>
              )}
              
              <div className="flex items-center text-sm text-slate-600">
                <RefreshCw size={16} className="mr-2 text-slate-400" />
                <span>{t.assessments.attempts}: <span className="font-medium text-slate-900">{assessment.attempts} / {assessment.maxAttempts}</span></span>
              </div>
              
              {assessment.score !== undefined && (
                <div className="flex items-center justify-between mt-4 pt-2">
                  <span className="text-sm font-medium text-slate-500">{t.assessments.finalScore}</span>
                  <span className={`text-xl font-bold ${assessment.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {assessment.score}/100
                  </span>
                </div>
              )}
            </div>

            {assessment.attempts < assessment.maxAttempts ? (
              <div className="mt-6 flex gap-3">
                <button className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center">
                  {t.assessments.startAssessment}
                </button>
                <button 
                  onClick={() => {
                    setSelectedAssessmentId(assessment.id);
                    setSelectedAttemptId(null);
                  }}
                  className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-colors flex items-center justify-center"
                >
                  {t.assessments.viewResults}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setSelectedAssessmentId(assessment.id);
                  setSelectedAttemptId(null);
                }}
                className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-semibold rounded-xl border border-slate-200 hover:border-indigo-200 transition-colors flex items-center justify-center"
              >
                {assessment.status === 'completed' ? t.assessments.viewDetails : t.assessments.startAssessment}
                <ChevronRight size={18} className="ml-1" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
