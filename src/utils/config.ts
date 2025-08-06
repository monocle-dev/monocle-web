export const getConfig = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Convert HTTP URL to WebSocket URL
  const wsUrl = apiUrl.startsWith('https://')
    ? apiUrl.replace(/^https:\/\//, 'wss://')
    : apiUrl.replace(/^http:\/\//, 'ws://');

  return {
    apiUrl,
    wsUrl,
  };
};
