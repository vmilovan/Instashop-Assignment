import { Component, Input, OnInit } from '@angular/core';
import { Landmark } from '../models/landmark';

@Component({
  selector: 'app-landmark',
  template: `
    <div class="card landmark">
      <img [src]="landmark.photo_thumb" alt="" class="landmark-photo">

      <div class="landmark-details">
        <h2 class="landmark-title"><a class="landmark-title__link" [routerLink]="['./landmark-details']">{{ landmark.title }}</a></h2>
        <p class="landmark-info">{{ landmark.short_info }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./landmark.component.css']

})
export class LandmarkComponent implements OnInit {
  @Input() landmark: Landmark;

  constructor() {
    this.landmark = {
      photo_thumb: '',
      title: '',
      short_info: '',
      order: 0
    }
  }

  ngOnInit(): void {
  }

}
