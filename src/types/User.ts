export interface User {
  id: string;
  username: string;
  email?: string;
  password: string;
  level: number;
  experience: number;
  points?: number;
  isAdmin: boolean;
  isBanned: boolean;
  profileImage?: string;
  socialMedia?: {
    discord?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  titles: string[];
  cards: UserCard[];
  joinedAt: Date;
  lastActive: Date;
}

export interface UserCard {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  description: string;
  unlockedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  replies: Reply[];
  isPinned: boolean;
}

export interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  likes: number;
}

export interface MetaPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  season: string;
  brawlers: string[];
}

export interface TacticPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  gameMode: string;
  map: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}