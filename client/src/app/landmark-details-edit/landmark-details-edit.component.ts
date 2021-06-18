import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILandmark, Landmark } from '../models/landmark';

@Component({
  selector: 'app-landmark-details-edit',
  templateUrl: 'landmark-details-edit.component.html',
  styles: [`
    .needs-validation .invalid-feedback {
      display: block;
    }
  `]
})
export class LandmarkDetailsEditComponent implements OnInit {
  editLandmarkForm: FormGroup;
  @Input() landmarkToEdit: Landmark;
  @Output() editLandmarkEnd = new EventEmitter<{ landmark: ILandmark, success: boolean }>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get formClass() {
    return this.editLandmarkForm.invalid ? 'needs-validation' : 'was-validated';
  }

  get title() { return this.editLandmarkForm.get('title') }
  get short_info() { return this.editLandmarkForm.get('short_info') }
  get description() { return this.editLandmarkForm.get('description') }
  get url() { return this.editLandmarkForm.get('url') }
  get order() { return this.editLandmarkForm.get('order') }

  buildForm() {
    const { title, description, short_info, order, url } = this.landmarkToEdit;
    this.editLandmarkForm = this.fb.group({
      title: [title, [Validators.required]],
      short_info: [short_info, [Validators.required]],
      description: [description, [Validators.required]],
      url: [url, [Validators.required]],
      order: [order ?? 0, [Validators.required, Validators.min(0)]],
      photo: [null]
    });
  }

  submitForm() {
    this.editLandmarkEnd.emit({
      landmark: this.editLandmarkForm.value,
      success: this.editLandmarkForm.valid
    })
  }

}
