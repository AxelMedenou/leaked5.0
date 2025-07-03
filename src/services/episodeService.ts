import { Episode } from '../types';

// Mock data service - in production this would connect to a real API
class EpisodeService {
  private storageKey = 'leaked_episodes';

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getStoredEpisodes(): Episode[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : this.getDefaultEpisodes();
    } catch {
      return this.getDefaultEpisodes();
    }
  }

  private saveEpisodes(episodes: Episode[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(episodes));
  }

  private getDefaultEpisodes(): Episode[] {
    return [
      {
        id: '1',
        name: 'Episode 12: Winter Drop',
        concept: 'Winter-themed streetwear collection featuring cozy hoodies and thermal wear',
        status: 'launched',
        startDate: '2024-01-01',
        launchDate: '2024-01-15',
        budget: 15000,
        targetRevenue: 45000,
        actualRevenue: 38500,
        views: '125K',
        teamMembers: [
          { id: '1', name: 'Alex Chen', role: 'Creative Director' },
          { id: '2', name: 'Sarah Kim', role: 'Production Manager' }
        ],
        products: [
          {
            id: '1',
            name: 'Winter Hoodie',
            variants: ['S', 'M', 'L', 'XL'],
            quantity: 200,
            cost: 35,
            price: 89,
            sold: 180
          }
        ],
        tasks: [
          {
            id: '1',
            title: 'Design winter graphics',
            category: 'design',
            status: 'completed',
            dueDate: '2024-01-05',
            createdAt: '2024-01-01',
            completedAt: '2024-01-04'
          }
        ],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Episode 11: Street Essentials',
        concept: 'Core streetwear pieces focusing on quality basics',
        status: 'planning',
        startDate: '2024-01-08',
        launchDate: '2024-02-01',
        budget: 12000,
        targetRevenue: 35000,
        views: '98K',
        teamMembers: [
          { id: '3', name: 'Mike Johnson', role: 'Designer' }
        ],
        products: [],
        tasks: [
          {
            id: '2',
            title: 'Research market trends',
            category: 'marketing',
            status: 'in-progress',
            dueDate: '2024-01-20',
            createdAt: '2024-01-08'
          }
        ],
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08'
      }
    ];
  }

  async getAll(): Promise<Episode[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.getStoredEpisodes();
  }

  async getById(id: string): Promise<Episode | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const episodes = this.getStoredEpisodes();
    return episodes.find(ep => ep.id === id) || null;
  }

  async create(episodeData: Omit<Episode, 'id' | 'createdAt' | 'updatedAt'>): Promise<Episode> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newEpisode: Episode = {
      ...episodeData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const episodes = this.getStoredEpisodes();
    episodes.unshift(newEpisode);
    this.saveEpisodes(episodes);

    return newEpisode;
  }

  async update(id: string, updates: Partial<Episode>): Promise<Episode> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const episodes = this.getStoredEpisodes();
    const index = episodes.findIndex(ep => ep.id === id);
    
    if (index === -1) {
      throw new Error('Episode not found');
    }

    const updatedEpisode = {
      ...episodes[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    episodes[index] = updatedEpisode;
    this.saveEpisodes(episodes);

    return updatedEpisode;
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const episodes = this.getStoredEpisodes();
    const filteredEpisodes = episodes.filter(ep => ep.id !== id);
    
    if (filteredEpisodes.length === episodes.length) {
      throw new Error('Episode not found');
    }

    this.saveEpisodes(filteredEpisodes);
  }
}

export const episodeService = new EpisodeService();