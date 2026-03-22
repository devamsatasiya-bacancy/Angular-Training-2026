import { Directive,  ElementRef,  Host,  HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDisableBtn]',
  standalone: true
})
export class Loading  {

  //@HostBinding('disabled') isdisabled : boolean= false;

  constructor(private elementRef: ElementRef) {
    
  }
  
  @HostListener('click')
  onClick() {
    this.elementRef.nativeElement.disabled = true;
    setTimeout(() => {
      this.elementRef.nativeElement.disabled = false;
    }, 2000);
  }
}

