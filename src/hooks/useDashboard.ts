import { useState, useEffect, useCallback } from 'react';
import type { DashboardResponse, MonitorCheck } from '../interfaces/Monitor';
import { monitorsAdapter } from '../adapters/monitors-adapters';

export function useDashboard(projectId: string) {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!projectId) {
      setLoading(false);
      setError('Project ID is required');
      return;
    }

    try {
      setLoading(true);
      const dashboardData = await monitorsAdapter.getDashboard(projectId);
      setData(dashboardData);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch dashboard'
      );
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!projectId) return;

    const interval = setInterval(() => {
      fetchDashboard();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchDashboard, projectId]);

  return { data, loading, error, refetch: fetchDashboard };
}

export function useMonitorDetails(projectId: string, monitorId: string) {
  const [checks, setChecks] = useState<MonitorCheck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChecks = useCallback(async () => {
    if (!monitorId) return;

    setLoading(true);
    try {
      const checksData = await monitorsAdapter.getMonitorChecks(
        projectId,
        monitorId
      );
      setChecks(checksData);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch monitor checks'
      );
      console.error('Failed to fetch monitor checks:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId, monitorId]);

  useEffect(() => {
    fetchChecks();
  }, [fetchChecks]);

  return { checks, loading, error, refetch: fetchChecks };
}
