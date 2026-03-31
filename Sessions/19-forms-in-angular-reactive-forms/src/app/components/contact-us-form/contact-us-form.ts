import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {
  dateValidator,
  indiaPhoneValidator,
  uniqueProjectNameValidator,
} from '../../validators/form-validators';

import { Company } from '../../models/FormsModel';
import { CompanyFormService } from '../../services/company-form';

@Component({
  selector: 'app-contact-us-form',
  imports: [ReactiveFormsModule, FormsModule, JsonPipe],
  templateUrl: './contact-us-form.html',
  styleUrl: './contact-us-form.scss',
})
export class ContactUsForm implements OnInit {
  
  protected companyForm?: FormGroup;
  protected companyFormData: Company | null = null;
  private defaultCompanyDetails: Company = {
    id: '1',
    name: 'Bacancy Technology',
    email: 'bacancy@bacancytechnology.com',
    website: 'https://www.bacancytechnology.com/',
    phoneNumber: '+917234567890',
    projects: [],
  };
  private companyformService = inject(CompanyFormService);
  get projectGroupsArray() {
    //console.log(new Date().toISOString().split('T')[0], [Validators.required]);
    return this.companyForm?.get('projects') as FormArray;
  }
  ngOnInit(): void {
    this.initCompanyForm();
  }
  clearProjectForm(index: number) {
    console.log('clearing form at--->', index);
    const projectGroup = this.projectGroupsArray.at(index);
    //console.log(projectGroup)
    if (projectGroup) {
      projectGroup.setValue({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
      });
    }
    
  }

  resetCompanyForm(): void {
    this.companyForm?.reset({
      name: this.defaultCompanyDetails.name,
      email: this.defaultCompanyDetails.email,
      website: this.defaultCompanyDetails.website,
      phoneNumber: this.defaultCompanyDetails.phoneNumber,
      message: this.defaultCompanyDetails.message,
    });
  }

  removeProjectForm(index: number): void {
    const projects = this.projectGroupsArray;
    if (projects) {
      projects.removeAt(index);
    }
  }
  onCompanyFormSubmit(): void {
    if (this.companyForm?.valid) {
      console.log(this.companyForm.value);
      this.companyFormData = this.companyForm.value;
    }
    this.companyformService.setCompanyDetails(this.companyFormData!);
  }
  initCompanyForm(): void {
    this.companyForm = new FormGroup({
      name: new FormControl(this.defaultCompanyDetails.name, [Validators.required]),
      email: new FormControl(this.defaultCompanyDetails.email, [
        Validators.required,
        Validators.email,
      ]),
      website: new FormControl(this.defaultCompanyDetails.website, [
        Validators.required,
        Validators.pattern(/^(https?:\/\/|www\.)/),
      ]),
      // TODO:  add custom validator to validate phone number based on country code selected.
      phoneNumber: new FormControl(this.defaultCompanyDetails.phoneNumber, [
        Validators.required,
        indiaPhoneValidator(),
      ]),
      projects: new FormArray([]),
      message: new FormControl(this.defaultCompanyDetails.message),
    });
  }

  getProjectFormGroup(): FormGroup {
    return new FormGroup(
      {
        name: new FormControl('', {
          validators: [Validators.required],
          asyncValidators: [uniqueProjectNameValidator(this.projectGroupsArray.value)],
          updateOn: 'blur',
        }),
        description: new FormControl('', {
          validators: [Validators.required],
        }),
        startDate: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
        endDate: new FormControl('', [Validators.required]),
      },
      {
        /* custom validator to check start date should not be greater than end date */
        validators: dateValidator,
      },
    );
  }

  addProjectForm(): void {
    const projects = this.projectGroupsArray;
    projects?.push(this.getProjectFormGroup());
    //console.log(projects);
  }
}
