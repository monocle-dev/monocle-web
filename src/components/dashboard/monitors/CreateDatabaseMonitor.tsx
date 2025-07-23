import { useEffect } from 'react';
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

  // Set default port when database type changes or component mounts
  useEffect(() => {
    if (!config.port) {
      const defaultPort = config.type === 'postgres' ? 5432 : 3306;
      onConfigChange('port', defaultPort);
    }
  }, [config.type, config.port, onConfigChange]);

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Database Type
        </label>
        <select
          value={String(config.type || 'mysql')}
          onChange={(e) => {
            const newType = e.target.value;
            onConfigChange('type', newType);
            // Auto-update port when type changes
            const defaultPort = newType === 'postgres' ? 5432 : 3306;
            onConfigChange('port', defaultPort);
          }}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="mysql">MySQL</option>
          <option value="postgres">PostgreSQL</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Host
          </label>
          <input
            type="text"
            value={String(config.host || '')}
            onChange={(e) => onConfigChange('host', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="localhost or IP address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Port
          </label>
          <input
            type="number"
            value={Number(
              config.port || (config.type === 'postgres' ? 5432 : 3306)
            )}
            onChange={(e) => {
              const portValue = parseInt(e.target.value);
              // Only update if it's a valid number, otherwise keep the current value
              if (!isNaN(portValue) && portValue > 0) {
                onConfigChange('port', portValue);
              } else if (e.target.value === '') {
                // If field is cleared, set to default
                onConfigChange(
                  'port',
                  config.type === 'postgres' ? 5432 : 3306
                );
              }
            }}
            min="1"
            max="65535"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={config.type === 'postgres' ? '5432' : '3306'}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Database Name
        </label>
        <input
          type="text"
          value={String(config.database || '')}
          onChange={(e) => onConfigChange('database', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Database name to connect to"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            value={String(config.username || '')}
            onChange={(e) => onConfigChange('username', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Database username"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            value={String(config.password || '')}
            onChange={(e) => onConfigChange('password', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Database password"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Timeout (seconds)
          </label>
          <input
            type="number"
            value={Number(config.timeout || 30)}
            onChange={(e) =>
              onConfigChange('timeout', parseInt(e.target.value))
            }
            min="1"
            max="300"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="30"
          />
        </div>

        {config.type === 'postgres' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              SSL Mode
            </label>
            <select
              value={String(config.ssl_mode || 'prefer')}
              onChange={(e) => onConfigChange('ssl_mode', e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="disable">Disable</option>
              <option value="require">Require</option>
              <option value="verify-ca">Verify CA</option>
              <option value="verify-full">Verify Full</option>
              <option value="prefer">Prefer</option>
              <option value="allow">Allow</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-gray-800 border border-gray-600 rounded p-3">
        <h4 className="text-sm font-medium text-gray-300 mb-2">
          Connection Test
        </h4>
        <p className="text-xs text-gray-400">
          This monitor will attempt to connect to your database and verify the
          connection is successful. Make sure the database server is accessible
          from our monitoring infrastructure.
        </p>
      </div>
    </>
  );
};

export default CreateDatabaseMonitor;
