import {
  formatLastChecked,
  formatResponseTime,
} from '../../utils/monitorUtils';
import type { IncidentSummary } from '../../interfaces/Monitor';

interface IncidentCardProps {
  incident: IncidentSummary;
}

function IncidentCard({ incident }: IncidentCardProps) {
  const isOngoing = !incident.resolved_at;

  // Parse and format the description for better display
  const formatDescription = (description: string) => {
    const lines = description.split('\n').filter((line) => line.trim());
    const sections: { [key: string]: string[] } = { main: [] };
    let currentSection = 'main';

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Check if this line starts a new section
      if (
        trimmed.endsWith(':') &&
        !trimmed.includes('Error:') &&
        !trimmed.includes('failed')
      ) {
        currentSection = trimmed.slice(0, -1);
        sections[currentSection] = [];
      } else if (trimmed.startsWith('Error:') || trimmed.startsWith('failed')) {
        // Handle error lines specially
        if (!sections.error) sections.error = [];
        sections.error.push(trimmed);
      } else if (trimmed.includes(':') && currentSection !== 'main') {
        // Configuration items
        sections[currentSection].push(trimmed);
      } else {
        // Main description
        sections.main.push(trimmed);
      }
    });

    return sections;
  };

  const sections = formatDescription(incident.description);

  return (
    <div
      className={`border rounded-lg p-3 flex flex-col min-h-[200px] ${
        isOngoing
          ? 'border-red-700 bg-red-900/20'
          : 'border-green-700 bg-green-900/20'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white mb-2 text-sm truncate">
            {incident.monitor_name}
          </h4>

          {/* Main description */}
          {sections.main.length > 0 && (
            <div className="mb-2">
              {sections.main.map((line, index) => (
                <p key={index} className="text-xs text-gray-300 mb-1">
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Error section */}
          {sections.error && (
            <div className="mb-2 p-2 bg-red-900/30 border border-red-700/50 rounded">
              <p className="text-xs font-medium text-red-300 mb-1">
                Error Details:
              </p>
              {sections.error.map((error, index) => (
                <p
                  key={index}
                  className="text-xs text-red-200 font-mono break-all"
                >
                  {error.replace('Error: ', '')}
                </p>
              ))}
            </div>
          )}

          {/* Configuration sections */}
          {Object.entries(sections).map(([sectionName, items]) => {
            if (
              sectionName === 'main' ||
              sectionName === 'error' ||
              items.length === 0
            )
              return null;

            return (
              <div key={sectionName} className="mb-2">
                <p className="text-xs font-medium text-gray-400 mb-1">
                  {sectionName}:
                </p>
                <div className="pl-2 border-l-2 border-gray-600">
                  {items.map((item, index) => {
                    const [key, ...valueParts] = item.split(':');
                    const value = valueParts.join(':').trim();

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center py-0.5"
                      >
                        <span className="text-xs text-gray-400">
                          {key.trim()}:
                        </span>
                        <span className="text-xs text-gray-300 font-mono">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="flex items-center gap-2 mt-auto">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isOngoing
                  ? 'bg-red-900/30 text-red-300 border border-red-700'
                  : 'bg-green-900/30 text-green-300 border border-green-700'
              }`}
            >
              {incident.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-lg ml-2 flex-shrink-0">
          {isOngoing ? '🔴' : '✅'}
        </div>
      </div>

      <div className="space-y-1 text-xs text-gray-400 mt-auto pt-2">
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
      <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700 m-3">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-lg font-medium text-white mb-2">
          No recent incidents!
        </h3>
        <p className="text-xs text-gray-400">
          Your services are running smoothly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </div>
  );
}
