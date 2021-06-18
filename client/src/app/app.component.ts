import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-navbar></app-navbar>

      <main class="container-fluid">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.getUserSession();
  }
}
