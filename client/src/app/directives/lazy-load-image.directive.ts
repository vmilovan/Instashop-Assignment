import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoadImage]'
})
export class LazyLoadImageDirective implements OnInit {
  private _src: string;

  @HostBinding('attr.src') srcAttr;

  get src() {
    return this._src;
  }
  @Input() set src(value: string) {
    this._src = value;
    this.setImageSrc();
  }

  supportsNativeLazyLoad = false;

  constructor(private el: ElementRef) {
    this.supportsNativeLazyLoad = 'loading' in HTMLImageElement.prototype;

    if (this.supportsNativeLazyLoad) {
      el.nativeElement.setAttribute('loading', 'lazy');
    }
  }

  ngOnInit(): void {
    if (this.canLazyLoad()) {
      this.lazyLoadImage();
    }
  }

  get elem() {
    return this.el.nativeElement;
  }

  private canLazyLoad() {
    return ((window && 'IntersectObserver' in window) && !this.supportsNativeLazyLoad);
  }

  private setImageSrc() {
    this.srcAttr = this.src;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        isIntersecting ? this.setImageSrc() : obs.unobserve(this.elem);
      })
    });

    obs.observe(this.elem);
  }

}
