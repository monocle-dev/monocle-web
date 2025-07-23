export interface MonitorConfig {
  // HTTP Monitor fields
  url?: string;
  method?: string;
  expected_status?: number;
  timeout?: number;
  headers?: Record<string, string>;

  // DNS Monitor fields
  domain?: string;
  record_type?: string;
  expected?: string;
  days_before_expiry?: number;
  verify_chain?: boolean;
  check_san?: boolean;

  // Database Monitor fields
  type?: string; // "mysql", "postgres"
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  ssl_mode?: string; // For postgres
}

export interface CreateMonitorRequest {
  name: string;
  type: 'http' | 'dns' | 'database';
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
  type: 'http' | 'dns' | 'database';
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
