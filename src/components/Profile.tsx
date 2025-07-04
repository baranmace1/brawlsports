import React, { useState } from 'react';
import { User as UserIcon, Star, Trophy, Calendar, Edit, Instagram, Twitter, Youtube, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User } from '../types/User';

interface ProfileProps {
  currentUser: User | null;
}

export const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    profileImage: currentUser?.profileImage || '',
    socialMedia: currentUser?.socialMedia || {
      discord: '',
      twitter: '',
      instagram: '',
      youtube: '',
    },
  });

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Giriş Yapın</h1>
          <p className="text-white/60">Profilinizi görüntülemek için giriş yapmanız gerekiyor.</p>
        </div>
      </div>
    );
  }

  const getExperienceForNextLevel = () => {
    return currentUser.level * 1000;
  };

  const getExperienceProgress = () => {
    const currentLevelExp = (currentUser.level - 1) * 1000;
    const nextLevelExp = currentUser.level * 1000;
    const progress = ((currentUser.experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    return Math.min(progress, 100);
  };

  const rarityColors = {
    common: 'bg-gray-500',
    rare: 'bg-green-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mx-auto mb-4">
                {currentUser.profileImage ? (
                  <img 
                    src={currentUser.profileImage} 
                    alt={currentUser.username}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{currentUser.username}</h2>
              <div className="flex items-center justify-center space-x-2">
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {t('profile.level')} {currentUser.level}
                </div>
                {currentUser.isAdmin && (
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                    Admin
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">{t('profile.experience')}</span>
                <span className="text-white/80 text-sm">
                  {currentUser.experience}/{getExperienceForNextLevel()}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getExperienceProgress()}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-white/80">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{t('profile.joinedAt')}: {currentUser.joinedAt.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-white/80">
                <Users className="h-5 w-5 mr-2" />
                <span>Son Aktif: {currentUser.lastActive.toLocaleDateString()}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center"
            >
              <Edit className="h-5 w-5 mr-2" />
              {t('profile.editProfile')}
            </button>
          </div>

          {currentUser.socialMedia && (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('profile.socialMedia')}</h3>
              <div className="space-y-3">
                {currentUser.socialMedia.discord && (
                  <div className="flex items-center text-white/80">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{currentUser.socialMedia.discord}</span>
                  </div>
                )}
                {currentUser.socialMedia.twitter && (
                  <div className="flex items-center text-white/80">
                    <Twitter className="h-5 w-5 mr-2" />
                    <span>{currentUser.socialMedia.twitter}</span>
                  </div>
                )}
                {currentUser.socialMedia.instagram && (
                  <div className="flex items-center text-white/80">
                    <Instagram className="h-5 w-5 mr-2" />
                    <span>{currentUser.socialMedia.instagram}</span>
                  </div>
                )}
                {currentUser.socialMedia.youtube && (
                  <div className="flex items-center text-white/80">
                    <Youtube className="h-5 w-5 mr-2" />
                    <span>{currentUser.socialMedia.youtube}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
              {t('profile.titles')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.titles.map((title, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                  <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-medium">{title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Star className="h-6 w-6 mr-2 text-purple-400" />
              {t('profile.cards')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentUser.cards.map((card) => (
                <div key={card.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className={`${rarityColors[card.rarity]} rounded-lg p-3 mb-3`}>
                    <div className="w-full h-32 bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{card.name}</span>
                    </div>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{card.name}</h4>
                  <p className="text-white/60 text-sm mb-2">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${rarityColors[card.rarity]} text-white`}>
                      {card.rarity}
                    </span>
                    <span className="text-white/40 text-xs">
                      {card.unlockedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-md border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">{t('profile.editProfile')}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Profil Resmi URL
                </label>
                <input
                  type="url"
                  value={editForm.profileImage}
                  onChange={(e) => setEditForm({...editForm, profileImage: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/profile.jpg"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Discord
                </label>
                <input
                  type="text"
                  value={editForm.socialMedia.discord}
                  onChange={(e) => setEditForm({
                    ...editForm, 
                    socialMedia: {...editForm.socialMedia, discord: e.target.value}
                  })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Discord#1234"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Twitter
                </label>
                <input
                  type="text"
                  value={editForm.socialMedia.twitter}
                  onChange={(e) => setEditForm({
                    ...editForm, 
                    socialMedia: {...editForm.socialMedia, twitter: e.target.value}
                  })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="@username"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    // Save profile changes
                    setIsEditing(false);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  {t('common.save')}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};