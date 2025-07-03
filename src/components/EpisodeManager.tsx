import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useEpisodes } from '../hooks/useEpisodes';
import { Episode } from '../types';
import EpisodeCreationForm from './EpisodeCreationForm';
import EpisodeCard from './episodes/EpisodeCard';
import EpisodeDetails from './episodes/EpisodeDetails';
import Button from './ui/Button';
import Card from './ui/Card';
import LoadingSpinner from './ui/LoadingSpinner';

interface EpisodeManagerProps {
  selectedEpisodeId: string | null;
  onEpisodeSelect: (episodeId: string | null) => void;
}

export default function EpisodeManager({ selectedEpisodeId, onEpisodeSelect }: EpisodeManagerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const { episodes, loading, error, createEpisode } = useEpisodes();

  const selectedEpisode = episodes.find(ep => ep.id === selectedEpisodeId);

  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.concept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || episode.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateEpisode = async (episodeData: Omit<Episode, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createEpisode(episodeData);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create episode:', error);
    }
  };

  if (selectedEpisode) {
    return (
      <EpisodeDetails 
        episode={selectedEpisode}
        onBack={() => onEpisodeSelect(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black tracking-wider mb-2">EPISODE MANAGER</h1>
            <p className="text-white/60">Create, manage, and track your brand episodes</p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4" />
            NEW EPISODE
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search episodes..."
              className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg pl-10 pr-8 py-3 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="production">Production</option>
              <option value="marketing">Marketing</option>
              <option value="launched">Launched</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Episodes Grid */}
      {loading ? (
        <Card className="p-12 text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-white/60">Loading episodes...</p>
        </Card>
      ) : error ? (
        <Card className="p-12 text-center">
          <p className="text-red-400 mb-4">Error loading episodes: {error}</p>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Card>
      ) : filteredEpisodes.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-white/60 mb-4">
            {searchTerm || statusFilter !== 'all' ? 'No episodes match your filters' : 'No episodes created yet'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4" />
              Create Your First Episode
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              onClick={() => onEpisodeSelect(episode.id)}
            />
          ))}
        </div>
      )}

      {/* Create Episode Form */}
      {showCreateForm && (
        <EpisodeCreationForm
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateEpisode}
        />
      )}
    </div>
  );
}