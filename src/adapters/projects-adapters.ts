import axios from 'axios';
import type { Project } from '../interfaces/Project';

interface ProjectData {
  name: string;
  description: string;
  discord_webhook?: string;
  slack_webhook?: string;
}

interface ProjectAdapter {
  getProjects: () => Promise<Project[]>;
  createProject: (data: ProjectData) => Promise<Project>;
  updateProject: (id: string, data: ProjectData) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
}

class ProjectService implements ProjectAdapter {
  private apiUrl: string = '/api/projects';

  async getProjects(): Promise<Project[]> {
    try {
      const response = await axios.get(`${this.apiUrl}`);

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Failed to fetch projects');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async createProject(data: ProjectData): Promise<Project> {
    try {
      const response = await axios.post(`${this.apiUrl}`, data);

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Failed to create project');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async updateProject(id: string, data: ProjectData): Promise<Project> {
    try {
      const response = await axios.patch(`${this.apiUrl}/${id}`, data);

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Failed to update project');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}/${id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Failed to delete project');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }
}

export const projectsAdapter: ProjectAdapter = new ProjectService();
