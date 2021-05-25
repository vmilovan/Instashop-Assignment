import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Landmark } from './models/landmark';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  constructor(private http: HttpClient) { }

  getLandmarks() {
    return this.http.get<any>(`http://localhost:5000/parse/classes/DubaiLandmarks`).pipe(
      map(response => <Landmark[]>response.results)
    );
  }
}
