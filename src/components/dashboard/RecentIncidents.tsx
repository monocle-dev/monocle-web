import {
  formatLastChecked,
  formatResponseTime,
} from '../../utils/monitorUtils';
import type { IncidentSummary } from '../../interfaces/Monitor';

interface IncidentCardProps {
  incident: IncidentSummary;
}

function IncidentCard({ incident }: IncidentCardProps) {
  const isOngoing = incident.status === 'ongoing';

  return (
    <div
      className={`border rounded-lg p-4 ${
        isOngoing
          ? 'border-red-700 bg-red-900/20'
          : 'border-green-700 bg-green-900/20'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-white">{incident.monitor_name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isOngoing
                  ? 'bg-red-900/30 text-red-300 border border-red-700'
                  : 'bg-green-900/30 text-green-300 border border-green-700'
              }`}
            >
              {incident.status}
            </span>
          </div>
        </div>
        <div className="text-2xl">{isOngoing ? '🔴' : '✅'}</div>
      </div>

      <div className="space-y-1 text-sm text-gray-400">
        <div className="flex justify-between">
          <span>Started:</span>
          <span>{formatLastChecked(incident.started_at)}</span>
        </div>

        {incident.resolved_at && (
          <div className="flex justify-between">
            <span>Resolved:</span>
            <span>{formatLastChecked(incident.resolved_at)}</span>
          </div>
        )}

        {incident.duration && (
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{formatResponseTime(incident.duration * 1000)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface RecentIncidentsProps {
  incidents?: IncidentSummary[];
}

export function RecentIncidents({ incidents = [] }: RecentIncidentsProps) {
  if (!Array.isArray(incidents) || incidents.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Recent Incidents
        </h2>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-lg font-medium text-white mb-2">
            No recent incidents!
          </h3>
          <p className="text-gray-400">Your services are running smoothly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Recent Incidents
      </h2>
      <div className="space-y-4">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
}
