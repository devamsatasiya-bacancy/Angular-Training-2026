import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us-form.html',
  styleUrl: './contact-us-form.scss',
})
export class ContactUsForm implements AfterViewInit {
  @ViewChild('userForm') userForm?: NgForm;

  readonly cityOptions = ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'];

  formData = {
    firstName: 'Amit',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    gender: '',
    city: '',
    rememberMe: false,
  };

  submittedData?: typeof this.formData;

  ngAfterViewInit(): void {
    this.patchDemoValues();
  }

  setDemoValues(): void {
    this.userForm?.form.setValue({
      firstName: 'Neha',
      lastName: 'Patel',
      email: 'neha@example.com',
      phoneNumber: '9876543210',
      password: 'hello123',
      gender: 'Female',
      city: 'Surat',
      rememberMe: true,
    });
  }

  patchDemoValues(): void {
    this.userForm?.form.patchValue({
      email: 'amit@example.com',
      city: 'Ahmedabad',
      rememberMe: true,
    });
  }

  onSubmit(): void {
    if (this.userForm?.invalid) {
      return;
    }

    this.submittedData = {
      firstName: this.userForm?.value.firstName ?? '',
      lastName: this.formData.lastName,
      email: this.formData.email,
      phoneNumber: this.formData.phoneNumber,
      password: this.formData.password,
      gender: this.formData.gender,
      city: this.formData.city,
      rememberMe: this.formData.rememberMe,
    };
    this.userForm?.reset();
  }

  onReset(): void {
    this.userForm?.resetForm({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: '',
      city: '',
      rememberMe: false,
    });
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: '',
      city: '',
      rememberMe: false,
    };
    this.submittedData = undefined;
  }
}
