import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <a [routerLink]="['/']" class="navbar-brand">
        <img src="assets/images/logo.svg" alt="" class="logo" height="40px">
      </a>
      <button class="navbar-toggler" type="button" (click)="toggleNavbar(navbarSupportedContent)" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent" #navbarSupportedContent>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" routerLinkActive="active">
            <a [routerLink]="['/']" class="nav-link">Home</a>
          </li>
        </ul>

        <div class="form-inline my-2 my-lg-0">
          <app-login></app-login>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .logo {

        margin: 0 -2rem;
      }
    `
  ]
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbar(navbarSupportedContent: HTMLDivElement) {
    if (navbarSupportedContent.style.display === 'none') {
      navbarSupportedContent.style.display = 'flex';
    } else {
      navbarSupportedContent.style.display = 'none';
    }

  }

}
