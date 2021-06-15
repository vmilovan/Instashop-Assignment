import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landmark-image',
  template: `
    <img appLazyLoadImage [src]="imgSrc" imgPlaceholderSrc="assets/images/landmark-placeholder.png" (click)="openFullSizeImage(fullSizeImg)" *ngIf="!isFullSize; else fullSizeImg">

    <ng-template #fullSizeImg let-modal>
      <div class="modal-body">
        <img [src]="imgSrc" alt="" (click)="isFullSize = false">
      </div>
    </ng-template>
  `,
  styles: [
  ]
})
export class LandmarkImageComponent implements OnInit {
  @Input() imgSrc = '';

  isFullSize = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  async openFullSizeImage(content) {
    let closeResult = -1;
    try {
      closeResult = await this.modalService.open(content, { centered: true }).result;
    } catch (reason) {
      closeResult = reason;
    }
    this.isFullSize = true;
  }

}
