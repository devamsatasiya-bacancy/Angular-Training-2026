import {  Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly jobService = inject(JobService);

  protected readonly jobs = computed(() => this.jobService.jobs());

  protected openJob(jobId: string): void {

    void this.router.navigate([jobId] , {relativeTo: this.route});
  }
}
