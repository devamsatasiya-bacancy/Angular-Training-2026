import { Directive, Host, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appStatusBorder]',
})
export class StatusBorder {
  border = '5px solid';

  @Input() appStatusBorder = 'green';

  @HostBinding('style.border')
  get borderColor() {
    console.log('Border color:', this.border + ''+ this.appStatusBorder);
    let color = this.border + ' ' + this.appStatusBorder;
    return color;
  }




}
