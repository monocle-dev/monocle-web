import StatCard from '../ui/StatCard';
import { WebSocketStatus } from '../ui/WebSocketStatus';
import type { DashboardResponse } from '../../interfaces/Monitor';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  project: DashboardResponse['project'];
  summary: DashboardResponse['monitors_summary'];
  wsConnected?: boolean;
  wsError?: string | null;
}

const DashboardHeader = ({
  project,
  summary,
  wsConnected = false,
  wsError = null,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-3 sm:mb-4 lg:mb-6">
      <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
        <button
          onClick={() => navigate('/projects')}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2 transition-colors text-sm sm:text-base"
        >
          <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Back to Projects</span>
          <span className="sm:hidden">Back</span>
        </button>
        <WebSocketStatus isConnected={wsConnected} error={wsError} />
      </div>
      <div className="mb-3 sm:mb-4 lg:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          {project.name}
        </h1>
        <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
          {project.description}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        <StatCard
          label="Total Monitors"
          value={summary.total}
          icon="📊"
          color="blue"
        />
        <StatCard
          label="Active"
          value={summary.active}
          icon="🟢"
          color="green"
        />
        <StatCard label="Down" value={summary.down} icon="🔴" color="red" />
        <StatCard
          label="Warning"
          value={summary.warning}
          icon="🟡"
          color="yellow"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
