import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverScale]',
})
export class HoverScale {

  @HostBinding('style.transform')
  @Input() appHoverScale = 'scale(1)';


  @HostListener('mouseenter')
  
  OnMouseEnter() {
    this.appHoverScale = 'scale(1.05)';
  }
  
  @HostListener('mouseleave')
  OnMouseLeave() {
    this.appHoverScale = 'scale(1)';
  }

}
