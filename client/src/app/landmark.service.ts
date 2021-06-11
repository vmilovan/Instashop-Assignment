import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
      return of<Landmark>(new Landmark());
    }
    return this.http.get<any>(`classes/DubaiLandmarks/${id}`).pipe(
      map(landmark => new Landmark(landmark))
    );
  }

  constructor(private http: HttpClient) { }

  getLandmarks() {
    return this.http.get<any>(`classes/DubaiLandmarks`).pipe(
      map(response => <Landmark[]>response.results)
    );
  }
}
