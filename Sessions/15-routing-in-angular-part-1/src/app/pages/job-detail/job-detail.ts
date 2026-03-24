import {  Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';


@Component({
  selector: 'app-job-detail',
  imports: [RouterLink],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.scss',
})
export class JobDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly jobService = inject(JobService);
  private jobId = signal<string | null>(null);


  constructor() {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.jobId.set(jobId);
  }
  
  protected readonly job = computed(() => {
    const id = this.jobId();
    return id ? this.jobService.getJobById(id) : undefined;
  });

  protected applyForJob(): void {
    const selectedJob = this.job();

    if (!selectedJob) {
      return;
    }
  }

  ngOnDestroy(): void {
    console.log("DESTROYED");
  }
  protected goBack(): void {
    void this.router.navigate(['/jobs']);
  }
}
