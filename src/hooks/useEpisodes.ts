import { useState, useEffect } from 'react';
import { Episode } from '../types';
import { episodeService } from '../services/episodeService';

export function useEpisodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEpisodes();
  }, []);

  const loadEpisodes = async () => {
    try {
      setLoading(true);
      const data = await episodeService.getAll();
      setEpisodes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load episodes');
    } finally {
      setLoading(false);
    }
  };

  const createEpisode = async (episodeData: Omit<Episode, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newEpisode = await episodeService.create(episodeData);
      setEpisodes(prev => [newEpisode, ...prev]);
      return newEpisode;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create episode');
      throw err;
    }
  };

  const updateEpisode = async (id: string, updates: Partial<Episode>) => {
    try {
      const updatedEpisode = await episodeService.update(id, updates);
      setEpisodes(prev => prev.map(ep => ep.id === id ? updatedEpisode : ep));
      return updatedEpisode;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update episode');
      throw err;
    }
  };

  const deleteEpisode = async (id: string) => {
    try {
      await episodeService.delete(id);
      setEpisodes(prev => prev.filter(ep => ep.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete episode');
      throw err;
    }
  };

  return {
    episodes,
    loading,
    error,
    createEpisode,
    updateEpisode,
    deleteEpisode,
    refetch: loadEpisodes
  };
}