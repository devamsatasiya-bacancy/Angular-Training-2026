import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggingService } from '../services/logging.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const loggingService = inject(LoggingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client Error: ${error.error.message}`;
      } else {
        errorMessage = `Server Error: ${error.status} - ${error.message}`;
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
      }

      loggingService.logError(
        req.method,
        req.url,
        errorMessage,
        error.status
      );

      const normalizedError = {
        message: errorMessage,
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        originalError: error
      };

      return throwError(() => normalizedError);
    })
  );
};
