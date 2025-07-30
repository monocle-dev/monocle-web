import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
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
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <FaExclamationTriangle className="w-5 h-5 text-red-400" />
              </div>
              <DialogTitle className="text-lg font-semibold text-white">
                Delete Monitor
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 p-1 rounded transition-all duration-200"
              disabled={loading}
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-700/30 text-red-300 rounded-lg">
                {error}
              </div>
            )}

            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                Are you sure you want to delete this monitor?
              </p>

              <div className="bg-gray-800/50 border border-gray-700/50 p-4 rounded-lg mb-4">
                <p className="text-white font-medium mb-1">{monitor.name}</p>
                <p className="text-gray-400 text-sm">
                  Type: {monitor.type.toUpperCase()} • Status: {monitor.status}
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-red-900/10 border border-red-700/30 rounded-lg">
                <FaExclamationTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">
                  This action cannot be undone. All monitoring data and history
                  will be permanently deleted.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:border-gray-500/50 transition-all duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Deleting...' : 'Delete Monitor'}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
