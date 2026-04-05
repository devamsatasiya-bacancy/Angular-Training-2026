import { Injectable, signal } from '@angular/core';
import { Observable, fromEvent, merge, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {
  private onlineStatus = signal<boolean>(navigator.onLine);
  
  online$: Observable<boolean>;
  
  constructor() {
    this.online$ = merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).pipe(
      startWith(navigator.onLine)
    );
    
    this.online$.subscribe(status => {
      this.onlineStatus.set(status);
      if (status) {
        console.log('[Network] Online');
      } else {
        console.warn('[Network] Offline');
      }
    });
  }
  
  isOnline(): boolean {
    return this.onlineStatus();
  }
}
