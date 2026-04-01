import { AbstractControl, ValidationErrors , AsyncValidatorFn, ValidatorFn, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Project } from '../models/FormsModel';


export function dateValidator(control:AbstractControl): ValidationErrors | null {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  const isInvalid = startDate && endDate && new Date(startDate) > new Date(endDate);
  
  return isInvalid ? { 'invalidDateRange': true } : null;
}

export function uniqueProjectNameValidator(currentProjects: Project[]): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    //console.log("hello" + control.value)
    if (!control.value) return of(null);

    const isTaken = currentProjects.some(project => {
      console.log(project.name + " --->" + control.value)
      return project.name.toLowerCase() === control.value.toLowerCase()});
    return of(isTaken ? { projectNameExists: true } : null);

  };
}

// a general phone number validator for 10 digit numbers, can be enhanced to include country codes, different formats, etc. 
export function indiaPhoneValidator() : ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) return null;

        const regex = /^\+91[6-9]\d{9}$/;
        return regex.test(value) ? null : { invalidPhone: true };
    };
}

// validator to check for empty or whitespace-only values in form controls
export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'string' && value.trim().length === 0) {
        return { whitespace: true };
    } else {
        return null;
    }
}