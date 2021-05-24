import { HttpClient } from '@angular/common/http';
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
      }
    })
  }

}
