import { useEffect, useState } from 'react';
import type { Project } from '../../interfaces/Project';
import { projectsAdapter } from '../../adapters/projects-adapters';
import { Link } from 'react-router-dom';
import { FaEdit, FaProjectDiagram, FaTrash } from 'react-icons/fa';
import { CreateProjectModal } from '../../components/projects/CreateProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

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

  const handleModalSuccess = () => {
    setShowCreateModal(false);
    setEditingProject(null);
    fetchProjects();
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingProject(null);
  };

  const startCreate = () => {
    setShowCreateModal(true);
    setEditingProject(null);
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setShowCreateModal(true);
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

  if (loading) return null;

  return (
    <div className="page-container min-h-screen">
      <div className="app-container px-4 sm:px-6 lg:px-8 py-8">
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
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 hover:shadow-lg transition-all duration-200 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4 flex-shrink-0">
                  <div className="flex-1 min-w-0 pr-3">
                    <h3
                      className="text-lg font-semibold text-white mb-2 truncate"
                      title={project.name}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="text-gray-300 text-sm overflow-hidden text-ellipsis leading-relaxed"
                      title={project.description}
                    >
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(project)}
                      className="text-gray-400 hover:text-blue-400 transition-colors p-1 rounded hover:bg-gray-800"
                      title="Edit project"
                      aria-label="Edit project"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-gray-800"
                      title="Delete project"
                      aria-label="Delete project"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                  <Link
                    to={`/projects/${project.id}/dashboard`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    View Dashboard
                  </Link>
                  <span
                    className="text-xs text-gray-400 truncate ml-3"
                    title={`Project ID: ${project.id}`}
                  >
                    #{String(project.id).slice(0, 8)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        editingProject={editingProject}
      />
    </div>
  );
};

export default Projects;
