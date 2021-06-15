import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  template: `
    <div class="upload-container">
      <img [src]="previewImageSrc" *ngIf="previewImageSrc" style="height: 150px; width: 150px;">
      <button class="btn btn-primary" (click)="fileInput.click()" [title]="fileName">{{ slicedFilename }}</button>
      <input hidden type="file" (change)="fileUploadChange(fileInput.files)" #fileInput>
    </div>
  `,
  styles: [`
    .upload-container {
      display: flex;
      align-items: center;
      border: 2px dashed #ced4da;
      margin: .5rem;
      padding: 0.5rem;
      border-radius: 5px;
    }
    img {
      margin-right: 1.2rem;
      padding: 0.25rem;
      border: 1px solid #ddd;
    }
  `
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadFileComponent),
    multi: true
  }]
})
export class UploadFileComponent implements OnInit, ControlValueAccessor {
  _value: File;
  onChanged: any = () => { }
  onTouched: any = () => { }

  previewImageSrc: string = null;
  file: File = null;

  constructor() { }

  get slicedFilename() {
    const MAX_FILENAME_CHARACTERS = 25;
    if (!this.file) {
      return 'Upload image';
    }
    let dots = '';
    if (this.file.name.length > MAX_FILENAME_CHARACTERS) {
      dots = '...';
    }
    return `${this.file.name.slice(0, MAX_FILENAME_CHARACTERS)}${dots}`;
  }

  get fileName() {
    if (!this.file) {
      return '';
    }
    return this.file.name;
  }

  writeValue(obj: File): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void { }

  fileUploadChange(files: FileList) {
    if (!files) return;
    const reader = new FileReader();


    this.file = files.item(0);

    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.previewImageSrc = reader.result as string;
      this.onChanged(this.file);
    }
  }

}
