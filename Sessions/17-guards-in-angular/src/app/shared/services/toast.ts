import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class Toast {
  private readonly toastsState = signal<ToastMessage[]>([]);
  private nextId = 1;

  readonly toasts = this.toastsState.asReadonly();

  show(message: string, type: ToastMessage['type'] = 'info'): void {
    const toast: ToastMessage = {
      id: this.nextId++,
      message,
      type,
    };

    this.toastsState.update((toasts) => [...toasts, toast]);

    window.setTimeout(() => this.dismiss(toast.id), 3000);
  }

  dismiss(id: number): void {
    this.toastsState.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
