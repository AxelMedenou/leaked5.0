import React from 'react';
import { Calendar, DollarSign, Users, Package } from 'lucide-react';
import { Episode } from '../../types';
import Card from '../ui/Card';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/formatters';

interface EpisodeCardProps {
  episode: Episode;
  onClick: () => void;
}

export default function EpisodeCard({ episode, onClick }: EpisodeCardProps) {
  const completedTasks = episode.tasks.filter(task => task.status === 'completed').length;
  const totalTasks = episode.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Episode card clicked:', episode.id, episode.name);
    onClick();
  };

  return (
    <div 
      onClick={handleClick}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
      <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl hover:border-white/30 transition-all duration-300 p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-black text-white mb-1 line-clamp-2">{episode.name}</h3>
              <p className="text-white/60 text-sm line-clamp-2">{episode.concept}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold ml-3 ${getStatusColor(episode.status)}`}>
              {episode.status.toUpperCase()}
            </div>
          </div>

          {/* Progress Bar */}
          {totalTasks > 0 && (
            <div>
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Progress</span>
                <span>{completedTasks}/{totalTasks} tasks</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center space-x-2 text-white/60">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(episode.launchDate)}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <DollarSign className="w-3 h-3" />
              <span>{formatCurrency(episode.targetRevenue)}</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <Users className="w-3 h-3" />
              <span>{episode.teamMembers.length} members</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <Package className="w-3 h-3" />
              <span>{episode.products.length} products</span>
            </div>
          </div>

          {/* Revenue Progress */}
          {episode.actualRevenue && (
            <div>
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Revenue</span>
                <span>{formatCurrency(episode.actualRevenue)} / {formatCurrency(episode.targetRevenue)}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((episode.actualRevenue / episode.targetRevenue) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}