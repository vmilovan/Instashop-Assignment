import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  template: `
    <div class="custom-file">
      <input type="file" class="custom-file-input" id="customFile" (change)="fileUploadChange($event)">
      <label class="custom-file-label" for="customFile">Choose file</label>
    </div>
  `,
  styles: [
  ]
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fileUploadChange(event: any) {
    console.log(event);
  }

}
