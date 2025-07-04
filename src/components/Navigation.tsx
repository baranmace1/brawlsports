import React from 'react';
import { User, MessageSquare, Users, Github, Languages, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User as UserType } from '../types/User';

interface NavigationProps {
  currentUser: UserType | null;
  currentPage: string;
  onPageChange: (page: string) => void;
  onShowLogin: () => void;
  onShowRegister: () => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentUser,
  currentPage,
  onPageChange,
  onShowLogin,
  onShowRegister,
  onLogout,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Users },
    { id: 'forum', label: t('nav.forum'), icon: MessageSquare },
    { id: 'discord', label: t('nav.discord'), icon: Github },
  ];

  if (currentUser) {
    navItems.push({ id: 'profile', label: t('nav.profile'), icon: User });
    if (currentUser.isAdmin) {
      navItems.push({ id: 'admin', label: t('nav.admin'), icon: Settings });
    }
  }

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-800 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Brawl Sports</span>
            </div>

            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Languages className="h-4 w-4" />
              <span>{language.toUpperCase()}</span>
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {currentUser.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-white font-medium">{currentUser.username}</span>
                  <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs">
                    {t('profile.level')} {currentUser.level}
                  </div>
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                    {currentUser.points || 0} Puan
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onShowLogin}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={onShowRegister}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {t('nav.register')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};