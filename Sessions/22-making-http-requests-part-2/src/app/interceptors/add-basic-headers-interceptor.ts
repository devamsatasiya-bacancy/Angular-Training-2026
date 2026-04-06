import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

/* this interceptor adds basic/common headers to all HTTP requests,  */
export const basicHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Custom-Header': 'MyCustomHeaderValue' // just for testing purposes.
  });

  const updatedReq = req.clone({
    headers: headers,
  });

  // passing the cloned request to the next handler
  return next(updatedReq);
};
