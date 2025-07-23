import { StatCard } from '../ui/StatCard';
import type { DashboardResponse } from '../../interfaces/Monitor';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  project: DashboardResponse['project'];
  summary: DashboardResponse['monitors_summary'];
}

export function DashboardHeader({ project, summary }: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="mb-4">
        <button
          onClick={() => navigate('/projects')}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>
      </div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
        <p className="text-gray-400 mt-2">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
}
