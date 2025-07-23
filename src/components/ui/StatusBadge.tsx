interface StatusBadgeProps {
  status?: 'success' | 'failure' | 'timeout';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusText = (status?: string) => {
    switch (status) {
      case 'success':
        return 'Online';
      case 'failure':
        return 'Down';
      case 'timeout':
        return 'Timeout';
      default:
        return 'Unknown';
    }
  };

  const getDarkStatusClass = (status?: string) => {
    const baseClass = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'success':
        return `${baseClass} bg-green-900/30 text-green-300 border border-green-700`;
      case 'failure':
        return `${baseClass} bg-red-900/30 text-red-300 border border-red-700`;
      case 'timeout':
        return `${baseClass} bg-yellow-900/30 text-yellow-300 border border-yellow-700`;
      default:
        return `${baseClass} bg-gray-800 text-gray-400 border border-gray-600`;
    }
  };

  return (
    <span className={getDarkStatusClass(status)}>{getStatusText(status)}</span>
  );
}
