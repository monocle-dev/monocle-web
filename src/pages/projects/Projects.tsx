import { useEffect, useState } from 'react';
import type { Project } from '../../interfaces/Project';
import { projectsAdapter } from '../../adapters/projects-adapters';
import { Link } from 'react-router-dom';
import { FaEdit, FaProjectDiagram, FaTrash } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data: Project[] = await projectsAdapter.getProjects();
      setProjects(data);
      setError('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Failed to fetch projects:', err.message);
        setError('Failed to load projects');
      } else {
        console.error('An unexpected error occurred while fetching projects');
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectsAdapter.createProject(formData);
      setFormData({ name: '', description: '' });
      setShowCreateForm(false);
      fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create project');
      }
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      await projectsAdapter.updateProject(editingProject.id, formData);
      setFormData({ name: '', description: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update project');
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAdapter.deleteProject(id);
      fetchProjects();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete project');
      }
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
    });
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setFormData({ name: '', description: '' });
  };

  const startCreate = () => {
    setShowCreateForm(true);
    setEditingProject(null);
    setFormData({ name: '', description: '' });
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-300">Manage your monitoring projects</p>
          </div>
          <button
            onClick={startCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + New Project
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {(showCreateForm || editingProject) && (
          <div className="mb-8 bg-gray-900 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>
            <form
              onSubmit={
                editingProject ? handleUpdateProject : handleCreateProject
              }
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded-md p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded-md p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project description"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={
                    editingProject ? cancelEdit : () => setShowCreateForm(false)
                  }
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaProjectDiagram className="w-12 h-12 mx-auto text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-400 mb-6">
              Get started by creating your first monitoring project
            </p>
            <button
              onClick={startCreate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: Project) => (
              <div
                key={project.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => startEdit(project)}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                      title="Edit project"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete project"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/projects/${project.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Dashboard
                  </Link>
                  <span className="text-xs text-gray-400">
                    Project #{String(project.id).slice(0, 8)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
