import React, { useState } from 'react';
import { X, Crown, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { authenticateUser } from '../../utils/database';

interface LoginFormProps {
  onLogin: (user: any) => void;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onClose, onSwitchToRegister }) => {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = authenticateUser(username, password);
      if (user) {
        onLogin(user);
      } else {
        setError('Kullanıcı adı veya şifre yanlış');
      }
    } catch (err) {
      setError('Giriş yapılırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-md border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Crown className="h-6 w-6 mr-2 text-yellow-400" />
            {t('auth.loginTitle')}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              {t('auth.username')}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={t('auth.username')}
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              {t('auth.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={t('auth.password')}
              required
              minLength={4}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('common.loading') : t('auth.login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToRegister}
            className="text-white/60 hover:text-white transition-colors"
          >
            {t('auth.switchToRegister')}
          </button>
        </div>
      </div>
    </div>
  );
};