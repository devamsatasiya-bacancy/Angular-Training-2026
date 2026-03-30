import { AbstractControl, ValidationErrors , AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
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
      return project.name === control.value});
    return of(isTaken ? { projectNameExists: true } : null);

  };
}
