import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Video, 
  TrendingUp, 
  Settings
} from 'lucide-react';
import { useEpisodes } from '../hooks/useEpisodes';
import { NAVIGATION_SECTIONS } from '../utils/constants';
import StatsGrid from './dashboard/StatsGrid';
import RecentEpisodes from './dashboard/RecentEpisodes';
import StockAlerts from './dashboard/StockAlerts';
import EpisodeManager from './EpisodeManager';
import Card from './ui/Card';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState(NAVIGATION_SECTIONS.OVERVIEW);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
  const { episodes, loading } = useEpisodes();

  // Mock data - in production this would come from APIs
  const stats = {
    totalEpisodes: episodes.length,
    stockValue: 24580,
    videoViews: '1.2M',
    revenue: 45230,
    episodeChange: '+2 this month',
    stockChange: '+12% from last month',
    viewsChange: '+18% this week',
    revenueChange: '+25% this month'
  };

  const stockAlerts = [
    { id: '1', item: 'Leaked Hoodie - Black M', stock: 5, status: 'low' as const },
    { id: '2', item: 'Leaked Tee - White L', stock: 2, status: 'critical' as const },
    { id: '3', item: 'Leaked Cap - Black', stock: 15, status: 'good' as const },
  ];

  const navigationItems = [
    { id: NAVIGATION_SECTIONS.OVERVIEW, label: 'OVERVIEW', icon: BarChart3 },
    { id: NAVIGATION_SECTIONS.EPISODES, label: 'EPISODES', icon: Video },
    { id: NAVIGATION_SECTIONS.ANALYTICS, label: 'ANALYTICS', icon: TrendingUp },
    { id: NAVIGATION_SECTIONS.STOCK, label: 'STOCK', icon: Package },
  ];

  const handleEpisodeClick = (episodeId: string) => {
    console.log('Dashboard - episode clicked:', episodeId);
    setSelectedEpisodeId(episodeId);
    setActiveSection(NAVIGATION_SECTIONS.EPISODES);
  };

  const handleSectionChange = (sectionId: string) => {
    console.log('Dashboard - section changed:', sectionId);
    setActiveSection(sectionId);
    if (sectionId !== NAVIGATION_SECTIONS.EPISODES) {
      setSelectedEpisodeId(null);
    }
  };

  const handleEpisodeSelect = (episodeId: string | null) => {
    console.log('Dashboard - episode selected:', episodeId);
    setSelectedEpisodeId(episodeId);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-2xl font-black text-white tracking-wider">LEAKED</div>
              <nav className="flex space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-bold tracking-wide transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-white text-black'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === NAVIGATION_SECTIONS.OVERVIEW && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <Card className="p-8">
              <h1 className="text-4xl font-black tracking-wider mb-2">BRAND COMMAND CENTER</h1>
              <p className="text-white/60 text-lg">Manage your drops, track performance, and control your empire.</p>
            </Card>

            {/* Stats Grid */}
            <StatsGrid stats={stats} />

            {/* Recent Episodes & Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentEpisodes 
                episodes={episodes}
                onEpisodeClick={handleEpisodeClick}
                onManageClick={() => setActiveSection(NAVIGATION_SECTIONS.EPISODES)}
              />
              <StockAlerts alerts={stockAlerts} />
            </div>
          </div>
        )}

        {/* Episodes Section */}
        {activeSection === NAVIGATION_SECTIONS.EPISODES && (
          <EpisodeManager 
            selectedEpisodeId={selectedEpisodeId}
            onEpisodeSelect={handleEpisodeSelect}
          />
        )}

        {/* Placeholder sections for other tabs */}
        {activeSection !== NAVIGATION_SECTIONS.OVERVIEW && activeSection !== NAVIGATION_SECTIONS.EPISODES && (
          <Card className="p-12 text-center">
            <h1 className="text-3xl font-black tracking-wider mb-4">
              {activeSection.toUpperCase()} SECTION
            </h1>
            <p className="text-white/60 text-lg">
              This section is under development. Coming soon with advanced features for your brand management.
            </p>
          </Card>
        )}
      </main>
    </div>
  );
}