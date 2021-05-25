import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse

} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUser;
    const isLoggedIn = currentUser && currentUser.sessionToken;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Parse-Application-Id': 'NqqPKd9Mzzdk0Es6P7NdzXOXNb4tsqdq6Q8p0cZi'
    });
    if (isLoggedIn) {
      headers = headers.set('X-Parse-Session-Token', currentUser.sessionToken);
    }
    request = request.clone({
      headers: headers
    });

    return next.handle(request).pipe(
      tap({
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 401: {
                this.authService.logout();
                break;
              }
              default: {
                const { error } = err;
                if (error) {
                  console.log(error);
                }
                break;
              }
            }
          }
        }
      })
    );
  }
}