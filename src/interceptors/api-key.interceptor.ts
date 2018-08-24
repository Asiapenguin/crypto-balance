import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'X-CMC_PRO_API_KEY': '7e653e8c-1a3f-45bc-82c5-63eed2fa1a4d',
      'Content-Type': 'application/json'
    })
    const clone = req.clone({headers});
    return next.handle(clone);
  }
}
