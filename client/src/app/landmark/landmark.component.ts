import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILandmark, Landmark } from '../models/landmark';

@Component({
  selector: 'app-landmark',
  template: `
    <div class="card landmark">
      <app-landmark-image [imgSrc]="landmark.photo_thumb.url" [fullSizeImgSrc]="landmark.photo.url" imageClass="thumb-img"></app-landmark-image>

      <div class="landmark-details">
        <ng-container *ngIf="canEditLandmark; else gotoLandmark">
          <h2 class="landmark-title clickable" (click)="titleClicked.emit(landmark)">
            {{ landmark.title }}
            <i class="bi bi-pencil m-l-3"></i>
          </h2>
          <p class="landmark-info">{{ landmark.short_info }}</p>
        </ng-container>

        <ng-template #gotoLandmark>
          <h2 class="landmark-title" ><a class="landmark-title__link" [routerLink]="['/landmark-details']" 
              [queryParams]="{id: landmark.objectId}">{{ landmark.title }}</a></h2>
          <p class="landmark-info">{{ landmark.short_info }}</p>
        </ng-template>
      </div>
    </div>
    <ng-container *ngIf="showDetails">
      <div class="landmark-extra-details">
        <p class="landmark-description">{{ landmark.description }}</p>
        <p class="landmark-link">
          Website url: <a [href]="landmark.url" target="_blank">{{ landmark.url }}</a>
        </p>
      </div>
    </ng-container>
  `,
  styleUrls: ['./landmark.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class LandmarkComponent implements OnInit {
  private _landmark: Landmark;

  @Input() canEditLandmark = false;
  @Input() showDetails = false;
  get landmark() {
    return this._landmark;
  }

  @Input() set landmark(value: ILandmark) {
    this._landmark = new Landmark(value);
  };

  @Output() titleClicked = new EventEmitter<Landmark>();

  constructor() { }

  ngOnInit(): void {
  }

}
