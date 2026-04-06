export interface HttpErrorResponse {
  error: {
    message: string;
  };
  status: number;
  statusText: string;
  message: string;
  url: string | null;
}