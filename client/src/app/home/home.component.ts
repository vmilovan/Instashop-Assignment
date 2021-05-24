import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-landmark-list></app-landmark-list>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
