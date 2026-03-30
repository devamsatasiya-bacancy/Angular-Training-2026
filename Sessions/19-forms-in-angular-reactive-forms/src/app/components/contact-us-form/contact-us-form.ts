import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us-form',
  imports: [ReactiveFormsModule, FormsModule , JsonPipe],
  templateUrl: './contact-us-form.html',
  styleUrl: './contact-us-form.sass',
})
export class ContactUsForm implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}

  protected companyForm? :FormGroup;
  protected projectForm? : FormGroup;



  ngOnInit(): void {
    this.initCompanyForm();
  }

  initCompanyForm(): void {   
    this.companyForm = new FormGroup({
      name: new FormControl('Bacancy Technology', [Validators.required]),
      email : new FormControl('' , [Validators.required, Validators.email]),
      website : new FormControl('https://www.bacancytechnology.com/', [Validators.required, Validators.pattern(/^(https?:\/\/|www\.)/)]),
      // TODO:  add custom validator to validate phone number based on country code selected.
      phoneNumber : new FormControl('+91 1234567890', [Validators.required, Validators.pattern(/^\+\d{1,3}\s\d{10}$/)]),
      projects : new FormArray([]),
    });
   }

   getProjectFormGroup(): FormGroup {
    return new FormGroup({
      name : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      startDate : new FormControl('', [Validators.required]),  //TODO: add custom validator to check start date should not be greater than end date.
      endDate : new FormControl('', [Validators.required])
    });
   }
   
  get projectGroupsArray() {
    return this.companyForm?.get('projects') as FormArray;
  }
   addProjectForm():void{
      const projects = this.projectGroupsArray;
      projects?.push(this.getProjectFormGroup());
      console.log(projects)
   }


}
