/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Assessments from './pages/Assessments';
import Reports from './pages/Reports';
import ManagerEmployees from './pages/ManagerEmployees';
import ManagerProjects from './pages/ManagerProjects';
import ManagerSOP from './pages/ManagerSOP';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authView, setAuthView] = useState<'landing' | 'login'>('landing');
  const { role, isAuthenticated } = useAuth();

  useEffect(() => {
    setActiveTab('dashboard');
  }, [role]);

  if (!isAuthenticated) {
    if (authView === 'login') {
      return <Login onBack={() => setAuthView('landing')} />;
    }
    return <Landing onLoginClick={() => setAuthView('login')} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col ml-64 overflow-y-auto">
        <Header />
        
        <main className="flex-1">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'assessments' && <Assessments />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'manager-employees' && <ManagerEmployees />}
          {activeTab === 'manager-projects' && <ManagerProjects />}
          {activeTab === 'manager-sop' && <ManagerSOP />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

