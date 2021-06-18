import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadFileService {
  constructor(private http: HttpClient) { }

  upload(file: File) {
    if (!file) {
      return of(null);
    }

    const headers = new HttpHeaders()
      .set('Content-Type', file.type);

    return this.http.post<any>(`files/${file.name}`, file, { headers });
  }

}