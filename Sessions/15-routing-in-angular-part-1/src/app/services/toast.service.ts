import { Injectable, computed, signal } from '@angular/core';

export interface ToastMessage {
  id: number;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messagesState = signal<ToastMessage[]>([]);
  private nextId = 1;

  readonly messages = computed(() => this.messagesState());

  show(text: string): void {
    const id = this.nextId++;

    this.messagesState.update((messages) => [...messages, { id, text }]);

    window.setTimeout(() => {
      this.messagesState.update((messages) => messages.filter((message) => message.id !== id));
    }, 2600);
  }
}
