import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { LoginModalComponent } from './login-modal.component';

@Component({
  selector: 'app-login',
  template: `
    <button class="btn primary-btn" (click)="openLoginModal()">Login</button>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private modalService: NgbModal, private loginService: LoginService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginService.loginClicked$.subscribe(({ username, password }) => {
      this.authService.login(username, password);
      this.modalService.dismissAll();
    })
  }

  async openLoginModal() {
    this.modalService.open(LoginModalComponent);
  }

}
