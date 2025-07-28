import { MonitorCard } from './MonitorCard';
import type { MonitorSummary } from '../../interfaces/Monitor';

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
      <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700 m-3">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-white mb-2">No monitors yet</h3>
        <p className="text-gray-400 mb-4">
          Get started by creating your first monitor to track your services.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
      {monitors.map((monitor) => (
        <MonitorCard
          key={monitor.id}
          monitor={monitor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
