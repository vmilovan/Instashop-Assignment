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
    `
      .landmark-list {
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      }
    `
  ]
})
export class LandmarkListComponent implements OnInit {
  landmarks: Landmark[] = [];

  constructor(private landmarkService: LandmarkService) { }

  ngOnInit(): void {
    this.landmarkService.getLandmarks().subscribe(landmarks => {
      this.landmarks = landmarks.sort((a, b) => a.order - b.order);
    });
  }

}
