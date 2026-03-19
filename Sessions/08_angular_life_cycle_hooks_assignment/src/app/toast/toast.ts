import { Component, Input, signal, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent implements OnChanges {
  @Input() message: string = '';

  visible = signal(false);
  private timer: any;

  ngOnChanges(changes:SimpleChanges): void {
    if (changes['message'] && this.message) {
      this.visible.set(true);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.visible.set(false), 3000);
    }
  }
}
