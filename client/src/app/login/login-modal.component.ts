import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-modal',
  template: `
    <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">Sign in</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.close()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form [formGroup]="loginForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" class="form-control" formControlName="username">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" class="form-control" type="password" formControlName="password" autocomplete="off">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="submitForm()" [disabled]="!loginForm.valid">Sign in</button>
      </div>
  `,

})

export class LoginModalComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.loginService.clickLogin(this.loginForm.value);
    }
  }

}