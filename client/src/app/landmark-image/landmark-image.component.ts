import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-landmark-image',
  template: `
    <img appLazyLoadImage [src]="imgSrc" (load)="onImageLoaded($event)" (click)="openFullSizeImage(fullSizeImg)" [ngClass]="imageClasses">
    <img *ngIf="!imageLoaded" src="assets/images/landmark-placeholder.png" [class]="imageClass">

    <ng-template #fullSizeImg let-modal>
      <div class="modal-body" style="min-height: 20rem;">
        <img [src]="fullSizeImgSrc" alt="" class="img-fluid" (load)="onFullSizeImageLoaded()">
        <ngx-ui-loader loaderId="full-img-loaded"></ngx-ui-loader>
      </div>
    </ng-template>
  `,
  styles: [`
    .thumb-img {
      padding: 0.2rem;
      border-radius: 5px;
      width: 250px;
      height: auto;
      cursor: pointer;
    }
    .modal-image {
      height: 90vh;
      width: auto;
    }
  `
  ]
})
export class LandmarkImageComponent implements OnInit {
  imageLoaded = false;
  fullSizeImgLoaded = false;

  @Input() imgSrc = '';
  @Input() fullSizeImgSrc = '';
  @Input() imageClass = '';

  get imageClasses() {
    const imgClasseObj = {};
    imgClasseObj[this.imageClass] = this.imageLoaded;
    return imgClasseObj;
  }

  constructor(private modalService: NgbModal, private ngxLoadingService: NgxUiLoaderService) { }

  ngOnInit(): void { }

  async openFullSizeImage(content) {
    this.ngxLoadingService.startLoader('full-img-loaded');
    let closeResult = -1;
    try {
      closeResult = await this.modalService.open(content, { centered: true }).result;
    } catch (reason) {
      closeResult = reason;
    }
    this.fullSizeImgLoaded = false;
  }

  onImageLoaded(event) {
    if (event.target.src !== '') {

      this.imageLoaded = true;
    }
  }

  onFullSizeImageLoaded() {
    this.fullSizeImgLoaded = true;
    this.ngxLoadingService.stopLoader('full-img-loaded');
  }

}
