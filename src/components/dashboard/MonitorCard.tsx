import { StatusBadge } from '../ui/StatusBadge';
import {
  formatLastChecked,
  formatResponseTime,
  getMonitorStatusClass,
} from '../../utils/monitorUtils';
import type { MonitorSummary } from '../../interfaces/Monitor';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {monitor.name}
          </h3>
          <div className="flex items-center gap-2">
            <StatusBadge status={monitor.last_check?.status} />
            <span className={getMonitorStatusClass(monitor.status)}>
              {monitor.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(monitor)}
              className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
              title="Edit Monitor"
            >
              <FaEdit />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Delete Monitor"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Uptime</span>
            <span className="text-sm font-medium text-gray-200">
              {monitor.uptime_percentage?.toFixed(1) || '0.0'}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Response Time</span>
            <span className="text-sm font-medium text-gray-200">
              {monitor.avg_response_time
                ? formatResponseTime(monitor.avg_response_time)
                : 'N/A'}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Type</span>
            <span className="text-sm font-medium text-gray-200 uppercase">
              {monitor.type}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Interval</span>
            <span className="text-sm font-medium text-gray-200">
              {monitor.interval ?? 'N/A'}
              {monitor.interval != null ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {monitor.config.url && (
        <div className="mb-4">
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">URL</span>
            <span className="text-sm font-medium text-blue-400 truncate max-w-full">
              {monitor.config.url}
            </span>
          </div>
        </div>
      )}

      {monitor.last_check && (
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-gray-500">
                Last checked: {formatLastChecked(monitor.last_check.checked_at)}
              </p>
              <p className="text-xs text-gray-500">
                Response: {formatResponseTime(monitor.last_check.response_time)}
              </p>
            </div>
          </div>
          {monitor.last_check.message &&
            monitor.last_check.status !== 'success' && (
              <div className="mt-2 p-2 bg-red-900/20 border border-red-700 rounded text-xs text-red-300">
                {monitor.last_check.message}
              </div>
            )}
        </div>
      )}
    </div>
  );
}
