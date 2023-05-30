import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/CoreModule/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isAuth = this.authService.authenticationState;
    const urlValid = request.url.startsWith('http://localhost:443/auth/userupdate');
    if (isAuth && urlValid) {
      const token = this.authService.getJwtToken();
      console.log("TOKEN: ", token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }

  // addAuthToken(request: HttpRequest<any>) {
  //   const token = this.authService.getJwtToken();

  //   return request.clone({
  //       setHeaders: {
  //         JWT: `${token}`
  //       }
  //   })
  // }
}
