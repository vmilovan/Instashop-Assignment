import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    Home page
    <button type="button" class="btn btn-primary">Primary</button>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'client';
}
