import { formatDistanceToNow, format } from 'date-fns';

// Status utilities
export function getStatusColor(status?: string): string {
  switch (status) {
    case 'success':
      return 'green';
    case 'failure':
      return 'red';
    case 'timeout':
      return 'orange';
    default:
      return 'gray';
  }
}

export function getStatusIcon(status?: string): string {
  switch (status) {
    case 'success':
      return '🟢';
    case 'failure':
      return '🔴';
    case 'timeout':
      return '🟡';
    default:
      return '⚪';
  }
}

export function formatUptime(percentage: number): string {
  if (percentage >= 99.9) return '🟢 Excellent';
  if (percentage >= 99.0) return '🟡 Good';
  if (percentage >= 95.0) return '🟠 Fair';
  return '🔴 Poor';
}

// Time formatting utilities
export function formatLastChecked(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function formatResponseTime(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), 'MMM dd, yyyy HH:mm:ss');
}

// Status badge utilities
export function getStatusBadgeClass(status?: string): string {
  const baseClass = 'px-2 py-1 rounded-full text-xs font-medium';
  switch (status) {
    case 'success':
      return `${baseClass} bg-green-100 text-green-800`;
    case 'failure':
      return `${baseClass} bg-red-100 text-red-800`;
    case 'timeout':
      return `${baseClass} bg-yellow-100 text-yellow-800`;
    default:
      return `${baseClass} bg-gray-100 text-gray-800`;
  }
}

export function getMonitorStatusClass(
  status: 'active' | 'paused' | 'inactive'
): string {
  const baseClass = 'px-2 py-1 rounded-full text-xs font-medium';
  switch (status) {
    case 'active':
      return `${baseClass} bg-green-900/30 text-green-300 border border-green-700`;
    case 'paused':
      return `${baseClass} bg-yellow-900/30 text-yellow-300 border border-yellow-700`;
    case 'inactive':
      return `${baseClass} bg-gray-800 text-gray-400 border border-gray-600`;
    default:
      return `${baseClass} bg-gray-800 text-gray-400 border border-gray-600`;
  }
}
