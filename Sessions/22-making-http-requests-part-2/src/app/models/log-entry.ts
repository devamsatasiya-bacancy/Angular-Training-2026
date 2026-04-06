export interface LogEntry {
  timestamp: Date;
  type: 'request' | 'response' | 'error';
  method?: string;
  url?: string;
  status?: number;
  duration?: number;
  message?: string;
  data?: unknown;
}