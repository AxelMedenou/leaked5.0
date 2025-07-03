export interface Episode {
  id: string;
  name: string;
  concept: string;
  status: 'planning' | 'in-progress' | 'production' | 'marketing' | 'launched' | 'completed';
  startDate: string;
  launchDate: string;
  budget: number;
  targetRevenue: number;
  actualRevenue?: number;
  views?: string;
  teamMembers: TeamMember[];
  products: Product[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
}

export interface Product {
  id: string;
  name: string;
  variants: string[];
  quantity: number;
  cost: number;
  price: number;
  sold?: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'design' | 'production' | 'marketing' | 'content' | 'sales';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  dueDate: string;
  assignedTo?: string;
  createdAt: string;
  completedAt?: string;
}

export interface DashboardStats {
  totalEpisodes: number;
  stockValue: number;
  videoViews: string;
  revenue: number;
  episodeChange: string;
  stockChange: string;
  viewsChange: string;
  revenueChange: string;
}

export interface StockAlert {
  id: string;
  item: string;
  stock: number;
  status: 'good' | 'low' | 'critical';
  threshold?: number;
}