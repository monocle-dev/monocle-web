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

  // Set default values when component mounts or when needed
  useEffect(() => {
    // Set default database type if not set
    if (!config.type) {
      onConfigChange('type', 'postgres');
    }

    // Set default port if not set
    if (!config.port) {
      const defaultPort = (config.type || 'postgres') === 'mysql' ? 3306 : 5432;
      onConfigChange('port', defaultPort);
    }

    // Set default SSL mode for postgres if not set
    if ((config.type || 'postgres') === 'postgres' && !config.ssl_mode) {
      onConfigChange('ssl_mode', 'prefer');
    }
  }, [config.type, config.port, config.ssl_mode, onConfigChange]);

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Database Type
        </label>
        <select
          value={String(config.type || 'postgres')}
          onChange={(e) => {
            const newType = e.target.value;
            onConfigChange('type', newType);

            // Auto-update port when type changes
            const defaultPort = newType === 'mysql' ? 3306 : 5432;
            onConfigChange('port', defaultPort);

            // Set default SSL mode for postgres, remove for mysql
            if (newType === 'postgres') {
              onConfigChange('ssl_mode', 'prefer');
            } else {
              // Remove ssl_mode for mysql to keep the config clean
              onConfigChange('ssl_mode', null);
            }
          }}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="postgres">PostgreSQL</option>
          <option value="mysql">MySQL</option>
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
            placeholder="host"
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
              config.port ||
                ((config.type || 'postgres') === 'mysql' ? 3306 : 5432)
            )}
            onChange={(e) => {
              const portValue = parseInt(e.target.value);
              // Only update if it's a valid number, otherwise keep the current value
              if (!isNaN(portValue) && portValue > 0) {
                onConfigChange('port', portValue);
              } else if (e.target.value === '') {
                // If field is cleared, set to default
                const currentType = config.type || 'postgres';
                onConfigChange('port', currentType === 'mysql' ? 3306 : 5432);
              }
            }}
            min="1"
            max="65535"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={
              (config.type || 'postgres') === 'mysql' ? '3306' : '5432'
            }
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

        {(config.type || 'postgres') === 'postgres' && (
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
