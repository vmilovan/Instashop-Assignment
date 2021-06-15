import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LandmarkService } from '../landmark.service';
import { Landmark } from '../models/landmark';

@Component({
  selector: 'app-landmark-details',
  templateUrl: './landmark-details.component.html',
  styles: []
})
export class LandmarkDetailsComponent implements OnInit {
  landmark$: Observable<Landmark>;

  constructor(private activatedRoute: ActivatedRoute, private landmarkService: LandmarkService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.landmark$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.landmarkService.getLandmark(id))
    );
  }

  async editLandmark(landmark: Landmark, content: any) {
    let closeResult = -1;
    this.landmarkService.setEditingLandmark(landmark);
    try {
      closeResult = await this.modalService.open(content, { centered: true }).result;

    } catch (reason) {

    }
  }

}
