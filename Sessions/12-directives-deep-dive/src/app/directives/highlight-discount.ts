import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightDiscount]',
})
export class HighlightDiscount {

  @HostBinding('style.backgroundColor')
  @Input() appHighlightDiscount = 'yellow';

}
