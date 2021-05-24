import { Component, OnInit } from '@angular/core';
import { LandmarkService } from '../landmark.service';
import { Landmark } from '../models/landmark';

@Component({
  selector: 'app-landmark-list',
  template: `
    <section class="landmark-list">
      <app-landmark *ngFor="let landmark of landmarks" [landmark]="landmark"></app-landmark>
    </section>
  `,
  styles: [
  ]
})
export class LandmarkListComponent implements OnInit {
  landmarks: Landmark[] = [
    {
      title: 'test',
      short_info: 'Lorem Ipsum la rem diago',
      photo_thumb: ''
    }
  ];

  constructor(private landmarkService: LandmarkService) { }

  ngOnInit(): void {
    this.landmarkService.getLandmarks().subscribe(landmarks => {
      this.landmarks = landmarks;
    })
  }

}
