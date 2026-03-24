import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ContactFormValue {
  fullName: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent {

  protected readonly hasTriedSubmit = signal(false);

  protected readonly contactForm  = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  protected onSubmit(): void {
    this.hasTriedSubmit.set(true);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.contactForm.reset({
      fullName: '',
      email: '',
      message: '',
    });
    this.hasTriedSubmit.set(false);
  }

  protected showError(controlName: 'fullName' | 'email' | 'message'): boolean {
    const control = this.contactForm.controls[controlName];
    return control.invalid && (control.touched || this.hasTriedSubmit());
  }
}
