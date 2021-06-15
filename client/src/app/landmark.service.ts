import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ILandmark, Landmark } from './models/landmark';
import { UploadFileService } from './upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private _selectedLandmark = new Subject();
  selectedLandmark$ = this._selectedLandmark.asObservable();

  private _editingLandmark = new BehaviorSubject<Landmark>(null);
  editingLandmark$ = this._editingLandmark.asObservable();

  constructor(private http: HttpClient, private uploadService: UploadFileService) { }

  setSelectedLandmark(landmark: Landmark) {
    this._selectedLandmark.next(landmark);
  }

  setEditingLandmark(landmark: Landmark) {
    this._editingLandmark.next(landmark);
  }

  getLandmarks() {
    return this.http.get<any>(`classes/DubaiLandmarks`).pipe(
      map(response => <Landmark[]>response.results)
    );
  }

  getLandmark(id: string | null) {
    if (!id) {
      return of<Landmark>(new Landmark());
    }
    return this.http.get<any>(`classes/DubaiLandmarks/${id}`).pipe(
      map(landmark => new Landmark(landmark))
    );
  }

  updateLandmark(landmark: any) {
    const id = this._editingLandmark.value.objectId;
    const { photo, ...partialLandmark } = landmark;
    return this.uploadService.upload(photo, id).pipe(
      switchMap(() => this.http.put<ILandmark>(`classes/DubaiLandmarks/${id}`, partialLandmark)),
      tap(response => {
        this._selectedLandmark.next({
          ...landmark,
          photo: response.photo,
          photo_thumb: response.photo_thumb
        })

      })
    );
  }


}
