import React from 'react';
import { FaWifi, FaExclamationTriangle } from 'react-icons/fa';

interface WebSocketStatusProps {
  isConnected: boolean;
  error?: string | null;
  className?: string;
}

export const WebSocketStatus: React.FC<WebSocketStatusProps> = ({
  isConnected,
  error,
  className = '',
}) => {
  if (error) {
    return (
      <div className={`flex items-center gap-2 text-red-400 ${className}`}>
        <FaExclamationTriangle className="w-4 h-4" />
        <span className="text-sm">Connection Error</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <FaWifi
          className={`w-4 h-4 ${
            isConnected ? 'text-green-400' : 'text-gray-500'
          }`}
        />
        {isConnected && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        )}
      </div>
      <span
        className={`text-sm ${
          isConnected ? 'text-green-400' : 'text-gray-500'
        }`}
      >
        {isConnected ? 'Live' : 'Disconnected'}
      </span>
    </div>
  );
};
