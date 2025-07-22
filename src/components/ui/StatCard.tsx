interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color?: 'green' | 'red' | 'yellow' | 'blue' | 'gray';
}

export function StatCard({
  label,
  value,
  icon,
  color = 'gray',
}: StatCardProps) {
  const colorClasses = {
    green: 'bg-gray-800 border-green-700 text-green-300',
    red: 'bg-gray-800 border-red-700 text-red-300',
    yellow: 'bg-gray-800 border-yellow-700 text-yellow-300',
    blue: 'bg-gray-800 border-blue-700 text-blue-300',
    gray: 'bg-gray-800 border-gray-700 text-gray-300',
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}
