import type { CreateMonitorRequest } from '../../../interfaces/Monitor';

interface CreateDNSMonitorProps {
  formData: CreateMonitorRequest;
  onConfigChange: (key: string, value: unknown) => void;
}

const CreateDNSMonitor = ({
  formData,
  onConfigChange,
}: CreateDNSMonitorProps) => {
  const config = formData.config as Record<string, unknown>;

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Domain
        </label>
        <input
          type="text"
          value={String(config.domain || '')}
          onChange={(e) => onConfigChange('domain', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Record Type
        </label>
        <select
          value={String(config.record_type || 'A')}
          onChange={(e) => onConfigChange('record_type', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="A">A Record</option>
          <option value="AAAA">AAAA Record</option>
          <option value="CNAME">CNAME Record</option>
          <option value="MX">MX Record</option>
          <option value="TXT">TXT Record</option>
          <option value="NS">NS Record</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Expected Value (optional)
        </label>
        <input
          type="text"
          value={String(config.expected || '')}
          onChange={(e) => onConfigChange('expected', e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Leave empty to just check resolution"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Timeout (seconds)
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

export default CreateDNSMonitor;
