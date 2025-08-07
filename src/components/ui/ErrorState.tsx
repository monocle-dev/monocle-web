interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="text-center py-12 bg-gray-900 min-h-screen flex items-center justify-center">
      <div>
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-white mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-400 mb-4">{error}</p>
      </div>
    </div>
  );
};

export const EmptyState = () => {
  return (
    <div className="text-center py-12 bg-gray-900 min-h-screen flex items-center justify-center">
      <div>
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-lg font-medium text-white mb-2">
          No data available
        </h3>
        <p className="text-gray-400">
          There's no data to display at the moment.
        </p>
      </div>
    </div>
  );
};
