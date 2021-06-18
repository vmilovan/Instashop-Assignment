import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { LandmarkService } from '../landmark.service';
import { Landmark } from '../models/landmark';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landmark-details',
  templateUrl: './landmark-details.component.html',
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandmarkDetailsComponent implements OnInit, OnDestroy {
  landmark$: Observable<Landmark>;
  isAuthenticated$ = this.authService.isAuthenticated$;
  landmarkId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private landmarkService: LandmarkService,
    private modalService: NgbModal,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(
      map(params => params.get('id')),
      tap(id => this.landmarkId = id),
      switchMap(id => this.landmarkService.getLandmark(id)),
      take(1),
      tap((landmark) => this.landmarkService.selectLandmark(landmark)),
    ).subscribe();
    this.landmark$ = this.landmarkService.selectedLandmark$;
  }

  async editLandmark(landmark: Landmark, content: any) {
    this.landmarkService.editLandmark(landmark.objectId);
    try {
      await this.modalService.open(content, { centered: true }).result;
    } catch (reason) {
    }
  }

  updateLandmark(event, currentLandmark) {
    const { landmark, success } = event;
    if (!success) {
      return;
    }
    this.landmarkService.updateLandmark(landmark, this.landmarkId, currentLandmark).subscribe(
      res => {
        console.log(res);
        this.modalService.dismissAll();
        // this.activeModal.dismiss();
      },
      err => console.error(err)
    );

  }

  ngOnDestroy() {
  }

}
