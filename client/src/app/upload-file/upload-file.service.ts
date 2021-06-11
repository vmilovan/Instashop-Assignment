import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UploadFileService {
  constructor(private http: HttpClient) { }

  upload(file: File, landmarkId: string) {
    const data = new FormData();
    data.append('file', file);

    const headers = new HttpHeaders()
      .set('Content-Type', 'image/jpeg');

    const uploadRequest$ = this.http.post<any>(`files/${file.name}`, file, { headers })
      .pipe(tap(console.log), switchMap(response => this.http.put(`classes/DubaiLandmarks/${landmarkId}`, {
        "photo": {
          name: response.name,
          url: response.url,
          __type: 'File'
        }
      })));
    return uploadRequest$;
  }

}