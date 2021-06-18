import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { ILandmark, Landmark } from './models/landmark';
import { AuthService } from './services/auth.service';
import { UploadFileService } from './upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private _landmarks = new BehaviorSubject<Landmark[]>([]);
  landmarks$ = this._landmarks.asObservable();

  private _selectLandmarkAction = new Subject<Landmark>();

  selectedLandmark$ = this._selectLandmarkAction.asObservable();

  constructor(
    private http: HttpClient,
    private uploadService: UploadFileService,
    private authService: AuthService,
    private ngxLoaderService: NgxUiLoaderService) { }

  fetchLandmarks() {
    this.http.get<any>(`classes/DubaiLandmarks`).pipe(
      map(response => response.results as Landmark[])
    ).subscribe(landmarks => this._landmarks.next(landmarks));
  }

  selectLandmark(landmark: Landmark) {

    this._selectLandmarkAction.next(landmark);
  }

  editLandmark(id: string) {
    if (this.authService.isAuthenticated) {
      // this._editLandmarkAction.next(id);
    }
  }

  getLandmark(id: string | null) {
    if (!id) {
      return of<Landmark>(new Landmark());
    }
    return this.http.get<any>(`classes/DubaiLandmarks/${id}`).pipe(
      map(landmark => new Landmark(landmark))
    );
  }

  updateLandmark(landmark: any, id: string, currentLandmark: any) {
    const { photo, ...partialLandmark } = landmark;
    this.ngxLoaderService.startLoader('edit-landmark-loader');
    let payload;

    return this.uploadService.upload(photo).pipe(
      switchMap((response) => {
        payload = { ...partialLandmark };
        if (response) {
          payload['photo'] = {
            name: response.name,
            url: response.url,
            __type: 'File'
          }
        }
        return this.http.put<ILandmark>(`classes/DubaiLandmarks/${id}`, payload);
      }),
      tap(response => {
        if (response.photo_thumb) {
          payload['photo_thumb'] = response.photo_thumb;
        } else {
          payload['photo'] = currentLandmark.photo;
          payload['photo_thumb'] = currentLandmark.photo_thumb;
        }
        this.ngxLoaderService.stopAllLoader('edit-landmark-loader');
        this.updateLandmarks({
          ...payload,
          ...landmark,
        }, id);
      })
    )

  }

  private updateLandmarks(data, id) {
    this.selectLandmark({ ...data });

    const currentLandmarks = [...this._landmarks.value];
    const landmarkToUpdateIndex = currentLandmarks.findIndex(landmark => landmark.objectId === id);
    if (landmarkToUpdateIndex === -1) {
      return;
    }
    const updatedLandmark = { objectId: id, ...data }
    currentLandmarks[landmarkToUpdateIndex] = { ...updatedLandmark };
    this._landmarks.next(currentLandmarks);
  }


}
