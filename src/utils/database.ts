import { User, Post, Reply, MetaPost, TacticPost, UserCard } from '../types/User';

const STORAGE_KEYS = {
  USERS: 'brawl_sports_users',
  POSTS: 'brawl_sports_posts',
  META_POSTS: 'brawl_sports_meta_posts',
  TACTIC_POSTS: 'brawl_sports_tactic_posts',
};

export const initializeApp = () => {
  // Initialize with default admin accounts
  const existingUsers = getUsers();
  
  if (existingUsers.length === 0) {
    // Create first admin account
    const admin1: User = {
      id: 'admin1',
      username: 'admin',
      password: 'baran25brawl',
      level: 50,
      experience: 50000,
      points: 100000,
      isAdmin: true,
      isBanned: false,
      titles: ['Admin', 'Kurucu', 'Meta Uzmanı'],
      cards: generateDefaultCards(),
      joinedAt: new Date(),
      lastActive: new Date(),
      socialMedia: {
        discord: 'admin#1234',
        twitter: '@brawlsports',
      },
    };

    // Create second admin account
    const admin2: User = {
      id: 'admin2',
      username: 'moderator',
      password: 'brawl2024',
      level: 45,
      experience: 45000,
      points: 75000,
      isAdmin: true,
      isBanned: false,
      titles: ['Moderator', 'Taktik Uzmanı', 'Esports Koçu'],
      cards: generateDefaultCards(),
      joinedAt: new Date(),
      lastActive: new Date(),
      socialMedia: {
        discord: 'moderator#5678',
      },
    };

    const users = [admin1, admin2];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Create some sample posts
    const samplePosts: Post[] = [
      {
        id: '1',
        title: 'Sezon 25 Meta Analizi',
        content: 'Yeni sezonla birlikte meta değişiklikleri ve en güçlü brawler kombinasyonları hakkında detaylı analiz.',
        authorId: 'admin1',
        authorName: 'admin',
        category: 'meta',
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 15,
        replies: [],
        isPinned: true,
      },
      {
        id: '2',
        title: 'Gem Grab Taktikleri',
        content: 'Gem Grab modunda başarılı olmak için temel taktikler ve pozisyonlama ipuçları.',
        authorId: 'admin2',
        authorName: 'moderator',
        category: 'tactics',
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 12,
        replies: [],
        isPinned: false,
      },
    ];

    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(samplePosts));

    // Create sample meta posts
    const sampleMetaPosts: MetaPost[] = [
      {
        id: '1',
        title: 'Sezon 25 En İyi Brawler Sıralaması',
        content: 'Yeni sezonla birlikte güçlenen ve zayıflayan brawlerların detaylı analizi. Bu sezon özellikle tank brawlerlar güçlenirken, uzun menzilli brawlerlar biraz zayıfladı. Spike, Leon ve Crow gibi brawlerlar meta\'da öne çıkıyor.',
        authorId: 'admin1',
        authorName: 'admin',
        createdAt: new Date(),
        season: 'Sezon 25',
        brawlers: ['Spike', 'Leon', 'Crow', 'Sandy'],
      },
      {
        id: '2',
        title: 'Yeni Harita Rotasyonu Analizi',
        content: 'Bu hafta gelen yeni haritalar ve bu haritalarda hangi brawlerların daha etkili olduğu hakkında detaylı inceleme.',
        authorId: 'admin2',
        authorName: 'moderator',
        createdAt: new Date(),
        season: 'Sezon 25',
        brawlers: ['Mortis', 'Dynamike', 'Barley'],
      },
    ];

    localStorage.setItem(STORAGE_KEYS.META_POSTS, JSON.stringify(sampleMetaPosts));

    // Create sample tactic posts
    const sampleTacticPosts: TacticPost[] = [
      {
        id: '1',
        title: 'Showdown Hayatta Kalma Rehberi',
        content: 'Solo Showdown modunda son 3\'e kalma stratejileri ve harita analizi.',
        authorId: 'admin2',
        authorName: 'moderator',
        createdAt: new Date(),
        gameMode: 'Showdown',
        map: 'Cavern Churn',
        difficulty: 'intermediate',
      },
    ];

    localStorage.setItem(STORAGE_KEYS.TACTIC_POSTS, JSON.stringify(sampleTacticPosts));
  }
};

const generateDefaultCards = (): UserCard[] => {
  return [
    {
      id: '1',
      name: 'Brawl Stars Ustası',
      rarity: 'legendary',
      image: '',
      description: 'Tüm brawlerleri ustaca kullanabilen oyuncu',
      unlockedAt: new Date(),
    },
    {
      id: '2',
      name: 'Meta Takipçisi',
      rarity: 'epic',
      image: '',
      description: 'Meta değişikliklerini yakından takip eden oyuncu',
      unlockedAt: new Date(),
    },
    {
      id: '3',
      name: 'Topluluk Lideri',
      rarity: 'rare',
      image: '',
      description: 'Toplulukta aktif olan ve katkıda bulunan oyuncu',
      unlockedAt: new Date(),
    },
  ];
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users).map((user: any) => ({
    ...user,
    joinedAt: new Date(user.joinedAt),
    lastActive: new Date(user.lastActive),
    points: user.points || 0,
    cards: user.cards?.map((card: any) => ({
      ...card,
      unlockedAt: new Date(card.unlockedAt),
    })) || [],
  })) : [];
};

export const getUserById = (id: string): User | null => {
  const users = getUsers();
  return users.find(user => user.id === id) || null;
};

export const authenticateUser = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
};

export const createUser = (username: string, password: string): User | null => {
  const users = getUsers();
  
  // Check if username already exists
  if (users.some(u => u.username === username)) {
    return null;
  }

  const newUser: User = {
    id: Date.now().toString(),
    username,
    password,
    level: 1,
    experience: 0,
    points: 0,
    isAdmin: false,
    isBanned: false,
    titles: ['Yeni Üye'],
    cards: [
      {
        id: '1',
        name: 'Başlangıç Kartı',
        rarity: 'common',
        image: '',
        description: 'İlk adımınızı attığınızı gösteren özel kart',
        unlockedAt: new Date(),
      },
    ],
    joinedAt: new Date(),
    lastActive: new Date(),
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return newUser;
};

export const updateUserPoints = (userId: string, points: number): User | null => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;

  users[userIndex].points = (users[userIndex].points || 0) + points;
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return users[userIndex];
};

export const setUserPoints = (userId: string, points: number): User | null => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;

  users[userIndex].points = points;
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return users[userIndex];
};

export const banUser = (userId: string): void => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].isBanned = true;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};

export const unbanUser = (userId: string): void => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].isBanned = false;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};

export const getTopUsers = (): User[] => {
  const users = getUsers();
  return users
    .filter(user => !user.isBanned)
    .sort((a, b) => (b.points || 0) - (a.points || 0))
    .slice(0, 10);
};

export const getPosts = (): Post[] => {
  const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
  return posts ? JSON.parse(posts).map((post: any) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    replies: post.replies?.map((reply: any) => ({
      ...reply,
      createdAt: new Date(reply.createdAt),
    })) || [],
  })) : [];
};

export const createPost = (
  title: string,
  content: string,
  authorId: string,
  authorName: string,
  category: string
): Post => {
  const posts = getPosts();
  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content,
    authorId,
    authorName,
    category,
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    replies: [],
    isPinned: false,
  };

  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  
  // Forum katılımı için 5000 puan ekle
  updateUserPoints(authorId, 5000);
  
  return newPost;
};

export const addReply = (
  postId: string,
  content: string,
  authorId: string,
  authorName: string
): Post | null => {
  const posts = getPosts();
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) return null;

  const newReply: Reply = {
    id: Date.now().toString(),
    content,
    authorId,
    authorName,
    createdAt: new Date(),
    likes: 0,
  };

  posts[postIndex].replies.push(newReply);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  return posts[postIndex];
};

export const likePost = (postId: string): Post | null => {
  const posts = getPosts();
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) return null;

  posts[postIndex].likes++;
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  return posts[postIndex];
};

export const getMetaPosts = (): MetaPost[] => {
  const posts = localStorage.getItem(STORAGE_KEYS.META_POSTS);
  return posts ? JSON.parse(posts).map((post: any) => ({
    ...post,
    createdAt: new Date(post.createdAt),
  })) : [];
};

export const createMetaPost = (
  title: string,
  content: string,
  authorId: string,
  authorName: string,
  season: string,
  brawlers: string[]
): MetaPost => {
  const posts = getMetaPosts();
  const newPost: MetaPost = {
    id: Date.now().toString(),
    title,
    content,
    authorId,
    authorName,
    createdAt: new Date(),
    season,
    brawlers,
  };

  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEYS.META_POSTS, JSON.stringify(posts));
  return newPost;
};

export const getTacticPosts = (): TacticPost[] => {
  const posts = localStorage.getItem(STORAGE_KEYS.TACTIC_POSTS);
  return posts ? JSON.parse(posts).map((post: any) => ({
    ...post,
    createdAt: new Date(post.createdAt),
  })) : [];
};

export const createTacticPost = (
  title: string,
  content: string,
  authorId: string,
  authorName: string,
  gameMode: string,
  map: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): TacticPost => {
  const posts = getTacticPosts();
  const newPost: TacticPost = {
    id: Date.now().toString(),
    title,
    content,
    authorId,
    authorName,
    createdAt: new Date(),
    gameMode,
    map,
    difficulty,
  };

  posts.unshift(newPost);
  localStorage.setItem(STORAGE_KEYS.TACTIC_POSTS, JSON.stringify(posts));
  return newPost;
};