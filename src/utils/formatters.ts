export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    planning: 'bg-blue-500/20 text-blue-400',
    'in-progress': 'bg-yellow-500/20 text-yellow-400',
    production: 'bg-orange-500/20 text-orange-400',
    marketing: 'bg-purple-500/20 text-purple-400',
    launched: 'bg-green-500/20 text-green-400',
    completed: 'bg-gray-500/20 text-gray-400',
    pending: 'bg-gray-500/20 text-gray-400',
    cancelled: 'bg-red-500/20 text-red-400',
    good: 'bg-green-500/20 text-green-400',
    low: 'bg-yellow-500/20 text-yellow-400',
    critical: 'bg-red-500/20 text-red-400'
  };

  return statusColors[status] || 'bg-gray-500/20 text-gray-400';
}