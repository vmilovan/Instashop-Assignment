import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandmarkService } from '../landmark.service';

@Component({
  selector: 'app-landmark-details-edit',
  templateUrl: 'landmark-details-edit.component.html',
  styles: []
})
export class LandmarkDetailsEditComponent implements OnInit {
  editLandmarkForm: FormGroup;

  constructor(private fb: FormBuilder, private landmarkService: LandmarkService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.landmarkService.editingLandmark$.subscribe(landmark => {
      const { title, description, short_info, order, url } = landmark;
      this.editLandmarkForm = this.fb.group({
        title: [title, [Validators.required]],
        short_info: [short_info, [Validators.required]],
        description: [description, [Validators.required]],
        url: [url, [Validators.required]],
        order: [order ?? 0, [Validators.min(0)]],
        photo: [null]
      });
    })
  }

  updateLandmark() {
    this.landmarkService.updateLandmark(this.editLandmarkForm.value).subscribe(
      res => console.log(res),
      err => console.error(err)
    );
  }

}
