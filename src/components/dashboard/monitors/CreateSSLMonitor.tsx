import type { CreateMonitorRequest } from '../../../interfaces/Monitor';

interface CreateSSLMonitorProps {
  formData: CreateMonitorRequest;
  onConfigChange: (key: string, value: unknown) => void;
}

const CreateSSLMonitor = ({
  formData,
  onConfigChange,
}: CreateSSLMonitorProps) => {
  const config = formData.config as Record<string, unknown>;

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
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Days Before Expiry Warning
        </label>
        <input
          type="number"
          value={Number(config.days_before_expiry || 30)}
          onChange={(e) =>
            onConfigChange('days_before_expiry', parseInt(e.target.value))
          }
          min="1"
          max="365"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          max="60"
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="verify_chain"
            checked={Boolean(config.verify_chain)}
            onChange={(e) => onConfigChange('verify_chain', e.target.checked)}
            className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="verify_chain" className="ml-2 text-sm text-gray-300">
            Verify Certificate Chain
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check_san"
            checked={Boolean(config.check_san)}
            onChange={(e) => onConfigChange('check_san', e.target.checked)}
            className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="check_san" className="ml-2 text-sm text-gray-300">
            Check Subject Alternative Names (SAN)
          </label>
        </div>
      </div>
    </>
  );
};

export default CreateSSLMonitor;
