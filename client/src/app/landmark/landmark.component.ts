import { Component, Input, OnInit } from '@angular/core';
import { ILandmark, Landmark } from '../models/landmark';

@Component({
  selector: 'app-landmark',
  template: `
    <div class="card landmark">
      <img [src]="landmark.photo_thumb.url" alt="" class="landmark-photo">

      <div class="landmark-details">
        <h2 class="landmark-title"><a class="landmark-title__link" [routerLink]="['./landmark-details']" [queryParams]="{id: landmark.objectId}">{{ landmark.title }}</a></h2>
        <p class="landmark-info">{{ landmark.short_info }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./landmark.component.css']

})
export class LandmarkComponent implements OnInit {
  private _landmark: Landmark;
  get landmark() {
    return this._landmark;
  }

  @Input() set landmark(value: ILandmark) {
    this._landmark = new Landmark(value);
  };

  constructor() { }

  ngOnInit(): void {
  }

}
