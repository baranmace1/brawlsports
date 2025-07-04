import React, { useState, useEffect } from 'react';
import { Trophy, Target, Users, TrendingUp, Star, Zap, Eye, MessageCircle, Twitter, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MetaPost, TacticPost, User } from '../types/User';
import { getMetaPosts, getTacticPosts, getTopUsers } from '../utils/database';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [metaPosts, setMetaPosts] = useState<MetaPost[]>([]);
  const [tacticPosts, setTacticPosts] = useState<TacticPost[]>([]);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [selectedMeta, setSelectedMeta] = useState<MetaPost | null>(null);
  const [metaComment, setMetaComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    setMetaPosts(getMetaPosts().slice(0, 3));
    setTacticPosts(getTacticPosts().slice(0, 3));
    setTopUsers(getTopUsers().slice(0, 5));
  }, []);

  const handleMetaComment = () => {
    if (!metaComment.trim()) return;
    
    const newComment = {
      id: Date.now().toString(),
      content: metaComment,
      author: 'Misafir',
      createdAt: new Date(),
    };
    
    setComments([...comments, newComment]);
    setMetaComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4">
          {t('dashboard.welcome')}
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
          {t('dashboard.description')}
        </p>
        <a
          href="https://dsc.gg/brawlsports"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          <Zap className="h-5 w-5 mr-2" />
          {t('dashboard.joinDiscord')}
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400" />
            {t('dashboard.latestMeta')}
          </h3>
          <div className="space-y-3">
            {metaPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors group"
                onClick={() => setSelectedMeta(post)}
              >
                <h4 className="font-semibold text-white mb-2 flex items-center justify-between">
                  {post.title}
                  <Eye className="h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-white/60 text-sm mb-2">{post.content.substring(0, 100)}...</p>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{post.season}</span>
                  <span>{post.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-400" />
            {t('dashboard.latestTactics')}
          </h3>
          <div className="space-y-3">
            {tacticPosts.map((post) => (
              <div key={post.id} className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{post.title}</h4>
                <p className="text-white/60 text-sm mb-2">{post.content.substring(0, 100)}...</p>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{post.gameMode}</span>
                  <span className={`px-2 py-1 rounded ${
                    post.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                    post.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {post.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
            {t('dashboard.topPlayers')}
          </h3>
          <div className="space-y-3">
            {topUsers.map((user, index) => (
              <div key={user.id} className="bg-white/5 rounded-lg p-4 flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-amber-600' :
                    'bg-purple-500'
                  }`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{user.username}</p>
                  <p className="text-white/60 text-sm">{t('profile.level')} {user.level}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-semibold">{user.points || 0} Puan</p>
                  <p className="text-white/60 text-sm">{user.experience} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* X (Twitter) Gönderileri Ayrı Bölüm */}
      <div className="mt-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Twitter className="h-5 w-5 mr-2 text-blue-400" />
            X (Twitter) Gönderileri - @Brawl_Sports1
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border-l-4 border-blue-400">
              <p className="text-white/80 text-sm mb-3">
                🎮 Brawl Sports topluluğumuz büyümeye devam ediyor! Yeni üyelerimizi aramızda görmekten mutluyuz. Discord sunucumuzda aktif olmayı unutmayın! #BrawlStars #Esports
              </p>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>@Brawl_Sports1</span>
                <span>2 saat önce</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border-l-4 border-purple-400">
              <p className="text-white/80 text-sm mb-3">
                📊 Sezon 25 meta analizi yakında yayınlanacak! Hangi brawlerların güçleneceğini merak ediyorsanız takipte kalın. Spike ve Leon'un durumu nasıl olacak? 🤔
              </p>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>@Brawl_Sports1</span>
                <span>5 saat önce</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border-l-4 border-yellow-400">
              <p className="text-white/80 text-sm mb-3">
                🏆 Bu hafta sonu Discord sunucumuzda büyük turnuva! Ödül havuzu 50.000 puan! Katılmak için Discord'a katılın ve kayıt olun. #Tournament #BrawlSports
              </p>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>@Brawl_Sports1</span>
                <span>1 gün önce</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <a
              href="https://x.com/Brawl_Sports1?t=FoRulj1awA933kKADp1Qww&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Twitter className="h-5 w-5 mr-2" />
              Tüm Gönderileri Gör
            </a>
          </div>
        </div>
      </div>

      {/* Meta Detay Modal */}
      {selectedMeta && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedMeta.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span>👤 {selectedMeta.authorName}</span>
                  <span>📅 {selectedMeta.season}</span>
                  <span>🕒 {selectedMeta.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMeta(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed text-lg">{selectedMeta.content}</p>
              </div>
            </div>

            {selectedMeta.brawlers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  ⭐ Önerilen Brawlerlar
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedMeta.brawlers.map((brawler, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30"
                    >
                      🎯 {brawler}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-white/20 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Yorumlar ({comments.length + 1})
              </h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {/* Varsayılan yorum */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium flex items-center">
                      👑 admin
                      <span className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">Admin</span>
                    </span>
                    <span className="text-white/40 text-sm">2 saat önce</span>
                  </div>
                  <p className="text-white/80">Bu meta analizi gerçekten çok faydalı! Özellikle Spike'ın güçlenmesi hakkındaki bilgiler çok değerli. Teşekkürler! 🎯</p>
                </div>

                {/* Kullanıcı yorumları */}
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">👤 {comment.author}</span>
                      <span className="text-white/40 text-sm">{comment.createdAt.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-white/80">{comment.content}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <textarea
                  value={metaComment}
                  onChange={(e) => setMetaComment(e.target.value)}
                  placeholder="Meta hakkında düşüncelerinizi paylaşın..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  onClick={handleMetaComment}
                  disabled={!metaComment.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💬 Yorum Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};