import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'tr' | 'en';
  setLanguage: (lang: 'tr' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  tr: {
    // Navigation
    'nav.dashboard': 'Ana Sayfa',
    'nav.forum': 'Forum',
    'nav.profile': 'Profil',
    'nav.admin': 'Admin',
    'nav.discord': 'Discord',
    'nav.login': 'Giriş Yap',
    'nav.register': 'Kayıt Ol',
    'nav.logout': 'Çıkış Yap',
    
    // Dashboard
    'dashboard.welcome': 'Brawl Sports Topluluğuna Hoş Geldiniz',
    'dashboard.description': 'Brawl Stars\'ın en aktif esports topluluğu! Sezonluk metalar, taktikler ve esports kuralları ile yeni esporcular yetiştiriyoruz.',
    'dashboard.joinDiscord': 'Discord Sunucumuza Katıl',
    'dashboard.latestMeta': 'Son Meta Güncellemeleri',
    'dashboard.latestTactics': 'Son Taktikler',
    'dashboard.topPlayers': 'En İyi Oyuncular',
    
    // Authentication
    'auth.username': 'Kullanıcı Adı',
    'auth.password': 'Şifre',
    'auth.login': 'Giriş Yap',
    'auth.register': 'Kayıt Ol',
    'auth.loginTitle': 'Hesabınıza Giriş Yapın',
    'auth.registerTitle': 'Yeni Hesap Oluştur',
    'auth.switchToRegister': 'Hesabınız yok mu? Kayıt olun',
    'auth.switchToLogin': 'Zaten hesabınız var mı? Giriş yapın',
    'auth.passwordMinLength': 'Şifre en az 4 karakter olmalıdır',
    
    // Forum
    'forum.title': 'Forum',
    'forum.categories': 'Kategoriler',
    'forum.newPost': 'Yeni Gönderi',
    'forum.meta': 'Meta',
    'forum.tactics': 'Taktikler',
    'forum.general': 'Genel',
    'forum.esports': 'Esports',
    'forum.postTitle': 'Gönderi Başlığı',
    'forum.content': 'İçerik',
    'forum.category': 'Kategori',
    'forum.submit': 'Gönder',
    'forum.reply': 'Yanıtla',
    'forum.likes': 'Beğeni',
    'forum.replies': 'Yanıt',
    
    // Profile
    'profile.title': 'Profil',
    'profile.level': 'Seviye',
    'profile.experience': 'Deneyim',
    'profile.titles': 'Ünvanlar',
    'profile.cards': 'Kartlar',
    'profile.socialMedia': 'Sosyal Medya',
    'profile.joinedAt': 'Katılma Tarihi',
    'profile.editProfile': 'Profili Düzenle',
    
    // Admin
    'admin.title': 'Admin Paneli',
    'admin.userManagement': 'Kullanıcı Yönetimi',
    'admin.metaManagement': 'Meta Yönetimi',
    'admin.tacticManagement': 'Taktik Yönetimi',
    'admin.banUser': 'Kullanıcıyı Banla',
    'admin.unbanUser': 'Banı Kaldır',
    'admin.newMeta': 'Yeni Meta',
    'admin.newTactic': 'Yeni Taktik',
    
    // Discord
    'discord.title': 'Discord Sunucumuza Katıl',
    'discord.description': 'Brawl Sports topluluğumuzun kalbi Discord sunucumuzda atıyor! Canlı tartışmalar, turnuvalar ve daha fazlası için bize katıl.',
    'discord.join': 'Discord\'a Katıl',
    'discord.features': 'Özellikler',
    'discord.feature1': 'Canlı meta tartışmaları',
    'discord.feature2': 'Günlük turnuvalar',
    'discord.feature3': 'Taktik paylaşımları',
    'discord.feature4': 'Pro oyuncu eğitimleri',
    
    // Common
    'common.close': 'Kapat',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata oluştu',
    'common.success': 'Başarılı',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.forum': 'Forum',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',
    'nav.discord': 'Discord',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to Brawl Sports Community',
    'dashboard.description': 'The most active Brawl Stars esports community! We train new esports players with seasonal metas, tactics, and esports rules.',
    'dashboard.joinDiscord': 'Join Our Discord Server',
    'dashboard.latestMeta': 'Latest Meta Updates',
    'dashboard.latestTactics': 'Latest Tactics',
    'dashboard.topPlayers': 'Top Players',
    
    // Authentication
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.loginTitle': 'Login to Your Account',
    'auth.registerTitle': 'Create New Account',
    'auth.switchToRegister': 'Don\'t have an account? Register',
    'auth.switchToLogin': 'Already have an account? Login',
    'auth.passwordMinLength': 'Password must be at least 4 characters',
    
    // Forum
    'forum.title': 'Forum',
    'forum.categories': 'Categories',
    'forum.newPost': 'New Post',
    'forum.meta': 'Meta',
    'forum.tactics': 'Tactics',
    'forum.general': 'General',
    'forum.esports': 'Esports',
    'forum.postTitle': 'Post Title',
    'forum.content': 'Content',
    'forum.category': 'Category',
    'forum.submit': 'Submit',
    'forum.reply': 'Reply',
    'forum.likes': 'Likes',
    'forum.replies': 'Replies',
    
    // Profile
    'profile.title': 'Profile',
    'profile.level': 'Level',
    'profile.experience': 'Experience',
    'profile.titles': 'Titles',
    'profile.cards': 'Cards',
    'profile.socialMedia': 'Social Media',
    'profile.joinedAt': 'Joined',
    'profile.editProfile': 'Edit Profile',
    
    // Admin
    'admin.title': 'Admin Panel',
    'admin.userManagement': 'User Management',
    'admin.metaManagement': 'Meta Management',
    'admin.tacticManagement': 'Tactic Management',
    'admin.banUser': 'Ban User',
    'admin.unbanUser': 'Unban User',
    'admin.newMeta': 'New Meta',
    'admin.newTactic': 'New Tactic',
    
    // Discord
    'discord.title': 'Join Our Discord Server',
    'discord.description': 'The heart of our Brawl Sports community beats in our Discord server! Join us for live discussions, tournaments, and more.',
    'discord.join': 'Join Discord',
    'discord.features': 'Features',
    'discord.feature1': 'Live meta discussions',
    'discord.feature2': 'Daily tournaments',
    'discord.feature3': 'Tactic sharing',
    'discord.feature4': 'Pro player coaching',
    
    // Common
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};