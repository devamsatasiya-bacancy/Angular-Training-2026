import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ErrorService } from './services/error-service';
import { LoadingService } from './services/loading-service';
import { NetworkStatusService } from './services/network-status-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private errorService = inject(ErrorService);
  private loadingService = inject(LoadingService);
  private networkStatusService = inject(NetworkStatusService);

  error$ = this.errorService.error$;
  loading$ = this.loadingService.loading$;
  online$ = this.networkStatusService.online$;

  ngOnInit(): void {
    console.log(' Book Manager App - Ready');
  }

  clearGlobalError(): void {
    this.errorService.clearError();
  }
}
