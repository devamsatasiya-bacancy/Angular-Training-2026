import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logs: LogEntry[] = [];
  private readonly maxLogs = 100;

  logRequest(method: string, url: string): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      type: 'request',
      method,
      url
    };
    
    this.addLog(entry);
    console.log(`[HTTP Request] ${method} ${url}`, entry);
  }

  logResponse(method: string, url: string, status: number, duration: number): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      type: 'response',
      method,
      url,
      status,
      duration
    };
    
    this.addLog(entry);
    console.log(`[HTTP Response] ${method} ${url} - ${status} (${duration}ms)`, entry);
  }

  logError(method: string, url: string, message: string, status?: number): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      type: 'error',
      method,
      url,
      status,
      message
    };
    
    this.addLog(entry);
    console.error(`[HTTP Error] ${method} ${url} - ${message}`, entry);
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}
