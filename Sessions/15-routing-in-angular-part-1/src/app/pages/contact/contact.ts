import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactFormComponent, ContactFormValue } from '../../components/contact-form/contact-form';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-contact',
  imports: [ContactFormComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly queryParamMap = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  protected readonly submittedMessage = computed(() => {
    const submitted = this.queryParamMap().get('submitted');
    return submitted === 'true'
      ? 'Thanks for reaching out. Your form was submitted successfully.'
      : '';
  });

  protected handleSubmitted(formValue: ContactFormValue): void {
    this.toastService.show(`Message sent by ${formValue.fullName}.`);
    void this.router.navigate(['/contact'], {
      queryParams: { submitted: true },
    });
  }
}
