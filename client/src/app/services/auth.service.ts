import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

const guestUser: User = {
  email: '',
  emailVerified: false,
  objectId: '',
  sessionToken: '',
  username: 'guest'
}
const USER_STORAGE_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _user = new BehaviorSubject<User>(guestUser);
  isAuthenticated$ = this._user.asObservable().pipe(
    map(() => this.isAuthenticated)
  );

  get isAuthenticated() {
    return this.currentUser.emailVerified && this.currentUser.sessionToken !== '' && this.currentUser.username === 'admin';
  }

  get currentUser() {
    return this._user.value;
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    this.http.post<User>('login', { username, password }).subscribe({
      next: (user) => {
        this._user.next(user);
        this.saveUserToLocalstorage(user);
      }
    })
  }

  logout() {
    this.http.post<any>('logout', {}).subscribe({
      next: () => {
        this._user.next(guestUser);
        this.deleteUserFromLocalStorage();
      }
    })
  }

  saveUserToLocalstorage(user: User) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage(): User {
    let user: any = localStorage.getItem(USER_STORAGE_KEY);
    if (user) {
      user = JSON.parse(user) as User;
    } else {
      user = guestUser;
    }
    return user;
  }

  deleteUserFromLocalStorage() {
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  getUserSession() {
    const localUser = this.getUserFromLocalStorage();
    if (!localUser) return;

    const headers = new HttpHeaders()
      .set('X-Parse-Session-Token', localUser.sessionToken);

    this.http.get<User>('users/me', { headers }).subscribe(user => {
      this._user.next(user);
    }, () => {
      this.deleteUserFromLocalStorage();
    })
  }

}
