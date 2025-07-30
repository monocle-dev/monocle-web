import { MonitorCard } from './MonitorCard';
import type { MonitorSummary } from '../../interfaces/Monitor';
import { FaPlus, FaChartLine } from 'react-icons/fa';

interface MonitorsGridProps {
  monitors?: MonitorSummary[];
  onEdit?: (monitor: MonitorSummary) => void;
  onDelete?: (monitorId: number) => void;
}

export function MonitorsGrid({
  monitors = [],
  onEdit,
  onDelete,
}: MonitorsGridProps) {
  if (!Array.isArray(monitors) || monitors.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 sm:p-8 shadow-xl max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-teal-600/5" />

          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 mb-4">
              <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Ready to Monitor?
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
              Start tracking your services with professional monitoring.
            </p>

            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-sm sm:text-base">
              <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Create First Monitor</span>
              <span className="sm:hidden">Add Monitor</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 auto-rows-max">
        {monitors.map((monitor) => (
          <MonitorCard
            key={monitor.id}
            monitor={monitor}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
