import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Landmark } from './models/landmark';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  private _selectedLandmark = new Subject();
  selectedLandmark$ = this._selectedLandmark.asObservable();

  setSelectedLandmark(landmark: Landmark) {
    this._selectedLandmark.next(landmark);

  }

  getLandmark(id: string | null) {
    if (!id) {
      return of<Landmark>({ objectId: '', order: 0, photo_thumb: '', short_info: '', title: '' });
    }
    return this.http.get<any>(`http://localhost:5000/parse/classes/DubaiLandmarks/${id}`);
  }

  constructor(private http: HttpClient) { }

  getLandmarks() {
    return this.http.get<any>(`http://localhost:5000/parse/classes/DubaiLandmarks`).pipe(
      map(response => <Landmark[]>response.results)
    );
  }
}
