import { Injectable, computed, signal } from '@angular/core';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly jobsState = signal<Job[]>([
    {
      id: 'frontend-engineer',
      title: 'Frontend Engineer',
      company: 'PixelForge Studio',
      location: 'Ahmedabad, India',
      type: 'Full-time',
      salary: '10-14 LPA',
      summary: 'Build fast Angular interfaces for a hiring dashboard used by growing startups.',
      description:
        'You will work on reusable UI blocks, routing flows, and polished candidate experiences. The role is ideal for someone who enjoys clean components and practical product thinking.',
      tags: ['Angular', 'Routing', 'Accessibility'],
    },
    {
      id: 'ui-designer',
      title: 'UI Designer',
      company: 'BrightLoop Labs',
      location: 'Remote',
      type: 'Contract',
      salary: '6-9 LPA',
      summary: 'Create bold product visuals with strong typography and sharp interaction details.',
      description:
        'You will collaborate with engineers to translate product ideas into responsive screens, design systems, and persuasive visual storytelling.',
      tags: ['Figma', 'Design Systems', 'Branding'],
    },
    {
      id: 'product-analyst',
      title: 'Product Analyst',
      company: 'Northstar Hiring',
      location: 'Pune, India',
      type: 'Hybrid',
      salary: '8-12 LPA',
      summary: 'Turn usage data into practical insight that improves job seeker conversion.',
      description:
        'You will analyze funnel drop-offs, simplify reporting, and partner with design and engineering to ship better recruiting experiences.',
      tags: ['Analytics', 'SQL', 'Experimentation'],
    },
  ]);

  readonly jobs = computed(() => this.jobsState());

  getJobById(id: string): Job | undefined {
    return this.jobsState().find((job) => job.id === id);
  }
}
