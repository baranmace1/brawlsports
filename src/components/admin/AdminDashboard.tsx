import React, { useState, useEffect } from 'react';
import { Crown, Users, FileText, Target, Ban, Plus, Edit, Trash2, Coins } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { User, MetaPost, TacticPost } from '../../types/User';
import { getUsers, banUser, unbanUser, createMetaPost, createTacticPost, getMetaPosts, getTacticPosts, setUserPoints } from '../../utils/database';

interface AdminDashboardProps {
  currentUser: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [metaPosts, setMetaPosts] = useState<MetaPost[]>([]);
  const [tacticPosts, setTacticPosts] = useState<TacticPost[]>([]);
  const [showNewMeta, setShowNewMeta] = useState(false);
  const [showNewTactic, setShowNewTactic] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [pointsAmount, setPointsAmount] = useState('');

  const [newMeta, setNewMeta] = useState({
    title: '',
    content: '',
    season: '',
    brawlers: [] as string[],
  });

  const [newTactic, setNewTactic] = useState({
    title: '',
    content: '',
    gameMode: '',
    map: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
  });

  useEffect(() => {
    setUsers(getUsers());
    setMetaPosts(getMetaPosts());
    setTacticPosts(getTacticPosts());
  }, []);

  const handleBanUser = (userId: string) => {
    banUser(userId);
    setUsers(getUsers());
  };

  const handleUnbanUser = (userId: string) => {
    unbanUser(userId);
    setUsers(getUsers());
  };

  const handleCreateMeta = () => {
    const meta = createMetaPost(
      newMeta.title,
      newMeta.content,
      currentUser.id,
      currentUser.username,
      newMeta.season,
      newMeta.brawlers
    );
    setMetaPosts([meta, ...metaPosts]);
    setNewMeta({ title: '', content: '', season: '', brawlers: [] });
    setShowNewMeta(false);
  };

  const handleCreateTactic = () => {
    const tactic = createTacticPost(
      newTactic.title,
      newTactic.content,
      currentUser.id,
      currentUser.username,
      newTactic.gameMode,
      newTactic.map,
      newTactic.difficulty
    );
    setTacticPosts([tactic, ...tacticPosts]);
    setNewTactic({ title: '', content: '', gameMode: '', map: '', difficulty: 'beginner' });
    setShowNewTactic(false);
  };

  const handleUpdatePoints = () => {
    if (!selectedUser || !pointsAmount) return;
    
    const points = parseInt(pointsAmount);
    if (isNaN(points)) return;

    setUserPoints(selectedUser.id, points);
    setUsers(getUsers());
    setShowPointsModal(false);
    setSelectedUser(null);
    setPointsAmount('');
  };

  const tabs = [
    { id: 'users', label: t('admin.userManagement'), icon: Users },
    { id: 'meta', label: t('admin.metaManagement'), icon: FileText },
    { id: 'tactics', label: t('admin.tacticManagement'), icon: Target },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Crown className="h-8 w-8 mr-3 text-yellow-400" />
          {t('admin.title')}
        </h1>
      </div>

      <div className="flex space-x-1 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">{t('admin.userManagement')}</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.username}</p>
                    <p className="text-white/60 text-sm">
                      {t('profile.level')} {user.level} • {user.experience} XP • {user.points || 0} Puan
                    </p>
                  </div>
                  {user.isAdmin && (
                    <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                      Admin
                    </div>
                  )}
                  {user.isBanned && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Banned
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setPointsAmount(user.points?.toString() || '0');
                      setShowPointsModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
                  >
                    <Coins className="h-4 w-4 mr-1" />
                    Puan
                  </button>
                  {!user.isAdmin && (
                    <button
                      onClick={() => user.isBanned ? handleUnbanUser(user.id) : handleBanUser(user.id)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        user.isBanned
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {user.isBanned ? t('admin.unbanUser') : t('admin.banUser')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'meta' && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{t('admin.metaManagement')}</h2>
            <button
              onClick={() => setShowNewMeta(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.newMeta')}
            </button>
          </div>
          <div className="space-y-4">
            {metaPosts.map((post) => (
              <div key={post.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{post.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{post.content.substring(0, 200)}...</p>
                    <div className="flex items-center space-x-4 text-xs text-white/40">
                      <span>Sezon: {post.season}</span>
                      <span>Brawler: {post.brawlers.join(', ')}</span>
                      <span>{post.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tactics' && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{t('admin.tacticManagement')}</h2>
            <button
              onClick={() => setShowNewTactic(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.newTactic')}
            </button>
          </div>
          <div className="space-y-4">
            {tacticPosts.map((post) => (
              <div key={post.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{post.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{post.content.substring(0, 200)}...</p>
                    <div className="flex items-center space-x-4 text-xs text-white/40">
                      <span>Mod: {post.gameMode}</span>
                      <span>Harita: {post.map}</span>
                      <span className={`px-2 py-1 rounded ${
                        post.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        post.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {post.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Puan Yönetimi Modal */}
      {showPointsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-md border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Puan Yönetimi</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Kullanıcı: {selectedUser.username}
                </label>
                <p className="text-white/60 text-sm">
                  Mevcut Puan: {selectedUser.points || 0}
                </p>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Yeni Puan Miktarı
                </label>
                <input
                  type="number"
                  value={pointsAmount}
                  onChange={(e) => setPointsAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Puan miktarı"
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleUpdatePoints}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Güncelle
                </button>
                <button
                  onClick={() => {
                    setShowPointsModal(false);
                    setSelectedUser(null);
                    setPointsAmount('');
                  }}
                  className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewMeta && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">{t('admin.newMeta')}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={newMeta.title}
                  onChange={(e) => setNewMeta({...newMeta, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Meta başlığı"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Sezon</label>
                <input
                  type="text"
                  value={newMeta.season}
                  onChange={(e) => setNewMeta({...newMeta, season: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Sezon 25"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">İçerik</label>
                <textarea
                  value={newMeta.content}
                  onChange={(e) => setNewMeta({...newMeta, content: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Meta detayları"
                  rows={6}
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCreateMeta}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Yayınla
                </button>
                <button
                  onClick={() => setShowNewMeta(false)}
                  className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewTactic && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">{t('admin.newTactic')}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={newTactic.title}
                  onChange={(e) => setNewTactic({...newTactic, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Taktik başlığı"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Oyun Modu</label>
                  <input
                    type="text"
                    value={newTactic.gameMode}
                    onChange={(e) => setNewTactic({...newTactic, gameMode: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Gem Grab"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Harita</label>
                  <input
                    type="text"
                    value={newTactic.map}
                    onChange={(e) => setNewTactic({...newTactic, map: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Hard Rock Mine"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Zorluk</label>
                <select
                  value={newTactic.difficulty}
                  onChange={(e) => setNewTactic({...newTactic, difficulty: e.target.value as any})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="beginner" className="bg-gray-800">Başlangıç</option>
                  <option value="intermediate" className="bg-gray-800">Orta</option>
                  <option value="advanced" className="bg-gray-800">İleri</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">İçerik</label>
                <textarea
                  value={newTactic.content}
                  onChange={(e) => setNewTactic({...newTactic, content: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Taktik detayları"
                  rows={6}
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCreateTactic}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Yayınla
                </button>
                <button
                  onClick={() => setShowNewTactic(false)}
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