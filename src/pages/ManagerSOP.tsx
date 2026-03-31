import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getMockSOPs, getSOPDetails } from '../data/mockData';
import { ListChecks, Users, Award, ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ManagerSOP() {
  const { t, language } = useLanguage();
  const sops = getMockSOPs(language);
  const [selectedSopId, setSelectedSopId] = useState<string | null>(null);

  const totalParticipants = sops.reduce((acc, sop) => acc + sop.participants, 0);
  const avgPassRate = Math.round(sops.reduce((acc, sop) => acc + sop.passRate, 0) / sops.length);

  if (selectedSopId) {
    const sop = sops.find(s => s.id === selectedSopId);
    const details = getSOPDetails(language, selectedSopId);

    return (
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedSopId(null)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {t.manager.sop.detailsTitle} {sop?.name}
            </h2>
            <p className="text-slate-500 mt-2">{t.manager.sop.position}: {sop?.position}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.employeeName}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.empId}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.projectName}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.score}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.status}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.date}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {details.map((detail) => (
                  <tr key={detail.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{detail.empName}</td>
                    <td className="py-4 px-6 text-slate-600">{detail.empId}</td>
                    <td className="py-4 px-6 text-slate-600">{detail.projectName}</td>
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
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.manager.sop.title}</h2>
          <p className="text-slate-500 mt-2">{t.manager.sop.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t.sidebar.sop}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{sops.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <ListChecks size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t.manager.sop.participants}</p>
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
              <p className="text-3xl font-bold text-emerald-600 mt-2">{avgPassRate}%</p>
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
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.sopName}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.position}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.participants}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.passedCount}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.sop.passRate}</th>
                <th className="py-4 px-6 font-semibold text-slate-600 text-right">{t.manager.sop.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sops.map((sop) => (
                <tr 
                  key={sop.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedSopId(sop.id)}
                >
                  <td className="py-4 px-6 font-medium text-slate-900">{sop.name}</td>
                  <td className="py-4 px-6 text-slate-600">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {sop.position}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{sop.participants}</td>
                  <td className="py-4 px-6 text-slate-600">{sop.passedCount}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{sop.passRate}%</span>
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            sop.passRate >= 90 ? "bg-emerald-500" :
                            sop.passRate >= 80 ? "bg-blue-500" :
                            "bg-amber-500"
                          )}
                          style={{ width: `${sop.passRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center justify-end w-full transition-opacity">
                      {t.manager.sop.action} <ChevronRight className="w-4 h-4 ml-1" />
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
