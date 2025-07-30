import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { monitorsAdapter } from '../../adapters/monitors-adapters';
import type {
  CreateMonitorRequest,
  MonitorSummary,
} from '../../interfaces/Monitor';
import { FaTimes } from 'react-icons/fa';
import CreateHTTPMonitor from './monitors/CreateHTTPMonitor';
import CreateDNSMonitor from './monitors/CreateDNSMonitor';
import CreateDatabaseMonitor from './monitors/CreateDatabaseMonitor';

export interface CreateMonitorModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingMonitor?: MonitorSummary | null;
}

export function CreateMonitorModal({
  projectId,
  isOpen,
  onClose,
  onSuccess,
  editingMonitor,
}: CreateMonitorModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getDefaultConfig = (type: 'http' | 'dns' | 'database') => {
    switch (type) {
      case 'http':
        return {
          url: '',
          method: 'GET',
          expected_status: 200,
          timeout: 30,
          headers: {},
        };
      case 'dns':
        return {
          domain: '',
          record_type: 'A',
          expected: '',
          timeout: 10,
        };
      case 'database':
        return {
          host: '',
          port: 5432,
          database: '',
          username: '',
          password: '',
        };
      default:
        return {};
    }
  };

  const [formData, setFormData] = useState<CreateMonitorRequest>({
    name: '',
    type: 'http',
    interval: 300,
    config: getDefaultConfig('http'),
  });

  // Update form data when editing monitor changes or modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (editingMonitor) {
        setFormData({
          name: editingMonitor.name,
          type: editingMonitor.type,
          interval: editingMonitor.interval,
          config: editingMonitor.config,
        });
      } else {
        setFormData({
          name: '',
          type: 'http',
          interval: 300,
          config: getDefaultConfig('http'),
        });
      }
    }
  }, [editingMonitor, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingMonitor) {
        await monitorsAdapter.updateMonitor(
          projectId,
          editingMonitor.id.toString(),
          formData
        );
      } else {
        await monitorsAdapter.createMonitor(projectId, formData);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save monitor');
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (key: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [key]: value,
      },
    }));
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh]">
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <DialogTitle className="text-lg font-semibold text-white">
              {editingMonitor ? 'Edit Monitor' : 'Create Monitor'}
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 p-1 rounded transition-all duration-200"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-700/30 text-red-300 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Monitor Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Monitor Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      const newType = e.target.value as
                        | 'http'
                        | 'dns'
                        | 'database';
                      setFormData((prev) => ({
                        ...prev,
                        type: newType,
                        // Only reset config if we're creating a new monitor, not editing
                        config: editingMonitor
                          ? prev.config
                          : getDefaultConfig(newType),
                      }));
                    }}
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  >
                    <option value="http">HTTP/HTTPS</option>
                    <option value="dns">DNS</option>
                    <option value="database">Database</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Check Interval (seconds)
                  </label>
                  <input
                    type="number"
                    value={formData.interval}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        interval: parseInt(e.target.value),
                      }))
                    }
                    min="60"
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    required
                  />
                </div>

                {formData.type === 'http' && (
                  <CreateHTTPMonitor
                    formData={formData}
                    onConfigChange={handleConfigChange}
                  />
                )}

                {formData.type === 'dns' && (
                  <CreateDNSMonitor
                    formData={formData}
                    onConfigChange={handleConfigChange}
                  />
                )}

                {formData.type === 'database' && (
                  <CreateDatabaseMonitor
                    formData={formData}
                    onConfigChange={handleConfigChange}
                  />
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:border-gray-500/50 transition-all duration-200"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading
                      ? 'Saving...'
                      : editingMonitor
                      ? 'Update'
                      : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
