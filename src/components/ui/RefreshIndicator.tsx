import { useState } from 'react';
import { FaSync } from 'react-icons/fa';

interface RefreshIndicatorProps {
  onRefresh: () => Promise<void> | void;
}

const RefreshIndicator = ({ onRefresh }: RefreshIndicatorProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className={`
          bg-white border border-gray-300 rounded-full p-3 shadow-lg
          hover:bg-gray-50 transition-all duration-200
          ${isRefreshing ? 'cursor-not-allowed opacity-50' : 'hover:shadow-xl'}
        `}
        title="Refresh dashboard"
      >
        <FaSync
          className={`w-4 h-4 text-gray-600 ${
            isRefreshing ? 'animate-spin' : ''
          }`}
        />
      </button>
    </div>
  );
};

export default RefreshIndicator;
