import { useState, useEffect } from 'react';
import { monitorsAdapter } from '../../adapters/monitors-adapters';
import type {
  CreateMonitorRequest,
  MonitorSummary,
} from '../../interfaces/Monitor';
import { FaTimes } from 'react-icons/fa';
import CreateHTTPMonitor from './monitors/CreateHTTPMonitor';
import CreateDNSMonitor from './monitors/CreateDNSMonitor';

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

  const getDefaultConfig = (type: 'http' | 'dns' | 'ssl' | 'database') => {
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
      case 'ssl':
        return {
          url: '',
          days_before_expiry: 30,
          verify_chain: true,
          check_san: false,
          timeout: 30,
        };
      case 'database':
        return {
          connection_string: '',
          db_type: 'postgres',
          test_query: '',
          timeout: 10,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            {editingMonitor ? 'Edit Monitor' : 'Create Monitor'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-700 text-red-300 rounded">
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
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  | 'ssl'
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
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="http">HTTP/HTTPS</option>
              <option value="dns">DNS</option>
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
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingMonitor ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
