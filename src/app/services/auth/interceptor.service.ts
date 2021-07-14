import { Injectable } from '@angular/core';
import { AuthGuard } from './auth.guard';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(public auth: AuthGuard) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    var token = this.auth.getToken(); //this.auth.getToken();
    if (token == null){
      token ="";
    }
    request = request.clone({
       setHeaders: {
         "Token": token
       }
     });
    return next.handle(request);
  }







}
