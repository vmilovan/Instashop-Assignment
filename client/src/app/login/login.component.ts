import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { LoginModalComponent } from './login-modal.component';

@Component({
  selector: 'app-login',
  template: `
    <button class="btn btn-outline-primary" (click)="openLoginModal()" *ngIf="!(isAuthenticated$ | async) as isLoggedIn; else logoutBtn">Login</button>
    <ng-template #logoutBtn>
      <button class="btn primary-btn" (click)="logout()">Logout</button>
    </ng-template>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private modalService: NgbModal, private loginService: LoginService, private authService: AuthService) { }


  ngOnInit(): void {
    this.loginService.loginClicked$.subscribe(({ username, password }) => {
      this.authService.login(username, password);
      this.modalService.dismissAll();
    })

    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  openLoginModal() {
    this.modalService.open(LoginModalComponent, { centered: true });
  }

  logout() {
    this.authService.logout();
  }

}
