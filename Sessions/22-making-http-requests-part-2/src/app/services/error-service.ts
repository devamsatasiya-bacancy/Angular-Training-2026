import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  
  error$: Observable<string | null> = this.errorSubject.asObservable();
  
  setError(message: string): void {
    this.errorSubject.next(message);
  }
  
  clearError(): void {
    this.errorSubject.next(null);
  }
  
  getError(): string | null {
    return this.errorSubject.value;
  }
}
