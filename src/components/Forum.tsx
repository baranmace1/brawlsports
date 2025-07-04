import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Heart, Reply, Pin, Filter, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Post } from '../types/User';
import { getPosts, createPost, addReply, likePost } from '../utils/database';

interface ForumProps {
  currentUser: User | null;
}

export const Forum: React.FC<ForumProps> = ({ currentUser }) => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const categories = [
    { id: 'all', name: 'Tümü', color: 'bg-gray-500' },
    { id: 'meta', name: t('forum.meta'), color: 'bg-purple-500' },
    { id: 'tactics', name: t('forum.tactics'), color: 'bg-blue-500' },
    { id: 'general', name: t('forum.general'), color: 'bg-green-500' },
    { id: 'esports', name: t('forum.esports'), color: 'bg-red-500' },
  ];

  useEffect(() => {
    const allPosts = getPosts();
    const filteredPosts = selectedCategory === 'all' 
      ? allPosts 
      : allPosts.filter(post => post.category === selectedCategory);
    setPosts(filteredPosts);
  }, [selectedCategory]);

  const handleCreatePost = () => {
    if (!currentUser || !newPostTitle || !newPostContent) return;

    const newPost = createPost(
      newPostTitle,
      newPostContent,
      currentUser.id,
      currentUser.username,
      newPostCategory
    );

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('general');
    setShowNewPost(false);
  };

  const handleReply = (postId: string) => {
    if (!currentUser || !replyContent) return;

    const updatedPost = addReply(postId, replyContent, currentUser.id, currentUser.username);
    if (updatedPost) {
      setPosts(posts.map(p => p.id === postId ? updatedPost : p));
      setSelectedPost(updatedPost);
      setReplyContent('');
    }
  };

  const handleLike = (postId: string) => {
    if (!currentUser) return;

    const updatedPost = likePost(postId);
    if (updatedPost) {
      setPosts(posts.map(p => p.id === postId ? updatedPost : p));
      if (selectedPost?.id === postId) {
        setSelectedPost(updatedPost);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <MessageSquare className="h-8 w-8 mr-3 text-purple-400" />
          {t('forum.title')}
        </h1>
        {currentUser && (
          <button
            onClick={() => setShowNewPost(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('forum.newPost')}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? `${category.color} text-white`
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {post.isPinned && <Pin className="h-5 w-5 text-yellow-400" />}
                    <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    categories.find(c => c.id === post.category)?.color || 'bg-gray-500'
                  } text-white`}>
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                </div>

                <p className="text-white/80 mb-4 line-clamp-3">{post.content}</p>

                <div className="flex items-center justify-between text-sm text-white/60">
                  <div className="flex items-center space-x-4">
                    <span>{post.authorName}</span>
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                      className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <Reply className="h-4 w-4" />
                      <span>{post.replies.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedPost && (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 sticky top-24">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{selectedPost.title}</h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-white/80 mb-4">{selectedPost.content}</p>

              <div className="flex items-center justify-between text-sm text-white/60 mb-6">
                <span>{selectedPost.authorName}</span>
                <span>{selectedPost.createdAt.toLocaleDateString()}</span>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-white">
                  {t('forum.replies')} ({selectedPost.replies.length})
                </h4>
                {selectedPost.replies.map((reply) => (
                  <div key={reply.id} className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/80 mb-2">{reply.content}</p>
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>{reply.authorName}</span>
                      <span>{reply.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {currentUser && (
                <div className="space-y-4">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={t('forum.reply')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <button
                    onClick={() => handleReply(selectedPost.id)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    {t('forum.reply')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showNewPost && currentUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 w-full max-w-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{t('forum.newPost')}</h2>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('forum.postTitle')}
                </label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={t('forum.postTitle')}
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('forum.category')}
                </label>
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id} className="bg-gray-800">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  {t('forum.content')}
                </label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder={t('forum.content')}
                  rows={6}
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCreatePost}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  {t('forum.submit')}
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
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