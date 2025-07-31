import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import MonitorsGrid from '../../components/dashboard/MonitorsGrid';
import RecentIncidents from '../../components/dashboard/RecentIncidents';
import CreateMonitorModal from '../../components/dashboard/CreateMonitorModal';
import DeleteMonitorModal from '../../components/dashboard/DeleteMonitorModal';
import { ErrorState } from '../../components/ui/ErrorState';
import RefreshIndicator from '../../components/ui/RefreshIndicator';
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

  const { data, error, refetch, loading } = useDashboard(projectId || '');

  if (!projectId) {
    return <ErrorState error="Project ID is required" />;
  }

  if (!data && loading) return null;
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
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-700/50">
        <div className="app-container">
          <DashboardHeader
            project={data.project}
            summary={data.monitors_summary}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="app-container w-full h-full">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 h-full py-4 sm:py-6">
            <section className="flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Monitors
                </h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add Monitor</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
              <div className="flex-1 overflow-hidden border border-gray-700/30 rounded-xl sm:rounded-2xl bg-gray-900/40 shadow-xl min-h-0">
                <div className="h-full overflow-y-auto p-3 sm:p-4">
                  <MonitorsGrid
                    monitors={data.monitors}
                    onEdit={handleEditMonitor}
                    onDelete={handleDeleteMonitor}
                    setShowCreateModal={setShowCreateModal}
                  />
                </div>
              </div>
            </section>

            <section className="flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Recent Incidents
                </h2>
              </div>
              <div className="flex-1 overflow-hidden border border-gray-700/30 rounded-xl sm:rounded-2xl bg-gray-900/40 shadow-xl min-h-0">
                <div className="h-full overflow-y-auto p-3 sm:p-4">
                  <RecentIncidents incidents={data.recent_incidents} />
                </div>
              </div>
            </section>
          </div>
        </div>
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
  );
};
