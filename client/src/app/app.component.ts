import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <header class="navbar">
      <app-login></app-login>
    </header>
    <main class="container-fluid">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.getUserSession();
  }
}
