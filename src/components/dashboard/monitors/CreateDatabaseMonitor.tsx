import type { CreateMonitorRequest } from '../../../interfaces/Monitor';

interface CreateDatabaseMonitorProps {
  formData: CreateMonitorRequest;
  onConfigChange: (key: string, value: unknown) => void;
}

const CreateDatabaseMonitor = ({
  formData,
  onConfigChange,
}: CreateDatabaseMonitorProps) => {
  const config = formData.config as Record<string, unknown>;

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Database Type
        </label>
        <select
          value={String(config.db_type || 'postgres')}
          onChange={(e) => onConfigChange('db_type', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="postgres">PostgreSQL</option>
          <option value="mysql">MySQL</option>
          <option value="mongodb">MongoDB</option>
          <option value="redis">Redis</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Connection String
        </label>
        <input
          type="text"
          value={String(config.connection_string || '')}
          onChange={(e) => onConfigChange('connection_string', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="postgresql://user:pass@host:port/db"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Test Query (optional)
        </label>
        <textarea
          value={String(config.test_query || '')}
          onChange={(e) => onConfigChange('test_query', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="SELECT 1; (leave empty for basic connection test)"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Connection Timeout (seconds)
        </label>
        <input
          type="number"
          value={Number(config.timeout || 10)}
          onChange={(e) => onConfigChange('timeout', parseInt(e.target.value))}
          min="1"
          max="60"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </>
  );
};

export default CreateDatabaseMonitor;
