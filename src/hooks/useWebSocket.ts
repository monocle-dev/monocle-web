import { useEffect, useRef, useCallback, useState } from 'react';
import { MonocleWebSocket } from '../services/websocket';

export const useMonocleWebSocket = (
  projectId: string | undefined,
  serverUrl: string = 'ws://localhost:3000'
) => {
  const wsRef = useRef<MonocleWebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

  // Callback for when a refresh is needed
  const onRefreshNeededRef = useRef<(() => void) | null>(null);

  const connect = useCallback(() => {
    if (!projectId) return;

    // Disconnect existing connection
    if (wsRef.current) {
      wsRef.current.disconnect();
    }

    wsRef.current = new MonocleWebSocket(projectId, serverUrl, {
      onConnected: () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setError(null);
      },
      onDisconnected: () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
      },
      onError: (error) => {
        console.error('WebSocket error:', error);
        setError('WebSocket connection error');
        setIsConnected(false);
      },
      onRefreshNeeded: () => {
        console.log('Dashboard refresh needed');
        setLastRefreshTime(Date.now());
        onRefreshNeededRef.current?.();
      },
      onMaxReconnectAttemptsReached: () => {
        setError('Failed to reconnect after multiple attempts');
        setIsConnected(false);
      },
    });

    wsRef.current.connect();
  }, [projectId, serverUrl]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.disconnect();
      wsRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const setOnRefreshNeeded = useCallback((callback: (() => void) | null) => {
    onRefreshNeededRef.current = callback;
  }, []);

  // Connect when projectId changes
  useEffect(() => {
    if (projectId) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [projectId, connect, disconnect]);

  return {
    isConnected,
    error,
    lastRefreshTime,
    connect,
    disconnect,
    setOnRefreshNeeded,
  };
};
