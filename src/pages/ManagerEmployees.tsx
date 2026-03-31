import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getMockEmployees, getEmployeeDetails } from '../data/mockData';
import { Users, TrendingUp, Award, ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ManagerEmployees() {
  const { t, language } = useLanguage();
  const employees = getMockEmployees(language);
  const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null);

  const totalParticipations = employees.reduce((acc, emp) => acc + emp.participated, 0);
  const avgPassRate = Math.round(employees.reduce((acc, emp) => acc + emp.passRate, 0) / employees.length);

  if (selectedEmpId) {
    const employee = employees.find(e => e.id === selectedEmpId);
    const details = getEmployeeDetails(language, selectedEmpId);

    return (
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedEmpId(null)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {employee?.name} {t.manager.employees.detailsTitle}
            </h2>
            <p className="text-slate-500 mt-2">{t.manager.employees.empId}: {employee?.id} | {t.manager.employees.position}: {employee?.position}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.projectName}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.score}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.status}</th>
                  <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.date}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {details.map((detail) => (
                  <tr key={detail.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{detail.projectName}</td>
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
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t.manager.employees.title}</h2>
          <p className="text-slate-500 mt-2">{t.manager.employees.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t.dashboard.totalEmployees}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{employees.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Users size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t.manager.employees.totalParticipations}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{totalParticipations}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
              <TrendingUp size={24} />
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
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.name}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.empId}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.position}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.participated}</th>
                <th className="py-4 px-6 font-semibold text-slate-600">{t.manager.employees.passRate}</th>
                <th className="py-4 px-6 font-semibold text-slate-600 text-right">{t.manager.employees.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {employees.map((employee) => (
                <tr 
                  key={employee.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedEmpId(employee.id)}
                >
                  <td className="py-4 px-6 font-medium text-slate-900">{employee.name}</td>
                  <td className="py-4 px-6 text-slate-600">{employee.id}</td>
                  <td className="py-4 px-6 text-slate-600">{employee.position}</td>
                  <td className="py-4 px-6 text-slate-600">{employee.participated}</td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      employee.passRate >= 90 ? "bg-emerald-100 text-emerald-700" :
                      employee.passRate >= 80 ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {employee.passRate}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center justify-end w-full transition-opacity">
                      {t.manager.employees.action} <ChevronRight className="w-4 h-4 ml-1" />
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
