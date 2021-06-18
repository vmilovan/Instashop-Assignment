import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { LandmarkService } from '../landmark.service';

@Component({
  selector: 'app-landmark-list',
  template: `
    <section class="container" >
      <div class="row mb-4" *ngFor="let landmark of (landmarks | async)">
        <div class="col">
          <app-landmark [landmark]="landmark"></app-landmark>
        </div>
      </div>
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
  landmarks = this.landmarkService.landmarks$.pipe(
    map(landmarks => landmarks.sort((a, b) => a.order - b.order))
  );

  constructor(private landmarkService: LandmarkService) { }

  ngOnInit(): void {
    this.landmarkService.fetchLandmarks();
  }

}
