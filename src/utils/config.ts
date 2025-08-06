export const getConfig = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Convert HTTP URL to WebSocket URL
  const wsUrl = apiUrl
    .replace(/^https?:\/\//, 'ws://')
    .replace(/^http:\/\//, 'ws://');

  return {
    apiUrl,
    wsUrl,
  };
};
