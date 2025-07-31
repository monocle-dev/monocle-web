import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: ReactNode | string;
  color?: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
}

export function StatCard({
  label,
  value,
  icon,
  color = 'gray',
}: StatCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'from-emerald-500/20 to-green-500/20 border-emerald-500/30';
      case 'red':
        return 'from-red-500/20 to-rose-500/20 border-red-500/30';
      case 'yellow':
        return 'from-amber-500/20 to-yellow-500/20 border-amber-500/30';
      case 'blue':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      default:
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-emerald-400';
      case 'red':
        return 'text-red-400';
      case 'yellow':
        return 'text-amber-400';
      case 'blue':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div
      className={`
      group relative overflow-hidden
      bg-gradient-to-br ${getColorClasses(color)}
      bg-gray-900/50 
      border border-gray-700/50 rounded-lg sm:rounded-xl lg:rounded-2xl 
      p-3 sm:p-4 lg:p-6 shadow-xl hover:shadow-2xl 
      transition-all duration-300 ease-out
      hover:scale-[1.02] hover:border-gray-600/50
    `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
          <h3 className="text-xs sm:text-xs lg:text-sm font-medium text-gray-400 uppercase tracking-wide">
            {label}
          </h3>
          {icon && (
            <div
              className={`flex-shrink-0 ${getIconColor(
                color
              )} group-hover:scale-110 transition-transform duration-200 text-xs sm:text-sm lg:text-base`}
            >
              {typeof icon === 'string' ? <span>{icon}</span> : icon}
            </div>
          )}
        </div>

        <div className="mb-1 sm:mb-2">
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5 sm:mb-1">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
