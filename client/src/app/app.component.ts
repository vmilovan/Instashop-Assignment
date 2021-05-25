import { Component } from '@angular/core';

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
  title = 'client';
}
