import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload-file',
  template: `
    <button class="btn btn-primary" (click)="fileInput.click()">{{ file ? file.name : 'Upload image' }}</button>
    <input hidden type="file" (change)="fileUploadChange(fileInput.files)" #fileInput>
  `,
  styles: []
})
export class UploadFileComponent implements OnInit {
  file: File = null;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }

  fileUploadChange(files: FileList) {
    if (!files) return;
    this.file = files.item(0);
    this.uploadFileService.upload(this.file, 'aWN0HS8Hm0').subscribe();
  }

}
