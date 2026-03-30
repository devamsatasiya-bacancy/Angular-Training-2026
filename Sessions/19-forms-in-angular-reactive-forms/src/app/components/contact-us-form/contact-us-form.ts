import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { dateValidator, uniqueProjectNameValidator } from '../../validators/form-validators';

@Component({
  selector: 'app-contact-us-form',
  imports: [ReactiveFormsModule, FormsModule, JsonPipe],
  templateUrl: './contact-us-form.html',
  styleUrl: './contact-us-form.sass',
})
export class ContactUsForm implements OnInit {
  protected companyForm?: FormGroup;

  get projectGroupsArray() {
    //console.log(new Date().toISOString().split('T')[0], [Validators.required]);
    return this.companyForm?.get('projects') as FormArray;
  }
  ngOnInit(): void {
    this.initCompanyForm();
  }
  clearProjectForm(index: number) {
    const projects = this.projectGroupsArray.at(index);
    if (projects) {
      projects.setValue({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
      });
    }
  }

  removeProjectForm(index: number):void {
    const projects = this.projectGroupsArray;
    if (projects) {
      projects.removeAt(index);
    }
  }
  onCompanyFormSubmit():void {
    if (this.companyForm?.valid) {
      console.log(this.companyForm.value['projects']);
    }
  }
  initCompanyForm(): void {
    this.companyForm = new FormGroup({
      name: new FormControl('Bacancy Technology', [Validators.required]),
      email: new FormControl('contact@bacancytechnology.com', [
        Validators.required,
        Validators.email,
      ]),
      website: new FormControl('https://www.bacancytechnology.com/', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/|www\.)/),
      ]),
      // TODO:  add custom validator to validate phone number based on country code selected.
      phoneNumber: new FormControl(1234567890, [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      projects: new FormArray([]),
      message: new FormControl(''),
    });
  }

  getProjectFormGroup(): FormGroup {
    return new FormGroup(
      {
        name: new FormControl('', { validators: [Validators.required], asyncValidators: uniqueProjectNameValidator(this.projectGroupsArray.value) , updateOn: "blur" } ),
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
