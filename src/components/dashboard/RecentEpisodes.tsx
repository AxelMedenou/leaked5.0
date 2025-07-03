import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Episode } from '../../types';
import { formatDate, getStatusColor } from '../../utils/formatters';

interface RecentEpisodesProps {
  episodes: Episode[];
  onEpisodeClick: (episodeId: string) => void;
  onManageClick: () => void;
}

export default function RecentEpisodes({ episodes, onEpisodeClick, onManageClick }: RecentEpisodesProps) {
  const recentEpisodes = episodes.slice(0, 3);

  const handleEpisodeClick = (episodeId: string) => {
    console.log('Recent episode clicked:', episodeId);
    onEpisodeClick(episodeId);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black tracking-wide">RECENT EPISODES</h2>
        <Button onClick={onManageClick} size="sm">
          MANAGE
        </Button>
      </div>
      <div className="space-y-4">
        {recentEpisodes.map((episode) => (
          <div 
            key={episode.id} 
            onClick={() => handleEpisodeClick(episode.id)}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div>
              <div className="font-bold text-white text-sm">{episode.name}</div>
              <div className="text-white/60 text-xs">{formatDate(episode.startDate)}</div>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-sm font-medium">{episode.views || '0'}</div>
              <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(episode.status)}`}>
                {episode.status.charAt(0).toUpperCase() + episode.status.slice(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}