import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Dashboard } from './components/Dashboard';
import { Forum } from './components/Forum';
import { Profile } from './components/Profile';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DiscordRedirect } from './components/DiscordRedirect';
import { LanguageProvider } from './contexts/LanguageContext';
import { User } from './types/User';
import { initializeApp } from './utils/database';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    initializeApp();
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('dashboard');
  };

  const handleRegister = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setShowRegister(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'forum':
        return <Forum currentUser={currentUser} />;
      case 'profile':
        return <Profile currentUser={currentUser} />;
      case 'admin':
        return currentUser?.isAdmin ? <AdminDashboard currentUser={currentUser} /> : <Dashboard />;
      case 'discord':
        return <DiscordRedirect />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <Navigation
          currentUser={currentUser}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onShowLogin={() => setShowLogin(true)}
          onShowRegister={() => setShowRegister(true)}
          onLogout={handleLogout}
        />

        <main className="relative z-10">
          {renderPage()}
        </main>

        {showLogin && (
          <LoginForm
            onLogin={handleLogin}
            onClose={() => setShowLogin(false)}
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          />
        )}

        {showRegister && (
          <RegisterForm
            onRegister={handleRegister}
            onClose={() => setShowRegister(false)}
            onSwitchToLogin={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;