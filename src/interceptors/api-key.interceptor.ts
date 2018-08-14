import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clone = req.clone({headers: req.headers.set('X-CMC_PRO_API_KEY', '7e653e8c-1a3f-45bc-82c5-63eed2fa1a4d')});
    return next.handle(clone);
  }
}
