import { StatusBadge } from '../ui/StatusBadge';
import {
  formatLastChecked,
  formatResponseTime,
} from '../../utils/monitorUtils';
import type { MonitorSummary } from '../../interfaces/Monitor';
import { FaEdit, FaTrash, FaGlobe, FaDatabase, FaServer } from 'react-icons/fa';
import { MdDns } from 'react-icons/md';

interface MonitorCardProps {
  monitor: MonitorSummary;
  onEdit?: (monitor: MonitorSummary) => void;
  onDelete?: (monitorId: number) => void;
}

export function MonitorCard({ monitor, onEdit, onDelete }: MonitorCardProps) {
  const handleDelete = async () => {
    if (!onDelete) return;
    onDelete(monitor.id);
  };

  const getMonitorIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'http':
      case 'https':
        return <FaGlobe className="w-5 h-5" />;
      case 'database':
        return <FaDatabase className="w-5 h-5" />;
      case 'dns':
        return <MdDns className="w-5 h-5" />;
      default:
        return <FaServer className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'from-emerald-500/20 to-green-500/20 border-emerald-500/30';
      case 'failure':
        return 'from-red-500/20 to-rose-500/20 border-red-500/30';
      case 'timeout':
        return 'from-amber-500/20 to-yellow-500/20 border-amber-500/30';
      default:
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.5) return 'text-emerald-400';
    if (uptime >= 95) return 'text-yellow-400';
    return 'text-red-400';
  };

  const uptime = monitor.uptime_percentage || 0;
  const statusColor = getStatusColor(monitor.last_check?.status);

  return (
    <div
      className={`
      group relative overflow-hidden
      bg-gradient-to-br ${statusColor}
      bg-gray-900/50 
      border border-gray-700/50 rounded-xl 
      p-3 sm:p-4 lg:p-5 shadow-lg hover:shadow-xl 
      transition-all duration-200 ease-out
      hover:scale-[1.01] hover:border-gray-600/50
      flex flex-col h-[200px] sm:h-[220px] lg:h-[240px]
    `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className="flex-shrink-0 p-1.5 bg-gray-800/50 rounded-lg border border-gray-700/50">
            {getMonitorIcon(monitor.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white mb-1 truncate">
              {monitor.name}
            </h3>
            <div className="flex items-center gap-2">
              <StatusBadge status={monitor.last_check?.status} size="sm" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onEdit && (
            <button
              onClick={() => onEdit(monitor)}
              className="p-1 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-all duration-200"
              title="Edit Monitor"
            >
              <FaEdit className="w-3 h-3" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-all duration-200"
              title="Delete Monitor"
            >
              <FaTrash className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2">
          <div className={`text-lg font-bold ${getUptimeColor(uptime)}`}>
            {uptime.toFixed(1)}%
          </div>
          <span className="text-xs text-gray-400">uptime</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-white">
            {monitor.avg_response_time
              ? formatResponseTime(monitor.avg_response_time)
              : 'N/A'}
          </div>
          <div className="text-xs text-gray-400">response</div>
        </div>
      </div>

      {monitor.config.url && (
        <div className="bg-gray-800/20 rounded p-2 border border-gray-700/20 mb-2 sm:mb-3">
          <div className="text-xs text-blue-400 break-all line-clamp-1">
            {monitor.config.url}
          </div>
        </div>
      )}

      {monitor.last_check && (
        <div className="relative border-t border-gray-700/30 pt-2 mt-auto">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{formatLastChecked(monitor.last_check.checked_at)}</span>
            <span>
              {monitor.interval ?? 'N/A'}
              {monitor.interval != null ? 's' : ''} interval
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
