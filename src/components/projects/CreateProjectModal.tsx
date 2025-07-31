import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaTimes, FaProjectDiagram } from 'react-icons/fa';
import { projectsAdapter } from '../../adapters/projects-adapters';
import type { Project } from '../../interfaces/Project';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingProject?: Project | null;
}

interface FormData {
  name: string;
  description: string;
  discord_webhook: string;
  slack_webhook: string;
}

const CreateProjectModal = ({
  isOpen,
  onClose,
  onSuccess,
  editingProject,
}: CreateProjectModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    discord_webhook: '',
    slack_webhook: '',
  });

  // Update form data when editing project changes or modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (editingProject) {
        setFormData({
          name: editingProject.name,
          description: editingProject.description,
          discord_webhook: editingProject.discord_webhook || '',
          slack_webhook: editingProject.slack_webhook || '',
        });
      } else {
        setFormData({
          name: '',
          description: '',
          discord_webhook: '',
          slack_webhook: '',
        });
      }
      setError('');
    }
  }, [editingProject, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingProject) {
        await projectsAdapter.updateProject(
          editingProject.id.toString(),
          formData
        );
      } else {
        await projectsAdapter.createProject(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh]">
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <FaProjectDiagram className="w-5 h-5 text-blue-400" />
              </div>
              <DialogTitle className="text-lg font-semibold text-white">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </DialogTitle>
            </div>
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    placeholder="Enter project name"
                    maxLength={100}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.name.length}/100
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none"
                    placeholder="Brief description of your project..."
                    rows={3}
                    maxLength={500}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.description.length}/500
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Discord Webhook
                  </label>
                  <input
                    type="url"
                    value={formData.discord_webhook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discord_webhook: e.target.value,
                      })
                    }
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    placeholder="https://discord.com/api/webhooks/..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Optional: Receive notifications in Discord
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slack Webhook
                  </label>
                  <input
                    type="url"
                    value={formData.slack_webhook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slack_webhook: e.target.value,
                      })
                    }
                    className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    placeholder="https://hooks.slack.com/services/..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Optional: Receive notifications in Slack
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:border-gray-500/50 transition-all duration-200"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading
                      ? 'Saving...'
                      : editingProject
                      ? 'Update Project'
                      : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CreateProjectModal;
