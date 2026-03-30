import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactUsFormModel } from '../../models/ContactUsFormModel';

@Component({
  selector: 'app-contact-us-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us-form.html',
  styleUrl: './contact-us-form.scss',
})
export class ContactUsForm implements AfterViewInit {
  @ViewChild('userForm') userForm?: NgForm;

  readonly cityOptions = ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'];

  formData: ContactUsFormModel = {
    firstName: 'Amit',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    gender: '',
    address: {
      streetAddress: '',
      city: '',
      pincode: '',
    },
    rememberMe: false,
  };

  submittedData?: ContactUsFormModel;

  ngAfterViewInit(): void {
    this.patchDemoValues();
  }

  setDemoValues(): void {
    this.userForm?.form.setValue({
      firstName: 'Neha',
      lastName: 'Patel',
      email: 'neha@example.com',
      contact: '9876543210',
      password: 'hello123',
      gender: 'Female',
      address: {
        streetAddress: '42 River Road',
        city: 'Surat',
        pincode: '395007',
      },
      rememberMe: true,
    });
  }

  patchDemoValues(): void {
    this.userForm?.form.patchValue({
      email: 'amit@example.com',
      address: {
        city: 'Ahmedabad',
      },
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
      contact: this.formData.contact,
      password: this.formData.password,
      gender: this.formData.gender,
      address: {
        streetAddress: this.formData.address.streetAddress,
        city: this.formData.address.city,
        pincode: this.formData.address.pincode,
      },
      rememberMe: this.formData.rememberMe,
    };
  }

  onReset(resetsubmittedData: boolean): void {
    this.userForm?.resetForm({
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      password: '',
      gender: '',
      address: {
        streetAddress: '',
        city: '',
        pincode: '',
      },
      rememberMe: false,
    });
    
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      password: '',
      gender: '',
      address: {
        streetAddress: '',
        city: '',
        pincode: '',
      },
      rememberMe: false,
    };
    if (resetsubmittedData) {
      this.submittedData = undefined;
    }
  }
}
