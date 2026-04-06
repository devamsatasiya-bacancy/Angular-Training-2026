import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './interceptors/logging-interceptor';
import { loadingInterceptor } from './interceptors/loading-interceptor';
import { errorInterceptor } from './interceptors/error-interceptor';
import { basicHeadersInterceptor } from './interceptors/add-basic-headers-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes , withDebugTracing()),
    provideHttpClient(
      withInterceptors([
        basicHeadersInterceptor,
        loggingInterceptor,
        errorInterceptor,
        loadingInterceptor,
      ]),
      withFetch()
    )
  ]
};
