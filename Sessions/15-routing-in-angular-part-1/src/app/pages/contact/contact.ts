import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFormComponent } from '../../components/contact-form/contact-form';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  imports: [ContactFormComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);



  protected handleSubmitted(): void {
    this.toastService.show(`Form  Submitted}.`);
    void this.router.navigate(['/contact'], {
      queryParams: { submitted: true },
    });
  }
}
