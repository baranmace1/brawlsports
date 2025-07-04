import React from 'react';
import { MessageCircle, Users, Trophy, Target, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const DiscordRedirect: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: MessageCircle,
      title: t('discord.feature1'),
      description: 'Güncel meta analizleri ve oyuncu deneyimleri',
    },
    {
      icon: Trophy,
      title: t('discord.feature2'),
      description: 'Her gün farklı kategorilerde turnuvalar',
    },
    {
      icon: Target,
      title: t('discord.feature3'),
      description: 'Deneyimli oyunculardan öğrenin',
    },
    {
      icon: Users,
      title: t('discord.feature4'),
      description: 'Pro oyunculardan bireysel eğitim alın',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-6">
            <MessageCircle className="h-16 w-16 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
          {t('discord.title')}
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
          {t('discord.description')}
        </p>
        <a
          href="https://dsc.gg/brawlsports"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          <Zap className="h-6 w-6 mr-3" />
          {t('discord.join')}
          <ArrowRight className="h-6 w-6 ml-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 mr-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            </div>
            <p className="text-white/80">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Bizi Takip Edin</h2>
        <p className="text-white/80 mb-6">
          Brawl Sports topluluğunun en yeni gelişmelerini kaçırmayın!
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://dsc.gg/brawlsports"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Discord
          </a>
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            YouTube
          </a>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-8 border border-purple-500/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Hazır mısınız?</h2>
          <p className="text-white/80 mb-6">
            Brawl Sports ailesine katılın ve esports yolculuğunuza başlayın!
          </p>
          <a
            href="https://dsc.gg/brawlsports"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="h-6 w-6 mr-3" />
            Şimdi Katıl
            <ArrowRight className="h-6 w-6 ml-3" />
          </a>
        </div>
      </div>
    </div>
  );
};