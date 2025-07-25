import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { MonitorsGrid } from '../../components/dashboard/MonitorsGrid';
import { RecentIncidents } from '../../components/dashboard/RecentIncidents';
import { CreateMonitorModal } from '../../components/dashboard/CreateMonitorModal';
import { DeleteMonitorModal } from '../../components/dashboard/DeleteMonitorModal';
import { ErrorState } from '../../components/ui/ErrorState';
import { RefreshIndicator } from '../../components/ui/RefreshIndicator';
import type { MonitorSummary } from '../../interfaces/Monitor';
import { FaPlus } from 'react-icons/fa';

export const Dashboard = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingMonitor, setEditingMonitor] = useState<MonitorSummary | null>(
    null
  );
  const [deletingMonitor, setDeletingMonitor] = useState<MonitorSummary | null>(
    null
  );

  const { data, error, refetch } = useDashboard(projectId || '');

  if (!projectId) {
    return <ErrorState error="Project ID is required" />;
  }

  if (error) return <ErrorState error={error} onRetry={refetch} />;
  if (!data) return <ErrorState error="No data available" onRetry={refetch} />;

  const handleDeleteMonitor = async (monitorId: number) => {
    const monitor = data?.monitors.find((m) => m.id === monitorId);
    if (monitor) {
      setDeletingMonitor(monitor);
      setShowDeleteModal(true);
    }
  };

  const handleEditMonitor = (monitor: MonitorSummary) => {
    setEditingMonitor(monitor);
    setShowCreateModal(true);
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    setEditingMonitor(null);
    refetch();
  };

  const handleDeleteSuccess = () => {
    setShowDeleteModal(false);
    setDeletingMonitor(null);
    refetch();
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          project={data.project}
          summary={data.monitors_summary}
        />

        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Monitors</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus className="w-4 h-4" />
                Add Monitor
              </button>
            </div>
            <MonitorsGrid
              monitors={data.monitors}
              onEdit={handleEditMonitor}
              onDelete={handleDeleteMonitor}
            />
          </section>

          <section>
            <RecentIncidents incidents={data.recent_incidents} />
          </section>
        </div>

        <RefreshIndicator onRefresh={refetch} />

        <CreateMonitorModal
          projectId={projectId}
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setEditingMonitor(null);
          }}
          onSuccess={handleCreateSuccess}
          editingMonitor={editingMonitor}
        />

        <DeleteMonitorModal
          projectId={projectId}
          monitor={deletingMonitor}
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeletingMonitor(null);
          }}
          onSuccess={handleDeleteSuccess}
        />
      </div>
    </div>
  );
};
