import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ErrorService } from './services/error.service';
import { LoadingService } from './services/loading.service';
import { NetworkStatusService } from './services/network-status.service';
import { LoggingService } from './services/logging.service';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private errorService = inject(ErrorService);
  private loadingService = inject(LoadingService);
  private networkStatusService = inject(NetworkStatusService);
  private loggingService = inject(LoggingService);
  private bookService = inject(BookService);

  error$ = this.errorService.error$;
  loading$ = this.loadingService.loading$;
  online$ = this.networkStatusService.online$;

  ngOnInit(): void {
    console.log('App initialized - Services ready');
    console.log('Interceptors: Logging → Loading → Error');
  }

  testErrorService(): void {
    this.errorService.setError('This is a test error message!');
    setTimeout(() => this.errorService.clearError(), 3000);
  }

  testLoadingService(): void {
    this.loadingService.show();
    setTimeout(() => this.loadingService.hide(), 2000);
  }

  testLoggingService(): void {
    this.loggingService.logRequest('GET', '/api/test');
    setTimeout(() => {
      this.loggingService.logResponse('GET', '/api/test', 200, 150);
    }, 100);
  }

  testInterceptors(): void {
    console.log('--- Testing HTTP Interceptors ---');
    
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('✓ Books fetched successfully:', data);
      },
      error: (err) => {
        console.log('✗ Error from interceptor:', err);
        this.errorService.setError(err.message);
      }
    });
  }
}
