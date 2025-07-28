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

const baseClass = 'px-2 py-1 rounded-full text-xs font-medium';

export function getStatusBadgeClass(status?: string): string {
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
