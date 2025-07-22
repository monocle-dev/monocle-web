// export interface HttpConfig {
//   method: string;
//   url: string;
//   headers: Record<string, string>;
//   expected_status: number;
//   timeout: number;
// }

// export interface DNSConfig {
//   domain: string;
//   record_type: string; // A, AAAA, CNAME, MX, TXT, etc.
//   expected: string; // Expected IP/value (optional)
//   timeout: number; // Timeout in seconds
// }

// export interface SSLConfig {
//   url: string;
//   days_before_expiry: number; // Alert if cert expires within X days
//   verify_chain: boolean; // Verify certificate chain
//   check_san: boolean; // Check Subject Alternative Names
//   timeout: number; // Timeout in seconds
// }

export interface MonitorConfig {
  url?: string;
  method?: string;
  expected_status?: number;
  timeout?: number;
  headers?: Record<string, string>;
  domain?: string;
  record_type?: string;
  expected?: string;
  days_before_expiry?: number;
  verify_chain?: boolean;
  check_san?: boolean;
}

// Placeholder interfaces for future implementation
export interface DatabaseConfig {
  // TODO: Implement when backend is ready
  connection_string?: string;
  db_type?: string;
  test_query?: string;
  timeout?: number;
}

export interface CreateMonitorRequest {
  name: string;
  type: 'http' | 'dns' | 'ssl' | 'database';
  interval: number; // Interval in seconds
  config: MonitorConfig;
}

export interface DashboardResponse {
  project: {
    id: number;
    name: string;
    description: string;
  };
  monitors_summary: {
    total: number;
    active: number;
    down: number;
    warning: number;
  };
  monitors: MonitorSummary[];
  recent_incidents: IncidentSummary[];
}

export interface MonitorSummary {
  id: number;
  name: string;
  type: 'http' | 'dns' | 'ssl' | 'database';
  status: 'active' | 'paused' | 'inactive';
  interval: number; // seconds
  config: MonitorConfig;
  last_check?: {
    id: number;
    status: 'success' | 'failure' | 'timeout';
    response_time: number; // milliseconds
    message: string;
    checked_at: string; // ISO datetime
  };
  uptime_percentage?: number; // 0-100
  avg_response_time?: number; // milliseconds
}

export interface MonitorCheck {
  id: number;
  monitor_id: number;
  status: 'success' | 'failure' | 'timeout';
  response_time: number; // milliseconds
  message: string;
  checked_at: string; // ISO datetime
  created_at: string; // ISO datetime
}

export interface IncidentSummary {
  id: number;
  monitor_id: number;
  monitor_name: string;
  status: 'ongoing' | 'resolved';
  started_at: string;
  resolved_at?: string;
  duration?: number; // seconds
}
