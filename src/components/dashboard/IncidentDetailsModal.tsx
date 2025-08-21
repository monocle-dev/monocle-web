import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaServer,
} from 'react-icons/fa';
import type { IncidentSummary } from '../../interfaces/Monitor';
import { formatLastChecked } from '../../utils/monitorUtils';

interface IncidentDetailsModalProps {
  incident: IncidentSummary | null;
  isOpen: boolean;
  onClose: () => void;
}

const IncidentDetailsModal = ({
  incident,
  isOpen,
  onClose,
}: IncidentDetailsModalProps) => {
  if (!incident) return null;

  const isOngoing = !incident.resolved_at;

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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="w-full max-w-2xl max-h-[calc(100vh-2rem)] transform overflow-y-auto rounded-2xl bg-gray-900 border border-gray-700 p-6 text-left align-middle shadow-xl transition-all">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 p-3 rounded-xl border ${
                  isOngoing
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-emerald-500/10 border-emerald-500/30'
                }`}
              >
                {isOngoing ? (
                  <FaExclamationTriangle className="w-6 h-6 text-red-400" />
                ) : (
                  <FaCheckCircle className="w-6 h-6 text-emerald-400" />
                )}
              </div>
              <div>
                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold text-white mb-2"
                >
                  {incident.monitor_name}
                </DialogTitle>
                <div className="flex items-center gap-3">
                  <span
                    className={`
                    inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                    ${
                      isOngoing
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }
                  `}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isOngoing
                          ? 'bg-red-400 animate-pulse'
                          : 'bg-emerald-400'
                      }`}
                    />
                    {incident.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-400">
                    Incident #{incident.id}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">
                  Started
                </span>
              </div>
              <div className="text-white font-semibold">
                {formatLastChecked(incident.started_at)}
              </div>
            </div>

            {incident.resolved_at && (
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-gray-300">
                    Resolved
                  </span>
                </div>
                <div className="text-white font-semibold">
                  {formatLastChecked(incident.resolved_at)}
                </div>
              </div>
            )}

            {incident.duration && (
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <FaServer className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">
                    Duration
                  </span>
                </div>
                <div
                  className={`font-semibold ${
                    incident.duration > 300 ? 'text-red-400' : 'text-yellow-400'
                  }`}
                >
                  {incident.duration}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {sections.main.length > 0 && (
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30">
                <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                  Incident Summary
                </h4>
                <div className="space-y-2">
                  {sections.main.map((line, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {sections.error && (
              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FaExclamationTriangle className="w-4 h-4 text-red-400" />
                  <h4 className="text-sm font-semibold text-red-300 uppercase tracking-wide">
                    Error Details
                  </h4>
                </div>
                <div className="space-y-2">
                  {sections.error.map((error, index) => (
                    <p
                      key={index}
                      className="text-red-200 font-mono text-sm break-all bg-red-900/30 p-3 rounded-lg"
                    >
                      {error.replace('Error: ', '')}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {Object.entries(sections).map(([sectionName, items]) => {
              if (
                sectionName === 'main' ||
                sectionName === 'error' ||
                items.length === 0
              )
                return null;

              return (
                <div
                  key={sectionName}
                  className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30"
                >
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                    {sectionName}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items.map((item, index) => {
                      const [key, ...valueParts] = item.split(':');
                      const value = valueParts.join(':').trim();

                      return (
                        <div
                          key={index}
                          className="bg-gray-900/50 p-3 rounded-lg"
                        >
                          <div className="text-xs text-gray-400 mb-1">
                            {key.trim()}
                          </div>
                          <div className="text-sm text-gray-200 font-mono">
                            {value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-700/30 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default IncidentDetailsModal;
