import { useState } from 'react';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { monitorsAdapter } from '../../adapters/monitors-adapters';
import type { MonitorSummary } from '../../interfaces/Monitor';

export interface DeleteMonitorModalProps {
  projectId: string;
  monitor: MonitorSummary | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteMonitorModal({
  projectId,
  monitor,
  isOpen,
  onClose,
  onSuccess,
}: DeleteMonitorModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!monitor) return;

    setLoading(true);
    setError('');

    try {
      await monitorsAdapter.deleteMonitor(projectId, monitor.id.toString());
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete monitor');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !monitor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-white">Delete Monitor</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
            disabled={loading}
          >
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-700 text-red-300 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-300 mb-2">
            Are you sure you want to delete this monitor?
          </p>
          <div className="bg-gray-700 p-3 rounded border border-gray-600">
            <p className="text-white font-medium">{monitor.name}</p>
            <p className="text-gray-400 text-sm">
              Type: {monitor.type.toUpperCase()} • Status: {monitor.status}
            </p>
          </div>
          <p className="text-red-400 text-sm mt-2">
            This action cannot be undone. All monitoring data and history will
            be permanently deleted.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Monitor'}
          </button>
        </div>
      </div>
    </div>
  );
}
