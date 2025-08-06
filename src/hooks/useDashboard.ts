import { useState, useEffect, useCallback, useRef } from 'react';
import type { DashboardResponse, MonitorCheck } from '../interfaces/Monitor';
import { monitorsAdapter } from '../adapters/monitors-adapters';

export const useDashboard = (projectId: string) => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastRefreshRef = useRef(0);
  const refreshCooldown = 1000;

  const fetchDashboard = useCallback(
    async (skipCooldown = false) => {
      if (!projectId) {
        setLoading(false);
        setError('Project ID is required');
        return;
      }

      // Implement cooldown to prevent excessive API calls
      const now = Date.now();
      if (!skipCooldown && now - lastRefreshRef.current < refreshCooldown) {
        console.log('Skipping dashboard refresh due to cooldown');
        return;
      }

      lastRefreshRef.current = now;

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
    },
    [projectId, refreshCooldown]
  );

  // Initial load
  useEffect(() => {
    fetchDashboard(true); // Skip cooldown for initial load
  }, [fetchDashboard]);

  const refetch = useCallback(() => {
    fetchDashboard(true); // Skip cooldown for manual refresh
  }, [fetchDashboard]);

  const refreshFromWebSocket = useCallback(() => {
    fetchDashboard(); // Use cooldown for WebSocket refreshes
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refetch,
    refreshFromWebSocket,
  };
};

export const useMonitorDetails = (projectId: string, monitorId: string) => {
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
};
