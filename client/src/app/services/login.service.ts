import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private _loginClicked = new Subject<{ username: string, password: string }>();
  loginClicked$ = this._loginClicked.asObservable();

  constructor() { }

  clickLogin(loginFormValue: any) {
    this._loginClicked.next(loginFormValue);
  }

}