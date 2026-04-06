import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoggingService } from '../services/logging-service';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const loggingService = inject(LoggingService);
  const startTime = Date.now();

  loggingService.logRequest(req.method, req.url);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          loggingService.logResponse(req.method, req.url, event.status, duration);
        }
      },
      error: () => {
        const duration = Date.now() - startTime;
        console.log(`[HTTP] ${req.method} ${req.url} failed after ${duration}ms`);
      },
    }),
  );
};
