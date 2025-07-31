interface StatusBadgeProps {
  status?: 'success' | 'failure' | 'timeout';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
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

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-4 py-2 text-sm';
      default:
        return 'px-3 py-1 text-xs';
    }
  };

  const getStatusClass = (status?: string) => {
    const baseClass = `inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 ${getSizeClasses(
      size
    )}`;
    switch (status) {
      case 'success':
        return `${baseClass} bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10`;
      case 'failure':
        return `${baseClass} bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10`;
      case 'timeout':
        return `${baseClass} bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/30 shadow-lg shadow-amber-500/10`;
      default:
        return `${baseClass} bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border border-gray-500/30 shadow-lg shadow-gray-500/10`;
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'success':
        return (
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        );
      case 'failure':
        return (
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        );
      case 'timeout':
        return (
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        );
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-400" />;
    }
  };

  return (
    <span className={getStatusClass(status)}>
      {getStatusIcon(status)}
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;
