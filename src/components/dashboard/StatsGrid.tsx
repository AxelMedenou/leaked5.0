import React from 'react';
import { DollarSign, Eye, Package, Video } from 'lucide-react';
import Card from '../ui/Card';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface StatsGridProps {
  stats: {
    totalEpisodes: number;
    stockValue: number;
    videoViews: string;
    revenue: number;
    episodeChange: string;
    stockChange: string;
    viewsChange: string;
    revenueChange: string;
  };
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    { 
      label: 'Total Episodes', 
      value: stats.totalEpisodes.toString(), 
      change: stats.episodeChange, 
      icon: Video 
    },
    { 
      label: 'Stock Value', 
      value: formatCurrency(stats.stockValue), 
      change: stats.stockChange, 
      icon: Package 
    },
    { 
      label: 'Video Views', 
      value: stats.videoViews, 
      change: stats.viewsChange, 
      icon: Eye 
    },
    { 
      label: 'Revenue', 
      value: formatCurrency(stats.revenue), 
      change: stats.revenueChange, 
      icon: DollarSign 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <Card key={index} hover className="p-6">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="w-8 h-8 text-white/80" />
            <div className="text-right">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-white/60 font-medium">{stat.label}</div>
            </div>
          </div>
          <div className="text-xs text-white/50 font-medium">{stat.change}</div>
        </Card>
      ))}
    </div>
  );
}