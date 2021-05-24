import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <app-login></app-login>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'client';
}
