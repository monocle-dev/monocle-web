import axios from 'axios';
import type {
  DashboardResponse,
  MonitorSummary,
  MonitorCheck,
  CreateMonitorRequest,
} from '../interfaces/Monitor';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const monitorsAdapter = {
  // Get complete dashboard data
  async getDashboard(projectId: string): Promise<DashboardResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/projects/${projectId}/dashboard`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  },

  // Get monitors list only
  async getMonitors(projectId: string): Promise<MonitorSummary[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/projects/${projectId}/monitors`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch monitors:', error);
      throw new Error('Failed to fetch monitors');
    }
  },

  // Get monitor check history
  async getMonitorChecks(
    projectId: string,
    monitorId: string
  ): Promise<MonitorCheck[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/projects/${projectId}/monitors/${monitorId}/checks`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch monitor checks:', error);
      throw new Error('Failed to fetch monitor checks');
    }
  },

  // Create new monitor
  async createMonitor(
    projectId: string,
    monitorData: CreateMonitorRequest
  ): Promise<MonitorSummary> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/projects/${projectId}/monitors`,
        monitorData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create monitor:', error);
      throw new Error('Failed to create monitor');
    }
  },

  // Update existing monitor
  async updateMonitor(
    projectId: string,
    monitorId: string,
    monitorData: Partial<CreateMonitorRequest>
  ): Promise<MonitorSummary> {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/projects/${projectId}/monitors/${monitorId}`,
        monitorData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update monitor:', error);
      throw new Error('Failed to update monitor');
    }
  },

  // Delete monitor
  async deleteMonitor(projectId: string, monitorId: string): Promise<void> {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/projects/${projectId}/monitors/${monitorId}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error('Failed to delete monitor:', error);
      throw new Error('Failed to delete monitor');
    }
  },
};
