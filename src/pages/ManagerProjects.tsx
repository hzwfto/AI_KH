import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getMockProjects, getProjectDetails } from '../data/mockData';
import { FolderKanban, Users, Award, ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ManagerProjects() {
  const { t, language } = useLanguage();
  const projects = getMockProjects(language);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const totalParticipants = projects.reduce((acc, proj) => acc + proj.participants, 0);
  const avgPassRate = Math.round(projects.reduce((acc, proj) => acc + proj.passRate, 0) / projects.length);

  if (selectedProjectId) {
    const project = projects.find(p => p.id === selectedProjectId);
    const details = getProjectDetails(language, selectedProjectId);

    return (
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedProjectId(null)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {t.manager.projects.detailsTitle} {project?.name}
            </h2>
            <p className="text-slate-500 mt-2">{t.manager.projects.department}: {project?.department} | {t.manager.projects.sopTemplate}: {project?.sopTemplate}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.employeeName}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.empId}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.score}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.status}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.date}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {details.map((detail) => (
                  <tr key={detail.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{detail.empName}</td>
                    <td className="py-4 px-6 text-slate-600">{detail.empId}</td>
                    <td className="py-4 px-6 text-slate-600">{detail.score}</td>
                    <td className="py-4 px-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        detail.status === 'Passed' || detail.status === '通过' 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-rose-100 text-rose-700"
                      )}>
                        {detail.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{detail.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.manager.projects.title}</h2>
          <p className="text-slate-500 mt-2">{t.manager.projects.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t.sidebar.projects}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{projects.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <FolderKanban size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t.manager.projects.participants}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{totalParticipants}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
              <Users size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t.dashboard.passRate}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{avgPassRate}%</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
              <Award size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.projectName}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.department}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.sopTemplate}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.participants}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.passedCount}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.projects.passRate}</th>
                <th className="py-4 px-6 font-semibold text-slate-600 text-right">{t.manager.projects.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {projects.map((project) => (
                <tr 
                  key={project.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <td className="py-4 px-6 font-medium text-slate-900">{project.name}</td>
                  <td className="py-4 px-6 text-slate-600">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {project.department}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{project.sopTemplate}</td>
                  <td className="py-4 px-6 text-slate-600">{project.participants}</td>
                  <td className="py-4 px-6 text-slate-600">{project.passedCount}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{project.passRate}%</span>
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            project.passRate >= 90 ? "bg-emerald-500" :
                            project.passRate >= 80 ? "bg-blue-500" :
                            "bg-amber-500"
                          )}
                          style={{ width: `${project.passRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center justify-end w-full transition-opacity">
                      {t.manager.projects.action} <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
