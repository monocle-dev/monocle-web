import {
  formatLastChecked,
  formatResponseTime,
} from '../../utils/monitorUtils';
import type { IncidentSummary } from '../../interfaces/Monitor';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import { IncidentDetailsModal } from './IncidentDetailsModal';

interface IncidentCardProps {
  incident: IncidentSummary;
  onClick: (incident: IncidentSummary) => void;
}

function IncidentCard({ incident, onClick }: IncidentCardProps) {
  const isOngoing = incident.status === 'ongoing' && !incident.resolved_at;

  const formatDescription = (description: string) => {
    const lines = description.split('\n').filter((line) => line.trim());
    const sections: { [key: string]: string[] } = { main: [] };
    let currentSection = 'main';

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (
        trimmed.endsWith(':') &&
        !trimmed.includes('Error:') &&
        !trimmed.includes('failed')
      ) {
        currentSection = trimmed.slice(0, -1);
        sections[currentSection] = [];
      } else if (trimmed.startsWith('Error:') || trimmed.startsWith('failed')) {
        if (!sections.error) sections.error = [];
        sections.error.push(trimmed);
      } else if (trimmed.includes(':') && currentSection !== 'main') {
        sections[currentSection].push(trimmed);
      } else {
        sections.main.push(trimmed);
      }
    });

    return sections;
  };

  const sections = formatDescription(incident.description);
  const statusColor = isOngoing
    ? 'from-red-500/20 to-rose-500/20 border-red-500/30'
    : 'from-emerald-500/20 to-green-500/20 border-emerald-500/30';

  return (
    <div
      onClick={() => onClick(incident)}
      className={`
        group relative overflow-hidden cursor-pointer
        bg-gradient-to-br ${statusColor}
      bg-gray-900/50 
        border border-gray-700/50 rounded-xl 
        p-3 sm:p-4 lg:p-5 shadow-lg hover:shadow-xl 
        transition-all duration-200 ease-out
        hover:scale-[1.02] hover:border-gray-600/50
        flex flex-col h-[180px] sm:h-[200px] lg:h-[220px]
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div
            className={`flex-shrink-0 p-1.5 rounded-lg border ${
              isOngoing
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-emerald-500/10 border-emerald-500/30'
            }`}
          >
            {isOngoing ? (
              <FaExclamationTriangle className="w-4 h-4 text-red-400" />
            ) : (
              <FaCheckCircle className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white mb-1 truncate text-sm">
              {incident.monitor_name}
            </h4>
            <div className="flex items-center gap-2">
              <span
                className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
                ${
                  isOngoing
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }
              `}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isOngoing ? 'bg-red-400 animate-pulse' : 'bg-emerald-400'
                  }`}
                />
                {incident.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 mb-2 sm:mb-3">
        {sections.main.length > 0 && (
          <div className="text-xs text-gray-300 line-clamp-3">
            {sections.main.join(' ')}
          </div>
        )}

        <div className="mt-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="hidden sm:inline">Click for details →</span>
          <span className="sm:hidden">Tap for details →</span>
        </div>
      </div>

      <div className="relative border-t border-gray-700/30 pt-2 mt-auto">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
          <div>
            <div className="text-gray-500">Started</div>
            <div className="text-gray-300">
              {formatLastChecked(incident.started_at)}
            </div>
          </div>

          {incident.resolved_at ? (
            <div className="text-right">
              <div className="text-gray-500">Duration</div>
              <div className="text-gray-300">
                {incident.duration
                  ? formatResponseTime(incident.duration * 1000)
                  : 'N/A'}
              </div>
            </div>
          ) : (
            <div className="text-right">
              <div className="text-red-300">Ongoing</div>
              <div className="text-red-400">Active issue</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RecentIncidentsProps {
  incidents?: IncidentSummary[];
}

export function RecentIncidents({ incidents = [] }: RecentIncidentsProps) {
  const [selectedIncident, setSelectedIncident] =
    useState<IncidentSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncidentClick = (incident: IncidentSummary) => {
    setSelectedIncident(incident);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIncident(null);
  };

  if (!Array.isArray(incidents) || incidents.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-xl p-6 sm:p-8 shadow-xl max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-green-600/5 to-teal-600/5" />

          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl border border-emerald-500/30 mb-4">
              <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              All Systems Operational
            </h3>
            <p className="text-gray-400 mb-4 max-w-md mx-auto text-sm sm:text-base">
              Great news! No incidents detected. Your services are running
              smoothly.
            </p>

            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 text-xs sm:text-sm font-medium">
                System Health: Excellent
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 auto-rows-max">
          {incidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onClick={handleIncidentClick}
            />
          ))}
        </div>
      </div>

      <IncidentDetailsModal
        incident={selectedIncident}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
