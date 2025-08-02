import type { CreateMonitorRequest } from '../../../interfaces/Monitor';

interface CreateHTTPMonitorProps {
  formData: CreateMonitorRequest;
  onConfigChange: (key: string, value: unknown) => void;
}

const CreateHTTPMonitor = ({
  formData,
  onConfigChange,
}: CreateHTTPMonitorProps) => {
  const { config } = formData;

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          URL
        </label>
        <input
          type="url"
          value={String(config.url || '')}
          onChange={(e) => onConfigChange('url', e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          placeholder="https://example.com/api/health"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          HTTP Method
        </label>
        <select
          value={String(config.method || 'GET')}
          onChange={(e) => onConfigChange('method', e.target.value)}
          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="HEAD">HEAD</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Expected Status Code
        </label>
        <input
          type="number"
          value={Number(config.expected_status || 200)}
          onChange={(e) =>
            onConfigChange('expected_status', parseInt(e.target.value))
          }
          min="100"
          max="599"
          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Timeout (seconds)
        </label>
        <input
          type="number"
          value={Number(config.timeout || 30)}
          onChange={(e) => onConfigChange('timeout', parseInt(e.target.value))}
          min="1"
          max="300"
          className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
    </>
  );
};

export default CreateHTTPMonitor;
