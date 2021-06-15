import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoadImage]'
})
export class LazyLoadImageDirective implements OnInit {
  @HostBinding('attr.src') srcAttr;
  @Input() src: string;
  @Input() placeholderImg: string;

  supportsNativeLazyLoad = false;

  constructor(private el: ElementRef) {
    this.supportsNativeLazyLoad = 'loading' in HTMLImageElement.prototype;

    if (this.supportsNativeLazyLoad) {
      el.nativeElement.setAttribute('loading', 'lazy');
    }
  }

  ngOnInit(): void {
    console.count('test');
    if (this.canLazyLoad()) {
      this.lazyLoadImage();
    } else {
      this.setImageSrc();
    }
  }

  get elem() {
    return this.el.nativeElement;
  }

  private canLazyLoad() {
    return ((window && 'IntersectObserver' in window) && !this.supportsNativeLazyLoad);
  }

  private setImageSrc() {
    if (!this.src) {
      this.srcAttr = this.placeholderImg;
    } else {
      this.srcAttr = this.src;
    }
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        isIntersecting ? this.setImageSrc() : obs.unobserve(this.elem);
        console.log(isIntersecting, this.srcAttr);
      })
    });

    obs.observe(this.elem);
  }

}
