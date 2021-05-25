import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  get currentUser() {
    return this._user.value;
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    this.http.post<User>(`http://localhost:5000/parse/login`, { username, password }).subscribe({
      next: (user) => {
        this._user.next(user);
        this.saveUserToLocalstorage(user);
      }
    })
  }

  logout() {
    this.http.post<any>(`http://localhost:5000/parse/logout`, {}).subscribe({
      next: () => {
        this._user.next(guestUser);
        this.deleteUserFromLocalStorage();
      }
    })
  }

  saveUserToLocalstorage(user: User) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    let user: any = localStorage.getItem(USER_STORAGE_KEY);
    if (user) {
      user = JSON.parse(user);
    } else {
      user = guestUser;
    }
    return user;
  }

  deleteUserFromLocalStorage() {
    localStorage.removeItem(USER_STORAGE_KEY);
  }

}
